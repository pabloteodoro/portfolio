import Link from "next/link";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-14">
      <Terminal />

      {/* Para quem prefere clicar em vez de digitar */}
      <section aria-labelledby="destaques" className="space-y-4">
        <h2 id="destaques" className="text-muted">
          <span className="text-amber">$</span> cat destaques.txt
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projetos/${p.slug}`}
                className="group block py-5 transition-colors hover:bg-panel sm:px-3"
              >
                <p className="font-bold text-text group-hover:text-cyan">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.summary}</p>
                <p className="mt-2 text-xs text-cyan">{p.stack.join(" / ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
