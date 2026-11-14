"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "./Providers";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/galerie", label: "Galerie" },
  { href: "/studio", label: "Studio" },
  { href: "/laboratoire", label: "Laboratoire" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, ready } = useApp();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-10 pt-4 pb-8 bg-gradient-to-b from-[#0b140d] via-[#0b140d]/90 to-transparent">
      <nav className="max-w-7xl mx-auto nav-solid rounded-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-3 focus:outline-none min-w-0"
        >
          <div className="w-9 h-9 shrink-0 rounded-full glass-pill flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full lime-dot" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold tracking-[0.12em] sm:tracking-[0.18em] text-[11px] sm:text-sm text-white leading-none truncate">
              Jungle
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] text-lime-300 uppercase mt-1.5 mb-1.5 sm:mt-2 sm:mb-2 leading-none">
              Glassmorphism
            </span>
            <span className="font-bold tracking-[0.12em] sm:tracking-[0.18em] text-[11px] sm:text-sm text-white leading-none truncate">
              Studio
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/[0.04] border border-white/10 rounded-full p-1">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-colors ${
                  isActive(n.href)
                    ? "bg-white/[0.12] text-white"
                    : "text-white/75 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 shrink-0">
          {ready && user ? (
            <>
              <span className="hidden sm:inline-flex items-center gap-2 glass-pill rounded-full pl-1.5 pr-3.5 py-1.5 text-xs font-medium">
                <span className="w-6 h-6 rounded-full bg-lime-400 text-black flex items-center justify-center text-[11px] font-bold uppercase">
                  {user.name.charAt(0)}
                </span>
                {user.name.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                className="glass-pill hover:bg-white/[0.16] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full cursor-pointer"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/connexion"
              aria-label="Connexion"
              className="glass-pill hover:bg-white/[0.16] text-white text-xs sm:text-sm font-semibold w-9 h-9 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full inline-flex items-center justify-center gap-2.5"
            >
              <svg
                className="w-4 h-4 sm:hidden"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full lime-dot" />
              <span className="hidden sm:inline">Connexion</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden w-9 h-9 rounded-full glass-pill flex items-center justify-center text-white cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 nav-solid rounded-3xl p-3">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`block px-4 py-2.5 rounded-2xl text-sm font-medium ${
                    isActive(n.href)
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
            {!user && (
              <>
                <li>
                  <Link
                    href="/inscription"
                    className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-lime-300"
                  >
                    Créer un compte
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
