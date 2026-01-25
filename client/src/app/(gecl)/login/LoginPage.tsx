"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useApi } from "@/gecl/hooks/useApi";
import type { ApiFailure } from "@/gecl/utils/apiRequest";
import { FcGoogle } from "react-icons/fc";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiCpu,
  FiX,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import GoogleAccountLogin from "./GoogleAccountLogin";

// ✅ Updated Interface to be flexible (String OR Object)
interface LoginData {
  user: { id: string; email: string; role: string };
  GECL_ACCESS_TOKEN:
    | string
    | {
        token: string;
        expiresAt: string;
        allow: string[];
        deny: string[];
        allowExtra: string[];
        role: string[];
        personType: string;
      };
}

interface OtpSentData {
  email: string;
}

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(1, "Password is required");

const loginPasswordSchema = z.object({
  identifier: z.string().min(3, "Enter your Email or User ID"),
  password: passwordSchema,
});

const otpSendSchema = z.object({
  email: emailSchema,
});

const otpVerifySchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors: Record<string, string>;
}) {
  if (!errors[id]) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-2 flex items-center gap-2 text-xs font-medium text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20"
    >
      <FiAlertCircle className="text-sm shrink-0" />
      {errors[id]}
    </motion.div>
  );
}

function GeneralError({
  message,
  onClose,
}: {
  message?: string;
  onClose: () => void;
}) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-200 text-sm relative"
    >
      <FiAlertCircle className="text-lg mt-0.5 text-red-400 shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-red-400">Authentication Failed</p>
        <p className="opacity-90">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        <FiX />
      </button>
    </motion.div>
  );
}

const fadeVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

