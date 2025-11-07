document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('#hamburger');
  const nav = document.querySelector('#primary-nav');

  // Estado inicial
  nav.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');

  // Alterna menu no clique
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
    hamburger.textContent = isOpen ? '✕' : '☰';
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  // Fecha ao clicar em link
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A' && window.innerWidth < 880) {
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      hamburger.textContent = '☰';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Fecha com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      hamburger.textContent = '☰';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Atualiza footer
  document.querySelector('#copyright-year').textContent = new Date().getFullYear();
  document.querySelector('#last-modified').textContent = document.lastModified;

  // Corrige estado ao redimensionar
  const checkViewport = () => {
    if (window.innerWidth >= 880) {
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'false');
      hamburger.style.display = 'none';
    } else {
      nav.setAttribute('aria-hidden', 'true');
      hamburger.style.display = 'inline-flex';
      hamburger.textContent = '☰';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  checkViewport();
  window.addEventListener('resize', checkViewport);
});
