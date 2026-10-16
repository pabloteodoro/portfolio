import type { Metadata } from "next";
import ProjectFilter from "@/components/ProjectFilter";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos web e software de Pablo Teodoro.",
};

export default function ProjetosPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-xl font-bold text-text sm:text-2xl">~/projetos</h1>
        <p className="text-muted">
          Sistemas web, APIs e infraestrutura em nuvem. Todos com código aberto no GitHub.
        </p>
      </header>

      <ProjectFilter projects={projects} />
    </div>
  );
}
