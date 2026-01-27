"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "@/gecl/hooks/useApi";
import {
  FiType,
  FiFileText,
  FiUploadCloud,
  FiCheckCircle,
  FiX,
  FiAlertCircle,
  FiLayers,
  FiUsers,
  FiTag,
  FiSend,
  FiPaperclip,
  FiTrash2,
  FiCpu,
} from "react-icons/fi";
import { LuMegaphone } from "react-icons/lu";

// --- TYPES ---
interface NoticeFormData {
  title: string;
  content: string;
  category: string;
  department: string;
  audience: string[];
  status: string;
  isPinned: boolean;
}

// --- CONSTANTS ---
const CATEGORIES = [
  "ACADEMIC",
  "EXAM",
  "ADMISSION",
  "SCHOLARSHIP",
  "PLACEMENT",
  "HOLIDAY",
  "TENDER",
  "EVENT",
  "GENERAL",
  "URGENT",
];

const DEPARTMENTS = [
  { label: "All Departments", value: "ALL" },
  { label: "CSE (AI)", value: "CSE_AI" },
  { label: "CSE (Data Science)", value: "CSE_DS" },
  { label: "Civil Engineering", value: "CIVIL" },
  { label: "Electrical Engg", value: "EE" },
  { label: "Mechanical Engg", value: "ME" },
  { label: "Science & Humanities", value: "SCIENCE_HUMANITIES" },
];

const AUDIENCES = ["PUBLIC", "STUDENTS", "FACULTY", "STAFF"];

// --- UI COMPONENTS (Reused & Adapted) ---

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function InputGroup({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 pl-1 flex items-center gap-1">
          <FiAlertCircle /> {error}
        </p>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  icon: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-200 outline-none appearance-none focus:border-blue-500/50 focus:bg-slate-900 transition-all cursor-pointer"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-slate-900 text-slate-200"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );
}

// --- MAIN FORM ---
export default function AddNoticeForm() {
  const { request } = useApi();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    content: "",
    category: "GENERAL",
    department: "ALL",
    audience: ["PUBLIC"],
    status: "PUBLISHED",
    isPinned: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handlers
  const handleAudienceToggle = (aud: string) => {
    setFormData((prev) => {
      const current = prev.audience;
      if (current.includes(aud)) {
        return { ...prev, audience: current.filter((a) => a !== aud) }; // Remove
      } else {
        return { ...prev, audience: [...current, aud] }; // Add
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Basic Validation
    if (!formData.title || !formData.content) {
      setErrorMsg("Title and Content are required.");
      return;
    }
    if (formData.audience.length === 0) {
      setErrorMsg("Please select at least one audience group.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Create FormData for Multipart upload
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      payload.append("category", formData.category);
      payload.append("department", formData.department);
      payload.append("status", formData.status);
      payload.append("isPinned", String(formData.isPinned));

      // Append audience array items manually
      formData.audience.forEach((aud) => payload.append("audience[]", aud));

      // Append Files
      files.forEach((file) => {
        payload.append("attachments", file);
      });

      const res = await request<any>(
        {
          method: "POST",
          url: "/notice/create", // Ensure this matches your route
          data: payload,
          headers: { "Content-Type": "multipart/form-data" },
        },
        { showSuccessMsg: false },
      );

      if (res.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: "",
          content: "",
          category: "GENERAL",
          department: "ALL",
          audience: ["PUBLIC"],
          status: "PUBLISHED",
          isPinned: false,
        });
        setFiles([]);
      } else {
        setErrorMsg(res.message || "Failed to create notice.");
      }
    } catch (err) {
      setErrorMsg("Network error or server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-500/30">
          <FiCheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Notice Published!
        </h2>
        <p className="text-slate-400 mb-8">
          The notice has been successfully dispatched to the selected audience.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Publish Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* --- LEFT: MAIN FORM --- */}
      <div className="lg:col-span-2 space-y-6">
        {/* Error Banner */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-300"
            >
              <FiAlertCircle size={20} />
              <span className="text-sm font-medium">{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <FiType size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">Notice Details</h3>
          </div>

          {/* Title */}
          <InputGroup label="Notice Headline">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <LuMegaphone />
              </div>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. Mid-Semester Exam Schedule 2026"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all"
              />
            </div>
          </InputGroup>

          {/* Content */}
          <InputGroup label="Full Content / Body">
            <div className="relative group">
              <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <FiFileText />
              </div>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="Write the detailed notice content here..."
                rows={6}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all resize-none leading-relaxed"
              />
            </div>
          </InputGroup>

          {/* Files */}
          <InputGroup label="Attachments (PDF/Images)">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FiUploadCloud
                  className="text-slate-400 group-hover:text-blue-400"
                  size={24}
                />
              </div>
              <p className="text-sm font-medium text-slate-300">
                Click to upload files
              </p>
              <p className="text-xs text-slate-600 mt-1">
                PDF, JPG, PNG (Max 5MB)
              </p>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="grid grid-cols-1 gap-2 mt-3">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FiPaperclip className="text-blue-400" />
                      <span className="text-sm text-slate-300 truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-600">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </InputGroup>
        </section>
      </div>

      {/* --- RIGHT: SETTINGS PANEL --- */}
      <div className="space-y-6">
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <FiLayers size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">Targeting</h3>
          </div>

          <InputGroup label="Department">
            <Select
              icon={<FiCpu />}
              value={formData.department}
              onChange={(v) => setFormData((p) => ({ ...p, department: v }))}
              options={DEPARTMENTS}
            />
          </InputGroup>

          <InputGroup label="Category">
            <Select
              icon={<FiTag />}
              value={formData.category}
              onChange={(v) => setFormData((p) => ({ ...p, category: v }))}
              options={CATEGORIES.map((c) => ({
                label: c.replace("_", " "),
                value: c,
              }))}
            />
          </InputGroup>

          <InputGroup label="Target Audience">
            <div className="grid grid-cols-2 gap-2">
              {AUDIENCES.map((aud) => {
                const isSelected = formData.audience.includes(aud);
                return (
                  <button
                    key={aud}
                    onClick={() => handleAudienceToggle(aud)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl text-xs font-bold transition-all border",
                      isSelected
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600",
                    )}
                  >
                    {aud}
                  </button>
                );
              })}
            </div>
          </InputGroup>
        </section>

        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-3xl space-y-4">
          {/* Pin Toggle */}
          <div className="flex items-center justify-between p-1">
            <span className="text-sm font-bold text-slate-300">Pin to Top</span>
            <button
              onClick={() =>
                setFormData((p) => ({ ...p, isPinned: !p.isPinned }))
              }
              className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors duration-300",
                formData.isPinned ? "bg-emerald-500" : "bg-slate-700",
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300",
                  formData.isPinned ? "translate-x-6" : "translate-x-0",
                )}
              />
            </button>
          </div>

          <hr className="border-slate-800" />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                Publish Notice <FiSend />
              </>
            )}
          </button>
        </section>
      </div>
    </div>
  );
}
