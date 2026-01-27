import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";

interface PdfViewerProps {
  url: string;
  title?: string;
  className?: string;
  downloadable?: boolean;
}

export function PdfViewer({
  url,
  title = "PDF Document",
  className = "",
  downloadable = false,
}: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Append parameters to hide toolbar
  const viewerUrl = downloadable
    ? url
    : `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div
      className={`relative w-full h-full bg-slate-100 overflow-hidden rounded-lg border border-slate-200 ${className}`}
      onContextMenu={(e) => !downloadable && e.preventDefault()}
    >
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <FiLoader className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            Loading Document...
          </p>
        </div>
      )}

      <iframe
        src={viewerUrl}
        title={title}
        className={`w-full h-full border-none block transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        allowFullScreen
        // ✅ Hide loader when iframe finishes loading
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
