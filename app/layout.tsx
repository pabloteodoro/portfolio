import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: { default: "Pablo Teodoro | Desenvolvedor", template: "%s | Pablo Teodoro" },
  description: "Portfólio de projetos web e software.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={plexMono.variable}>
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-4xl px-5 py-10">{children}</main>
      </body>
    </html>
  );
}
