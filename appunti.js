/* appunti.js · sezione "Appunti dei corsi" della home. Legge appunti.json (creato da admin.html). */
(async () => {
  const $ = id => document.getElementById(id), sec = $('appunti');
  if (!sec) return;
  let db;
  const note = t => { $('app-grid').innerHTML = '<p class="muted" style="grid-column:1/-1">' + t + '</p>'; };
  try { const r = await fetch('appunti.json', { cache: 'no-cache' }); if (!r.ok) return note(r.status === 404 ? 'Nessun elemento pubblicato per ora (appunti.json non è ancora sul sito).' : 'Impossibile leggere appunti.json (errore ' + r.status + ').'); db = await r.json(); }
  catch (e) { return note('Impossibile leggere appunti.json: in locale usa Live Server, online controlla che il file sia stato pubblicato.'); }
  // accetta solo PDF dentro Appunti/ (difesa contro percorsi strani)
  db = (Array.isArray(db) ? db : []).filter(a => a && typeof a.path === 'string' && /^Appunti\/.+\.pdf$/i.test(a.path) && !a.path.includes('..'));
  if (!db.length) return;
  db.sort((a, b) => String(a.corso).localeCompare(String(b.corso), 'it') || String(b.data).localeCompare(String(a.data)));

  const mb = n => !n ? '' : n < 1048576 ? Math.max(1, Math.round(n / 1024)) + ' KB' : (n / 1048576).toFixed(1) + ' MB';
  const corsi = [...new Set(db.map(a => a.corso))];
  let sel = 'Tutti';

  const k = a => { const u = esc(encodeURI(a.path)); return `<div class="card"><span class="badge">${esc(a.corso)}</span><h3>${esc(a.titolo)}</h3>${a.descrizione ? `<p>${esc(a.descrizione)}</p>` : ''}<div class="meta"><span>${fmtData(a.data)}</span><span>PDF${mb(a.dim) ? ' · ' + mb(a.dim) : ''}</span></div><div style="display:flex;gap:8px;margin-top:6px"><a class="btn btn-primary" href="${u}" target="_blank" rel="noopener">Apri</a><a class="btn" href="${u}" download>Scarica</a></div></div>`; };
  const draw = () => {
    const l = db.filter(a => sel === 'Tutti' || a.corso === sel);
    $('app-grid').innerHTML = l.map(k).join('');
    $('app-count').textContent = l.length + (l.length === 1 ? ' documento' : ' documenti');
    document.querySelectorAll('#app-filter .pill').forEach(b => b.classList.toggle('on', b.dataset.c === sel));
  };
  $('app-filter').innerHTML = ['Tutti', ...corsi].map(c => `<button class="pill" type="button" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  $('app-filter').onclick = e => { const b = e.target.closest('.pill'); if (b) { sel = b.dataset.c; draw(); } };
  sec.hidden = false; const n = $('nav-appunti'); if (n) n.hidden = false;
  draw();
})();
