"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // ✅ Added Variants type
import { useApi } from "@/gecl/hooks/useApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiX,
  FiAlertCircle,
  FiSend,
  FiPaperclip,
  FiCalendar,
  FiUsers,
  FiTag,
  FiImage,
  FiMapPin,
  FiVideo,
  FiClock,
  FiLayers,
  FiLayout,
  FiInfo,
  FiCpu,
  FiHome,
  FiEye,
  FiPlus,
  FiDollarSign,
  FiAlignLeft,
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
  "ACADEMIC",
  "CULTURAL",
  "SPORTS",
  "WORKSHOP",
  "SEMINAR",
  "CONFERENCE",
  "ALUMNI",
];
const BRANCHES = [
  "ALL",
  "CSE_AI",
  "CSE_DS",
  "CIVIL",
  "EE",
  "ME",
  "SCIENCE_HUMANITIES",
];

const getNowString = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

// --- ANIMATION VARIANTS (FIXED TYPES) ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
};

export default function AddEventsForm() {
  const { request } = useApi();
  const router = useRouter();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // --- INITIAL STATE ---
  const getInitialState = () => ({
    type: "EVENT",
    title: "",
    summary: "",
    content: "",
    event: {
      mode: EventMode.OFFLINE,
      startDate: getNowString(),
      endDate: "",
      venue: "",
      meetingLink: "",
    },
    categories: [] as string[],
    branches: ["ALL"] as string[],
    audience: [AudienceGroup.PUBLIC] as AudienceGroup[],
    isPinned: false,
    publishAt: getNowString(),
    notification: { channels: [] as NotificationChannel[] },
  });

  const [formData, setFormData] = useState(getInitialState());
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCostly =
    formData.notification.channels.includes(NotificationChannel.WHATSAPP) ||
    formData.notification.channels.includes(NotificationChannel.SMS);

  // --- HANDLERS ---

  const handleReset = () => {
    setFormData(getInitialState());
    setCoverImage(null);
    setCoverPreview(null);
    setAttachments([]);
    setErrors({});
    setCreatedSlug(null);
    setSuccess(false);
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "title") setFormData({ ...formData, title: value });
    else if (field === "summary") setFormData({ ...formData, summary: value });
    else if (field === "content") setFormData({ ...formData, content: value });
  };

  const handleEventChange = (field: string, value: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => ({
      ...prev,
      event: { ...prev.event, [field]: value },
    }));
  };

  const handleToggle = (
    key: "audience" | "categories" | "branches",
    value: string,
  ) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    setFormData((prev) => {
      let list = [...prev[key]];
      if (key === "branches") {
        if (value === "ALL") list = ["ALL"];
        else {
          if (list.includes("ALL")) list = [];
          if (list.includes(value)) list = list.filter((i) => i !== value);
          else list.push(value);
          if (list.length === 0) list = ["ALL"];
        }
      } else if (key === "audience") {
        if (value === "PUBLIC") list = ["PUBLIC"];
        else {
          list = list
            .filter((i) => i !== "PUBLIC")
            .concat(value as AudienceGroup);
          if (list.includes(value)) list = list.filter((i) => i !== value);
          else list.push(value);
          list = Array.from(new Set(list));
        }
      } else {
        if (list.includes(value)) list = list.filter((i) => i !== value);
        else list.push(value);
      }
      return { ...prev, [key]: list };
    });
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Event Headline is required";
      isValid = false;
    }
    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required";
      isValid = false;
    }
    if (!formData.content.trim()) {
      newErrors.content = "Event details are required";
      isValid = false;
    }
    if (formData.audience.length === 0) {
      newErrors.audience = "Target Audience required";
      isValid = false;
    }

    if (
      formData.event.mode !== EventMode.ONLINE &&
      !formData.event.venue.trim()
    ) {
      newErrors.venue = "Venue required";
      isValid = false;
    }
    if (
      formData.event.mode !== EventMode.OFFLINE &&
      !formData.event.meetingLink.trim()
    ) {
      newErrors.meetingLink = "Link required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === "event") {
          Object.entries(formData.event).forEach(([ek, ev]) => {
            if (ev) payload.append(`event[${ek}]`, String(ev));
          });
        } else if (Array.isArray(v)) {
          v.forEach((i) => payload.append(`${k}[]`, i));
        } else if (k === "notification") {
          formData.notification.channels.forEach((c) =>
            payload.append("notification[channels][]", c),
          );
        } else {
          payload.append(k, String(v));
        }
      });
      if (coverImage) payload.append("coverImage", coverImage);
      attachments.forEach((f) => payload.append("attachments", f));

      const res = await request<any>({
        method: "POST",
        url: "/announcements/events",
        data: payload,
      });

      if (res.success) {
        const dataObj = res.data?.data || res.data;
        const slug = dataObj?.slug || dataObj?._id || "";
        setCreatedSlug(slug);
        setSuccess(true);
      } else {
        setErrors({ global: res.message });
      }
    } catch {
      setErrors({ global: "Network connection failed." });
    }
    setLoading(false);
  };

  if (success)
    return (
      <div className="min-h-screen text-slate-200 flex items-center justify-center p-4 relative">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden z-50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />

          <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-indigo-500/30">
            <FiCheckCircle size={48} className="text-indigo-400" />
          </div>

          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
            Event Published!
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Your event is live. What would you like to do next?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            <Link
              href="/"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-800 border border-slate-700 hover:border-slate-500 hover:bg-slate-750 transition-all group"
            >
              <FiHome
                size={24}
                className="text-slate-400 group-hover:text-white"
              />
              <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-wider">
                Dashboard
              </span>
            </Link>

            <Link
              href={
                createdSlug
                  ? `/announcements/events/${createdSlug}`
                  : "/announcements/events"
              }
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/50 group"
            >
              <FiEye size={24} className="text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                View Event
              </span>
            </Link>

            <button
              type="button"
              onClick={handleReset}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-800 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-750 transition-all group"
            >
              <FiPlus
                size={24}
                className="text-indigo-400 group-hover:text-indigo-300"
              />
              <span className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 uppercase tracking-wider">
                Create New
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen text-slate-200 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVar}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32 relative"
      >
        <div className="lg:col-span-8 space-y-8">
          <motion.section
            variants={itemVar}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-8">
              <div>
                <input
                  className={`w-full bg-transparent text-4xl md:text-5xl font-black text-white placeholder:text-slate-700 outline-none leading-tight tracking-tight ${errors.title ? "placeholder:text-red-900/50" : ""}`}
                  placeholder="Event Title..."
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-2 font-bold flex items-center gap-1">
                    <FiAlertCircle /> {errors.title}
                  </p>
                )}
              </div>
              <div className="relative group/summary">
                <textarea
                  className={`w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-5 text-lg text-slate-300 placeholder:text-slate-600 outline-none focus:border-indigo-500/50 transition-all resize-none leading-relaxed h-32 ${errors.summary ? "border-red-500/30 bg-red-900/5" : ""}`}
                  placeholder="Write a captivating summary for the event card..."
                  maxLength={500}
                  value={formData.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                />
                {errors.summary && (
                  <p className="absolute bottom-4 left-4 text-red-400 text-xs font-bold">
                    {errors.summary}
                  </p>
                )}
                <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-600">
                  {formData.summary.length}/500
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVar} className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-2 flex items-center gap-2">
              <FiAlignLeft /> Detailed Agenda{" "}
              {errors.content && <span className="text-red-500">*</span>}
            </label>
            <div
              className={`bg-slate-900/60 backdrop-blur-xl border rounded-3xl p-6 transition-all ${errors.content ? "border-red-500/30 shadow-red-900/10 shadow-lg" : "border-slate-800 hover:border-indigo-500/30"}`}
            >
              <textarea
                className="w-full bg-transparent text-slate-300 text-lg leading-loose outline-none resize-none font-serif min-h-[400px] placeholder:text-slate-700 custom-scrollbar"
                placeholder="Enter full event details (Schedule, Rules, etc)..."
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
              />
              {errors.content && (
                <p className="text-red-400 text-xs mt-2 font-bold pt-4 border-t border-red-500/10 flex items-center gap-2">
                  <FiAlertCircle /> {errors.content}
                </p>
              )}
            </div>
          </motion.section>

          <motion.section
            variants={itemVar}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg"
          >
            <div
              onClick={() => attachmentInputRef.current?.click()}
              className="flex items-center gap-5 cursor-pointer group flex-1"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-lg">
                <FiUploadCloud
                  size={24}
                  className="text-slate-400 group-hover:text-white"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">
                  Upload Files
                </h4>
                <p className="text-xs text-slate-500 font-bold uppercase">
                  PDF, DOCX (Max 5)
                </p>
              </div>
            </div>
            <div className="flex-1 w-full grid grid-cols-1 gap-2">
              {attachments.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 group/item"
                >
                  <span className="truncate flex items-center gap-3">
                    <FiPaperclip className="text-indigo-500" /> {f.name}
                  </span>
                  <button
                    onClick={() =>
                      setAttachments(attachments.filter((_, x) => x !== i))
                    }
                    className="text-slate-600 hover:text-red-400 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              <input
                type="file"
                multiple
                ref={attachmentInputRef}
                className="hidden"
                onChange={handleAttachmentChange}
                accept=".pdf,.doc,.docx,.png,.jpg"
              />
            </div>
          </motion.section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <motion.section
            variants={itemVar}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 text-sm font-black text-white uppercase tracking-wider mb-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FiLayers />
              </span>{" "}
              Logistics
            </div>

            <div className="flex gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {Object.values(EventMode).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      event: { ...prev.event, mode: m },
                    }))
                  }
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase transition-all ${formData.event.mode === m ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 ml-1">
                  Starts
                </label>
                <div className="relative bg-slate-950 border border-slate-800 rounded-xl focus-within:border-indigo-500/50 transition-colors">
                  <FiCalendar className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400" />
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent border-none pl-10 p-2.5 text-sm font-bold text-slate-200 outline-none color-scheme-dark"
                    value={formData.event.startDate}
                    onChange={(e) =>
                      handleEventChange("startDate", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="group">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 ml-1">
                  Ends
                </label>
                <div className="relative bg-slate-950 border border-slate-800 rounded-xl focus-within:border-indigo-500/50 transition-colors">
                  <FiClock className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400" />
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent border-none pl-10 p-2.5 text-sm font-bold text-slate-200 outline-none color-scheme-dark"
                    value={formData.event.endDate}
                    onChange={(e) =>
                      handleEventChange("endDate", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div
                className={
                  formData.event.mode === EventMode.ONLINE
                    ? "opacity-30 pointer-events-none grayscale"
                    : ""
                }
              >
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 ml-1">
                  Venue{" "}
                  {errors.venue && <span className="text-red-500">*</span>}
                </label>
                <div
                  className={`relative bg-slate-950 border rounded-xl transition-all ${errors.venue ? "border-red-500/50 ring-1 ring-red-500/20" : "border-slate-800 focus-within:border-indigo-500/50"}`}
                >
                  <FiMapPin
                    className={`absolute left-3 top-3 ${errors.venue ? "text-red-400" : "text-slate-500"}`}
                  />
                  <input
                    type="text"
                    className="w-full bg-transparent border-none pl-10 p-2.5 text-sm font-bold text-slate-200 outline-none placeholder:text-slate-700"
                    placeholder="e.g. Auditorium"
                    value={formData.event.venue}
                    onChange={(e) => handleEventChange("venue", e.target.value)}
                  />
                </div>
                {errors.venue && (
                  <p className="text-red-400 text-[10px] mt-1 ml-1 font-bold">
                    {errors.venue}
                  </p>
                )}
              </div>

              <div
                className={
                  formData.event.mode === EventMode.OFFLINE
                    ? "opacity-30 pointer-events-none grayscale"
                    : ""
                }
              >
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 ml-1">
                  Link{" "}
                  {errors.meetingLink && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <div
                  className={`relative bg-slate-950 border rounded-xl transition-all ${errors.meetingLink ? "border-red-500/50 ring-1 ring-red-500/20" : "border-slate-800 focus-within:border-indigo-500/50"}`}
                >
                  <FiVideo
                    className={`absolute left-3 top-3 ${errors.meetingLink ? "text-red-400" : "text-slate-500"}`}
                  />
                  <input
                    type="url"
                    className="w-full bg-transparent border-none pl-10 p-2.5 text-sm font-bold text-slate-200 outline-none placeholder:text-slate-700"
                    placeholder="https://..."
                    value={formData.event.meetingLink}
                    onChange={(e) =>
                      handleEventChange("meetingLink", e.target.value)
                    }
                  />
                </div>
                {errors.meetingLink && (
                  <p className="text-red-400 text-[10px] mt-1 ml-1 font-bold">
                    {errors.meetingLink}
                  </p>
                )}
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={itemVar}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-xl"
          >
            <div
              onClick={() => coverInputRef.current?.click()}
              className="relative aspect-video bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 cursor-pointer group flex flex-col items-center justify-center overflow-hidden transition-all"
            >
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center">
                  <FiImage className="mx-auto text-slate-600 mb-2" />
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Banner
                  </span>
                </div>
              )}
              <input
                type="file"
                ref={coverInputRef}
                className="hidden"
                onChange={handleCoverChange}
                accept="image/*"
              />
            </div>
          </motion.section>

          <motion.section
            variants={itemVar}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6"
          >
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">
                Audience
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(AudienceGroup).map((aud) => (
                  <button
                    key={aud}
                    onClick={() => handleToggle("audience", aud)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border uppercase transition-all ${formData.audience.includes(aud) ? "bg-white text-slate-900" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-500 uppercase mb-3 block flex items-center gap-2">
                <FiCpu /> Branches
              </label>
              <div className="flex flex-wrap gap-2">
                {BRANCHES.map((br) => (
                  <button
                    key={br}
                    onClick={() => handleToggle("branches", br)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border uppercase transition-all ${formData.branches.includes(br) ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                  >
                    {br.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleToggle("categories", cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border uppercase transition-all ${formData.categories.includes(cat) ? "bg-purple-600 text-white" : "bg-slate-950 text-slate-500 border-slate-800"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 p-4 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {errors.global ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-400 font-bold text-xs bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
                >
                  <FiAlertCircle /> {errors.global}
                </motion.div>
              ) : isCostly ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20"
                >
                  <FiDollarSign /> Costly! Avoid if possible.
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <FiInfo className="text-indigo-500" /> Ready to publish
                </div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-3">
              {Object.values(NotificationChannel).map((ch) => (
                <label
                  key={ch}
                  className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border cursor-pointer ${formData.notification.channels.includes(ch) ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/50" : "text-slate-600 border-slate-800"}`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={formData.notification.channels.includes(ch)}
                    onChange={() => {
                      const active =
                        formData.notification.channels.includes(ch);
                      setFormData((p) => ({
                        ...p,
                        notification: {
                          channels: active
                            ? p.notification.channels.filter((c) => c !== ch)
                            : [...p.notification.channels, ch],
                        },
                      }));
                    }}
                  />{" "}
                  {ch.replace("_", " ")}
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm flex items-center gap-2"
            >
              {loading ? (
                <FiLayout className="animate-spin" />
              ) : (
                <>
                  <FiSend /> Publish
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
