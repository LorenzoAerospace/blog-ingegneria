// Home guidata da config.json (struttura) + articles.json (contenuti)
const $ = id => document.getElementById(id) || document.createElement('div');   // tollera pagine a cui manca qualche elemento
const url = u => /^\s*javascript:/i.test(u || '') ? '#' : (u || '#');

const DEF = {
  sito: { titolo: 'AeroBlog', sottotitolo: '', intro: '', email: '', footer: '' },
  menu: [{ label: 'Home', url: 'index.html' }, { label: 'Appunti', categoria: 'Tutti' }],
  categorie: [], link: [], vista: 'sezioni', ultimi: 3, aperte: false, appunti: { mostra: true, titolo: 'Appunti dei corsi' }, progetti: { mostra: true, titolo: 'Progetti' }
};
const U = new URLSearchParams(location.search);
let CFG = DEF, ART = [], filtro = U.get('cat') || 'Tutti', ricerca = U.get('q') || '';

const info = c => (CFG.categorie || []).find(x => x.nome === c) || {};
const logo = t => { const m = String(t).match(/^(.*[a-z0-9])([A-Z].*)$/); return m ? `${esc(m[1].toUpperCase())}<b>${esc(m[2].toUpperCase())}</b>` : esc(String(t).toUpperCase()); };


function testata() {
  const s = CFG.sito;
  document.title = s.titolo + (s.sottotitolo ? ' | ' + s.sottotitolo : '');
  $('nav-logo').innerHTML = logo(s.titolo);
  $('chi-intro').innerHTML = esc(s.intro).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  const L = CFG.link || [];
  $('radar').innerHTML = (L.length ? '<h2 style="font-size:1.1rem">Radar aerospaziale</h2>' : '') + L.map(l => `<a href="${esc(url(l.url))}" target="_blank" rel="noopener">${esc(l.titolo || l.url)} ↗</a>`).join('');
  $('chi-sono').style.display = s.intro || L.length ? '' : 'none';
  ['contatti', 'contatti-f'].forEach(id => { if (s.email) $(id).href = 'mailto:' + s.email; else $(id).style.display = 'none'; });
  fetch('feed.xml', { method: 'HEAD' }).then(r => { if (!r.ok) $('rss').remove(); }).catch(() => $('rss').remove());
}

// categorie visibili, nell'ordine scelto in config (le nuove in coda, in ordine alfabetico)
function ordina() {
  const nasc = new Set((CFG.categorie || []).filter(c => c.nascosta).map(c => c.nome));
  const visibili = ART.filter(a => !nasc.has(a.categoria));
  const pres = [...new Set(visibili.map(a => a.categoria))], conf = (CFG.categorie || []).map(c => c.nome);
  return { visibili, cats: [...conf.filter(c => pres.includes(c)), ...pres.filter(c => !conf.includes(c)).sort((x, y) => x.localeCompare(y, 'it'))] };
}

function sezione(c, lista, aperta) {
  const i = info(c);
  return `<details class="sez"${aperta ? ' open' : ''}><summary><span class="sez-ic">${esc(i.icona || '📁')}</span><span class="sez-t">${esc(c)}</span><span class="sez-n">${lista.length}</span></summary>
    ${i.descrizione ? `<p class="sez-d">${esc(i.descrizione)}</p>` : ''}<div class="grid">${lista.map(card).join('')}</div></details>`;
}

