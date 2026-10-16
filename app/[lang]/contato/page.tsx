import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

const links = [
  { label: "github", href: "https://github.com/pabloteodoro", text: "github.com/pabloteodoro" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/pablo-teodoro/",
    text: "linkedin.com/in/pablo-teodoro",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).contact;
  return { title: t.title, description: t.description };
}

export default async function ContatoPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).contact;

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-xl font-bold text-text sm:text-2xl">{t.heading}</h1>
        <p className="text-muted">{t.intro}</p>
      </header>

      <section aria-labelledby="redes" className="space-y-4">
        <h2 id="redes" className="text-muted">
          <span className="text-amber">$</span> {t.socialsCmd}
        </h2>
        <dl className="space-y-1">
          {links.map((l) => (
            <div key={l.label} className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
              <dt className="text-amber">{l.label}</dt>
              <dd>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan underline-offset-4 hover:underline"
                >
                  {l.text}
                  <span className="sr-only"> {t.newTab}</span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="mensagem" className="space-y-4">
        <h2 id="mensagem" className="text-muted">
          <span className="text-amber">$</span> {t.messageCmd}
        </h2>
        <ContactForm lang={lang} t={t.form} />
      </section>
    </div>
  );
}
