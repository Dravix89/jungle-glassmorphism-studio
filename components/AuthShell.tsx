import JungleImg from "./JungleImg";
import { IMG } from "@/lib/images";

export default function AuthShell({
  pill,
  title,
  text,
  image = IMG.login,
  children,
}: {
  pill: string;
  title: string;
  text: string;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="glass-surface rounded-[32px] p-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="relative hidden lg:block rounded-[24px] overflow-hidden min-h-[520px]">
          <JungleImg id={image} alt="Jungle" w={1200} sizes="50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute bottom-4 inset-x-4 glass-surface rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full lime-dot" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-lime-300">
                Jungle
              </span>
            </div>
            <p className="text-sm text-white/85 leading-relaxed">
              Votre espace pour sauvegarder vos réglages de verre et explorer
              toutes les techniques.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full lime-dot" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-lime-300">
              {pill}
            </span>
          </div>
          <h1 className="font-bold text-3xl text-white mb-2">{title}</h1>
          <p className="text-white/70 text-sm mb-7">{text}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
