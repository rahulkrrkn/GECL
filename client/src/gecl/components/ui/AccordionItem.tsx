"use client";

import { useState } from "react";
import { LuPlus, LuMinus } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { cn } from "@/gecl/lib/cn";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean; // Optional initial state
  className?: string;
}

export default function AccordionItem({
  question,
  answer,
  isOpen = false,
  className,
}: AccordionItemProps) {
  const [open, setOpen] = useState(isOpen);

  return (
    <div
      className={cn(
        "border border-slate-200 rounded-xl overflow-hidden bg-white transition-all",
        open ? "shadow-md border-gecl-primary/20" : "",
        className,
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <span className="flex items-center gap-3">
          <FaCheckCircle
            className={cn(
              "w-5 h-5",
              open ? "text-gecl-accent" : "text-slate-400",
            )}
          />
          {question}
        </span>
        {open ? (
          <LuMinus className="w-5 h-5 text-gecl-primary" />
        ) : (
          <LuPlus className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 pl-12">
          <div className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-4">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}
