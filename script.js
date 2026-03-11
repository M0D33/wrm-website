/* ==============================================
   White Rocks Mining — Shared Script
   script.js
   ============================================== */

var lang = new URLSearchParams(window.location.search).get('lang')
         || localStorage.getItem('wrm_lang')
         || 'en';

/* ── Language ─────────────────────────────────── */
function applyLang(l) {
  lang = l;
  localStorage.setItem('wrm_lang', l);
  document.documentElement.setAttribute('lang', l);
  document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
  document.querySelectorAll('[data-en]').forEach(function (el) {
    el.textContent = el.getAttribute('data-' + l);
  });
  var toggle = document.getElementById('langToggle');
  if (toggle) toggle.textContent = l === 'en' ? 'عربي' : 'English';
  // update all same-origin links to carry lang param
  document.querySelectorAll('a[href]').forEach(function (a) {
    try {
      var raw = a.getAttribute('href');
      if (!raw || raw.startsWith('mailto') || raw.startsWith('tel') || raw.startsWith('#')) return;
      var u = new URL(raw, window.location.href);
      if (u.origin === window.location.origin) {
        a.href = u.pathname + '?lang=' + l + (u.hash || '');
      }
    } catch (e) {}
  });
}

/* ── Reveal animations ────────────────────────── */
function initReveal() {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('visible'); }, i * 80);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('anim');
    obs.observe(el);
  });
}

/* ── Inject scroll-to-top button ─────────────── */
(function () {
  var btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
  btn.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  document.body.appendChild(btn);
})();

/* ── Nav & UI ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  // Scroll shadow on nav + scroll-to-top button visibility
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    var btn = document.getElementById('scrollTopBtn');
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  });

  // Hamburger
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Mark active page in both nav and mobile menu
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a) {
    var href = a.getAttribute('href').split('?')[0];
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Lang toggle
  var toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(lang === 'en' ? 'ar' : 'en');
    });
  }

  // Apply lang on load
  applyLang(lang);

  // Init reveal
  initReveal();
});
