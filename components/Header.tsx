"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/dictionaries";
import { localePath, locales, stripLocale, type Locale } from "@/lib/i18n";

type Props = { lang: Locale; nav: Dictionary["nav"] };

export default function Header({ lang, nav }: Props) {
  // Caminho sem o prefixo de idioma, para comparar com os links e trocar de idioma
  const path = stripLocale(usePathname());

  return (
    <header className="border-b border-line">
      <nav
        aria-label={nav.label}
        className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-sm"
      >
        <Link href={localePath(lang, "/")} className="text-amber transition-opacity hover:opacity-80">
          pablo@portfolio
          <span className="sr-only"> {nav.homeSr}</span>
        </Link>
        {nav.links.map((link) => {
          const active = link.href === "/" ? path === "/" : path.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={localePath(lang, link.href)}
              aria-current={active ? "page" : undefined}
              className={active ? "text-cyan" : "text-muted transition-colors hover:text-text"}
            >
              {link.label}
            </Link>
          );
        })}

        <div role="group" aria-label={nav.language} className="ml-auto flex items-center gap-1">
          {locales.map((locale, i) => (
            <span key={locale} className="flex items-center gap-1">
              {i > 0 && <span className="text-line" aria-hidden="true">|</span>}
              {locale === lang ? (
                <span aria-current="true" className="text-amber">
                  {locale.toUpperCase()}
                </span>
              ) : (
                <Link
                  href={localePath(locale, path)}
                  hrefLang={locale}
                  lang={locale}
                  className="text-muted transition-colors hover:text-text"
                >
                  {locale.toUpperCase()}
                  <span className="sr-only">{locale === "en" ? " (English)" : " (Português)"}</span>
                </Link>
              )}
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}
