/* Roomies Kenya: scroll-scrubbed video hero.
   The .hero-stage is sticky inside the tall .hero-pin. Scroll progress through the pin
   (0..1) is written to the CSS variable --p (which drives the card opening, the headline
   exit and the closing line in style.css) and mapped onto the video's currentTime.
   The clip is fetched as a Blob so it is always seekable, even on static servers that
   don't support HTTP range requests (python -m http.server). */
(function () {
  var pin = document.getElementById('heroPin');
  var video = document.getElementById('heroVideo');
  var media = document.getElementById('heroMedia');
  if (!pin || !video || !media) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.matchMedia('(max-width: 860px), (hover: none) and (pointer: coarse)').matches;
  var ready = false, target = 0, cur = 0, progress = 0, ticking = false;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }

  function read() {
    ticking = false;
    var r = pin.getBoundingClientRect();
    var span = r.height - window.innerHeight;
    progress = span > 0 ? clamp(-r.top / span) : 0;
    pin.style.setProperty('--p', progress.toFixed(4));
    target = progress;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(read); } }

  // Smoothly ease currentTime toward the scroll target; never queue a seek while one
  // is still in flight (keeps fast flicks from freezing the decoder on phones).
  function loop() {
    if (ready && !video.seeking) {
      cur += (target - cur) * 0.16;
      var t = Math.min(cur, 0.999) * (video.duration || 0);
      if (Math.abs(video.currentTime - t) > (mobile ? 0.03 : 0.012)) {
        try { video.currentTime = t; } catch (e) {}
      }
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  read();

  // Reduced motion: keep the still poster and the text transitions, skip the video.
  if (reduce) return;

  var src = (mobile && video.dataset.srcMobile) || video.dataset.src;

  // 1) Stream straight away: hosts like Vercel serve byte ranges, so the first frames
  //    show within a second instead of waiting for the whole file.
  video.preload = 'auto';
  video.addEventListener('loadeddata', function () {
    ready = true;
    media.classList.add('is-ready');
  }, { once: true });
  video.src = src;

  // 2) Meanwhile download the full file; once it is in memory, swap to it (keeping the
  //    current frame) so scrubbing is perfectly smooth and also works on servers
  //    without range support (python -m http.server).
  fetch(src).then(function (res) {
    if (!res.ok) throw new Error(res.status);
    return res.blob();
  }).then(function (blob) {
    var t = video.currentTime || 0.001;
    var swapReady = false;
    video.addEventListener('loadedmetadata', function () {
      swapReady = true;
      try { video.currentTime = t; } catch (e) {}
      ready = true;
      media.classList.add('is-ready');
    }, { once: true });
    ready = false;                      // pause scrubbing for the instant of the swap
    video.src = URL.createObjectURL(blob);
    setTimeout(function () { if (!swapReady) ready = true; }, 1500);
  }).catch(function () { /* keep streaming the original URL */ });

  // iOS paints a muted, never-played video only after a gesture: prime it once.
  function prime() {
    var p = video.play();
    if (p && p.then) p.then(function () { video.pause(); }).catch(function () {});
  }
  window.addEventListener('touchstart', prime, { once: true, passive: true });

  requestAnimationFrame(loop);
})();
