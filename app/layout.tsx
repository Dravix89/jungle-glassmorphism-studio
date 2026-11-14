import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Jungle Glassmorphism Studio",
    template: "%s | Jungle Glassmorphism Studio",
  },
  description:
    "Découvrez et testez les techniques de glassmorphism sur des environnements de jungle immersifs.",
};

export const viewport: Viewport = { themeColor: "#0b140d" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-lime-400 selection:text-black">
        <Providers>
          <Background />
          <Navbar />
          <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-10 min-h-screen">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
