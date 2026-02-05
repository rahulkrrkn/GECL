import { getEmailProvider, resetEmailProvider } from "./email.factory.js";

export const EmailService = {
  async sendRaw(to: string | string[], subject: string, html: string) {
    const provider = await getEmailProvider();

    console.log("📧 Sending email to:", to);

    try {
      await provider.send({ to, subject, html });
      console.log("✅ Email sent");
    } catch (error: any) {
      console.error("❌ Email failed", {
        code: error.code,
        message: error.message,
      });

      // 🔥 Reset broken provider (important)
      resetEmailProvider();

      throw error;
    }
  },
};
