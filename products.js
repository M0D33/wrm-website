/* ==============================================
   products.js — Products page only
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {

  var tabs     = document.querySelectorAll('.p-tab');
  var sections = document.querySelectorAll('.prod-section');

  if (!tabs.length || !sections.length) return;

  /* ── Highlight active tab on scroll ────────── */
  var NAV_OFFSET = 72 + 56; // navbar + sticky tab bar height

  function getActiveSection() {
    var scrollY = window.scrollY + NAV_OFFSET + 20;
    var active  = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) active = sec;
    });
    return active ? active.id : null;
  }

  function updateTabs() {
    var activeId = getActiveSection();
    tabs.forEach(function (tab) {
      var href = tab.getAttribute('href').replace('#', '');
      tab.classList.toggle('active', href === activeId);
    });
  }

  window.addEventListener('scroll', updateTabs, { passive: true });
  updateTabs();

  /* ── Smooth scroll with offset compensation ── */
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = tab.getAttribute('href').replace('#', '');
      var target   = document.getElementById(targetId);
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Hero pills smooth scroll ─────────────── */
  document.querySelectorAll('.hero-pill').forEach(function (pill) {
    pill.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = pill.getAttribute('href').replace('#', '');
      var target   = document.getElementById(targetId);
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

});
