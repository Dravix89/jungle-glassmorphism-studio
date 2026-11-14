"use client";

import HeroCard from "./HeroCard";
import { useApp } from "./Providers";
import { scenes } from "@/lib/images";

export default function HeroCards() {
  const { sceneIndex } = useApp();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 justify-items-center w-full">
      <HeroCard scene={scenes[sceneIndex]} primary />
      <HeroCard scene={scenes[(sceneIndex + 1) % scenes.length]} />
    </div>
  );
}
