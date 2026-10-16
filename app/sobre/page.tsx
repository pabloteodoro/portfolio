import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem é Pablo Teodoro: formação, certificações e habilidades.",
};

const skills = [
  ["linguagens", "TypeScript, JavaScript, HTML, CSS, Python"],
  ["front-end", "React, Next.js, Tailwind CSS, Material UI"],
  ["back-end", "Node.js, NestJS, Express, Fastify, Prisma, Drizzle"],
  ["dados", "PostgreSQL, DynamoDB, SQLite, Firebase"],
  ["cloud", "AWS (Lambda, API Gateway, S3, SNS/SQS, CDK), Terraform"],
  ["ferramentas", "Git, GitHub Actions, Docker, VS Code"],
];

function Command({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-muted">
      <span className="text-amber">$</span> {children}
    </h2>
  );
}

export default function SobrePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-xl font-bold text-text sm:text-2xl">~/sobre</h1>
        <p className="text-muted">Desenvolvedor de software em São Paulo, Brasil.</p>
      </header>

      <section aria-labelledby="sobre-mim" className="space-y-4">
        <Command id="sobre-mim">cat sobre-mim.txt</Command>
        <div className="space-y-3 leading-relaxed">
          <p>
            Sou o Pablo Teodoro, desenvolvedor full stack. Gosto de construir sistemas completos:
            da interface em React e Next.js até a API, o banco de dados e a infraestrutura na AWS.
          </p>
          <p>
            Meus projetos vão de aplicações web com autenticação e dashboards a arquiteturas
            serverless orientadas a eventos, sempre com TypeScript. Estou em busca de oportunidades
            para crescer como desenvolvedor em um time de produto.
          </p>
          <p className="text-muted">
            Fora do código, gosto de videogames e de estudar tecnologias novas.
          </p>
        </div>
      </section>

      <section aria-labelledby="formacao" className="space-y-4">
        <Command id="formacao">cat formacao.txt</Command>
        <ul className="space-y-3">
          <li>
            <p className="text-text">Análise e Desenvolvimento de Sistemas</p>
            <p className="text-sm text-muted">Faculdade Impacta · em andamento</p>
          </li>
          <li>
            <p className="text-text">AWS Certified Cloud Practitioner (CLF-C02)</p>
            <p className="text-sm text-muted">Amazon Web Services · certificação</p>
          </li>
          <li>
            <p className="text-text">Idiomas</p>
            <p className="text-sm text-muted">Português nativo · inglês intermediário</p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="habilidades" className="space-y-4">
        <Command id="habilidades">ls habilidades/</Command>
        <dl className="space-y-2">
          {skills.map(([area, list]) => (
            <div key={area} className="grid gap-x-4 sm:grid-cols-[14ch_1fr]">
              <dt className="text-amber">{area}/</dt>
              <dd className="text-text">{list}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-muted">
        <span className="text-amber">$</span> cd{" "}
        <Link href="/projetos" className="text-cyan underline-offset-4 hover:underline">
          ~/projetos
        </Link>{" "}
        ou{" "}
        <Link href="/contato" className="text-cyan underline-offset-4 hover:underline">
          ~/contato
        </Link>
      </p>
    </div>
  );
}
