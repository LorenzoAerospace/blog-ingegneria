const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtData = d => { const x = new Date(d); return isNaN(x) ? '' : x.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' }); };
// copertina in cima alla scheda (solo percorsi del sito o https): se manca o non si carica, la scheda resta com'era
const copertinaHtml = a => a && /^(https?:\/\/|Articles\/|Progetti\/|Appunti\/)/.test(a.copertina || '') ? `<img class="cv-card" src="${esc(encodeURI(a.copertina))}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : '';
const card = a => `<a class="card" href="${esc(a.link)}">${copertinaHtml(a)}<span class="badge">${esc(a.categoria)}</span><h3>${esc(a.titolo)}</h3><p>${esc(a.descrizione)}</p><div class="meta"><span>${fmtData(a.data)}</span><span>${esc((a.tags || []).slice(0, 2).join(' '))}</span></div></a>`;
