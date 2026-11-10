/* theme.js · tema chiaro/scuro (preferenza salvata, altrimenti quella del sistema) */
(function () {
  const get = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  const set = v => { try { localStorage.setItem('theme', v); } catch (e) {} };
  const apply = t => {
    document.documentElement.dataset.theme = t;
    const m = document.querySelector('meta[name=theme-color]');
    if (m) m.content = t === 'light' ? '#f6f7f9' : '#0b0d12';
  };
  apply(get() || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    const b = document.getElementById('tt');
    if (b) b.onclick = () => { const n = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; apply(n); set(n); };
  });
})();
