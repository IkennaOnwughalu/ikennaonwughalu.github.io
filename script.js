/* ═══════════════════════════════════════════
   IKECOZ PORTFOLIO — main.js
   ═══════════════════════════════════════════ */

'use strict';

/* ─── 1. CUSTOM CURSOR ─── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  /* Ring follows with lerp */
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Hover effect on interactive elements */
  document.querySelectorAll('a, button, .project-card, .skill-category, .hcard').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
  });
}

/* ─── 2. NAV: SCROLL DARKEN + ACTIVE LINK ─── */
function initNav() {
  const nav      = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  if (!nav) return;

  /* Darken nav on scroll */
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Scroll spy */
  if (!sections.length || !links.length) return;
  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(function (s) { spy.observe(s); });
}

/* ─── 3. HAMBURGER ─── */
function initBurger() {
  const btn  = document.getElementById('burger');
  const menu = document.getElementById('navLinks');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    const s = btn.querySelectorAll('span');
    if (open) {
      s[0].style.transform = 'translateY(7px) rotate(45deg)';
      s[1].style.opacity   = '0';
      s[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      s[0].style.transform = '';
      s[1].style.opacity   = '';
      s[2].style.transform = '';
    }
  });

  /* Close on link click */
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      const s = btn.querySelectorAll('span');
      s[0].style.transform = '';
      s[1].style.opacity   = '';
      s[2].style.transform = '';
    });
  });
}

/* ─── 4. SCROLL REVEAL ─── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(function (el) { observer.observe(el); });
}

/* ─── 5. COUNTER ANIMATION ─── */
function animateCounter(el, target, duration) {
  var start = 0;
  var step  = target / (duration / 16);

  function tick() {
    start += step;
    if (start >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = Math.floor(start);
    requestAnimationFrame(tick);
  }
  tick();
}

function initCounters() {
  var counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target, 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { observer.observe(c); });
}

/* ─── 6. SMOOTH SCROLL ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ─── 7. CONTACT FORM ─── */
function initContactForm() {
  var form     = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = document.getElementById('fname').value.trim();
    var email   = document.getElementById('femail').value.trim();
    var message = document.getElementById('fmessage').value.trim();
    var btn     = form.querySelector('.form-submit-btn');

    /* Basic validation */
    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all required fields.';
      feedback.className   = 'form-feedback error';
      return;
    }

    var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className   = 'form-feedback error';
      return;
    }

    /* Simulate sending */
    btn.textContent      = 'Sending…';
    btn.style.opacity    = '0.7';
    btn.style.pointerEvents = 'none';
    feedback.textContent = '';

    setTimeout(function () {
      feedback.textContent = '✓ Message received! I\'ll get back to you soon.';
      feedback.className   = 'form-feedback success';
      form.reset();
      btn.textContent      = 'Send Message →';
      btn.style.opacity    = '';
      btn.style.pointerEvents = '';
    }, 1600);
  });
}

/* ─── 8. HERO PARALLAX (subtle) ─── */
function initParallax() {
  var bgText = document.querySelector('.hero-bg-text');
  if (!bgText) return;

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y < window.innerHeight) {
      bgText.style.transform = 'translate(-50%, calc(-50% + ' + y * 0.15 + 'px))';
    }
  }, { passive: true });
}

/* ─── 9. PROJECT CARD TILT ─── */
function initTilt() {
  document.querySelectorAll('.project-card:not(.project-cta)').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect  = card.getBoundingClientRect();
      var cx    = rect.left + rect.width  / 2;
      var cy    = rect.top  + rect.height / 2;
      var dx    = (e.clientX - cx) / (rect.width  / 2);
      var dy    = (e.clientY - cy) / (rect.height / 2);
      var rotX  = dy * -5;
      var rotY  = dx *  5;
      card.style.transform = 'translateY(-6px) perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
}

/* ─── 10. TYPING EFFECT on hero heading ─── */
function initTypingAccent() {
  /* Adds a blinking cursor after the heading em tag */
  var em = document.querySelector('.hero-heading em');
  if (!em) return;

  var caret = document.createElement('span');
  caret.setAttribute('aria-hidden', 'true');
  caret.style.cssText = [
    'display:inline-block',
    'width:3px',
    'height:0.85em',
    'background:#f47c20',
    'margin-left:4px',
    'vertical-align:middle',
    'animation:blink 1.1s step-end infinite',
    'border-radius:2px'
  ].join(';');

  var style = document.createElement('style');
  style.textContent = '@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }';
  document.head.appendChild(style);

  em.appendChild(caret);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', function () {
  initCursor();
  initNav();
  initBurger();
  initReveal();
  initCounters();
  initSmoothScroll();
  initContactForm();
  initParallax();
  initTilt();
  initTypingAccent();
});