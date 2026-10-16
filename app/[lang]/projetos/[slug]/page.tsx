import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getDictionary } from "@/dictionaries";
import { hasLocale, localePath } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !hasLocale(lang)) return {};
  return { title: project.title[lang], description: project.summary[lang] };
}

export default async function ProjetoPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const repoPath = project.repoUrl?.replace("https://github.com/", "");

  return (
    <article className="space-y-10">
      <Link
        href={localePath(lang, "/projetos")}
        className="text-sm text-cyan underline-offset-4 hover:underline"
      >
        <span className="text-amber">$</span> {t.project.back}
      </Link>

      <header className="space-y-3">
        <p className="text-sm text-muted">
          {t.projects.heading}/{project.slug}
        </p>
        <h1 className="text-xl font-bold text-text sm:text-2xl">{project.title[lang]}</h1>
        <p className="leading-relaxed">{project.summary[lang]}</p>
      </header>

      <section aria-labelledby="info" className="space-y-4">
        <h2 id="info" className="text-muted">
          <span className="text-amber">$</span> {t.project.info}
        </h2>
        <dl className="space-y-2">
          <div className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
            <dt className="text-amber">{t.project.year}</dt>
            <dd>{project.year}</dd>
          </div>
          <div className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
            <dt className="text-amber">{t.project.type}</dt>
            <dd>{project.category}</dd>
          </div>
          <div className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
            <dt className="text-amber">{t.project.stack}</dt>
            <dd className="text-cyan">{project.stack.join(" / ")}</dd>
          </div>
        </dl>
      </section>

      {(project.repoUrl || project.demoUrl) && (
        <section aria-labelledby="links" className="space-y-4">
          <h2 id="links" className="text-muted">
            <span className="text-amber">$</span> {t.project.links}
          </h2>
          <div className="flex flex-wrap gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-amber px-4 py-2 text-amber transition-colors hover:bg-amber hover:text-ink"
              >
                {t.project.viewCode}
                <span className="sr-only"> {t.projects.newTab}</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyan px-4 py-2 text-cyan transition-colors hover:bg-cyan hover:text-ink"
              >
                {t.project.viewLive}
                <span className="sr-only"> {t.projects.newTab}</span>
              </a>
            )}
          </div>
          {repoPath && (
            <p className="overflow-x-auto text-sm text-muted">
              <span className="text-amber">$</span> git clone https://github.com/{repoPath}.git
            </p>
          )}
        </section>
      )}
    </article>
  );
}
