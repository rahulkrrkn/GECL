"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useApi } from "@/gecl/hooks/useApi";
// IMPORT TYPES FROM YOUR UTILS
import type { ApiFailure } from "@/gecl/utils/apiRequest";

import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiHash,
  FiCheckCircle,
  FiCpu,
  FiAlertCircle,
  FiX,
  FiClock,
  FiCamera,
  FiUploadCloud,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";

// ----------------------------
// Constants & Types
// ----------------------------

// Data type for Step 2 Response
interface OtpVerifyData {
  email: string;
  REGISTRATION_KEY: string;
}

// ----------------------------
// Zod Schemas
// ----------------------------

const step1Schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid academic/personal email"),
});

const step2Schema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const step3Schema = z
  .object({
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit mobile number"),
    regNo: z.string().min(5, "Invalid Registration Number").max(20, "Too long"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ----------------------------
// UI Components (Typed)
// ----------------------------

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
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
      role="alert"
    >
      <FiAlertCircle className="text-lg mt-0.5 text-red-400 shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-red-400">Registration Error</p>
        <p className="opacity-90">{message}</p>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        <FiX />
      </button>
    </motion.div>
  );
}

// Fixed Input Props Interface
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  // Override onChange to keep it simple for state updates
  onChange: (e: any) => void;
}

function Input({
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly,
  label,
  error,
  rightSlot,
  inputMode,
}: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
          {icon}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)} // Pass string directly
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
          inputMode={inputMode}
          className={cn(
            "w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all",
            !readOnly &&
              "focus:border-blue-500/50 focus:bg-slate-900 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] hover:border-slate-700",
            readOnly && "opacity-60 cursor-not-allowed bg-slate-900/30",
            error &&
              "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]",
          )}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-400 pl-1 flex items-center gap-1"
        >
          <FiAlertCircle className="text-[10px]" /> {error}
        </motion.div>
      )}
    </div>
  );
}

// Fixed Select Props Interface
interface SelectProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

