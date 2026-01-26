"use client";

import React, { useEffect, useState } from "react";
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

export default function NoticesPage() {
  const { request } = useApi();

  // State
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ YOUR SPECIFIC API METHOD
        const res = await request<NoticeResponse["data"]>(
          {
            method: "POST",
            url: "/notices", // Route prefix for getting list
            data: { page, limit },
          },
          { showMsg: false, showErrorMsg: false },
        );

        if (res.success && res.data) {
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
    };

    fetchNotices();
  }, [page, limit, request]);

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Hero Header */}
      <div className="bg-[#0f172a] pt-24 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <FiMic className="text-indigo-400" /> Notice Board
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Official circulars, exam schedules, and updates from GEC Lakhisarai.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        {/* 2. Controls & Pagination */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 font-bold text-sm px-2">
            <FiFilter /> <span>Latest Updates</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 border border-slate-200"
            >
              <FiChevronLeft />
            </button>
            <span className="text-xs font-bold text-slate-500 min-w-[80px] text-center">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 border border-slate-200"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* 3. Grid Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FiLoader className="animate-spin text-4xl mb-4 text-indigo-500" />
            <p>Loading notices...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center text-red-600">
            <FiAlertCircle className="mx-auto text-3xl mb-2" />
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm font-bold underline"
            >
              Retry
            </button>
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-3xl border border-dashed border-slate-200">
            <p>No notices found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <NoticeCard key={notice._id} notice={notice} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
