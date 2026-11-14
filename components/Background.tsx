"use client";

import { useApp } from "./Providers";
import { scenes, unsplash } from "@/lib/images";

export default function Background() {
  const { sceneIndex } = useApp();
  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0 bg-[#0c160f]" />
      {scenes.map((s, i) => (
        <div
          key={s.num}
          aria-hidden
          className="tropical-layer"
          style={{ backgroundImage: `url("${unsplash(s.image, 2000, 85)}")`, opacity: i === sceneIndex ? 1 : 0 }}
        />
      ))}
      <div aria-hidden className="tropical-overlay" />
    </>
  );
}
