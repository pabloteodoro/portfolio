import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale, localePath } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).about;
  return { title: t.title, description: t.description };
}

function Command({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-muted">
      <span className="text-amber">$</span> {children}
    </h2>
  );
}

export default async function SobrePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.about;
  const [, , projectsLink, contactLink] = dict.nav.links;

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-xl font-bold text-text sm:text-2xl">{t.heading}</h1>
        <p className="text-muted">{t.subtitle}</p>
      </header>

      <section aria-labelledby="sobre-mim" className="space-y-4">
        <Command id="sobre-mim">{t.aboutCmd}</Command>
        <div className="space-y-3 leading-relaxed">
          {t.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p className="text-muted">{t.hobbies}</p>
        </div>
      </section>

      <section aria-labelledby="formacao" className="space-y-4">
        <Command id="formacao">{t.educationCmd}</Command>
        <ul className="space-y-3">
          {t.education.map((item) => (
            <li key={item.title}>
              <p className="text-text">{item.title}</p>
              <p className="text-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="habilidades" className="space-y-4">
        <Command id="habilidades">{t.skillsCmd}</Command>
        <dl className="space-y-2">
          {t.skills.map(([area, list]) => (
            <div key={area} className="grid gap-x-4 sm:grid-cols-[14ch_1fr]">
              <dt className="text-amber">{area}/</dt>
              <dd className="text-text">{list}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-muted">
        <span className="text-amber">$</span> cd{" "}
        <Link
          href={localePath(lang, projectsLink.href)}
          className="text-cyan underline-offset-4 hover:underline"
        >
          {projectsLink.label}
        </Link>{" "}
        {t.or}{" "}
        <Link
          href={localePath(lang, contactLink.href)}
          className="text-cyan underline-offset-4 hover:underline"
        >
          {contactLink.label}
        </Link>
      </p>
    </div>
  );
}
