/* Roomies Kenya: Lenis smooth scrolling, in-page navigation and the go-to-top button.
   Lenis (assets/vendor/lenis.min.js, v1.1.13) drives the real window scroll, so every
   scroll-linked effect on the page (hero video, room cards, walkthrough, nav) keeps
   reading window.scrollY / getBoundingClientRect as before. Skipped entirely for
   visitors who prefer reduced motion: they get normal native scrolling. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lenis = null;

  if (!reduce && window.Lenis) {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, // expo out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    });
    window.lenis = lenis;
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // Scroll to a target (element, selector or number) through Lenis when it is running.
  function goTo(target, immediate) {
    if (lenis) {
      // start() + force: a link tapped inside the open mobile menu fires while Lenis is
      // still paused for the menu, so make sure it is running before scrolling.
      lenis.start();
      lenis.scrollTo(target, { offset: 0, duration: 1.6, immediate: !!immediate, force: true });
    } else {
      var top = typeof target === 'number' ? target
        : (typeof target === 'string' ? document.querySelector(target) : target).getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  window.roomiesScrollTo = goTo;

  // Every in-page link (#home, #rooms, #world, #about, #amenities, #visit, …).
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#') return;                       // placeholder social links
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    goTo(id === '#home' ? 0 : el);
    if (history.replaceState) history.replaceState(null, '', id);
  });

  // Freeze smooth scrolling while the full-screen mobile menu is open.
  var menu = document.getElementById('mobileMenu');
  if (menu && lenis) {
    new MutationObserver(function () {
      if (menu.classList.contains('open')) lenis.stop(); else lenis.start();
    }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  }

  // Arriving with a hash in the URL (e.g. a shared link to #rooms): jump there once the
  // page has finished laying out (the pinned sections only get their height from JS).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash && location.hash.length > 1) {
    var start = document.querySelector(location.hash);
    if (start) {
      var jump = function () { goTo(start, true); };
      if (document.readyState === 'complete') setTimeout(jump, 300);
      else window.addEventListener('load', function () { setTimeout(jump, 300); });
    }
  }

  // Go-to-top button: appears after the first screen, ring fills with page progress.
  var btn = document.getElementById('toTop');
  var bar = document.getElementById('toTopBar');
  if (btn) {
    var C = 2 * Math.PI * 24;
    if (bar) { bar.style.strokeDasharray = C; bar.style.strokeDashoffset = C; }
    var update = function () {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      btn.classList.toggle('is-visible', y > window.innerHeight * 0.9);
      if (bar && max > 0) bar.style.strokeDashoffset = C * (1 - Math.min(1, y / max));
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    btn.addEventListener('click', function () { goTo(0); });
  }
})();
