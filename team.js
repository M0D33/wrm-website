/* ==============================================
   team.js — Team page only
   ============================================== */

var BG = ['bg-1', 'bg-2', 'bg-3', 'bg-4'];

function renderTeam(data) {
  var grid = document.getElementById('teamGrid');
  if (!grid) return;
  grid.innerHTML = '';

  data.team.forEach(function (m, i) {
    var name = lang === 'ar' ? m.name_ar : m.name_en;
    var role = lang === 'ar' ? m.role_ar : m.role_en;
    var bio  = lang === 'ar' ? m.bio_ar  : m.bio_en;

    var card = document.createElement('div');
    card.className = 'team-card reveal';

    card.innerHTML =
      '<div class="team-photo ' + BG[i % BG.length] + '">' +
        (m.photo
          ? '<img src="' + m.photo + '" alt="' + name + '" loading="lazy" width="180" height="220" onerror="this.style.display=\'none\'">'
          : '') +
        '<div class="avatar-fallback">👤</div>' +
      '</div>' +
      '<div class="team-body">' +
        '<div class="team-role"  data-en="' + m.role_en + '" data-ar="' + m.role_ar + '">' + role + '</div>' +
        '<div class="team-name"  data-en="' + m.name_en + '" data-ar="' + m.name_ar + '">' + name + '</div>' +
        '<div class="team-bio"   data-en="' + m.bio_en  + '" data-ar="' + m.bio_ar  + '">' + bio  + '</div>' +
      '</div>';

    grid.appendChild(card);
  });

  // Re-apply language to newly created elements
  applyLang(lang);
  initReveal();
}

function loadTeam() {
  fetch('data/team.json')
    .then(function (r) { return r.json(); })
    .then(function (d) { renderTeam(d); })
    .catch(function () {
      var grid = document.getElementById('teamGrid');
      if (grid) grid.innerHTML =
        '<div class="loading-state" data-en="Could not load team data." data-ar="تعذّر تحميل بيانات الفريق.">' +
        'Could not load team data. Ensure data/team.json is present on the server.</div>';
    });
}

document.addEventListener('DOMContentLoaded', loadTeam);
