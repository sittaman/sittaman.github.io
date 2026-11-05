# Tasks: Página base compartilhada para estudos de caso

**Input**: Design documents from `/specs/001-case-study-dedup/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/case-page.md, quickstart.md

**Tests**: não solicitados como TDD. A verificação usa os gates existentes (`check-i18n.mjs`,
`check-site.mjs`, `html-validate`) e os cenários de `quickstart.md`.

**Organization**: tarefas agrupadas por história de usuário para permitir entrega incremental.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência de tarefa incompleta)
- **[Story]**: US1, US2 ou US3
- Todo task inclui caminho de arquivo exato

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: confirmar o baseline e o inventário de conteúdo antes de tocar no código.

- [X] T001 [P] Conferir o inventário de seções e tipos (`list` vs `html`) de `work/grupo-bemol.html`, `work/banco-bv.html`, `work/digio.html`, `work/mobyan.html` e `work/oruspay.html` contra `specs/001-case-study-dedup/data-model.md`; registrar divergências.
- [X] T002 [P] Rodar o baseline dos gates (`node .github/scripts/check-i18n.mjs`, `node .github/scripts/check-site.mjs --root . --allow-missing assets/cv/`, `npx --yes html-validate@9 $(find . -name '*.html' -not -path './node_modules/*' -not -path './shots/*')`) e guardar a saída.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: criar a página consolidada, migrar o conteúdo e remover as cópias completas. Nenhuma história começa antes disso.

**⚠️ CRITICAL**: T003–T008 bloqueiam todas as histórias.

- [X] T003 Criar `work/case.html` com o shell compartilhado: `<head>` com `work.meta.*` genérico e canonical `https://sittaman.github.io/work/case.html`; header, nav, seletor de idioma, link de retorno, `<main>` e rodapé uma única vez; links relativos `../assets/...`; carregar `i18n.js`, `main.js`, `styles.css` e `print.css` com os `?v=` atuais.
- [X] T004 Migrar os cinco casos para `work/case.html` como `[data-case-study][data-slug]` com ids `case-title-<slug>` únicos: Grupo Bemol (context/scope/results), Banco BV (context/scope/impact), Digio (context/scope/contrib/results/wrong), Mobyan (context/scope em `data-i18n-html`; contrib/results/wrong em `data-i18n-list`) e Oruspay (context/scope/results). Preservar o texto PT, a ordem e um único bloco final "Ver todos os estudos de caso".
- [X] T005 [P] Atualizar os cinco links de `work/index.html` para `case.html?case=<slug>` (grupo-bemol, banco-bv, digio, mobyan, oruspay).
- [X] T006 [P] Atualizar os três links da timeline de `index.html` para `work/case.html?case=<slug>` (grupo-bemol, banco-bv, digio).
- [X] T007 [P] Substituir em `sitemap.xml` as cinco URLs `work/<slug>.html` por `https://sittaman.github.io/work/case.html?case=<slug>` e atualizar `<lastmod>`.
- [X] T008 Remover `work/grupo-bemol.html`, `work/banco-bv.html`, `work/digio.html`, `work/mobyan.html` e `work/oruspay.html` depois de confirmar que T004–T006 não deixaram referências pendentes.

**Checkpoint**: `work/case.html` contém os cinco casos e é o único destino; a listagem, a home e o sitemap apontam para ele.

---

## Phase 3: User Story 1 - Editar um estudo de caso em um único lugar (Priority: P1) 🎯 MVP

**Goal**: cada caso tem uma definição de conteúdo; alterar um texto uma vez reflete na página publicada.

**Independent Test**: alterar um parágrafo em `work/case.html` e um valor em `assets/js/i18n.js`, confirmar que só o caso correspondente muda e que não existe outra cópia da página inteira.

### Implementation for User Story 1

- [X] T009 [US1] Comparar o texto PT de cada seção em `work/case.html` com `git show HEAD:work/<slug>.html` e corrigir qualquer perda, reordenação ou seção faltante em `work/case.html`.
- [X] T010 [US1] Rodar `node .github/scripts/check-i18n.mjs` e garantir que todas as chaves `case.<slug>.*` e `exp.<slug>.*` usadas em `work/case.html` existem nos dois idiomas com o tipo correto; ajustar `assets/js/i18n.js` somente se houver divergência real.
- [X] T011 [US1] Executar o teste de fonte única: editar um texto PT em `work/case.html` e um valor EN em `assets/js/i18n.js`, verificar a mudança no caso correto e reverter as edições.

