import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";
import { IMG } from "@/lib/images";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <AuthShell
      pill="Espace membre"
      title="Connexion"
      text="Accédez à votre espace Studio et à vos environnements enregistrés."
      image={IMG.login}
    >
      <LoginForm />
    </AuthShell>
  );
}
