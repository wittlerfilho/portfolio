# wittler — portfólio

Portfólio visual da marca **wittler** (landing pages autorais), convertido de uma página HTML única para um projeto **Next.js (App Router) + TypeScript**. Nesta etapa não há backend, banco de dados, autenticação nem integrações externas: é só o front-end.

## Requisitos

- **Node.js 20.9 ou superior** (desenvolvido e testado com Node 22; há um `.nvmrc`)
- npm (vem com o Node)

## Instalação e execução

```bash
# 1. entrar na pasta do projeto (depois de extrair o .zip em Downloads)
cd ~/Downloads/wittler-portfolio        # Windows (PowerShell): cd $HOME\Downloads\wittler-portfolio

# 2. instalar as dependências
npm install

# 3. rodar em desenvolvimento → http://localhost:3000
npm run dev
```

Para abrir no VS Code: `code .` (dentro da pasta).

### Outros scripts

| Comando             | O que faz                                      |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | servidor de desenvolvimento                    |
| `npm run build`     | build de produção                              |
| `npm start`         | serve o build de produção (rode `build` antes) |
| `npm run lint`      | ESLint (`eslint-config-next` + TypeScript)     |
| `npm run typecheck` | checagem de tipos com `tsc`                    |

## Antes de publicar: preencha seus links

O WhatsApp e o GitHub do rodapé ainda são **placeholders**, como no protótipo. Crie um `.env.local` (não vai para o Git) a partir do exemplo:

```bash
cp .env.example .env.local     # Windows: copy .env.example .env.local
```

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5562900000000     # 55 + DDD + número, só dígitos
NEXT_PUBLIC_GITHUB_URL=https://github.com/seu-usuario
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com  # usado em canonical, sitemap e Open Graph
```

A mensagem pré-preenchida do WhatsApp fica em `lib/site.ts`.

## Iniciar o repositório Git e subir para o GitHub

```bash
git init
git add .
git commit -m "feat: portfólio wittler em Next.js"
git branch -M main
```

Crie um repositório **vazio** no GitHub (sem README/.gitignore) e conecte:

```bash
git remote add origin https://github.com/SEU-USUARIO/wittler-portfolio.git
git push -u origin main
```

O `.gitignore` já ignora `node_modules`, `.next`, `.env*.local` e arquivos de sistema/editor.

## Estrutura

```
app/
  layout.tsx        metadata/SEO, fontes, filtros SVG, skip-link
  page.tsx          composição da página
  globals.css       CSS autoral do protótipo (preservado) + Tailwind v4
  icon.svg · robots.ts · sitemap.ts
components/
  layout/           Header (nav + menu mobile), Footer
  sections/         Hero, Marquee, Works, Process, Services, Contact
  effects/          Loader, SmoothScroll (Lenis), ScrollEngine (parallax), Reveal, BoilFilters, PageProvider
hooks/              useInView, useScramble
lib/site.ts         textos, projetos, serviços, links (conteúdo em um só lugar)
public/angel.webp   gravura do anjo (extraída do protótipo)
```

## Decisões da conversão

- **CSS preservado.** O CSS do protótipo foi levado para `globals.css` sem reescrever regras; o design continua dirigido por ele. O Tailwind v4 está instalado e carregado **sem o preflight** (o reset dele alteraria o visual aprovado), então fica disponível para novos componentes.
- **Fontes autohospedadas** (`@fontsource`: Instrument Serif, Newsreader, DM Mono) no lugar do link do Google Fonts: sem requisição externa e funciona offline.
- **Rolagem suave (Lenis).** `components/effects/SmoothScroll.tsx` suaviza a roda do mouse e anima os links `#âncora` (o `scroll-behavior: smooth` global foi removido). O scroll continua nativo (`window.scrollY`), então `sticky`, `ScrollEngine` e `IntersectionObserver` seguem iguais. O `Loader` trava/destrava o Lenis via `lib/scroll-lock.ts`. Com `prefers-reduced-motion` o Lenis nem é iniciado.
- **Scroll mais leve.** A matemática do parallax é a mesma do protótipo, mas o loop de `requestAnimationFrame` só roda enquanto há movimento (antes rodava o tempo todo). O mesmo vale para a prévia dos projetos que segue o cursor.
- **Acessibilidade.** Skip-link, `aria-current` na navegação, `aria-expanded` no menu, foco visível, `<noscript>` que mostra o conteúdo sem JavaScript, e `prefers-reduced-motion` respeitado (como antes).
- **Toque nos projetos.** No protótipo, o foco gerado pelo próprio toque abria a prévia e o clique em seguida a fechava. Agora o foco por toque é ignorado e o toque abre/fecha a prévia. Teclado e mouse seguem como antes.
- A imagem usa `next/image` com `unoptimized` para manter os pixels idênticos aos do protótipo (o arquivo já é um WebP leve).
