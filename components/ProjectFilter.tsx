"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

type Filter = "todos" | ProjectCategory;

const FILTERS: Filter[] = ["todos", "web", "software"];

type Props = { projects: Project[]; lang: Locale; t: Dictionary["projects"] };

export default function ProjectFilter({ projects, lang, t }: Props) {
  const [filter, setFilter] = useState<Filter>("todos");
  const visible = filter === "todos" ? projects : projects.filter((p) => p.category === filter);

  function count(f: Filter) {
    return f === "todos" ? projects.length : projects.filter((p) => p.category === f).length;
  }

  return (
    <div className="space-y-6">
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? "text-amber"
                : "text-muted transition-colors hover:text-text"
            }
          >
            --{t.filters[f]} <span className="text-muted">({count(f)})</span>
          </button>
        ))}
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        <span className="text-amber">$</span> {t.lsCommand}
        {filter === "todos" ? "" : ` ${t.typeFlag}=${filter}`}
        <span className="ml-3">
          {visible.length} {t.items}
        </span>
      </p>

      <ul className="divide-y divide-line border-y border-line">
        {visible.map((p) => (
          <li key={p.slug} className="space-y-2 py-5 sm:px-3">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="font-bold">
                <Link
                  href={localePath(lang, `/projetos/${p.slug}`)}
                  className="text-text underline-offset-4 hover:text-cyan hover:underline"
                >
                  {p.title[lang]}
                </Link>
              </h2>
              <span className="text-xs text-muted">
                {p.year} · {p.category}
              </span>
            </div>
            <p className="text-sm text-muted">{p.summary[lang]}</p>
            <p className="text-xs text-cyan">{p.stack.join(" / ")}</p>
            <p className="flex gap-4 text-sm">
              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan underline-offset-4 hover:underline"
                >
                  {t.code}
                  <span className="sr-only">
                    {" "}
                    {p.title[lang]} {t.codeSr}
                  </span>
                </a>
              )}
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan underline-offset-4 hover:underline"
                >
                  {t.live}
                  <span className="sr-only">
                    {" "}
                    {p.title[lang]} {t.newTab}
                  </span>
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
