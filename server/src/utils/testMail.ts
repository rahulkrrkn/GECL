import nodemailer from "nodemailer";

export async function sendTestEmail() {
  const SMTP_USER = "a030bb001@smtp-brevo.com";
  const SMTP_PASS = process.env.GECL_MAIL_PASS;
  console.log("SMTP_PASS", SMTP_PASS);

  if (!SMTP_PASS) {
    throw new Error("GECL_MAIL_PASS is missing");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });

  try {
    console.log("🔍 Verifying SMTP...");
    await transporter.verify();
    console.log("✅ SMTP OK");

    console.log("📧 Sending email...");
    await transporter.sendMail({
      from: `"GECL" <${SMTP_USER}>`,
      to: "rahulkrrkn@gmail.com",
      subject: "SMTP Relay Test",
      html: "<h3>Email relay successful 🚀</h3>",
    });

    console.log("✅ Email sent successfully");
  } catch (error: any) {
    console.error("❌ Email failed", {
      code: error.code,
      command: error.command,
      message: error.message,
    });
  }
}
