# sittaman.github.io Constitution

## Core Principles

### I. Zero-Build, Zero-Dependency Runtime (NON-NEGOTIABLE)

A aplicação entregue é HTML, CSS e JavaScript escritos à mão e commitados como estão. Nenhum
framework, bundler, transpilador ou passo de build pode ser introduzido no caminho de publicação.
`npm install` é proibido neste repositório: `upload-pages-artifact` descarta dotfiles mas não
`node_modules`, então a dependência instalada seria publicada. Ferramentas auxiliares rodam via
`npx` ou como `.mjs` sem dependências. Rationale: o site é o artefato; qualquer build vira
infraestrutura a manter e um estado onde fonte e publicação podem divergir.

### II. Português Primeiro, Tradução Completa (NON-NEGOTIABLE)

Toda página é escrita em português no markup, e os dicionários de `assets/js/i18n.js` só
transformam *a partir* desse estado — nunca o inverso. Uma string nova exige o texto em PT no HTML
**e** no dicionário `pt-BR`, mais o equivalente em `en`, na mesma mudança.
`node .github/scripts/check-i18n.mjs` MUST passar; dicionários divergentes bloqueiam o deploy.
Rationale: visitante sem JavaScript e qualquer crawler que leia o HTML cru recebem uma página
portuguesa completa.

### III. Funciona Sem JavaScript e a Partir de file:// (NON-NEGOTIABLE)

Links entre páginas são relativos (`../assets/…`, `work/digio.html`); caminhos absolutos a partir
da raiz são proibidos. Scripts são clássicos (`<script src>`), não módulos ES, e os dicionários são
JavaScript inline, não JSON buscado em runtime. O conteúdo principal MUST permanecer legível com
JavaScript desabilitado e ao abrir `index.html` por `file://`. Aprimoramentos dependem de JS apenas
para progressão, nunca para o conteúdo existir. Rationale: `file://` bloqueia `fetch` e módulos; o
requisito mantém a página inspecionável localmente sem servidor.

### IV. Fonte Única de Verdade Para Conteúdo

Cada dado aparece uma vez e é lido de lá. Papel e período de um projeto vivem em
`exp.<slug>.role` / `.start` / `.end`; o resumo é `exp.<slug>.summary`, compartilhado pela timeline
da home e pelo card de `/work`. Case studies são transcritos de `~/Documents/cv/Project showcase
PT.md` e `Project showcase EN.md` — os dois arquivos são a fonte; não se inventa seção que a fonte
não tem. Listagens do site são sempre decrescentes (mais recente primeiro), mesmo que a fonte
esteja em ordem ascendente. Rationale: duplicar conteúdo garante divergência silenciosa entre
página, card e meta tags.

### V. CI É o Portão de Publicação

Push em `main` dispara `.github/workflows/deploy.yml`, que roda `check-i18n.mjs`,
`check-site.mjs --root . --allow-missing assets/cv/` e `npx html-validate@9` e só publica se os
três passarem. Toda mudança MUST ser verificada localmente com os mesmos comandos antes do push;
"o CI pega" não é plano de verificação. Mudanças de layout ou de CSS MUST passar por
`node .github/scripts/shots.mjs` (matriz desktop/mobile × pt/en, falha em overflow horizontal e em
flag de anti-flash esquecida). Rationale: sem build, os checks são a única barreira entre um link
quebrado ou uma tradução faltando e produção.

## Technical Constraints

- Hospedagem: GitHub Pages, deploy por Actions, branch `main` como única origem de publicação.
- `Cache-Control` é fixado em `max-age=600` pela Pages e não há hash de conteúdo: ao editar CSS ou
  JS, o `?v=` MUST ser incrementado em **todas** as páginas que carregam o arquivo, não só na
  editada.
- `sitemap.xml` é parte da entrega: uma URL nova (case study) MUST ser adicionada lá.
- O site é light-only por decisão de design; não existe `data-theme` nem toggle.
- A chave de idioma no `localStorage` é namespaced (`site.lang`), porque todo projeto sob
  `sittaman.github.io` compartilha uma origem.
- Nenhum diretório existe só para abrigar um `index.html`; uma página é plana até precisar de
  assets próprios.
- `.htmlvalidate.json` desabilita `no-redundant-role` de propósito (Safari perde semântica de lista
  com `list-style: none`). Desabilitar outras regras exige justificativa documentada no README.
- Adicionar um case study toca cinco lugares: `work/<slug>.html`, `work/index.html`,
  `index.html` (só se entrar na timeline da home), `assets/js/i18n.js` (ambos os dicionários) e
  `sitemap.xml`.

## Development Workflow & Quality Gates

- Trabalho acontece em branch própria com baseline revisável; `main` recebe apenas o que passou
  pelos gates.
- Antes do push: `check-i18n.mjs`, `check-site.mjs`, `html-validate`. Mudança visual: `shots.mjs`
  com o servidor local em `127.0.0.1:8080` (não `localhost`).
- Revisão de mudança verifica: paridade PT/EN, links e âncoras resolvidos, `?v=` incrementado nas
  páginas afetadas, sitemap atualizado quando há URL nova, sem regressão em `file://`.
- Mudanças de conteúdo derivam dos arquivos-fonte do CV; divergência entre site e fonte é bug do
  site.

## Governance

A constituição prevalece sobre práticas e preferências locais; código e conteúdo que a contradigam
MUST ser corrigidos ou a constituição emendada. Emendas exigem justificativa escrita, aprovação do
mantenedor (Felipe Sitta) e atualização de versão em conjunto com o texto. Versionamento
semântico: MAJOR para remoção ou redefinição incompatível de princípio, MINOR para princípio ou
seção nova, PATCH para esclarecimento sem mudança de sentido. Toda revisão de mudança MUST
verificar conformidade com os princípios; complexidade que viole o Princípio I é rejeitada mesmo que
funcione. Datas em ISO `YYYY-MM-DD`.

**Version**: 1.0.0 | **Ratified**: 2026-10-27 | **Last Amended**: 2026-10-27
