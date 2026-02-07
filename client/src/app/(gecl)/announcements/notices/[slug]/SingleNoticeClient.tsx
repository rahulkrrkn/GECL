"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApi } from "@/gecl/hooks/useApi";
import { Notice } from "@/types/notice";
import { PdfViewer } from "@/gecl/components/ui/PdfViewer";
import { ImageViewer } from "@/gecl/components/ui/ImageViewer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiFileText,
  FiImage,
  FiEye,
  FiCalendar,
  FiUser,
  FiTag,
  FiLoader,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// --- HELPERS ---
const formatDate = (isoString: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatSize = (bytes: number) => {
  if (!bytes) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export default function SingleNoticeClient({ slug }: { slug: string }) {
  const { request } = useApi();
  const router = useRouter();

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const fetchNotice = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request<Notice>(
        { method: "GET", url: `/announcements/notices/${slug}` },
        { showSuccessMsg: false, showErrorMsg: false },
      );
      if (res.success && res.data) setNotice(res.data);
      else setError(res.message || "Notice not found.");
    } catch {
      setError("Connection error.");
    }
    setLoading(false);
  }, [slug, request]);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  const closeModal = () => setSelectedFile(null);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <FiLoader className="animate-spin text-4xl text-blue-600" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Syncing Document...
        </p>
      </div>
    );

  if (error || !notice)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
        <FiAlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
          Notice Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs">{error}</p>
        <button
          onClick={() => router.push("/announcements/notices")}
          className="px-8 py-3 bg-slate-950 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
        >
          Back to Notice Board
        </button>
      </div>
    );

  const attachments = notice.attachments || [];

  // ✅ FIX: Handle mismatch between 'category' (Type) and 'categories' (API)
  // We cast to 'any' to bypass the TS error and normalize it to an array
  const rawCats = (notice as any).categories || (notice as any).category;
  const displayCategories = Array.isArray(rawCats)
    ? rawCats
    : [rawCats].filter(Boolean);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "Notices", href: "/announcements/notices" },
          { label: "View Notice" },
        ]}
      />

      <main className="min-h-screen bg-slate-50 pb-20">
        {/* DOCUMENT PREVIEW MODAL */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-slate-950/95 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl h-[90vh] md:h-[90vh] bg-white md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-2 rounded-lg ${selectedFile.mimeType === "application/pdf" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"}`}
                    >
                      {selectedFile.mimeType === "application/pdf" ? (
                        <FiFileText />
                      ) : (
                        <FiImage />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-slate-900 truncate max-w-[200px] md:max-w-md">
                        {selectedFile.name}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {formatSize(selectedFile.size)} • Secure View
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2.5 bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="flex-1 bg-slate-100 flex items-center justify-center">
                  {selectedFile.mimeType === "application/pdf" ? (
                    <PdfViewer
                      url={selectedFile.url}
                      title={selectedFile.name}
                      className="w-full h-full"
                      downloadable={false}
                    />
                  ) : (
                    <ImageViewer
                      url={selectedFile.url}
                      alt={selectedFile.name}
                      className="w-full h-full object-contain"
                      downloadable={false}
                    />
                  )}
                </div>
              </motion.div>
              <div
                className="absolute inset-0 -z-10"
                onClick={closeModal}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto px-4 pt-12">
          <Link
            href="/announcements/notices"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 mb-8 transition-all group uppercase tracking-[0.2em]"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to feed
          </Link>

          <article className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#0f172a] p-8 md:p-14 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    {notice.source}
                  </span>

                  {/* ✅ Fix: Use normalized categories */}
                  {displayCategories.map((cat: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-md text-[10px] font-black uppercase tracking-widest border border-white/10 text-slate-400 flex items-center gap-2"
                    >
                      <FiTag size={10} /> {cat}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-8 text-white tracking-tight">
                  {notice.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500 border-t border-white/10 pt-8 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-blue-500" />{" "}
                    {formatDate(notice.publishAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-blue-500" /> Issued by GEC
                    Lakhisarai
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-14">
              <div className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {notice.content}
              </div>

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="mt-16 pt-10 border-t border-slate-100">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                    Official Documents ({attachments.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attachments.map((file: any, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-500/30 hover:shadow-xl transition-all"
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 border border-slate-100 shrink-0 group-hover:scale-110 transition-transform">
                          {file.mimeType === "application/pdf" ? (
                            <FiFileText size={20} />
                          ) : (
                            <FiImage size={20} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                            {file.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">
                            {formatSize(file.size)} •{" "}
                            {file.mimeType?.split("/")[1]}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedFile(file)}
                          className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <FiEye size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
