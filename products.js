/* ==============================================
   products.js — Products page only
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {

  var tabs   = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');

  function activateTab(id) {
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === id);
    });
    panels.forEach(function (p) {
      p.classList.toggle('active', p.id === id);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.getAttribute('data-tab'));
    });
  });

  // Activate first tab on load
  if (tabs.length) activateTab(tabs[0].getAttribute('data-tab'));

});
