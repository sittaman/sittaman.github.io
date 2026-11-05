# Feature Specification: Página base compartilhada para estudos de caso

**Feature Branch**: `work-section-refactor (sem branch de feature criada)`

**Created**: 2026-11-05

**Status**: Draft

**Input**: User description: "refatorar seção de case studies (work) para evitar duplicação. criar uma pagina base com cada case-study sendo injetado ao invés de existir uma cópia da pagina inteira para cada um"

## Clarifications

### Session 2026-11-05

- Q: Um identificador de caso inexistente ou ausente deve levar a quê? → A: Ao `404.html`.
- Q: As URLs antigas (`work/<slug>.html`) devem continuar encaminhando para a página consolidada? → A: Não; a exigência de encaminhamento foi removida.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Editar um estudo de caso em um único lugar (Priority: P1)

Como mantenedor do site, quero que o conteúdo de cada estudo de caso exista em uma única definição, para corrigir ou atualizar um texto uma vez e ter a mudança refletida na página publicada sem procurar cópias.

**Why this priority**: a duplicação atual permite que duas cópias do mesmo texto divirjam silenciosamente; eliminar isso é o objetivo central da refatoração.

**Independent Test**: alterar um trecho da definição de um caso e confirmar que a página daquele caso exibe o novo texto sem nenhuma outra edição de conteúdo.

**Acceptance Scenarios**:

1. **Given** um estudo de caso com conteúdo definido em um único local, **When** o mantenedor altera um trecho desse conteúdo, **Then** a página do caso passa a exibir o novo texto e nenhum outro caso é afetado.
2. **Given** dois idiomas publicados, **When** o mantenedor altera o texto em português e sua tradução, **Then** as duas versões da mesma página exibem os textos correspondentes sem edição em páginas separadas.

---

### User Story 2 - Visitar um estudo de caso pelo link publicado (Priority: P1)

Como visitante, quero abrir qualquer estudo de caso pela URL publicada e ver o mesmo conteúdo, estrutura, navegação e alternância de idioma de hoje.

**Why this priority**: a refatoração não pode regredir a experiência pública nem quebrar metadados ou indexação.

**Independent Test**: abrir cada uma das cinco URLs consolidadas de estudo de caso e comparar conteúdo, navegação, idioma e metadados com a versão atual.

**Acceptance Scenarios**:

1. **Given** um link para um estudo de caso publicado, **When** o visitante o abre, **Then** vê o cabeçalho, a navegação, o seletor de idioma, o conteúdo do caso correto, o link de retorno e o rodapé na mesma disposição atual.
2. **Given** uma página de estudo de caso aberta, **When** o visitante alterna entre português e inglês, **Then** todo o conteúdo do caso e os metadados da página passam ao idioma escolhido sem sair da página.
3. **Given** uma página de estudo de caso, **When** o visitante confere título, descrição e imagem de compartilhamento, **Then** eles identificam o caso exibido, não outro caso nem o índice.

---

### User Story 3 - Publicar um novo estudo de caso sem copiar a página (Priority: P2)

Como mantenedor do site, quero adicionar um novo estudo de caso definindo apenas o seu conteúdo e os seus dados, sem criar uma cópia inteira da página, para que o custo de publicar não cresça com a quantidade de casos.

**Why this priority**: reduz o esforço de manutenção futura e evita que novos casos reintroduzam a duplicação.

**Independent Test**: adicionar um caso fictício usando somente a definição compartilhada e confirmar que ele aparece na listagem e pode ser aberto, sem duplicar a estrutura da página.

**Acceptance Scenarios**:

1. **Given** a página base e a fonte única de conteúdo, **When** um novo caso é definido, **Then** ele pode ser acessado pela URL consolidada com o seu identificador e aparece na listagem de estudos de caso.
2. **Given** um caso sem seções opcionais, **When** sua página é exibida, **Then** apenas as seções que existem para aquele caso aparecem, sem títulos vazios nem espaços reservados.

---

### Edge Cases

