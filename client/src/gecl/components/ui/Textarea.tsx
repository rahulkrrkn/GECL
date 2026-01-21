"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type TextareaStatus = "success" | "error" | "warning" | "info";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  status?: TextareaStatus;
  message?: string;
  containerClassName?: string;
  textareaClassName?: string;
  loading?: boolean;

  /** Optional features */
  autoResize?: boolean;
  showCount?: boolean;
  maxLength?: number;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const statusStyles: Record<TextareaStatus, string> = {
  success:
    "border-emerald-500/60 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500",
  error:
    "border-rose-500/60 focus-visible:ring-rose-500/30 focus-visible:border-rose-500",
  warning:
    "border-amber-500/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-500",
  info:
    "border-sky-500/60 focus-visible:ring-sky-500/30 focus-visible:border-sky-500",
};

const messageStyles: Record<TextareaStatus, string> = {
  success: "text-emerald-600",
  error: "text-rose-600",
  warning: "text-amber-600",
  info: "text-sky-600",
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      id,
      status,
      message,
      containerClassName,
      textareaClassName,
      className,
      disabled,
      loading = false,

      autoResize = false,
      showCount = false,
      maxLength,

      rows = 4,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const textareaId = id ?? reactId;

    const msgId = `${textareaId}-message`;
    const isDisabled = disabled || loading;

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // merge refs (forwardRef + local ref)
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    const resize = React.useCallback(() => {
      if (!autoResize) return;
      const el = textareaRef.current;
      if (!el) return;

      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize]);

    React.useEffect(() => {
      resize();
    }, [resize, value]);

    const currentLength =
      typeof value === "string" ? value.length : typeof value === "number" ? String(value).length : 0;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label ? (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          <textarea
            ref={(node) => {
              textareaRef.current = node;
            }}
            id={textareaId}
            disabled={isDisabled}
            rows={rows}
            value={value}
            onChange={(e) => {
              onChange?.(e);
              if (autoResize) resize();
            }}
            maxLength={maxLength}
            aria-invalid={status === "error" ? true : undefined}
            aria-describedby={message ? msgId : undefined}
            className={cn(
              "w-full resize-none rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition",
              "placeholder:text-zinc-400",
              "focus-visible:ring-4 focus-visible:ring-zinc-200/60",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-800/60",
              isDisabled
                ? "cursor-not-allowed opacity-60"
                : "hover:border-zinc-400 dark:hover:border-zinc-700",
              status ? statusStyles[status] : "border-zinc-300/80",
              textareaClassName,
              className
            )}
            {...props}
          />

          {/* Loading indicator */}
          {loading ? (
            <div className="pointer-events-none absolute right-3 top-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent dark:border-zinc-700 dark:border-t-transparent" />
            </div>
          ) : null}
        </div>

        <div className="mt-1.5 flex items-start justify-between gap-3">
          {/* Animated message */}
          <div className="min-h-[18px]">
            <AnimatePresence mode="wait">
              {message ? (
                <motion.p
                  id={msgId}
                  key={message}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={cn(
                    "text-xs",
                    status ? messageStyles[status] : "text-zinc-500"
                  )}
                >
                  {message}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Character count */}
          {showCount ? (
            <p className="text-xs text-zinc-500 tabular-nums">
              {maxLength ? `${currentLength}/${maxLength}` : currentLength}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
