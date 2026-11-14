import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="glass-surface rounded-[28px] p-6 sm:p-12">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full lime-dot" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90">
              Contact
            </span>
          </div>
          <h1 className="font-bold text-3xl sm:text-4xl mb-3">
            Démarrer Une Collaboration
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            Écrivez à l'équipe pour concevoir votre prochaine interface
            immersive.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
