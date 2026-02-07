"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useApi } from "@/gecl/hooks/useApi";
import { Notice, NoticeResponse } from "@/types/notice";
import NoticeCard from "./NoticeCard";
import {
  FiFilter,
  FiLoader,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMic,
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

export default function NoticesPage() {
  const { request } = useApi();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  // Bug Fix: Wrapped in useCallback to prevent infinite re-renders
  const fetchNotices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await request<NoticeResponse["data"]>(
        {
          method: "GET",
          url: "/announcements/notices", // Ensure this matches your endpoint
          params: { page, limit },
        },
        { showMsg: false, showErrorMsg: false },
      );

      if (res.success && res.data) {
        // Bug Fix: Correctly mapping res.data.data
        setNotices(res.data.data);
        setTotalPages(res.data.meta.totalPages);
      } else {
        setError(res.message || "Failed to load notices");
      }
    } catch (err) {
      setError("Network error. Please check connection.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, request]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "Notices" },
        ]}
      />
      <main className="bg-slate-50 min-h-screen pb-20">
        <div className="bg-[#0f172a] pt-24 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />
          <div className="max-w-7xl auto relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3 tracking-tight">
              <FiMic className="text-indigo-400" /> NOTICE BOARD
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Official circulars, exam schedules, and academic updates.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm px-2 uppercase tracking-tighter italic">
              <FiFilter className="text-indigo-600" /> Latest Feed
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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <FiLoader className="animate-spin text-4xl mb-4 text-indigo-500" />
              <p className="font-bold uppercase text-xs tracking-widest">
                Syncing Board...
              </p>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-3xl p-16 text-center shadow-lg">
              <FiAlertCircle className="mx-auto text-red-500 text-5xl mb-4" />
              <p className="text-slate-500 mb-6 font-medium">{error}</p>
              <button
                onClick={fetchNotices}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold active:scale-95 transition-all"
              >
                Retry
              </button>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 font-bold uppercase tracking-widest">
                No notices found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
