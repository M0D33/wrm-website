/* ==============================================
   clients.js — Clients page only
   ============================================== */

var SECTOR_ICONS = { oil: '🛢️', glass: '🔬', construction: '🏗️' };

function renderClients(data) {
  var grid = document.getElementById('clientsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  data.clients.forEach(function (c) {
    var name   = lang === 'ar' ? c.name_ar   : c.name_en;
    var sector = lang === 'ar' ? c.sector_ar : c.sector_en;
    var icon   = SECTOR_ICONS[c.sector] || '🏢';

    var logoHtml = c.logo
      ? '<div class="client-logo-wrap">' +
          '<img src="' + c.logo + '" alt="' + name + '" loading="lazy" width="80" height="50"' +
          ' onerror="this.parentNode.innerHTML=\'<span class=client-logo-placeholder>' + icon + '</span>\'">' +
        '</div>'
      : '<div class="client-logo-wrap"><span class="client-logo-placeholder">' + icon + '</span></div>';

    var card = document.createElement('div');
    card.className = 'client-card reveal';
    card.setAttribute('data-sector', c.sector);

    card.innerHTML =
      logoHtml +
      '<div class="client-name"       data-en="' + c.name_en   + '" data-ar="' + c.name_ar   + '">' + name   + '</div>' +
      '<div class="client-sector-tag" data-en="' + c.sector_en + '" data-ar="' + c.sector_ar + '">' + sector + '</div>';

    grid.appendChild(card);
  });

  bindFilter();
  applyLang(lang);
  initReveal();
}

function bindFilter() {
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.client-card').forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-sector') === filter;
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });
}

function loadClients() {
  fetch('data/clients.json')
    .then(function (r) { return r.json(); })
    .then(function (d) { renderClients(d); })
    .catch(function () {
      var grid = document.getElementById('clientsGrid');
      if (grid) grid.innerHTML =
        '<div class="loading-state" data-en="Could not load client data." data-ar="تعذّر تحميل بيانات العملاء.">' +
        'Could not load client data. Ensure data/clients.json is present on the server.</div>';
    });
}

document.addEventListener('DOMContentLoaded', loadClients);
