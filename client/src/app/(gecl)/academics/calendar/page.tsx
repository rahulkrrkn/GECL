"use client";

import Image from "next/image";
import { useState } from "react";
import {
  LuCalendarDays,
  LuCalendar,
  LuDownload,
  LuEye,
  LuX,
  // LuInfo,
  LuFileText,
  LuClock,
} from "react-icons/lu";
import { FaExclamationTriangle } from "react-icons/fa";

// Import Reusable Components
import {
  PageHero,
  SidebarNavigation,
  SidebarWidget,
  // SectionHeader,
} from "@/gecl/components/ui";

// --- SEO METADATA ---
// Since this is a client component, we can't export metadata directly.
// In a real Next.js app with the App Router, this would be in a separate layout.tsx or page.tsx that imports this component.
// For this example, I will comment it out as we are in a client-side context.

/*
export const metadata: Metadata = {
  title: "Academic Calendar | Government Engineering College, Lakhisarai",
  description: "View the official academic calendar and holiday list for GEC Lakhisarai. Check dates for holidays, vacations, and important academic events.",
  keywords: [
    "GEC Lakhisarai Academic Calendar",
    "GEC Holiday List 2026",
    "Engineering College Bihar Calendar",
    "GEC Lakhisarai Vacation Dates",
  ],
  openGraph: {
    title: "Academic Calendar | GEC Lakhisarai",
    description: "Official holiday list and academic schedule for the year.",
    url: "/academics/calendar",
    type: "website",
  },
};
*/

