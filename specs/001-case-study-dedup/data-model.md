# Data Model: Página base compartilhada para estudos de caso

**Feature**: `specs/001-case-study-dedup/spec.md`
**Date**: 2026-11-05

## Entities

### CaseStudy

Representa um estudo de caso publicado na página base.

| Field | Type | Source | Rules |
|-------|------|--------|-------|
| `slug` | string | `data-slug` da seção | `^[a-z0-9-]+$`; único entre os casos |
| `displayName` | string | texto do `<h1>` | igual em pt/en; não vazio |
| `titleId` | string | `id` do `<h1>` | `case-title-<slug>`; único no documento |
| `roleKey` | string | `exp.<slug>.role` | string em ambos os idiomas |
| `start`/`end` | date + keys | `<time datetime>` e `exp.<slug>.start|end` | `datetime` em `YYYY-MM`; rótulos traduzidos |
| `seoTitleKey` | string | `case.<slug>.meta.title` | string em ambos os idiomas |
| `seoDescriptionKey` | string | `case.<slug>.meta.description` | string em ambos os idiomas |
| `sections` | Section[] | markup da seção | apenas as seções existentes no caso |

Casos publicados, na ordem editorial da listagem:

| Slug | Nome | Seções | Tipos |
|------|------|--------|-------|
| `grupo-bemol` | Grupo Bemol | context, scope, results | listas |
| `banco-bv` | Banco BV | context, scope, impact | listas |
| `digio` | Digio | context, scope, contrib, results, wrong | listas |
| `mobyan` | Mobyan | context, scope, contrib, results, wrong | context/scope em HTML; demais listas |
| `oruspay` | Oruspay | context, scope, results | listas |

### Section

| Field | Type | Source | Rules |
|-------|------|--------|-------|
| `key` | string | `case.<slug>.<section>` | mesma chave nos dois idiomas |
| `labelKey` | string | `case.context`, `case.scope`, `case.contrib`, `case.results`, `case.impact`, `case.wrong` | traduzida no dicionário |
| `shape` | `list` ou `html` | atributo `data-i18n-list`, `data-i18n-list-html` ou `data-i18n-html` | precisa bater com o tipo da chave em todos os idiomas |
| `optional` | boolean | presença do bloco no caso | se ausente, nenhum título ou espaço é renderizado |

Regra: um caso pode ter qualquer subconjunto das seções; a presença do bloco no HTML é a
autoridade. Não há seção vazia publicada.

### BasePage

| Field | Type | Source | Rules |
|-------|------|--------|-------|
| `lang` | `pt-BR` ou `en` | `<html lang>` / dicionário | decidido antes do primeiro paint pelo script existente |
| `selectedSlug` | string ou nulo | parâmetro `case` | nulo quando ausente |
| `mode` | `selected`, `all-no-js`, `not-found` | execução ou ausência de JS | `selected` mostra um caso; `all-no-js` mostra os cinco; `not-found` encaminha ao 404 |
| `sharedShell` | header, nav, lang switch, footer | HTML da página base | existe uma única vez |
| `canonical` | URL | `link[rel=canonical]` | `https://sittaman.github.io/work/case.html?case=<slug>` no modo `selected`; URL genérica sem JS |

### ListingEntry

| Field | Type | Source | Rules |
|-------|------|--------|-------|
| `slug` | string | card da listagem | link `case.html?case=<slug>` (ou `work/case.html?...` na home) |
| `roleKey` / `startKey` / `endKey` / `summaryKey` | string | `exp.<slug>.*` | mesmas chaves da timeline da home |

## Relationships

- `BasePage 1 ── * CaseStudy` — a página contém todos os casos; no máximo um fica visível com JS.
- `CaseStudy 1 ── * Section` — cada seção pertence a exatamente um caso.
- `ListingEntry * ── 1 CaseStudy` — listagem e timeline referenciam o mesmo `slug` e as mesmas
  chaves `exp.<slug>.*`.
- `CaseStudy 1 ── 1 SeoMetadata` — título/descrição/canonical derivados de `case.<slug>.meta.*`.

## Validation Rules

- `slug` deve casar com `^[a-z0-9-]+$`, ser único no documento e existir em `data-slug`.
- Todo `id` de título deve ser ``case-title-<slug>`` e único no documento (substitui o
  `id="case-title"` repetido das páginas antigas).
- Toda chave usada no HTML deve existir em `pt-BR` e `en`, com o mesmo tipo
  (`check-i18n.mjs`).
- Chaves usadas com `data-i18n-list` devem ser arrays em ambos os idiomas; chaves em HTML devem
  ser strings.
- `case` ausente ou desconhecido: com JS, `not-found`; sem JS, `all-no-js`, sem erro na página.
- Metadados por caso são obrigatórios no modo `selected`.
- Nenhuma seção opcional ausente pode gerar título vazio, lista vazia ou espaço reservado.
- Um caso visível por vez no modo `selected`; todos visíveis no modo `all-no-js`.

## State Transitions

| Estado inicial | Evento | Próximo estado |
|----------------|--------|----------------|
| Página carregada sem JS | — | `all-no-js` (5 casos em pt) |
| Página carregada com JS e `case` válido | seleção | `selected` (1 caso, metadados do caso) |
| Página carregada com JS e `case` ausente/inválido | validação | `not-found` → `404.html` |
| `selected` | troca de idioma | `selected` reaplicado no novo idioma, `?case` preservado |
| `selected` | recarregar/voltar/avançar | recalcula `selected` a partir da URL |
| `all-no-js` | — | permanece; a troca de idioma não funciona sem JS (comportamento atual) |
