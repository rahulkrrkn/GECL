"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useApi } from "@/gecl/hooks/useApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiMapPin,
  FiLayers,
  FiCamera,
  FiLoader,
  FiCheck,
  FiImage,
  FiClock,
  FiStar,
  FiX,
  FiPaperclip,
} from "react-icons/fi";

// --- CONFIG ---
enum NotificationChannel {
  EMAIL = "EMAIL",
  WHATSAPP = "WHATSAPP",
  WEB_PUSH = "WEB_PUSH",
  SMS = "SMS",
}
enum AudienceGroup {
  PUBLIC = "PUBLIC",
  STUDENTS = "STUDENTS",
  FACULTY = "FACULTY",
  STAFF = "STAFF",
  ALUMNI = "ALUMNI",
}
enum EventMode {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID",
}

const CATEGORIES = [
  "GENERAL",
  "ACADEMIC",
  "CULTURAL",
  "SPORTS",
  "WORKSHOP",
  "SEMINAR",
  "CONFERENCE",
  "ALUMNI",
];

const BRANCHES = ["ALL", "CSE_AI", "CSE_DS", "CIVIL", "ME", "EE"];

// --- DATE HELPERS ---

const toISOStringLocal = (date: Date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const getCurrentTimeISO = () => toISOStringLocal(new Date());

const getMinAllowedDateISO = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toISOStringLocal(d);
};

const getFutureMidnightISO = (daysToAdd: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  date.setHours(0, 0, 0, 0);
  return toISOStringLocal(date);
};

