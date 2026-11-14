export type TintKey = "forest" | "night" | "emerald" | "moss";

export const TINTS: Record<
  TintKey,
  { label: string; c: [string, string, string]; swatch: string }
> = {
  forest: {
    label: "Forêt",
    c: ["34, 49, 37", "24, 36, 27", "17, 26, 19"],
    swatch: "#223125",
  },
  night: {
    label: "Nuit",
    c: ["28, 34, 46", "18, 23, 33", "11, 14, 22"],
    swatch: "#1c222e",
  },
  emerald: {
    label: "Émeraude",
    c: ["18, 84, 60", "12, 62, 44", "8, 42, 30"],
    swatch: "#12543c",
  },
  moss: {
    label: "Mousse",
    c: ["72, 96, 28", "50, 70, 20", "30, 44, 12"],
    swatch: "#48601c",
  },
};

export type Glass = {
  blur: number;
  density: number;
  border: number;
  saturate: number;
  tint: TintKey;
};

export const DEFAULT_GLASS: Glass = {
  blur: 22,
  density: 64,
  border: 28,
  saturate: 100,
  tint: "forest",
};

export const PRESETS: {
  key: string;
  label: string;
  glass: Glass;
  radius: number;
}[] = [
  { key: "defaut", label: "Défaut", glass: DEFAULT_GLASS, radius: 28 },
  {
    key: "givre",
    label: "Givré",
    glass: { blur: 30, density: 20, border: 50, saturate: 140, tint: "forest" },
    radius: 28,
  },
  {
    key: "liquide",
    label: "Liquide",
    glass: { blur: 3, density: 12, border: 60, saturate: 160, tint: "forest" },
    radius: 40,
  },
  {
    key: "sombre",
    label: "Sombre",
    glass: { blur: 24, density: 88, border: 14, saturate: 100, tint: "night" },
    radius: 20,
  },
];

export type Shape = "rect" | "galet" | "encoche" | "arche";

export const SHAPES: { key: Shape; label: string }[] = [
  { key: "rect", label: "Rectangle" },
  { key: "galet", label: "Galet" },
  { key: "encoche", label: "Encoche" },
  { key: "arche", label: "Arche" },
];

export function shapeCss(shape: Shape, r: number) {
  switch (shape) {
    case "galet":
      return `  border-radius: ${Math.round(r * 0.4)}px ${r * 3}px ${r}px ${r * 2}px;`;
    case "encoche":
      return `  border-radius: ${r}px;
  -webkit-mask: radial-gradient(circle 30px at 0 0, transparent 29px, #000 30px);
  mask: radial-gradient(circle 30px at 0 0, transparent 29px, #000 30px);`;
    case "arche":
      return `  border-radius: 160px 160px ${r}px ${r}px;`;
    default:
      return `  border-radius: ${r}px;`;
  }
}

export function deriveGlass(g: Glass) {
  const mid = g.density / 100;
  const top = Math.max(0.2, (g.density - 4) / 100);
  const bot = Math.min(0.95, (g.density + 8) / 100);
  return { top, mid, bot, c: TINTS[g.tint].c, border: g.border / 100 };
}

export function glassToCss(g: Glass, radius: number, shape: Shape = "rect") {
  const d = deriveGlass(g);
  const f = (n: number) => n.toFixed(2);
  return `.glass {
  background: linear-gradient(
    135deg,
    rgba(${d.c[0]}, ${f(d.top)}) 0%,
    rgba(${d.c[1]}, ${f(d.mid)}) 55%,
    rgba(${d.c[2]}, ${f(d.bot)}) 100%
  );
  backdrop-filter: blur(${g.blur}px) saturate(${g.saturate}%);
  -webkit-backdrop-filter: blur(${g.blur}px) saturate(${g.saturate}%);
  border: 1px solid rgba(255, 255, 255, ${f(d.border)});
${shapeCss(shape, radius)}
  box-shadow:
    0 24px 48px -12px rgba(0, 0, 0, 0.62),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}`;
}
