"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useApi } from "@/gecl/hooks/useApi";
import { PdfViewer } from "@/gecl/components/ui/PdfViewer";
import { ImageViewer } from "@/gecl/components/ui/ImageViewer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiFileText,
  FiImage,
  FiCalendar,
  FiMapPin,
  FiVideo,
  FiLoader,
  FiX,
  FiAlertCircle,
  FiShare2,
  FiCheck,
  FiCamera,
  FiUsers,
  FiClock,
  FiDownload,
  FiPlusSquare,
  FiInfo,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// --- TYPES ---
interface Attachment {
  _id: string;
  url: string;
  name: string;
  mimeType: string;
  size: number;
}

interface EventItem {
  _id: string;
  type: string;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  galleryEnabled?: boolean;
  galleryCategory?: string;
  categories: string[];
  branches: string[];
  audience: string[];
  event: {
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    startDate: string;
    endDate?: string;
    venue?: string;
    meetingLink?: string;
  };
  source?: string;
  coverImage?: {
    url: string;
    name?: string;
    mimeType?: string;
    size?: number;
  } | null;
  attachments?: Attachment[];
  status: string;
  publishAt: string;
  isPinned?: boolean;
}

// --- HELPER FUNCTIONS ---

/**
 * Smartly formats date/time based on whether the event is single-day or multi-day.
 */
const formatEventTiming = (startIso: string, endIso?: string) => {
  if (!startIso)
    return { isSameDay: true, date: "Date TBA", time: "Time TBA", full: "TBA" };

  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : null;

  const dateOpts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  // Check if Same Calendar Day
  const isSameDay =
    end &&
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (isSameDay) {
    // SCENARIO A: Same Day (e.g., Fri, 13 Feb 2026 • 10:00 AM - 02:00 PM)
    return {
      isSameDay: true,
      displayDate: start.toLocaleDateString("en-IN", dateOpts),
      displayTime: `${start.toLocaleTimeString("en-IN", timeOpts)} – ${end.toLocaleTimeString("en-IN", timeOpts)}`,
      full: `${start.toLocaleDateString("en-IN", dateOpts)}`,
      isoStart: start.toISOString(),
      isoEnd: end.toISOString(),
    };
  } else if (end) {
    // SCENARIO B: Multi Day (e.g., Feb 13, 10 AM - Feb 15, 5 PM)
    return {
      isSameDay: false,
      startDate: start.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      startTime: start.toLocaleTimeString("en-IN", timeOpts),
      endDate: end.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      endTime: end.toLocaleTimeString("en-IN", timeOpts),
      full: `${start.toLocaleDateString("en-IN", dateOpts)} - ${end.toLocaleDateString("en-IN", dateOpts)}`,
      isoStart: start.toISOString(),
      isoEnd: end.toISOString(),
    };
  } else {
    // SCENARIO C: No End Date provided
    return {
      isSameDay: true,
      displayDate: start.toLocaleDateString("en-IN", dateOpts),
      displayTime: `${start.toLocaleTimeString("en-IN", timeOpts)} Onwards`,
      full: `${start.toLocaleDateString("en-IN", dateOpts)}`,
      isoStart: start.toISOString(),
      isoEnd: "",
    };
  }
};

