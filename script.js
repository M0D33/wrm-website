/* ==============================================
   White Rocks Mining — Shared Script
   script.js
   ============================================== */

/* ── Page Loader ──────────────────────────────
   Injected by JS so it only needs to live here.
   ─────────────────────────────────────────── */
(function () {
  var loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML =
    '<div class="l-bg"></div>' +
    '<div class="l-grid"></div>' +
    '<div class="l-logo-wrap" id="loaderLogo">' +
      '<img src="assets/logo-nav.png" class="l-logo-img" width="200" height="59" alt="White Rocks Mining"/>' +
    '</div>';
  document.body.insertBefore(loader, document.body.firstChild);

  // Start breathing after logo appears
  setTimeout(function () {
    var w = document.getElementById('loaderLogo');
    if (w) w.classList.add('breathing');
  }, 700);

  // Dismiss
  setTimeout(function () {
    loader.classList.add('exit');
    loader.addEventListener('animationend', function () {
      loader.style.display = 'none';
    }, { once: true });
  }, 1600);
})();

/* ── Navbar Injection ─────────────────────────
   Single source for navbar HTML across all pages.
   ─────────────────────────────────────────── */
(function () {
  var nav = document.createElement('nav');
  nav.id = 'navbar';
  nav.innerHTML =
    '<div class="nav-orange-rule"></div>' +
    '<a href="index.html" class="nav-logo">' +
      '<img src="assets/logo-nav.png" alt="White Rocks Mining" width="149" height="44" class="logo-img"/>' +
    '</a>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html"    data-en="Home"     data-ar="\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629">Home</a></li>' +
      '<li><a href="about.html"    data-en="About Us"  data-ar="\u0645\u0646 \u0646\u062d\u0646">About Us</a></li>' +
      '<li><a href="products.html" data-en="Products"  data-ar="\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a">Products</a></li>' +
      '<li><a href="team.html"     data-en="Our Team"  data-ar="\u0641\u0631\u064a\u0642\u0646\u0627">Our Team</a></li>' +
      '<li><a href="clients.html"  data-en="Clients"   data-ar="\u0639\u0645\u0644\u0627\u0624\u0646\u0627">Clients</a></li>' +
      '<li><a href="contact.html"  data-en="Contact"   data-ar="\u0627\u062a\u0635\u0644 \u0628\u0646\u0627">Contact</a></li>' +
    '</ul>' +
    '<div class="nav-right">' +
      '<button class="lang-toggle" id="langToggle">\u0639\u0631\u0628\u064a</button>' +
      '<a href="contact.html" class="btn-nav" data-en="Get a Quote" data-ar="\u0637\u0644\u0628 \u0639\u0631\u0636 \u0633\u0639\u0631">Get a Quote</a>' +
    '</div>' +
    '<button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>';

  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobileMenu';
  mobileMenu.innerHTML =
    '<a href="index.html"    data-en="Home"     data-ar="\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629">Home</a>' +
    '<a href="about.html"    data-en="About Us"  data-ar="\u0645\u0646 \u0646\u062d\u0646">About Us</a>' +
    '<a href="products.html" data-en="Products"  data-ar="\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a">Products</a>' +
    '<a href="team.html"     data-en="Our Team"  data-ar="\u0641\u0631\u064a\u0642\u0646\u0627">Our Team</a>' +
    '<a href="clients.html"  data-en="Clients"   data-ar="\u0639\u0645\u0644\u0627\u0624\u0646\u0627">Clients</a>' +
    '<a href="contact.html"  data-en="Contact"   data-ar="\u0627\u062a\u0635\u0644 \u0628\u0646\u0627">Contact</a>';

  // Replace existing nav if present, otherwise prepend after loader
  var existingNav = document.getElementById('navbar');
  var existingMobile = document.getElementById('mobileMenu');
  if (existingNav) {
    existingNav.parentNode.replaceChild(nav, existingNav);
  } else {
    document.body.insertBefore(nav, document.body.firstChild);
  }
  if (existingMobile) {
    existingMobile.parentNode.replaceChild(mobileMenu, existingMobile);
  } else {
    nav.insertAdjacentElement('afterend', mobileMenu);
  }
})();

/* ── Footer Injection ─────────────────────────
   Single source for footer HTML across all pages.
   To update LinkedIn URL: change href below.
   ─────────────────────────────────────────── */
