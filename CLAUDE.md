# Portfólio do Pablo Teodoro

Site pessoal com portfólio de projetos web e software, com visual de terminal. A home é um terminal interativo (comandos `help`, `whoami`, `ls`, `cd`, `clear`).

## Stack

- Next.js (App Router, sem pasta `src/`) + React + TypeScript
- Tailwind CSS v4 (tokens definidos com `@theme` em `app/globals.css`, sem `tailwind.config`)
- Fonte única: IBM Plex Mono via `next/font/google`
- Projetos ficam em `data/projects.ts` (array tipado, sem banco de dados)
- Deploy planejado na Vercel

## Estrutura

- `app/` rotas (cada pasta vira uma rota). Layout raiz em `app/layout.tsx`.
- `components/` componentes reutilizáveis (`Header.tsx`, `Terminal.tsx`, `ProjectFilter.tsx`, `ContactForm.tsx`).
- `app/contato/actions.ts` Server Action do formulário; envia pelo Resend via `fetch` e lê `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` (definidas em `.env.local`, que não é versionado).
- `data/projects.ts` tipo `Project` e lista de projetos.
- `public/` imagens estáticas (prints dos projetos vão em `public/projetos/`).

## Identidade visual

Fósforo âmbar de monitor CRT sobre azul-tinta. Use sempre os tokens, nunca hex soltos:

| Token | Hex | Uso |
| --- | --- | --- |
| `ink` | `#0d1321` | fundo |
| `panel` | `#141c2e` | janelas/painéis |
| `line` | `#24304a` | bordas |
| `text` | `#d7dce2` | texto principal |
| `muted` | `#7a859b` | texto secundário |
| `amber` | `#ffb000` | prompt, cursor, destaques |
| `cyan` | `#5ec4d6` | links e caminhos |
| `red` | `#ff6b6b` | erros |

Navegação e títulos usam a metáfora de terminal (`~/projetos`, `$ cat arquivo.txt`). Evite cards arredondados genéricos, gradientes e animações em excesso.

## Convenções

- Textos do site e da documentação em português do Brasil.
- Componentes com `"use client"` só quando precisam de estado, eventos ou hooks de navegação.
- Acessibilidade: foco visível, `aria-*` onde fizer sentido, respeitar `prefers-reduced-motion`.
- Antes de commitar, rode `npm run lint` e `npm run build` e corrija os erros.

## Git e documentação

- Repositório: https://github.com/pabloteodoro/portfolio (branch `main`).
- Um commit por parte, em português, no padrão Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `style:`, `refactor:`.
- Toda funcionalidade nova atualiza a seção correspondente do `README.md` no mesmo commit (seção "Parte por parte" e checklist "Próximos passos").
- Nunca rode `npm audit fix --force`.
- Atenção: a pasta pessoal do usuário (`~`) é outro repositório Git (ligado ao EcommerceAWS). Sempre confirme com `git rev-parse --show-toplevel` que está em `~/Documentos/portfolio` antes de commitar.

## Próximos passos

Já feitos: `/projetos` (com filtro), `/projetos/[slug]`, `/sobre` e `/contato`.

1. Enriquecer as páginas de projeto com estudo de caso (problema, solução, prints em `public/projetos/`)
2. SEO e Open Graph
3. Deploy na Vercel (configurar as variáveis do Resend)
