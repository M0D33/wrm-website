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

/* ── Nav & UI ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  // Scroll shadow on nav
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Hamburger
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

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
