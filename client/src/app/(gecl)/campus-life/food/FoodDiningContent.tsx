"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaMugHot,
  FaPerson,
  FaPersonDress,
  FaBowlFood,
  FaHouseUser,
  FaArrowRight,
} from "react-icons/fa6";
import { PageHero, ImageCard } from "@/gecl/components/ui";

// Types
interface MessItem {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface CanteenItem {
  item: string;
  price: string;
  category: string;
}

interface FoodData {
  messBoys: MessItem[];
  messGirls: MessItem[];
  canteen: CanteenItem[];
}

export default function FoodDiningContent({ data }: { data: FoodData }) {
  const [activeTab, setActiveTab] = useState<"boys" | "girls" | "canteen">(
    "boys",
  );

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* ================= HERO SECTION ================= */}
      <PageHero
        title="Food & Dining"
        badge="Campus Services"
        icon={<FaUtensils />}
        description="Nutritious meals, hygienic preparation, and student-managed menus for a home-like dining experience."
        image="/gecl/images/food/student-mess-hall-lunch.webp"
        className="bg-orange-950"
        themeColor="text-orange-400"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Campus Life", href: "/campus-life" },
          { label: "Food & Dining" },
        ]}
      />

      {/* ================= TABS & CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-20">
        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <TabButton
            active={activeTab === "boys"}
            onClick={() => setActiveTab("boys")}
            icon={<FaPerson />}
            label="Boys Hostel Mess"
          />
          <TabButton
            active={activeTab === "girls"}
            onClick={() => setActiveTab("girls")}
            icon={<FaPersonDress />}
            label="Girls Hostel Mess"
          />
          <TabButton
            active={activeTab === "canteen"}
            onClick={() => setActiveTab("canteen")}
            icon={<FaMugHot />}
            label="College Canteen"
          />
        </div>

        {/* --- TAB CONTENT: BOYS MESS --- */}
        {activeTab === "boys" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-blue-900 p-6 text-white flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaBowlFood /> Boys Mess Menu
              </h2>
              <Link
                href="/campus-life/hostel"
                className="text-xs bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-full uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <FaHouseUser /> View Hostel Details
              </Link>
            </div>
            <MessTable menu={data.messBoys} highlightColor="text-blue-600" />
          </motion.div>
        )}

        {/* --- TAB CONTENT: GIRLS MESS --- */}
        {activeTab === "girls" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-pink-700 p-6 text-white flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaBowlFood /> Girls Mess Menu
              </h2>
              <Link
                href="/campus-life/hostel"
                className="text-xs bg-pink-800 hover:bg-pink-600 px-4 py-2 rounded-full uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <FaHouseUser /> View Hostel Details
              </Link>
            </div>
            <MessTable menu={data.messGirls} highlightColor="text-pink-600" />
          </motion.div>
        )}

        {/* --- TAB CONTENT: CANTEEN --- */}
        {activeTab === "canteen" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            {/* Visual (Using ImageCard) */}
            <div className="w-full">
              <ImageCard
                src="/gecl/images/food/college-canteen-cafeteria.webp"
                alt="College Canteen"
                variant="feature"
                badge="Open: 9AM - 5PM"
                title="Cafeteria"
                aspectRatio="square"
              />
            </div>

            {/* Menu List */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200 h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <FaMugHot className="text-orange-500" /> Canteen Price List
              </h2>
              <div className="space-y-4">
                {data.canteen.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-dashed border-slate-200 pb-3 last:border-0 hover:bg-slate-50 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-700">{item.item}</h4>
                      <span className="text-xs text-slate-400 uppercase font-medium">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-slate-400 mt-6 italic bg-slate-50 py-2 rounded-lg">
                * Prices are subject to change based on raw material costs.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ================= DISCLAIMER ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <p className="text-sm text-slate-500 bg-white inline-block px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
          <strong className="text-slate-700 block mb-1">
            Note on Timings:
          </strong>
          Breakfast (7:30 AM - 9:00 AM) • Lunch (12:30 PM - 2:00 PM) • Dinner
          (8:00 PM - 9:30 PM)
        </p>
      </div>
    </main>
  );
}

// ================= HELPER COMPONENTS =================

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-md ${
        active
          ? "bg-orange-500 text-white shadow-orange-500/30 scale-105"
          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function MessTable({
  menu,
  highlightColor,
}: {
  menu: MessItem[];
  highlightColor: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider w-32">
              Day
            </th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">
              Breakfast
            </th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">
              Lunch
            </th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">
              Dinner
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {menu.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-slate-50/80 transition-colors group"
            >
              <td className="px-6 py-4 font-bold text-slate-800 bg-slate-50/30 border-r border-slate-100">
                {row.day}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 group-hover:text-slate-900">
                {row.breakfast}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 group-hover:text-slate-900">
                {row.lunch}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 group-hover:text-slate-900">
                {row.day === "Sunday" || row.day === "Wednesday" ? (
                  <span className={`font-bold ${highlightColor}`}>
                    {row.dinner} ⭐
                  </span>
                ) : (
                  row.dinner
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