// --- ANIMATION ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function AddEventsForm() {
  const { request } = useApi();
  const router = useRouter();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const getInitialState = () => ({
    type: "EVENT",
    title: "",
    summary: "",
    content: "",
    galleryEnabled: true, // Default ON
    galleryCategory: "",
    event: {
      mode: EventMode.OFFLINE,
      startDate: getFutureMidnightISO(7),
      endDate: getFutureMidnightISO(14),
      venue: "Auditorium",
      meetingLink: "",
    },
    categories: ["GENERAL"] as string[],
    branches: ["ALL"] as string[],
    audience: [AudienceGroup.PUBLIC] as string[],
    isPinned: false, // Default OFF
    publishAt: getCurrentTimeISO(),
    notification: { channels: [] as NotificationChannel[] },
  });

  const [formData, setFormData] = useState(getInitialState());
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  // UI States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Gallery Verification States
  const [verifyingGallery, setVerifyingGallery] = useState(false);
  const [galleryVerified, setGalleryVerified] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  // --- HANDLERS ---

  const handleChange = (field: string, value: any) => {
    // 1. Clear Generic Error
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // 2. Specific Logic for Gallery Category
    if (field === "galleryCategory") {
      setGalleryVerified(false);
      setGalleryError(null);
      // Explicitly clear gallery error if user starts typing
      if (errors.galleryCategory) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.galleryCategory;
          return newErrors;
        });
      }
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEventChange = (field: string, value: string) => {
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    setFormData((prev) => ({
      ...prev,
      event: { ...prev.event, [field]: value },
    }));
  };

  const handleVenueFocus = () => {
    if (formData.event.venue === "Auditorium") {
      handleEventChange("venue", "");
    }
  };

  const handleToggle = (
    key: "audience" | "categories" | "branches",
    value: string,
  ) => {
    setFormData((prev) => {
      let list = [...prev[key]];

      if (key === "branches") {
        if (value === "ALL") list = ["ALL"];
        else {
          list = list.filter((i) => i !== "ALL");
          if (list.includes(value)) list = list.filter((i) => i !== value);
          else list.push(value);
          if (list.length === 0) list = ["ALL"];
        }
      } else if (key === "audience") {
        if (value === AudienceGroup.PUBLIC) {
          list = [AudienceGroup.PUBLIC];
        } else {
          list = list.filter((i) => i !== AudienceGroup.PUBLIC);
          if (list.includes(value)) list = list.filter((i) => i !== value);
          else list.push(value);
          if (list.length === 0) list = [AudienceGroup.PUBLIC];
        }
      } else {
        if (list.includes(value)) list = list.filter((i) => i !== value);
        else list.push(value);
        if (list.length === 0) list = ["GENERAL"];
      }
      return { ...prev, [key]: list };
    });
  };

  // --- ATTACHMENT HANDLERS (FIXED) ---

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Append new files, limiting to 5 total
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles].slice(0, 5));
    }
    // Reset input value so same file can be selected again if needed
    if (e.target) e.target.value = "";
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
      // Clear error
      if (errors.coverImage) {
        setErrors((prev) => {
          const n = { ...prev };
          delete n.coverImage;
          return n;
        });
      }
    }
  };

  // --- VERIFICATION & SUBMIT ---

  const checkGalleryCategory = async () => {
    const name = formData.galleryCategory.trim();
    if (!name) {
      setGalleryError("Please enter a name first.");
      return;
    }
    setVerifyingGallery(true);
    setGalleryError(null);
    setGalleryVerified(false);

    try {
      const res = await request<any>({
        method: "POST",
        url: "/announcements/events/category",
        data: { category: name },
      });
      if (res.success) {
        setGalleryVerified(true);
      } else {
        setGalleryError(res.message || "Category already exists.");
      }
    } catch (e) {
      setGalleryError("Network error while checking.");
    } finally {
      setVerifyingGallery(false);
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    const minAllowed = getMinAllowedDateISO();

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!coverImage) newErrors.coverImage = "Cover Image is required";

    if (formData.publishAt < minAllowed)
      newErrors.global = "Publish date cannot be older than 1 day.";
    if (formData.event.startDate < minAllowed)
      newErrors.global = "Start date cannot be older than 1 day.";

    if (formData.galleryEnabled) {
      if (!formData.galleryCategory.trim()) {
        newErrors.galleryCategory = "Gallery Category Name is required";
      } else if (!galleryVerified) {
        newErrors.galleryCategory = "Please verify the category name first.";
      }
    }

    if (
      formData.event.mode !== EventMode.ONLINE &&
      !formData.event.venue.trim()
    ) {
      newErrors.venue = "Venue required for Offline events";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("type", formData.type);
      payload.append("title", formData.title);
      payload.append("summary", formData.summary || "");
      payload.append("content", formData.content);
      payload.append("galleryEnabled", String(formData.galleryEnabled));
      payload.append("isPinned", String(formData.isPinned));
      payload.append("publishAt", formData.publishAt);

      if (formData.galleryEnabled) {
        payload.append("galleryCategory", formData.galleryCategory);
      }

      formData.categories.forEach((c) => payload.append("categories[]", c));
      formData.branches.forEach((b) => payload.append("branches[]", b));
      formData.audience.forEach((a) => payload.append("audience[]", a));

      Object.entries(formData.event).forEach(([k, v]) => {
        payload.append(`event[${k}]`, String(v));
      });

      if (coverImage) payload.append("coverImage", coverImage);
      attachments.forEach((f) => payload.append("attachments", f));

      const res = await request<any>({
        method: "POST",
        url: "/announcements/events",
        data: payload,
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/announcements/events/");
        }, 1500);
      } else {
        setErrors({ global: res.message || "Failed to create event" });
      }
    } catch (e) {
      setErrors({ global: "Network Error" });
    }
    setLoading(false);
  };

  // --- RENDER SUCCESS ---
  if (success) {
    return (
      <div className="min-h-screen text-slate-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl"
        >
          <FiCheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">
            Published Successfully!
          </h2>
          <p className="text-slate-400">Redirecting you to events list...</p>
          <div className="mt-6">
            <FiLoader
              className="animate-spin mx-auto text-indigo-500"
              size={24}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // --- RENDER FORM ---
  return (
    <div className="min-h-screen text-slate-200 relative overflow-hidden pb-10">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVar}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 px-4"
      >
        {/* === LEFT COLUMN === */}
        <div className="lg:col-span-8 space-y-6">
          {/* TITLE & SUMMARY */}
          <motion.section
            variants={itemVar}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-xl"
          >
            <input
              className="w-full bg-transparent text-4xl md:text-5xl font-black text-white placeholder:text-slate-700 outline-none mb-6"
              placeholder="Event Title..."
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-400 text-xs font-bold mb-4">
                {errors.title}
              </p>
            )}

            <textarea
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-lg text-slate-300 placeholder:text-slate-600 outline-none h-28 resize-none focus:border-indigo-500/50 transition-all"
              placeholder="Short Summary (Optional)..."
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
            />
          </motion.section>

          {/* GALLERY CONFIGURATION */}
          <motion.section
            variants={itemVar}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    formData.galleryEnabled
                      ? "bg-pink-500 text-white"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  <FiCamera size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Event Gallery</h3>
                  <p className="text-xs text-slate-500">
                    Create a photo album?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleChange("galleryEnabled", !formData.galleryEnabled)
                }
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  formData.galleryEnabled ? "bg-pink-600" : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    formData.galleryEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <AnimatePresence>
              {formData.galleryEnabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mt-2">
                    <label className="text-xs font-bold text-pink-400 uppercase mb-2 block">
                      Gallery Category Name
                    </label>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="e.g. Freshers Party 2026"
                          className={`w-full bg-slate-900 border rounded-lg p-3 pr-10 text-sm text-white focus:border-pink-500 outline-none transition-colors ${
                            galleryVerified
                              ? "border-green-500/50"
                              : galleryError
                                ? "border-red-500/50"
                                : "border-slate-700"
                          }`}
                          value={formData.galleryCategory}
                          onChange={(e) =>
                            handleChange("galleryCategory", e.target.value)
                          }
                        />
                        <div className="absolute right-3 top-3">
                          {verifyingGallery && (
                            <FiLoader className="animate-spin text-pink-500" />
                          )}
                          {galleryVerified && (
                            <FiCheck className="text-green-400 text-lg" />
                          )}
                          {galleryError && (
                            <FiAlertCircle className="text-red-400" />
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={checkGalleryCategory}
                        disabled={verifyingGallery || !formData.galleryCategory}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-lg font-bold text-xs"
                      >
                        Verify
                      </button>
                    </div>

                    {galleryError && (
                      <p className="text-red-400 text-xs font-bold mt-2 flex items-center gap-1">
                        <FiAlertCircle /> {galleryError}
                      </p>
                    )}
                    {galleryVerified && (
                      <p className="text-green-400 text-xs font-bold mt-2 flex items-center gap-1">
                        <FiCheckCircle /> Category Available!
                      </p>
                    )}
                    {errors.galleryCategory && (
                      <p className="text-red-400 text-xs font-bold mt-2">
                        {errors.galleryCategory}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* MAIN CONTENT */}
          <motion.section
            variants={itemVar}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6"
          >
            <label className="text-xs font-black text-slate-500 uppercase mb-2 block">
              Full Details
            </label>
            <textarea
              className="w-full bg-transparent text-slate-300 text-lg leading-relaxed outline-none min-h-[300px] placeholder:text-slate-700 custom-scrollbar"
              placeholder="Enter schedule, rules, and detailed info..."
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
            />
            {errors.content && (
              <p className="text-red-400 text-xs font-bold mt-2">
                {errors.content}
              </p>
            )}
          </motion.section>

          {/* ATTACHMENTS SECTION (FIXED) */}
          <motion.section
            variants={itemVar}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                onClick={() => attachmentInputRef.current?.click()}
                className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer text-slate-400 hover:text-white"
              >
                <FiUploadCloud size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Attachments</h4>
                <p className="text-xs text-slate-500">
                  {attachments.length} files selected (PDF, DOC)
                </p>
              </div>
              <input
                type="file"
                multiple
                ref={attachmentInputRef}
                className="hidden"
                onChange={handleAttachmentChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
              />
            </div>

            {/* Render Uploaded Files List */}
            {attachments.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {attachments.map((file, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-lg group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                        <FiPaperclip size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-300 truncate max-w-[150px]">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="text-slate-600 hover:text-red-400 p-2 transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>

        {/* === RIGHT COLUMN === */}
        <div className="lg:col-span-4 space-y-6">
          {/* LOGISTICS */}
          <motion.section
            variants={itemVar}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5"
          >
            <div className="flex items-center gap-2 text-sm font-black text-white uppercase">
              <FiLayers /> Logistics
            </div>

            {/* Mode */}
            <div className="flex bg-slate-950 rounded-lg p-1">
              {Object.values(EventMode).map((m) => (
                <button
                  key={m}
                  onClick={() => handleEventChange("mode", m)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded uppercase transition ${
                    formData.event.mode === m
                      ? "bg-indigo-600 text-white"
                      : "text-slate-500"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Dates */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Starts
                </label>
                <input
                  type="datetime-local"
                  min={getMinAllowedDateISO()}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-bold text-white outline-none"
                  value={formData.event.startDate}
                  onChange={(e) =>
                    handleEventChange("startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Ends
                </label>
                <input
                  type="datetime-local"
                  min={getMinAllowedDateISO()}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-bold text-white outline-none"
                  value={formData.event.endDate}
                  onChange={(e) => handleEventChange("endDate", e.target.value)}
                />
              </div>
            </div>

            {/* Venue */}
            {formData.event.mode !== EventMode.ONLINE && (
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Venue{" "}
                  {errors.venue && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    className={`w-full bg-slate-950 border rounded-lg pl-9 p-2 text-xs font-bold text-white outline-none focus:border-indigo-500 ${
                      errors.venue ? "border-red-500" : "border-slate-800"
                    }`}
                    value={formData.event.venue}
                    onFocus={handleVenueFocus}
                    onChange={(e) => handleEventChange("venue", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Link */}
            {formData.event.mode !== EventMode.OFFLINE && (
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Meeting Link
                </label>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-bold text-white outline-none"
                  value={formData.event.meetingLink}
                  onChange={(e) =>
                    handleEventChange("meetingLink", e.target.value)
                  }
                />
              </div>
            )}
          </motion.section>

          {/* BANNER (Required) */}
          <motion.section
            variants={itemVar}
            className={`bg-slate-900 border rounded-3xl p-2 ${
              errors.coverImage ? "border-red-500" : "border-slate-800"
            }`}
          >
            <div
              onClick={() => coverInputRef.current?.click()}
              className="aspect-video bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500 cursor-pointer flex flex-col items-center justify-center overflow-hidden relative"
            >
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <FiImage className="text-slate-600 mb-2" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Upload Banner *
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              ref={coverInputRef}
              className="hidden"
              onChange={handleCoverChange}
              accept="image/*"
            />
            {errors.coverImage && (
              <p className="text-red-400 text-[10px] font-bold text-center mt-1">
                Required
              </p>
            )}
          </motion.section>

          {/* CATEGORY & AUDIENCE & BRANCHES */}
          <motion.section
            variants={itemVar}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4"
          >
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
                Audience
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(AudienceGroup).map((aud) => (
                  <button
                    key={aud}
                    onClick={() => handleToggle("audience", aud)}
                    className={`px-2 py-1 text-[10px] font-bold rounded border uppercase ${
                      formData.audience.includes(aud)
                        ? "bg-white text-black border-white"
                        : "bg-slate-950 text-slate-500 border-slate-800"
                    }`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleToggle("categories", cat)}
                    className={`px-2 py-1 text-[10px] font-bold rounded border uppercase ${
                      formData.categories.includes(cat)
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-slate-950 text-slate-500 border-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
                Branches
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BRANCHES.map((br) => (
                  <button
                    key={br}
                    onClick={() => handleToggle("branches", br)}
                    className={`px-2 py-1 text-[10px] font-bold rounded border uppercase ${
                      formData.branches.includes(br)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-slate-950 text-slate-500 border-slate-800"
                    }`}
                  >
                    {br.replace("_", "-")}
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ PUBLISH TIME */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
                Publish Date & Time
              </label>
              <div className="relative">
                <FiClock className="absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="datetime-local"
                  min={getMinAllowedDateISO()}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 pl-9 text-xs font-bold text-white outline-none focus:border-indigo-500 transition-colors"
                  value={formData.publishAt}
                  onChange={(e) => handleChange("publishAt", e.target.value)}
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={formData.isPinned}
                  onChange={(e) => handleChange("isPinned", e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                />
                <label
                  htmlFor="pinCheck"
                  className="text-xs font-bold text-slate-400 select-none flex items-center gap-1"
                >
                  <FiStar
                    className={formData.isPinned ? "text-amber-400" : ""}
                  />
                  Pin this event to top
                </label>
              </div>
            </div>

            {/* ✅ PUBLISH BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" /> PUBLISHING...
                  </>
                ) : (
                  <>
                    <FiSend /> PUBLISH EVENT
                  </>
                )}
              </button>

              {errors.global && (
                <div className="mt-4 text-center">
                  <span className="text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-2">
                    <FiAlertCircle /> {errors.global}
                  </span>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
