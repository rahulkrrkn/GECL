import cron from "node-cron";
import { syncNotices } from "../webScrape/beuNoticeScrapeUpdate.js"; // Import the function

export default function startCronJob() {
  const runCronOnServerStart = () => {
    console.log("⏰ CRON: Starting BEU Notice Sync...");
    syncNotices()
      .then(() => {
        console.log("✅ CRON: BEU Notice Sync Completed.");
      })
      .catch((error) => {
        console.error("❌ CRON Failed:", error);
      });
  };
  runCronOnServerStart();
  cron.schedule("0 */4 * * *", async () => {
    console.log("⏰ CRON: Starting BEU Notice Sync...");
    try {
      await syncNotices();
      console.log("✅ CRON: BEU Notice Sync Completed.");
    } catch (error) {
      console.error("❌ CRON Failed:", error);
    }
  });
}
