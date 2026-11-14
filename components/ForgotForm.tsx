"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./Providers";

export default function ForgotForm() {
  const { forgot } = useApp();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await forgot(email);
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-5">
        <div className="glass-pill rounded-2xl p-5 text-sm text-white/85 leading-relaxed">
          Si un compte existe pour{" "}
          <strong className="text-lime-300">{email}</strong>, un lien de
          réinitialisation vient d'être envoyé.
        </div>
        <Link
          href="/connexion"
          className="block text-center w-full py-3 rounded-[14px] text-sm font-semibold bg-white/10 hover:bg-white/[0.18] border border-white/20"
        >
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label
          htmlFor="f-mail"
          className="block text-xs font-medium text-white/75 mb-1.5 ml-1"
        >
          Adresse e-mail
        </label>
        <input
          id="f-mail"
          className="field"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="explorateur@jungle.fr"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-[14px] text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Envoi..." : "Envoyer le lien"}
      </button>
      <p className="text-center text-xs text-white/65">
        <Link
          href="/connexion"
          className="text-lime-300 hover:underline font-medium"
        >
          Retour à la connexion
        </Link>
      </p>
    </form>
  );
}
