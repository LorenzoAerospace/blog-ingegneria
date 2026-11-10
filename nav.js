/* nav.js · menu, contatti e footer da config.json (pagine articolo e progetto). Richiede common.js */
(async () => {
  const $ = id => document.getElementById(id);
  if ($('menu')) $('menu').innerHTML = [['Home', 'index.html'], ['Articoli', 'index.html#articoli'], ['Progetti', 'index.html#progetti-sezione'], ['Appunti', 'index.html#appunti-sezione'], ['Chi sono', 'index.html#chi-sono']].map(x => `<a href="${x[1]}">${x[0]}</a>`).join('');
  try {
    const c = await (await fetch('config.json', { cache: 'no-cache' })).json(), s = c.sito || {}, t = String(s.titolo || 'AeroBlog');
    const m = t.match(/^(.*[a-z0-9])([A-Z].*)$/);
    if ($('nav-logo')) $('nav-logo').innerHTML = m ? `${esc(m[1].toUpperCase())}<b>${esc(m[2].toUpperCase())}</b>` : esc(t.toUpperCase());
    if ($('contatti')) { if (s.email) $('contatti').href = 'mailto:' + s.email; else $('contatti').style.display = 'none'; }
  } catch (e) {}
})();
