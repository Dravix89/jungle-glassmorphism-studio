import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto glass-surface rounded-[28px] p-10 text-center">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-lime-300 uppercase">Erreur 404</span>
      <h1 className="mt-3 font-bold text-3xl">Vous vous êtes perdu dans la jungle</h1>
      <p className="mt-3 text-white/70 text-sm">Cette page n'existe pas ou a été déplacée.</p>
      <Link href="/" className="inline-block mt-6 px-6 py-3 rounded-[14px] text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300">
        Retour à l'accueil
      </Link>
    </section>
  );
}
