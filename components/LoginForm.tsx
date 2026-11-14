"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "./Providers";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const { login, toast } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const r = await login(email, password);
    setLoading(false);
    if (!r.ok) return setError(r.error ?? "Erreur de connexion.");
    toast("Connexion réussie.");
    router.push("/");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label
          htmlFor="l-mail"
          className="block text-xs font-medium text-white/75 mb-1.5 ml-1"
        >
          Adresse e-mail
        </label>
        <input
          id="l-mail"
          className="field"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="explorateur@jungle.fr"
        />
      </div>
      <PasswordField
        id="l-pass"
        label="Mot de passe"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
      />
      <div className="flex justify-end">
        <Link
          href="/mot-de-passe-oublie"
          className="text-xs text-lime-300 hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>
      {error && (
        <p
          role="alert"
          className="text-xs text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-3 py-2"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-[14px] text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
      <p className="text-center text-xs text-white/65">
        Pas encore de compte ?{" "}
        <Link
          href="/inscription"
          className="text-lime-300 hover:underline font-medium"
        >
          Créer un compte
        </Link>
      </p>
    </form>
  );
}
