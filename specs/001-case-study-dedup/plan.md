# Implementation Plan: Página base compartilhada para estudos de caso

**Branch**: `work-sction-refactor` | **Date**: 2026-11-05 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-case-study-dedup/spec.md`

## Summary

Substituir as cinco páginas completas de estudo de caso por uma única página base,
`work/case.html`, que contém o conteúdo dos cinco casos no HTML estático (português) e a
estrutura comum uma só vez. Um script clássico lê `?case=<slug>`, exibe apenas o caso pedido,
atualiza título/canonical/Open Graph e encaminha identificador ausente ou desconhecido para
`404.html`. Sem JavaScript, todos os casos permanecem legíveis em português. O inglês continua
vindo de `assets/js/i18n.js`. As URLs antigas `work/<slug>.html` são removidas sem
redirecionamento, e listagem, timeline, sitemap e metadados passam a usar as URLs consolidadas.

## Technical Context

**Language/Version**: HTML5, CSS, JavaScript clássico compatível com ES5 (sem módulos ES)

**Primary Dependencies**: nenhuma em runtime; Node 22 apenas para os scripts de verificação, `npx html-validate@9` e Playwright para capturas locais

**Storage**: arquivos estáticos; nenhum armazenamento novo (o `localStorage` existente guarda apenas `site.lang`)

**Testing**: `check-i18n.mjs`, `check-site.mjs --root . --allow-missing assets/cv/`, `html-validate@9`, `shots.mjs` (incluindo a matriz dos casos)

**Target Platform**: GitHub Pages e abertura direta por `file://`; navegadores modernos, com conteúdo funcional sem JavaScript

**Project Type**: site estático de página única por documento, sem build

**Performance Goals**: nenhuma requisição adicional; a página consolidada é o único documento novo e o conteúdo já está no HTML, sem busca em runtime

**Constraints**: zero build e zero `npm install` no caminho de publicação; links relativos; scripts clássicos; `?v=` incrementado em todas as páginas que carregam arquivos alterados; sitemap parte da entrega; tema claro único

**Scale/Scope**: 5 estudos de caso, 2 idiomas, 4 páginas HTML após a refatoração (`index.html`, `work/index.html`, `work/case.html`, `404.html`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Situação | Como o plano cumpre |
|-----------|----------|---------------------|
| I. Zero-Build, Zero-Dependency Runtime | PASS | A página base é HTML/CSS/JS escritos à mão e commitados; nenhum bundler, gerador ou dependência entra na publicação |
| II. Português Primeiro, Tradução Completa | PASS | O conteúdo em português fica no HTML da página base; o inglês continua em `SITE_I18N`; `check-i18n.mjs` continua obrigatório e cobre todas as chaves |
| III. Funciona Sem JavaScript e a partir de `file://` | PASS | Todos os cinco casos ficam no HTML estático; a seleção por `?case=` é aprimoramento; scripts clássicos e links relativos preservam `file://` |
| IV. Fonte Única de Verdade Para Conteúdo | PASS | Cabeçalho, navegação e rodapé existem uma vez; cada caso tem uma definição em português (HTML) e uma em inglês (dicionário); papel/período/resumo continuam em `exp.<slug>.*` |
| V. CI É o Portão de Publicação | PASS | O plano inclui os três checks do workflow, `shots.mjs`, atualização do sitemap e incremento de `?v=` |

Nenhuma violação exige justificativa; a tabela de Complexity Tracking fica vazia.

Reavaliação pós-design (Fase 1): os cinco gates continuam PASS. As decisões registradas em
`research.md`, `data-model.md` e `contracts/case-page.md` não introduzem build, dependência de
runtime, `fetch`, módulo ES ou conteúdo que exista apenas depois de JavaScript.

## Project Structure

### Documentation (this feature)

```text
specs/001-case-study-dedup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── case-page.md     # Phase 1 output: URL, DOM, metadata and no-JS contracts
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
index.html                    # timeline da home; links dos 3 casos exibidos
work/
├── index.html                # listagem; links para case.html?case=<slug>
├── case.html                 # NOVO: página base com os 5 casos e a estrutura comum
├── grupo-bemol.html          # REMOVIDO
├── banco-bv.html             # REMOVIDO
├── digio.html                # REMOVIDO
├── mobyan.html               # REMOVIDO
└── oruspay.html              # REMOVIDO
assets/
├── css/
│   ├── styles.css            # regras de visibilidade/seleção; bump de ?v=
│   └── print.css             # ajuste de impressão se necessário; bump de ?v=
└── js/
    ├── i18n.js               # dicionários existentes; chaves de caso reaproveitadas
    └── main.js               # seleção do caso, metadados e integração com o idioma; bump de ?v=
sitemap.xml                   # 5 URLs consolidadas; URLs antigas removidas
.github/scripts/shots.mjs     # matriz de capturas incluindo work/case.html
```

**Structure Decision**: projeto estático plano já existente; a única página nova é
`work/case.html`. Nenhum diretório novo de runtime é criado. A seleção e os metadados entram em
`assets/js/main.js`, que já é carregado por todas as páginas de conteúdo, para não introduzir um
script adicional nem duplicar a lógica de idioma.

## Complexity Tracking

Nenhuma violação constitucional. Sem complexidade adicional a justificar.
