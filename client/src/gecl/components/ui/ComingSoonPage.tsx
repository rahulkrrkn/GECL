"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaCode, FaClock, FaBell } from "react-icons/fa";

export default function ComingSoonPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <main className="min-h-screen bg-gecl-background text-gecl-text-primary">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gecl-secondary blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-gecl-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full rounded-3xl border border-gecl-border bg-gecl-surface p-6 shadow-sm sm:p-10"
        >
          {/* Top Icon */}
          <motion.div
            initial={{ rotate: -12, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gecl-secondary text-gecl-primary shadow-sm">
              <FaCode className="text-2xl" />
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-medium text-gecl-text-muted">
                GECL Portal
              </p>
              <p className="text-lg font-semibold text-gecl-text-primary">
                Feature in progress
              </p>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="text-3xl font-extrabold tracking-tight text-gecl-text-primary sm:text-4xl"
          >
            Coming Soon 🚀
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-gecl-text-muted sm:text-base"
          >
            This page is currently under development. I’m building something
            useful and fast for the GECL system — stay tuned!
          </motion.p>

          {/* Status row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gecl-border bg-gecl-secondary/40 px-3 py-1 text-xs font-medium text-gecl-text-primary">
              <FaClock className="text-[12px]" />
              Under development
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-gecl-border bg-gecl-secondary/40 px-3 py-1 text-xs font-medium text-gecl-text-primary">
              <FaCode className="text-[12px]" />
              Next.js + Tailwind
            </span>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => router.push("/")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gecl-primary px-5 text-sm font-semibold text-gecl-nav-text shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gecl-accent/30 focus-visible:ring-offset-2"
            >
              <FaHome />
              Go Home
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gecl-border bg-transparent px-5 text-sm font-semibold text-gecl-text-primary transition hover:bg-gecl-secondary/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gecl-accent/30 focus-visible:ring-offset-2"
            >
              <FaClock />
              Coming Soon
            </button>
          </div>

          {/* Notify me section */}
          <div className="mt-8 rounded-2xl border border-gecl-border bg-gecl-secondary/25 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gecl-accent/15 text-gecl-accent">
                <FaBell />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gecl-text-primary">
                  Notify me when it’s ready
                </p>
                <p className="mt-1 text-sm text-gecl-text-muted">
                  Enter your email and I’ll notify you after deployment.
                </p>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 w-full rounded-xl border border-gecl-border bg-gecl-surface px-3 text-sm text-gecl-text-primary outline-none transition placeholder:text-gecl-text-muted focus:ring-4 focus:ring-gecl-accent/30"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      if (!email.trim()) return;
                      setSubmitted(true);
                      setTimeout(() => setSubmitted(false), 2000);
                      setEmail("");
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-gecl-accent px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Notify
                  </button>
                </div>

                <AnimatePresence>
                  {submitted ? (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 text-xs font-medium text-gecl-success"
                    >
                      ✅ Saved! You’ll get notified soon.
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gecl-text-muted">
            © {new Date().getFullYear()} RahulKrRKN — All Rights Reserved.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
