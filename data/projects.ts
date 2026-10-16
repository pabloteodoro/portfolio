export type ProjectCategory = "web" | "software";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  stack: string[];
  year: number;
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// Troque pelos seus projetos reais
export const projects: Project[] = [
  {
    slug: "gestor-de-pedidos",
    title: "Gestor de Pedidos",
    summary: "Painel para pequenos comércios acompanharem pedidos em tempo real.",
    category: "web",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    year: 2025,
    repoUrl: "https://github.com/seuusuario/gestor-de-pedidos",
    featured: true,
  },
  {
    slug: "backup-cli",
    title: "Backup CLI",
    summary: "Ferramenta de linha de comando que agenda e compacta backups locais.",
    category: "software",
    stack: ["Node.js", "TypeScript"],
    year: 2024,
    repoUrl: "https://github.com/seuusuario/backup-cli",
    featured: true,
  },
];
