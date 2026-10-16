import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com Pablo Teodoro sobre vagas, projetos ou parcerias.",
};

const links = [
  { label: "github", href: "https://github.com/pabloteodoro", text: "github.com/pabloteodoro" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/pablo-teodoro/",
    text: "linkedin.com/in/pablo-teodoro",
  },
];

export default function ContatoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-xl font-bold text-text sm:text-2xl">~/contato</h1>
        <p className="text-muted">
          Vagas, projetos ou só uma conversa sobre tecnologia: mande uma mensagem.
        </p>
      </header>

      <section aria-labelledby="redes" className="space-y-4">
        <h2 id="redes" className="text-muted">
          <span className="text-amber">$</span> cat redes.txt
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
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="mensagem" className="space-y-4">
        <h2 id="mensagem" className="text-muted">
          <span className="text-amber">$</span> ./mensagem.sh
        </h2>
        <ContactForm />
      </section>
    </div>
  );
}
