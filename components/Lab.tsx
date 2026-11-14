"use client";

import { useState, type CSSProperties } from "react";
import { useApp } from "./Providers";
import JungleImg from "./JungleImg";
import CodeBlock from "./CodeBlock";
import { IMG } from "@/lib/images";
import {
  TINTS,
  TintKey,
  PRESETS,
  SHAPES,
  Shape,
  glassToCss,
} from "@/lib/glass";

function Slider({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="glass-pill rounded-2xl p-4">
      <div className="flex justify-between text-xs font-medium mb-3">
        <span className="text-white/85">{label}</span>
        <span className="text-lime-300 font-mono-code">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  );
}

function Pills({
  label,
  items,
  value,
  onPick,
}: {
  label: string;
  items: { key: string; label: string }[];
  value: string;
  onPick: (k: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-3 pb-3">
      <span className="w-full sm:w-24 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55">
        {label}
      </span>
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => onPick(it.key)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border ${
            value === it.key
              ? "bg-lime-400 text-black border-lime-300"
              : "glass-pill text-white/80 hover:text-white"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

const bgs = [
  { id: IMG.bg1, label: "Jungle" },
  { id: IMG.bg2, label: "Dorée" },
  { id: IMG.bg3, label: "Automnale" },
];

const NOTCH =
  "radial-gradient(circle 30px at 0 0, transparent 29px, #000 30px)";

function shapeStyle(shape: Shape, r: number): CSSProperties {
  switch (shape) {
    case "galet":
      return {
        borderRadius: `${Math.round(r * 0.4)}px ${r * 3}px ${r}px ${r * 2}px`,
      };
    case "encoche":
      return { borderRadius: r, WebkitMask: NOTCH, mask: NOTCH };
    case "arche":
      return { borderRadius: `160px 160px ${r}px ${r}px` };
    default:
      return { borderRadius: r };
  }
}

export default function Lab() {
  const { glass, setGlass, resetGlass, toast } = useApp();
  const [radius, setRadius] = useState(28);
  const [bg, setBg] = useState(0);
  const [shape, setShape] = useState<Shape>("rect");
  const [view, setView] = useState("carte");
  const [after, setAfter] = useState(true);

  const activePreset = PRESETS.find(
    (p) =>
      p.radius === radius &&
      p.glass.blur === glass.blur &&
      p.glass.density === glass.density &&
      p.glass.border === glass.border &&
      p.glass.saturate === glass.saturate &&
      p.glass.tint === glass.tint,
  )?.key;

  const fade: CSSProperties = {
    opacity: after ? 1 : 0,
    transition: "opacity 0.5s ease",
  };

  const pad =
    shape === "encoche"
      ? "pl-10 pt-10 pr-6 pb-6"
      : shape === "arche"
        ? "pt-14 px-12 pb-6 text-center"
        : "p-6";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5 glass-surface rounded-[28px] p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl">Réglages</h2>
          <span className="text-[11px] font-mono-code text-lime-300 bg-lime-400/10 border border-lime-400/30 px-2.5 py-1 rounded-full">
            TEMPS RÉEL
          </span>
        </div>

        <div className="glass-pill rounded-2xl p-4 mb-4">
          <p className="text-xs font-medium text-white/85 mb-3">Préréglages</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setGlass(p.glass);
                  setRadius(p.radius);
                  toast(`Préréglage ${p.label}`);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border ${
                  activePreset === p.key
                    ? "bg-lime-400 text-black border-lime-300"
                    : "border-white/15 text-white/80 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Slider
            label="Flou d'arrière-plan (blur)"
            value={glass.blur}
            unit="px"
            min={0}
            max={60}
            onChange={(v) => setGlass({ blur: v })}
          />
          <Slider
            label="Densité du verre"
            value={glass.density}
            unit="%"
            min={10}
            max={92}
            onChange={(v) => setGlass({ density: v })}
          />
          <Slider
            label="Luminosité des bordures"
            value={glass.border}
            unit="%"
            min={0}
            max={80}
            onChange={(v) => setGlass({ border: v })}
          />
          <Slider
            label="Saturation"
            value={glass.saturate}
            unit="%"
            min={100}
            max={250}
            onChange={(v) => setGlass({ saturate: v })}
          />
          <Slider
            label="Arrondi (aperçu)"
            value={radius}
            unit="px"
            min={0}
            max={48}
            onChange={setRadius}
          />

          <div className="glass-pill rounded-2xl p-4">
            <p className="text-xs font-medium text-white/85 mb-3">
              Teinte du verre
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TINTS) as TintKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setGlass({ tint: k })}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border ${
                    glass.tint === k
                      ? "border-lime-400 text-white bg-white/10"
                      : "border-white/15 text-white/75 hover:text-white"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ background: TINTS[k].swatch }}
                  />
                  {TINTS[k].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/65">
          <span>Paramètres actifs sur tout le site</span>
          <button
            type="button"
            onClick={() => {
              resetGlass();
              setRadius(28);
              setShape("rect");
              toast("Paramètres optiques réinitialisés");
            }}
            className="text-lime-300 hover:underline font-medium cursor-pointer"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="glass-surface rounded-[28px] p-3">
          <div className="relative h-[24rem] sm:h-[26rem] rounded-[22px] overflow-hidden">
            <JungleImg
              key={bgs[bg].id}
              id={bgs[bg].id}
              alt={`Aperçu ${bgs[bg].label}`}
              w={1400}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-0 grid place-items-center p-6">
              {view === "carte" && (
                <div
                  className={`glass-surface w-full max-w-sm ${pad}`}
                  style={{ ...shapeStyle(shape, radius), ...fade }}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      shape === "arche" ? "justify-center" : ""
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full lime-dot" />
                    <span className="text-[11px] tracking-[0.18em] uppercase text-lime-300 font-semibold">
                      Aperçu
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold text-xl">Verre Calibré</h3>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Ajustez les curseurs : ce panneau et tout le site utilisent
                    les mêmes valeurs.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <span className="px-4 py-2 rounded-xl text-xs font-semibold text-center text-black bg-lime-400">
                      Action
                    </span>
                    <span className="px-4 py-2 rounded-xl text-xs font-semibold text-center bg-white/10 border border-white/20">
                      Secondaire
                    </span>
                  </div>
                </div>
              )}

              {view === "notif" && (
                <div
                  className="glass-surface w-full max-w-sm p-4 flex items-center gap-3"
                  style={{ borderRadius: radius, ...fade }}
                >
                  <span className="w-10 h-10 shrink-0 rounded-full glass-pill flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full lime-dot" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">Palette enregistrée</p>
                    <p className="text-xs text-white/70">Il y a 2 secondes</p>
                  </div>
                  <span className="text-xs font-semibold text-lime-300">
                    Voir
                  </span>
                </div>
              )}

              {view === "bouton" && (
                <span
                  className="glass-surface px-8 py-3.5 text-sm font-semibold rounded-full"
                  style={fade}
                >
                  Se connecter
                </span>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Pills
              label="Fond"
              items={bgs.map((b, i) => ({ key: String(i), label: b.label }))}
              value={String(bg)}
              onPick={(k) => setBg(Number(k))}
            />
            <Pills
              label="Aperçu"
              items={[
                { key: "carte", label: "Carte" },
                { key: "notif", label: "Notification" },
                { key: "bouton", label: "Bouton" },
              ]}
              value={view}
              onPick={setView}
            />
            {view === "carte" && (
              <Pills
                label="Forme"
                items={SHAPES}
                value={shape}
                onPick={(k) => setShape(k as Shape)}
              />
            )}
            <Pills
              label="Rendu"
              items={[
                { key: "avant", label: "Avant (sans verre)" },
                { key: "apres", label: "Après (avec verre)" },
              ]}
              value={after ? "apres" : "avant"}
              onPick={(k) => setAfter(k === "apres")}
            />
          </div>
        </div>

        <CodeBlock
          code={glassToCss(glass, radius, shape)}
          label="CSS généré"
          maxH="max-h-80"
        />
      </div>
    </div>
  );
}