function StepIndicator({ currentStep }: { currentStep: string }) {
  if (currentStep === "success") return null;
  const steps = [
    { id: "identity", label: "Identity" },
    { id: "otp", label: "Verify" },
    { id: "academic", label: "Academic" },
    { id: "photo", label: "Photo" },
  ];
  const getStatus = (id: string) => {
    if (currentStep === id) return "active";
    const order = ["identity", "otp", "academic", "photo", "success"];
    if (order.indexOf(currentStep) > order.indexOf(id)) return "done";
    return "pending";
  };
  return (
    <nav
      aria-label="Progress"
      className="flex items-center justify-between mb-8 relative"
    >
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10" />
      {steps.map((s, idx) => {
        const status = getStatus(s.id);
        return (
          <div
            key={s.id}
            className="flex flex-col items-center gap-2 bg-primary px-1 z-10"
          >
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all",
                status === "active"
                  ? "border-blue-500 bg-blue-500 text-white scale-110"
                  : status === "done"
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-500"
                    : "border-slate-700 bg-slate-800 text-slate-500",
              )}
            >
              {status === "done" ? <FiCheckCircle /> : idx + 1}
            </div>
            <span
              className={cn(
                "text-[9px] uppercase font-bold tracking-wider",
                status === "active"
                  ? "text-blue-400"
                  : status === "done"
                    ? "text-emerald-500"
                    : "text-slate-600",
              )}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

const anim = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// ----------------------------
// MAIN COMPONENT
// ----------------------------

export default function StudentRegisterForm() {
  const { request } = useApi();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<
    "identity" | "otp" | "academic" | "photo" | "success"
  >("identity");

  // State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    regNo: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [registrationKey, setRegistrationKey] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const collegeName = "Government Engineering College";
  const collegeLocation = "Lakhisarai";
  const imagePath =
    "/gecl/images/college/gecl-government-engineering-college-lakhisarai.webp";

  // --- Helpers ---
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    setServerError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, profilePhoto: "Max 2MB allowed" }));
        return;
      }
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy["profilePhoto"];
        return copy;
      });
    }
  };

  // Fixed: Accepts ApiFailure from utils, not a local interface
  const handleApiError = (res: ApiFailure) => {
    const code = res.code || "UNKNOWN";
    const msg = res.message || "An error occurred.";

    if (code === "EMAIL_ALREADY_REGISTERED") setErrors({ email: msg });
    else if (code === "OTP_INVALID" || code === "OTP_EXPIRED")
      setErrors({ otp: msg });
    else if (code === "USER_ALREADY_EXISTS")
      setServerError("Student with this Reg No or Email already exists.");
    else setServerError(msg);
  };

  // --- STEPS LOGIC ---

  // 1. Send OTP
  async function sendOtp() {
    setErrors({});
    setServerError(null);
    const parsed = step1Schema.safeParse(formData);
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
      // Use 'unknown' for data if none expected
      const res = await request<unknown>(
        {
          method: "POST",
          url: "/auth/registration/otp/send",
          data: { email: formData.email },
        },
        { showSuccessMsg: true, showMsg: false, showErrorMsg: false },
      );

      if (res.success) {
        setStep("otp");
      } else {
        handleApiError(res);
      }
    } catch {
      setServerError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  // 2. Verify OTP
  async function verifyOtp() {
    setErrors({});
    setServerError(null);
    const parsed = step2Schema.safeParse({ otp });
    if (!parsed.success) {
      setErrors({ otp: parsed.error.issues[0].message });
      return;
    }

    setLoading(true);
    try {
      const res = await request<OtpVerifyData>(
        {
          method: "POST",
          url: "/auth/registration/otp/verify",
          data: { email: formData.email, otp },
        },
        { showSuccessMsg: true, showMsg: false, showErrorMsg: false },
      );

      if (res.success) {
        console.log("res", res);

        setRegistrationKey(res.data.REGISTRATION_KEY);
        setStep("academic");
      } else {
        handleApiError(res);
      }
    } catch {
      setServerError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  // 3. Validate Details (Local)
  function validateDetails() {
    setErrors({});
    const parsed = step3Schema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStep("photo");
  }

  // 4. Submit Registration
  async function submitRegistration() {
    if (!profileFile) {
      setErrors({ profilePhoto: "Profile photo is required" });
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      // Identity
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("mobile", formData.mobile);
      data.append("password", formData.password);
      data.append("REGISTRATION_KEY", registrationKey);

      // Academic
      data.append("regNo", formData.regNo);

      // File
      data.append("profilePhoto", profileFile);

      const res = await request<unknown>(
        {
          method: "POST",
          url: "/auth/registration/student",
          data: data,
        },
        { showSuccessMsg: false, showMsg: false, showErrorMsg: false },
      );
      console.log("res", res);

      if (res.success) {
        setStep("success");
      } else {
        handleApiError(res);
      }
    } catch {
      setServerError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: "#0f172a" }}
    >
      {/* SEO Heading */}
      <h1 className="sr-only">
        Student Registration - Government Engineering College Lakhisarai
      </h1>

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
        {/* LEFT PANEL */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col justify-between p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={imagePath}
              alt="GEC Lakhisarai Campus View"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-primary via-primary/90 to-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FiCpu className="text-xl" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
                Student Portal
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Future <br /> Engineers
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering the youth of Bihar with technical excellence. Access
              your B.Tech curriculum, and digital resources.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <FiMapPin /> <span>{collegeLocation} Campus</span>
            </div>
          </div>
        </motion.section>

        {/* RIGHT PANEL: Form */}
        <section className="flex flex-col justify-center">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />

            {step !== "success" && (
              <div className="mb-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {step === "identity" && "Student Identity"}
                    {step === "otp" && "Verify Email"}
                    {step === "academic" && "Academic Info"}
                    {step === "photo" && "Student Photo"}
                  </h3>
                </div>
                <Link
                  href="/login"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Already registered?
                </Link>
              </div>
            )}

            <StepIndicator currentStep={step} />
            <AnimatePresence>
              {serverError && (
                <GeneralError
                  message={serverError}
                  onClose={() => setServerError(null)}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* STEP 1: IDENTITY */}
              {step === "identity" && (
                <motion.div key="identity" {...anim} className="space-y-6">
                  <Input
                    label="Full Name"
                    icon={<FiUser />}
                    value={formData.fullName}
                    onChange={(v: string) => handleChange("fullName", v)}
                    placeholder="Rahul Kumar"
                    error={errors.fullName}
                  />
                  <Input
                    label="Student Email"
                    icon={<FiMail />}
                    value={formData.email}
                    onChange={(v: string) => handleChange("email", v)}
                    placeholder="rahulkrrkn@gmail.com"
                    error={errors.email}
                  />
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
                    <span className="text-blue-400 font-bold">Note:</span> Use
                    the email you will use for college communication.
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={loading}
                    className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? "Sending OTP..." : "Verify Identity"}{" "}
                    <FiArrowRight />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: OTP */}
              {step === "otp" && (
                <motion.div key="otp" {...anim} className="space-y-6">
                  <Input
                    label="Email Sent To"
                    icon={<FiMail />}
                    value={formData.email}
                    onChange={() => {}}
                    readOnly
                    rightSlot={
                      <button
                        onClick={() => {
                          setStep("identity");
                          setOtp("");
                          setServerError(null);
                        }}
                        className="text-xs text-blue-400 underline"
                      >
                        Change
                      </button>
                    }
                  />
                  <Input
                    label="One-Time Password"
                    icon={<FiLock />}
                    value={otp}
                    onChange={(v: string) => {
                      setOtp(v.replace(/\D/g, ""));
                      if (errors.otp) setErrors((p) => ({ ...p, otp: "" }));
                    }}
                    placeholder="123456"
                    inputMode="numeric"
                    error={errors.otp}
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={loading}
                    className="w-full h-12 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? "Verifying..." : "Confirm OTP"} <FiArrowRight />
                  </button>
                </motion.div>
              )}

              {/* STEP 3: ACADEMIC DETAILS */}
              {step === "academic" && (
                <motion.div key="academic" {...anim} className="space-y-5">
                  <Input
                    label="Mobile Number"
                    icon={<FiPhone />}
                    value={formData.mobile}
                    onChange={(v: string) => handleChange("mobile", v)}
                    placeholder="8877788288"
                    inputMode="numeric"
                    error={errors.mobile}
                  />

                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                  <Input
                    label="Registration Number"
                    icon={<FiHash />}
                    value={formData.regNo}
                    onChange={(v: string) => handleChange("regNo", v)}
                    placeholder="25151158XXX"
                    error={errors.regNo}
                  />

                  {/* </div> */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Password"
                      icon={<FiLock />}
                      value={formData.password}
                      onChange={(v: string) => handleChange("password", v)}
                      placeholder="Secure password"
                      type={showPassword ? "text" : "password"}
                      error={errors.password}
                      rightSlot={
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-1 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      }
                    />
                    <Input
                      label="Confirm"
                      icon={<FiLock />}
                      value={formData.confirmPassword}
                      onChange={(v: string) =>
                        handleChange("confirmPassword", v)
                      }
                      placeholder="Repeat password"
                      type={showConfirmPassword ? "text" : "password"}
                      error={errors.confirmPassword}
                      rightSlot={
                        <button
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="p-1 text-slate-500 hover:text-slate-300"
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      }
                    />
                  </div>

                  <button
                    onClick={validateDetails}
                    className="w-full h-12 bg-white text-slate-900 font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Next: Upload Photo <FiArrowRight />
                  </button>
                </motion.div>
              )}

              {/* STEP 4: PHOTO UPLOAD */}
              {step === "photo" && (
                <motion.div
                  key="photo"
                  {...anim}
                  className="space-y-6 text-center"
                >
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div
                        className={cn(
                          "w-32 h-32 rounded-full overflow-hidden border-4 flex items-center justify-center transition-all shadow-xl",
                          errors.profilePhoto
                            ? "border-red-500 bg-red-500/10"
                            : "border-slate-700 bg-slate-900 group-hover:border-blue-500",
                        )}
                      >
                        {profilePhotoPreview ? (
                          <Image
                            src={profilePhotoPreview}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="text-center">
                            <FiCamera className="text-3xl text-slate-500 mx-auto mb-2 group-hover:text-blue-400" />
                            <span className="text-xs text-slate-500 group-hover:text-blue-400">
                              Click to Upload
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                          <FiUploadCloud className="text-white text-2xl" />
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    {errors.profilePhoto && (
                      <p className="text-xs text-red-400 mt-2 font-medium">
                        {errors.profilePhoto}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={submitRegistration}
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? "Registering..." : "Submit Registration"}{" "}
                    <FiCheckCircle />
                  </button>
                  <button
                    onClick={() => setStep("academic")}
                    className="text-xs text-slate-500 hover:text-slate-300 underline"
                  >
                    Back to details
                  </button>
                </motion.div>
              )}

              {/* STEP 5: SUCCESS */}
              {step === "success" && (
                <motion.div
                  key="success"
                  {...anim}
                  className="text-center py-10 px-4"
                >
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
                    <FiClock className="text-4xl text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Application Submitted
                  </h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Your student registration is pending approval. You will be
                    notified via email once approved by the administration.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Return to Login <FiArrowRight />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
