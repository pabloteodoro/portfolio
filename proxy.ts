import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, stripLocale } from "@/lib/i18n";

// Português (idioma padrão) fica sem prefixo na URL: /sobre é servido por app/[lang] com lang=pt.
// Inglês usa o prefixo: /en/sobre.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // /pt/sobre -> /sobre, para não ter duas URLs com o mesmo conteúdo
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    url.pathname = stripLocale(pathname);
    return NextResponse.redirect(url);
  }

  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ignora arquivos internos do Next e arquivos com extensão (favicon.ico, imagens)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
