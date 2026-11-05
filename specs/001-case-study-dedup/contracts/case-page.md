# Contract: Página consolidada de estudos de caso

**Feature**: `specs/001-case-study-dedup/spec.md`

## URL contract

| Request | Behavior |
|---------|----------|
| `work/case.html?case=<slug>` | Exibe somente o caso `<slug>` quando há JavaScript; atualiza título/canonical/OG para o caso |
| `work/case.html?case=<slug>&lang=en` | Mesmo comportamento, já em inglês, sem flash de português |
| `work/case.html` ou `?case=<slug-inexistente>` | Com JavaScript: encaminha para `404.html`. Sem JavaScript: exibe os cinco casos em português |
| `work/<slug>.html` | Não existe mais; não há redirecionamento. GitHub Pages responde 404 |
| `work/case.html?case=<slug>` sem JavaScript | Exibe os cinco casos em português; o parâmetro não seleciona nada |

Slugs válidos: `grupo-bemol`, `banco-bv`, `digio`, `mobyan`, `oruspay`.

O parâmetro `lang` continua sendo estado de visualização (`pt-BR`/`en`), não uma URL separada; o
sitemap lista a URL consolidada sem `lang`.

## Metadata contract

No modo `selected`:

- `document.title` = `SITE_I18N[lang]['case.<slug>.meta.title']`
- `meta[name=description]` = `SITE_I18N[lang]['case.<slug>.meta.description']`
- `link[rel=canonical]` e `og:url` = `https://sittaman.github.io/work/case.html?case=<slug>`
- `og:title` / `og:description` = mesmas chaves do título/descrição
- `og:locale` reflete o idioma atual
- A imagem de compartilhamento continua `https://sittaman.github.io/assets/img/og-cover.png`

Sem JavaScript, permanecem os metadados genéricos da página de estudos de caso (`work.meta.*`).

## DOM contract

- Cada caso é uma seção `[data-case-study][data-slug="<slug>"]` dentro de `<main>`.
- O título de cada caso tem `id="case-title-<slug>"`; a seção referencia esse id em
  `aria-labelledby`.
- A estrutura comum (header, nav, seletor de idioma, link de retorno, rodapé) existe uma vez.
- O atributo `hidden` é o único mecanismo de ocultação aplicado pelo script; sem JS nenhuma seção
  nasce oculta.
- A ordem das seções no HTML é a ordem editorial da listagem.

## i18n contract

- Títulos, papéis, períodos e resumos usam as chaves existentes `case.<slug>.*` e `exp.<slug>.*`.
- Rótulos de seção usam as chaves compartilhadas `case.context`, `case.scope`, `case.contrib`,
  `case.results`, `case.impact`, `case.wrong`.
- `case.mobyan.context` e `case.mobyan.scope` são strings HTML (`data-i18n-html`); as demais
  seções são arrays (`data-i18n-list`).
- Nenhuma chave nova é obrigatória; se alguma for criada, precisa existir nos dois idiomas e
  `check-i18n.mjs` deve passar.

## Versioning and cache contract

- `assets/js/main.js` alterado: incrementar `?v=` em todas as páginas que o carregam.
- `assets/css/styles.css` ou `print.css` alterados: incrementar `?v=` em todas as páginas que os
  carregam, incluindo `404.html`.
- `assets/js/i18n.js` só precisa de bump se o arquivo mudar.

## Sitemap contract

- `sitemap.xml` lista `https://sittaman.github.io/work/case.html?case=<slug>` para os cinco casos.
- As URLs antigas `work/<slug>.html` não aparecem no sitemap.
- `/work/` continua listado.
