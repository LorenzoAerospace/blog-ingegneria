const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtData = d => { const x = new Date(d); return isNaN(x) ? '' : x.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' }); };
// copertina in cima alla scheda (solo percorsi del sito o https): se manca o non si carica, la scheda resta com'era
const copertinaHtml = a => a && /^(https?:\/\/|Articles\/|Progetti\/|Appunti\/)/.test(a.copertina || '') ? `<img class="cv-card" src="${esc(encodeURI(a.copertina))}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : '';
const card = a => a.soloCopertina && /^(https?:\/\/|Articles\/|Progetti\/|Appunti\/)/.test(a.copertina || '')
  ? `<a class="card" href="${esc(a.link)}" aria-label="${esc(a.titolo || 'Apri')}" style="padding:0;overflow:hidden">${copertinaHtml(a).replace('<img ', '<img style="margin:0;border-radius:0" ')}</a>`
  : `<a class="card" href="${esc(a.link)}">${copertinaHtml(a)}<span class="badge">${esc(a.categoria)}</span><h3>${esc(a.titolo)}</h3><p>${esc(a.descrizione)}</p><div class="meta"><span>${fmtData(a.data)}</span><span>${esc((a.tags || []).slice(0, 2).join(' '))}</span></div></a>`;

/* Copertine nelle schede: se articles.json non ha il campo "copertina" (lo script che lo genera potrebbe non copiarlo),
   la leggo dall'intestazione dell'articolo e aggiungo l'immagine alle schede già disegnate. Il risultato resta in memoria 10 minuti. */
(() => {
  const TTL = 10 * 60 * 1000; let cache = {}; try { cache = JSON.parse(localStorage.ab_cov || '{}'); } catch (e) {}
  const ammessa = c => /^(https?:\/\/|Articles\/|Progetti\/|Appunti\/)/.test(c || '');
  async function daIntestazione(p) {
    const k = cache[p]; if (k && Date.now() - k.t < TTL) return k.c;
    let c = '';
    try {
      const r = await fetch(p);
      if (r.ok) {
        const txt = (await r.text()).replace(/\r/g, ''), m = txt.match(/^---\n([\s\S]*?)\n---/), f = m && m[1].match(/^copertina:\s*["']?(.+?)["']?\s*$/m);
        if (f) c = f[1];
        else {   // articoli senza il campo: uso l'immagine «Copertina» inserita nel testo (generatore di figure)
          const dir = p.slice(0, p.lastIndexOf('/') + 1), re = /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?[^)]*\)/g; let x;
          while ((x = re.exec(txt))) if (/^copertina$/i.test(x[1].trim()) || /copertina\.\w+$/i.test(x[2])) { c = /^(https?:\/\/|\/|Articles\/)/.test(x[2]) ? x[2] : dir + x[2]; break; }
        }
      }
    } catch (e) { return ''; }
    cache[p] = { c, t: Date.now() }; try { localStorage.ab_cov = JSON.stringify(cache); } catch (e) {}
    return c;
  }
  function completa() {
    document.querySelectorAll('a.card[href*="articolo.html?p="]:not([data-cv])').forEach(async a => {
      a.dataset.cv = '1'; if (a.querySelector('.cv-card')) return;
      let p = ''; try { p = new URL(a.getAttribute('href'), location.href).searchParams.get('p') || ''; } catch (e) {}
      if (!/^Articles\/[^.]/.test(p) || p.includes('..')) return;
      const c = await daIntestazione(p);
      if (ammessa(c) && a.isConnected && !a.querySelector('.cv-card')) a.insertAdjacentHTML('afterbegin', copertinaHtml({ copertina: c }));
    });
  }
  let t = 0; const pianifica = () => { if (!t) t = requestAnimationFrame(() => { t = 0; completa(); }); };
  const avvia = () => { new MutationObserver(pianifica).observe(document.documentElement, { childList: true, subtree: true }); pianifica(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', avvia) : avvia();
})();
