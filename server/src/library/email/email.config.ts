export const EmailConfig = {
  provider: process.env.GECL_MAIL_PROVIDER || "smtp",

  fromName: process.env.GECL_MAIL_FROM_NAME || "GECL",
  fromEmail: process.env.GECL_MAIL_FROM_EMAIL || "",

  smtp: {
    host: process.env.GECL_MAIL_HOST || "",
    port: Number(process.env.GECL_MAIL_PORT || 587),
    secure: (process.env.GECL_MAIL_SECURE || "false") === "true",
    user: process.env.GECL_MAIL_USER || "",
    pass: process.env.GECL_MAIL_PASS || "",
  },
};

export function assertEmailConfig() {
  if (!EmailConfig.fromEmail) {
    throw new Error("GECL_MAIL_FROM_EMAIL is missing");
  }

  if (EmailConfig.provider === "smtp") {
    const { host, user, pass } = EmailConfig.smtp;

    if (!host) throw new Error("GECL_MAIL_HOST is missing");
    if (!user) throw new Error("GECL_MAIL_USER is missing");
    if (!pass) throw new Error("GECL_MAIL_PASS is missing");

    // Safety: avoid Gmail-from with custom SMTP
    if (EmailConfig.fromEmail.endsWith("@gmail.com")) {
      console.warn(
        "⚠️ Using gmail.com as fromEmail with custom SMTP may break delivery",
      );
    }
  }
}
