/* codice.js — blocchi di codice del blog: colori, etichetta del linguaggio e pulsante «Copia».
   Si usa sia nell'editor (admin.html) sia nella pagina degli articoli (articolo.html):
   basta includere <script src="codice.js"></script> e chiamare evidenziaCodice(elemento)
   dopo aver inserito l'HTML dell'articolo. I linguaggi non inclusi di serie (MATLAB, LaTeX,
   Fortran, Julia…) vengono caricati da soli quando servono. */
(function () {
  if (window.evidenziaCodice) return;
  const HL = 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/';
  const ALIAS = { py: 'python', js: 'javascript', ts: 'typescript', m: 'matlab', octave: 'matlab', sh: 'bash', shell: 'bash', zsh: 'bash', 'c++': 'cpp', tex: 'latex', f90: 'fortran', f95: 'fortran', f: 'fortran', jl: 'julia', yml: 'yaml', md: 'markdown', txt: '', text: '' };

  const st = document.createElement('style');
  st.textContent = `
.cb-wrap{position:relative;margin:1.2em 0}
.cb-wrap>pre{margin:0;padding:2.2rem 1rem 1rem;overflow:auto;tab-size:4;background:var(--code-bg,rgba(127,127,127,.10));border:1px solid var(--border,rgba(127,127,127,.28));border-radius:10px}
.cb-wrap pre code{display:block;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;font-size:.88rem;line-height:1.55;background:none;border:0;padding:0;white-space:pre;color:inherit}
.cb-bar{position:absolute;top:7px;left:14px;right:8px;display:flex;align-items:center;pointer-events:none;font:600 .68rem/1 Inter,system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:var(--muted,#8b949e)}
.cb-copy{pointer-events:auto;margin-left:auto;cursor:pointer;background:transparent;border:1px solid var(--border,rgba(127,127,127,.35));color:inherit;border-radius:6px;padding:3px 9px;font:500 .72rem Inter,system-ui,sans-serif;letter-spacing:0;text-transform:none}
.cb-copy:hover,.cb-copy:focus-visible{border-color:var(--accent,#4dabf7);color:var(--accent,#4dabf7)}
.hljs-comment,.hljs-quote{color:#8b949e;font-style:italic}
.hljs-keyword,.hljs-selector-tag,.hljs-doctag,.hljs-formula{color:#bf6fd6}
.hljs-string,.hljs-regexp,.hljs-addition,.hljs-meta .hljs-string{color:#5aaa6a}
.hljs-number,.hljs-literal,.hljs-symbol,.hljs-bullet{color:#e0974a}
.hljs-title,.hljs-section,.hljs-name,.hljs-selector-id,.hljs-selector-class{color:#4e9be8}
.hljs-built_in,.hljs-type,.hljs-class .hljs-title{color:#d9736f}
.hljs-attr,.hljs-attribute,.hljs-variable,.hljs-template-variable,.hljs-property{color:#d1a14a}
.hljs-meta,.hljs-link,.hljs-params{color:#8b949e}
.hljs-deletion{color:#e5534b}
.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`;
  document.head.appendChild(st);

  const caricati = {};
  const script = src => caricati[src] || (caricati[src] = new Promise((ok, ko) => {
    const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => ko(new Error(src)); document.head.appendChild(s);
  }));
  const base = () => window.hljs ? Promise.resolve() : script(HL + 'highlight.min.js').catch(() => {});
  async function lingua(l) {
    if (!window.hljs) return false;
    if (hljs.getLanguage(l)) return true;
    try { await script(HL + 'languages/' + l + '.min.js'); } catch (e) {}
    return !!hljs.getLanguage(l);
  }
  async function copia(t, b) {
    let ok = false;
    try { await navigator.clipboard.writeText(t); ok = true; }
    catch (e) {
      const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(a); a.select(); try { ok = document.execCommand('copy'); } catch (x) {} a.remove();
    }
    b.textContent = ok ? 'Copiato ✔' : 'Non riuscito'; setTimeout(() => { b.textContent = 'Copia'; }, 1600);
  }

  window.evidenziaCodice = async function (radice) {
    radice = radice || document;
    const blocchi = [...radice.querySelectorAll('pre > code')].filter(c => !c.dataset.cb);
    if (!blocchi.length) return;
    blocchi.forEach(c => { c.dataset.cb = '1'; });
    await base();
    for (const code of blocchi) {
      if (!code.isConnected) continue;
      const pre = code.parentElement, m = (code.className || '').match(/language-(\S+)/), nome = m ? m[1] : '';
      const l = (ALIAS[nome.toLowerCase()] ?? nome.toLowerCase()).replace(/[^a-z0-9-]/g, ''), testo = code.textContent;
      if (l && await lingua(l)) { try { code.innerHTML = hljs.highlight(testo, { language: l, ignoreIllegals: true }).value; } catch (e) {} }
      code.classList.add('hljs');
      if (pre.parentElement && pre.parentElement.classList.contains('cb-wrap')) continue;
      const w = document.createElement('div'); w.className = 'cb-wrap';
      pre.parentNode.insertBefore(w, pre); w.appendChild(pre);
      const bar = document.createElement('div'); bar.className = 'cb-bar';
      if (nome) { const e = document.createElement('span'); e.textContent = nome; bar.appendChild(e); }
      const b = document.createElement('button'); b.type = 'button'; b.className = 'cb-copy'; b.textContent = 'Copia'; b.setAttribute('aria-label', 'Copia il codice');
      b.onclick = () => copia(testo, b); bar.appendChild(b); w.appendChild(bar);
    }
  };
})();
