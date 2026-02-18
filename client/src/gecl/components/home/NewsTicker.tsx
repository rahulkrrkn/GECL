"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApi } from "@/gecl/hooks/useApi";
import { Notice, NoticeResponse } from "@/types/notice";
// Define strict type for ticker items
interface TickerNotice {
  title: string;
  source: "GECL" | "BEU";
  slug: string;
}

export const NewsTicker = () => {
  const { request } = useApi();

  // Default Initial State (Matches structure)
  const [notices, setNotices] = useState<TickerNotice[]>([
    {
      title:
        "Welcome to Government Engineering College, Lakhisarai (Est. 2019)",
      source: "GECL",
      slug: "#", // Non-clickable placeholder
    },
    {
      title: "Affiliated to Bihar Engineering University, Patna",
      source: "BEU",
      slug: "#",
    },
    {
      title: "Approved by AICTE, New Delhi",
      source: "GECL",
      slug: "#",
    },
  ]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        // Using POST as per your backend controller requirement
        const res = await request<NoticeResponse["data"]>(
          {
            method: "GET",
            url: "/notices",
            params: {
              page: 1,
              limit: 5,
            },
          },
          { showMsg: false, showErrorMsg: false },
        );

        if (res.success && res.data?.data?.length > 0) {
          // Map response to our local state structure
          setNotices(
            res.data.data.map((n: any) => ({
              title: n.title,
              source: n.source,
              slug: n.slug,
            })),
          );
        }
      } catch (e) {
        console.error("Ticker fetch error:", e);
      }
    };
    fetchHeadlines();
  }, [request]);

  return (
    <div className="bg-blue-900 text-white overflow-hidden py-2.5 border-b border-white/10 relative z-50 shadow-sm">
      <div className="container px-4 flex items-center">
        {/* Label */}
        <span className="bg-red-600 text-xs font-bold px-3 py-1 rounded-sm mr-6 shrink-0 uppercase tracking-wider shadow-md animate-pulse">
          Updates
        </span>

        {/* Marquee Container */}
        <div className="grow overflow-hidden relative h-6 mask-linear-fade">
          <motion.div
            className="flex gap-12 whitespace-nowrap absolute"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          >
            {notices.map((notice, i) => (
              <Link
                key={i}
                href={
                  notice.slug !== "#"
                    ? `/announcements/notices/${notice.slug}`
                    : "#"
                }
                className={`text-sm font-medium flex items-center gap-3 transition-colors ${
                  notice.slug !== "#"
                    ? "hover:text-blue-300 hover:underline"
                    : "text-blue-50"
                }`}
              >
                {/* Source Tag */}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    notice.source === "BEU"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                  }`}
                >
                  {notice.source}
                </span>

                {/* Title */}
                {notice.title}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
