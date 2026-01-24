import { otpEmailTemplate } from "../templates/sendEmailOtp.js";
import { EmailService } from "../index.js";

export async function sendEmailOtp(to: string, otp: string) {
  console.log("Email OTP", to, otp);
  const html = otpEmailTemplate({
    brandName: "RahulKrRKN",
    logoUrl:
      "/gecl/government-engineering-college-lakhisarai-logo.webp",
    otp,
    supportEmail: "rahulkrrkn@gmail.com",
  });
  await EmailService.sendRaw(to, "RahulKrRKN - Verify Your Email", html);
}
