"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useApi } from "@/gecl/hooks/useApi";
import type { ApiFailure } from "@/gecl/utils/apiRequest";
import { FiLoader, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface GoogleLoginResponse {
  user: { id: string; email: string; role: string };
  GECL_ACCESS_TOKEN: string | { token: string };
}

interface Props {
  onSuccess: (data: string | { token: string }) => void;
}

export default function GoogleAccountLogin({ onSuccess }: Props) {
  const { request } = useApi();
  const btnContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleResponse = async (response: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const googleToken = response.credential;

      const res = await request<GoogleLoginResponse>(
        {
          method: "POST",
          url: "/auth/login/google",
          data: { token: googleToken },
        },
        { showMsg: false, showErrorMsg: false },
      );

      if (res.success && res.GECL_ACCESS_TOKEN) {
        onSuccess(res.GECL_ACCESS_TOKEN);
      } else {
        const failure = res as ApiFailure;
        setError(failure.message || "Google login failed on server.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Network error occurred.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    window.handleGoogleCredentialResponse = handleGoogleResponse;

    const renderGoogleButton = () => {
      // @ts-ignore
      if (window.google && btnContainerRef.current) {
        // Calculate exact width
        const containerWidth = btnContainerRef.current.offsetWidth;

        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id:
            "78394163492-5i4brsjq0dtdjonfj44jp88r3t47i74m.apps.googleusercontent.com",
          callback: handleGoogleResponse,
          auto_select: false,
        });

        // @ts-ignore
        window.google.accounts.id.renderButton(btnContainerRef.current, {
          theme: "outline", // White button with border
          size: "large",
          type: "standard",
          shape: "rectangular", // Clean edges
          text: "continue_with",
          logo_alignment: "left",
          width: containerWidth, // Full width
        });
      }
    };

    if (typeof window !== "undefined") {
      // @ts-ignore
      if (window.google) {
        renderGoogleButton();
      }
      window.addEventListener("resize", renderGoogleButton);
      window.addEventListener("load", renderGoogleButton);
    }

    return () => {
      window.removeEventListener("resize", renderGoogleButton);
      window.removeEventListener("load", renderGoogleButton);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full ">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (window.google) window.dispatchEvent(new Event("load"));
        }}
      />

      {/* Loading State Overlay */}
      {isLoading ? (
        <div className="w-full h-11 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-3 text-slate-600 animate-pulse font-medium">
          <FiLoader className="animate-spin text-blue-600" /> Verifying...
        </div>
      ) : (
        // ✅ FIX: Removed 'overflow-hidden' and 'bg-white'
        // Just a layout wrapper now. Let Google render the box.
        <div className="w-full min-h-11 relative z-10">
          <div
            ref={btnContainerRef}
            className="w-full flex  items-center justify-center"
          />
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-center gap-2 text-xs font-medium text-red-400 bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20"
        >
          <FiAlertCircle className="text-sm shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
