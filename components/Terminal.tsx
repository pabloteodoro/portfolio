"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

type Line = { id: number; kind: "input" | "output"; content: ReactNode };
type T = Dictionary["terminal"];

const PROMPT = "pablo@portfolio:~$";

// Pastas aceitas pelo cd, em português e inglês
const FOLDERS: Record<string, string> = {
  sobre: "/sobre",
  about: "/sobre",
  projetos: "/projetos",
  projects: "/projetos",
  contato: "/contato",
  contact: "/contato",
};

function Intro({ t }: { t: T }) {
  return (
    <div className="space-y-1">
      <p className="text-xl font-bold text-text sm:text-2xl">Pablo Teodoro</p>
      <p>{t.intro}</p>
      <p className="text-muted">
        {t.hintBefore} <span className="text-amber">help</span> {t.hintAfter}
      </p>
    </div>
  );
}

function Help({ t }: { t: T }) {
  return (
    <ul>
      {t.help.map(([cmd, desc]) => (
        <li key={cmd} className="grid grid-cols-[12ch_1fr] gap-2">
          <span className="text-amber">{cmd}</span>
          <span className="text-muted">{desc}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectList({ lang }: { lang: Locale }) {
  return (
    <ul>
      {projects.map((p) => (
        <li key={p.slug} className="flex flex-wrap gap-x-4">
          <span className="text-muted">{p.year}</span>
          <span className="w-[9ch] text-muted">{p.category}</span>
          <Link
            href={localePath(lang, `/projetos/${p.slug}`)}
            className="text-cyan underline-offset-4 hover:underline"
          >
            {p.slug}/
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Terminal({ lang, t }: { lang: Locale; t: T }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: "input", content: "whoami" },
    { id: 1, kind: "output", content: <Intro t={t} /> },
  ]);

  function execute(cmd: string): ReactNode | "clear" {
    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case "":
        return null;
      case "help":
        return <Help t={t} />;
      case "whoami":
        return <Intro t={t} />;
      case "ls":
        return <ProjectList lang={lang} />;
      case "clear":
        return "clear";
      case "cd": {
        const target = (args[0] ?? "").replace(/^~?\/?/, "").replace(/\/$/, "");
        if (!target) return t.cdUsage;
        const route = FOLDERS[target];
        if (route) {
          router.push(localePath(lang, route));
          return `${t.cdOpening} ~/${target}...`;
        }
        return (
          <span className="text-red">
            {t.cdNotFound} {target}
          </span>
        );
      }
      default:
        return (
          <span className="text-red">
            {t.notFound} {name}. {t.notFoundHint}
          </span>
        );
    }
  }

  function submit() {
    const cmd = value.trim();
    const result = execute(cmd);
    setValue("");
    setHistoryIndex(-1);
    if (cmd) setHistory((h) => [cmd, ...h]);

    if (result === "clear") {
      setLines([]);
      return;
    }
    const added: Line[] = [{ id: nextId.current++, kind: "input", content: cmd }];
    if (result) added.push({ id: nextId.current++, kind: "output", content: result });
    setLines((l) => [...l, ...added]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = historyIndex - 1;
      setHistoryIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    }
  }

  return (
    <section
      aria-label={t.ariaLabel}
      onClick={() => inputRef.current?.focus()}
      className="overflow-hidden rounded-md border border-line bg-panel shadow-[0_0_40px_-12px_rgba(255,176,0,0.25)]"
    >
      <div className="border-b border-line px-4 py-2 text-xs text-muted">~/portfolio</div>

      <div className="space-y-3 p-4 text-sm leading-relaxed sm:p-6 sm:text-base" aria-live="polite">
        {lines.map((line) =>
          line.kind === "input" ? (
            <p key={line.id}>
              <span className="text-amber">{PROMPT}</span> {line.content}
            </p>
          ) : (
            <div key={line.id}>{line.content}</div>
          )
        )}

        <label className="flex items-center gap-2">
          <span className="shrink-0 text-amber">{PROMPT}</span>
          <span className="sr-only">{t.inputLabel}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full bg-transparent caret-amber outline-none"
          />
        </label>
      </div>
    </section>
  );
}
