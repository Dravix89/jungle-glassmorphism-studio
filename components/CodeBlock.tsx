"use client";

import { useApp } from "./Providers";

export default function CodeBlock({ code, label = "CSS", maxH = "max-h-72" }: { code: string; label?: string; maxH?: string }) {
  const { toast } = useApp();

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      toast("Code copié dans le presse-papiers");
    } catch {
      toast("Copie impossible sur ce navigateur");
    }
  }

  return (
    <div className="rounded-2xl bg-black/45 border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-[10px] font-semibold tracking-[0.18em] text-lime-300 uppercase">{label}</span>
        <button type="button" onClick={copy} className="text-xs font-medium text-white/80 hover:text-lime-300 cursor-pointer">
          Copier
        </button>
      </div>
      <pre className={`font-mono-code text-[11.5px] leading-relaxed text-white/85 p-4 overflow-auto ${maxH}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
