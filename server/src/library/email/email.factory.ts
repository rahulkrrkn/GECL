import type { EmailProvider } from "./email.types.js";
import { assertEmailConfig, EmailConfig } from "./email.config.js";
import { SmtpEmailProvider } from "./providers/smtp.provider.js";

let cachedProvider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (cachedProvider) return cachedProvider;

  assertEmailConfig();

  if (EmailConfig.provider === "smtp") {
    const from = `"${EmailConfig.fromName}" <${EmailConfig.fromEmail}>`;
    cachedProvider = new SmtpEmailProvider(from);
    return cachedProvider;
  }

  throw new Error(`Unsupported GECL_MAIL_PROVIDER: ${EmailConfig.provider}`);
}
