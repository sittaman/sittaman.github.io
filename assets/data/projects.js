/* Project entries for the Projects section.
 *
 * Both groups are EMPTY on purpose — the section renders its headings, its card grid and a
 * localized "coming soon" line, so projects can be added whenever there is something real to
 * show. Nothing here is invented; an empty section is honest, a fake one is not.
 *
 * To add a project, push an object into `company` or `personal` below and reload. Both
 * languages live side by side in one entry, so adding a project is a single edit in one file.
 * Anything wrapped in { 'pt-BR': ..., en: ... } is picked by the current language.
 *
 * ── Company work ────────────────────────────────────────────────────────────────
 * {
 *   id: 'wallet',                                  // stable slug
 *   title:   { 'pt-BR': 'Carteira Digital', en: 'Digital Wallet' },
 *   org:     { 'pt-BR': 'Consultoria bancária', en: 'Banking consultancy' },
 *   period:  '2025–2026',                          // language-neutral
 *   summary: { 'pt-BR': 'Uma linha sobre o problema.', en: 'One line on the problem.' },
 *   highlights: [                                  // 2–4 bullets, results first
 *     { 'pt-BR': 'Mais de 1 milhão de usuários.', en: 'Over 1 million users.' }
 *   ],
 *   stack: ['Flutter', 'Dart', 'Design System'],   // language-neutral
 *   links: [{ label: { 'pt-BR': 'Case', en: 'Case study' }, url: 'https://…' }]
 * }
 *
 * ── Personal projects ──────────────────────────────────────────────────────────
 * {
 *   id: 'simple-auth',
 *   title:   { 'pt-BR': 'Servidor OAuth2', en: 'OAuth2 server' },
 *   summary: { 'pt-BR': 'Servidor OAuth2 + OIDC.', en: 'OAuth2 + OIDC server.' },
 *   stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
 *   repo: 'https://github.com/sittaman/simple_auth',
 *   demo: '',                                      // optional live URL
 *   demoLabel: { 'pt-BR': 'Demo', en: 'Demo' }
 * }
 *
 * Keep the personal list to 4–6 cards — the strongest ones. A card without a link is dead
 * weight, so every entry should have at least `repo`.
 */
window.PROJECTS = {
  company: [],
  personal: []
};