**Checkpoint**: nenhuma cópia completa de estudo de caso permanece no repositório; o conteúdo PT/EN vem de um lugar por idioma.

---

## Phase 4: User Story 2 - Visitar um estudo de caso pelo link publicado (Priority: P1)

**Goal**: abrir `case.html?case=<slug>`, ver somente o caso correto, alternar idioma e ter metadados e 404 corretos.

**Independent Test**: abrir os cinco casos em pt/en, conferir conteúdo exclusivo, título/canonical/OG, `?case=invalido` → `404.html`, sem JavaScript → cinco casos, e ausência de overflow.

### Implementation for User Story 2

- [X] T012 [US2] Implementar em `assets/js/main.js` a seleção por `?case`: ler `URLSearchParams`, validar contra `[data-case-study][data-slug]`, marcar `hidden` nas seções não selecionadas, revelar a escolhida, remover a marca de pendência e encaminhar `case` ausente/desconhecido para `../404.html`.
- [X] T013 [US2] Implementar em `assets/js/main.js` os metadados por caso: `document.title`, `meta[name=description]`, `link[rel=canonical]`, `og:title`, `og:description`, `og:url` e locale a partir de `case.<slug>.meta.title|description`; reaplicar em `setLanguage()` sem perder `?case`.
- [X] T014 [P] [US2] Adicionar em `assets/css/styles.css` a regra de anti-flash/ocultação usada pela seleção, com fallback `noscript` e `[hidden]`; ajustar `assets/css/print.css` se o caso selecionado imprimir mais de uma seção.
- [X] T015 [P] [US2] Estender `.github/scripts/shots.mjs` para aceitar `work/case.html?case=<slug>`, cobrir 5 casos × pt/en × desktop/mobile e validar título do caso, ausência de `PENDING-FLAG-LEFT-ON` e overflow horizontal.
- [X] T016 [US2] Incrementar `?v=` em todas as páginas afetadas: `assets/js/main.js?v=4` para `?v=5` em `index.html`, `work/index.html` e `work/case.html`; `styles.css?v=9` para `?v=10` em `index.html`, `work/index.html`, `work/case.html` e `404.html`; `print.css?v=6` para `?v=7` em `index.html`, `work/index.html` e `work/case.html` se o arquivo mudar; `i18n.js` só se alterado.
- [X] T017 [US2] Executar os cenários 1–5, 7, 9–12 de `specs/001-case-study-dedup/quickstart.md` com o servidor em `127.0.0.1:8080` e corrigir regressões em `work/case.html`, `assets/js/main.js` ou `assets/css/styles.css`.

**Checkpoint**: visitante com JS vê um caso por URL, em pt/en, com metadados do caso; sem JS vê os cinco; `?case` inválido vai ao 404.

---

## Phase 5: User Story 3 - Publicar um novo estudo de caso sem copiar a página (Priority: P2)

**Goal**: adicionar um caso sem criar uma página completa, com seções opcionais e documentação de autoria.

**Independent Test**: adicionar um caso temporário apenas em `work/case.html`, `assets/js/i18n.js`, `work/index.html` e `sitemap.xml`; confirmar seleção, listagem e ausência de seções vazias; reverter.

### Implementation for User Story 3

- [X] T018 [US3] Auditar em `work/case.html` os casos sem todas as seções (Grupo Bemol, Banco BV e Oruspay): confirmar que não há `<h2>` vazio, lista vazia ou espaço reservado; corrigir apenas a marcação do caso afetado.
- [X] T019 [P] [US3] Reescrever em `README.md` a estrutura (`work/case.html` em vez de `work/<slug>.html`) e o passo a passo para adicionar um caso: seção em `work/case.html`, chaves PT/EN em `assets/js/i18n.js`, card em `work/index.html`, URL em `sitemap.xml`, bump de `?v=`.
- [X] T020 [US3] Fazer um dry-run de um sexto caso temporário (slug `teste`) em `work/case.html`, `assets/js/i18n.js`, `work/index.html` e `sitemap.xml`; verificar seleção, listagem e seções opcionais e reverter todas as edições do dry-run.