- Um identificador de caso inexistente ou ausente deve levar ao `404.html`, nunca ao conteúdo de outro caso; sem JavaScript, prevalece a apresentação de todos os casos descrita em FR-007.
- Casos com conjuntos diferentes de seções (por exemplo, sem "Contribuições destacadas" ou sem "O que deu errado") devem render somente o que está definido.
- A primeira visita em inglês, inclusive com `?lang=en`, deve exibir o caso já em inglês, sem mostrar o texto em português antes da troca.
- A combinação do identificador do caso com o idioma na mesma URL (`?case=<slug>&lang=en`) deve abrir o caso correto já em inglês.
- Um acesso direto com âncora, recarregamento e uso do botão voltar do navegador deve continuar levando ao caso correto.
- Sem JavaScript, a página consolidada deve apresentar todos os estudos de caso de forma legível, já que o identificador do caso não pode ser lido do endereço.
- A impressão da página deve manter o comportamento atual, sem blocos invertidos ou sombras.
- O acesso por `file://` deve continuar possível para o conteúdo que já funciona nesse modo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Cada estudo de caso MUST ter uma única definição de conteúdo; nenhuma página pode manter uma cópia própria do texto do caso.
- **FR-002**: Uma página base compartilhada MUST selecionar e apresentar o estudo de caso correspondente ao endereço acessado.
- **FR-003**: A estrutura comum da página (cabeçalho, navegação, seletor de idioma, link de retorno, rodapé e metadados estruturais) MUST existir uma única vez na página base, não em cada caso.
- **FR-004**: A página base MUST ser servida em `work/case.html` e identificar o caso pelo parâmetro `case`; quando a seleção por caso está ativa, um identificador ausente ou desconhecido MUST levar ao `404.html`.
- **FR-005**: Quando um único estudo de caso está selecionado, título do documento, descrição, URL canônica, Open Graph, Twitter Card e texto alternativo da imagem MUST corresponder a esse caso.
- **FR-006**: A alternância português/inglês MUST atualizar o conteúdo do caso, os rótulos da estrutura e os metadados na mesma página, sem navegação para outra URL e preservando o identificador do caso.
- **FR-007**: Com JavaScript desabilitado, a página consolidada MUST manter legível o conteúdo completo dos estudos de caso, apresentando todos os casos em sequência; nenhum texto de caso pode existir apenas após a execução de script.
- **FR-008**: Seções opcionais MUST ser exibidas apenas quando definidas para o caso, sem títulos ou espaços vazios.
- **FR-009**: A listagem de estudos de caso e a timeline da home MUST continuar exibindo papel, período e resumo a partir da mesma fonte única do caso.
- **FR-010**: A aparência visual, a navegação por teclado, os estados de foco e o comportamento de impressão MUST permanecer equivalentes aos atuais.
- **FR-011**: Adicionar ou remover um estudo de caso MUST NOT exigir copiar ou editar a estrutura completa de uma página.
- **FR-012**: As verificações de links e âncoras, paridade de idiomas, HTML válido e capturas em desktop/mobile MUST continuar passando.
- **FR-013**: O sitemap MUST listar as URLs consolidadas de todos os casos publicados.

### Key Entities *(include if feature involves data)*

- **Estudo de caso**: identificador público, título, papel, período de início e fim, resumo, metadados de compartilhamento e conjunto de seções de conteúdo (contexto, escopo técnico, contribuições, resultados, o que deu errado), em português e inglês.
- **Página base**: estrutura visual e de navegação compartilhada por todos os estudos de caso.
- **Listagem de estudos de caso**: relação de casos publicados, com link, papel, período e resumo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Alterar qualquer texto de um estudo de caso exige edição em exatamente um local, e 100% das exibições daquele caso refletem a mudança após a publicação.
- **SC-002**: Nenhuma página de estudo de caso contém cópia da estrutura comum (cabeçalho, navegação, rodapé); a duplicação de marcação estrutural cai a zero entre os cinco casos.
- **SC-003**: 100% das URLs consolidadas abrem o caso esperado e, com a seleção por caso ativa, identificadores ausentes ou desconhecidos levam ao `404.html`.
- **SC-004**: As cinco páginas de estudo de caso preservam 100% do conteúdo textual atual, em português e inglês, sem perda nem reordenação de seções.
- **SC-005**: Publicar um novo estudo de caso exige no máximo uma definição de conteúdo, uma entrada na listagem e uma atualização de sitemap, sem criar uma página completa.
- **SC-006**: As verificações automatizadas do projeto passam sem falhas e a matriz de capturas (desktop/mobile × português/inglês, cinco casos) não apresenta overflow horizontal nem regressão visual.
- **SC-007**: Com JavaScript desabilitado, a página consolidada exibe o conteúdo completo dos cinco casos, legível e sem depender de interação.
- **SC-008**: Quando um caso está selecionado, título, descrição e imagem de compartilhamento correspondem a ele em 100% das URLs consolidadas.

## Assumptions

- A refatoração é interna: o conteúdo, a ordem das seções e a identidade visual publicados hoje não mudam.
- Os cinco estudos de caso existentes (Grupo Bemol, Banco BV, Digio, Mobyan e Oruspay) são a referência de paridade.
- O conteúdo continua derivado de `~/Documents/cv/Project showcase PT.md` e `Project showcase EN.md`; a fonte única no site é a definição por caso, não uma terceira cópia.
- O site permanece sem passo de build e sem dependências instaladas em tempo de publicação, conforme a constituição.
- Os links entre páginas continuam relativos e o conteúdo que hoje funciona por `file://` continua funcionando.
- Casos existentes podem ter conjuntos diferentes de seções; a definição de cada caso é a autoridade sobre quais seções existem.
- O sitemap continua sendo parte da entrega e passa a listar as URLs consolidadas (`work/case.html?case=<slug>`).
- A consolidação em `work/case.html?case=<slug>` foi escolhida explicitamente; as URLs antigas não são preservadas nem redirecionadas.
- O encaminhamento ao `404.html` depende da seleção por caso; sem JavaScript, a página consolidada mostra todos os casos e não há como detectar um identificador inválido.
- Como a página consolidada é um único documento, os metadados por caso são resolvidos quando o caso é selecionado; com JavaScript desabilitado, permanecem os metadados genéricos da página de estudos de caso.
- Sem JavaScript, a página consolidada mostra todos os casos em sequência; não há seleção por URL nesse modo.
- Nenhum redesenho de layout, tipografia ou cores faz parte desta refatoração.
