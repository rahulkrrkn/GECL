import React from "react";

interface PdfViewerProps {
  url: string;
  title?: string;
  className?: string;
  /**
   * If true, the native browser toolbar (Download/Print) will be shown.
   * Default is false.
   */
  downloadable?: boolean;
}

export function PdfViewer({
  url,
  title = "PDF Document",
  className = "",
  downloadable = false,
}: PdfViewerProps) {
  // Append parameters to hide toolbar, nav panes, and scrollbars if download is disabled
  // Note: This relies on the browser's built-in PDF viewer respecting these params.
  const viewerUrl = downloadable
    ? url
    : `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div
      className={`relative w-full h-full bg-slate-100 overflow-hidden rounded-lg border border-slate-200 ${className}`}
      // Prevent right-click "Save As"
      onContextMenu={(e) => !downloadable && e.preventDefault()}
    >
      <iframe
        src={viewerUrl}
        title={title}
        className="w-full h-full border-none block"
        allowFullScreen
      />

      {/* Optional: Transparent overlay for extra protection (blocks direct interaction if needed) 
          Use carefully as it might block scrolling depending on z-index strategy. 
          Usually contextMenu prevention on parent is enough for basic protection.
      */}
    </div>
  );
}
