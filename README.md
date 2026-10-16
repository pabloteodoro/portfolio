# Portfólio | Pablo Teodoro

Site pessoal com meu portfólio de projetos web e software, com visual inspirado em terminal. A página inicial é um terminal interativo: o visitante digita comandos para navegar pelo site.

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · IBM Plex Mono

---

## Como rodar localmente

Pré-requisito: Node.js 20 ou superior.

```bash
git clone https://github.com/pabloteodoro/portfolio.git
cd portfolio
npm install
npm run dev
```

Abra `http://localhost:3000`.

| Comando         | O que faz                        |
| --------------- | -------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento      |
| `npm run build` | Gera a versão de produção        |
| `npm run start` | Roda a versão de produção        |
| `npm run lint`  | Verifica o código com ESLint     |

---

## Estrutura do projeto

```
portfolio/
├── app/
│   ├── globals.css      # Tema: cores, fonte e estilos globais
│   ├── layout.tsx       # Layout raiz: fonte, metadados e menu
│   └── page.tsx         # Página inicial (terminal + destaques)
├── components/
│   ├── Header.tsx       # Menu de navegação em formato de caminho
│   └── Terminal.tsx     # Terminal interativo da home
└── data/
    └── projects.ts      # Lista de projetos e seus tipos
```

---

## Parte por parte

### 1. Tema visual (`app/globals.css`)

O visual imita um monitor CRT antigo: texto âmbar sobre fundo azul-tinta. As cores são definidas como tokens do Tailwind v4 dentro de `@theme`, o que gera automaticamente classes como `bg-panel`, `text-amber` e `border-line`.

| Token    | Cor       | Uso                          |
| -------- | --------- | ---------------------------- |
| `ink`    | `#0d1321` | Fundo da página              |
| `panel`  | `#141c2e` | Janela do terminal           |
| `line`   | `#24304a` | Bordas e divisórias          |
| `text`   | `#d7dce2` | Texto principal              |
| `muted`  | `#7a859b` | Texto secundário             |
| `amber`  | `#ffb000` | Prompt, cursor e destaques   |
| `cyan`   | `#5ec4d6` | Links e caminhos             |
| `red`    | `#ff6b6b` | Mensagens de erro            |

Para mudar o visual do site inteiro, basta alterar os valores hexadecimais aqui.

### 2. Layout raiz (`app/layout.tsx`)

Envolve todas as páginas. Responsável por:

- Carregar a fonte **IBM Plex Mono** com `next/font/google` (sem requisição externa no navegador) e expô-la como a variável CSS `--font-plex-mono`.
- Definir os metadados de SEO. O `template` faz cada página ter o título no formato `Projetos | Pablo Teodoro`.
- Renderizar o `Header` e centralizar o conteúdo em uma coluna de no máximo `max-w-4xl`.

### 3. Menu (`components/Header.tsx`)

Os links aparecem como caminhos de pasta (`~/sobre`, `~/projetos`, `~/contato`). É um Client Component porque usa `usePathname()` para saber em qual página o visitante está e destacar o link ativo em ciano. O link ativo também recebe `aria-current="page"` para leitores de tela.

### 4. Terminal interativo (`components/Terminal.tsx`)

O destaque do site. Já começa mostrando a saída do comando `whoami` e aceita:

| Comando       | Resultado                                  |
| ------------- | ------------------------------------------ |
| `help`        | Lista os comandos disponíveis              |
| `whoami`      | Mostra a apresentação                      |
| `ls`          | Lista os projetos com links                |
| `cd <pasta>`  | Navega para `sobre`, `projetos` ou `contato` |
| `clear`       | Limpa o terminal                           |

Como funciona:

- `lines` guarda o histórico exibido na tela (entradas e saídas).
- `execute()` recebe o texto digitado e devolve o que deve ser exibido. Para criar um comando novo, adicione um `case` nesse `switch`.
- `history` e `historyIndex` permitem navegar pelos comandos anteriores com as setas ↑ e ↓, como num terminal real.
- O `cd` usa `router.push()` do Next para trocar de página sem recarregar.
- Clicar em qualquer ponto da janela foca o campo de digitação.
- A área de saída tem `aria-live="polite"` para que leitores de tela anunciem as respostas.

### 5. Página inicial (`app/page.tsx`)

Mostra o terminal e, abaixo dele, a lista de projetos em destaque (os que têm `featured: true`). Essa lista existe para quem prefere clicar em vez de digitar, como recrutadores com pouco tempo.

### 6. Dados dos projetos (`data/projects.ts`)

Todos os projetos ficam em um único array tipado, sem banco de dados. O terminal (`ls`) e a página inicial leem daqui.

Para adicionar um projeto, inclua um objeto no array:

```ts
{
  slug: "nome-do-projeto",          // usado na URL: /projetos/nome-do-projeto
  title: "Nome do Projeto",
  summary: "Uma frase sobre o que ele resolve.",
  category: "web",                  // "web" ou "software"
  stack: ["Next.js", "TypeScript"],
  year: 2026,
  repoUrl: "https://github.com/...", // opcional
  demoUrl: "https://...",            // opcional
  featured: true,                    // opcional: aparece nos destaques
}
```

---

## Próximos passos

- [ ] Página de detalhe do projeto (`/projetos/[slug]`)
- [ ] Página de listagem com filtro web/software (`/projetos`)
- [ ] Página Sobre (`/sobre`)
- [ ] Página de contato com formulário (`/contato`)
- [ ] SEO e imagem de compartilhamento (Open Graph)
- [ ] Deploy na Vercel
