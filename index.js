/* ==============================================
   index.js — Homepage only
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Stat counters ──────────────────────────── */
  var targets = { s1: 3, s2: 50, s3: 100, s4: 5 };

  // Set static values immediately so they always show
  Object.entries(targets).forEach(function (entry) {
    var el = document.getElementById(entry[0]);
    if (el) el.textContent = entry[1];
  });

  function runCounters() {
    Object.entries(targets).forEach(function (entry) {
      var id = entry[0], max = entry[1];
      var el = document.getElementById(id);
      if (!el) return;
      var c = 0;
      var iv = setInterval(function () {
        c = Math.min(c + Math.max(1, Math.ceil(max / 50)), max);
        el.textContent = c;
        if (c >= max) clearInterval(iv);
      }, 28);
    });
  }

  var counted = false;
  var statsEl = document.getElementById('stats');
  if (statsEl) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !counted) {
          counted = true;
          // Reset to 0 then animate
          Object.keys(targets).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.textContent = 0;
          });
          runCounters();
        }
      });
    }, { threshold: 0 }).observe(statsEl);
  }

  /* ── Team preview ───────────────────────────── */
  var BG = ['bg-1', 'bg-2', 'bg-3', 'bg-4'];
  fetch('data/team.json')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var grid = document.getElementById('homeTeamGrid');
      if (!grid) return;
      grid.innerHTML = '';
      d.team.forEach(function (m, i) {
        var name = lang === 'ar' ? m.name_ar : m.name_en;
        var role = lang === 'ar' ? m.role_ar : m.role_en;
        var card = document.createElement('a');
        card.href = 'team.html';
        card.className = 'team-card reveal';
        card.innerHTML =
          '<div class="team-photo ' + BG[i % BG.length] + '">' +
            (m.photo ? '<img src="' + m.photo + '" alt="' + name + '" loading="lazy" width="180" height="220" onerror="this.style.display=\'none\'">' : '') +
            '<div class="tp-inner">👤</div>' +
          '</div>' +
          '<div class="team-body">' +
            '<div class="team-name" data-en="' + m.name_en + '" data-ar="' + m.name_ar + '">' + name + '</div>' +
            '<div class="team-role" data-en="' + m.role_en + '" data-ar="' + m.role_ar + '">' + role + '</div>' +
          '</div>';
        grid.appendChild(card);
      });
      applyLang(lang);
      initReveal();
    })
    .catch(function () {}); // fail silently on homepage

  /* ── Marquee — load from clients.json ──────── */
  fetch('data/clients.json')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var track = document.getElementById('mTrack');
      if (!track) return;
      track.innerHTML = '';
      d.clients.forEach(function (c) {
        var box = document.createElement('div');
        box.className = 'client-box';
        box.setAttribute('data-en', c.name_en);
        box.setAttribute('data-ar', c.name_ar);
        box.textContent = lang === 'ar' ? c.name_ar : c.name_en;
        track.appendChild(box);
      });
      // Clone track for seamless loop
      var clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.parentNode.appendChild(clone);
      applyLang(lang);
    })
    .catch(function () {});

});
