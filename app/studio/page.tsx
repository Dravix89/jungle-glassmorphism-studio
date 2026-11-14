import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TechniqueCard from "@/components/TechniqueCard";
import { techniques } from "@/lib/techniques";

export const metadata: Metadata = { title: "Studio" };

const props = [
  [
    "backdrop-filter: blur()",
    "Diffuse l'arrière-plan : c'est le cœur de l'effet.",
  ],
  ["saturate()", "Réintroduit de la couleur perdue par le flou."],
  ["background: rgba()", "Fond translucide qui teinte le verre."],
  ["border + inset shadow", "Arêtes et reflets internes pour l'épaisseur."],
  ["mask / clip-path", "Découpes et formes non rectangulaires."],
  ["mix-blend-mode + SVG", "Grain, bruit et filtres de déplacement."],
];

export default function StudioPage() {
  return (
    <section className="max-w-7xl mx-auto space-y-16">
      <div>
        <PageHeader
          pill="Studio"
          title="Dix Techniques De Glassmorphism"
          text="Chaque démonstration est vivante, posée sur une photo de jungle. Ouvrez le CSS pour le copier dans vos projets."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {techniques.map((t, i) => (
            <TechniqueCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>

      <div className="glass-surface rounded-[28px] p-6 sm:p-10">
        <h2 className="font-bold text-2xl sm:text-3xl mb-6">
          Aide-Mémoire Des Propriétés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {props.map(([k, v]) => (
            <div key={k} className="glass-pill rounded-2xl p-4">
              <code className="font-mono-code text-xs text-lime-300">{k}</code>
              <p className="mt-2 text-xs text-white/70 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filtre SVG utilisé par la technique Liquid glass (Chromium) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="liquid-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </section>
  );
}
