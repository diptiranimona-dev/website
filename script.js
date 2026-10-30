(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- Active section link ---------- */
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a[href^="#"]'));
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Lightbox ---------- */
  var dlg = document.getElementById('lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return; // links still open the image directly

  var img = dlg.querySelector('.lb__img');
  var cap = dlg.querySelector('.lb__cap');
  var count = dlg.querySelector('.lb__count');
  var items = [];
  var index = 0;
  var opener = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var el = items[index];
    img.src = el.getAttribute('href');
    img.alt = el.getAttribute('data-caption') || '';
    cap.textContent = el.getAttribute('data-caption') || '';
    count.textContent = items.length > 1 ? '(' + (index + 1) + '/' + items.length + ')' : '';
  }

  function open(el) {
    var group = el.getAttribute('data-group');
    items = Array.prototype.slice.call(
      document.querySelectorAll('[data-lightbox][data-group="' + group + '"]')
    );
    opener = el;
    if (items.length > 1) dlg.removeAttribute('data-single');
    else dlg.setAttribute('data-single', '');
    show(items.indexOf(el));
    dlg.showModal();
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-lightbox]');
    if (!el) return;
    e.preventDefault();
    open(el);
  });

  dlg.querySelector('.lb__close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb__prev').addEventListener('click', function () { show(index - 1); });
  dlg.querySelector('.lb__next').addEventListener('click', function () { show(index + 1); });

  // click on the dark backdrop closes
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) dlg.close();
  });

  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });

  // swipe on touch screens
  var startX = null;
  dlg.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });

  dlg.addEventListener('close', function () {
    img.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
