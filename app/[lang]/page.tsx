import Link from "next/link";
import { notFound } from "next/navigation";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";
import { getDictionary } from "@/dictionaries";
import { hasLocale, localePath } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-14">
      <Terminal lang={lang} t={dict.terminal} />

      {/* Para quem prefere clicar em vez de digitar */}
      <section aria-labelledby="destaques" className="space-y-4">
        <h2 id="destaques" className="text-muted">
          <span className="text-amber">$</span> {dict.home.highlights}
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={localePath(lang, `/projetos/${p.slug}`)}
                className="group block py-5 transition-colors hover:bg-panel sm:px-3"
              >
                <p className="font-bold text-text group-hover:text-cyan">{p.title[lang]}</p>
                <p className="mt-1 text-sm text-muted">{p.summary[lang]}</p>
                <p className="mt-2 text-xs text-cyan">{p.stack.join(" / ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
