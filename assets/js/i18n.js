/* Visible copy for the portfolio, in both languages.
 *
 * This dictionary is AUTHOR-CONTROLLED content only. It is never user input, which is
 * what makes the `data-i18n-html` / `data-i18n-list-html` paths safe. If this file ever
 * starts carrying data from a form, a URL parameter or an API, those two paths must go.
 *
 * Keys are stable identifiers, never source text. `pt-BR` mirrors the copy authored
 * directly in index.html, so a visitor without JS still gets a complete page.
 * `check-i18n.mjs` fails the build when the two languages disagree.
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
    'nav.education': 'Formação',
    'nav.cv': 'Currículo',
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
    'experience.earlierTitle': 'Experiência anterior',
    'experience.earlierList': [
      '<strong>Oruspay</strong> — Desenvolvedor Pleno · Ago 2019 — Ago 2022<br><span>Atuação fullstack — Angular, Flutter e Java com Spring — e serviços em AWS (Cognito, S3 e SQS), com Docker e Kubernetes.</span>',
      '<strong>Felithi Professional</strong> — Desenvolvedor Júnior · Jul 2016 — Ago 2019<br><span>Manutenção de e-commerce, desenvolvimento de plugins e automação.</span>',
      '<strong>Porto Seguro</strong> — Desenvolvedor Júnior · Ago 2014 — Set 2015<br><span>Desenvolvimento de dashboards, relatórios e automação.</span>',
      '<strong>Universidade Federal do ABC</strong> — Estágio · Out 2012 — Dez 2013<br><span>Desenvolvimento de sistemas internos para registro acadêmico e auditoria.</span>'
    ],

    'exp.spread.role': 'Desenvolvedor Sênior Flutter',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.bullets': [
      'Construção de produtos de banco digital (Carteira Digital, PIX, Cartões de Crédito) para milhões de usuários em projetos Flutter com 150+ módulos.',
      'Governança de Design System — tokens, catálogo de componentes e documentação cross-squad, para cerca de 200 desenvolvedores e designers.',
      'Implementação de acessibilidade (WCAG) com semântica e suporte a leitores de tela em toda a biblioteca de componentes.',
      'Fomento da cultura de TDD com testes unitários, de integração e automação com Maestro cobrindo jornadas críticas do usuário.',
      'Desenvolvimento de uma biblioteca front-end que atua como contrato de API para geração dinâmica de telas/formulários, eliminando bugs de roteamento e dependências entre módulos.',
      'Criação de skills de IA personalizados para acelerar os fluxos de desenvolvimento, code review e aumento na cobertura de testes e qualidade.',
      'Clean Architecture, Integração de APIs REST, implementação de gerência de estado com BLoC, Cubit e ValueNotifier, RemoteConfig, Observabilidade com DataDog e Google Analytics, GitFlow, injeção de dependência com getIt, deep links, GoRouter.',
      'Entrevistas técnicas e mentoria para novas contratações.'
    ],

    'exp.digio.role': 'Desenvolvedor Sênior Flutter',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Fev 2025',
    'exp.digio.bullets': [
      'Transformei um monólito Flutter Web com zero cobertura de testes e módulos duplicados e obsoletos em um sistema modularizado e testável.',
      'Métrica principal: 0 → 70%+ de cobertura de testes com adoção de TDD em todo o squad.',
      'Liderei o refinamento técnico e me tornei a ponte entre engenharia, produto, UX e QA.',
      'Implementei feature toggles e remote config no Firebase para atualização em tempo real de parâmetros sem redeploy (antes, cada ajuste dependia de um processo complexo de GMUD).',
      'Construí e documentei um Design System padronizado com Widgetbook.',
      'Virada de jogo: squad saiu de atrasos recorrentes para entregas antecipadas. Relacionamento entre times (UX, produto, QA) melhorou de forma mensurável.',
      'Clean Architecture, Integração de APIs REST, implementação de gerência de estado com Provider, RemoteConfig, Observabilidade com Datadog, GitFlow, injeção de dependência com getIt, GoRouter.'
    ],

    'exp.mobyan.role': 'Desenvolvedor Sênior Mobile',
    'exp.mobyan.start': 'Mai 2023',
    'exp.mobyan.end': 'Mar 2024',
    'exp.mobyan.bullets': [
      'Construí e mantive apps Flutter e Kotlin para manutenção de equipamentos de pagamento de campo (POS).',
      'Implementei pipelines CI/CD (Azure DevOps, Firebase) para deploys automatizados em staging e produção na Play Store.',
      'Arquitetura mobile offline-first com persistência local e sincronização em background utilizando banco de dados local SQLite e Hive (NoSQL) e Isolates — eliminou perda de dados.',
      'Uso de Platform Channels (Method Channel, Event Channel) para integração com recursos nativos como GPS, Câmera e biometria.',
      'Segurança com secure storage, device integrity, OAuth2 (JWT, refresh token).',
      'Análise de performance com DevTools, Performance Overlay e Logcat.',
      'Métrica principal: R$ 300K+ de economia anual com automação do cancelamento de chamados antes feito manualmente por uma central de atendimento.',
      'Adoção: 2.000+ técnicos de campo transicionados com sucesso para o novo app.',
      'Manutenção de ferramenta nativa Android (Kotlin) baseada em banco de dados local Room para checklist de manutenção.',
      'Clean Architecture, Integração de APIs REST, implementação de gerência de estado com Provider e GetX, Firebase (RemoteConfig, App Distribution, Crashlytics), GitFlow, injeção de dependência com getIt.'
    ],

    'exp.bitz.role': 'Desenvolvedor Mobile Pleno',
    'exp.bitz.start': 'Ago 2022',
    'exp.bitz.end': 'Abr 2023',
    'exp.bitz.bullets': [
      'Desenvolvimento mobile em Flutter (Android/iOS) com Clean Architecture, TDD e GitFlow. Equipe multidisciplinar, Agile, Scrum.',
      'Entrega do produto de empréstimos no prazo, apesar de problemas de regra de negócio e de backend externo até o dia do lançamento.',
      'Migração dos módulos Voucher e Pix para Flutter (2 módulos, cerca de 30 telas).',
      'Criação da biblioteca Bytes, o Design System do Bitz.',
      'Pipelines com GitHub Actions.',
      'Testes unitários e de integração.',
      'Integração de APIs REST, implementação de gerência de estado com BloC e Cubit, Firebase (RemoteConfig, Crashlytics), Observabilidade com Google Analytics, injeção de dependência com getIt.'
    ],

    'projects.title': 'Projetos',
    'projects.companyTitle': 'Trabalhos em empresas',
    'projects.companyEmpty': 'Seleção de projetos profissionais em preparação.',
    'projects.personalTitle': 'Projetos pessoais',
    'projects.personalEmpty': 'Projetos pessoais em preparação. Enquanto isso, veja os repositórios no <a href="https://github.com/sittaman" rel="noopener" target="_blank">GitHub</a>.',

    'education.title': 'Formação e certificações',
    'education.degrees': 'Formação acadêmica',
    'education.degreeList': [
      '<span class="stack-main"><strong>Pós-graduação em Arquitetura de Sistemas</strong> — FIAP</span> <span class="years">2025–2026</span>',
      '<span class="stack-main"><strong>Pós-graduação em Inteligência Artificial e Machine Learning</strong> — PUC-MG</span> <span class="years">2023–2024</span>',
      '<span class="stack-main"><strong>Tecnólogo em Jogos Digitais</strong> — FATEC São Caetano do Sul</span> <span class="years">2010–2013</span>'
    ],
    'education.certs': 'Cursos e certificações',
    'education.certList': [
      '<span class="stack-main"><strong>Kotlin Training</strong> — Alura</span> <span class="years">2024</span>',
      '<span class="stack-main"><strong>Flutter Training</strong> — Alura</span> <span class="years">2021</span>',
      '<span class="stack-main"><strong>Java Academy</strong> — Caelum</span> <span class="years">2020</span>',
      '<span class="stack-main"><strong>Android Development</strong> — Impacta</span> <span class="years">2018</span>'
    ],
    'education.langs': 'Idiomas',
    'education.langList': [
      '<span class="stack-main"><strong>Português</strong> — nativo</span>',
      '<span class="stack-main"><strong>Inglês</strong> — C2 proficiente · EF SET, 86/100</span> <span class="years">2023</span>'
    ],

    'cv.title': 'Currículo',
    'cv.lede': 'Currículo completo em PDF, nos dois idiomas. Escolha a versão que preferir.',
    'cv.pt': 'Currículo em português <span class="btn-note">PDF</span>',
    'cv.en': 'Currículo em inglês <span class="btn-note">PDF</span>',

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
    'nav.education': 'Education',
    'nav.cv': 'Resume',
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
    'experience.earlierTitle': 'Earlier experience',
    'experience.earlierList': [
      '<strong>Oruspay</strong> — Mid-level Developer · Aug 2019 — Aug 2022<br><span>Fullstack work — Angular, Flutter and Java with Spring — plus AWS services (Cognito, S3 and SQS), with Docker and Kubernetes.</span>',
      '<strong>Felithi Professional</strong> — Junior Developer · Jul 2016 — Aug 2019<br><span>E-commerce maintenance, plugin development and automation.</span>',
      '<strong>Porto Seguro</strong> — Junior Developer · Aug 2014 — Sep 2015<br><span>Development of dashboards, reports and automation.</span>',
      '<strong>Universidade Federal do ABC</strong> — Intern · Oct 2012 — Dec 2013<br><span>Internal systems for academic records and auditing.</span>'
    ],

    'exp.spread.role': 'Senior Flutter Developer',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.bullets': [
      'Building digital banking products (Digital Wallet, PIX, Credit Cards) for millions of users in a 150+ module Flutter project.',
      'Design System governance — tokens, component catalog, and cross-squad documentation for approximately 200 professionals.',
      'Implementing accessibility (WCAG) with semantics and screen-reader support across the full component library.',
      'Driving TDD culture with unit, integration, and Maestro automation tests covering critical user journeys.',
      'Developed a front-end library acting as an API contract for dynamic screen/form generation, eliminating routing bugs and cross-module dependencies.',
      'Building custom AI skills and prompts to accelerate development workflows, code review, code quality and expanding testing coverage.',
      'Technical interviewing and mentoring for new hires.',
      'Clean Architecture, REST API integration, state management with BLoC, Cubit and Value Notifier, RemoteConfig, Observability with DataDog and Google Analytics, GitFlow, dependency injection with getIt, deep links, GoRouter.'
    ],

    'exp.digio.role': 'Senior Flutter Developer',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Feb 2025',
    'exp.digio.bullets': [
      'Transformed a Flutter Web monolith with zero test coverage and duplicated, stale modules into a modularized, testable system.',
      'Hero metric: 0 → 70%+ test coverage with TDD adoption across the squad.',
      'Led technical refinement and became the bridge between engineering, product, UX, and QA.',
      'Implemented feature toggles and remote config within Firebase for real-time update of parameters without redeployment.',
      'Built and documented a standardized Design System with Widgetbook.',
      'Turnaround: squad went from chronically delayed to shipping ahead of schedule with idle front-end capacity. Cross-team relationships (UX, product, QA) measurably improved.',
      'Clean Architecture, REST API integration, state management with Provider and Riverpod, RemoteConfig, Observability with DataDog and Google Analytics, GitFlow, dependency injection with getIt, GoRouter.'
    ],

    'exp.mobyan.role': 'Senior Mobile Developer',
    'exp.mobyan.start': 'May 2023',
    'exp.mobyan.end': 'Mar 2024',
    'exp.mobyan.bullets': [
      'Built and maintained Flutter and Kotlin apps for field-service payment equipment (POS) maintenance.',
      'Implemented CI/CD pipelines (Azure DevOps, Firebase) for automated staging and production deployments to Play Store.',
      'Architected offline-first mobile solution with local persistence and background sync using local databases SQLite and Hive (NoSQL) and Isolates — eliminated data loss.',
      'Use of Platform Channels (Method Channel, Event Channel) for integration with native resources like GPS, Camera and biometrics.',
      'Security with secure storage, device integrity, OAuth2 (JWT, refresh token).',
      'Performance profiling with DevTools, Performance Overlay, Logcat.',
      'Hero metric: R$ 300K+ annual savings by replacing a complex form + high-turnover call center with a streamlined in-app form.',
      'Adoption: 2,000+ field technicians successfully transitioned to the new app.',
      'Native Android (Kotlin) maintenance on a Room-based checklist tool.',
      'Clean Architecture, REST API integration, state management with Provider and GetX, Firebase (RemoteConfig, App Distribution, Crashlytics), GitFlow, dependency injection with getIt.'
    ],

    'exp.bitz.role': 'Mid-level Mobile Developer',
    'exp.bitz.start': 'Aug 2022',
    'exp.bitz.end': 'Apr 2023',
    'exp.bitz.bullets': [
      'Mobile Flutter development (Android/iOS) with Clean Architecture, TDD and Gitflow. Multidisciplinary squads, Agile, Scrum.',
      'Delivered the loans product on schedule despite the business and external backend issues that impacted the project up to launch day.',
      'Migrated Voucher and Pix modules to Flutter (2 modules, ~30 screens).',
      'Built the Bytes library, Bitz\'s Design System.',
      'Pipelines with GitHub Actions.',
      'Unit and integration tests.',
      'REST API integration, state management with BloC and Cubit, Firebase (RemoteConfig, Crashlytics), Observability with Google Analytics, dependency injection with getIt.'
    ],

    'projects.title': 'Projects',
    'projects.companyTitle': 'Company work',
    'projects.companyEmpty': 'A selection of professional projects is being prepared.',
    'projects.personalTitle': 'Personal projects',
    'projects.personalEmpty': 'Personal projects are being prepared. In the meantime, see the repositories on <a href="https://github.com/sittaman" rel="noopener" target="_blank">GitHub</a>.',

    'education.title': 'Education and certifications',
    'education.degrees': 'Academic background',
    'education.degreeList': [
      '<span class="stack-main"><strong>Postgraduate in Systems Architecture</strong> — FIAP</span> <span class="years">2025–2026</span>',
      '<span class="stack-main"><strong>Postgraduate in Artificial Intelligence and Machine Learning</strong> — PUC-MG</span> <span class="years">2023–2024</span>',
      '<span class="stack-main"><strong>Associate degree in Digital Games</strong> — FATEC São Caetano do Sul</span> <span class="years">2010–2013</span>'
    ],
    'education.certs': 'Courses and certifications',
    'education.certList': [
      '<span class="stack-main"><strong>Kotlin Training</strong> — Alura</span> <span class="years">2024</span>',
      '<span class="stack-main"><strong>Flutter Training</strong> — Alura</span> <span class="years">2021</span>',
      '<span class="stack-main"><strong>Java Academy</strong> — Caelum</span> <span class="years">2020</span>',
      '<span class="stack-main"><strong>Android Development</strong> — Impacta</span> <span class="years">2018</span>'
    ],
    'education.langs': 'Languages',
    'education.langList': [
      '<span class="stack-main"><strong>Portuguese</strong> — native</span>',
      '<span class="stack-main"><strong>English</strong> — C2 proficient · EF SET, 86/100</span> <span class="years">2023</span>'
    ],

    'cv.title': 'Resume',
    'cv.lede': 'Full resume in PDF, in both languages. Pick whichever you prefer.',
    'cv.pt': 'Portuguese resume <span class="btn-note">PDF</span>',
    'cv.en': 'English resume <span class="btn-note">PDF</span>',

    'contact.title': 'Contact',
    'contact.lede': 'Open to conversations about senior mobile and Flutter roles, in Brazil or remote.',
    'contact.emailLabel': 'Email',
    'contact.email': 'Email',

    'footer.rights': '© 2026 Felipe Sitta',
    'footer.built': 'Hand-built with HTML, CSS and JavaScript'
  }
};
