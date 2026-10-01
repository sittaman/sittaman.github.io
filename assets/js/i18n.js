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
 * The `exp.<slug>.summary` strings are the two-line brief on the home page and the card text on
 * /work. They are sized to wrap to exactly two lines at the width they are shown at — measured,
 * not guessed. A longer edit quietly becomes a third line and no check will catch it.
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
    'experience.seeAll': 'Ver todos',

    'exp.spread.role': 'Desenvolvedor Sênior Flutter',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.summary': 'Banco digital com 150+ módulos Flutter — Carteira Digital, PIX e Cartões — para milhões de usuários. Design System, WCAG e skills de IA.',

    'exp.digio.role': 'Desenvolvedor Sênior Flutter',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Fev 2025',
    'exp.digio.summary': 'Monólito Flutter Web sem testes transformado em sistema modularizado, com cobertura de 0 a 70%+ e TDD. Design System com Widgetbook.',

    'exp.mobyan.role': 'Desenvolvedor Sênior Mobile',
    'exp.mobyan.start': 'Mai 2023',
    'exp.mobyan.end': 'Mar 2024',
    'exp.mobyan.summary': 'Apps Flutter e Kotlin offline-first para manutenção de POS em campo. R$ 300K+/ano de economia e 2.000+ técnicos migrados.',

    'case.link': 'Ver estudo de caso',
    'case.eyebrow': 'Estudo de caso',
    'case.back': 'Voltar',
    'case.pending': 'Estudo de caso em preparação.',
    'case.allCases': 'Ver todos os estudos de caso',

    'work.title': 'Estudos de caso',
    'work.meta.title': 'Estudos de caso — Felipe Sitta',
    'work.meta.description': 'Estudos de caso de Felipe Sitta: arquitetura mobile, Design Systems e IA aplicada em projetos financeiros de grande porte.',

    'case.spread.meta.title': 'Spread Tecnologia — estudo de caso — Felipe Sitta',
    'case.spread.meta.description': 'Estudo de caso: Desenvolvedor Sênior Flutter na Spread Tecnologia, de junho de 2025 a junho de 2026.',
    'case.digio.meta.title': 'Digio — estudo de caso — Felipe Sitta',
    'case.digio.meta.description': 'Estudo de caso: Desenvolvedor Sênior Flutter na Digio, de março de 2024 a fevereiro de 2025.',
    'case.mobyan.meta.title': 'Mobyan — estudo de caso — Felipe Sitta',
    'case.mobyan.meta.description': 'Estudo de caso: Desenvolvedor Sênior Mobile na Mobyan, de maio de 2023 a março de 2024.',

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
    'experience.seeAll': 'View all',

    'exp.spread.role': 'Senior Flutter Developer',
    'exp.spread.start': 'Jun 2025',
    'exp.spread.end': 'Jun 2026',
    'exp.spread.summary': 'Digital banking across 150+ Flutter modules — Digital Wallet, PIX and Cards — for millions of users. Design System, WCAG and AI skills.',

    'exp.digio.role': 'Senior Flutter Developer',
    'exp.digio.start': 'Mar 2024',
    'exp.digio.end': 'Feb 2025',
    'exp.digio.summary': 'Untested Flutter Web monolith turned into a modularized, testable system — coverage 0 → 70%+ with TDD. Design System in Widgetbook.',

    'exp.mobyan.role': 'Senior Mobile Developer',
    'exp.mobyan.start': 'May 2023',
    'exp.mobyan.end': 'Mar 2024',
    'exp.mobyan.summary': 'Offline-first Flutter and Kotlin apps for field POS maintenance. R$ 300K+/year in savings and 2,000+ technicians migrated.',

    'case.link': 'View case study',
    'case.eyebrow': 'Case study',
    'case.back': 'Back',
    'case.pending': 'Case study in preparation.',
    'case.allCases': 'See all case studies',

    'work.title': 'Case studies',
    'work.meta.title': 'Case studies — Felipe Sitta',
    'work.meta.description': 'Case studies by Felipe Sitta: mobile architecture, Design Systems and applied AI on large-scale financial projects.',

    'case.spread.meta.title': 'Spread Tecnologia — case study — Felipe Sitta',
    'case.spread.meta.description': 'Case study: Senior Flutter Developer at Spread Tecnologia, from June 2025 to June 2026.',
    'case.digio.meta.title': 'Digio — case study — Felipe Sitta',
    'case.digio.meta.description': 'Case study: Senior Flutter Developer at Digio, from March 2024 to February 2025.',
    'case.mobyan.meta.title': 'Mobyan — case study — Felipe Sitta',
    'case.mobyan.meta.description': 'Case study: Senior Mobile Developer at Mobyan, from May 2023 to March 2024.',

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
