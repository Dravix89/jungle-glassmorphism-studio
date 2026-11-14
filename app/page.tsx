import Link from "next/link";
import HeroCards from "@/components/HeroCards";
import JungleImg from "@/components/JungleImg";
import { IMG } from "@/lib/images";

const features = [
  {
    href: "/studio",
    tag: "10 techniques",
    title: "Studio",
    text: "Chaque recette de verre, son rendu en direct et son code CSS prêt à copier.",
    image: IMG.home1,
  },
  {
    href: "/laboratoire",
    tag: "Temps réel",
    title: "Laboratoire",
    text: "Flou, densité, bordure, saturation et teinte : le site entier réagit à vos réglages.",
    image: IMG.home2,
  },
  {
    href: "/galerie",
    tag: "9 photographies",
    title: "Galerie",
    text: "Des images de jungle qui donnent du relief au verre dépoli.",
    image: IMG.home3,
  },
];

const pillars = [
  {
    n: "01",
    t: "backdrop-filter",
    d: "Floute et transforme ce qui se trouve derrière l'élément.",
  },
  {
    n: "02",
    t: "Fond translucide",
    d: "Un rgba léger qui laisse passer la couleur du décor.",
  },
  {
    n: "03",
    t: "Bordure lumineuse",
    d: "Un filet clair qui simule l'arête du verre.",
  },
  {
    n: "04",
    t: "Ombre et reflet",
    d: "Ombre portée longue et reflet interne pour le volume.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-28 sm:space-y-36">
      <section className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <HeroCards />
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="glass-surface rounded-[26px] p-3 hover:border-white/40 transition-colors"
            >
              <div className="relative h-72 rounded-[20px] overflow-hidden">
                <JungleImg id={f.image} alt={f.title} priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute top-3.5 left-3.5 glass-pill px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full lime-dot" />
                  <span className="text-[11px] font-bold tracking-widest text-white uppercase">
                    {f.tag}
                  </span>
                </div>
                <div className="absolute bottom-3.5 inset-x-3.5 glass-surface rounded-2xl p-4">
                  <h3 className="font-semibold text-white text-lg">
                    {f.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="glass-surface rounded-[28px] p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full lime-dot" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90">
                Les fondamentaux
              </span>
            </div>
            <h2 className="font-bold text-2xl sm:text-4xl leading-tight">
              Quatre Ingrédients Pour Un Verre Crédible
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p) => (
              <div key={p.n} className="glass-pill rounded-2xl p-5">
                <span className="text-[11px] font-mono-code text-lime-300">
                  {p.n}
                </span>
                <h3 className="mt-2 font-semibold font-mono-code text-sm">
                  {p.t}
                </h3>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden glass-surface rounded-[28px] p-8 sm:p-12 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl">
            Rejoignez L'expédition
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            Créez un compte pour retrouver vos réglages de verre et suivre les
            nouvelles techniques.
          </p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <Link
              href="/inscription"
              className="px-6 py-3 rounded-[14px] text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300"
            >
              Créer un compte
            </Link>
            <Link
              href="/connexion"
              className="px-6 py-3 rounded-[14px] text-sm font-semibold bg-white/10 hover:bg-white/[0.18] border border-white/20"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
