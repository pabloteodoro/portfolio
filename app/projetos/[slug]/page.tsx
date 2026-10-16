import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjetoPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const repoPath = project.repoUrl?.replace("https://github.com/", "");

  return (
    <article className="space-y-10">
      <Link href="/projetos" className="text-sm text-cyan underline-offset-4 hover:underline">
        <span className="text-amber">$</span> cd ..
      </Link>

      <header className="space-y-3">
        <p className="text-sm text-muted">~/projetos/{project.slug}</p>
        <h1 className="text-xl font-bold text-text sm:text-2xl">{project.title}</h1>
        <p className="leading-relaxed">{project.summary}</p>
      </header>

      <section aria-labelledby="info" className="space-y-4">
        <h2 id="info" className="text-muted">
          <span className="text-amber">$</span> cat info.txt
        </h2>
        <dl className="space-y-2">
          <div className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
            <dt className="text-amber">ano</dt>
            <dd>{project.year}</dd>
          </div>
          <div className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
            <dt className="text-amber">tipo</dt>
            <dd>{project.category}</dd>
          </div>
          <div className="grid gap-x-4 sm:grid-cols-[10ch_1fr]">
            <dt className="text-amber">stack</dt>
            <dd className="text-cyan">{project.stack.join(" / ")}</dd>
          </div>
        </dl>
      </section>

      {(project.repoUrl || project.demoUrl) && (
        <section aria-labelledby="links" className="space-y-4">
          <h2 id="links" className="text-muted">
            <span className="text-amber">$</span> open links/
          </h2>
          <div className="flex flex-wrap gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-amber px-4 py-2 text-amber transition-colors hover:bg-amber hover:text-ink"
              >
                ver código no GitHub
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyan px-4 py-2 text-cyan transition-colors hover:bg-cyan hover:text-ink"
              >
                ver online
                <span className="sr-only"> (abre em nova aba)</span>
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
