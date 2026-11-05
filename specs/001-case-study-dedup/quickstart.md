# Quickstart: validar a página base dos estudos de caso

**Feature**: `specs/001-case-study-dedup/spec.md`

## Prerequisites

- Node.js 22.
- Chrome instalado (`google-chrome`) para `make-icons.mjs`/capturas.
- Playwright disponível para `shots.mjs` (por padrão em
  `/home/sittaman/workspace/career-ops/node_modules/playwright`, ou via `PW`).
- Servidor local em `127.0.0.1:8080` (não usar `localhost`, conforme a constituição).

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Manter o servidor rodando durante toda a verificação.

## Automated checks

```bash
node .github/scripts/check-i18n.mjs
node .github/scripts/check-site.mjs --root . --allow-missing assets/cv/
npx --yes html-validate@9 $(find . -name '*.html' -not -path './node_modules/*' -not -path './shots/*')
node .github/scripts/shots.mjs http://127.0.0.1:8080/work/case.html?case=digio
```

Expected: `i18n: OK`, `site: OK`, nenhum erro do html-validate e `shots: OK` para a matriz
configurada. Avisos de CV ausente continuam aceitáveis.

## Manual validation scenarios

1. **Caso válido** — abrir `http://127.0.0.1:8080/work/case.html?case=digio`.
   Expected: apenas o Digio visível; cabeçalho, navegação, seletor de idioma, botão de retorno e
   rodapé presentes uma vez; título e canonical do Digio; os outros quatro casos ausentes.
2. **Segundo caso** — abrir `?case=mobyan`.
   Expected: somente Mobyan; as seções de contexto/escopo aparecem como prosa (HTML), não como
   lista; nenhuma seção vazia.
3. **Idioma** — no caso Digio, alternar para EN.
   Expected: todo o conteúdo, rótulos, título e meta description em inglês; URL passa a
   `?case=digio&lang=en`; o caso permanece o mesmo.
4. **Idioma na entrada** — abrir `?case=digio&lang=en` em uma janela nova.
   Expected: abre direto em inglês, sem piscar em português.
5. **Identificador inválido** — abrir `?case=nao-existe` com JavaScript habilitado.
   Expected: redireciona para `/404.html`; nunca mostra outro caso.
6. **Sem JavaScript** — desabilitar JS e abrir `work/case.html` (com ou sem `case`).
   Expected: os cinco casos visíveis em português, com títulos e seções completos; links e
   navegação presentes.
7. **`file://`** — abrir `work/case.html?case=grupo-bemol` diretamente do disco.
   Expected: o caso aparece; o seletor de idioma funciona (sem `history.replaceState`); nenhuma
   requisição bloqueada.
8. **URL antiga** — abrir `work/digio.html`.
   Expected: 404 (GitHub Pages) ou erro de arquivo inexistente local; não há redirecionamento.
9. **Listagem e home** — abrir `/work/` e `/`.
   Expected: todos os links de caso apontam para `case.html?case=<slug>` (com `../` na home);
   papel, período e resumo continuam corretos.
10. **Sitemap e canonical** — conferir `sitemap.xml` e o canonical de cada caso.
    Expected: cinco URLs `work/case.html?case=<slug>` no sitemap; canonical correspondente ao caso
    selecionado com JavaScript.
11. **Impressão** — imprimir um caso selecionado.
    Expected: apenas o caso visível, sem sombras/blocos invertidos; nenhuma quebra de página
    introduzida pela página consolidada.
12. **Sem overflow** — conferir desktop 1440×900 e mobile 390×844.
    Expected: `document.documentElement.scrollWidth <= window.innerWidth` em todos os casos e
    idiomas.

## Gate before push

- Os três comandos do workflow passam.
- `shots.mjs` cobre a matriz dos cinco casos × pt/en × desktop/mobile sem overflow, sem
  `PENDING-FLAG-LEFT-ON` e sem regressão visual.
- `?v=` incrementado nas páginas que carregam cada arquivo alterado.
- `sitemap.xml` atualizado.
- Revisão manual dos 12 cenários acima.
