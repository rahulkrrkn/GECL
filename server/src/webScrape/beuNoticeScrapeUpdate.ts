import { chromium, type Browser } from "playwright";
import slugify from "slugify";
import mongoose from "mongoose";
import { getGeclNoticeFUIConn } from "./../models/gecl_notice.model.js"; // Your DB connection

// --- CONFIGURATION ---
const BEU_URL = "https://beu-bih.ac.in/notification";
const BASE_DOMAIN = "https://beu-bih.ac.in";

// We need a valid User ID for the 'addedBy' field.
// We will load this from the environment variable (GitHub Secret)

// --- TYPES ---
type ScrapedItem = {
  rawDate: string;
  title: string;
  viewUrl: string;
  slug: string;
};

// --- HELPER: Clean Text ---
const clean = (text: string | null) => text?.replace(/\s+/g, " ").trim() || "";

// --- HELPER: Generate Unique Slug ---
function generateSlug(title: string, date: string) {
  const safeTitle = slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
  const safeDate = slugify(date, { lower: true, strict: true }) || "nodate";
  // Prefix 'beu' prevents collision with GECL notices
  return `beu-${safeDate}-${safeTitle}`.substring(0, 100);
}

// --- STEP 1: Scrape Main List ---
async function fetchNoticeList(browser: Browser): Promise<ScrapedItem[]> {
  const page = await browser.newPage();
  console.log(`\n🔍 Fetching Main List: ${BEU_URL}`);

  try {
    await page.goto(BEU_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector("tbody tr", { timeout: 15000 });

    const rows = await page.locator("tbody").first().locator("tr").all();
    const notices: ScrapedItem[] = [];

    for (const row of rows) {
      const tds = await row.locator("td").all();
      if (tds.length < 3) continue;

      // Extract text columns
      let dateText = await tds[0].textContent();
      let titleText = await tds[1].textContent();
      let linkEl = await tds[2].locator("a").first();

      const title = clean(titleText);
      const date = clean(dateText);
      const href = await linkEl.getAttribute("href");

      if (!title || !href) continue;

      const fullUrl = new URL(href, BASE_DOMAIN).toString();

      notices.push({
        rawDate: date,
        title: title,
        viewUrl: fullUrl,
        slug: generateSlug(title, date),
      });
    }
    return notices;
  } catch (err) {
    console.error("❌ Error scraping list:", err);
    return [];
  } finally {
    await page.close();
  }
}

// --- STEP 2: Find PDF URL (Only runs for NEW notices) ---
async function findPdfLink(browser: Browser, url: string): Promise<string> {
  if (url.toLowerCase().endsWith(".pdf")) return url;

  const page = await browser.newPage();
  try {
    // Optimization: Block images/fonts
    await page.route("**/*", (route) =>
      ["image", "stylesheet", "font"].includes(route.request().resourceType())
        ? route.abort()
        : route.continue(),
    );

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Look for PDF anchor
    const pdfAnchor = await page
      .locator('a[href$=".pdf"], a[href$=".PDF"]')
      .first();
    if ((await pdfAnchor.count()) > 0) {
      const href = await pdfAnchor.getAttribute("href");
      if (href) return new URL(href, url).toString();
    }

    // Look for Iframes
    const iframeSrc = await page
      .locator("iframe")
      .getAttribute("src")
      .catch(() => null);
    if (iframeSrc?.toLowerCase().includes(".pdf")) {
      return new URL(iframeSrc, url).toString();
    }

    return url;
  } catch (e) {
    return url;
  } finally {
    await page.close();
  }
}

// --- MAIN SYNC FUNCTION ---
export async function syncNotices() {
  console.log("\n🔍 Starting BEU Notice Sync...");
  console.log("LOGS", process.env.NODE_ENV);

  const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID;

  if (!SYSTEM_USER_ID) {
    console.error("❌ ERROR: SYSTEM_USER_ID environment variable is missing.");
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });

  // Get your existing Model connection
  const NoticeModel = await getGeclNoticeFUIConn();

  try {
    const scrapedNotices = await fetchNoticeList(browser);
    console.log(`📡 Found ${scrapedNotices.length} notices on BEU website.`);

    let newCount = 0;

    for (const item of scrapedNotices) {
      // 1. Check Duplicates (by slug or title)
      const exists = await NoticeModel.exists({
        $or: [{ slug: item.slug }, { title: item.title }],
      });

      if (exists) continue; // Skip if exists

      console.log(`✨ New Notice: "${item.title}"`);

      // 2. Fetch PDF Link
      const pdfUrl = await findPdfLink(browser, item.viewUrl);

      // 3. Prepare Attachments
      const attachments = pdfUrl
        ? [
            {
              fileUrl: pdfUrl,
              fileName: `${item.slug}.pdf`,
              fileType: "pdf",
              fileSize: 0,
            },
          ]
        : [];

      // 4. Determine Category (Simple logic)
      let category = "GENERAL";
      const t = item.title.toLowerCase();
      if (t.includes("exam") || t.includes("schedule")) category = "EXAM";
      if (t.includes("result")) category = "ACADEMIC";
      if (t.includes("holiday")) category = "HOLIDAY";

      // 5. Save to DB
      await NoticeModel.create({
        source: "BEU",
        title: item.title,
        slug: item.slug,
        content: `Official Notice from BEU. Date: ${item.rawDate}`,
        category: category,
        department: "ALL",
        audience: ["PUBLIC", "STUDENTS"], // Default audience
        status: "PUBLISHED",
        attachments: attachments,
        addedBy: new mongoose.Types.ObjectId(SYSTEM_USER_ID),
        publishAt: new Date(),
      });

      console.log(`✅ Saved.`);
      newCount++;
    }

    console.log(`\n🏁 Sync Complete. ${newCount} new notices added.`);
  } catch (error) {
    console.error("Critical Error:", error);
    // process.exit(1);
  } finally {
    await browser.close();
    // process.exit(0);
  }
}