// --- MOCK DATA (Extracted from the image for 2026) ---
const CALENDAR_DATA: Record<string, any[]> = {
  "2026": [
    {
      sn: 1,
      name: "नववर्ष आरम्भ (New Year's Day)",
      date: "01 January",
      day: "गुरुवार (Thursday)",
      count: "01 दिन",
    },
    {
      sn: 2,
      name: "मकर संक्रान्ति (Makar Sankranti)",
      date: "14 January",
      day: "बुधवार (Wednesday)",
      count: "01 दिन",
    },
    {
      sn: 3,
      name: "बसंत पंचमी / सरस्वती पूजा (Basant Panchami)",
      date: "23 January",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 4,
      name: "संत रविदास जयंती (Sant Ravidas Jayanti)",
      date: "01 February",
      day: "रविवार (Sunday)",
      count: "-",
    },
    {
      sn: 5,
      name: "शब-ए-बरात (Shab-e-Barat)",
      date: "04 February",
      day: "बुधवार (Wednesday)",
      count: "01 दिन",
    },
    {
      sn: 6,
      name: "महाशिवरात्रि (Mahashivratri)",
      date: "15 February",
      day: "रविवार (Sunday)",
      count: "-",
    },
    {
      sn: 7,
      name: "होलिकादहन / होली (Holi)",
      date: "02 March - 04 March",
      day: "सोमवार से बुधवार (Mon-Wed)",
      count: "03 दिन",
    },
    {
      sn: 8,
      name: "ईद-उल-फितर (Id-ul-Fitr)",
      date: "21 March",
      day: "शनिवार (Saturday)",
      count: "01 दिन",
    },
    {
      sn: 9,
      name: "बिहार दिवस (Bihar Diwas)",
      date: "22 March",
      day: "रविवार (Sunday)",
      count: "-",
    },
    {
      sn: 10,
      name: "सम्राट अशोक जयंती (Samrat Ashok Jayanti)",
      date: "26 March",
      day: "गुरुवार (Thursday)",
      count: "01 दिन",
    },
    {
      sn: 11,
      name: "रामनवमी (Ram Navami)",
      date: "27 March",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 12,
      name: "महावीर जयंती (Mahavir Jayanti)",
      date: "31 March",
      day: "मंगलवार (Tuesday)",
      count: "01 दिन",
    },
    {
      sn: 13,
      name: "गुड फ्राइडे (Good Friday)",
      date: "03 April",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 14,
      name: "डॉ० भीम राव अंबेडकर जयंती (Ambedkar Jayanti)",
      date: "14 April",
      day: "मंगलवार (Tuesday)",
      count: "01 दिन",
    },
    {
      sn: 15,
      name: "वीर कुँवर सिंह जयंती (Veer Kunwar Singh Jayanti)",
      date: "23 April",
      day: "गुरुवार (Thursday)",
      count: "01 दिन",
    },
    {
      sn: 16,
      name: "जानकी नवमी (Janaki Navami)",
      date: "25 April",
      day: "शनिवार (Saturday)",
      count: "01 दिन",
    },
    {
      sn: 17,
      name: "मई दिवस / बुद्ध पूर्णिमा (May Day / Buddha Purnima)",
      date: "01 May",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 18,
      name: "ईद-उल-जोहा (बकरीद) (Id-ul-Zuha)",
      date: "28 May",
      day: "गुरुवार (Thursday)",
      count: "01 दिन",
    },
    {
      sn: 19,
      name: "ग्रीष्मावकाश (Summer Vacation)",
      date: "01 June - 30 June",
      day: "सोमवार से मंगलवार (Mon-Tue)",
      count: "26 + 04 रविवार",
    },
    {
      sn: 20,
      name: "चेहल्लुम (Chehallum)",
      date: "04 August",
      day: "मंगलवार (Tuesday)",
      count: "01 दिन",
    },
    {
      sn: 21,
      name: "हजरत मोहम्मद साहब का जन्म दिवस",
      date: "26 August",
      day: "बुधवार (Wednesday)",
      count: "01 दिन",
    },
    {
      sn: 22,
      name: "रक्षाबंधन (Raksha Bandhan)",
      date: "28 August",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 23,
      name: "श्री कृष्ण जन्माष्टमी (Janmashtami)",
      date: "04 September",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 24,
      name: "महात्मा गांधी जयंती (Gandhi Jayanti)",
      date: "02 October",
      day: "शुक्रवार (Friday)",
      count: "01 दिन",
    },
    {
      sn: 25,
      name: "दुर्गा पूजा (Durga Puja)",
      date: "17 October - 20 October",
      day: "शनिवार से मंगलवार (Sat-Tue)",
      count: "03 + 01 रविवार",
    },
    {
      sn: 26,
      name: "दीपावली / छठ पूजा (Diwali / Chhath)",
      date: "08 November - 16 November",
      day: "रविवार से सोमवार (Sun-Mon)",
      count: "07 + 02 रविवार",
    },
    {
      sn: 27,
      name: "गुरुनानक जयंती / कार्तिक पूर्णिमा",
      date: "24 November",
      day: "मंगलवार (Tuesday)",
      count: "01 दिन",
    },
    {
      sn: 28,
      name: "क्रिसमस / शीतकालीन अवकाश (Winter Vacation)",
      date: "25 December - 31 December",
      day: "शुक्रवार से गुरुवार (Fri-Thu)",
      count: "06 + 01 रविवार",
    },
  ],
  "2025": [], // Placeholder
};

const AVAILABLE_YEARS = Object.keys(CALENDAR_DATA).sort().reverse();

