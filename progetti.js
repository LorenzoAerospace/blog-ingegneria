/* progetti.js · sezione "Progetti" della home. Legge progetti.json (creato da admin.html). */
(async () => {
  const $ = id => document.getElementById(id);
  if (!$('progetti')) return;
  let db;
  const note = t => { $('prj-grid').innerHTML = '<p class="muted" style="grid-column:1/-1">' + t + '</p>'; };
  try { const r = await fetch('progetti.json', { cache: 'no-cache' }); if (!r.ok) return note(r.status === 404 ? 'Nessun elemento pubblicato per ora (progetti.json non è ancora sul sito).' : 'Impossibile leggere progetti.json (errore ' + r.status + ').'); db = await r.json(); }
  catch (e) { return note('Impossibile leggere progetti.json: in locale usa Live Server, online controlla che il file sia stato pubblicato.'); }
  db = (Array.isArray(db) ? db : []).filter(p => p && /^[a-z0-9_-]+$/i.test(p.slug || ''));
  if (!db.length) return;
  db.sort((a, b) => String(b.data).localeCompare(String(a.data)));

  const T = { prog: 'Programmazione', cad: 'CAD' };
  const D = { web: '▶ Provalo online', python: '▶ Esegui Python', iframe: '▶ Provalo online', modello: '⟳ Modello 3D' };
  const tipi = ['prog', 'cad'].filter(t => db.some(p => p.tipo === t));
  let sel = 'Tutti';

  const k = p => `<a class="card" href="progetto.html?p=${esc(p.slug)}"><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="badge">${esc(T[p.tipo] || 'Progetto')}</span>${D[p.demo] ? `<span class="badge">${D[p.demo]}</span>` : ''}</div><h3>${esc(p.titolo)}</h3><p>${esc(p.descrizione)}</p><div class="meta"><span>${fmtData(p.data)}</span><span>${esc((p.tags || []).slice(0, 2).join(' '))}</span></div></a>`;
  const draw = () => {
    const l = db.filter(p => sel === 'Tutti' || p.tipo === sel);
    $('prj-grid').innerHTML = l.map(k).join('');
    $('prj-count').textContent = l.length + (l.length === 1 ? ' progetto' : ' progetti');
    document.querySelectorAll('#prj-filter .pill').forEach(b => b.classList.toggle('on', b.dataset.t === sel));
  };
  if (tipi.length > 1) {
    $('prj-filter').innerHTML = ['Tutti', ...tipi].map(t => `<button class="pill" type="button" data-t="${t}">${t === 'Tutti' ? 'Tutti' : T[t]}</button>`).join('');
    $('prj-filter').onclick = e => { const b = e.target.closest('.pill'); if (b) { sel = b.dataset.t; draw(); } };
  }
  draw();
})();
