"use client";

import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gecl-primary text-gecl-nav-text hover:opacity-90 focus-visible:ring-gecl-accent/30",
  secondary:
    "bg-gecl-secondary text-gecl-text-primary hover:opacity-90 focus-visible:ring-gecl-accent/30",
  accent:
    "bg-gecl-accent text-gecl-nav-text hover:opacity-90 focus-visible:ring-gecl-accent/30",
  danger:
    "bg-gecl-error text-white hover:opacity-90 focus-visible:ring-gecl-error/30",
  ghost:
    "bg-transparent text-gecl-text-primary hover:bg-gecl-secondary/60 focus-visible:ring-gecl-accent/30",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
};

export default function Button({
  children,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium shadow-sm transition",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
        "ring-offset-gecl-background",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
      ) : null}

      {children}
    </button>
  );
}
