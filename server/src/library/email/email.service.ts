import { getEmailProvider } from "./email.factory.js";

export const EmailService = {
  async sendRaw(to: string | string[], subject: string, html: string) {
    const provider = getEmailProvider(); // ✅ lazy init

    console.log("📧 Sending email to:", to);

    await provider.send({
      to,
      subject,
      html,
    });

    console.log("✅ Email send attempt finished");
  },
};
