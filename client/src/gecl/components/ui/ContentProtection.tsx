"use client";

import { useEffect, useState } from "react";

export default function ContentProtection() {
  // State to track if dev tools are potentially open (simple detection)
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") || // Inspect
        (e.ctrlKey && e.shiftKey && e.key === "J") || // Console
        (e.ctrlKey && e.shiftKey && e.key === "C") || // Element
        (e.ctrlKey && e.key === "U") || // View Source
        (e.ctrlKey && e.key === "S") || // Save
        (e.ctrlKey && e.key === "P") // Print
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Attempt to block PrintScreen key (Screenshot)
      if (e.key === "PrintScreen") {
        // Clear clipboard (works in some secure contexts)
        navigator.clipboard.writeText("Screenshots are disabled on this site.");
        // Hide content temporarily
        document.body.style.display = "none";
        setTimeout(() => {
          document.body.style.display = "block";
          alert("Screenshots are disabled for security reasons.");
        }, 300);
      }
    };

    // 3. Disable Text Selection & Dragging
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e: Event) => {
      // Allow selection inside inputs/textareas, block everywhere else
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
      ) {
        return true;
      }
      e.preventDefault();
      return false;
    };

    // Attach Listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);

    // 4. CSS Injection for Unselectable Text
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
        -webkit-touch-callout: none; /* iOS Safari */
      }
      /* Allow selection in inputs */
      input, textarea {
        -webkit-user-select: text;
        user-select: text;
      }
      /* Block Image Save on Mobile */
      img {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      if (style.parentNode) document.head.removeChild(style);
    };
  }, []);

  return null; // This component renders nothing visibly
}
