"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script"; // For JSON-LD SEO
import { useRouter } from "next/navigation";
import { useApi } from "@/gecl/hooks/useApi";
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
  FiShare2,
  FiClock,
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// --- TYPES ---
interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: {
    url: string;
    name?: string;
    mimeType?: string;
  } | null;
  attachments?: any[];
  publishAt: string;
  categories: string[];
  source?: string;
}

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

export default function SingleNewsClient({ slug }: { slug: string }) {
  const { request } = useApi();
  const router = useRouter();

  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request<NewsItem>(
        { method: "GET", url: `/announcements/news/${slug}` },
        { showSuccessMsg: false, showErrorMsg: false },
      );
      if (res.success && res.data) setNews(res.data);
      else setError(res.message || "News article not found.");
    } catch {
      setError("Connection error.");
    }
    setLoading(false);
  }, [slug, request]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const closeModal = () => setSelectedFile(null);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <FiLoader className="animate-spin text-4xl text-emerald-600" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Loading Article...
        </p>
      </div>
    );

  if (error || !news)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
        <FiAlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
          Article Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs">{error}</p>
        <button
          onClick={() => router.push("/announcements/news")}
          className="px-8 py-3 bg-slate-950 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
        >
          Back to News Feed
        </button>
      </div>
    );

  const attachments = news.attachments || [];

  // --- JSON-LD STRUCTURED DATA FOR SEO ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    image: news.coverImage?.url ? [news.coverImage.url] : [],
    datePublished: news.publishAt,
    dateModified: news.publishAt,
    description: news.summary,
    author: {
      "@type": "Organization",
      name: "GEC Lakhisarai",
      url: "https://geclakhisarai.ac.in",
    },
  };

  return (
    <>
      {/* Inject Structured Data */}
      <Script
        id="news-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "News", href: "/announcements/news" },
          { label: "Article" },
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
                      className={`p-2 rounded-lg ${selectedFile.mimeType === "application/pdf" ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}
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
                        {formatSize(selectedFile.size)} • Preview
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

        <div className="max-w-5xl mx-auto px-4 pt-8">
          <Link
            href="/announcements/news"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-emerald-600 mb-6 transition-all group uppercase tracking-[0.15em]"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to News Feed
          </Link>

          <article className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* HERO IMAGE HEADER */}
            {news.coverImage?.url ? (
              <div className="relative w-full aspect-video md:aspect-[21/9] bg-slate-900">
                <Image
                  src={news.coverImage.url}
                  alt={news.title}
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                {/* Advanced Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.categories?.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded text-[10px] font-black uppercase tracking-widest border border-emerald-400/30 text-emerald-100 flex items-center gap-2 shadow-sm"
                      >
                        <FiTag size={10} /> {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-6 drop-shadow-md max-w-4xl">
                    {news.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-300 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-emerald-400" />{" "}
                      {formatDate(news.publishAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUser className="text-emerald-400" /> By Admin
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Fallback Header if no image
              <div className="bg-[#0f172a] p-8 md:p-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-600/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.categories?.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-emerald-500/10 rounded text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 text-emerald-400"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-6">
                    {news.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <FiCalendar className="text-emerald-500" />{" "}
                    {formatDate(news.publishAt)}
                  </div>
                </div>
              </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div className="px-6 md:px-14 py-12">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Left Column: Article */}
                <div className="flex-1 min-w-0">
                  {/* Summary Box */}
                  {news.summary && (
                    <div className="mb-10 p-6 bg-slate-50 border-l-4 border-emerald-500 rounded-r-xl">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FiShare2 /> Key Highlights
                      </h3>
                      <p className="text-lg text-slate-700 font-medium italic leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                  )}

                  {/* Article Body */}
                  <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-loose prose-a:text-emerald-600 prose-img:rounded-xl">
                    <div className="whitespace-pre-wrap font-serif text-slate-700">
                      {news.content}
                    </div>
                  </div>
                </div>

                {/* Right Column: Sidebar (Metadata & Attachments) */}
                <div className="w-full md:w-80 shrink-0 space-y-8">
                  {/* Info Card */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
                      Article Info
                    </h4>
                    <ul className="space-y-4 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-2">
                          <FiClock /> Posted
                        </span>
                        <span className="font-bold text-slate-700">
                          {new Date(news.publishAt).toLocaleDateString()}
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-2">
                          <FiTag /> Category
                        </span>
                        <span className="font-bold text-emerald-600">
                          {news.categories[0]}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Attachments Card */}
                  {attachments.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          Documents
                        </h4>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {attachments.map((file: any, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedFile(file)}
                            className="w-full text-left p-4 hover:bg-slate-50 transition-colors group flex items-start gap-3"
                          >
                            <div className="mt-1 text-slate-400 group-hover:text-emerald-600 transition-colors">
                              {file.mimeType === "application/pdf" ? (
                                <FiFileText size={18} />
                              ) : (
                                <FiImage size={18} />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-700 truncate group-hover:text-emerald-700 transition-colors">
                                {file.name}
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                {formatSize(file.size)}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
