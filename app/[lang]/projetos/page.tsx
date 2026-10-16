import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectFilter from "@/components/ProjectFilter";
import { projects } from "@/data/projects";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).projects;
  return { title: t.title, description: t.description };
}

export default async function ProjetosPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).projects;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-xl font-bold text-text sm:text-2xl">{t.heading}</h1>
        <p className="text-muted">{t.intro}</p>
      </header>

      <ProjectFilter projects={projects} lang={lang} t={t} />
    </div>
  );
}
