import Link from "next/link";
import { lang as getLang } from "next/root-params";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, hasLocale, localePath } from "@/lib/i18n";

export default async function NotFound() {
  const value = await getLang();
  const lang = value && hasLocale(value) ? value : defaultLocale;
  const t = getDictionary(lang).notFound;

  return (
    <div className="space-y-4">
      <h1 className="sr-only">{t.title}</h1>
      <p className="text-muted">
        <span className="text-amber">$</span> {t.command}
      </p>
      <p className="text-red">{t.error}</p>
      <p>
        <span className="text-amber">$</span> cd{" "}
        <Link href={localePath(lang, "/")} className="text-cyan underline-offset-4 hover:underline">
          ~
        </Link>{" "}
        <span className="text-muted"># {t.back}</span>
      </p>
    </div>
  );
}
