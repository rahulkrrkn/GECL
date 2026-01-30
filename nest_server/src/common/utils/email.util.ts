// src/common/utils/email.util.ts

export class EmailUtil {
  static normalize(rawEmail: unknown): string | null {
    if (typeof rawEmail !== 'string') return null;

    const email = rawEmail.trim();
    const parts = email.split('@');

    // Ensure valid email structure (user@domain)
    if (parts.length !== 2) return null;

    let [local, domain] = parts;
    if (!local || !domain) return null;

    local = local.toLowerCase();
    domain = domain.toLowerCase();

    // Normalize Gmail and Googlemail
    if (domain === 'gmail.com' || domain === 'googlemail.com') {
      // Remove dots from local part
      local = local.replace(/\./g, '');
      // Remove alias (everything after +)
      local = local.split('+')[0];
      // Normalize domain to gmail.com
      domain = 'gmail.com';
    }

    return `${local}@${domain}`;
  }
}
