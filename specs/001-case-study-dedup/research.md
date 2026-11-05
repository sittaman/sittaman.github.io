# Research: Página base compartilhada para estudos de caso

**Feature**: `specs/001-case-study-dedup/spec.md`
**Date**: 2026-11-05

## Decisões

### 1. Composição em runtime, em um único documento estático

**Decision**: `work/case.html` contém os cinco casos no HTML estático, em português, e a
estrutura comum uma única vez. JavaScript apenas alterna qual seção fica visível.

**Rationale**: é a única forma de eliminar as cinco cópias completas sem introduzir passo de
build (princípio I) e mantendo o conteúdo legível sem JavaScript (princípio III). Como todo o
conteúdo já está no documento, `file://` continua funcionando e não há `fetch` de fragmentos.

**Alternatives considered**:
- Manter uma página completa por caso — é a duplicação que a feature elimina.
- Gerar as páginas em tempo de commit — viola zero-build.
- Carregar fragmentos via `fetch` — bloqueado em `file://` e deixaria o conteúdo dependente de JS.
- Um servidor ou rewrites — GitHub Pages é estático e sem regras de servidor.

### 2. Roteamento por `?case=<slug>`

**Decision**: a página base é `work/case.html` e o caso é identificado por `?case=<slug>`. O
parâmetro `lang` existente é combinado na mesma URL (`?case=digio&lang=en`).

**Rationale**: decisão registrada na spec (Q1/B). `URLSearchParams` já é usado pelo script de
idioma, e a URL consolidada pode ser listada no sitemap e apontada por canonical.

**Alternatives considered**:
- URLs antigas por arquivo — rejeitada na clarificação; seriam cópias de página.
- Fragmento `#slug` — rejeitado; fragmento não é uma URL indexável separada.

### 3. Sem JavaScript, todos os casos visíveis

**Decision**: as seções dos casos nascem visíveis no HTML. O esconderijo só é aplicado quando o
JavaScript roda; sem script, o visitante lê os cinco casos em sequência, em português.

**Rationale**: cumpre o princípio III e a decisão Q2/A. Não há como ler o parâmetro `case` sem
JavaScript em um documento estático servido por GitHub Pages.

**Alternatives considered**:
- Exibir apenas um aviso sem JavaScript — rejeitada na clarificação.
- Duplicar o conteúdo em `<noscript>` — não evita a duplicação que a feature elimina.

### 4. Chaves de i18n existentes, sem um segundo registro de conteúdo

**Decision**: o HTML da página base usa as mesmas chaves `case.<slug>.*` e `exp.<slug>.*` de
hoje. Listas continuam em `data-i18n-list`; os trechos do Mobyan que já são HTML continuam em
`data-i18n-html`. Os `data-slug` das seções são a lista de identificadores válidos — não é criado
um array de casos em JavaScript.

**Rationale**: evita uma terceira cópia do conteúdo e mantém `check-i18n.mjs` cobrindo cada
chave. A validação contra o DOM elimina o risco de o registro e as seções divergirem.

**Alternatives considered**:
- Registrar os casos em um array JS — criaria uma segunda lista de slugs e chaves para manter.
- Mover o conteúdo PT para o dicionário — violaria o princípio II (PT no HTML e no dicionário
  `pt-BR`) e deixaria a página vazia sem JS.

### 5. Metadados por caso atualizados no documento

**Decision**: ao selecionar um caso, o script atualiza `document.title`, `meta[name=description]`,
`link[rel=canonical]`, `og:title`, `og:description`, `og:url` e o locale, lendo as chaves
`case.<slug>.meta.title|description`. A troca de idioma reaplica esses valores. O HTML estático
mantém os metadados genéricos da página de estudos de caso.

**Rationale**: um único documento estático não pode ter cinco títulos/canonicals simultâneos. A
atualização em JS preserva a identificação do caso para o visitante com JavaScript, como exige a
spec; sem JS restam os metadados genéricos, já registrados nas premissas.

**Alternatives considered**:
- Cinco meta tags no mesmo documento — inválido e ambíguo.
- Manter metadados por caso apenas no HTML antigo — exigiria as páginas que estão sendo removidas.

### 6. `404.html` apenas quando o JavaScript pode validar o identificador

**Decision**: com JavaScript e `case` ausente ou fora da lista de `data-slug`, o script faz
`location.replace()` para `../404.html` antes de revelar conteúdo. Sem JavaScript, a página mostra
todos os casos e não tenta adivinhar o identificador.

**Rationale**: decisão Q1 registrada na spec e coerente com Q2/A. Não há como detectar um
parâmetro inválido sem execução de script em um documento estático.

**Alternatives considered**:
- Redirecionar no servidor — indisponível no GitHub Pages.
- Renderizar o 404 dentro de `case.html` — duplicaria a página de erro.

### 7. Anti-flash da seleção

**Decision**: estender o padrão já usado para o idioma: um pequeno script no `<head>` marca a
página como pendente quando há JavaScript e um caso a selecionar; o CSS esconde as seções nesse
estado; `main.js` revela a seção correta e remove a marca. Um temporizador de segurança remove a
marca se o script principal não concluir. Sem JS, a marca nunca é aplicada.

**Rationale**: evita o flash dos cinco casos antes da seleção sem esconder conteúdo de quem não
executa scripts. O site já usa exatamente essa técnica para `data-i18n-pending`.

**Alternatives considered**:
- Não usar anti-flash — exibiria todos os casos por um instante.
- Esconder via `display:none` no CSS global — esconderia o conteúdo sem JS.

### 8. URLs antigas, links internos e sitemap

**Decision**: remover os cinco arquivos `work/<slug>.html` sem redirecionamento; atualizar os
links da home e da listagem para `work/case.html?case=<slug>`; substituir as cinco URLs do
sitemap pelas URLs consolidadas; canonical por caso aponta para a URL consolidada.

**Rationale**: decisão registrada na spec (remoção da exigência de encaminhamento). O GitHub Pages
não oferece redirecionamentos sem páginas extras, que reintroduziriam duplicação.

**Alternatives considered**:
- Páginas de stub com meta refresh — pequenas, mas ainda são cinco arquivos a manter e a spec
  removeu a exigência.
- Manter as URLs antigas como canônicas — impediria a página base única.

### 9. Verificação

**Decision**: rodar os três gates do workflow mais `shots.mjs`; estender as capturas para a matriz
dos cinco casos × pt/en × desktop/mobile e acrescentar verificações manuais de: sem JavaScript,
JavaScript desabilitado em `file://`, `?case` inválido, combinação `case`+`lang`, canonical e
título por caso, impressão.

**Rationale**: o harness atual cobre apenas a home e valida `#hero-title`; a página de caso tem
outra estrutura e precisa de asserção própria. A constituição exige as capturas para mudanças de
layout.

**Alternatives considered**:
- Capturas manuais sem atualizar o script — não reproduzível e não cobre a matriz.

## Unknowns

Nenhum `NEEDS CLARIFICATION` restante. As decisões de URL e de comportamento sem JavaScript foram
resolvidas na spec.
