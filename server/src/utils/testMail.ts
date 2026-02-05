import nodemailer from "nodemailer";

export async function sendTestEmail() {
  const SMTP_USER = "contact@geclakhisarai.com"; // MUST match from
  const SMTP_PASS = process.env.GECL_MAIL_PASS;
  console.log("SMTP_PASS", SMTP_PASS);

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    console.log("🔍 Verifying SMTP...");
    await transporter.verify();
    console.log("✅ SMTP OK");

    console.log("📧 Sending email...");
    await transporter.sendMail({
      from: `"GECL" <${SMTP_USER}>`, // 🔥 MUST MATCH
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