**Checkpoint**: publicar um caso novo não exige copiar a página; a documentação reflete o fluxo.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: fechar os gates, a documentação de governança e a revisão de duplicação.

- [X] T021 Rodar os três gates do workflow, `node .github/scripts/shots.mjs` na matriz completa e os 12 cenários de `specs/001-case-study-dedup/quickstart.md`; registrar resultados e corrigir falhas.
- [X] T022 [P] Fazer a revisão final no repositório: procurar referências a `work/<slug>.html`, `id="case-title"` duplicado, URLs antigas no `sitemap.xml`, `?v=` desatualizado e conteúdo que só exista via JavaScript; corrigir os arquivos encontrados.
- [X] T023 [P] Atualizar `.specify/memory/constitution.md` (Technical Constraints e Workflow) para refletir que um estudo de caso agora toca `work/case.html`, os dois dicionários, a listagem e o sitemap; registrar a mudança de versão e solicitar ratificação do usuário.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sem dependências; T001 e T002 podem rodar juntos.
- **Foundational (Phase 2)**: depende do Setup. T003 → T004; T005, T006 e T007 dependem de T004; T008 depende de T004–T006.
- **User Stories (Phase 3–5)**: dependem de T003–T008. Podem ser feitas em ordem de prioridade ou em paralelo.
- **Polish (Phase 6)**: depende de todas as histórias concluídas.

### User Story Dependencies

- **US1 (P1)**: depende apenas do Foundational; é o MVP.
- **US2 (P1)**: depende do Foundational; T013 depende de T012; T014 e T015 podem começar em paralelo; T016 depende de T012–T014; T017 depende de T016.
- **US3 (P2)**: depende do Foundational; T018 e T019 são paralelos; T020 depende de T018.

### Within Each User Story

- US1: T009 → T010 → T011 (T009/T010 podem tocar `work/case.html`, por isso não são paralelos).
- US2: seleção (T012) → metadados (T013) → versões (T016) → validação (T017); CSS (T014) e capturas (T015) podem ocorrer em paralelo.
- US3: auditoria (T018) → dry-run (T020); README (T019) em paralelo com T018.

### Parallel Opportunities

- Setup: T001, T002.
- Foundational: T005, T006, T007.
- US2: T014, T015.
- US3: T018, T019.
- Polish: T022, T023.

---

## Parallel Example: Foundational

```bash
# Depois de T004, atualizar os destinos em paralelo:
Task: "Atualizar links em work/index.html"
Task: "Atualizar links em index.html"
Task: "Atualizar sitemap.xml"
```

## Parallel Example: User Story 2

```bash
# Depois de T012, enquanto T013 avança em main.js:
Task: "Adicionar regras de anti-flash em assets/css/styles.css"
Task: "Estender .github/scripts/shots.mjs para a matriz dos casos"
```

## Parallel Example: User Story 3

```bash
Task: "Auditar seções opcionais em work/case.html"
Task: "Reescrever o fluxo de autoria em README.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Setup e Foundational (T001–T008).
2. Completar US1 (T009–T011).
3. **PARAR e VALIDAR**: sem JavaScript, `work/case.html` exibe os cinco casos completos; listagem, home e sitemap apontam para a página consolidada; nenhuma cópia de página inteira existe.
4. Nesse ponto a duplicação já foi eliminada, mas `?case` ainda não seleciona e metadados/404 ainda não existem.

### Incremental Delivery

1. Foundational + US1 → conteúdo consolidado (MVP).
2. US2 → seleção, idioma, metadados, 404 e capturas (entrega pública completa).
3. US3 → documentação e prova de que um caso novo não exige página nova.
4. Polish → gates, revisão e constituição.

### Parallel Team Strategy

Com mais de uma pessoa: Foundational em sequência; depois US1, US2 e US3 podem seguir em paralelo. US2 é a maior e deve começar cedo; US3 depende apenas do Foundational.

---

## Notes

- `[P]` = arquivos diferentes, sem dependência de tarefa incompleta.
- A página consolidada deve permanecer 100% legível sem JavaScript; a seleção é aprimoramento.
- Nenhum passo de build ou `npm install` pode entrar no fluxo.
- Verificar `git diff` antes de remover as páginas antigas.
- Fazer commit por grupo lógico; não commitar o dry-run de T020.
