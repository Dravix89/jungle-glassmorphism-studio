"use client";

import { useState } from "react";

export default function PasswordField({ id, label, value, onChange, placeholder = "••••••••••••", autoComplete }: {
  id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-white/75 mb-1.5 ml-1">{label}</label>
      <div className="relative">
        <input
          id={id}
          className="field pr-20"
          type={show ? "text" : "password"}
          required
          minLength={8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-lime-300 hover:underline cursor-pointer"
        >
          {show ? "Masquer" : "Afficher"}
        </button>
      </div>
    </div>
  );
}
