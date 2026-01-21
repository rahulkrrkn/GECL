export const EmailConfig = {
  provider: process.env.GECL_MAIL_PROVIDER || "smtp",

  fromName: process.env.GECL_MAIL_FROM_NAME || "RahulKrRKN",
  fromEmail: process.env.GECL_MAIL_FROM_EMAIL || "rahulkrrkn@gmail.com",

  smtp: {
    host: process.env.GECL_SMTP_HOST || "",
    port: Number(process.env.GECL_SMTP_PORT || 587),
    secure: (process.env.GECL_SMTP_SECURE || "false") === "true",
    user: process.env.GECL_SMTP_USER || "",
    pass: process.env.GECL_SMTP_PASS || "",
  },
};

export function assertEmailConfig() {
  if (EmailConfig.provider === "smtp") {
    const { host, user, pass } = EmailConfig.smtp;
    if (!host) throw new Error("GECL_SMTP_HOST is missing");
    if (!user) throw new Error("GECL_SMTP_USER is missing");
    if (!pass) throw new Error("GECL_SMTP_PASS is missing");
  }
}
