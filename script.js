document.addEventListener('DOMContentLoaded', function () {
  var yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open', !expanded);
      document.body.classList.toggle('nav-open', !expanded);
    });

    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (navMenu.classList.contains('open')) {
          navToggle.click();
        }
      });
    });
  }

  var root = document.documentElement;
  var themeToggle = document.querySelector('.theme-toggle');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  var storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    root.setAttribute('data-theme', storedTheme);
  } else {
    root.setAttribute('data-theme', prefersDark.matches ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var form = document.querySelector('.contact-form');
  var statusEl = document.querySelector('.form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) statusEl.textContent = 'Enviando…';
      setTimeout(function () {
        if (statusEl) statusEl.textContent = '¡Mensaje enviado! Te responderé pronto.';
        if (form instanceof HTMLFormElement) form.reset();
        setTimeout(function () { if (statusEl) statusEl.textContent = ''; }, 3500);
      }, 500);
    });
  }
});