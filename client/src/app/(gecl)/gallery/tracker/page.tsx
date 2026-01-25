"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaCopy, FaCheck, FaSearch, FaFilter } from "react-icons/fa";
import { imageLinks } from "./data";
// ✅ YOUR FULL IMAGE ARRAY

const ImageTrackerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Filter logic
  const filteredImages = imageLinks.filter((link) =>
    link.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Copy to clipboard function
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    // Reset icon after 2 seconds
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 font-mono">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="bg-yellow-500 text-black px-2 rounded text-sm">
              DEV ONLY
            </span>
            Asset Tracker
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Total Assets:{" "}
            <span className="text-white font-bold">{imageLinks.length}</span> |
            Showing:{" "}
            <span className="text-white font-bold">
              {filteredImages.length}
            </span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search path (e.g. hostel, logo)..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((path, index) => (
          <div
            key={index}
            className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col hover:border-yellow-500 transition group"
          >
            {/* Image Preview */}
            <div className="relative h-48 w-full bg-slate-950 pattern-grid-lg">
              <Image
                src={path}
                alt={path}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Size Badge (Simulated) */}
              <div className="absolute top-2 right-2 bg-black/60 text-[10px] px-2 py-0.5 rounded text-white backdrop-blur-sm">
                WEBP
              </div>
            </div>

            {/* Path Info */}
            <div className="p-3 bg-slate-900 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Path
                </p>
                <code className="block text-xs text-yellow-400 break-all leading-relaxed bg-black/30 p-2 rounded border border-slate-800">
                  {path}
                </code>
              </div>

              {/* Action Button */}
              <button
                onClick={() => copyToClipboard(path, index)}
                className={`mt-3 w-full flex items-center justify-center gap-2 py-2 text-xs font-bold rounded transition-all ${
                  copiedIndex === index
                    ? "bg-green-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                }`}
              >
                {copiedIndex === index ? (
                  <>
                    <FaCheck /> Copied!
                  </>
                ) : (
                  <>
                    <FaCopy /> Copy Path
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <FaFilter className="text-4xl mx-auto mb-4" />
          <p>No images found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default ImageTrackerPage;
