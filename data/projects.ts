import type { Localized } from "@/lib/i18n";

export type ProjectCategory = "web" | "software";

export interface Project {
  slug: string;
  title: Localized;
  summary: Localized;
  category: ProjectCategory;
  stack: string[];
  year: number;
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// Projetos públicos de https://github.com/pabloteodoro, do mais recente ao mais antigo
export const projects: Project[] = [
  {
    slug: "portal-do-aluno",
    title: { pt: "Portal do Aluno", en: "Student Portal" },
    summary: {
      pt: "Recriação de um portal acadêmico com login via JWT, dashboard interativo e banco de dados.",
      en: "Recreation of an academic portal with JWT login, an interactive dashboard and a database.",
    },
    category: "web",
    stack: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    year: 2026,
    repoUrl: "https://github.com/pabloteodoro/projeto-impacta",
    featured: true,
  },
  {
    slug: "teste-doutores-da-web",
    title: { pt: "Teste Doutores da Web", en: "Doutores da Web Test" },
    summary: {
      pt: "Página responsiva com menu multinível, acordeão no mobile e carrossel de banners.",
      en: "Responsive page with a multi-level menu, mobile accordion and banner carousel.",
    },
    category: "web",
    stack: ["HTML", "CSS", "JavaScript", "Splide.js"],
    year: 2026,
    repoUrl: "https://github.com/pabloteodoro/teste-doutores-da-web",
  },
  {
    slug: "ecommerce-aws",
    title: { pt: "E-commerce Serverless na AWS", en: "Serverless E-commerce on AWS" },
    summary: {
      pt: "Microsserviços de produtos, pedidos e faturas com arquitetura orientada a eventos, infraestrutura como código e observabilidade.",
      en: "Product, order and invoice microservices with event-driven architecture, infrastructure as code and observability.",
    },
    category: "software",
    stack: ["TypeScript", "AWS CDK", "Lambda", "DynamoDB", "SNS/SQS", "API Gateway"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/EcommerceAWS",
    featured: true,
  },
  {
    slug: "iac-infra",
    title: { pt: "Infra como Código na AWS", en: "Infrastructure as Code on AWS" },
    summary: {
      pt: "Site estático em S3 provisionado com Terraform e GitHub Actions, com rotina em Lambda.",
      en: "Static site on S3 provisioned with Terraform and GitHub Actions, plus a Lambda routine.",
    },
    category: "software",
    stack: ["Terraform", "GitHub Actions", "AWS S3", "Lambda", "Python"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/Iacinfra",
  },
  {
    slug: "viaje-mais",
    title: { pt: "ViajeMais", en: "ViajeMais" },
    summary: {
      pt: "Portal de viagens em React feito para o teste técnico da Triibo.",
      en: "Travel portal built in React for Triibo's technical test.",
    },
    category: "web",
    stack: ["React", "Material UI", "React Hook Form", "Axios"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/TriiboChallengeReact",
    demoUrl: "https://triibo-challenge-react.vercel.app/",
  },
  {
    slug: "controll-dev",
    title: { pt: "Controll Dev", en: "Controll Dev" },
    summary: {
      pt: "Sistema de chamados com cadastro de clientes, abertura de tickets e dashboard autenticado.",
      en: "Help desk system with customer records, ticket creation and an authenticated dashboard.",
    },
    category: "web",
    stack: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Zod", "Tailwind CSS"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/controller",
    featured: true,
  },
  {
    slug: "furia-chat",
    title: { pt: "FURIA Chat", en: "FURIA Chat" },
    summary: {
      pt: "Chat para torcedores da FURIA com chatbot, partidas ao vivo e login (teste técnico).",
      en: "Chat for FURIA fans with a chatbot, live matches and login (technical test).",
    },
    category: "web",
    stack: ["Next.js", "TypeScript", "Firebase", "OpenAI", "Tailwind CSS"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/teste-furia-chat",
  },
  {
    slug: "oficina-do-seu-ze",
    title: { pt: "Oficina do seu Zé", en: "Oficina do seu Zé" },
    summary: {
      pt: "Site institucional de oficina mecânica com conteúdo gerenciado por CMS headless.",
      en: "Company website for a car repair shop with content managed by a headless CMS.",
    },
    category: "web",
    stack: ["Next.js", "TypeScript", "CosmicJS", "SCSS"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/devmotors",
  },
  {
    slug: "daly-games",
    title: { pt: "Daly Games", en: "Daly Games" },
    summary: {
      pt: "Catálogo de jogos com busca por título, página de detalhes e perfil.",
      en: "Game catalog with title search, a details page and a profile.",
    },
    category: "web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Axios"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/dalygames",
  },
  {
    slug: "tarefas-plus",
    title: { pt: "Tarefas+", en: "Tarefas+" },
    summary: {
      pt: "Organizador de tarefas com login Google, tarefas públicas compartilháveis e comentários.",
      en: "Task organizer with Google login, shareable public tasks and comments.",
    },
    category: "web",
    stack: ["Next.js", "React", "Firebase", "NextAuth"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/Task-and-Dashboards",
    demoUrl: "https://task-and-dashboards-arh2.vercel.app/",
  },
  {
    slug: "repositorios-github",
    title: { pt: "Repositórios GitHub", en: "GitHub Repositories" },
    summary: {
      pt: "App React que busca e salva repositórios pela API do GitHub.",
      en: "React app that searches and saves repositories using the GitHub API.",
    },
    category: "web",
    stack: ["React", "JavaScript", "styled-components"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/repositories-github",
  },
  {
    slug: "nlw-pocket",
    title: { pt: "API de Metas Semanais", en: "Weekly Goals API" },
    summary: {
      pt: "API para cadastrar metas e registrar conclusões da semana (NLW Pocket).",
      en: "API to create goals and record weekly completions (NLW Pocket).",
    },
    category: "software",
    stack: ["Node.js", "TypeScript", "Fastify", "Drizzle ORM", "PostgreSQL", "Docker"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/nlw-pocket",
  },
  {
    slug: "dev-job-search",
    title: { pt: "Dev Job Search", en: "Dev Job Search" },
    summary: {
      pt: "Mural de vagas para desenvolvedores com cadastro, busca e página de detalhes.",
      en: "Job board for developers with posting, search and a details page.",
    },
    category: "web",
    stack: ["Node.js", "Express", "Handlebars", "Sequelize", "SQLite"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/dev-job-search",
  },
  {
    slug: "jogo-da-velha",
    title: { pt: "Jogo da Velha", en: "Tic-Tac-Toe" },
    summary: {
      pt: "Jogo da velha feito em JavaScript puro manipulando o DOM.",
      en: "Tic-tac-toe game built in plain JavaScript using the DOM.",
    },
    category: "web",
    stack: ["JavaScript", "HTML", "CSS"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/tic-tac-toe",
    demoUrl: "https://tictactoe-pabloteodoros-projects.vercel.app",
  },
];
