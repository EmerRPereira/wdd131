document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  function openNav() {
    nav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation');
    hamburger.textContent = '✕';
  }

  function closeNav() {
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation');
    hamburger.textContent = '☰';
  }

  hamburger.addEventListener('click', function () {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    expanded ? closeNav() : openNav();
  });

  // Close menu when clicking a link (mobile only)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });

  // Close menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Footer date info
  const yearEl = document.getElementById('copyright-year');
  const modifiedEl = document.getElementById('last-modified');
  const now = new Date();
  yearEl.textContent = now.getFullYear();
  modifiedEl.textContent = document.lastModified || 'Unavailable';
});
