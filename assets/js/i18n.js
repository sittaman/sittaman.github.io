/* Visible copy for the portfolio, in both languages.
 *
 * This dictionary is AUTHOR-CONTROLLED content only. It is never user input, which is
 * what makes the `data-i18n-html` / `data-i18n-list-html` paths safe. If this file ever
 * starts carrying data from a form, a URL parameter or an API, those two paths must go.
 *
 * Keys are stable identifiers, never source text. `pt-BR` mirrors the copy authored
 * directly in the HTML, so a visitor without JS still gets a complete page.
 * `check-i18n.mjs` fails the build when the two languages disagree.
 *
 * `exp.<slug>.summary` does two jobs. For the three employers on the home timeline it is the
 * two-line brief, sized to wrap to exactly two lines at that width — measured, not guessed, and
 * a longer edit quietly becomes a third line that no check will catch. For the projects that
 * exist only as /work cards (banco-bv, grupo-bemol) the same key is the card text, where the card
 * sets the width and the line count is free.
 */
window.SITE_I18N = {

  'pt-BR': {
    'meta.title': 'Felipe Sitta — Desenvolvedor Sênior Flutter | Design Systems e IA',
    'meta.description': 'Desenvolvedor Sênior Flutter com 14 anos de experiência em mobile. Design Systems, arquitetura modular e IA aplicada ao desenvolvimento, em projetos financeiros para milhões de usuários.',

    'a11y.skip': 'Pular para o conteúdo',
    'a11y.navLabel': 'Seções',
    'a11y.socialLabel': 'Perfis',
    'a11y.langLegend': 'Idioma da página',
    'a11y.brand': 'Felipe Sitta — início',
    'a11y.themeToggle': 'Alternar tema',
    'a11y.themeToDark': 'Alternar para tema escuro',
    'a11y.themeToLight': 'Alternar para tema claro',
    'a11y.langChanged': 'Idioma alterado para português.',
    'a11y.newTab': 'abre em nova aba',

    'nav.about': 'Sobre',
    'nav.skills': 'Skills',
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',

    'hero.name': 'Felipe Sitta',
    'hero.tagline': 'Desenvolvedor Sênior Flutter — Design Systems e IA aplicada',
    'hero.lede': '14 anos de experiência em desenvolvimento de software, especialista em Flutter desde 2020. Atuação em projetos de alta complexidade nos setores financeiro e bancário — Carteira Digital, PIX e Cartões — para milhões de usuários.',
    'hero.availability': 'Aberto a posições sênior — remoto, híbrido ou presencial, Brasil',
    'hero.cvPt': 'Currículo <span class="btn-note">PDF · PT</span>',
    'hero.cvEn': 'Resume <span class="btn-note">PDF · EN</span>',
    'hero.ctaContact': 'Entrar em contato',

    'about.title': 'Sobre',
    'about.p1': 'Desenvolvedor com 14 anos de experiência em software e especialista Flutter desde 2020, atuando em projetos de alta complexidade nos setores financeiro e bancário. Perfil hands-on: estruturo requisitos, backlogs e roadmaps com governança cross-squad, lidero a adoção de tecnologias e atuo como referência técnica.',
    'about.p2': 'Meu trabalho se concentra em três frentes: arquitetura modular de aplicativos de grande porte, Design Systems com tokens e governança entre times, e a aplicação de IA ao próprio processo de desenvolvimento — skills customizados e integrações como o Figma MCP. Também sou responsável por cultura de testes, acessibilidade e pipelines de entrega contínua.',

    'skills.title': 'Competências',
    'skills.mobile': 'Mobile & Flutter',
    'skills.mobileList': ['Flutter (mobile e web)', 'Dart', 'Kotlin', 'Android nativo', 'iOS', 'Firebase'],
    'skills.arch': 'Arquitetura & Design System',
    'skills.archList': ['Clean Architecture', 'SOLID e KISS', 'Design Patterns', 'Design Systems com tokens', 'Widgetbook', 'Modularização e Melos', 'Offline-first (SQLite e NoSQL)', 'Acessibilidade (WCAG)'],
    'skills.testing': 'Testes & Entrega',
    'skills.testingList': ['TDD', 'Testes unitários e de integração', 'Widget tests', 'Maestro', 'Appium', 'Azure DevOps', 'Jenkins', 'Fastlane', 'GitFlow', 'Observabilidade e analytics'],
    'skills.state': 'Estado & Integrações',
    'skills.stateList': ['BloC e Cubit', 'MobX', 'GetX', 'ValueNotifier', 'REST API e BFF', 'Feature toggles', 'Google Maps e GPS', 'Biometria e câmera', 'Push e deep linking'],
    'skills.backend': 'Back-end, Cloud & IA',
    'skills.backendList': ['Java e Spring', 'Angular', 'AWS (Cognito, S3, SQS)', 'Docker e Kubernetes', 'Skills de IA e prompt engineering', 'Figma MCP'],

    'experience.title': 'Experiência',
    'experience.seeAll': 'Ver todos',

    'exp.spread.role': 'Desenvolvedor Sênior Flutter',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.summary': 'Banco digital com 150+ módulos Flutter — Carteira Digital, PIX e Cartões — para milhões de usuários. Design System, WCAG e skills de IA.',

    'exp.grupo-bemol.role': 'Desenvolvedor Sênior Flutter',
    'exp.grupo-bemol.start': 'Jan 2026',
    'exp.grupo-bemol.end': 'Jul 2026',
    'exp.grupo-bemol.summary': 'Carteira Digital e cadastro de cartões dentro do app existente do cliente, com integração Cielo e encapsulamento das exigências do fornecedor.',

    'exp.banco-bv.role': 'Desenvolvedor Sênior Flutter',
    'exp.banco-bv.start': 'Jun 2025',
    'exp.banco-bv.end': 'Dez 2025',
    'exp.banco-bv.summary': 'Flutter com 150+ módulos: Design System sob controle rígido de qualidade e acessibilidade, e uma biblioteca de front-end que gera telas e formulários dinâmicos.',

    'exp.digio.role': 'Desenvolvedor Sênior Flutter',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Fev 2025',
    'exp.digio.summary': 'Monólito Flutter Web sem testes transformado em sistema modularizado, com cobertura de 0 a 70%+ e TDD. Design System com Widgetbook.',

    'exp.mobyan.role': 'Desenvolvedor Sênior Mobile',
    'exp.mobyan.start': 'Mai 2023',
    'exp.mobyan.end': 'Mar 2024',
    'exp.mobyan.summary': 'Apps Flutter e Kotlin offline-first para manutenção de POS em campo. R$ 300K+/ano de economia e 2.000+ técnicos migrados.',

    'case.link': 'Leia o estudo de caso',
    'case.eyebrow': 'Estudo de caso',
    'case.back': 'Voltar',
    'case.allCases': 'Ver todos os estudos de caso',

    'work.title': 'Estudos de caso',
    'work.meta.title': 'Estudos de caso — Felipe Sitta',
    'work.meta.description': 'Estudos de caso de Felipe Sitta: arquitetura mobile, Design Systems e IA aplicada em projetos financeiros de grande porte.',

    'case.digio.meta.title': 'Digio — estudo de caso — Felipe Sitta',
    'case.digio.meta.description': 'Estudo de caso: Desenvolvedor Sênior Flutter na Digio, de março de 2024 a fevereiro de 2025.',
    'case.mobyan.meta.title': 'Mobyan — estudo de caso — Felipe Sitta',
    'case.mobyan.meta.description': 'Estudo de caso: Desenvolvedor Sênior Mobile na Mobyan, de maio de 2023 a março de 2024.',

    'case.grupo-bemol.meta.title': 'Grupo Bemol — estudo de caso — Felipe Sitta',
    'case.grupo-bemol.meta.description': 'Estudo de caso: Grupo Bemol, de janeiro a julho de 2026 — Carteira Digital em Flutter.',
    'case.banco-bv.meta.title': 'Banco BV — estudo de caso — Felipe Sitta',
    'case.banco-bv.meta.description': 'Estudo de caso: Banco BV, de junho a dezembro de 2025 — Design System e arquitetura modular em Flutter.',

    'case.linkAll': 'Ver estudos de caso',
    'case.context': 'Contexto',
    'case.scope': 'Escopo técnico',
    'case.contrib': 'Contribuições destacadas',
    'case.results': 'Resultados alcançados',
    'case.impact': 'Impacto e resultados alcançados',
    'case.wrong': 'O que deu errado',

    'case.grupo-bemol.context': [
      'Projeto desenvolvido em Flutter.',
      'Lançamento do produto Carteira Digital.',
      'Projeto legado robusto em processo de refatoração.',
      'Presença de muita duplicidade.',
      'Mudanças de regra de negócio e impedimentos relacionados ao novo produto ocorriam com frequência e demandavam rápida adaptação.',
      'Existiam limitações por parte de fornecedores externos.',
      'Uso intenso de ferramentas de IA (GitHub Copilot) para explicação de código e skills para novas funcionalidades, code review, testes unitários e commits.'
    ],
    'case.grupo-bemol.scope': [
      'O projeto consistia no desenvolvimento de um produto de Carteira Digital dentro do aplicativo já existente do cliente. A funcionalidade englobava o cadastro de cartões de crédito como forma de pagamento.',
      'Havia diversas questões de segurança e de uso de serviços externos, como Cielo, no que se refere à manipulação e ao armazenamento de dados de cartão de crédito, e esses pontos precisavam ser contemplados no desenvolvimento.',
      'O time de produto entregou um roadmap bastante superficial, que foi sendo ajustado quase diariamente à medida que novas demandas eram descobertas.'
    ],
    'case.grupo-bemol.results': [
      'Entrega do produto, com resposta rápida às mudanças e demandas conforme surgiam.',
      'Criação de uma biblioteca que encapsulava de forma transparente um processo importante com exigências específicas de um fornecedor.'
    ],

    'case.banco-bv.context': [
      'Projeto Flutter com alta modularização, com mais de 150 módulos.',
      'Alocação inicial na squad de Design System e, posteriormente, na squad de Cadastro Pessoa Física.'
    ],
    'case.banco-bv.scope': [
      'Novos desenvolvimentos no Design System passavam por um rígido controle de qualidade, incluindo demandas de acessibilidade.',
      'Havia grande preocupação com a criação de componentes genéricos, de modo a evitar duplicidade.',
      'Existia alta demanda de manutenção, desenvolvimento e customização de componentes.',
      'O processo de apresentação e defesa de GMUD era robusto.',
      'Uso de GitHub Copilot e Cursor para testes unitários e code review.'
    ],
    'case.banco-bv.impact': [
      'Elaboração de uma biblioteca de front-end que atuava como uma API para a criação de telas e formulários dinâmicos.',
      'O uso do contrato definido por essa biblioteca eliminava problemas de roteamento e dependências transversais entre módulos.'
    ],

    'case.digio.context': [
      'Projeto Flutter Web com arquitetura modularizada.',
      'Colaboração próxima com as equipes de desenvolvimento, arquitetura, qualidade, design e produto.'
    ],
    'case.digio.scope': [
      'O projeto era um monolito que havia passado por uma tentativa de modularização inacabada. Como resultado, encontrava-se em um estado intermediário, com muitos módulos desatualizados, redundantes e com duplicidade.',
      'Não havia cobertura de testes unitários.',
      'A squad não possuía líder técnico, o que tornava o refinamento de estórias técnicas um grande gargalo para todo o time.'
    ],
    'case.digio.contrib': [
      'Gestão de dependências e modularização com Melos.',
      'Implantação de feature toggles para ativação de funcionalidades em tempo real.',
      'Construção e padronização de Design System com Widgetbook.',
      'Aumento da maturidade de testes automatizados.',
      'Melhoria do processo de refinamento técnico e da comunicação com diversas áreas.',
      'Avanço no backlog de débitos técnicos.'
    ],
    'case.digio.results': [
      'Aumento da cobertura de testes de zero para mais de 70%.',
      'Desenvolvimento e padronização do Design System, bem como da documentação correspondente no Widgetbook.',
      'Avanço na modularização do sistema para gestão e implantação de novos módulos.',
      'Assunção da iniciativa de refinamento técnico das estórias, com maior assertividade nas estimativas e nas entregas. Houve melhora significativa nos indicadores da equipe e nas relações com UI/UX, produto e qualidade. A percepção do time dentro da empresa também mudou: deixou de ser uma squad problemática, constantemente atrasada, para se tornar um time adiantado a ponto de ficar ocioso no que dizia respeito às tarefas de front-end.'
    ],
    'case.digio.wrong': [
      'A relação com os times de agilidade e qualidade era desafiadora e poderia ter sido melhor cultivada.'
    ],

    'case.mobyan.context': '<p>Entre maio de 2023 e março de 2024, o projeto foi herdado de uma consultoria terceirizada. Havia falhas relevantes, como por exemplo, de banco de dados, gerencia de estado e autenticação, além de baixa aderência às regras de negócio do produto.</p><p>Tratava-se de um app de atendimento de ordens de serviço para manutenção e retirada de equipamentos de pagamento, como POS e dispositivos relacionados. O produto foi desenvolvido em Flutter, com diversas integrações nativas e arquitetura offline-first.</p><p>Também houve manutenção em uma ferramenta de checklist de manutenção desenvolvida em Kotlin, utilizando Room como banco de dados local.</p>',
    'case.mobyan.scope': '<p>O app incluía integrações com Google Maps, GPS, câmera, fingerprint e in-app updates, além do uso de SQLite e NoSQL, feature toggles, migrations, streams e multithreading.</p><p>Também houve desenvolvimento de CI/CD com Azure DevOps e Firebase.</p>',
    'case.mobyan.contrib': [
      'Desenvolvimento e manutenção de apps em Flutter e Kotlin.',
      'Implementação de melhorias como CI/CD, Design System e BFF.',
      'Trabalho com arquitetura offline-first, incluindo persistência local e sincronização.',
      'Evolução de capacidades ligadas à plataforma nativa Android, com foco em estabilidade e performance.'
    ],
    'case.mobyan.results': [
      'O cancelamento de visitas antes dependia de um formulário extenso e da comunicação com uma central em que o turnover era um grande problema. Esse fluxo foi substituído por um formulário simplificado no app, resultando em redução do turnover e economia direta de pelo menos R$ 300.000,00 anuais em custos operacionais da central.',
      'Os profissionais preferiam utilizar o aplicativo antigo, já que o novo projeto causava perdas de dados. A adoção de arquitetura offline-first resolveu os problemas de perda e sincronização e, em conjunto com a pipeline de publicação e atualização, viabilizou o lançamento e a adesão ao novo aplicativo.'
    ],
    'case.mobyan.wrong': [
      'A implementação de NoSQL se mostrou desnecessária. O app realizava o carregamento de tabelas extensas, e o problema foi resolvido com melhorias no código do banco de dados e com a implementação de Isolates para carregamento em background.'
    ],

    'projects.title': 'Projetos',
    'projects.companyTitle': 'Trabalhos em empresas',
    'projects.companyEmpty': 'Seleção de projetos profissionais em preparação.',
    'projects.personalTitle': 'Projetos pessoais',
    'projects.personalEmpty': 'Projetos pessoais em preparação. Enquanto isso, veja os repositórios no <a href="https://github.com/sittaman" rel="noopener" target="_blank">GitHub</a>.',

    'contact.title': 'Contato',
    'contact.lede': 'Aberto a conversas sobre posições sênior em mobile e Flutter, no Brasil ou remotas.',
    'contact.emailLabel': 'E-mail',
    'contact.email': 'E-mail',

    'footer.rights': '© 2026 Felipe Sitta',
    'footer.built': 'Feito à mão em HTML, CSS e JavaScript'
  },

  'en': {
    'meta.title': 'Felipe Sitta — Senior Flutter Developer | Design Systems & AI',
    'meta.description': 'Senior Flutter Developer with 14 years of mobile experience. Design Systems, modular architecture and AI applied to development, on financial projects serving millions of users.',

    'a11y.skip': 'Skip to content',
    'a11y.navLabel': 'Sections',
    'a11y.socialLabel': 'Profiles',
    'a11y.langLegend': 'Page language',
    'a11y.brand': 'Felipe Sitta — home',
    'a11y.themeToggle': 'Toggle theme',
    'a11y.themeToDark': 'Switch to dark theme',
    'a11y.themeToLight': 'Switch to light theme',
    'a11y.langChanged': 'Language changed to English.',
    'a11y.newTab': 'opens in a new tab',

    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.name': 'Felipe Sitta',
    'hero.tagline': 'Senior Flutter Developer — Design Systems and AI applied',
    'hero.lede': '14 years of software development experience and a Flutter specialist since 2020, working on highly complex projects in the financial and banking sectors — Digital Wallet, PIX and Cards — for millions of users.',
    'hero.availability': 'Open to senior roles — remote, hybrid or on-site, Brazil',
    'hero.cvPt': 'Resume in Portuguese <span class="btn-note">PDF · PT</span>',
    'hero.cvEn': 'Resume in English <span class="btn-note">PDF · EN</span>',
    'hero.ctaContact': 'Get in touch',

    'about.title': 'About',
    'about.p1': 'Software developer with 14 years of experience and a Flutter specialist since 2020, working on highly complex projects in the financial and banking sectors. Hands-on profile: I structure requirements, backlogs and roadmaps with cross-squad governance, lead technology adoption and act as a technical reference.',
    'about.p2': 'My work focuses on three fronts: modular architecture for large-scale applications, Design Systems with tokens and cross-team governance, and applying AI to the development process itself — custom skills and integrations such as Figma MCP. I am also responsible for testing culture, accessibility and continuous delivery pipelines.',

    'skills.title': 'Skills',
    'skills.mobile': 'Mobile & Flutter',
    'skills.mobileList': ['Flutter (mobile and web)', 'Dart', 'Kotlin', 'Native Android', 'iOS', 'Firebase'],
    'skills.arch': 'Architecture & Design Systems',
    'skills.archList': ['Clean Architecture', 'SOLID and KISS', 'Design Patterns', 'Design Systems with tokens', 'Widgetbook', 'Modularization and Melos', 'Offline-first (SQLite and NoSQL)', 'Accessibility (WCAG)'],
    'skills.testing': 'Testing & Delivery',
    'skills.testingList': ['TDD', 'Unit and integration tests', 'Widget tests', 'Maestro', 'Appium', 'Azure DevOps', 'Jenkins', 'Fastlane', 'GitFlow', 'Observability and analytics'],
    'skills.state': 'State & Integrations',
    'skills.stateList': ['BloC and Cubit', 'MobX', 'GetX', 'ValueNotifier', 'REST API and BFF', 'Feature toggles', 'Google Maps and GPS', 'Biometrics and camera', 'Push notifications and deep linking'],
    'skills.backend': 'Back-end, Cloud & AI',
    'skills.backendList': ['Java and Spring', 'Angular', 'AWS (Cognito, S3, SQS)', 'Docker and Kubernetes', 'AI skills and prompt engineering', 'Figma MCP'],

    'experience.title': 'Experience',
    'experience.seeAll': 'View all',

    'exp.spread.role': 'Senior Flutter Developer',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.summary': 'Digital banking across 150+ Flutter modules — Digital Wallet, PIX and Cards — for millions of users. Design System, WCAG and AI skills.',

    'exp.grupo-bemol.role': 'Senior Flutter Developer',
    'exp.grupo-bemol.start': 'Jan 2026',
    'exp.grupo-bemol.end': 'Jul 2026',
    'exp.grupo-bemol.summary': 'Digital Wallet and credit-card registration inside the client’s existing app, with Cielo integration and the vendor’s requirements encapsulated.',

    'exp.banco-bv.role': 'Senior Flutter Developer',
    'exp.banco-bv.start': 'Jun 2025',
    'exp.banco-bv.end': 'Dec 2025',
    'exp.banco-bv.summary': 'Flutter at 150+ modules: a Design System under strict quality and accessibility control, and a front-end library that generates dynamic screens and forms.',

    'exp.digio.role': 'Senior Flutter Developer',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Feb 2025',
    'exp.digio.summary': 'Untested Flutter Web monolith turned into a modularized, testable system — coverage 0 → 70%+ with TDD. Design System in Widgetbook.',

    'exp.mobyan.role': 'Senior Mobile Developer',
    'exp.mobyan.start': 'May 2023',
    'exp.mobyan.end': 'Mar 2024',
    'exp.mobyan.summary': 'Offline-first Flutter and Kotlin apps for field POS maintenance. R$ 300K+/year in savings and 2,000+ technicians migrated.',

    'case.link': 'Read the case study',
    'case.eyebrow': 'Case study',
    'case.back': 'Back',
    'case.allCases': 'See all case studies',

    'work.title': 'Case studies',
    'work.meta.title': 'Case studies — Felipe Sitta',
    'work.meta.description': 'Case studies by Felipe Sitta: mobile architecture, Design Systems and applied AI on large-scale financial projects.',

    'case.digio.meta.title': 'Digio — case study — Felipe Sitta',
    'case.digio.meta.description': 'Case study: Senior Flutter Developer at Digio, from March 2024 to February 2025.',
    'case.mobyan.meta.title': 'Mobyan — case study — Felipe Sitta',
    'case.mobyan.meta.description': 'Case study: Senior Mobile Developer at Mobyan, from May 2023 to March 2024.',

    'case.grupo-bemol.meta.title': 'Grupo Bemol — case study — Felipe Sitta',
    'case.grupo-bemol.meta.description': 'Case study: Grupo Bemol, January to July 2026 — a Digital Wallet built in Flutter.',
    'case.banco-bv.meta.title': 'Banco BV — case study — Felipe Sitta',
    'case.banco-bv.meta.description': 'Case study: Banco BV, June to December 2025 — Design System and modular architecture in Flutter.',

    'case.linkAll': 'See case studies',
    'case.context': 'Context',
    'case.scope': 'Technical scope',
    'case.contrib': 'Key contributions',
    'case.results': 'Results achieved',
    'case.impact': 'Impact and results achieved',
    'case.wrong': 'What went wrong',

    'case.grupo-bemol.context': [
      'Project developed in Flutter.',
      'Launch of the Digital Wallet product.',
      'Large legacy project undergoing refactoring.',
      'Significant duplication throughout the codebase.',
      'Business rule changes and blockers related to the new product occurred frequently and required rapid adaptation.',
      'There were limitations imposed by external vendors.',
      'Heavy use of AI tools (GitHub Copilot) for code explanation and skills for new features, code review, unit tests and commits.'
    ],
    'case.grupo-bemol.scope': [
      'The project consisted of developing a Digital Wallet product inside the client’s existing application. The feature included credit card registration as a payment method.',
      'There were several security concerns and external service constraints, such as Cielo, regarding the handling and storage of credit card data, and these points had to be addressed during development.',
      'The product team delivered a very superficial roadmap, which was adjusted almost daily as new demands were discovered.'
    ],
    'case.grupo-bemol.results': [
      'Delivery of the product, with quick response to changes and new demands as they emerged.',
      'Creation of a library that transparently encapsulated an important process with specific supplier requirements.'
    ],

    'case.banco-bv.context': [
      'Flutter project with high modularization, with more than 150 modules.',
      'Initially allocated to the Design System squad and later to the Individual Registration squad.'
    ],
    'case.banco-bv.scope': [
      'New developments in the Design System went through strict quality control, including accessibility requirements.',
      'There was strong concern around creating generic components in order to avoid duplication.',
      'There was high demand for component maintenance, development, and customization.',
      'The process for presenting and defending GMUD changes was robust.',
      'Use of GitHub Copilot and Cursor for unit tests and code review.'
    ],
    'case.banco-bv.impact': [
      'Development of a front-end library that acted as an API for building dynamic screens and forms.',
      'The contract defined by this library eliminated routing issues and cross-module dependency problems.'
    ],

    'case.digio.context': [
      'Flutter Web project with a modularized architecture.',
      'Close collaboration with the development, architecture, quality, design, and product teams.'
    ],
    'case.digio.scope': [
      'The project was a monolith that had gone through an unfinished modularization attempt. As a result, it was in a halfway state, with many outdated modules, redundancy, and duplication.',
      'There was no unit test coverage.',
      'The squad did not have a technical lead, which made the refinement of technical stories a major bottleneck for the entire team.'
    ],
    'case.digio.contrib': [
      'Dependency management and modularization with Melos.',
      'Implementation of feature toggles for real-time activation of new features.',
      'Creation and standardization of a Design System with Widgetbook.',
      'Increased maturity of automated testing.',
      'Improvement of the technical refinement process and communication with multiple areas.',
      'Progress on the technical debt backlog.'
    ],
    'case.digio.results': [
      'Increased test coverage from zero to over 70%.',
      'Development and standardization of the Design System, as well as its supporting documentation in Widgetbook.',
      'Progress in system modularization for the management and rollout of new modules.',
      'Ownership of the technical refinement initiative for stories, leading to more accurate estimates and deliveries. There was a significant improvement in team indicators and in relationships with UI/UX, product, and quality. The team’s internal perception also changed: it went from being seen as a problematic squad that was always late to becoming a team that was ahead of schedule to the point of having idle capacity on front-end tasks.'
    ],
    'case.digio.wrong': [
      'The relationship with the agility and quality teams was challenging and could have been cultivated more effectively.'
    ],

    'case.mobyan.context': '<p>Between May 2023 and March 2024, the project was inherited from an outsourced consultancy. It had relevant flaws — in the database, state management and authentication, for example — and low adherence to the product’s business rules.</p><p>It was a service-order app used for maintenance and removal of payment devices, such as POS terminals and related equipment. The product was built in Flutter, with several native integrations and an offline-first architecture.</p><p>There was also maintenance work on a maintenance checklist tool developed in Kotlin, using Room as its local database.</p>',
    'case.mobyan.scope': '<p>The app included integrations with Google Maps, GPS, camera, fingerprint authentication, and in-app updates, in addition to SQLite and NoSQL, feature toggles, migrations, streams, and multithreading.</p><p>There was also CI/CD development using Azure DevOps and Firebase.</p>',
    'case.mobyan.contrib': [
      'Development and maintenance of apps in Flutter and Kotlin.',
      'Implementation of improvements such as CI/CD, Design System, and BFF.',
      'Work on an offline-first architecture, including local persistence and synchronization.',
      'Expansion of capabilities related to the native Android platform, with a focus on stability and performance.'
    ],
    'case.mobyan.results': [
      'Visit cancellation previously depended on a long form and communication with a support center where turnover was a major issue. This flow was replaced by a simplified in-app form, resulting in lower turnover and direct savings of at least BRL 300,000 per year in the support center’s operational costs.',
      'Field professionals preferred using the old application because the new project caused data loss. The adoption of an offline-first architecture solved the data loss and synchronization issues and, together with the publishing and update pipeline, enabled the launch and adoption of the new application.'
    ],
    'case.mobyan.wrong': [
      'The NoSQL implementation proved unnecessary. The app loaded large tables, and the issue was solved through improvements to the database code and by implementing Isolates for background loading.'
    ],

    'projects.title': 'Projects',
    'projects.companyTitle': 'Company work',
    'projects.companyEmpty': 'A selection of professional projects is being prepared.',
    'projects.personalTitle': 'Personal projects',
    'projects.personalEmpty': 'Personal projects are being prepared. In the meantime, see the repositories on <a href="https://github.com/sittaman" rel="noopener" target="_blank">GitHub</a>.',

    'contact.title': 'Contact',
    'contact.lede': 'Open to conversations about senior mobile and Flutter roles, in Brazil or remote.',
    'contact.emailLabel': 'Email',
    'contact.email': 'Email',

    'footer.rights': '© 2026 Felipe Sitta',
    'footer.built': 'Hand-built with HTML, CSS and JavaScript'
  }
};