export default function AcademicCalendarPage() {
  const [selectedYear, setSelectedYear] = useState(AVAILABLE_YEARS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentData = CALENDAR_DATA[selectedYear] || [];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* 1. REUSABLE HERO SECTION */}
      <PageHero
        title="Academic Calendar & Holidays"
        description="Plan your academic year with the official list of holidays, vacations, and important dates for GEC Lakhisarai."
        badge="Academics"
        // Ensure this image exists or remove property
        image="/gecl/images/college-building-main.webp"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Academic Calendar" },
        ]}
      />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- MAIN CONTENT --- */}
          <main className="lg:w-3/4">
            {/* CONTROLS HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <LuCalendarDays className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Holiday List
                  </h2>
                  <p className="text-sm text-slate-500">
                    Showing schedule for{" "}
                    <span className="font-semibold text-gecl-primary">
                      {selectedYear}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="p-2.5 pr-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold focus:outline-none focus:border-gecl-primary cursor-pointer"
                >
                  {AVAILABLE_YEARS.map((year) => (
                    <option key={year} value={year}>
                      Year {year}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gecl-primary text-white text-sm font-bold rounded-lg hover:bg-gecl-primary/90 transition-colors shadow-sm"
                >
                  <LuEye className="w-4 h-4" /> View Official Notice
                </button>
              </div>
            </div>

            {/* CALENDAR TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-xs border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 w-16 text-center">S.No.</th>
                      <th className="px-6 py-4">Holiday Name / Occasion</th>
                      <th className="px-6 py-4">Date(s)</th>
                      <th className="px-6 py-4">Day(s)</th>
                      <th className="px-6 py-4 text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentData.length > 0 ? (
                      currentData.map((item) => (
                        <tr
                          key={item.sn}
                          className={`hover:bg-slate-50 transition-colors ${
                            item.count === "-"
                              ? "bg-slate-50/60 italic text-slate-500"
                              : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-center font-medium text-slate-600">
                            {item.sn}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-800">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <LuCalendar className="w-4 h-4 text-gecl-accent" />
                              {item.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {item.day}
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-gecl-primary">
                            {item.count !== "-" ? (
                              <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                {item.count}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-16 text-center text-slate-500"
                        >
                          <div className="flex flex-col items-center">
                            <LuCalendarDays className="w-12 h-12 text-slate-300 mb-3" />
                            <p className="text-lg font-medium">
                              No data available for {selectedYear}.
                            </p>
                            <p className="text-sm">
                              Please check back later or view the official
                              notice.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {currentData.length > 0 && (
                    <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-slate-700">
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-right uppercase text-xs tracking-wider"
                        >
                          Total Holidays
                        </td>
                        <td className="px-6 py-4 text-center text-gecl-primary">
                          65 + 08 Sunday
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            {/* Important Notes */}
            {currentData.length > 0 && (
              <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4 text-sm text-amber-900">
                <FaExclamationTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-2 text-amber-800">
                    Important Notes:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 marker:text-amber-500">
                    <li>
                      Republic Day (Jan 26) and Independence Day (Aug 15) will
                      be celebrated as per rules.
                    </li>
                    <li>
                      Dates for Muslim festivals may change based on the
                      sighting of the moon and corresponding government orders.
                    </li>
                    <li>
                      Additional holidays will be applicable as per government
                      orders.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="sticky top-28">
              {/* 2. REUSABLE SIDEBAR NAVIGATION */}
              <SidebarNavigation
                title="Quick Access"
                links={[
                  { label: "Class Routine", href: "/academics/timetable" },
                  { label: "Syllabus", href: "/academics/syllabus" },
                  {
                    label: "Attendance Policy",
                    href: "/academics/attendance-policy",
                  },
                  { label: "Academic Programs", href: "/academics/programs" },
                ]}
              />

              {/* 3. REUSABLE SIDEBAR WIDGET */}
              <SidebarWidget
                title={
                  <div className="flex items-center gap-2">
                    <LuFileText className="w-5 h-5" /> Semester Schedule
                  </div>
                }
                variant="info"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Odd Semester
                    </p>
                    <p className="font-medium text-slate-800">
                      July - December
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Even Semester
                    </p>
                    <p className="font-medium text-slate-800">January - June</p>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-xs text-blue-700">
                      <LuClock className="w-4 h-4" />
                      <span>Classes: Mon-Sat (10AM - 5PM)</span>
                    </div>
                  </div>
                </div>
              </SidebarWidget>
            </div>
          </aside>
        </div>
      </div>

      {/* --- OFFICIAL NOTICE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <LuFileText className="text-gecl-primary" />
                Official Holiday Notice - {selectedYear}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
              >
                <LuX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Image Viewer */}
            <div className="grow overflow-auto p-4 bg-slate-100 text-center flex items-center justify-center min-h-75">
              {selectedYear === "2026" ? (
                <div className="relative w-full h-full min-h-125">
              
                  <Image
                    src="/gecl/images/calendar-2026-notice.webp"
                    alt={`Official Academic Calendar Notice ${selectedYear}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <LuCalendarDays className="w-16 h-16 mb-4 opacity-50" />
                  <p>
                    Official notice for {selectedYear} is not available yet.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              {selectedYear === "2026" && (
                <a
                  href="/gecl/images/calendar-2026-notice.webp"
                  download
                  className="flex items-center gap-2 px-6 py-2.5 bg-gecl-primary text-white text-sm font-bold rounded-lg hover:bg-gecl-primary/90 transition-colors shadow-lg"
                >
                  <LuDownload className="w-4 h-4" /> Download Notice
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
