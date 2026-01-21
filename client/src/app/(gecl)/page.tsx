"use client";

import React, { useState } from "react";
import { useApi } from "@/gecl/hooks/useApi";

type LoginResponse = {
  success: boolean;
  message: string;
  token?: string;
};

export default function LoginPage() {
  const { request } = useApi();

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await request<
        LoginResponse,
        { email: string; password: string }
      >(
        {
          method: "POST",
          url: "/auth/login/password", // 👈 change this to your backend route
          data: { id: email, password },
        },
        {
          showMsg: true,
          showErrorMsg: true,
          showSuccessMsg: true,
        },
      );

      setResult(res);
    } catch (err: any) {
      setResult({ error: err?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gecl-background p-4">
      <div className="w-full max-w-md rounded-2xl bg-gecl-surface shadow-lg p-6 border border-black/5">
        <h1 className="text-2xl font-bold text-gecl-text-primary">
          Login (Test Page)
        </h1>
        <p className="text-sm text-gecl-text-muted mt-1">
          This page is only for testing your <code>useApi()</code> hook.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gecl-text-primary">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gecl-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gecl-text-primary">
              Password
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gecl-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-gecl-primary text-white py-2 font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Calling API..." : "Login (Test API)"}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gecl-text-primary mb-2">
            Response:
          </p>
          <pre className="text-xs bg-black/5 rounded-xl p-3 overflow-auto">
            {result ? JSON.stringify(result, null, 2) : "No response yet..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
