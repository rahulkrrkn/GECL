"use client";

import React, { useState } from "react";
import { FiLoader, FiDownload, FiAlertCircle } from "react-icons/fi";

interface PdfViewerProps {
  url: string;
  className?: string;
  downloadable?: boolean;
}

export function PdfViewer({
  url,
  className = "",
  downloadable = false,
}: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Use Google Docs Viewer for all devices (Mobile & Desktop)
  // This renders the PDF as HTML/Images, so it works inside an iframe on phones.
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

  return (
    <div
      className={`relative w-full h-full bg-slate-100 overflow-hidden rounded-lg border border-slate-200 flex flex-col ${className}`}
      // Disable right-click context menu
      onContextMenu={(e) => !downloadable && e.preventDefault()}
    >
      {/* 1. Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-30">
          <FiLoader className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            Loading Document...
          </p>
        </div>
      )}

      {/* 2. The Viewer Iframe */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <iframe
          src={googleDocsUrl}
          className="w-full h-full border-none block"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />

        {/* 🔒 SECURITY OVERLAY 
           This transparent box sits over the top-right corner of the iframe.
           It blocks clicks on the Google "Pop-out" / "Open in New Tab" button.
        */}
        {!downloadable && (
          <div className="absolute top-0 right-0 w-20 h-16 z-20 bg-transparent cursor-default" />
        )}
      </div>

      {/* 3. Official Download Button (Only if enabled) */}
      {downloadable && (
        <div className="bg-white border-t border-slate-200 p-3 flex justify-end shrink-0 z-40">
          <a
            href={url}
            download
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiDownload /> Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
