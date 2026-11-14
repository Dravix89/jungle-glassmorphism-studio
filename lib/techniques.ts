import { IMG } from "./images";

export type Technique = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  className: string;
  image: string;
  layout?: "single" | "stack";
  chromiumOnly?: boolean;
  css: string;
};

export const techniques: Technique[] = [
  {
    id: "classique",
    name: "Verre Classique",
    tag: "Base",
    desc: "La recette de départ : fond blanc très transparent, flou d'arrière-plan et bordure fine claire.",
    className: "tech-classic",
    image: IMG.g1,
    css: `.glass-classic {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}`,
  },
  {
    id: "frosted",
    name: "Verre Dépoli (Frosted)",
    tag: "Flou fort",
    desc: "Flou élevé combiné à une saturation boostée : les couleurs derrière la vitre restent riches malgré la diffusion.",
    className: "tech-frosted",
    image: IMG.g2,
    css: `.glass-frosted {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}`,
  },
  {
    id: "sombre",
    name: "Verre Sombre Jungle",
    tag: "Signature",
    desc: "Le style du site : dégradé vert profond à opacité progressive, ombre longue et reflet haut intérieur.",
    className: "tech-dark",
    image: IMG.g3,
    css: `.glass-dark {
  background: linear-gradient(
    135deg,
    rgba(34, 49, 37, 0.6) 0%,
    rgba(24, 36, 27, 0.64) 55%,
    rgba(17, 26, 19, 0.72) 100%
  );
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 24px;
  box-shadow:
    0 24px 48px -12px rgba(0, 0, 0, 0.62),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}`,
  },
  {
    id: "teinte",
    name: "Verre Teinté Lime",
    tag: "Couleur",
    desc: "Un dégradé coloré translucide et une lueur portée de la même teinte pour un effet néon organique.",
    className: "tech-tint",
    image: IMG.g4,
    css: `.glass-tint {
  background: linear-gradient(
    135deg,
    rgba(163, 230, 53, 0.28),
    rgba(16, 185, 129, 0.08)
  );
  backdrop-filter: blur(20px) saturate(130%);
  -webkit-backdrop-filter: blur(20px) saturate(130%);
  border: 1px solid rgba(190, 242, 100, 0.4);
  border-radius: 24px;
  box-shadow: 0 12px 40px -8px rgba(132, 204, 22, 0.35);
}`,
  },
  {
    id: "speculaire",
    name: "Bordure Spéculaire",
    tag: "Bordure",
    desc: "Bordure en dégradé qui simule la lumière accrochant les angles du verre, réalisée avec un masque CSS.",
    className: "tech-specular",
    image: IMG.g5,
    css: `.glass-specular {
  position: relative;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 24px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.55);
}
.glass-specular::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75),
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(163, 230, 53, 0.6)
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}`,
  },
  {
    id: "grain",
    name: "Grain (Noise)",
    tag: "Texture",
    desc: "Un bruit fractal SVG superposé en mode overlay donne au verre une vraie matière, proche du verre sablé.",
    className: "tech-grain",
    image: IMG.g6,
    css: `.glass-grain {
  position: relative;
  overflow: hidden;
  background: rgba(20, 32, 24, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
}
.glass-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0.35;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}`,
  },
  {
    id: "lueur",
    name: "Lueur Interne (Inset)",
    tag: "Volume",
    desc: "Plusieurs ombres internes (reflet haut, remontée basse, halo coloré) donnent de l'épaisseur au panneau.",
    className: "tech-inner",
    image: IMG.g7,
    css: `.glass-inner {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -24px 40px rgba(255, 255, 255, 0.05),
    inset 0 0 30px rgba(163, 230, 53, 0.12),
    0 16px 32px -8px rgba(0, 0, 0, 0.5);
}`,
  },
  {
    id: "decoupe",
    name: "Découpe Géométrique",
    tag: "Forme",
    desc: "Un masque radial retire une encoche dans l'angle : parfait pour loger un badge flottant, comme sur l'accueil.",
    className: "tech-notch",
    image: IMG.g8,
    css: `.glass-notch {
  background: linear-gradient(
    135deg,
    rgba(34, 49, 37, 0.6),
    rgba(17, 26, 19, 0.72)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
   -webkit-mask: radial-gradient(circle 30px at 0 0, transparent 29px, #000 30px);
  mask: radial-gradient(circle 30px at 0 0, transparent 29px, #000 30px);
}`,
  },
  {
    id: "empile",
    name: "Verres Empilés (Layers)",
    tag: "Profondeur",
    desc: "Deux vitres frères qui se chevauchent avec des flous différents : l'avant-plan floute l'arrière-plan, qui floute l'image.",
    className: "tech-stack",
    image: IMG.g9,
    layout: "stack",
    css: `.glass-back {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
}
.glass-front {
  background: rgba(20, 34, 24, 0.5);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 20px;
  box-shadow: 0 24px 40px -10px rgba(0, 0, 0, 0.6);
}
/* Les deux éléments sont frères et se chevauchent */`,
  },
  {
    id: "liquide",
    name: "Liquid Glass (SVG)",
    tag: "Avancé",
    desc: "Un filtre SVG de déplacement tord ce qui se trouve derrière la vitre, comme une lentille liquide.",
    className: "tech-liquid",
    image: IMG.g10,
    chromiumOnly: true,
    css: `<svg width="0" height="0" style="position:absolute">
  <filter id="liquid-glass" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02"
      numOctaves="2" seed="3" result="noise" />
    <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
    <feDisplacementMap in="SourceGraphic" in2="soft" scale="60"
      xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>

.glass-liquid {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: url(#liquid-glass) blur(2px); /* Chromium */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.18),
    0 20px 40px -10px rgba(0, 0, 0, 0.45);
}`,
  },
];
