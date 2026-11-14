"use client";

import { useEffect, useState } from "react";
import JungleImg from "./JungleImg";
import CodeBlock from "./CodeBlock";
import type { Technique } from "@/lib/techniques";

export default function TechniqueCard({
  t,
  index,
}: {
  t: Technique;
  index: number;
}) {
  const [showCode, setShowCode] = useState(false);
  const [liquid, setLiquid] = useState(false);

  useEffect(() => {
    if (!t.chromiumOnly) return;
    const ua = navigator.userAgent;
    setLiquid(/Chrome|Chromium|Edg/.test(ua) && !/Firefox/.test(ua));
  }, [t.chromiumOnly]);

  const sample = (
    <div className="p-5 pl-8 pt-8">
      <p className="text-[10px] tracking-[0.2em] uppercase text-lime-300 font-semibold">
        {t.tag}
      </p>
      <h4 className="mt-1 font-bold text-lg leading-tight">{t.name}</h4>
      <p className="mt-1.5 text-xs text-white/75">
        Le décor reste lisible derrière la vitre.
      </p>
    </div>
  );

  return (
    <article
      id={t.id}
      className="glass-surface rounded-[26px] p-3 scroll-mt-32"
    >
      <div className="relative h-72 rounded-[20px] overflow-hidden">
        <JungleImg
          id={t.image}
          alt={`Décor pour ${t.name}`}
          priority={index < 3}
        />
        <div className="absolute inset-0 grid place-items-center p-5">
          {t.layout === "stack" ? (
            <div className="relative w-full h-full">
              <div className="tech-stack-back absolute left-0 top-4 w-[70%] h-[70%]" />
              <div className="tech-stack-front absolute right-0 bottom-2 w-[72%] h-[72%]">
                {sample}
              </div>
            </div>
          ) : (
            <div
              className={`tech ${t.className} ${t.chromiumOnly && liquid ? "is-svg" : ""} w-[82%]`}
            >
              {sample}
            </div>
          )}
        </div>
        <div className="absolute top-3.5 left-3.5 glass-pill px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full lime-dot" />
          <span className="text-[11px] font-bold tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-lg">{t.name}</h3>
          {t.chromiumOnly && (
            <span className="text-[10px] font-semibold tracking-wider uppercase text-lime-300 bg-lime-400/10 border border-lime-400/30 px-2.5 py-1 rounded-full">
              {liquid ? "Actif" : "Repli : flou simple"}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">{t.desc}</p>
        <button
          type="button"
          onClick={() => setShowCode((s) => !s)}
          className="mt-4 text-xs font-semibold text-lime-300 hover:underline cursor-pointer"
        >
          {showCode ? "Masquer le CSS" : "Voir le CSS"}
        </button>
        {showCode && (
          <div className="mt-3">
            <CodeBlock code={t.css} />
          </div>
        )}
      </div>
    </article>
  );
}
