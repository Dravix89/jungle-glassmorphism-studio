"use client";

import { useCallback, useEffect, useState } from "react";
import JungleImg from "./JungleImg";
import { gallery } from "@/lib/images";
import { createPortal } from "react-dom";

const cats = [
  "Tout",
  "Canopée",
  "Feuillage",
  "Sous-Bois",
  "Architecture",
  "Brume",
];

export default function GalleryGrid() {
  const [cat, setCat] = useState("Tout");
  const [open, setOpen] = useState<number | null>(null);
  const items = gallery.filter((g) => cat === "Tout" || g.cat === cat);

  const move = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, move]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border ${
              cat === c
                ? "bg-lime-400 text-black border-lime-300"
                : "glass-pill text-white/80 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((g, i) => {
          const shape = ["galet", "dossier", "arche"][
            Math.min(2, Math.floor((parseInt(g.id, 10) - 1) / 3))
          ];
          return (
            <article
              key={g.id}
              onClick={() => setOpen(i)}
              className={`gcard gcard-${shape} cursor-pointer glass-surface p-3 hover:border-white/40`}
            >
              <div className="gcard-media relative h-72 overflow-hidden">
                <JungleImg id={g.image} alt={g.title} priority={i < 3} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="gcard-glass" />
                <div className="gcard-badge z-10 absolute top-3.5 left-3.5 glass-pill px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full lime-dot" />
                  <span className="text-[11px] font-bold tracking-widest text-white">
                    {g.id}
                  </span>
                </div>
                <div className="gcard-bar z-10 absolute bottom-3.5 inset-x-3.5 glass-surface rounded-2xl p-3.5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {g.title}
                    </h3>
                    <p className="text-xs text-white/65">{g.cat}</p>
                  </div>
                  <span className="text-xs font-medium text-lime-300">
                    <span className="gcard-hint-a">Survoler ↗</span>
                    <span className="gcard-hint-b">Aperçu</span>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {current &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-8 pt-32 sm:pt-36 pb-6 sm:pb-8 bg-black/85 backdrop-blur-lg"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="glass-surface rounded-[28px] max-w-4xl w-full p-3 sm:p-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setOpen(null)}
                className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full glass-surface flex items-center justify-center text-white cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="relative w-full h-[50vh] sm:h-[58vh] rounded-[20px] overflow-hidden">
                <JungleImg
                  id={current.image}
                  alt={current.title}
                  w={1600}
                  sizes="(min-width: 1024px) 896px, 100vw"
                  priority
                />
              </div>
              <div className="pt-4 px-2 pb-1 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg text-white">
                    {current.title}
                  </h4>
                  <p className="text-xs text-white/70">{current.sub}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Précédente"
                    onClick={() => move(-1)}
                    className="w-9 h-9 rounded-full glass-pill hover:bg-white/[0.16] cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Suivante"
                    onClick={() => move(1)}
                    className="w-9 h-9 rounded-full glass-pill hover:bg-white/[0.16] cursor-pointer"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
