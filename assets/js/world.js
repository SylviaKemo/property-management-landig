/* Roomies Kenya: scroll-driven walkthrough of the real apartment.
   Three Higgsfield clips (Seedance 2.0, 720p), each starting on one real photo and
   gliding into the next: hallway → kitchen → balcony doorway → out onto the balcony.
   Sources: scroll-world/walk2/. Previous versions: world-real-v1.js, world-clay.js. */
(function () {
  var host = document.getElementById('world');
  if (!host || !window.mountScrollWorld) return;
  var R = 'assets/world/real2/';
  // Clips re-encoded for fast seeking (keyframe every 2-3 frames, no B-frames) with
  // lighter 640px versions for phones. Bump V whenever the clip files change.
  var V = '?v=2';

  // Build the section once the page has loaded and the browser is idle (it sits ~13
  // screens down, so there is no rush, and building it during the first paint slowed
  // the page). Its height is reserved in CSS (.world min-height) so links to the
  // sections below land in the right place either way. A link straight to a section
  // (#world, #about, …) builds it immediately.
  var mounted = false, wantPreload = false;
  function mount() {
    if (mounted) return;
    mounted = true;
    mountScrollWorld(host, {
    embedded: true,
    // slow connection / Data Saver (detected in smooth.js): stills only, no video download
    stillsOnly: !!window.roomiesLite,
    nav: false,
    atmosphere: false,
    hint: '',
    diveScroll: 1.5,
    crossfade: 0.2,
    sections: [
      {
        id: 'hallway', label: 'Step inside',
        still: R + 'walk-1.webp', clip: R + 'walk-1.mp4' + V, clipMobile: R + 'walk-1-m.mp4' + V,
        accent: '#D9A441', scroll: 1.6, linger: 0.3,
        eyebrow: 'Take a walk through',
        title: 'Shared Spaces'
      },
      {
        id: 'kitchen', label: 'Kitchen',
        still: R + 'walk-2.webp', clip: R + 'walk-2.mp4' + V, clipMobile: R + 'walk-2-m.mp4' + V,
        accent: '#D9A441', scroll: 1.6, linger: 0.3,
        eyebrow: 'Shared spaces',
        title: 'The kitchen'
      },
      {
        id: 'balcony', label: 'Balcony',
        still: R + 'walk-3.webp', clip: R + 'walk-3.mp4' + V, clipMobile: R + 'walk-3-m.mp4' + V,
        accent: '#E8C13A', scroll: 1.7, linger: 0.35,
        eyebrow: 'Shared spaces',
        title: 'The balcony'
      }
    ],
    // Each clip already glides into the next room, so no separate connectors.
    connectors: [null, null]
    });
    if (wantPreload) startPreload();
  }
  function idle(fn) { (window.requestIdleCallback || function (f) { return setTimeout(f, 200); })(fn, { timeout: 1500 }); }
  // Build on the visitor's first scroll / tap / key (in idle time) — they are then
  // still ~13 screens away. A link straight to a section builds it immediately.
  if (location.hash && location.hash.length > 1) mount();
  else {
    ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (ev) {
      window.addEventListener(ev, function () { idle(mount); }, { once: true, passive: true });
    });
  }
  // safety net: never let a fast scroller reach the section before it is built
  window.addEventListener('scroll', function onNear() {
    if (host.getBoundingClientRect().top < window.innerHeight * 3) {
      window.removeEventListener('scroll', onNear);
      mount();
    }
  }, { passive: true });

  // Preload the walkthrough clips well before the visitor gets here (the section
  // starts ~13 screens down). Start once the hero video has finished downloading AND
  // the visitor has started using the page (first scroll, tap or key) — every real
  // visitor does that long before reaching this section, while the initial page load
  // stays light. Scrolling past the hero starts it regardless. Clips then load one
  // at a time in scroll order.
  function startPreload() { if (host.swPreload) host.swPreload(); else wantPreload = true; }
  var heroDone = !!window.roomiesHeroDone, engaged = false;
  function maybeStart() { if (heroDone && engaged) startPreload(); }
  if (!heroDone) window.addEventListener('roomies:hero-done', function () { heroDone = true; maybeStart(); }, { once: true });
  ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, function onFirst() {
      if (engaged) return;
      engaged = true; maybeStart();
    }, { once: true, passive: true });
  });
  var hero = document.getElementById('heroPin');
  window.addEventListener('scroll', function onScroll() {
    if (hero && hero.getBoundingClientRect().bottom < window.innerHeight) {
      window.removeEventListener('scroll', onScroll);
      startPreload();
    }
  }, { passive: true });
})();
