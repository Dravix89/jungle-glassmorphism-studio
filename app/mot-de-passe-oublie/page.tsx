import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import ForgotForm from "@/components/ForgotForm";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "Mot De Passe Oublié" };

export default function MotDePasseOubliePage() {
  return (
    <AuthShell
      pill="Récupération"
      title="Mot De Passe Oublié"
      text="Saisissez votre e-mail pour recevoir un lien de réinitialisation."
      image={IMG.forgot}
    >
      <ForgotForm />
    </AuthShell>
  );
}
