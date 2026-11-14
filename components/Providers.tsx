"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_GLASS, Glass, deriveGlass } from "@/lib/glass";
import { scenes } from "@/lib/images";

type User = { name: string; email: string };
type Result = { ok: boolean; error?: string };

type Ctx = {
  glass: Glass;
  setGlass: (patch: Partial<Glass>) => void;
  resetGlass: () => void;
  sceneIndex: number;
  nextScene: () => void;
  setScene: (i: number) => void;
  toast: (msg: string) => void;
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<Result>;
  register: (name: string, email: string, password: string) => Promise<Result>;
  forgot: (email: string) => Promise<Result>;
  logout: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp doit être utilisé dans <Providers>");
  return c;
}

const USERS_KEY = "jgs:users";
const SESSION_KEY = "jgs:session";

async function hash(value: string) {
  try {
    if (globalThis.crypto?.subtle) {
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(value),
      );
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {}
  return btoa(unescape(encodeURIComponent(value)));
}

type Stored = Record<string, { name: string; hash: string }>;
const readUsers = (): Stored => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [glass, setGlassState] = useState<Glass>(DEFAULT_GLASS);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Variables CSS globales
  useEffect(() => {
    const r = document.documentElement.style;
    const d = deriveGlass(glass);
    r.setProperty("--glass-blur", `${glass.blur}px`);
    r.setProperty("--glass-saturate", `${glass.saturate}%`);
    r.setProperty("--glass-alpha-top", d.top.toFixed(2));
    r.setProperty("--glass-alpha-mid", d.mid.toFixed(2));
    r.setProperty("--glass-alpha-bot", d.bot.toFixed(2));
    r.setProperty(
      "--glass-border",
      `rgba(255, 255, 255, ${d.border.toFixed(2)})`,
    );
    r.setProperty("--glass-c1", d.c[0]);
    r.setProperty("--glass-c2", d.c[1]);
    r.setProperty("--glass-c3", d.c[2]);
  }, [glass]);

  // Session
  useEffect(() => {
    try {
      const email = localStorage.getItem(SESSION_KEY);
      if (email) {
        const u = readUsers()[email];
        if (u) setUser({ name: u.name, email });
      }
    } catch {}
    setReady(true);
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const setGlass = useCallback(
    (patch: Partial<Glass>) => setGlassState((g) => ({ ...g, ...patch })),
    [],
  );
  const resetGlass = useCallback(() => setGlassState(DEFAULT_GLASS), []);
  const nextScene = useCallback(
    () => setSceneIndex((i) => (i + 1) % scenes.length),
    [],
  );
  const setScene = useCallback((i: number) => setSceneIndex(i), []);

  const register: Ctx["register"] = useCallback(
    async (name, email, password) => {
      const key = email.trim().toLowerCase();
      const users = readUsers();
      if (users[key])
        return { ok: false, error: "Un compte existe déjà avec cet e-mail." };
      users[key] = { name: name.trim(), hash: await hash(password) };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, key);
      setUser({ name: name.trim(), email: key });
      return { ok: true };
    },
    [],
  );

  const login: Ctx["login"] = useCallback(async (email, password) => {
    const key = email.trim().toLowerCase();
    const u = readUsers()[key];
    if (!u || u.hash !== (await hash(password)))
      return { ok: false, error: "E-mail ou mot de passe incorrect." };
    localStorage.setItem(SESSION_KEY, key);
    setUser({ name: u.name, email: key });
    return { ok: true };
  }, []);

  const forgot: Ctx["forgot"] = useCallback(async () => {
    // Démo : brancher ici votre service d'envoi d'e-mails.
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    toast("Vous êtes déconnecté.");
  }, [toast]);

  const value = useMemo<Ctx>(
    () => ({
      glass,
      setGlass,
      resetGlass,
      sceneIndex,
      nextScene,
      setScene,
      toast,
      user,
      ready,
      login,
      register,
      forgot,
      logout,
    }),
    [
      glass,
      setGlass,
      resetGlass,
      sceneIndex,
      nextScene,
      setScene,
      toast,
      user,
      ready,
      login,
      register,
      forgot,
      logout,
    ],
  );

  return (
    <AppCtx.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed top-24 right-4 sm:right-8 z-[70] glass-surface rounded-2xl px-4 py-3 items-center gap-2.5 border border-lime-400/40 ${toastMsg ? "flex" : "hidden"}`}
      >
        <span className="w-2 h-2 rounded-full lime-dot" />
        <span className="text-xs sm:text-sm font-medium text-white">
          {toastMsg}
        </span>
      </div>
    </AppCtx.Provider>
  );
}
