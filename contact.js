/* ==============================================
   contact.js — Contact page only
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {

  var submitBtn = document.getElementById('submitBtn');
  if (!submitBtn) return;

  /* ── Validation rules ── */
  var rules = {
    'f-name': {
      required: true,
      minLen: 2,
      en: 'Please enter your full name (at least 2 characters).',
      ar: 'يرجى إدخال اسمك الكامل (حرفان على الأقل).'
    },
    'f-company': {
      required: true,
      minLen: 2,
      en: 'Please enter your company name.',
      ar: 'يرجى إدخال اسم شركتك.'
    },
    'f-email': {
      required: true,
      email: true,
      en: 'Please enter a valid email address.',
      ar: 'يرجى إدخال عنوان بريد إلكتروني صحيح.'
    },
    'f-phone': {
      required: true,
      phone: true,
      en: 'Please enter a valid phone number (digits, +, spaces only).',
      ar: 'يرجى إدخال رقم هاتف صحيح (أرقام و+ ومسافات فقط).'
    },
    'f-message': {
      required: true,
      minLen: 10,
      en: 'Please enter a message (at least 10 characters).',
      ar: 'يرجى كتابة رسالتك (10 أحرف على الأقل).'
    }
  };

  /* ── Helpers ── */
  function getLang() {
    return (typeof lang !== 'undefined' ? lang : null) ||
           localStorage.getItem('wrm_lang') || 'en';
  }

  function validate(id) {
    var el = document.getElementById(id);
    if (!el) return true;
    var val = el.value.trim();
    var rule = rules[id];
    var ok = true;

    if (rule.required && !val) ok = false;
    if (ok && rule.minLen && val.length < rule.minLen) ok = false;
    if (ok && rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) ok = false;
    if (ok && rule.phone && val && !/^[\d\s\+\-\(\)]{6,20}$/.test(val)) ok = false;

    setError(el, ok ? null : rule[getLang() === 'ar' ? 'ar' : 'en']);
    return ok;
  }

  function setError(el, msg) {
    var wrapper = el.closest('.form-group');
    if (!wrapper) return;
    var existing = wrapper.querySelector('.field-error');

    if (msg) {
      el.classList.add('field-invalid');
      el.classList.remove('field-valid');
      if (!existing) {
        var err = document.createElement('div');
        err.className = 'field-error';
        wrapper.appendChild(err);
        existing = err;
      }
      existing.textContent = msg;
    } else {
      el.classList.remove('field-invalid');
      if (el.value.trim()) el.classList.add('field-valid');
      if (existing) existing.remove();
    }
  }

  /* ── Blur validation ── */
  Object.keys(rules).forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', function () { validate(id); });
    el.addEventListener('input', function () {
      // Clear error as soon as user starts correcting
      var wrapper = el.closest('.form-group');
      if (wrapper && wrapper.querySelector('.field-error')) validate(id);
    });
  });

  /* ── Submit ── */
  submitBtn.addEventListener('click', function () {
    var allValid = Object.keys(rules).map(validate).every(Boolean);
    if (!allValid) {
      // Scroll to first error
      var first = document.querySelector('.field-invalid');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    submitBtn.disabled = true;
    var submitText = document.getElementById('submitText');
    if (submitText) submitText.textContent = getLang() === 'ar' ? 'جاري الإرسال...' : 'Sending...';

    // Simulate submission (replace with Formspree fetch when live)
    setTimeout(function () {
      var formContent = document.getElementById('formContent');
      var formSuccess = document.getElementById('formSuccess');
      if (formContent) formContent.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.querySelectorAll('[data-en]').forEach(function (el) {
          el.textContent = el.getAttribute('data-' + getLang());
        });
      }
    }, 900);
  });

});
