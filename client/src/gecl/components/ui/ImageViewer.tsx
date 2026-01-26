import React, { useState } from "react";
import Image from "next/image";
import { FiZoomIn, FiZoomOut, FiRefreshCw } from "react-icons/fi";

interface ImageViewerProps {
  url: string;
  alt?: string;
  className?: string;
  /**
   * If true, right-click and drag-to-save will be allowed.
   * Default is false.
   */
  downloadable?: boolean;
}

export function ImageViewer({
  url,
  alt = "Image Preview",
  className = "",
  downloadable = false,
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);

  const handleZoom = (direction: "in" | "out") => {
    setScale((prev) => {
      if (direction === "in") return Math.min(prev + 0.5, 3);
      return Math.max(prev - 0.5, 1);
    });
  };

  return (
    <div
      className={`relative w-full h-full bg-slate-900/5 overflow-hidden rounded-lg border border-slate-200 flex items-center justify-center group ${className}`}
      // 🔒 Security: Prevent Right Click
      onContextMenu={(e) => !downloadable && e.preventDefault()}
    >
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleZoom("out")}
          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 disabled:opacity-50"
          disabled={scale <= 1}
        >
          <FiZoomOut size={18} />
        </button>
        <button
          onClick={() => setScale(1)}
          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600"
          title="Reset"
        >
          <FiRefreshCw size={14} />
        </button>
        <button
          onClick={() => handleZoom("in")}
          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 disabled:opacity-50"
          disabled={scale >= 3}
        >
          <FiZoomIn size={18} />
        </button>
      </div>

      {/* Image Container with Scroll for Zoom */}
      <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            width: `${100 * scale}%`,
            height: `${100 * scale}%`,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <Image
            src={url}
            alt={alt}
            fill
            className="object-contain select-none"
            // 🔒 Security: Prevent Dragging image to desktop
            draggable={downloadable}
            onDragStart={(e) => !downloadable && e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}
