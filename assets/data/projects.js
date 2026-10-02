/* Project entries for the Projects section.
 *
 * The list is EMPTY on purpose — the section renders its heading and a localized "coming
 * soon" line, so projects can be added whenever there is something real to show. Nothing
 * here is invented; an empty section is honest, a fake one is not.
 *
 * To add a project, push an object into the array below and reload. Both languages live side
 * by side in one entry, so adding a project is a single edit in one file. Anything wrapped in
 * { 'pt-BR': ..., en: ... } is picked by the current language.
 *
 * {
 *   id: 'simple-auth',                             // stable slug
 *   title:   { 'pt-BR': 'Servidor OAuth2', en: 'OAuth2 server' },
 *   summary: { 'pt-BR': 'Uma linha sobre o problema.', en: 'One line on the problem.' },
 *   stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
 *   repo: 'https://github.com/sittaman/simple_auth',
 *   demo: '',                                      // optional live URL
 *   demoLabel: { 'pt-BR': 'Demo', en: 'Demo' },    // optional, for `demo`
 *   org:     { 'pt-BR': 'Consultoria bancária', en: 'Banking consultancy' },  // optional
 *   period:  '2025–2026',                          // optional, language-neutral
 *   highlights: [                                  // optional, 2–4 bullets, results first
 *     { 'pt-BR': 'Mais de 1 milhão de usuários.', en: 'Over 1 million users.' }
 *   ],
 *   links: [{ label: { 'pt-BR': 'Case', en: 'Case study' }, url: 'https://…' }]
 * }
 *
 * Keep the list to the strongest handful — four to six. A card without a link is dead
 * weight, so every entry should have at least `repo`.
 */
window.PROJECTS = [];
