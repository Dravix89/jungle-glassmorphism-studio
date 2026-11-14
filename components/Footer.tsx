import Link from "next/link";

const col = "space-y-2 text-xs sm:text-sm text-white/80";
const head =
  "text-[11px] font-bold tracking-[0.18em] text-lime-300 uppercase mb-4";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pb-10">
      <div className="max-w-7xl mx-auto glass-surface rounded-[32px] px-8 sm:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-10 border-b border-white/10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full lime-dot" />
              <span className="font-bold tracking-[0.14em] text-sm text-white uppercase">
                Jungle Glassmorphism Studio
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Le laboratoire des techniques de glassmorphism appliquées à des
              interfaces botaniques immersives.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className={head}>Navigation</h4>
            <ul className={col}>
              <li>
                <Link href="/" className="hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="hover:text-white">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/laboratoire" className="hover:text-white">
                  Laboratoire
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className={head}>Compte</h4>
            <ul className={col}>
              <li>
                <Link href="/connexion" className="hover:text-white">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-white">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/mot-de-passe-oublie" className="hover:text-white">
                  Mot De Passe Oublié
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className={head}>Techniques</h4>
            <ul className={col}>
              <li>
                <Link href="/studio#classique" className="hover:text-white">
                  Verre Classique
                </Link>
              </li>
              <li>
                <Link href="/studio#speculaire" className="hover:text-white">
                  Bordure Spéculaire
                </Link>
              </li>
              <li>
                <Link href="/studio#grain" className="hover:text-white">
                  Grain (Noise)
                </Link>
              </li>
              <li>
                <Link href="/studio#liquide" className="hover:text-white">
                  Liquid Glass
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <span>© 2026 Jungle Glassmorphism Studio. Tous Droits Réservés.</span>
          <span>Photographies : Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
