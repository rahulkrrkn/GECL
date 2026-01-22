"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type SelectStatus = "success" | "error" | "warning" | "info";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "children"
> & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  status?: SelectStatus;
  message?: string;
  containerClassName?: string;
  selectClassName?: string;
  loading?: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const statusStyles: Record<SelectStatus, string> = {
  success:
    "border-emerald-500/60 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500",
  error:
    "border-rose-500/60 focus-visible:ring-rose-500/30 focus-visible:border-rose-500",
  warning:
    "border-amber-500/60 focus-visible:ring-amber-500/30 focus-visible:border-amber-500",
  info: "border-sky-500/60 focus-visible:ring-sky-500/30 focus-visible:border-sky-500",
};

const messageStyles: Record<SelectStatus, string> = {
  success: "text-emerald-600",
  error: "text-rose-600",
  warning: "text-amber-600",
  info: "text-sky-600",
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      id,
      options,
      placeholder = "Select...",
      status,
      message,
      containerClassName,
      selectClassName,
      className,
      required,
      disabled,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const selectId = id ?? reactId;

    const msgId = `${selectId}-message`;
    const isDisabled = disabled || loading;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label ? (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            {label} {required ? <span className="text-rose-500">*</span> : null}
          </label>
        ) : null}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={isDisabled}
            aria-invalid={status === "error" ? true : undefined}
            aria-describedby={message ? msgId : undefined}
            className={cn(
              "w-full appearance-none rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition",
              "focus-visible:ring-4 focus-visible:ring-zinc-200/60",
              "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:ring-zinc-800/60",
              "pr-10",
              isDisabled
                ? "cursor-not-allowed opacity-60"
                : "hover:border-zinc-400 dark:hover:border-zinc-700",
              status ? statusStyles[status] : "border-zinc-300/80",
              selectClassName,
              className,
            )}
            {...props}
          >
            {/* Placeholder option */}
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Right side icon / loading */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent dark:border-zinc-700 dark:border-t-transparent" />
            ) : (
              <svg
                className="h-4 w-4 text-zinc-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Animated status message */}
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

Select.displayName = "Select";
export default Select;
