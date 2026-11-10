// Genera articles.json da Articles/**/*.md + legacy.json (vecchi articoli HTML)
// Se un vecchio HTML ha già un .md PUBBLICATO con lo stesso nome, il vecchio viene nascosto.
const fs = require('fs'), path = require('path');
const out = [];
(function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.md')) out.push(leggi(p));
  }
})('Articles');

function leggi(p) {
  const txt = fs.readFileSync(p, 'utf8').replace(/\r/g, '');
  const m = txt.match(/^---\n([\s\S]*?)\n---/), fm = {};
  const unq = v => { const q = v.match(/^(["'])(.*)\1$/); return q ? q[2] : v.replace(/^\[(.*)\]$/, '$1'); };
  if (m) m[1].split('\n').forEach(r => { const i = r.indexOf(':'); if (i > 0) fm[r.slice(0, i).trim()] = unq(r.slice(i + 1).trim()); });
  const rel = p.split(path.sep).join('/');
  return {
    titolo: fm.titolo || path.basename(p, '.md'), descrizione: fm.descrizione || '',
    categoria: fm.categoria || 'Altro',
    tags: (fm.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    data: fm.data || new Date().toISOString().slice(0, 10),
    link: 'articolo.html?p=' + encodeURI(rel), path: rel,
    bozza: /^(si|sì|true|yes)$/i.test(fm.bozza || '')
  };
}

const pubblicati = new Set(out.filter(a => !a.bozza).map(a => a.path));
if (fs.existsSync('legacy.json'))
  JSON.parse(fs.readFileSync('legacy.json', 'utf8')).forEach(a => {
    if (pubblicati.has(String(a.link).replace(/\.html$/, '.md'))) return; // già convertito e pubblicato
    out.push({ ...a, path: a.link, legacy: true });
  });

out.sort((a, b) => b.data.localeCompare(a.data));
fs.writeFileSync('articles.json', JSON.stringify(out, null, 2));
console.log(out.length + ' voci indicizzate');
