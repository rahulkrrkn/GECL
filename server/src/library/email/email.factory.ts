import type { EmailProvider } from "./email.types.js";
import { assertEmailConfig, EmailConfig } from "./email.config.js";
import { SmtpEmailProvider } from "./providers/smtp.provider.js";

let cachedProvider: EmailProvider | null = null;

export async function getEmailProvider(): Promise<EmailProvider> {
  if (cachedProvider) return cachedProvider;

  assertEmailConfig();

  if (EmailConfig.provider === "smtp") {
    const from = `"${EmailConfig.fromName}" <${EmailConfig.fromEmail}>`;
    const provider = new SmtpEmailProvider(from);

    // 🔥 FAIL FAST HERE
    await provider.verify();

    cachedProvider = provider;
    return cachedProvider;
  }

  throw new Error(`Unsupported GECL_MAIL_PROVIDER: ${EmailConfig.provider}`);
}

export function resetEmailProvider() {
  cachedProvider = null;
}
