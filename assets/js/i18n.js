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

    'hero.eyebrow': 'Santo André — SP, Brasil',
    'hero.role': 'Desenvolvedor Sênior Flutter',
    'hero.specialty': 'Design Systems e IA aplicada ao desenvolvimento',
    'hero.lede': '14 anos de experiência em desenvolvimento de software, especialista em Flutter desde 2020. Atuação em projetos de alta complexidade nos setores financeiro e bancário — Carteira Digital, PIX e Cartões — para milhões de usuários.',
    'hero.availability': 'Aberto a posições sênior — remoto, híbrido ou presencial, Brasil',
    'hero.ctaCv': 'Ver currículo',
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
      '<strong>Felithi Professional</strong> — Desenvolvedor Júnior · Jul 2016 — Ago 2019<br><span>Manutenção de e-commerce, desenvolvimento de plugins e automação.</span>',
      '<strong>Porto Seguro</strong> — Desenvolvedor Júnior · Ago 2014 — Set 2015<br><span>Desenvolvimento de dashboards, relatórios e automação.</span>',
      '<strong>Universidade Federal do ABC</strong> — Estágio · Out 2012 — Dez 2013<br><span>Desenvolvimento de sistemas internos para registro acadêmico e auditoria.</span>'
    ],

    'exp.spread.role': 'Desenvolvedor Sênior Flutter',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.context': 'Consultoria de tecnologia, em projetos dos setores bancário e varejo, com arquitetura modular (mais de 150 módulos).',
    'exp.spread.bullets': [
      'Lançamento de novos produtos — Carteira Digital, PIX e Cartões — para mais de 1 milhão de usuários cadastrados.',
      'Governança do Design System usado por cerca de 200 desenvolvedores e designers, com tokens, catálogo de componentes e documentação no Widgetbook.',
      'Biblioteca de front-end atuando como contrato para telas e formulários dinâmicos, eliminando problemas de roteamento e dependências transversais entre módulos.',
      'Componentes acessíveis com semântica e suporte a leitores de tela, além de observabilidade, analytics e feature toggles.',
      'Elaboração de skills e prompts para ferramentas de IA, e apoio técnico em processos seletivos.'
    ],

    'exp.digio.role': 'Desenvolvedor Sênior Flutter',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Fev 2025',
    'exp.digio.context': 'Monolito Flutter Web em processo de modularização, com squad multidisciplinar e time mobile de 4 desenvolvedores.',
    'exp.digio.bullets': [
      'Cobertura de testes de 0% para mais de 70%, com implantação da cultura de TDD.',
      'Feature toggles reduzindo o tempo de lançamento de funcionalidades de dias para poucos minutos, eliminando a dependência de GMUD semanal.',
      'Modularização do sistema e gestão de dependências com Melos.',
      'Design System padronizado com bibliotecas reutilizáveis de componentes e testes, documentado no Widgetbook.'
    ],

    'exp.mobyan.role': 'Desenvolvedor Sênior Mobile',
    'exp.mobyan.start': 'Mai 2023',
    'exp.mobyan.end': 'Fev 2024',
    'exp.mobyan.context': 'Aplicativo de ordens de serviço para manutenção de equipamentos de pagamento, com integrações nativas.',
    'exp.mobyan.bullets': [
      'Automação do processo de cancelamento de chamados, antes manual, gerando economia superior a R$ 300.000 anuais.',
      'Arquitetura offline-first com SQLite e Isolates, resolvendo perdas de dados do aplicativo anterior.',
      'Pipeline de CI/CD com Azure DevOps e Firebase, viabilizando o lançamento de novos produtos para cerca de 2.000 técnicos em campo.',
      'Implementação de GitFlow, TDD, Design System e BFF.'
    ],

    'exp.bitz.role': 'Desenvolvedor Mobile Pleno',
    'exp.bitz.start': 'Ago 2022',
    'exp.bitz.end': 'Abr 2023',
    'exp.bitz.bullets': [
      'Construção do Bytes, o Design System do Bitz em Flutter.',
      'Migração para Flutter dos módulos de Voucher e Pix, principais produtos da empresa — 2 módulos, cerca de 30 telas.',
      'Entrega do produto de empréstimos dentro do prazo, apesar de mudanças de regra de negócio e dependências de back-end externo.'
    ],

    'exp.oruspay.role': 'Desenvolvedor Pleno',
    'exp.oruspay.start': 'Ago 2019',
    'exp.oruspay.end': 'Ago 2022',
    'exp.oruspay.bullets': [
      'Atuação fullstack: Angular no front-end, Flutter no mobile e Java com Spring no back-end.',
      'Serviços em AWS (Cognito, S3 e SQS), com Docker e Kubernetes.'
    ],

    'projects.title': 'Projetos',
    'projects.companyTitle': 'Trabalhos em empresas',
    'projects.companyEmpty': 'Seleção de projetos profissionais em preparação.',
    'projects.personalTitle': 'Projetos pessoais',
    'projects.personalEmpty': 'Projetos pessoais em preparação. Enquanto isso, veja os repositórios no <a href="https://github.com/sittaman" rel="noopener" target="_blank">GitHub</a>.',

    'education.title': 'Formação e certificações',
    'education.degrees': 'Formação acadêmica',
    'education.degreeList': [
      '<strong>Pós-graduação em Arquitetura de Sistemas</strong> — FIAP <span class="years">2025–2026</span>',
      '<strong>Pós-graduação em Inteligência Artificial e Machine Learning</strong> — PUC-MG <span class="years">2023–2024</span>',
      '<strong>Tecnólogo em Jogos Digitais</strong> — FATEC São Caetano do Sul <span class="years">2010–2013</span>'
    ],
    'education.certs': 'Cursos e certificações',
    'education.certList': [
      '<strong>Kotlin Training</strong> — Alura <span class="years">2024</span>',
      '<strong>Flutter Training</strong> — Alura <span class="years">2021</span>',
      '<strong>Java Academy</strong> — Caelum <span class="years">2020</span>',
      '<strong>Android Development</strong> — Impacta <span class="years">2018</span>'
    ],
    'education.langs': 'Idiomas',
    'education.langList': [
      '<strong>Português</strong> — nativo',
      '<strong>Inglês</strong> — C2 proficiente · EF SET, 86/100 <span class="years">2023</span>'
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

    'hero.eyebrow': 'Santo André — SP, Brazil',
    'hero.role': 'Senior Flutter Developer',
    'hero.specialty': 'Design Systems and AI applied to development',
    'hero.lede': '14 years of software development experience and a Flutter specialist since 2020, working on highly complex projects in the financial and banking sectors — Digital Wallet, PIX and Cards — for millions of users.',
    'hero.availability': 'Open to senior roles — remote, hybrid or on-site, Brazil',
    'hero.ctaCv': 'View resume',
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
      '<strong>Felithi Professional</strong> — Junior Developer · Jul 2016 — Aug 2019<br><span>E-commerce maintenance, plugin development and automation.</span>',
      '<strong>Porto Seguro</strong> — Junior Developer · Aug 2014 — Sep 2015<br><span>Development of dashboards, reports and automation.</span>',
      '<strong>Universidade Federal do ABC</strong> — Intern · Oct 2012 — Dec 2013<br><span>Internal systems for academic records and auditing.</span>'
    ],

    'exp.spread.role': 'Senior Flutter Developer',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.context': 'Technology consultancy, on projects in the banking and retail sectors, with a modular architecture (150+ modules).',
    'exp.spread.bullets': [
      'Launch of new products — Digital Wallet, PIX and Cards — for more than 1 million registered users.',
      'Governance of the Design System used by around 200 developers and designers, with tokens, a component catalogue and Widgetbook documentation.',
      'A front-end library acting as a contract for dynamic screens and forms, eliminating routing problems and cross-module dependencies.',
      'Accessible components with semantics and screen reader support, plus observability, analytics and feature toggles.',
      'Authoring skills and prompts for AI tools, and technical support in hiring processes.'
    ],

    'exp.digio.role': 'Senior Flutter Developer',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Feb 2025',
    'exp.digio.context': 'Flutter Web monolith undergoing modularization, with a multidisciplinary squad and a mobile team of 4 developers.',
    'exp.digio.bullets': [
      'Test coverage from 0% to over 70%, establishing a TDD culture.',
      'Feature toggles cutting feature release time from days to minutes, removing the weekly change-request dependency.',
      'System modularization and dependency management with Melos.',
      'A standardized Design System with reusable component and testing libraries, documented in Widgetbook.'
    ],

    'exp.mobyan.role': 'Senior Mobile Developer',
    'exp.mobyan.start': 'May 2023',
    'exp.mobyan.end': 'Feb 2024',
    'exp.mobyan.context': 'Field service order app for payment equipment maintenance, with native integrations.',
    'exp.mobyan.bullets': [
      'Automation of the ticket cancellation process, previously manual, saving over R$ 300,000 per year.',
      'Offline-first architecture with SQLite and Isolates, fixing data loss in the previous app.',
      'CI/CD pipeline with Azure DevOps and Firebase, enabling the launch of new products for around 2,000 field technicians.',
      'Introduction of GitFlow, TDD, Design System and BFF.'
    ],

    'exp.bitz.role': 'Mid-level Mobile Developer',
    'exp.bitz.start': 'Aug 2022',
    'exp.bitz.end': 'Apr 2023',
    'exp.bitz.bullets': [
      'Built Bytes, the Bitz Design System in Flutter.',
      'Migrated the Voucher and Pix modules to Flutter, the company\'s main products — 2 modules, around 30 screens.',
      'Delivered the lending product on time despite business rule changes and external back-end dependencies.'
    ],

    'exp.oruspay.role': 'Mid-level Developer',
    'exp.oruspay.start': 'Aug 2019',
    'exp.oruspay.end': 'Aug 2022',
    'exp.oruspay.bullets': [
      'Fullstack work: Angular on the front-end, Flutter on mobile and Java with Spring on the back-end.',
      'AWS services (Cognito, S3 and SQS), with Docker and Kubernetes.'
    ],

    'projects.title': 'Projects',
    'projects.companyTitle': 'Company work',
    'projects.companyEmpty': 'A selection of professional projects is being prepared.',
    'projects.personalTitle': 'Personal projects',
    'projects.personalEmpty': 'Personal projects are being prepared. In the meantime, see the repositories on <a href="https://github.com/sittaman" rel="noopener" target="_blank">GitHub</a>.',

    'education.title': 'Education and certifications',
    'education.degrees': 'Academic background',
    'education.degreeList': [
      '<strong>Postgraduate in Systems Architecture</strong> — FIAP <span class="years">2025–2026</span>',
      '<strong>Postgraduate in Artificial Intelligence and Machine Learning</strong> — PUC-MG <span class="years">2023–2024</span>',
      '<strong>Associate degree in Digital Games</strong> — FATEC São Caetano do Sul <span class="years">2010–2013</span>'
    ],
    'education.certs': 'Courses and certifications',
    'education.certList': [
      '<strong>Kotlin Training</strong> — Alura <span class="years">2024</span>',
      '<strong>Flutter Training</strong> — Alura <span class="years">2021</span>',
      '<strong>Java Academy</strong> — Caelum <span class="years">2020</span>',
      '<strong>Android Development</strong> — Impacta <span class="years">2018</span>'
    ],
    'education.langs': 'Languages',
    'education.langList': [
      '<strong>Portuguese</strong> — native',
      '<strong>English</strong> — C2 proficient · EF SET, 86/100 <span class="years">2023</span>'
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
