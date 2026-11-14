import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = { title: "Galerie" };

export default function GaleriePage() {
  return (
    <section className="max-w-7xl mx-auto">
      <PageHeader
        pill="Collection visuelle"
        title="Galerie Botanique"
        text="Photographies immersives sélectionnées pour sublimer la transparence du verre dépoli."
      />
      <GalleryGrid />
    </section>
  );
}
