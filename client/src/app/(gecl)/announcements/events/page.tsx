"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useApi } from "@/gecl/hooks/useApi";
import EventsCard from "./EventsCard";
import {
  FiFilter,
  FiLoader,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// ✅ INTERFACES
interface EventItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: { url: string; name?: string; mimeType?: string } | null;
  categories: string[];
  isPinned: boolean;
  event: {
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    startDate: string;
    endDate?: string;
    venue?: string;
    meetingLink?: string;
  };
}

interface EventResponse {
  data: EventItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function EventsPage() {
  const { request } = useApi();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filter
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);
  const [filter, setFilter] = useState<"UPCOMING" | "PAST">("UPCOMING");

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await request<EventResponse>(
        {
          method: "GET",
          url: "/announcements/events",
          params: { page, limit, filter }, // Sending filter to backend
        },
        { showMsg: false, showErrorMsg: false },
      );

      if (res.success && res.data) {
        setEvents(res.data.data);
        setTotalPages(res.data.meta.totalPages);
      } else {
        setError(res.message || "Failed to load events");
      }
    } catch (err) {
      setError("Network error. Please check connection.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter, request]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Announcements", href: "/announcements" },
          { label: "Events & Seminars" },
        ]}
      />

      <main className="bg-slate-50 min-h-screen pb-20">
        {/* Header */}
        <div className="bg-[#0f172a] pt-24 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-600/10 blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3 tracking-tight">
              <FiCalendar className="text-violet-400" /> EVENTS & SEMINARS
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Join our workshops, hackathons, and cultural fests.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 md:p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  setFilter("UPCOMING");
                  setPage(1);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${filter === "UPCOMING" ? "bg-white text-violet-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                <FiCalendar /> Upcoming
              </button>
              <button
                onClick={() => {
                  setFilter("PAST");
                  setPage(1);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${filter === "PAST" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                <FiClock /> Past Events
              </button>
            </div>

            {/* Pagination */}
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
              <FiLoader className="animate-spin text-4xl mb-4 text-violet-500" />
              <p className="font-bold uppercase text-xs tracking-widest">
                Finding Events...
              </p>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-100 rounded-3xl p-16 text-center shadow-lg">
              <FiAlertCircle className="mx-auto text-red-500 text-5xl mb-4" />
              <p className="text-slate-500 mb-6 font-medium">{error}</p>
              <button
                onClick={fetchEvents}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold active:scale-95"
              >
                Retry
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 font-bold uppercase tracking-widest">
                No {filter.toLowerCase()} events found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventsCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
