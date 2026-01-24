"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  working,
  done,
  pending,
  notChecked,
  workLater,
  brokenLinks,
  dataVerified,
  imageUpload,
  finished,
} from "./data";

type TabKey =
  | "all"
  | "working"
  | "done"
  | "pending"
  | "notChecked"
  | "workLater"
  | "brokenLinks"
  | "dataVerified"
  | "imageUpload"
  | "finished";

export default function LinksPage() {
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");

  const groups = useMemo(
    () => [
      { key: "working" as const, title: "Working", emoji: "✅", list: working },
      { key: "done" as const, title: "Done", emoji: "🟢", list: done },
      { key: "pending" as const, title: "Pending", emoji: "🟡", list: pending },
      {
        key: "notChecked" as const,
        title: "Not Checked",
        emoji: "⚪",
        list: notChecked,
      },
      {
        key: "workLater" as const,
        title: "Work Later",
        emoji: "🟠",
        list: workLater,
      },
      {
        key: "brokenLinks" as const,
        title: "Broken Links",
        emoji: "🔴",
        list: brokenLinks,
      },
      {
        key: "dataVerified" as const,
        title: "Data Verified",
        emoji: "🟣",
        list: dataVerified,
      },
      {
        key: "imageUpload" as const,
        title: "Image Upload",
        emoji: "🟤",
        list: imageUpload,
      },
      {
        key: "finished" as const,
        title: "Finished",
        emoji: "🟦",
        list: finished,
      },
    ],
    [],
  );

  const allLinks = useMemo(() => {
    const merged = groups.flatMap((g) => g.list);
    return Array.from(new Set(merged)); // remove duplicates
  }, [groups]);

  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filterList = (list: string[]) => {
      if (!q) return list;
      return list.filter((p) => p.toLowerCase().includes(q));
    };

    if (tab === "all") {
      return groups.map((g) => ({ ...g, list: filterList(g.list) }));
    }

    return groups
      .filter((g) => g.key === tab)
      .map((g) => ({ ...g, list: filterList(g.list) }));
  }, [groups, tab, query]);

  const totalCount = allLinks.length;
  const workingCount = working.length;
  const doneCount = done.length;
  const pendingCount = pending.length;
  const notCheckedCount = notChecked.length;
  const workLaterCount = workLater.length;
  const brokenLinksCount = brokenLinks.length;
  const dataVerifiedCount = dataVerified.length;
  const imageUploadCount = imageUpload.length;
  const finishedCount = finished.length;

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #eef2ff 0%, #ffffff 45%, #ffffff 100%)",
        padding: 24,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            border: "1px solid #e2e8f0",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 12px 30px rgba(2,6,23,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: "-0.4px",
                  color: "#0f172a",
                }}
              >
                Links Dashboard
              </h1>
              <p style={{ marginTop: 6, marginBottom: 0, color: "#475569" }}>
                Search + manage all your Next.js routes in one place.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => copyText(allLinks.join("\n"))}
                style={{
                  cursor: "pointer",
                  border: "1px solid #e2e8f0",
                  background: "#0f172a",
                  color: "white",
                  borderRadius: 12,
                  padding: "10px 12px",
                  fontWeight: 800,
                }}
              >
                📋 Copy All
              </button>

              <button
                onClick={() => {
                  setQuery("");
                  setTab("all");
                }}
                style={{
                  cursor: "pointer",
                  border: "1px solid #e2e8f0",
                  background: "white",
                  color: "#0f172a",
                  borderRadius: 12,
                  padding: "10px 12px",
                  fontWeight: 800,
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
              marginTop: 16,
            }}
          >
            <StatCard title="Total Links" value={totalCount} />
            <StatCard title="Working" value={workingCount} />
            <StatCard title="Done" value={doneCount} />
            <StatCard title="Pending" value={pendingCount} />
            <StatCard title="Not Checked" value={notCheckedCount} />
            <StatCard title="Work Later" value={workLaterCount} />
            <StatCard title="Broken Links" value={brokenLinksCount} />
            <StatCard title="Data Verified" value={dataVerifiedCount} />
            <StatCard title="Image Upload" value={imageUploadCount} />
            <StatCard title="Finished" value={finishedCount} />
          </div>

          {/* Search + Tabs */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid #e2e8f0",
                  background: "white",
                  borderRadius: 14,
                  padding: "10px 12px",
                }}
              >
                <span style={{ opacity: 0.7 }}>🔍</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search route...  (ex: /admissions)"
                  style={{
                    width: "100%",
                    outline: "none",
                    border: "none",
                    fontSize: 14,
                    color: "#0f172a",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                All
              </TabButton>
              <TabButton
                active={tab === "working"}
                onClick={() => setTab("working")}
              >
                Working
              </TabButton>
              <TabButton active={tab === "done"} onClick={() => setTab("done")}>
                Done
              </TabButton>
              <TabButton
                active={tab === "pending"}
                onClick={() => setTab("pending")}
              >
                Pending
              </TabButton>
              <TabButton
                active={tab === "notChecked"}
                onClick={() => setTab("notChecked")}
              >
                Not Checked
              </TabButton>
              <TabButton
                active={tab === "workLater"}
                onClick={() => setTab("workLater")}
              >
                Work Later
              </TabButton>
              <TabButton
                active={tab === "brokenLinks"}
                onClick={() => setTab("brokenLinks")}
              >
                Broken Links
              </TabButton>
              <TabButton
                active={tab === "dataVerified"}
                onClick={() => setTab("dataVerified")}
              >
                Data Verified
              </TabButton>
              <TabButton
                active={tab === "imageUpload"}
                onClick={() => setTab("imageUpload")}
              >
                Image Upload
              </TabButton>
              <TabButton
                active={tab === "finished"}
                onClick={() => setTab("finished")}
              >
                Finished
              </TabButton>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 14,
          }}
        >
          {visibleGroups.map((group) => (
            <div
              key={group.key}
              style={{
                border: "1px solid #e2e8f0",
                background: "white",
                borderRadius: 18,
                padding: 16,
                boxShadow: "0 10px 22px rgba(2,6,23,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{group.emoji}</span>
                  <h2 style={{ margin: 0, fontSize: 16, fontWeight: 900 }}>
                    {group.title}
                  </h2>
                </div>

                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "#0f172a",
                    color: "white",
                    fontWeight: 800,
                  }}
                >
                  {group.list.length}
                </span>
              </div>

              {group.list.length === 0 ? (
                <p style={{ margin: 0, color: "#94a3b8" }}>
                  No links found in this section.
                </p>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {group.list.map((path) => (
                    <div
                      key={path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        border: "1px solid #e2e8f0",
                        borderRadius: 14,
                        padding: "10px 12px",
                      }}
                    >
                      <Link
                        href={path}
                        style={{
                          color: "#1d4ed8",
                          fontWeight: 700,
                          textDecoration: "none",
                          wordBreak: "break-word",
                        }}
                      >
                        {path}
                      </Link>

                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => copyText(path)}
                          style={{
                            cursor: "pointer",
                            border: "1px solid #e2e8f0",
                            background: "#f8fafc",
                            borderRadius: 12,
                            padding: "6px 10px",
                            fontWeight: 800,
                          }}
                          title="Copy route"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 14,
        background: "white",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, color: "#64748b", fontWeight: 800 }}>
        {title}
      </p>
      <p
        style={{
          marginTop: 6,
          marginBottom: 0,
          fontSize: 22,
          fontWeight: 950,
          color: "#0f172a",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "1px solid #e2e8f0",
        background: active ? "#0f172a" : "white",
        color: active ? "white" : "#0f172a",
        borderRadius: 12,
        padding: "10px 12px",
        fontWeight: 900,
      }}
    >
      {children}
    </button>
  );
}
