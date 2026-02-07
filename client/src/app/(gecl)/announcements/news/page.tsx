"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useApi } from "@/gecl/hooks/useApi";
import NewsCard from "./NewsCard";
import {
  FiFilter,
  FiLoader,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiActivity,
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// ✅ UPDATE: Correct Interface
interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: {
    url: string;
    name?: string;
    mimeType?: string;
  } | null;
  categories: string[];
  publishAt: string;
  isPinned: boolean;
}

interface NewsResponse {
  data: NewsItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function NewsPage() {
  const { request } = useApi();

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await request<NewsResponse>(
        {
          method: "GET",
          url: "/announcements/news",
          params: { page, limit },
        },
        { showMsg: false, showErrorMsg: false },
      );

      if (res.success && res.data) {
        setNewsList(res.data.data);
        setTotalPages(res.data.meta.totalPages);
      } else {
        setError(res.message || "Failed to load news");
      }
    } catch (err) {
      setError("Network error. Please check connection.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, request]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "News & Events" },
        ]}
      />

      <main className="bg-slate-50 min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-[#0f172a] pt-24 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-600/10 blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3 tracking-tight">
              <FiActivity className="text-emerald-400" /> CAMPUS NEWS
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Latest happenings, events, achievements, and press releases.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm px-2 uppercase tracking-tighter italic">
              <FiFilter className="text-emerald-600" /> Recent Updates
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 border border-slate-200 transition-all active:scale-95"
              >
                <FiChevronLeft size={20} />
              </button>
              <span className="text-xs font-black text-slate-500 w-16 text-center tabular-nums">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 border border-slate-200 transition-all active:scale-95"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <FiLoader className="animate-spin text-4xl mb-4 text-emerald-500" />
              <p className="font-bold uppercase text-xs tracking-widest">
                Loading News...
              </p>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-3xl p-16 text-center shadow-lg">
              <FiAlertCircle className="mx-auto text-red-500 text-5xl mb-4" />
              <p className="text-slate-500 mb-6 font-medium">{error}</p>
              <button
                onClick={fetchNews}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold active:scale-95 transition-all"
              >
                Retry
              </button>
            </div>
          ) : newsList.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 font-bold uppercase tracking-widest">
                No news articles found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsList.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
