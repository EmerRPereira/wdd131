// scripts/temples.js
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('primary-nav');
    const navLinks = nav.querySelectorAll('a');

    // Ensure ARIA initial states
    hamburger.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');

    function openNav() {
        nav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        nav.setAttribute('aria-hidden', 'false');
        hamburger.textContent = '✕';
    }
    function closeNav() {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
        hamburger.textContent = '☰';
    }

    // Toggle
    hamburger.addEventListener('click', function (e) {
        const isOpen = nav.classList.contains('open');
        if (isOpen) closeNav(); else openNav();
        e.stopPropagation();
    });

    // Close when clicking outside the menu (but only on mobile where menu is absolute)
    document.addEventListener('click', function (e) {
        // if nav is open and click is outside header-inner and nav, close
        if (nav.classList.contains('open')) {
        const headerInner = document.querySelector('.header-inner');
        if (!headerInner.contains(e.target) && !nav.contains(e.target)) {
            closeNav();
        }
        }
    });

    // Close when resizing to wide screens (where nav becomes static)
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1200) {
        // ensure menu closed and hamburger hidden state consistent
        closeNav();
        // hamburger display controlled by CSS media queries
        }
    });

    // Close when clicking a nav link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
        if (window.innerWidth < 1200) closeNav();
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    // Footer info
    const yearEl = document.getElementById('copyright-year');
    const modifiedEl = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modifiedEl) modifiedEl.textContent = document.lastModified || 'Unavailable';
});
