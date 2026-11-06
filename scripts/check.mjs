// Parse both inline scripts without running the dapp or sending network requests.
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
assert.equal(source, html, 'Export is stale; run python3 scripts/export.py');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 2);
scripts.forEach(([, code], index) => new Script(code, { filename: `inline-${index + 1}.js` }));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
assert.match(html, /<title>Wheelings<\/title>/);
assert.match(html, /content="https:\/\/wheelings.imd.site\/og.png"/);
assert.ok(!/<script[^>]+src=/i.test(html), 'No external scripts');
assert.equal((html.match(/class="stage-card /g) || []).length, 5);
console.log('PASS: both inline JavaScript programs parse; export matches; IDs unique; five stages; metadata; no external scripts.');
