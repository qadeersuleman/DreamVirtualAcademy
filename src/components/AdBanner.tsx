"use client";

import React, { useEffect, useSyncExternalStore } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const emptySubscribe = () => () => {};

export default function AdBanner({
  slot = "1234567890",
  format = "auto",
  responsive = true,
  style,
  className,
}: AdBannerProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!isDev) {
      try {
        // @ts-expect-error Google adsbygoogle window global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn("AdSense push error:", err);
      }
    }
  }, [isDev]);

  if (!isClient) return null;

  // Development / Localhost Mock Preview
  if (isDev) {
    return (
      <aside
        aria-label="Advertisement Preview"
        className={className}
        style={{
          margin: "2rem auto",
          maxWidth: "100%",
          width: "100%",
          background: "linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95))",
          border: "1px dashed #cbd5e1",
          borderRadius: "12px",
          padding: "1rem",
          textAlign: "center",
          color: "#64748b",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          ...style,
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "0.35rem" }}>
          <span>ADVERTISEMENT</span>
          <span>•</span>
          <span style={{ color: "#f59e0b" }}>GOOGLE ADSENSE PREVIEW (DEV MODE)</span>
        </div>
        <div
          style={{
            minHeight: "90px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            padding: "0.75rem",
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, color: "#334155", fontSize: "0.9rem" }}>
            Dreams Virtual Academy — Google AdSense Slot
          </p>
          <span style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
            Publisher: ca-pub-9494184033509881 | Slot ID: {slot} | Format: {format}
          </span>
        </div>
      </aside>
    );
  }

  // Live Production AdSense Unit
  return (
    <aside
      aria-label="Advertisement"
      className={className}
      style={{
        margin: "2rem auto",
        textAlign: "center",
        overflow: "hidden",
        minHeight: "90px",
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9494184033509881"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  );
}

