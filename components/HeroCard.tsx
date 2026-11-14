"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "./Providers";
import { scenes, unsplash, type Scene } from "@/lib/images";

const PATH =
  "M 92.795 0 L 656 0 A 24 24 0 0 1 680 24 L 680 316 A 24 24 0 0 1 656 340 L 24 340 A 24 24 0 0 1 0 316 L 0 92.795 A 12 12 0 0 1 15.75 81.396 A 52 52 0 0 0 81.396 15.75 A 12 12 0 0 1 92.795 0 Z";

export default function HeroCard({
  scene: baseScene,
  primary = false,
}: {
  scene: Scene;
  primary?: boolean;
}) {
  const { toast, setScene } = useApp();
  const [pick, setPick] = useState(() =>
    Math.max(
      0,
      scenes.findIndex((s) => s.num === baseScene.num),
    ),
  );
  const scene = scenes[pick];
  const [micMuted, setMicMuted] = useState(true);
  const [active, setActive] = useState(true);
  const Title = primary ? "h1" : "h2";
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 680);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="scene-wrapper"
      style={{ "--s": scale } as React.CSSProperties}
    >
      <div className="card-stage select-none">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${unsplash(scene.image, 1200)})`,
          }}
        />

        <div className="floating-badge" title="Thème actif">
          <span className="text-[9.5px] font-semibold tracking-[0.22em] text-lime-300 uppercase mb-0.5">
            {scene.num}
          </span>
          <span className="text-[13.5px] font-bold tracking-[0.14em] text-white uppercase leading-none">
            {scene.badge}
          </span>
          <span className="mt-1.5 w-4 h-[2px] rounded-full bg-lime-400/90 shadow-[0_0_8px_rgba(163,230,53,0.85)]" />
        </div>

        <div className="glass-panel-cutout" aria-label={scene.title}>
          <div className="card-inner-content">
            <div className="flex items-center justify-between pl-[82px]">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15">
                <span
                  className={`w-2 h-2 rounded-full ${active ? "lime-dot" : "bg-white/35"}`}
                />
                <span className="text-[11px] font-semibold tracking-[0.1em] text-white/90 uppercase">
                  Mode Ambiance
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Activer ou couper le micro"
                  onClick={() => {
                    setMicMuted((m) => !m);
                    toast(micMuted ? "Microphone activé" : "Microphone coupé");
                  }}
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.16] text-white/90 cursor-pointer"
                >
                  {micMuted ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="2" y1="2" x2="22" y2="22" />
                      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
                      <path d="M5 10v2a7 7 0 0 0 12 5" />
                      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-lime-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                  )}
                </button>

                {scenes.map((s, i) => (
                  <button
                    key={s.num}
                    type="button"
                    aria-label={s.title}
                    title={s.title}
                    onClick={() => {
                      setPick(i);
                      setScene(i);
                      toast(s.title);
                    }}
                    className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border text-[12px] font-bold cursor-pointer ${
                      scene.num === s.num
                        ? "bg-lime-400 text-black border-lime-400"
                        : "bg-white/[0.08] hover:bg-white/[0.16] border-white/[0.16] text-white/90"
                    }`}
                  >
                    {s.num}
                  </button>
                ))}

                <button
                  type="button"
                  aria-label="Changer d'ambiance"
                  title="Changer d'ambiance botanique"
                  onClick={() => {
                    const n = (pick + 1) % scenes.length;
                    setPick(n);
                    setScene(n);
                    toast("Ambiance mise à jour");
                  }}
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.16] text-white/90 cursor-pointer"
                >
                  <svg
                    className="w-[15px] h-[15px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-2">
              <Title className="text-[32px] font-bold tracking-[-0.02em] text-white leading-tight">
                {scene.title}
              </Title>
              <p className="mt-2.5 text-[15px] font-normal text-white/75 leading-[1.55] max-w-[530px]">
                {scene.desc}
              </p>
            </div>

            <div>
              <div className="mb-5 h-px w-full bg-white/[0.12]" />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActive((a) => !a)}
                  className="inline-flex items-center gap-2.5 cursor-pointer group focus:outline-none"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${active ? "lime-dot" : "bg-white/35"}`}
                  />
                  <span className="text-[14px] font-medium text-white/90 group-hover:text-white">
                    {active ? "Actif en arrière-plan" : "En pause"}
                  </span>
                </button>

                <div className="flex items-center gap-5">
                  <Link
                    href="/galerie"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/75 hover:text-white"
                  >
                    <span>Explorer</span>
                    <svg
                      className="w-3.5 h-3.5 text-lime-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="7" x2="17" y2="17" />
                      <polyline points="17 7 17 17 7 17" />
                    </svg>
                  </Link>
                  <Link
                    href="/laboratoire"
                    className="px-5 py-2 rounded-[13px] text-[13.5px] font-semibold text-white bg-white/10 hover:bg-white/[0.18] border border-white/20"
                  >
                    Configurer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="card-outline-svg"
          viewBox="0 0 680 340"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={PATH}
            style={{ stroke: "var(--glass-border)" }}
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </div>
  );
}
