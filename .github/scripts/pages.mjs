/* Shared page discovery for the check scripts.
 *
 * Every *.html in the tree is a page the deploy has to keep honest: index.html, 404.html and the
 * case-study pages under work/. Discovering them beats a hand-maintained list, which silently
 * stops covering a page the moment someone adds one — and adding case studies is the expected
 * kind of edit here.
 *
 * Dot-directories are skipped because upload-pages-artifact drops dotfiles, so nothing in them
 * ever reaches the published site.
 */
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', 'shots']);

export function discoverPages(root) {
  const found = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(full);
      } else if (entry.name.endsWith('.html')) {
        found.push(relative(root, full).split(sep).join('/'));
      }
    }
  })(root);
  // index.html first: it is the page every other one is measured against.
  return found.sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)));
}
