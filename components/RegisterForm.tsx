"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "./Providers";
import PasswordField from "./PasswordField";

export default function RegisterForm() {
  const { register, toast } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm)
      return setError("Les mots de passe ne correspondent pas.");
    setLoading(true);
    const r = await register(name, email, password);
    setLoading(false);
    if (!r.ok) return setError(r.error ?? "Erreur lors de l'inscription.");
    toast("Compte créé. Bienvenue !");
    router.push("/");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label
          htmlFor="r-name"
          className="block text-xs font-medium text-white/75 mb-1.5 ml-1"
        >
          Nom complet
        </label>
        <input
          id="r-name"
          className="field"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="David R"
        />
      </div>
      <div>
        <label
          htmlFor="r-mail"
          className="block text-xs font-medium text-white/75 mb-1.5 ml-1"
        >
          Adresse e-mail
        </label>
        <input
          id="r-mail"
          className="field"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="davidr@studio.fr"
        />
      </div>
      <PasswordField
        id="r-pass"
        label="Mot de passe (8 caractères min.)"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
      />
      <PasswordField
        id="r-conf"
        label="Confirmer le mot de passe"
        value={confirm}
        onChange={setConfirm}
        autoComplete="new-password"
      />
      <label className="flex items-start gap-2.5 text-xs text-white/70 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-0.5 accent-lime-400"
        />
        J'accepte les conditions d'utilisation et la politique de
        confidentialité.
      </label>
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
        {loading ? "Création..." : "Créer mon compte"}
      </button>
      <p className="text-center text-xs text-white/65">
        Déjà inscrit ?{" "}
        <Link
          href="/connexion"
          className="text-lime-300 hover:underline font-medium"
        >
          Se connecter
        </Link>
      </p>
    </form>
  );
}