type Tab = "password" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const { request } = useApi();
  const [tab, setTab] = useState<Tab>("password");

  // State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

  // Inputs
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const collegeName = "Government Engineering College";
  const collegeLocation = "Lakhisarai";
  const imagePath =
    "/gecl/images/college/gecl-government-engineering-college-lakhisarai.webp";

  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("GECL_ACCESS_TOKEN="));

    if (hasToken) {
      router.replace("/");
    }
  }, [router]);

  const title = useMemo(() => {
    if (tab === "password") return "Welcome Back";
    return otpSent ? "Verify Identity" : "Secure Login";
  }, [tab, otpSent]);

  const subtitle = useMemo(() => {
    if (tab === "password") return "Access the digital campus portal.";
    return otpSent
      ? `Enter the code sent to ${otpEmail}`
      : "We'll send a one-time code to your email.";
  }, [tab, otpSent, otpEmail]);

  function clearFieldError(key: string) {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    if (serverError) setServerError(null);
  }

  function switchTab(next: Tab) {
    setTab(next);
    setOtpSent(false);
    setOtp("");
    setErrors({});
    setServerError(null);
  }

  const handleApiError = (res: ApiFailure) => {
    const code = res.code || "UNKNOWN";
    const msg = res.message || "An unexpected error occurred.";

    const newErrors: Record<string, string> = {};

    if (code === "OTP_INVALID" || code === "OTP_EXPIRED") {
      newErrors.otp = msg;
    } else if (
      code === "AUTH_USER_NOT_FOUND" ||
      code === "AUTH_INVALID_EMAIL"
    ) {
      newErrors.identifier = msg;
      newErrors.email = msg;
    } else if (code === "AUTH_PASSWORD_MISMATCH") {
      newErrors.password = msg;
    } else if (code === "AUTH_ACCOUNT_PENDING") {
      setServerError("Your account is pending approval from the admin.");
    } else {
      setServerError(msg);
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  // ✅ FIXED: Now accepts 'string' OR '{ token: string }'
  const handleLoginSuccess = (data: string | { token: string }) => {
    // Check if data is string or object and extract token accordingly
    const tokenVal = typeof data === "string" ? data : data.token;

    document.cookie = `GECL_ACCESS_TOKEN=${tokenVal}; path=/; max-age=86400; SameSite=Strict; Secure`;
    window.location.href = "/";
  };

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const parsed = loginPasswordSchema.safeParse({ identifier, password });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await request<LoginData>(
        {
          method: "POST",
          url: "/auth/login/password",
          data: { id: identifier, password },
        },
        { showMsg: false, showErrorMsg: false, showSuccessMsg: true },
      );

      if (res.success) {
        // Pass whatever data format comes back
        const token = res.GECL_ACCESS_TOKEN;
        if (token) {
          handleLoginSuccess(token);
        }
      } else {
        handleApiError(res);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const parsed = otpSendSchema.safeParse({ email: otpEmail });
    if (!parsed.success) {
      setErrors({ email: parsed.error.issues[0].message });
      return;
    }

    setLoading(true);
    try {
      const res = await request<OtpSentData>(
        {
          method: "POST",
          url: "/auth/login/email",
          data: { email: otpEmail },
        },
        { showMsg: false, showErrorMsg: false, showSuccessMsg: true },
      );

      if (res.success) {
        setOtpSent(true);
        startCooldown();
      } else {
        handleApiError(res);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const parsed = otpVerifySchema.safeParse({ email: otpEmail, otp });
    if (!parsed.success) {
      setErrors({
        otp:
          parsed.error.issues.find((i) => i.path[0] === "otp")?.message ||
          "Invalid input",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await request<LoginData>(
        {
          method: "POST",
          url: "/auth/login/email/verify",
          data: { email: otpEmail, otp },
        },
        { showMsg: false, showErrorMsg: false, showSuccessMsg: true },
      );

      if (res.success) {
        if (res.GECL_ACCESS_TOKEN) {
          handleLoginSuccess(res.GECL_ACCESS_TOKEN);
        }
      } else {
        handleApiError(res);
      }
    } finally {
      setLoading(false);
    }
  }

  function startCooldown() {
    setOtpCooldown(60);
    const interval = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: "#0f172a" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center relative z-10">
        {/* LEFT PANEL */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col h-full justify-center pr-12"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <FiCpu className="text-white text-xl" />
            </div>
            <div className="h-px flex-1 bg-linear-to-tr from-slate-700 to-transparent" />
          </div>

          <h1 className="text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            {collegeName} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-tr from-blue-400 to-indigo-300">
              {collegeLocation}
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-8">
            Welcome to the next-gen academic portal. Manage your curriculum,
            thesis work, and attendance in one secure environment.
          </p>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <FiMapPin /> <span>Official Campus Portal</span>
          </div>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
            <Image
              src={imagePath}
              alt="GEC Lakhisarai Main Building"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-transparent to-transparent opacity-90" />
          </div>
        </motion.section>

        {/* RIGHT PANEL: Form */}
        <section className="relative">
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-tr from-transparent via-blue-500/50 to-transparent" />
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-slate-400 text-sm">{subtitle}</p>
            </div>
            <AnimatePresence>
              {serverError && (
                <GeneralError
                  message={serverError}
                  onClose={() => setServerError(null)}
                />
              )}
            </AnimatePresence>
            <div className="flex p-1 mb-8 bg-slate-950/50 rounded-xl border border-slate-800/50">
              {(["password", "otp"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  disabled={loading}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-medium rounded-[0.6rem] transition-all duration-300",
                    tab === t
                      ? "bg-slate-800 text-white shadow-lg shadow-black/20 ring-1 ring-white/10"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5",
                  )}
                >
                  {t === "password" ? "Password Login" : "Email OTP"}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {tab === "password" && (
                <motion.form
                  key="password-form"
                  {...fadeVariant}
                  onSubmit={handlePasswordLogin}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                      Email / User ID
                    </label>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          clearFieldError("identifier");
                        }}
                        className={cn(
                          "w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-slate-200 placeholder:text-slate-600 outline-none transition-all",
                          "focus:border-blue-500/50 focus:bg-slate-900 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]",
                          errors.identifier &&
                            "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]",
                        )}
                        placeholder="student@gecl.ac.in"
                      />
                    </div>
                    <FieldError id="identifier" errors={errors} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Password
                      </label>
                      <Link
                        href="#"
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative group">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearFieldError("password");
                        }}
                        className={cn(
                          "w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-12 text-slate-200 placeholder:text-slate-600 outline-none transition-all",
                          "focus:border-blue-500/50 focus:bg-slate-900 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]",
                          errors.password &&
                            "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]",
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    <FieldError id="password" errors={errors} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-linear-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:grayscale"
                  >
                    {loading ? (
                      <span className="animate-pulse">Authenticating...</span>
                    ) : (
                      <>
                        Sign In <FiArrowRight />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* OTP LOGIN */}
              {tab === "otp" && (
                <motion.div
                  key="otp-wrapper"
                  {...fadeVariant}
                  className="space-y-5"
                >
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                          Academic Email
                        </label>
                        <div className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                          <input
                            value={otpEmail}
                            onChange={(e) => {
                              setOtpEmail(e.target.value);
                              clearFieldError("email");
                            }}
                            className={cn(
                              "w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-slate-200 placeholder:text-slate-600 outline-none transition-all",
                              "focus:border-blue-500/50 focus:bg-slate-900 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]",
                              errors.email &&
                                "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]",
                            )}
                            placeholder="student@gecl.ac.in"
                          />
                        </div>
                        <FieldError id="email" errors={errors} />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-linear-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:grayscale"
                      >
                        {loading ? (
                          <span className="animate-pulse">Sending OTP...</span>
                        ) : (
                          <>
                            Send Verification Code <FiArrowRight />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                          Enter OTP
                        </label>
                        <div className="relative group">
                          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                          <input
                            value={otp}
                            onChange={(e) => {
                              setOtp(
                                e.target.value.replace(/\D/g, "").slice(0, 6),
                              );
                              clearFieldError("otp");
                            }}
                            className={cn(
                              "w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-slate-200 placeholder:text-slate-600 outline-none transition-all tracking-[0.5em] text-center font-mono text-lg",
                              "focus:border-blue-500/50 focus:bg-slate-900 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]",
                              errors.otp &&
                                "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]",
                            )}
                            placeholder="••••••"
                          />
                        </div>
                        <div className="flex justify-between items-center mt-2 px-1">
                          <FieldError id="otp" errors={errors} />
                          {otpCooldown > 0 ? (
                            <span className="text-xs text-slate-500">
                              Resend in {otpCooldown}s
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="flex-1 h-12 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-2 h-12 bg-linear-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:grayscale"
                        >
                          {loading ? (
                            <span className="animate-pulse">Verifying...</span>
                          ) : (
                            <>
                              Verify & Login <FiCheckCircle />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
      
            
            {/* Footer / Social */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              {/* ✅ UPDATED: Use the new Component */}
              <div className="w-full ">
                <GoogleAccountLogin onSuccess={handleLoginSuccess} />
              </div>

              <div className="mt-6 space-y-3 text-center">
                <p className="text-xs text-slate-500">
                  New here? Create an account:
                </p>
                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                  <Link
                    href="/register/student"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Student Registration
                  </Link>
                  <span className="text-slate-700">|</span>
                  <Link
                    href="/register/teacher"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Faculty Registration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
