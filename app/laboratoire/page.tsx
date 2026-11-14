import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Lab from "@/components/Lab";

export const metadata: Metadata = { title: "Laboratoire" };

export default function LaboratoirePage() {
  return (
    <section className="max-w-7xl mx-auto">
      <PageHeader
        pill="Laboratoire"
        title="Calibration Optique"
        text="Modifiez le flou, la densité, la bordure, la saturation et la teinte : tout le site réagit en temps réel."
      />
      <Lab />
    </section>
  );
}
