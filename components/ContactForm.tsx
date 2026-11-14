"use client";

import { useApp } from "./Providers";

const label = "block text-xs font-medium text-white/75 mb-1.5 ml-1";

export default function ContactForm() {
  const { toast } = useApp();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        toast("Message envoyé avec succès.");
      }}
      className="space-y-4 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className={label}>
            Nom complet
          </label>
          <input
            id="c-name"
            className="field"
            type="text"
            required
            placeholder="David R"
          />
        </div>
        <div>
          <label htmlFor="c-mail" className={label}>
            E-mail
          </label>
          <input
            id="c-mail"
            className="field"
            type="email"
            required
            placeholder="davidr@studio.fr"
          />
        </div>
      </div>
      <div>
        <label htmlFor="c-msg" className={label}>
          Message
        </label>
        <textarea
          id="c-msg"
          className="field resize-none"
          rows={4}
          required
          placeholder="Présentez votre projet..."
        />
      </div>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-white/60">
          Réponse sous 24 heures ouvrées
        </span>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-[14px] text-sm font-semibold text-black bg-lime-400 hover:bg-lime-300 cursor-pointer"
        >
          Envoyer le message
        </button>
      </div>
    </form>
  );
}
