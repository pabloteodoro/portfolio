"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~" },
  { href: "/sobre", label: "~/sobre" },
  { href: "/projetos", label: "~/projetos" },
  { href: "/contato", label: "~/contato" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-sm">
        <span className="text-amber">pablo@portfolio</span>
        {links.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={active ? "text-cyan" : "text-muted transition-colors hover:text-text"}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
