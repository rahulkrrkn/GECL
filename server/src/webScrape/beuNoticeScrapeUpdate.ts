import { chromium, type Browser } from "playwright";
import mongoose from "mongoose";

import { getGeclNoticeFUIConn } from "../models/gecl_notice.model.js";
import { slugify } from "../utils/slugify.js";

const BEU_URL = "https://beu-bih.ac.in/notification";
const BASE_DOMAIN = "https://beu-bih.ac.in";

/* -------------------------------------------------------------------------- */
/* TYPES                                   */
/* -------------------------------------------------------------------------- */

type ScrapedItem = {
  rawDate: string;
  title: string;
  viewUrl: string;
  slug: string;
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                  */
/* -------------------------------------------------------------------------- */

const clean = (text: string | null | undefined) =>
  (text || "").replace(/\s+/g, " ").trim();

function generateSlug(title: string, date: string) {
  const safeTitle = slugify(title);
  const safeDate = slugify(date) || "nodate";
  return `beu-${safeDate}-${safeTitle}`.substring(0, 100);
}

// 🆕 NEW: Parse "DD-MM-YYYY" or "DD/MM/YYYY" into a JS Date Object
function parseDate(dateStr: string): Date {
  try {
    const cleanStr = dateStr.trim();
    const parts = cleanStr.split(/[-/]/);

    if (parts.length === 3) {
      // Fix: Added '!' to assure TS these indices exist
      const day = parseInt(parts[0]!, 10);
      const month = parseInt(parts[1]!, 10) - 1; // Months are 0-indexed in JS
      const year = parseInt(parts[2]!, 10);

      const parsed = new Date(year, month, day);

      // Validate if date is valid
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    console.warn(`⚠️ Could not parse date: "${dateStr}", using current time.`);
    return new Date(); // Fallback to now
  } catch (e) {
    return new Date();
  }
}

/* -------------------------------------------------------------------------- */
/* SCRAPE MAIN LIST                              */
/* -------------------------------------------------------------------------- */

async function fetchNoticeList(browser: Browser): Promise<ScrapedItem[]> {
  const page = await browser.newPage();
  console.log(`\n🔍 Fetching Main List: ${BEU_URL}`);

  try {
    await page.goto(BEU_URL, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector("table", { timeout: 30000 });

    // Wait for rows to stabilize
    let previousCount = 0;
    for (let i = 0; i < 25; i++) {
      const currentCount = await page.locator("table tbody tr").count();
      if (currentCount > previousCount) {
        previousCount = currentCount;
        await page.waitForTimeout(500);
      } else {
        break;
      }
    }

    const rows = await page.locator("table tbody tr").all();
    console.log("✅ Final row count:", rows.length);

    const notices: ScrapedItem[] = [];

    for (const row of rows) {
      const tds = await row.locator("td").all();
      if (tds.length < 3) continue;

      const [dateTd, titleTd, linkTd] = tds;
      if (!dateTd || !titleTd || !linkTd) continue;

      const date = clean(await dateTd.textContent());
      const title = clean(await titleTd.textContent());

      const link = linkTd.locator("a").first();
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
  } catch (error) {
    console.error("❌ Error scraping notice list:", error);
    return [];
  } finally {
    await page.close();
  }
}

/* -------------------------------------------------------------------------- */
/* FIND PDF LINK (DETAIL)                           */
/* -------------------------------------------------------------------------- */

async function findPdfLink(browser: Browser, url: string): Promise<string> {
  if (url.toLowerCase().endsWith(".pdf")) return url;

  const page = await browser.newPage();

  try {
    await page.route("**/*", (route) =>
      ["image", "stylesheet", "font"].includes(route.request().resourceType())
        ? route.abort()
        : route.continue(),
    );

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const pdfAnchor = page.locator('a[href$=".pdf"], a[href$=".PDF"]');
    if ((await pdfAnchor.count()) > 0) {
      const href = await pdfAnchor.first().getAttribute("href");
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
  } catch {
    return url;
  } finally {
    await page.close();
  }
}

/* -------------------------------------------------------------------------- */
/* SYNC JOB                                  */
/* -------------------------------------------------------------------------- */

export async function syncNotices() {
  console.log("\n🔍 Starting BEU Notice Sync...");

  const GECL_SYSTEM_USER_ID = process.env.GECL_SYSTEM_USER_ID;
  if (!GECL_SYSTEM_USER_ID) {
    console.error("❌ GECL_SYSTEM_USER_ID missing");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const NoticeModel = await getGeclNoticeFUIConn();

  try {
    const scrapedNotices = await fetchNoticeList(browser);
    console.log(`📡 Found ${scrapedNotices.length} notices`);

    // 🆕 FIX: REVERSE ORDER
    // The website has Latest at Top (Index 0).
    // We reverse it so we process [Oldest ... Newest].
    const chronologicalNotices = [...scrapedNotices].reverse();

    let newCount = 0;

    for (const item of chronologicalNotices) {
      const exists = await NoticeModel.exists({
        $or: [{ slug: item.slug }, { title: item.title }],
      });

      if (exists) continue;

      console.log(`✨ New Notice: ${item.title} [${item.rawDate}]`);

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

      // 🆕 FIX: USE REAL DATE
      const realPublishDate = parseDate(item.rawDate);

      await NoticeModel.create({
        source: "BEU",
        title: item.title,
        slug: item.slug,
        content: "Official Notice from BEU.",
        category,
        department: "ALL",
        audience: ["PUBLIC", "STUDENTS"],
        status: "PUBLISHED",
        attachments,
        addedBy: new mongoose.Types.ObjectId(GECL_SYSTEM_USER_ID),
        publishAt: realPublishDate, // <--- Using the parsed date
      });

      newCount++;
    }

    console.log(`\n🏁 Sync Complete. ${newCount} new notices added.`);
  } catch (error) {
    console.error("❌ Critical Sync Error:", error);
  } finally {
    await browser.close();
  }
}
