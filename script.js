(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-switch');
  const label = toggle.querySelector('.theme-label');
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('portfolio-theme') || 'light'; } catch (_) { /* Storage not available */ }

  function updateTheme(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    label.textContent = dark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', String(dark));
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch (_) { /* Ignore */ }
  }
  updateTheme(savedTheme);
  toggle.addEventListener('click', () => updateTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Each photo slot automatically reveals its photo once the matching image is provided.
  document.querySelectorAll('[data-photo-slot]').forEach(slot => {
    const img = slot.querySelector('img');
    if (!img) return;
    const show = () => slot.classList.add('is-filled');
    if (img.complete && img.naturalWidth > 0) show();
    else img.addEventListener('load', show, { once: true });
    img.addEventListener('error', () => slot.classList.remove('is-filled'), { once: true });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();