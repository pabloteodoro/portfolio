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

// Projetos públicos de https://github.com/pabloteodoro, do mais recente ao mais antigo
export const projects: Project[] = [
  {
    slug: "portal-do-aluno",
    title: "Portal do Aluno",
    summary:
      "Recriação de um portal acadêmico com login via JWT, dashboard interativo e banco de dados.",
    category: "web",
    stack: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    year: 2026,
    repoUrl: "https://github.com/pabloteodoro/projeto-impacta",
    featured: true,
  },
  {
    slug: "teste-doutores-da-web",
    title: "Teste Doutores da Web",
    summary:
      "Página responsiva com menu multinível, acordeão no mobile e carrossel de banners.",
    category: "web",
    stack: ["HTML", "CSS", "JavaScript", "Splide.js"],
    year: 2026,
    repoUrl: "https://github.com/pabloteodoro/teste-doutores-da-web",
  },
  {
    slug: "ecommerce-aws",
    title: "E-commerce Serverless na AWS",
    summary:
      "Microsserviços de produtos, pedidos e faturas com arquitetura orientada a eventos, infraestrutura como código e observabilidade.",
    category: "software",
    stack: ["TypeScript", "AWS CDK", "Lambda", "DynamoDB", "SNS/SQS", "API Gateway"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/EcommerceAWS",
    featured: true,
  },
  {
    slug: "iac-infra",
    title: "Infra como Código na AWS",
    summary:
      "Site estático em S3 provisionado com Terraform e GitHub Actions, com rotina em Lambda.",
    category: "software",
    stack: ["Terraform", "GitHub Actions", "AWS S3", "Lambda", "Python"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/Iacinfra",
  },
  {
    slug: "viaje-mais",
    title: "ViajeMais",
    summary: "Portal de viagens em React feito para o teste técnico da Triibo.",
    category: "web",
    stack: ["React", "Material UI", "React Hook Form", "Axios"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/TriiboChallengeReact",
    demoUrl: "https://triibo-challenge-react.vercel.app/",
  },
  {
    slug: "controll-dev",
    title: "Controll Dev",
    summary:
      "Sistema de chamados com cadastro de clientes, abertura de tickets e dashboard autenticado.",
    category: "web",
    stack: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Zod", "Tailwind CSS"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/controller",
    featured: true,
  },
  {
    slug: "furia-chat",
    title: "FURIA Chat",
    summary:
      "Chat para torcedores da FURIA com chatbot, partidas ao vivo e login (teste técnico).",
    category: "web",
    stack: ["Next.js", "TypeScript", "Firebase", "OpenAI", "Tailwind CSS"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/teste-furia-chat",
  },
  {
    slug: "oficina-do-seu-ze",
    title: "Oficina do seu Zé",
    summary: "Site institucional de oficina mecânica com conteúdo gerenciado por CMS headless.",
    category: "web",
    stack: ["Next.js", "TypeScript", "CosmicJS", "SCSS"],
    year: 2025,
    repoUrl: "https://github.com/pabloteodoro/devmotors",
  },
  {
    slug: "daly-games",
    title: "Daly Games",
    summary: "Catálogo de jogos com busca por título, página de detalhes e perfil.",
    category: "web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Axios"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/dalygames",
  },
  {
    slug: "tarefas-plus",
    title: "Tarefas+",
    summary:
      "Organizador de tarefas com login Google, tarefas públicas compartilháveis e comentários.",
    category: "web",
    stack: ["Next.js", "React", "Firebase", "NextAuth"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/Task-and-Dashboards",
    demoUrl: "https://task-and-dashboards-arh2.vercel.app/",
  },
  {
    slug: "repositorios-github",
    title: "Repositórios GitHub",
    summary: "App React que busca e salva repositórios pela API do GitHub.",
    category: "web",
    stack: ["React", "JavaScript", "styled-components"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/repositories-github",
  },
  {
    slug: "nlw-pocket",
    title: "API de Metas Semanais",
    summary: "API para cadastrar metas e registrar conclusões da semana (NLW Pocket).",
    category: "software",
    stack: ["Node.js", "TypeScript", "Fastify", "Drizzle ORM", "PostgreSQL", "Docker"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/nlw-pocket",
  },
  {
    slug: "dev-job-search",
    title: "Dev Job Search",
    summary: "Mural de vagas para desenvolvedores com cadastro, busca e página de detalhes.",
    category: "web",
    stack: ["Node.js", "Express", "Handlebars", "Sequelize", "SQLite"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/dev-job-search",
  },
  {
    slug: "jogo-da-velha",
    title: "Jogo da Velha",
    summary: "Jogo da velha feito em JavaScript puro manipulando o DOM.",
    category: "web",
    stack: ["JavaScript", "HTML", "CSS"],
    year: 2024,
    repoUrl: "https://github.com/pabloteodoro/tic-tac-toe",
    demoUrl: "https://tictactoe-pabloteodoros-projects.vercel.app",
  },
];
