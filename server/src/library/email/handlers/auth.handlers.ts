// email.handlers.ts

import { EmailService } from "../email.service.js";

// Templates
import { registrationOtpEmailTemplate } from "../templates/auth/registrationOtp.template.js";
import { loginOtpEmailTemplate } from "../templates/auth/loginOtp.template.js";
import { resendOtpEmailTemplate } from "../templates/auth/resendOtp.template.js";
import { welcomeEmailTemplate } from "../templates/auth/welcome.template.js";
import { loginSuccessEmailTemplate } from "../templates/auth/loginSuccessEmail.template.js";

/* -------------------------------------------------------------------------- */
/*                               COMMON CONFIG                                 */
/* -------------------------------------------------------------------------- */

const EMAIL_BRAND = {
  name: "Government Engineering College, Lakhisarai",
  logo: "https://www.geclakhisarai.com/gecl/images/college/gec-lakhisarai-logo-rectangle.webp",
  support: "support@geclakhisarai.ac.in",
};

/* -------------------------------------------------------------------------- */
/*                             1. REGISTRATION OTP                              */
/* -------------------------------------------------------------------------- */

type RegistrationOtpJobPayload = {
  to: string;
  otp: string;
};

export async function handleRegisterOtpEmail(
  data: RegistrationOtpJobPayload,
): Promise<void> {
  const { to, otp } = data;

  const html = registrationOtpEmailTemplate({
    otp,
    logoUrl: EMAIL_BRAND.logo,
    supportEmail: EMAIL_BRAND.support,
  });

  await EmailService.sendRaw(
    to,
    "GEC Lakhisarai – Registration Verification OTP",
    html,
  );
}

/* -------------------------------------------------------------------------- */
/*                                2. LOGIN OTP                                  */
/* -------------------------------------------------------------------------- */

type LoginOtpJobPayload = {
  to: string;
  otp: string;
};

export async function handleLoginOtpEmail(
  data: LoginOtpJobPayload,
): Promise<void> {
  const { to, otp } = data;

  const html = loginOtpEmailTemplate({
    otp,
    logoUrl: EMAIL_BRAND.logo,
    supportEmail: EMAIL_BRAND.support,
  });

  await EmailService.sendRaw(
    to,
    "GEC Lakhisarai – Login Verification OTP",
    html,
  );
}

/* -------------------------------------------------------------------------- */
/*                               3. RESEND OTP                                  */
/* -------------------------------------------------------------------------- */

type ResendOtpJobPayload = {
  to: string;
  otp: string;
  reason: "Login" | "Registration" | "Password Reset";
};

export async function handleResendOtpEmail(
  data: ResendOtpJobPayload,
): Promise<void> {
  const { to, otp, reason } = data;

  const html = resendOtpEmailTemplate({
    otp,
    reason,
    logoUrl: EMAIL_BRAND.logo,
    supportEmail: EMAIL_BRAND.support,
  });

  await EmailService.sendRaw(to, "GEC Lakhisarai – Resent OTP", html);
}

/* -------------------------------------------------------------------------- */
/*                               4. WELCOME EMAIL                               */
/* -------------------------------------------------------------------------- */

type WelcomeEmailJobPayload = {
  to: string;
  fullName?: string;
};

export async function handleWelcomeEmail(
  data: WelcomeEmailJobPayload,
): Promise<void> {
  const { to, fullName } = data;

  const html = welcomeEmailTemplate({
    ...(fullName ? { fullName } : {}),
    logoUrl: EMAIL_BRAND.logo,
    supportEmail: EMAIL_BRAND.support,
  });

  await EmailService.sendRaw(
    to,
    "Welcome to Government Engineering College, Lakhisarai",
    html,
  );
}

/* -------------------------------------------------------------------------- */
/*                              5. LOGIN SUCCESS EMAIL                          */
/* -------------------------------------------------------------------------- */

// Define the payload structure for the job
type LoginSuccessJobPayload = {
  to: string;
  name: string;
  ip: string;
  loginAt: Date | string; // Can accept Date object or ISO string
  device?: string; // Optional (e.g., "Chrome on Linux")
  platform?: string; // Optional (e.g., "Web", "Mobile")
  location?: string; // Optional (e.g., "Patna, India")
};

export async function handleLoginSuccessEmail(
  data: LoginSuccessJobPayload,
): Promise<void> {
  const { to, name, ip, loginAt, device, platform, location } = data;

  // 1. Format the Date (e.g., "7 Feb 2026, 14:35 IST")
  // We use 'en-IN' locale and 'Asia/Kolkata' timezone for accuracy
  const dateObj = new Date(loginAt);
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(dateObj);

  // 2. Generate HTML using the template
  const html = loginSuccessEmailTemplate({
    name,
    date: formattedDate,
    ip,
    device,
    platform,
    location,
    logoUrl: EMAIL_BRAND.logo,
    supportEmail: EMAIL_BRAND.support,
  });

  // 3. Send Email
  await EmailService.sendRaw(
    to,
    "Security Alert: New Login to Your Account",
    html,
  );
}
