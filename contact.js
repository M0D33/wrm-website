/* ==============================================
   contact.js — Contact page only
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {

  var submitBtn = document.getElementById('submitBtn');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', function () {
    var name    = (document.getElementById('f-name')    || {}).value || '';
    var company = (document.getElementById('f-company') || {}).value || '';
    var email   = (document.getElementById('f-email')   || {}).value || '';
    var phone   = (document.getElementById('f-phone')   || {}).value || '';
    var message = (document.getElementById('f-message') || {}).value || '';

    name    = name.trim();
    email   = email.trim();
    message = message.trim();

    if (!name || !email || !message) {
      alert(lang === 'ar'
        ? 'يرجى ملء الحقول المطلوبة: الاسم والبريد الإلكتروني والرسالة.'
        : 'Please fill in all required fields: name, email, and message.');
      return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(lang === 'ar'
        ? 'يرجى إدخال عنوان بريد إلكتروني صحيح.'
        : 'Please enter a valid email address.');
      return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    var submitText = document.getElementById('submitText');
    if (submitText) submitText.textContent = lang === 'ar' ? 'جاري الإرسال...' : 'Sending...';

    // Simulate submission (replace with Formspree fetch when live)
    setTimeout(function () {
      var formContent = document.getElementById('formContent');
      var formSuccess = document.getElementById('formSuccess');
      if (formContent) formContent.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.querySelectorAll('[data-en]').forEach(function (el) {
          el.textContent = el.getAttribute('data-' + lang);
        });
      }
    }, 900);
  });

});
