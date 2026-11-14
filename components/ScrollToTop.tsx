"use client";

import { useEffect, useState } from "react";

const R = 22;
const C = 2 * Math.PI * R;

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Remonter en haut de la page"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 w-[52px] h-[52px] rounded-full glass-surface cursor-pointer
        flex items-center justify-center group transition-all duration-500
        hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(163,230,53,0.35)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden
      >
        <circle
          cx="26"
          cy="26"
          r={R}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
        <circle
          cx="26"
          cy="26"
          r={R}
          stroke="#a3e635"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ filter: "drop-shadow(0 0 4px rgba(163,230,53,0.8))" }}
        />
      </svg>
      <svg
        className="w-4 h-4 text-white group-hover:text-lime-300 transition-colors"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
