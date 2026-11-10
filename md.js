/* md.js · front-matter + Markdown → HTML sicuro, con formule KaTeX ($...$ e $$...$$) */
window.parseFrontMatter = txt => {
  const unq = v => { const q = v.match(/^(["'])(.*)\1$/); return q ? q[2] : v.replace(/^\[(.*)\]$/, '$1'); };
  txt = txt.replace(/\r/g, '');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n?/), fm = {};
  if (m) m[1].split('\n').forEach(l => {
    const i = l.indexOf(':');
    if (i > 0) fm[l.slice(0, i).trim()] = unq(l.slice(i + 1).trim());
  });
  return { fm, body: m ? txt.slice(m[0].length) : txt };
};

window.renderMarkdown = txt => {
  const math = [];
  const stash = (t, d) => 'MATHPH' + (math.push([t, d]) - 1) + 'ENDPH';
  // le formule vengono estratte (fuori dal codice) così marked non rovina _ e *
  let body = parseFrontMatter(txt).body.split(/(```[\s\S]*?```|`[^`\n]*`)/g).map((s, i) => i % 2 ? s :
    s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => stash(t, true))
     .replace(/\\\[([\s\S]+?)\\\]/g, (_, t) => stash(t, true))
     .replace(/\\\(([\s\S]+?)\\\)/g, (_, t) => stash(t, false))
     .replace(/(^|[^\\$])\$([^\s$](?:[^$\n]*?[^\s$])?)\$(?!\d)/g, (_, a, t) => a + stash(t, false))).join('');

  const t = document.createElement('template');
  t.innerHTML = marked.parse(body, { gfm: true, mangle: false, headerIds: false });
  // sanificazione: niente script, iframe o gestori di eventi
  t.content.querySelectorAll('script,iframe,object,embed,style,link,meta').forEach(n => n.remove());
  t.content.querySelectorAll('*').forEach(n => [...n.attributes].forEach(a => {
    if (/^on/i.test(a.name) || /^\s*(javascript|data:text\/html)/i.test(a.value)) n.removeAttribute(a.name);
  }));
  t.content.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  t.content.querySelectorAll('img').forEach(i => { i.loading = 'lazy'; if (!i.alt) i.alt = ''; });

  return t.innerHTML.replace(/MATHPH(\d+)ENDPH/g, (_, n) => {
    const [f, d] = math[n];
    try { return window.katex ? katex.renderToString(f.trim(), { displayMode: d, throwOnError: false }) : (d ? '$$' + f + '$$' : '$' + f + '$'); }
    catch (e) { return '<code>' + f.replace(/</g, '&lt;') + '</code>'; }
  });
};
