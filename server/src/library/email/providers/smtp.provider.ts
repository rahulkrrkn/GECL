import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { EmailProvider, SendEmailInput } from "../email.types.js";
import { EmailConfig } from "../email.config.js";

export class SmtpEmailProvider implements EmailProvider {
  private transporter: Transporter;
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
      connectionTimeout: 8000,
      greetingTimeout: 8000,
    });
  }

  async verify() {
    try {
      await this.transporter.verify();
      console.log("✅ SMTP verified and ready");
    } catch (error: any) {
      console.error("❌ SMTP verification failed", {
        code: error.code,
        command: error.command,
        message: error.message,
      });

      throw new Error(
        `SMTP unreachable (${error.code || "UNKNOWN"}): ${error.message}`,
      );
    }
  }

  async send({ to, subject, html }: SendEmailInput) {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html,
      });
    } catch (error: any) {
      console.error("❌ SMTP send failed", {
        code: error.code,
        command: error.command,
        message: error.message,
      });

      throw error;
    }
  }
}
