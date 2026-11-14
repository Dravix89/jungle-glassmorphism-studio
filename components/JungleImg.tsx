"use client";

import Image from "next/image";
import { useState } from "react";
import { unsplash } from "@/lib/images";

export default function JungleImg({
  id,
  alt,
  w = 900,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  className = "",
}: {
  id: string;
  alt: string;
  w?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={alt} className={`absolute inset-0 bg-gradient-to-br from-emerald-950 via-green-900 to-lime-900 ${className}`} />;
  }
  return (
    <Image
      src={unsplash(id, w)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