(function () {
  var footer = document.createElement('footer');
  footer.innerHTML =
    '<div class="footer-inner">' +
      '<div class="footer-brand">' +
        '<a href="index.html" class="footer-logo-link">' +
          '<img src="assets/logo-footer.png" alt="White Rocks Mining" width="160" height="47" class="footer-logo-img"/>' +
        '</a>' +
        '<p class="footer-tagline"><span data-en="Pioneering " data-ar="رواد ">Pioneering </span><em data-en="mining excellence" data-ar="التميز في التعدين">mining excellence</em><span data-en=" from the heart of Saudi Arabia." data-ar=" من قلب المملكة العربية السعودية."> from the heart of Saudi Arabia.</span></p>' +
        '<a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener" class="footer-li-btn">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>' +
          '<span data-en="Follow on LinkedIn" data-ar="تابعنا على لينكدإن">Follow on LinkedIn</span>' +
        '</a>' +
      '</div>' +
      '<div>' +
        '<div class="footer-col-title" data-en="Navigate" data-ar="التنقل">Navigate</div>' +
        '<ul class="footer-col-links">' +
          '<li><a href="index.html" data-en="Home" data-ar="الرئيسية">Home</a></li>' +
          '<li><a href="about.html" data-en="About Us" data-ar="من نحن">About Us</a></li>' +
          '<li><a href="products.html" data-en="Products" data-ar="المنتجات">Products</a></li>' +
          '<li><a href="team.html" data-en="Our Team" data-ar="فريقنا">Our Team</a></li>' +
          '<li><a href="clients.html" data-en="Clients" data-ar="عملاؤنا">Clients</a></li>' +
          '<li><a href="contact.html" data-en="Contact" data-ar="اتصل بنا">Contact</a></li>' +
        '</ul>' +
      '</div>' +
      '<div>' +
        '<div class="footer-col-title" data-en="Products" data-ar="المنتجات">Products</div>' +
        '<ul class="footer-col-links">' +
          '<li><a href="products.html#silica-sand" data-en="Silica Sand" data-ar="رمل السيليكا">Silica Sand</a></li>' +
          '<li><a href="products.html#silica-flour" data-en="Silica Flour" data-ar="دقيق السيليكا">Silica Flour</a></li>' +
          '<li><a href="products.html#frac-sand" data-en="Frac Sand" data-ar="رمل الفراك">Frac Sand</a></li>' +
        '</ul>' +
      '</div>' +
      '<div>' +
        '<div class="footer-col-title" data-en="Get in Touch" data-ar="تواصل معنا">Get in Touch</div>' +
        '<ul class="footer-col-links">' +
          '<li><a href="mailto:info@whiterocksmining.com">info@whiterocksmining.com</a></li>' +
          '<li><a href="tel:+966XXXXXXXX">+966 XX XXX XXXX</a></li>' +
          '<li><a href="contact.html" class="footer-locations" data-en="Dammam · SPARK · Tayma" data-ar="الدمام · SPARK · تيماء">Dammam · SPARK · Tayma</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<span class="footer-copy" data-en="© 2026 White Rocks Mining Company. All rights reserved." data-ar="© 2026 شركة وايت روكس للتعدين. جميع الحقوق محفوظة.">© 2026 White Rocks Mining Company. All rights reserved.</span>' +
    '</div>';

  // Replace existing footer if present, otherwise append
  var existing = document.querySelector('footer');
  if (existing) {
    existing.parentNode.replaceChild(footer, existing);
  } else {
    document.body.appendChild(footer);
  }
})();

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
      if (!raw || raw.startsWith('mailto') || raw.startsWith('tel') || raw.startsWith('#') || raw.startsWith('http')) return;
      // Keep relative links relative, just add/update lang param
      var base = raw.split('?')[0];
      var hash = (raw.indexOf('#') > -1) ? raw.substring(raw.indexOf('#')) : '';
      a.href = base + '?lang=' + l + hash;
    } catch (e) {}
  });
}

/* ── Reveal animations ────────────────────────── */
function initReveal() {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () {
          e.target.classList.add('visible');
          // Release will-change after animation to free GPU memory
          setTimeout(function () {
            e.target.style.willChange = 'auto';
          }, 700);
          obs.unobserve(e.target);
        }, i * 80);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
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
  // Scroll handler — throttled via rAF for smooth performance
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var nav = document.getElementById('navbar');
        if (nav) nav.classList.toggle('scrolled', y > 40);
        var btn = document.getElementById('scrollTopBtn');
        if (btn) btn.classList.toggle('visible', y > 400);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

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
