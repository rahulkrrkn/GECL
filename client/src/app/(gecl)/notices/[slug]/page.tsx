"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useApi } from "@/gecl/hooks/useApi";
import { Notice, Attachment } from "@/types/notice";
import { PdfViewer } from "@/gecl/components/ui/PdfViewer";
import { ImageViewer } from "@/gecl/components/ui/ImageViewer";
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
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// --- HELPERS ---
const formatDate = (isoString: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatSize = (bytes: number) => {
  if (bytes === 0) return "N/A";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export default function SingleNoticePage() {
  const { slug } = useParams();
  const { request } = useApi();

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchSingleNotice = async () => {
      setLoading(true);
      try {
        const res = await request<Notice>(
          {
            method: "GET",
            url: `/notices/${slug}`,
          },
          { showMsg: false, showErrorMsg: false },
        );

        if (res.success && res.data) {
          setNotice(res.data);
        } else {
          setError(res.message || "Notice not found");
        }
      } catch (err) {
        setError("Error loading notice.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleNotice();
  }, [slug, request]);

  // Handle Modal Close
  const closeModal = () => setSelectedFile(null);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <FiLoader className="animate-spin text-3xl text-indigo-600" />
      </div>
    );
  }

  // Error State
  if (error || !notice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
        <p className="mb-4">{error || "Notice unavailable"}</p>
        <Link href="/notices" className="text-indigo-600 font-bold underline">
          Return to Board
        </Link>
      </div>
    );
  }

  // Separate images for the gallery preview section
  const imageAttachments = notice.attachments.filter((f) =>
    f.fileType.startsWith("image/"),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Notices", href: "/notices" },
          { label: "View Notice" },
        ]}
      />
      <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-800">
        {/* ---------------- DOCUMENT PREVIEW MODAL ---------------- */}
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedFile.fileType === "application/pdf"
                        ? "bg-red-50 text-red-500"
                        : "bg-blue-50 text-blue-500"
                    }`}
                  >
                    {selectedFile.fileType === "application/pdf" ? (
                      <FiFileText />
                    ) : (
                      <FiImage />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate max-w-xs md:max-w-md">
                      {selectedFile.fileName}
                    </h3>
                    <p className="text-xs text-slate-500 uppercase font-medium">
                      {formatSize(selectedFile.fileSize)} • Protected View
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="p-2 bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Close Preview"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body (Viewer) */}
              <div className="flex-1 bg-slate-50 relative overflow-hidden flex items-center justify-center p-0 md:p-4">
                {selectedFile.fileType === "application/pdf" ? (
                  /* PDF Viewer Component */
                  <PdfViewer
                    url={selectedFile.fileUrl}
                    title={selectedFile.fileName}
                    className="w-full h-full shadow-sm bg-white"
                    downloadable={false} // 🔒 Secure Mode: No download toolbar
                  />
                ) : (
                  /* Image Viewer Component */
                  <ImageViewer
                    url={selectedFile.fileUrl}
                    alt={selectedFile.fileName}
                    className="w-full h-full shadow-sm bg-white"
                    downloadable={false} // 🔒 Secure Mode: No right-click save
                  />
                )}
              </div>
            </div>

            {/* Backdrop Click to Close */}
            <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
          </div>
        )}
        {/* ---------------- END MODAL ---------------- */}

        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all">
              <FiArrowLeft />
            </div>
            Back to Board
          </Link>

          {/* Notice Content Card */}
          <article className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-[#0f172a] text-white p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border ${
                      notice.source === "BEU"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                        : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                    }`}
                  >
                    {notice.source}
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10 text-slate-300 flex items-center gap-2">
                    <FiTag /> {notice.category}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-6 text-white">
                  {notice.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-400 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-indigo-400" />
                    {formatDate(notice.publishAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-indigo-400" />
                    Admin Office
                  </div>
                </div>
              </div>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Body Content */}
            <div className="p-8 md:p-12">
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </div>

              {/* Attachments Section */}
              {notice.attachments && notice.attachments.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
                    Documents ({notice.attachments.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notice.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all bg-slate-50 hover:bg-white"
                      >
                        {/* Icon */}
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100 shrink-0">
                          {file.fileType === "application/pdf" ? (
                            <FiFileText />
                          ) : (
                            <FiImage />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                            {file.fileName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded uppercase">
                              {file.fileType.split("/")[1]}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {formatSize(file.fileSize)}
                            </span>
                          </div>
                        </div>

                        {/* ✅ View Button (Opens Modal) */}
                        <button
                          onClick={() => setSelectedFile(file)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Document"
                        >
                          <FiEye size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Image Gallery (Optional Direct View) */}
              {imageAttachments.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Image Gallery
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {imageAttachments.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group"
                        onClick={() => setSelectedFile(img)}
                      >
                        <Image
                          src={img.fileUrl}
                          alt={img.fileName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
                          <FiEye className="mr-2" /> Preview
                        </div>
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
