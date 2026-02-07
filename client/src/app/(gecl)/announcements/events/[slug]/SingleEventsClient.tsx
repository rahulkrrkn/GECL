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
  FiTag,
  FiLoader,
  FiX,
  FiAlertCircle,
  FiShare2,
  FiExternalLink,
  FiCheck, // Added for "Copied" state
  FiCopy, // Added as fallback icon
} from "react-icons/fi";
import { Breadcrumb } from "@/gecl/components/ui";

// --- TYPES ---
interface EventItem {
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
  categories: string[];
  event: {
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    startDate: string;
    endDate?: string;
    venue?: string;
    meetingLink?: string;
  };
  publishAt: string;
}

// --- HELPER ---
const formatDateTime = (isoString: string) => {
  if (!isoString) return { date: "N/A", time: "" };
  const d = new Date(isoString);
  return {
    date: d.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
};

const formatSize = (bytes: number) => {
  if (!bytes) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export default function SingleEventClient({ slug }: { slug: string }) {
  const { request } = useApi();
  const router = useRouter();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  // ✅ Share State
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

  // ✅ Share Handler
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: event?.title || "Event at GEC Lakhisarai",
      text: event?.summary || "Check out this event!",
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      // Fallback to clipboard
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
          Loading Event...
        </p>
      </div>
    );

  if (error || !event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
        <FiAlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
          Event Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs">{error}</p>
        <button
          onClick={() => router.push("/announcements/events")}
          className="px-8 py-3 bg-slate-950 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
        >
          Back to Events
        </button>
      </div>
    );

  const attachments = event.attachments || [];
  const start = formatDateTime(event.event.startDate);
  const end = event.event.endDate ? formatDateTime(event.event.endDate) : null;

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
        : event.event.mode === "OFFLINE"
          ? "https://schema.org/OfflineEventAttendanceMode"
          : "https://schema.org/MixedEventAttendanceMode",
    location:
      event.event.mode === "ONLINE"
        ? { "@type": "VirtualLocation", url: event.event.meetingLink }
        : {
            "@type": "Place",
            name: event.event.venue,
            address: "GEC Lakhisarai",
          },
    image: event.coverImage?.url ? [event.coverImage.url] : [],
    description: event.summary,
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
          { label: "Announcements", href: "/announcements" },
          { label: "Events", href: "/announcements/events" },
          { label: "Details" },
        ]}
      />

      <main className="min-h-screen bg-slate-50 pb-20">
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
                      className={`p-2 rounded-lg ${selectedFile.mimeType === "application/pdf" ? "bg-red-50 text-red-500" : "bg-violet-50 text-violet-500"}`}
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

        <div className="max-w-6xl mx-auto px-4 pt-8">
          <Link
            href="/announcements/events"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-violet-600 mb-6 transition-all group uppercase tracking-[0.15em]"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Events
          </Link>

          <article className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* HERO HEADER */}
            {event.coverImage?.url ? (
              <div className="relative w-full aspect-video md:aspect-[21/9] bg-slate-900">
                <Image
                  src={event.coverImage.url}
                  alt={event.title}
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.categories?.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-violet-500/20 backdrop-blur-md rounded text-[10px] font-black uppercase tracking-widest border border-violet-400/30 text-violet-100 flex items-center gap-2 shadow-sm"
                      >
                        <FiTag size={10} /> {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-6 drop-shadow-md max-w-4xl">
                    {event.title}
                  </h1>
                </div>
              </div>
            ) : (
              <div className="bg-[#0f172a] p-8 md:p-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-violet-600/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.categories?.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-violet-500/10 rounded text-[10px] font-black uppercase tracking-widest border border-violet-500/20 text-violet-400"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-6">
                    {event.title}
                  </h1>
                </div>
              </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div className="px-6 md:px-14 py-12">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* LEFT: Content */}
                <div className="flex-1 min-w-0">
                  {event.summary && (
                    <div className="mb-10 p-6 bg-violet-50 border-l-4 border-violet-500 rounded-r-xl">
                      <h3 className="text-xs font-black text-violet-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FiFileText /> About Event
                      </h3>
                      <p className="text-lg text-slate-700 font-medium italic leading-relaxed">
                        {event.summary}
                      </p>
                    </div>
                  )}

                  <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-loose prose-a:text-violet-600 prose-img:rounded-xl">
                    <div className="whitespace-pre-wrap font-serif text-slate-700">
                      {event.content}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Logistics Sidebar */}
                <div className="w-full lg:w-96 shrink-0 space-y-8">
                  {/* Logistics Card */}
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm sticky top-8">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                        Event Details
                      </h4>

                      {/* ✅ SHARE BUTTON */}
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-violet-200 hover:border-violet-300 shadow-sm"
                      >
                        {copied ? (
                          <FiCheck className="text-green-500" />
                        ) : (
                          <FiShare2 />
                        )}
                        {copied ? "Copied!" : "Share"}
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Date */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600 border border-slate-100">
                          <FiCalendar size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Date & Time
                          </p>
                          <p className="text-sm font-bold text-slate-800">
                            {start.date}
                          </p>
                          <p className="text-sm font-medium text-slate-600">
                            {start.time}
                          </p>
                          {end && end.date !== "N/A" && (
                            <p className="text-xs text-slate-400 mt-1">
                              to {end.time}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-violet-600 border border-slate-100">
                          {event.event.mode === "ONLINE" ? (
                            <FiVideo size={20} />
                          ) : (
                            <FiMapPin size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            {event.event.mode === "ONLINE"
                              ? "Online Link"
                              : "Venue"}
                          </p>
                          {event.event.mode === "ONLINE" ? (
                            <a
                              href={event.event.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-bold text-violet-600 hover:underline flex items-center gap-1"
                            >
                              Join Meeting <FiExternalLink />
                            </a>
                          ) : (
                            <p className="text-sm font-bold text-slate-800">
                              {event.event.venue}
                            </p>
                          )}
                          <span className="inline-block mt-2 px-2 py-0.5 bg-violet-100 text-violet-700 text-[10px] font-black rounded uppercase">
                            {event.event.mode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attachments Card */}
                  {attachments.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
                          Resources
                        </h4>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {attachments.map((file: any, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedFile(file)}
                            className="w-full text-left p-4 hover:bg-slate-50 transition-colors group flex items-start gap-3"
                          >
                            <div className="mt-1 text-slate-400 group-hover:text-violet-600 transition-colors">
                              {file.mimeType === "application/pdf" ? (
                                <FiFileText size={18} />
                              ) : (
                                <FiImage size={18} />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-700 truncate group-hover:text-violet-700 transition-colors">
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
