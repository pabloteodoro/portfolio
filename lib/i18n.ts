export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

// Texto com uma versão por idioma
export type Localized = Record<Locale, string>;

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Português fica sem prefixo (/sobre); inglês ganha /en (/en/sobre)
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// Remove o prefixo de idioma: /en/sobre -> /sobre
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}
