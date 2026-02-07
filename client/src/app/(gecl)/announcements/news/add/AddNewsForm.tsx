"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "@/gecl/hooks/useApi";
import Image from "next/image";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiX,
  FiAlertCircle,
  FiSend,
  FiPaperclip,
  FiBell,
  FiCalendar,
  FiSmartphone,
  FiUsers,
  FiTag,
  FiCpu,
  FiFile,
  FiMessageCircle,
  FiImage,
  FiAlignLeft,
} from "react-icons/fi";
import { LuNewspaper } from "react-icons/lu";

// Enums
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

const CATEGORIES = [
  "ACADEMIC",
  "EVENT",
  "ACHIEVEMENT",
  "SPORTS",
  "CULTURAL",
  "WORKSHOP",
  "SEMINAR",
  "PLACEMENT",
  "ALUMNI_MEET",
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

export default function AddNewsForm() {
  const { request } = useApi();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    type: "NEWS",
    title: "",
    summary: "", // New Field
    content: "",
    categories: [] as string[],
    branches: ["ALL"] as string[],
    audience: [AudienceGroup.PUBLIC] as AudienceGroup[],
    isPinned: false,
    publishAt: getNowString(),
    notification: { channels: [] as NotificationChannel[] },
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if expensive channels are selected
  const hasExpensiveChannels = formData.notification.channels.some(
    (ch) =>
      ch === NotificationChannel.WHATSAPP || ch === NotificationChannel.SMS,
  );

  const handleToggle = (
    key: "audience" | "branches" | "categories",
    value: string,
  ) => {
    setFormData((prev) => {
      let list = [...prev[key]];
      if (list.includes(value)) {
        list = list.filter((i) => i !== value);
      } else {
        if (value === "PUBLIC") list = ["PUBLIC"];
        else if (key === "audience")
          list = list
            .filter((i) => i !== "PUBLIC")
            .concat(value as AudienceGroup);
        else if (value === "ALL") list = ["ALL"];
        else if (key === "branches")
          list = list.filter((i) => i !== "ALL").concat(value);
        else list.push(value);
      }
      return { ...prev, [key]: list };
    });
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length > 5) {
        setErrorMsg("Maximum 5 attachments allowed.");
        return;
      }
      setAttachments((prev) => [...prev, ...newFiles]);
      setErrorMsg(null);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("Cover image must be less than 5MB");
        return;
      }
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.summary || formData.audience.length === 0)
      return setErrorMsg("Title, Summary and Audience are required.");

    setLoading(true);
    try {
      const payload = new FormData();

      // Append Basic Data
      Object.entries(formData).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((i) => payload.append(`${k}[]`, i));
        else if (k === "notification")
          formData.notification.channels.forEach((c) =>
            payload.append("notification[channels][]", c),
          );
        else payload.append(k, String(v));
      });

      // Append Files
      if (coverImage) payload.append("coverImage", coverImage);
      attachments.forEach((f) => payload.append("attachments", f));

      const res = await request<any>({
        method: "POST",
        url: "/announcements/news", // Updated Endpoint
        data: payload,
      });

      if (res.success) setSuccess(true);
      else setErrorMsg(res.message);
    } catch {
      setErrorMsg("Network error. Try again.");
    }
    setLoading(false);
  };

  if (success)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl"
      >
        <FiCheckCircle size={60} className="text-emerald-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">News Published</h2>
        <p className="text-slate-400 mb-6">Your article is now live.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl transition-all hover:bg-emerald-500"
        >
          Write Another Article
        </button>
      </motion.div>
    );

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-8 space-y-6">
        {/* WRITING SECTION */}
        <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Title */}
          <div className="relative group">
            <input
              className="w-full bg-transparent border-b border-slate-800 py-3 text-2xl font-bold text-white outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700"
              placeholder="News Headline..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <LuNewspaper
              className="absolute right-2 top-4 text-slate-600 group-focus-within:text-emerald-500 transition-colors"
              size={20}
            />
          </div>

          {/* Summary */}
          <div className="relative group">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase">
              <FiAlignLeft className="text-emerald-500" /> Short Summary
            </div>
            <textarea
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 outline-none h-24 focus:border-emerald-500/50 transition-all resize-none leading-relaxed"
              placeholder="Brief summary displayed on news cards (Max 500 chars)..."
              maxLength={500}
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
            <div className="text-[10px] text-right text-slate-600 mt-1">
              {formData.summary.length}/500
            </div>
          </div>

          {/* Main Content */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase">
              <FiFile className="text-emerald-500" /> Full Content
            </div>
            <textarea
              className="w-full bg-slate-950/30 border border-slate-800 rounded-xl p-5 text-[15px] text-slate-200 outline-none min-h-96 focus:border-emerald-500/40 transition-all resize-none leading-relaxed font-serif"
              placeholder="Write the detailed article here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>
        </section>

        {/* ATTACHMENTS SECTION */}
        <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <div
            onClick={() =>
              attachments.length < 5 && attachmentInputRef.current?.click()
            }
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all group ${attachments.length >= 5 ? "border-slate-800 opacity-50 cursor-not-allowed" : "border-slate-800 cursor-pointer hover:bg-slate-800/40 hover:border-emerald-500/50"}`}
          >
            <FiUploadCloud
              size={32}
              className="text-slate-500 group-hover:text-emerald-400 mb-2"
            />
            <span className="text-sm font-bold text-slate-300">
              {attachments.length >= 5
                ? "Upload limit reached"
                : "Upload PDF Attachments"}
            </span>
            <span className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">
              Notices, Forms, etc. (Max 5)
            </span>
            <input
              type="file"
              multiple
              ref={attachmentInputRef}
              className="hidden"
              onChange={handleAttachmentChange}
              accept=".pdf,.doc,.docx"
            />
          </div>

          {/* File List */}
          <AnimatePresence>
            {attachments.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {attachments.map((f, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FiPaperclip size={16} className="text-emerald-500" />
                      <span className="text-xs font-bold text-slate-200 truncate pr-4">
                        {f.name}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setAttachments(
                          attachments.filter((_, idx) => idx !== i),
                        )
                      }
                      className="p-1 hover:text-red-500 text-slate-500"
                    >
                      <FiX size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* SIDEBAR */}
      <div className="lg:col-span-4 space-y-6">
        {/* COVER IMAGE - NEW SECTION */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
            <FiImage className="text-purple-500" /> Cover Image
          </h3>

          <div
            onClick={() => coverInputRef.current?.click()}
            className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden cursor-pointer group hover:border-purple-500/50 transition-all flex items-center justify-center"
          >
            {coverPreview ? (
              <>
                <Image
                  src={coverPreview}
                  alt="Cover"
                  fill
                  className="object-cover group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    Change
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <FiImage size={24} className="text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-500 block">
                  Click to upload
                </span>
                <span className="text-[10px] text-slate-600 uppercase">
                  16:9 Best Fit
                </span>
              </div>
            )}
            <input
              type="file"
              ref={coverInputRef}
              className="hidden"
              onChange={handleCoverChange}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </section>

        {/* TARGETING */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
              <FiUsers className="text-blue-500" /> Audience Scope
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(AudienceGroup).map((aud) => (
                <button
                  key={aud}
                  onClick={() => handleToggle("audience", aud)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${formData.audience.includes(aud) ? "bg-blue-600 border-blue-500 text-white shadow-lg" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-800/50 pt-5">
            <h3 className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
              <FiCpu className="text-indigo-500" /> Branches
            </h3>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((br) => (
                <button
                  key={br}
                  onClick={() => handleToggle("branches", br)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${formData.branches.includes(br) ? "bg-indigo-600 border-indigo-500 text-white shadow-lg" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                >
                  {br.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-800/50 pt-5">
            <h3 className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
              <FiTag className="text-emerald-500" /> Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleToggle("categories", cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${formData.categories.includes(cat) ? "bg-emerald-600 border-emerald-500 text-white shadow-lg" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                >
                  {cat.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* NOTIFICATION SECTION */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
            <FiBell className="text-rose-500" /> Push Channels
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {Object.values(NotificationChannel).map((ch) => {
              const active = formData.notification.channels.includes(ch);
              return (
                <button
                  key={ch}
                  onClick={() =>
                    setFormData((p) => ({
                      ...p,
                      notification: {
                        channels: active
                          ? p.notification.channels.filter((c) => c !== ch)
                          : [...p.notification.channels, ch],
                      },
                    }))
                  }
                  className={`flex items-center gap-2 justify-center p-3 rounded-xl border text-xs font-bold transition-all ${active ? "bg-rose-600 border-rose-500 text-white" : "bg-slate-950 border-slate-800 text-slate-500"}`}
                >
                  {ch === "SMS" ? (
                    <FiSmartphone size={14} />
                  ) : ch === "WHATSAPP" ? (
                    <FiMessageCircle size={14} />
                  ) : (
                    <FiBell size={14} />
                  )}{" "}
                  {ch}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC COST WARNING */}
          <AnimatePresence>
            {hasExpensiveChannels && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3"
              >
                <FiAlertCircle
                  className="text-amber-500 shrink-0 mt-0.5"
                  size={16}
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">
                    Cost Warning
                  </span>
                  <p className="text-[10px] text-amber-200 leading-tight mt-1 font-medium">
                    WhatsApp/SMS incur costs. Use only for urgent news.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">
              <FiCalendar className="inline mr-1" /> Schedule Publish
            </label>
            <input
              type="datetime-local"
              className="w-full bg-transparent text-sm text-slate-200 outline-none color-scheme-dark"
              value={formData.publishAt}
              onChange={(e) =>
                setFormData({ ...formData, publishAt: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-xs font-bold text-slate-300">Pin to Top</span>
            <button
              onClick={() =>
                setFormData((p) => ({ ...p, isPinned: !p.isPinned }))
              }
              className={`w-10 h-5 rounded-full relative transition-all ${formData.isPinned ? "bg-emerald-500" : "bg-slate-700"}`}
            >
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.isPinned ? "left-6" : "left-1"}`}
              />
            </button>
          </div>
        </section>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiSend size={18} /> Publish News
            </>
          )}
        </button>

        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 justify-center text-red-400"
            >
              <FiAlertCircle size={14} />
              <span className="text-xs font-bold tracking-tight">
                {errorMsg}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
