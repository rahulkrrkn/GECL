"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type AlertType = "success" | "error" | "warning" | "info";

type AlertMessageProps = {
  type?: AlertType;
  title?: string;
  msg: string;
  dismissible?: boolean;
  defaultVisible?: boolean;
  autoCloseMs?: number; // example: 3000
  onClose?: () => void;

  actionLabel?: string;
  onAction?: () => void;

  className?: string;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const styles: Record<
  AlertType,
  {
    container: string;
    iconWrap: string;
    icon: React.ReactNode;
  }
> = {
  success: {
    container:
      "bg-gecl-surface border-gecl-border text-gecl-text-primary dark:bg-gecl-surface dark:border-gecl-border",
    iconWrap: "bg-gecl-success/15 text-gecl-success",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    ),
  },
  error: {
    container:
      "bg-gecl-surface border-gecl-border text-gecl-text-primary dark:bg-gecl-surface dark:border-gecl-border",
    iconWrap: "bg-gecl-error/15 text-gecl-error",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    ),
  },
  warning: {
    container:
      "bg-gecl-surface border-gecl-border text-gecl-text-primary dark:bg-gecl-surface dark:border-gecl-border",
    iconWrap: "bg-gecl-warning/15 text-gecl-warning",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01M12 5a7 7 0 100 14a7 7 0 000-14z"
      />
    ),
  },
  info: {
    container:
      "bg-gecl-surface border-gecl-border text-gecl-text-primary dark:bg-gecl-surface dark:border-gecl-border",
    iconWrap: "bg-gecl-primary/15 text-gecl-primary",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16a8 8 0 000 16z"
      />
    ),
  },
};

export default function AlertMessage({
  type = "info",
  title,
  msg,
  dismissible = true,
  defaultVisible = true,
  autoCloseMs,
  onClose,
  actionLabel,
  onAction,
  className,
}: AlertMessageProps) {
  const [visible, setVisible] = React.useState(defaultVisible);

  React.useEffect(() => {
    if (!autoCloseMs) return;
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [autoCloseMs, visible, onClose]);

  const close = () => {
    setVisible(false);
    onClose?.();
  };

  const t = styles[type];

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn(
            "w-full rounded-2xl border p-3 shadow-sm",
            "flex items-start justify-between gap-3",
            "hover:shadow-md transition",
            t.container,
            className,
          )}
        >
          <div className="flex gap-3">
            {/* Icon */}
            <div
              className={cn(
                "mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl",
                t.iconWrap,
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {t.icon}
              </svg>
            </div>

            {/* Text */}
            <div className="min-w-0">
              {title ? (
                <p className="text-sm font-semibold text-gecl-text-primary">
                  {title}
                </p>
              ) : null}

              <p className="text-sm text-gecl-text-muted break-words">{msg}</p>

              {/* Action */}
              {actionLabel && onAction ? (
                <button
                  type="button"
                  onClick={onAction}
                  className="mt-2 inline-flex text-sm font-medium text-gecl-accent hover:opacity-80"
                >
                  {actionLabel}
                </button>
              ) : null}
            </div>
          </div>

          {/* Close button */}
          {dismissible ? (
            <button
              type="button"
              onClick={close}
              className={cn(
                "rounded-lg p-1.5 text-gecl-text-muted transition",
                "hover:bg-gecl-secondary/50 hover:text-gecl-text-primary",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gecl-accent/30",
              )}
              aria-label="Close alert"
            >
              ✕
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
