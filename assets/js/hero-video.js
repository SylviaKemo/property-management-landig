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

  // Reduced motion, or lite mode (slow connection / Data Saver, see smooth.js): keep the
  // still poster and the text transitions, and never download the video.
  if (reduce || window.roomiesLite) return;

  var src = (mobile && video.dataset.srcMobile) || video.dataset.src;

  // Loading indicator: a "Loading video" pill until the first frame shows, and a thin
  // honey bar along the bottom that fills as the full file downloads.
  var stage = pin.querySelector('.hero-stage');
  var loader = document.createElement('div');
  loader.className = 'hero-loader';
  loader.setAttribute('role', 'status');
  loader.innerHTML = '<i aria-hidden="true"></i><span>Loading video</span>';
  var bar = document.createElement('div');
  bar.className = 'hero-progress';
  bar.innerHTML = '<span></span>';
  stage.appendChild(loader); stage.appendChild(bar);
  function setProgress(p) { bar.firstChild.style.transform = 'scaleX(' + clamp(p).toFixed(3) + ')'; }
  function hideLoader() { loader.classList.add('is-done'); }
  function hideBar() { bar.classList.add('is-done'); }
  // Give up gracefully: if nothing has shown after 15 s, drop the indicators and leave
  // the still poster up (the download keeps going quietly in the background).
  var giveUp = setTimeout(function () { if (!ready) { hideLoader(); hideBar(); } }, 15000);

  // 1) Stream straight away: hosts like Vercel serve byte ranges, so the first frames
  //    show within a second instead of waiting for the whole file.
  video.preload = 'auto';
  video.addEventListener('loadeddata', function () {
    ready = true;
    media.classList.add('is-ready');
    hideLoader();
  }, { once: true });
  video.addEventListener('error', function () {
    // a broken stream leaves the poster up; the full download below may still rescue it
    hideLoader();
  });
  video.src = src;

  // 2) Meanwhile download the full file (reporting progress); once it is in memory,
  //    swap to it (keeping the current frame) so scrubbing is perfectly smooth and also
  //    works on servers without range support (python -m http.server).
  fetch(src).then(function (res) {
    if (!res.ok) throw new Error(res.status);
    var total = +res.headers.get('content-length') || 0;
    if (!res.body || !total || !window.Response) return res.blob();
    var reader = res.body.getReader(), chunks = [], got = 0;
    function pump() {
      return reader.read().then(function (r) {
        if (r.done) return new Blob(chunks, { type: 'video/mp4' });
        chunks.push(r.value); got += r.value.length; setProgress(got / total);
        return pump();
      });
    }
    return pump();
  }).then(function (blob) {
    clearTimeout(giveUp);
    setProgress(1); setTimeout(hideBar, 400); hideLoader();
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
  }).catch(function () {
    // keep streaming the original URL; just stop showing download progress
    hideBar();
    if (ready) hideLoader();
  });

  // iOS paints a muted, never-played video only after a gesture: prime it once.
  function prime() {
    var p = video.play();
    if (p && p.then) p.then(function () { video.pause(); }).catch(function () {});
  }
  window.addEventListener('touchstart', prime, { once: true, passive: true });

  requestAnimationFrame(loop);
})();
