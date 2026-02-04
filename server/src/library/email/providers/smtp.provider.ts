import nodemailer from "nodemailer";
import type { EmailProvider, EmailSendInput } from "../email.types.js";
import { EmailConfig } from "../email.config.js";

export class SmtpEmailProvider implements EmailProvider {
  private transporter;
  private from: string;

  constructor(from: string) {
    this.from = from;

    this.transporter = nodemailer.createTransport({
      host: EmailConfig.smtp.host,
      port: EmailConfig.smtp.port,
      secure: EmailConfig.smtp.secure,
      auth: {
        user: EmailConfig.smtp.user,
        pass: EmailConfig.smtp.pass,
      },
      tls: {
        rejectUnauthorized: false, // ✅ REQUIRED on Render
      },
    });
  }

  async send(input: EmailSendInput): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
      });

      console.log("📧 SMTP response:", info.response);
    } catch (err) {
      console.error("❌ SMTP send failed:", err);
      throw err;
    }
  }
}
