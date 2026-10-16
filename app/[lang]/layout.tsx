import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getDictionary } from "@/dictionaries";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import "../globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
});

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: { default: dict.meta.title, template: "%s | Pablo Teodoro" },
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={htmlLang[lang]} className={plexMono.variable}>
      <body className="min-h-screen antialiased">
        <Header lang={lang} nav={dict.nav} />
        <main className="mx-auto max-w-4xl px-5 py-10">{children}</main>
      </body>
    </html>
  );
}
