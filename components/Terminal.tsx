"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { projects } from "@/data/projects";

type Line = { id: number; kind: "input" | "output"; content: ReactNode };

const PROMPT = "pablo@portfolio:~$";
const PAGES = ["sobre", "projetos", "contato"];

function Intro() {
  return (
    <div className="space-y-1">
      <p className="text-xl font-bold text-text sm:text-2xl">Pablo Teodoro</p>
      <p>Desenvolvedor full stack. Crio sistemas web e software com TypeScript.</p>
      <p className="text-muted">
        Digite <span className="text-amber">help</span> para explorar, ou use o menu acima.
      </p>
    </div>
  );
}

function Help() {
  const cmds = [
    ["whoami", "quem sou eu"],
    ["ls", "lista meus projetos"],
    ["cd <pasta>", "abre sobre, projetos ou contato"],
    ["clear", "limpa o terminal"],
  ];
  return (
    <ul>
      {cmds.map(([cmd, desc]) => (
        <li key={cmd} className="grid grid-cols-[12ch_1fr] gap-2">
          <span className="text-amber">{cmd}</span>
          <span className="text-muted">{desc}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectList() {
  return (
    <ul>
      {projects.map((p) => (
        <li key={p.slug} className="flex flex-wrap gap-x-4">
          <span className="text-muted">{p.year}</span>
          <span className="w-[9ch] text-muted">{p.category}</span>
          <Link href={`/projetos/${p.slug}`} className="text-cyan underline-offset-4 hover:underline">
            {p.slug}/
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Terminal() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: "input", content: "whoami" },
    { id: 1, kind: "output", content: <Intro /> },
  ]);

  function execute(cmd: string): ReactNode | "clear" {
    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case "":
        return null;
      case "help":
        return <Help />;
      case "whoami":
        return <Intro />;
      case "ls":
        return <ProjectList />;
      case "clear":
        return "clear";
      case "cd": {
        const target = (args[0] ?? "").replace(/^~?\/?/, "");
        if (!target) return "uso: cd sobre | projetos | contato";
        if (PAGES.includes(target)) {
          router.push(`/${target}`);
          return `abrindo ~/${target}...`;
        }
        return <span className="text-red">cd: pasta não encontrada: {target}</span>;
      }
      default:
        return (
          <span className="text-red">
            comando não encontrado: {name}. Digite help para ver os comandos.
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
      aria-label="Terminal interativo"
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
          <span className="sr-only">Digite um comando</span>
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
