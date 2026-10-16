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

Para o formulário de contato enviar e-mails, copie `.env.example` para `.env.local` e preencha as variáveis (veja a parte 9). Sem elas o site funciona normalmente, mas o formulário avisa que o envio está indisponível.

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
│   ├── contato/
│   │   ├── actions.ts   # Server Action que valida e envia a mensagem
│   │   └── page.tsx     # Redes sociais e formulário de contato
│   ├── globals.css      # Tema: cores, fonte e estilos globais
│   ├── layout.tsx       # Layout raiz: fonte, metadados e menu
│   ├── page.tsx         # Página inicial (terminal + destaques)
│   ├── projetos/
│   │   └── page.tsx     # Listagem de projetos com filtro
│   └── sobre/
│       └── page.tsx     # Apresentação, formação e habilidades
├── components/
│   ├── ContactForm.tsx  # Formulário de contato (useActionState)
│   ├── Header.tsx       # Menu de navegação em formato de caminho
│   ├── ProjectFilter.tsx # Filtro web/software e lista de projetos
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

Os links aparecem como caminhos de pasta (`~/sobre`, `~/projetos`, `~/contato`). É um Client Component porque usa `usePathname()` para saber em qual página o visitante está e destacar o link ativo em ciano. O link ativo também recebe `aria-current="page"` para leitores de tela. O nome `pablo@portfolio`, no início do menu, também é um link que volta para a página inicial.

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

A lista reúne os repositórios públicos de [github.com/pabloteodoro](https://github.com/pabloteodoro), do mais recente ao mais antigo. Ficaram de fora repositórios privados, forks e exercícios pequenos. Os resumos foram escritos a partir do README e do código de cada repositório.

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

### 7. Listagem de projetos (`app/projetos/page.tsx`)

Mostra todos os projetos de `data/projects.ts`, com filtro por tipo. A página é um Server Component estático; só o filtro (`components/ProjectFilter.tsx`) é Client Component, porque guarda o tipo escolhido em estado.

- Os botões `--todos`, `--web` e `--software` mostram quantos projetos há em cada tipo e usam `aria-pressed` para indicar o filtro ativo.
- Cada projeto mostra ano, tipo, resumo, stack e links para o código e, quando existir, a versão online.
- A linha `$ ls projetos/ --tipo=web` muda junto com o filtro e é anunciada por leitores de tela (`aria-live`).

### 8. Página Sobre (`app/sobre/page.tsx`)

Server Component estático dividido em "arquivos" de terminal: `cat sobre-mim.txt` (apresentação), `cat formacao.txt` (faculdade, certificação AWS e idiomas) e `ls habilidades/` (tecnologias por área). Cada seção usa `aria-labelledby` apontando para o próprio título. Para atualizar as habilidades, edite o array `skills` no topo do arquivo.

### 9. Contato (`app/contato/page.tsx`)

Mostra os links do GitHub e do LinkedIn e um formulário com nome, e-mail e mensagem.

- `components/ContactForm.tsx` é Client Component e usa `useActionState` do React para chamar a Server Action, mostrar o estado de envio e exibir erros por campo (`aria-invalid` e `aria-describedby`). Se der erro, o que a pessoa digitou é mantido.
- `app/contato/actions.ts` roda só no servidor: valida os campos, descarta envios de robôs (campo invisível `website`) e envia o e-mail pela API REST do [Resend](https://resend.com), sem dependência extra. O e-mail chega com `reply_to` apontando para o visitante, então basta responder.

Variáveis de ambiente (em `.env.local` localmente e nas configurações do projeto na Vercel):

| Variável             | Obrigatória | Para que serve                                                |
| -------------------- | ----------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`     | sim         | Chave da API do Resend                                        |
| `CONTACT_TO_EMAIL`   | sim         | E-mail que recebe as mensagens                                |
| `CONTACT_FROM_EMAIL` | não         | Remetente; precisa ser de um domínio verificado no Resend. Padrão: `onboarding@resend.dev` (só entrega para o e-mail da sua conta Resend) |

---

## Próximos passos

- [ ] Página de detalhe do projeto (`/projetos/[slug]`)
- [x] Página de listagem com filtro web/software (`/projetos`)
- [x] Página Sobre (`/sobre`)
- [x] Página de contato com formulário (`/contato`)
- [ ] SEO e imagem de compartilhamento (Open Graph)
- [ ] Deploy na Vercel
