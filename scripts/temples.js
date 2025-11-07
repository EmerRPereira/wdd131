// temples.js - toggles hamburger navigation and updates footer data

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  // Keep aria-hidden attribute for accessibility states on mobile-style nav
  nav.setAttribute('aria-hidden', 'true');

  function openNav() {
    nav.classList.add('open');
    nav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation');
    hamburger.textContent = '✕'; // X symbol to close
  }

  function closeNav() {
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation');
    hamburger.textContent = '☰'; // hamburger symbol
  }

  hamburger.addEventListener('click', function () {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    if (expanded) closeNav();
    else openNav();
  });

  // Close menu when clicking a nav link (mobile)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      // small delay for perceived responsiveness, then close
      setTimeout(() => {
        // if the mobile overlay is used (i.e., hamburger visible), close it
        closeNav();
      }, 150);
    }
  });

  // Close nav when pressing Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
    }
  });

  // Update footer copyright year and last modified
  const yearEl = document.getElementById('copyright-year');
  const modifiedEl = document.getElementById('last-modified');

  const now = new Date();
  yearEl.textContent = now.getFullYear();

  // document.lastModified returns a string; show a more friendly format
  const lastModifiedRaw = document.lastModified;
  if (lastModifiedRaw && lastModifiedRaw !== '') {
    modifiedEl.textContent = lastModifiedRaw;
  } else {
    modifiedEl.textContent = 'Unavailable';
  }

  // Responsive handling: hide mobile overlay nav if viewport becomes large
  function checkViewport() {
    if (window.matchMedia('(min-width: 880px)').matches) {
      // large view: ensure nav is visible and attributes set accordingly
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'false');
      hamburger.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      // mobile view
      hamburger.style.display = '';
      nav.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.textContent = '☰';
    }
  }

  checkViewport();
  window.addEventListener('resize', checkViewport);
});