function disegna() {
  const { visibili, cats } = ordina(), n = parseInt(CFG.ultimi, 10) || 0;
  $('recent-section').style.display = n > 0 ? '' : 'none';
  $('latest-container').innerHTML = visibili.slice(0, n).map(card).join('');
  if (filtro !== 'Tutti' && !cats.includes(filtro)) filtro = 'Tutti';
  $('filter-bar').innerHTML = ['Tutti', ...cats].map(c => `<button class="pill${c === filtro ? ' on' : ''}" data-cat="${esc(c)}">${esc(c)} <small>${c === 'Tutti' ? visibili.length : visibili.filter(a => a.categoria === c).length}</small></button>`).join('');

  const q = ricerca.trim().toLowerCase();
  const F = visibili.filter(a => (filtro === 'Tutti' || a.categoria === filtro) &&
    (!q || (a.titolo + ' ' + (a.descrizione || '') + ' ' + a.categoria + ' ' + (a.tags || []).join(' ')).toLowerCase().includes(q)));
  const box = $('article-grid');
  if (!F.length) { box.className = ''; box.innerHTML = '<p class="vuoto">Nessun contenuto trovato.</p>'; return; }
  if (CFG.vista === 'griglia') { box.className = 'grid'; box.innerHTML = F.map(card).join(''); return; }
  box.className = 'sezioni';
  box.innerHTML = cats.filter(c => F.some(a => a.categoria === c))
    .map(c => sezione(c, F.filter(a => a.categoria === c), !!q || filtro !== 'Tutti' || !!CFG.aperte)).join('');
}

// Appunti PDF (appunti.json), raggruppati per corso
async function appunti() {
  const o = { mostra: true, titolo: 'Appunti dei corsi', ...(CFG.appunti || {}) };
  if (o.mostra === false) return;
  let A;
  try {
    const r = await fetch('appunti.json', { cache: 'no-cache' });
    if (!r.ok) return vuoto('appunti-sezione', '📚', o.titolo, r.status === 404 ? 'Nessun appunto pubblicato per ora.' : `Impossibile leggere appunti.json (errore ${r.status}).`);
    A = await r.json();
  } catch (e) { return vuoto('appunti-sezione', '📚', o.titolo, ERR_LOCALE('appunti.json')); }
  A = (Array.isArray(A) ? A : []).filter(a => a && typeof a.path === 'string' && a.path.startsWith('Appunti/') && !a.path.includes('..'));
  if (!A.length) return vuoto('appunti-sezione', '📚', o.titolo, 'Nessun appunto pubblicato per ora.');
  const per = {}; A.forEach(a => (per[a.corso || 'Altro'] = per[a.corso || 'Altro'] || []).push(a));
  $('appunti-sezione').innerHTML = `<div class="sec-h"><h2>📚 ${esc(o.titolo)}</h2></div><div class="sezioni">` +
    Object.keys(per).sort((x, y) => x.localeCompare(y, 'it')).map(c => `<details class="sez"><summary><span class="sez-ic">📄</span><span class="sez-t">${esc(c)}</span><span class="sez-n">${per[c].length}</span></summary>
      <div class="pdf-lista">${per[c].sort((x, y) => (y.data || '').localeCompare(x.data || '')).map(a => `<a class="pdf" href="${esc(encodeURI(a.path))}" target="_blank" rel="noopener"><b>${esc(a.titolo)}</b>${a.descrizione ? `<span>${esc(a.descrizione)}</span>` : ''}<small>${esc(a.data || '')} · ${((a.dim || 0) / 1048576).toFixed(1)} MB</small></a>`).join('')}</div></details>`).join('') + '</div>';
  $('appunti-sezione').style.display = '';
}

// Sezione vuota o con errore: spiega cosa succede invece di sparire
function vuoto(id, icona, titolo, testo) {
  const s = $(id); s.innerHTML = `<div class="sec-h"><h2>${icona} ${esc(titolo)}</h2></div><p class="vuoto">${testo}</p>`; s.style.display = '';
}
const ERR_LOCALE = f => `Impossibile leggere ${f}: in locale usa Live Server, online controlla che il file sia stato pubblicato.`;

