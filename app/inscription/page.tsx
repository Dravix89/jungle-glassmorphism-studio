import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import RegisterForm from "@/components/RegisterForm";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "Inscription" };

export default function InscriptionPage() {
  return (
    <AuthShell
      pill="Nouveau compte"
      title="Créer Un Compte"
      text="Rejoignez le studio en quelques secondes."
      image={IMG.register}
    >
      <RegisterForm />
    </AuthShell>
  );
}
