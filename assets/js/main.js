/* Roomies Kenya — interactions (vanilla JS, no dependencies) */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => innerWidth <= 900;

  /* ---------------- data ---------------- */
  const IMG = "assets/img/";
  const rooms = [
    {
      kicker: "Smart & Affordable", name: "Compact Single Room", price: "18,000",
      img: "room-compact.jpg", bathroom: "Shared", extra: "Study nook",
      text: "An affordable, well-lit single room with a simple, clean design. Ideal for students or solo tenants looking for a calm space.",
      bar: "linear-gradient(90deg,#6a3a8c,#d9a441)",
    },
    {
      kicker: "Space to Breathe", name: "Bigger Single Room", price: "20,000",
      img: "room-bigger-single.jpg", bathroom: "Shared", extra: "Outdoor access",
      text: "A spacious single room designed for comfort and simplicity, with easy access to relaxing outdoor areas.",
      bar: "linear-gradient(90deg,#e2795f,#e8c13a)",
    },
    {
      kicker: "Fresh Air Included", name: "Single Room with Balcony", price: "22,000",
      img: "room-balcony.jpg", bathroom: "Shared", extra: "Private balcony",
      text: "Compact yet stylish, with a private balcony — perfect for professionals who appreciate a quiet retreat in the city.",
      bar: "linear-gradient(90deg,#3fa7a0,#b9e3a0)",
    },
    {
      kicker: "Sophisticated Comfort", name: "Ensuite Standard Size", price: "27,000",
      img: "room-ensuite-standard.jpg", bathroom: "Private ensuite", extra: "Built-in wardrobe",
      text: "A modern ensuite room with generous space and a private bathroom, for those seeking comfort and privacy.",
      bar: "linear-gradient(90deg,#c0503a,#3fa7a0)",
    },
    {
      kicker: "Comfort Redefined", name: "Ensuite Larger Size", price: "29,000",
      img: "room-ensuite-larger.jpg", bathroom: "Private ensuite", extra: "Desk & wardrobe",
      text: "Bright and airy, ideal for long stays. Modern furnishings and peaceful surroundings for those who value comfort.",
      bar: "linear-gradient(90deg,#d9a441,#6a3a8c)",
    },
    {
      kicker: "Room to Spread Out", name: "Master En-suite", price: "35,000",
      img: "room-master-ensuite.jpg", bathroom: "Private ensuite", extra: "Full-wall wardrobe",
      text: "Our largest room: a generous en-suite with a full wall of wardrobes, a work desk and plenty of open floor space.",
      bar: "linear-gradient(90deg,#141414,#e8c13a)",
    },
  ];

  const arcPhotos = [
    "area-kitchen.jpg", "room-bigger-single.jpg", "area-dining.jpg",
    "area-hallway.jpg", "room-ensuite-standard.jpg", "area-balcony.jpg", "room-balcony.jpg",
    "area-kitchen-2.jpg", "room-ensuite-larger.jpg", "area-washroom.jpg", "area-hallway-2.jpg",
    "room-compact.jpg", "area-laundry.jpg",
  ];

  /* ---------------- curved 3D strip ---------------- */
  /* Each photo is cut into thin vertical slices, and every slice sits on the
     inside of a cylinder. Seen up close in perspective, the cards' top and
     bottom edges bend and the side cards loom larger — the "panorama" look. */
  // Build the strip only when the visitor gets within ~2 screens of it: it is far down
  // the page and creating ~200 slices up front slows the first load.
  function makeArc(track, opts) {
    if (!track) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      buildArc(track, opts);
    }, { rootMargin: "1600px 0px" });
    io.observe(track.parentElement);
  }
  function buildArc(track, { speed = 0.6, widthRatio = 0.19, mobileRatio = 0.5, slices = 8, heightRatio = 1.72 } = {}) {
    const arc = track.parentElement;
    const list = [...arcPhotos, ...arcPhotos];
    // light 640px WebP copies (assets/img/web/), lazy so they load only near the strip
    track.innerHTML = list
      .map((src) => {
        const web = `${IMG}web/${src.replace(/\.jpg$/, "-640.webp")}`;
        let s = "";
        for (let j = 0; j < slices; j++) s += `<div class="arc-slice"><img src="${web}" alt="" draggable="false" loading="lazy" decoding="async"></div>`;
        return s;
      })
      .join("");
    const els = $$(".arc-slice", track);
    let cardW, cardH, gap, sliceW, total, R;

    function layout() {
      const vw = innerWidth;
      cardW = Math.round(Math.min(Math.max(vw * (vw <= 900 ? mobileRatio : widthRatio), 170), 400));
      cardH = Math.round(cardW * heightRatio);
      gap = Math.round(cardW * 0.085);
      sliceW = cardW / slices;
      total = list.length * (cardW + gap);
      R = Math.max(vw * 0.74, cardW * 3.2);
      arc.style.perspective = `${Math.max(vw * 0.47, cardW * 2.3)}px`;
      arc.style.height = `${Math.round(cardH * 1.42)}px`;
      els.forEach((el, k) => {
        const j = k % slices;
        // 1px overlap on each side hides hairline seams between slices
        el.style.width = `${sliceW + 2}px`;
        el.style.height = `${cardH}px`;
        el.style.marginLeft = `${-sliceW / 2 - 1}px`;
        el.style.marginTop = `${-cardH / 2}px`;
        const img = el.firstChild;
        img.style.width = `${cardW}px`;
        img.style.height = `${cardH}px`;
        img.style.transform = `translateX(${-j * sliceW + 1}px)`;
      });
    }
    layout();
    addEventListener("resize", layout);

    // Only animate while the strip is on (or near) the screen: off screen it would
    // otherwise restyle every slice 60 times a second for nothing.
    let onScreen = false, running = false;
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen && !running) { running = true; requestAnimationFrame(frame); }
    }, { rootMargin: "200px 0px" }).observe(arc);

    let offset = 0;
    function frame() {
      if (!onScreen || document.hidden) { running = false; return; }
      offset = (offset + (reduceMotion ? 0 : speed)) % total;
      for (let k = 0; k < els.length; k++) {
        const card = Math.floor(k / slices), j = k % slices;
        let x = card * (cardW + gap) + j * sliceW + sliceW / 2 - offset;
        x = ((x % total) + total) % total - total / 2; // wrap to [-total/2, total/2]
        const theta = x / R;
        const el = els[k];
        if (Math.abs(theta) > 1.05) { el.style.visibility = "hidden"; continue; }
        el.style.visibility = "visible";
        const tx = R * Math.sin(theta);
        const tz = R * (1 - Math.cos(theta)); // concave: edges come toward the viewer
        el.style.transform = `translate3d(${tx}px,0,${tz}px) rotateY(${-theta}rad)`;
      }
      requestAnimationFrame(frame);
    }
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && onScreen && !running) { running = true; requestAnimationFrame(frame); }
    });
  }
  makeArc($("#arcTrack"));
  makeArc($("#arcTrack2"), { speed: -0.4, widthRatio: 0.15, mobileRatio: 0.42, heightRatio: 1.5 });

  /* ---------------- scalloped badge ---------------- */
  (function scallop() {
    const p = $("#scallop");
    if (!p) return;
    const n = 14, cx = 60, cy = 60, r = 50, bump = 8;
    let d = "";
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      if (i === 0) { d += `M${x} ${y}`; continue; }
      const am = ((i - 0.5) / n) * Math.PI * 2;
      const qx = cx + (r + bump * 2) * Math.cos(am), qy = cy + (r + bump * 2) * Math.sin(am);
      d += `Q${qx} ${qy} ${x} ${y}`;
    }
    p.setAttribute("d", d + "Z");
  })();

  /* ---------------- room options (stacked cards that split on scroll) ----------------
     Each room type is a tall block with a sticky 100vh stage. As the block scrolls up
     into view its two tilted cards arrive stacked, then split left/right while the
     copy fades in between them; --s (0..1) drives it all from CSS. */
  const optionsEl = $("#roomOptions");
  if (optionsEl) {
    const detailPos = ["30% 60%", "70% 55%", "35% 45%", "75% 40%", "25% 50%", "60% 60%"];
    // 960px WebP copies of the room photos (assets/img/web/) — a fraction of the JPEG weight
    const web960 = (f) => `${IMG}web/${f.replace(/\.jpg$/, "-960.webp")}`;
    const items = rooms.map((r, i) => ({
      kicker: r.kicker, title: r.name,
      meta: `KES ${r.price} <small>/ month</small>`,
      a: { src: web960(r.img), pos: detailPos[i % detailPos.length], zoom: true, alt: `${r.name}, detail` },
      b: { src: web960(r.img), pos: "50% 50%", alt: `${r.name} at Roomies Kenya` },
      pill: "Book a viewing", room: r.name, bar: r.bar,
    }));
    optionsEl.innerHTML = items.map((it) => `
      <article class="ro-item" style="--bar:${it.bar}">
        <div class="ro-stage">
          <figure class="ro-card ro-card--b">
            <img src="${it.b.src}" alt="${it.b.alt}" loading="lazy" style="object-position:${it.b.pos}" />
          </figure>
          <figure class="ro-card ro-card--a${it.a.zoom ? " is-detail" : ""}">
            <img src="${it.a.src}" alt="${it.a.alt}" loading="lazy" style="object-position:${it.a.pos}" />
          </figure>
          <div class="ro-copy">
            <span class="ro-kicker">${it.kicker}</span>
            <h3 class="ro-title">${it.title}</h3>
            <span class="ro-meta">${it.meta}</span>
            <a class="ro-pill" href="#visit"${it.room ? ` data-room="${it.room}"` : ""}>${it.pill}</a>
            <i class="ro-bar" aria-hidden="true"></i>
          </div>
        </div>
      </article>`).join("");

    const roItems = $$(".ro-item", optionsEl);
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let roTick = false;
    function updateOptions() {
      roTick = false;
      const vh = innerHeight;
      roItems.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top > vh * 1.2 || top < -el.offsetHeight) return;
        const raw = reduceMotion ? 1 : Math.min(1, Math.max(0, (vh * 0.75 - top) / (vh * 0.75)));
        el.style.setProperty("--s", (raw * raw * (3 - 2 * raw)).toFixed(4)); // smoothstep
      });
    }
    addEventListener("scroll", () => { if (!roTick) { roTick = true; requestAnimationFrame(updateOptions); } }, { passive: true });
    addEventListener("resize", updateOptions);
    updateOptions();

    // "Book a viewing" preselects that room in the tour form
    optionsEl.addEventListener("click", (e) => {
      const a = e.target.closest("[data-room]");
      if (!a) return;
      const sel = $("#visitForm select[name=room]");
      const opt = sel && [...sel.options].find((o) => o.text.startsWith(a.dataset.room));
      if (opt) sel.value = opt.value;
    });
  }


  /* ---------------- sketch draw ---------------- */
  const sketchPaths = $$("#sketch path");
  sketchPaths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });
  const sketch = $(".sketch");
  function updateSketch() {
    const r = sketch.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight - r.top) / (r.height + innerHeight * 0.4), 0), 1);
    sketchPaths.forEach((path) => {
      const len = parseFloat(path.style.strokeDasharray);
      path.style.strokeDashoffset = len * (1 - p);
    });
  }

  /* ---------------- nav ---------------- */
  const nav = $("#nav");
  const navLinks = $$(".nav-pill a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));
  const darkZones = $$(".hero-stage, .rooms, .world, .stats, .visit, .footer");
  let lastY = scrollY;
  function updateNav() {
    const y = scrollY;
    nav.classList.toggle("hide", y > lastY && y > 300 && !$("#mobileMenu").classList.contains("open"));
    lastY = y;
    const probe = 40;
    nav.classList.toggle("on-dark", darkZones.some((z) => {
      const r = z.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    }));
    // active link = the section whose top most recently passed 40% of the screen
    // (order-independent, so it stays right even if the menu order changes)
    let current = sections[0], best = -Infinity;
    sections.forEach((s) => {
      if (!s) return;
      const t = s.getBoundingClientRect().top;
      if (t <= innerHeight * 0.4 && t > best) { best = t; current = s; }
    });
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${current.id}`));
  }

  const toggle = $(".nav-toggle");
  const menu = $("#mobileMenu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }));

  /* ---------------- scroll loop ---------------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateSketch(); updateNav();
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---------------- reveals & counters ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal, [data-split]").forEach((el) => io.observe(el));

  /* ---------------- about: word-split title + scroll-lit lead ---------------- */
  // Title: each word is a mask; its letters rise in one after another (--i counts
  // letters across the whole title so the stagger runs straight through).
  $$("[data-split]").forEach((el) => {
    el.setAttribute("aria-label", el.textContent);
    let n = 0;
    el.innerHTML = el.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w" aria-hidden="true">${[...w]
        .map((ch) => `<span style="--i:${n++}">${ch}</span>`).join("")}</span>`)
      .join(" ");
  });
  // Lead paragraph: wrap every word (keeping <strong> emphasis); words switch on
  // progressively as the paragraph travels up through the middle of the screen.
  const scrubs = $$("[data-scrub]").map((el) => {
    const wrap = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            // one span per letter, grouped in a no-wrap word so words never break
            const word = document.createElement("span"); word.className = "sw-word";
            [...part].forEach((ch) => {
              const s = document.createElement("span"); s.className = "sw"; s.textContent = ch; word.append(s);
            });
            frag.append(word);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) wrap(n);
      });
    };
    wrap(el);
    return { el, words: $$(".sw", el) };
  });
  const reduceText = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function updateScrub() {
    scrubs.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      // 0 when the paragraph's top reaches 85% of the screen, 1 when its bottom reaches 45%
      const start = innerHeight * 0.85, end = innerHeight * 0.45;
      const p = reduceText ? 1 : Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < lit));
    });
  }
  addEventListener("scroll", () => requestAnimationFrame(updateScrub), { passive: true });
  addEventListener("resize", updateScrub);
  updateScrub();

  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const t0 = performance.now();
      const dur = reduceMotion ? 1 : 1400;
      (function tick(now) {
        const k = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counterIO.observe(el));

  /* ---------------- tour form → WhatsApp ---------------- */
  const form = $("#visitForm");
  const note = $("#formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = $$("[required]", form);
    let ok = true;
    required.forEach((f) => {
      const bad = f.type === "checkbox" ? !f.checked : !f.value.trim();
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { note.textContent = "Please add your name and phone, and tick the consent box."; return; }

    const d = Object.fromEntries(new FormData(form));
    const when = d.when ? new Date(d.when).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" }) : "Flexible";
    const msg = [
      "Hi Roomies, I'd like to book a tour.",
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Room: ${d.room}`,
      `When: ${when}`,
      d.message ? `Note: ${d.message}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/254794155001?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    note.textContent = "Opening WhatsApp — send the message and we'll confirm your visit.";
    form.reset();
  });

  $("#yr").textContent = new Date().getFullYear();
})();
