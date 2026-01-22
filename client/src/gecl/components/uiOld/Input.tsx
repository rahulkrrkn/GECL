"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type InputStatus = "success" | "error" | "warning" | "info";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  status?: InputStatus;
  message?: string;
  containerClassName?: string;
  inputClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const statusStyles: Record<InputStatus, string> = {
  success:
    "border-emerald-500/60 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500",
  error:
    "border-rose-500/60 focus-visible:ring-rose-500/30 focus-visible:border-rose-500",
  warning:
    "border-amber-500/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-500",
  info: "border-sky-500/60 focus-visible:ring-sky-500/30 focus-visible:border-sky-500",
};

const messageStyles: Record<InputStatus, string> = {
  success: "text-emerald-600",
  error: "text-rose-600",
  warning: "text-amber-600",
  info: "text-sky-600",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = "text",
      status,
      message,
      containerClassName,
      inputClassName,
      leftIcon,
      rightIcon,
      loading = false,
      required,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId(); // ✅ always called
    const inputId = id ?? reactId; // ✅ choose after hook call

    const msgId = `${inputId}-message`;
    const isDisabled = disabled || loading;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            {label} {required ? <span className="text-rose-500">*</span> : null}
          </label>
        ) : null}

        <div className="relative">
          {leftIcon ? (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-500">
              {leftIcon}
            </div>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={isDisabled}
            aria-invalid={status === "error" ? true : undefined}
            aria-describedby={message ? msgId : undefined}
            className={cn(
              "w-full rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition",
              "placeholder:text-zinc-400",
              "focus-visible:ring-4 focus-visible:ring-zinc-200/60",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-800/60",
              leftIcon ? "pl-10" : "",
              rightIcon || loading ? "pr-10" : "",
              isDisabled
                ? "cursor-not-allowed opacity-60"
                : "hover:border-zinc-400 dark:hover:border-zinc-700",
              status ? statusStyles[status] : "border-zinc-300/80",
              inputClassName,
              className,
            )}
            {...props}
          />

          {loading ? (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent dark:border-zinc-700 dark:border-t-transparent" />
            </div>
          ) : rightIcon ? (
            <div className="absolute inset-y-0 right-3 flex items-center text-zinc-500">
              {rightIcon}
            </div>
          ) : null}
        </div>

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
                "mt-1.5 text-xs",
                status ? messageStyles[status] : "text-zinc-500",
              )}
            >
              {message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
