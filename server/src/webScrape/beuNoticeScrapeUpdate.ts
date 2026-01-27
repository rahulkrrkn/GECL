import { chromium, type Browser } from "playwright";
import mongoose from "mongoose";
import { getGeclNoticeFUIConn } from "./../models/gecl_notice.model.js";
import { slugify } from "../utils/slugify.js";
const BEU_URL = "https://beu-bih.ac.in/notification";
const BASE_DOMAIN = "https://beu-bih.ac.in";

type ScrapedItem = {
  rawDate: string;
  title: string;
  viewUrl: string;
  slug: string;
};

// --- HELPER: Clean Text ---
const clean = (text: string | null | undefined) =>
  (text || "").replace(/\s+/g, " ").trim();

// --- HELPER: Generate Unique Slug ---
function generateSlug(title: string, date: string) {
  const safeTitle = slugify(title);
  const safeDate = slugify(date) || "nodate";
  return `beu-${safeDate}-${safeTitle}`.substring(0, 100);
}

// --- STEP 1: Scrape Main List ---
async function fetchNoticeList(browser: Browser): Promise<ScrapedItem[]> {
  const page = await browser.newPage();
  console.log(`\n🔍 Fetching Main List: ${BEU_URL}`);

  try {
    await page.goto(BEU_URL, {
      waitUntil: "domcontentloaded", // ✅ NOT networkidle
      timeout: 60000,
    });
    const browser = await chromium.launch({
      headless: false,
      slowMo: 200,
    });

    // ✅ Wait for the table itself
    await page.waitForSelector("table", { timeout: 30000 });

    // ✅ Wait until table rows are injected by JS
    await page.waitForFunction(
      () => {
        const table = document.querySelector("table");
        if (!table) return false;

        const rows = table.querySelectorAll("tbody tr");
        return rows.length > 0;
      },
      { timeout: 30000 },
    );

    const rows = await page.locator("table tbody tr").all();
    console.log("✅ Rows detected:", rows.length);

    const notices: ScrapedItem[] = [];

    for (const row of rows) {
      const tds = await row.locator("td").all();
      if (tds.length < 3) continue;

      const date = clean(await tds[0].textContent());
      const title = clean(await tds[1].textContent());

      const link = row.locator("a").first();
      if ((await link.count()) === 0) continue;

      const href = await link.getAttribute("href");
      if (!href || !title) continue;

      notices.push({
        rawDate: date,
        title,
        viewUrl: new URL(href, BASE_DOMAIN).toString(),
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
async function findPdfLink(browser: Browser, url: string): Promise<string> {
  if (url.toLowerCase().endsWith(".pdf")) return url;

  const page = await browser.newPage();
  try {
    await page.route("**/*", (route) =>
      ["image", "stylesheet", "font"].includes(route.request().resourceType())
        ? route.abort()
        : route.continue(),
    );

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const pdfAnchor = await page
      .locator('a[href$=".pdf"], a[href$=".PDF"]')
      .first();
    if ((await pdfAnchor.count()) > 0) {
      const href = await pdfAnchor.getAttribute("href");
      if (href) return new URL(href, url).toString();
    }

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

export async function syncNotices() {
  console.log("\n🔍 Starting BEU Notice Sync...");

  const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID;
  if (!SYSTEM_USER_ID) {
    console.error("❌ ERROR: SYSTEM_USER_ID missing.");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const NoticeModel = await getGeclNoticeFUIConn();

  try {
    const scrapedNotices = await fetchNoticeList(browser);
    console.log(`📡 Found ${scrapedNotices.length} notices on BEU website.`);

    let newCount = 0;

    for (const item of scrapedNotices) {
      const exists = await NoticeModel.exists({
        $or: [{ slug: item.slug }, { title: item.title }],
      });

      if (exists) continue;

      console.log(`✨ New Notice: "${item.title}"`);
      const pdfUrl = await findPdfLink(browser, item.viewUrl);

      const attachments = pdfUrl
        ? [
            {
              fileUrl: pdfUrl,
              fileName: `${item.slug}.pdf`,
              fileType: "application/pdf",
              fileSize: 0,
            },
          ]
        : [];

      let category = "GENERAL";
      const t = item.title.toLowerCase();
      if (t.includes("exam") || t.includes("schedule")) category = "EXAM";
      if (t.includes("result")) category = "ACADEMIC";
      if (t.includes("holiday")) category = "HOLIDAY";

      await NoticeModel.create({
        source: "BEU",
        title: item.title,
        slug: item.slug,
        content: `Official Notice from BEU.`,
        category: category,
        department: "ALL",
        audience: ["PUBLIC", "STUDENTS"],
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
  } finally {
    await browser.close();
  }
}