const formatPublishDate = (isoString: string) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatSize = (bytes: number) => {
  if (!bytes) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const getEventStatus = (startStr: string, endStr?: string) => {
  const now = new Date();
  const start = new Date(startStr);
  // Default duration 2 hours if no end date
  const end = endStr
    ? new Date(endStr)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  if (now < start)
    return {
      label: "UPCOMING",
      color: "bg-blue-500",
      text: "text-blue-600",
      bg: "bg-blue-50",
    };
  if (now >= start && now <= end)
    return {
      label: "LIVE NOW",
      color: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      pulse: true,
    };
  return {
    label: "COMPLETED",
    color: "bg-slate-500",
    text: "text-slate-600",
    bg: "bg-slate-100",
  };
};

const getGoogleCalendarUrl = (event: EventItem) => {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(
    event.summary || event.content.substring(0, 100) + "...",
  );
  const location = encodeURIComponent(
    event.event.venue || event.event.meetingLink || "",
  );

  const start = new Date(event.event.startDate)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");
  const end = event.event.endDate
    ? new Date(event.event.endDate).toISOString().replace(/-|:|\.\d\d\d/g, "")
    : new Date(new Date(event.event.startDate).getTime() + 60 * 60 * 1000)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
};

// --- MAIN COMPONENT ---

export default function SingleEventClient({ slug }: { slug: string }) {
  const { request } = useApi();
  const router = useRouter();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchEvent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request<EventItem>(
        { method: "GET", url: `/announcements/events/${slug}` },
        { showSuccessMsg: false, showErrorMsg: false },
      );
      if (res.success && res.data) setEvent(res.data);
      else setError(res.message || "Event not found.");
    } catch {
      setError("Connection error.");
    }
    setLoading(false);
  }, [slug, request]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleShare = async () => {
    if (!event) return;
    const url = window.location.href;
    const shareData = {
      title: event.title,
      text: event.summary || "Check out this event at GEC Lakhisarai!",
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  const closeModal = () => setSelectedFile(null);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <FiLoader className="animate-spin text-4xl text-violet-600" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Loading...
        </p>
      </div>
    );

  if (error || !event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
        <FiAlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-black text-slate-800 uppercase">
          Event Not Found
        </h2>
        <button
          onClick={() => router.push("/announcements/events")}
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl"
        >
          Back to Events
        </button>
      </div>
    );

  // --- DERIVED STATE ---
  const attachments = event.attachments || [];
  const status = getEventStatus(event.event.startDate, event.event.endDate);
  const timing = formatEventTiming(event.event.startDate, event.event.endDate);

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.event.startDate,
    endDate: event.event.endDate || event.event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.event.mode === "ONLINE"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location:
      event.event.mode === "ONLINE"
        ? { "@type": "VirtualLocation", url: event.event.meetingLink }
        : {
            "@type": "Place",
            name: event.event.venue || "GEC Lakhisarai",
            address: "GEC Lakhisarai",
          },
    image: event.coverImage?.url ? [event.coverImage.url] : [],
    description: event.summary || event.content.substring(0, 150),
  };

  return (
    <>
      <Script
        id="event-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/announcements/events" },
          { label: "Details" },
        ]}
      />

      <main className="min-h-screen bg-slate-50 pb-24">
        {/* === FILE PREVIEW MODAL === */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl flex flex-col overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
                  <h3 className="text-sm font-bold truncate pr-4">
                    {selectedFile.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-lg"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="flex-1 bg-slate-100 relative p-4">
                  {selectedFile.mimeType.includes("pdf") ? (
                    <PdfViewer
                      url={selectedFile.url}
                      title={selectedFile.name}
                      className="w-full h-full rounded shadow"
                      downloadable
                    />
                  ) : (
                    <ImageViewer
                      url={selectedFile.url}
                      alt={selectedFile.name}
                      className="w-full h-full object-contain"
                      downloadable
                    />
                  )}
                </div>
              </motion.div>
              <div className="absolute inset-0 -z-10" onClick={closeModal} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* === HERO SECTION === */}
        <header className="relative w-full min-h-[550px] flex items-end bg-slate-900 overflow-hidden">
          {/* Background Layer */}
          {event.coverImage?.url && (
            <div className="absolute inset-0 z-0">
              <Image
                src={event.coverImage.url}
                alt="bg"
                fill
                className="object-cover opacity-30 blur-2xl scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pb-16 pt-32">
            <div className="flex flex-col md:flex-row gap-10 items-end">
              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="shrink-0"
              >
                <div className="relative w-full md:w-[360px] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-slate-800">
                  {event.coverImage?.url ? (
                    <Image
                      src={event.coverImage.url}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600">
                      <FiCalendar size={64} />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Title & Meta Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 min-w-0"
              >
                {/* Publish Date & Status */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.color} text-white shadow-lg`}
                  >
                    {status.pulse && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                    {status.label}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                    <FiInfo size={12} /> Published:{" "}
                    {formatPublishDate(event.publishAt)}
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 drop-shadow-xl">
                  {event.title}
                </h1>

                {/* Smart Date/Time Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 max-w-2xl">
                  <div className="flex flex-col gap-5">
                    {/* Time Logic */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-violet-600 rounded-xl text-white shadow-lg shadow-violet-600/30 shrink-0">
                        <FiClock size={24} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-violet-300 uppercase mb-1 tracking-wider">
                          Date & Duration
                        </p>
                        {timing.isSameDay ? (
                          <div>
                            <p className="text-2xl font-black text-white">
                              {timing.displayDate}
                            </p>
                            <p className="text-lg text-slate-300 font-medium">
                              {timing.displayTime}
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-6">
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">
                                Starts
                              </p>
                              <p className="text-xl font-bold text-white leading-tight">
                                {timing.startDate}
                              </p>
                              <p className="text-sm text-slate-300">
                                {timing.startTime}
                              </p>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-white/20" />
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">
                                Ends
                              </p>
                              <p className="text-xl font-bold text-white leading-tight">
                                {timing.endDate}
                              </p>
                              <p className="text-sm text-slate-300">
                                {timing.endTime}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    {/* Location Logic */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-slate-800 rounded-lg text-slate-400 shrink-0">
                        {event.event.mode === "ONLINE" ? (
                          <FiVideo size={20} />
                        ) : (
                          <FiMapPin size={20} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-0.5 tracking-wider">
                          Location ({event.event.mode})
                        </p>
                        <p className="text-base font-bold text-white">
                          {event.event.mode === "ONLINE"
                            ? "Online Meeting (Link in Sidebar)"
                            : event.event.venue || "To be Announced"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* === MAIN CONTENT === */}
        <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* LEFT: Content Area */}
            <div className="flex-1 w-full min-w-0 space-y-8">
              {/* Summary */}
              {event.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <h3 className="text-xs font-black text-violet-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FiFileText /> Overview
                  </h3>
                  <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed italic border-l-4 border-violet-100 pl-4">
                    "{event.summary}"
                  </p>
                </motion.div>
              )}

              {/* Main Text */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-violet-600 prose-img:rounded-2xl">
                  <div className="whitespace-pre-wrap font-sans text-slate-700 leading-8">
                    {event.content}
                  </div>
                </div>

                {/* Content Footer */}
                <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-2">
                    <FiLayers /> Source: {event.source || "GEC Lakhisarai"}
                  </span>
                  <span>
                    Last Updated: {formatPublishDate(event.publishAt)}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: Sidebar (Sticky) */}
            <aside className="w-full lg:w-[380px] shrink-0 space-y-6 sticky top-6">
              {/* 1. Action Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                {/* Add to Calendar Button (Only if upcoming/live) */}
                {(status.label === "UPCOMING" ||
                  status.label === "LIVE NOW") && (
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-violet-600 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 mb-4 group"
                  >
                    <FiPlusSquare className="group-hover:rotate-90 transition-transform" />{" "}
                    Add to Calendar
                  </a>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {/* Meeting Link */}
                  {event.event.meetingLink ? (
                    <a
                      href={event.event.meetingLink}
                      target="_blank"
                      className="flex flex-col items-center justify-center p-4 bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-100 transition-colors border border-violet-100"
                    >
                      <FiVideo size={22} className="mb-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wide">
                        Join Meeting
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 opacity-50 cursor-not-allowed">
                      <FiVideo size={22} className="mb-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wide">
                        No Link
                      </span>
                    </div>
                  )}

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border ${copied ? "bg-green-50 text-green-600 border-green-100" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                  >
                    {copied ? (
                      <FiCheck size={22} className="mb-1.5" />
                    ) : (
                      <FiShare2 size={22} className="mb-1.5" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-wide">
                      {copied ? "Copied" : "Share"}
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Gallery CTA */}
              {event.galleryEnabled && event.galleryCategory && (
                <Link
                  href={`/gallery/${event.galleryCategory}`}
                  className="block group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-[1.02]"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">View Gallery</h3>
                      <p className="text-violet-100 text-xs font-medium opacity-90">
                        See photos from this event
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform">
                      <FiCamera size={20} />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition-colors" />
                </Link>
              )}

              {/* 3. Attachments */}
              {attachments.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FiDownload /> Resources
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {attachments.length}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedFile(file)}
                      >
                        <div
                          className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${file.mimeType.includes("pdf") ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"}`}
                        >
                          {file.mimeType.includes("pdf") ? (
                            <FiFileText size={18} />
                          ) : (
                            <FiImage size={18} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-700 truncate group-hover:text-violet-600 transition-colors">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            {formatSize(file.size)} • VIEW
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.url, "_blank");
                          }}
                          className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-all"
                          title="Download File"
                        >
                          <FiDownload size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Audience Info */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FiUsers /> Open To
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.audience.map((a, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase border border-slate-200"
                    >
                      {a}
                    </span>
                  ))}
                  {event.branches.includes("ALL") ? (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase border border-emerald-100">
                      All Depts
                    </span>
                  ) : (
                    event.branches.map((b, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase border border-slate-200"
                      >
                        {b}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