// Progetti (progetti.json): programmazione e CAD, con eventuale demo eseguibile
const TIPI = { prog: 'Programmazione', cad: 'CAD' };
const DEMO = { web: '▶ Provalo online', iframe: '▶ Provalo online', python: '▶ Esegui Python', modello: '⟳ Modello 3D' };
async function progetti() {
  const o = { mostra: true, titolo: 'Progetti', ...(CFG.progetti || {}) };
  if (o.mostra === false) return;
  let P;
  try {
    const r = await fetch('progetti.json', { cache: 'no-cache' });
    if (!r.ok) return vuoto('progetti-sezione', '🛠', o.titolo, r.status === 404 ? 'Nessun progetto pubblicato per ora.' : `Impossibile leggere progetti.json (errore ${r.status}).`);
    P = await r.json();
  } catch (e) { return vuoto('progetti-sezione', '🛠', o.titolo, ERR_LOCALE('progetti.json')); }
  P = (Array.isArray(P) ? P : []).filter(p => p && /^[a-z0-9_-]+$/i.test(p.slug || ''));
  if (!P.length) return vuoto('progetti-sezione', '🛠', o.titolo, 'Nessun progetto pubblicato per ora.');
  const per = {}; P.forEach(p => { const t = p.tipo === 'cad' ? 'cad' : 'prog'; (per[t] = per[t] || []).push(p); });
  const carta = p => `<a href="progetto.html?p=${esc(p.slug)}" class="card"><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="badge">${esc(TIPI[p.tipo] || 'Progetto')}</span>${DEMO[p.demo] ? `<span class="badge">${DEMO[p.demo]}</span>` : ''}</div><h3>${esc(p.titolo)}</h3><p>${esc(p.descrizione || '')}</p><div class="meta"><span>${fmtData(p.data)}</span><span>${esc((p.tags || []).slice(0, 2).join(' '))}</span></div></a>`;
  const tipi = ['prog', 'cad'].filter(t => per[t]), aperto = !!CFG.aperte || tipi.length === 1;
  $('progetti-sezione').innerHTML = `<div class="sec-h"><h2>🛠 ${esc(o.titolo)}</h2></div><div class="sezioni">` +
    tipi.map(t => `<details class="sez"${aperto ? ' open' : ''}><summary><span class="sez-ic">${t === 'cad' ? '📐' : '💻'}</span><span class="sez-t">${TIPI[t]}</span><span class="sez-n">${per[t].length}</span></summary>
      <div class="grid">${per[t].sort((x, y) => (y.data || '').localeCompare(x.data || '')).map(carta).join('')}</div></details>`).join('') + '</div>';
  $('progetti-sezione').style.display = '';
}

function stats() {
  const { visibili, cats } = ordina();
  $('stats').innerHTML = `<div><b>${visibili.length}</b>articoli</div><div><b>${cats.length}</b>categorie</div>`;
}

function filtra(c, scorri = true) {
  filtro = c; disegna();
  if (scorri) $('articoli').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-cat]'); if (!el) return;
  e.preventDefault(); filtra(el.dataset.cat);
});
$('searchInput').addEventListener('input', e => {
  const prima = ricerca; ricerca = e.target.value;
  if (ricerca.trim().length === 2 && prima.trim().length < 2) $('articoli').scrollIntoView({ behavior: 'smooth' });
  disegna();
});

(async () => {
  try {
    const c = await (await fetch('config.json', { cache: 'no-cache' })).json();
    CFG = { ...DEF, ...c, sito: { ...DEF.sito, ...(c.sito || {}) } };
  } catch (e) {}
  try { testata(); } catch (e) { console.error('testata:', e); }
  try {
    const r = await fetch('articles.json', { cache: 'no-cache' });
    if (!r.ok) throw new Error('articles.json non trovato (errore ' + r.status + ')');
    ART = (await r.json()).filter(a => !a.bozza);
  } catch (e) {
    $('article-grid').innerHTML = '<p class="vuoto">Impossibile caricare gli articoli: ' + esc(e.message) + '<br>In locale usa Live Server; online controlla che articles.json sia nel repository.</p>';
    appunti(); progetti(); return;
  }
  try {
    ART.sort((a, b) => new Date(b.data) - new Date(a.data));
    stats(); $('searchInput').value = ricerca; disegna();
  } catch (e) {
    console.error(e); $('article-grid').innerHTML = '<p class="vuoto">Errore nel mostrare gli articoli: ' + esc(e.message) + ' (apri la console con F12)</p>';
  }
  appunti(); progetti();
})();
