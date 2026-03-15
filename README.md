# ByteCraft (React + TypeScript + Vite)

Landing page com tema claro/escuro, rotas (`/`, `/contato`) e UI moderna com Tailwind.

## Requisitos

- Node.js 20 LTS (recomendado) ou 18+
- npm (já vem com Node)

Para checar:

```bash
node -v
npm -v
```

## Passo a passo (VSCode, Cursor, WebStorm, etc.)

1) Abra o projeto na sua IDE

- VSCode/Cursor: `File → Open Folder...` e selecione a pasta do projeto.

2) Instale as dependências

```bash
npm install
```

3) Rode o servidor de desenvolvimento

```bash
npm run dev
```

4) Abra no navegador

- Normalmente: `http://localhost:5173/`
- O botão de tema (header) alterna entre claro/escuro.

## Scripts

- Desenvolvimento: `npm run dev`
- Build de produção: `npm run build`
- Preview do build (após o build): `npm run preview`
- Testes: `npm test`
- Lint: `npm run lint`
- Checagem TS (sem gerar build): `npm run check`

## Estrutura (visão rápida)

- `src/pages/Home.tsx`: página principal
- `src/pages/Contact.tsx`: página de contato (formulário via `mailto:`)
- `src/pages/home/*`: seções da Home
- `src/components/*`: componentes compartilhados

## Solução de problemas comuns

- Porta `5173` ocupada: rode em outra porta

```bash
npm run dev -- --port 5174
```

- Erro de versão do Node/Vite: atualize para Node 20 LTS.
- Problemas com caminhos longos no Windows/OneDrive: mova o projeto para um caminho mais curto (ex.: `C:\\dev\\bytecraft`).
- Após trocar de branch ou apagar `node_modules`: rode `npm install` novamente.

## Observações de Git

Arquivos/pastas locais como `.trae/` e `.vercel/` estão no `.gitignore`.

## Deploy no GitHub Pages

Este repo já inclui um workflow que faz build e publica no GitHub Pages automaticamente.

1) No GitHub, vá em `Settings → Pages`
2) Em `Build and deployment`, selecione `Source: GitHub Actions`
3) Faça um push na branch `main`

A URL fica neste formato:

- `https://stalisson-pereira.github.io/byteCraft/`

Se aparecer tela branca, normalmente é porque o projeto foi buildado com `base` errado (assets tentando carregar de `/assets/...` ao invés de `/<nome-do-repo>/assets/...`). Neste projeto, o `base` para GitHub Pages é calculado automaticamente a partir do nome do repositório no GitHub Actions.

Checklist rápido (tela branca):

1) Confirme que o Pages está usando GitHub Actions (não “Deploy from a branch”)

- `Settings → Pages → Build and deployment → Source: GitHub Actions`

2) Confirme que o workflow de deploy rodou

- `Actions → Deploy to GitHub Pages` (último run precisa estar verde)

3) Veja o HTML gerado (View Source) e procure por:

- Se aparecer `src="/src/main.tsx"`, você está servindo o código fonte (não o build). Ajuste o Pages para GitHub Actions.
- Se aparecer `src="/<nome-do-repo>/assets/..."` e mesmo assim estiver branco, abra o Console (F12) e procure por 404 em `/assets/...` ou erros de “Failed to load module script”.
