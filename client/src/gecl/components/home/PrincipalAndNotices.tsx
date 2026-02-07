"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuQuote,
  LuBell,
  LuArrowRight,
  LuCalendar,
  LuLoader,
  LuFilter,
} from "react-icons/lu";
import { useApi } from "@/gecl/hooks/useApi";
import { Notice, NoticeResponse } from "@/types/notice";

export const PrincipalAndNotices = () => {
  const { request } = useApi();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "GECL" | "BEU">("ALL");

  // Fetch Live Notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await request<NoticeResponse["data"]>(
          {
            method: "GET",
            url: "/announcements/notices/",
            params: {
              page: 1,
              limit: 5,
            },
          },
          { showMsg: false, showErrorMsg: false },
        );

        if (res.success && res.data) {
          setNotices(res.data.data);
        }
      } catch (e) {
        console.error("Fetch error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [request]);

  const filteredNotices =
    filter === "ALL" ? notices : notices.filter((n) => n.source === filter);

  return (
    <section className="py-20 bg-white relative z-20 -mt-10 rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT: PRINCIPAL --- */}
          <div className="lg:col-span-7">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2 block">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              Principal's Desk
            </h2>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-100 relative shadow-sm hover:shadow-md transition-shadow">
              <LuQuote className="absolute top-8 right-8 text-slate-200 w-24 h-24 rotate-180" />

              <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="shrink-0 text-center sm:text-left">
                  <div className="relative w-40 h-40 mx-auto sm:mx-0 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-200">
                    <Image
                      src="/gecl/images/principal-bimlesh-kumar.webp"
                      alt="Prof. (Dr.) Bimlesh Kumar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-slate-900 text-lg">
                      Prof. (Dr.) Bimlesh Kumar
                    </h3>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">
                      Principal
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-slate-600 leading-relaxed mb-6 italic text-lg">
                    "Government Engineering College, Lakhisarai aims to create a
                    transformative educational experience. We focus on ethical
                    values and technical expertise to nurture engineers who
                    contribute to Bihar's and India's development."
                  </p>
                  <Link
                    href="/about/principal-message"
                    className="text-blue-600 font-bold text-sm inline-flex items-center gap-2 hover:underline group"
                  >
                    Read Full Message{" "}
                    <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: LIVE NOTICES --- */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <LuBell className="text-red-500" /> Notice Board
              </h2>
              <Link
                href="/announcements/notices/"
                className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition"
              >
                View Archive
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4">
              {["ALL", "GECL", "BEU"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filter === t
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {t} Only
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl flex-1 overflow-hidden flex flex-col min-h-[450px]">
              <div className="overflow-y-auto flex-1 p-0 custom-scrollbar h-[400px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                    <LuLoader className="animate-spin text-2xl" /> Fetching
                    updates...
                  </div>
                ) : filteredNotices.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No notices found.
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {filteredNotices.map((notice) => {
                      const d = new Date(notice.publishAt);
                      const day = d.getDate();
                      const month = d.toLocaleString("default", {
                        month: "short",
                      });

                      return (
                        <li
                          key={notice._id}
                          className="group hover:bg-slate-50 transition-colors"
                        >
                          <Link
                            href={`/announcements/notices//${notice.slug}`}
                            className="flex items-start gap-4 p-4"
                          >
                            {/* Date Box */}
                            <div className="shrink-0 w-12 h-14 bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-200 group-hover:border-blue-300 group-hover:bg-blue-50 transition">
                              <span className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-0.5">
                                {month}
                              </span>
                              <span className="text-xl font-bold text-slate-800 leading-none">
                                {day}
                              </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                    notice.source === "BEU"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-indigo-50 text-indigo-700 border-indigo-200"
                                  }`}
                                >
                                  {notice.source}
                                </span>
                                {notice.isPinned && (
                                  <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded animate-pulse">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-medium text-slate-700 leading-snug line-clamp-2 group-hover:text-blue-600 transition">
                                {notice.title}
                              </h4>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
