/* BookingBee — Meevo LIVE! 2026 landing page interactions */
let started = false
export function initInteractions() {
  if (started) return
  started = true

  /* Optional: paste a form endpoint (Formspree, HubSpot, Zapier webhook…) to receive demo requests. */
  var FORM_ENDPOINT = '';

  var page = document.getElementById('page');
  var DESIGN_WIDTH = 1440;
  var MOBILE_MAX = 760;

  /* ---------- Scale the 1440px design uniformly on laptop/tablet widths ---------- */
  function fit() {
    var w = document.documentElement.clientWidth;
    page.style.zoom = (w > MOBILE_MAX && w < DESIGN_WIDTH) ? String(w / DESIGN_WIDTH) : '';
    document.documentElement.style.setProperty('--cz', String(Math.min(1, (w - 32) / 623)));
    document.documentElement.style.setProperty('--cz2', String(Math.min(1, (w - 32) / 807)));
    document.documentElement.style.setProperty('--mz', String(Math.min(1, (w - 40) / 1184)));
    document.documentElement.style.setProperty('--cz3', String(Math.min(1, (w - 32) / 447)));
  }
  fit();
  window.addEventListener('resize', fit);

  /* ---------- Header ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-item.has-menu > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1100) {
        e.preventDefault();
        link.parentElement.classList.toggle('is-expanded');
      }
    });
  });
  document.querySelectorAll('.main-nav a:not(.nav-link), .main-nav .nav-item:not(.has-menu) a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- Modals ---------- */
  var lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var f = m.querySelector('input, button:not([data-close])') || m.querySelector('button');
    if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    m.hidden = true;
    document.body.style.overflow = '';
    var slot = m.querySelector('.video-slot');
    if (slot) slot.innerHTML = '';
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(m); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.modal.is-open').forEach(closeModal);
  });

  var demo = document.getElementById('demo-modal');
  var form = document.getElementById('demo-form');
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open-demo]');
    if (!t) return;
    e.preventDefault();
    document.body.classList.remove('nav-open');
    document.querySelectorAll('.modal.is-open').forEach(function (m) { if (m !== demo) { m.classList.remove('is-open'); m.hidden = true; } });
    demo.classList.remove('is-done');
    form.elements.topic.value = t.getAttribute('data-demo-topic') || 'Demo request';
    openModal(demo);
  });
  if (location.hash === '#demo') openModal(demo);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'salon', 'email'].forEach(function (n) {
      var el = form.elements[n];
      var valid = el.value.trim() !== '' && (n !== 'email' || /\S+@\S+\.\S+/.test(el.value));
      el.style.borderColor = valid ? '' : '#e5484d';
      if (!valid) ok = false;
    });
    if (!ok) return;
    var data = Object.fromEntries(new FormData(form).entries());
    var done = function () { demo.classList.add('is-done'); form.reset(); };
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(done, done);
    } else {
      done();
    }
  });

  /* ---------- What BookingBee handles: scroll-linked accordion ---------- */
  var acc = document.getElementById('accordion');
  var items = Array.prototype.slice.call(acc.querySelectorAll('.acc-item'));
  var scroller = document.getElementById('handle-scroller');
  var handleEl = document.getElementById('handle');
  var headerEl = document.querySelector('.site-header');
  var dash = handleEl.querySelector('.dash-main');
  var toastEl = handleEl.querySelector('.toast');
  /* Dashboard mock content per accordion item — laid out like the BookingBee app (Call History / Overview screens).
     rows: [name, detail, time, status]  status: book | move | ans | live */
  var STATES = [
    { nav: 'calls', title: 'Call History', chip: 'Last night', stats: [['3', 'Answered'], ['1', 'Booked'], ['0', 'Voicemail']],
      label: 'Recent (3)',
      rows: [['Julia Stiles', 'Gel manicure · booked', '7:18 PM', 'book'], ['Jason Stantham', 'Moved to Thursday', '9:42 PM', 'move'], ['Hannah Jensen', '“Do you take walk-ins?”', '11:05 PM', 'ans']],
      toast: ['Call answered', '11:05 PM · Hannah Jensen'] },
    { nav: 'gauge', title: 'Overview', chip: 'All salons', stats: [['3', 'Locations'], ['14', 'Booked today'], ['0', 'Missed']],
      label: 'Routed today',
      rows: [['Downtown', 'Balayage with Sarah', '10:20 AM', 'book'], ['Westside', 'Men’s cut · 4:00 PM', '11:02 AM', 'book'], ['Uptown', 'Hours & parking', '12:45 PM', 'ans']],
      toast: ['Routed to Westside', 'Nearest open chair · 4:00 PM'] },
    { nav: 'calls', title: 'Call History', chip: 'Custom voice', stats: [['18', 'English'], ['6', 'Español'], ['2', 'Français']],
      label: 'Recent (3)',
      rows: [['Lucía Gómez', 'Cita para manicura', '10:12 AM', 'book'], ['Will Smith', 'Colour consult', '11:40 AM', 'book'], ['Élodie Martin', 'Rendez-vous samedi', '1:05 PM', 'move']],
      toast: ['Switched to Español', 'Caller preference detected'] },
    { nav: 'calls', title: 'Call Summaries', chip: 'Today', stats: [['26', 'Calls'], ['26', 'Summaries'], ['1', 'Flagged']],
      label: 'Latest (3)',
      rows: [['Elisabeth Olsen', 'Balayage · prefers Sarah', '9:02 AM', 'book'], ['Will Smith', 'Asked about bridal package', '9:47 AM', 'move'], ['Matt Damon', 'Full transcript saved', '10:31 AM', 'ans']],
      toast: ['Summary ready', 'Balayage · Sat 2 PM · prefers Sarah'] },
    { nav: 'settings', title: 'Settings', chip: 'Front-desk rules', stats: [['15m', 'Buffer time'], ['12', 'Active rules'], ['2', 'Hand-offs']],
      label: 'Rules (3)',
      rows: [['Colour services', 'Patch test 48h before', 'On', 'book'], ['New clients', 'Deposit required', 'On', 'move'], ['VIP callers', 'Transfer to owner', 'Hand-off', 'live']],
      toast: ['Rule applied', '15-min buffer after colour'] },
    { nav: 'h247', title: 'Questions', chip: '24/7', stats: [['41', 'Asked'], ['41', 'Answered'], ['0', 'Waiting']],
      label: 'Recent (3)',
      rows: [['Julia Stiles', '“Is there parking?”', '8:15 AM', 'ans'], ['Will Smith', '“Do you take walk-ins?”', '12:20 PM', 'ans'], ['Elisabeth Olsen', '“Aftercare for lashes?”', '9:58 PM', 'ans']],
      toast: ['Question answered', '9:58 PM · Elisabeth Olsen'] }
  ];
  var STATUS_ICON = { book: 'booked.svg', move: 'booked.svg', ans: 'msg.svg', live: 'endcall.svg' };
  var AV = ['#369eaa', '#d26176', '#7771ec', '#b76bb5'];
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function initials(n) { return n.replace(/[“”"]/g, '').split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase(); }
  var appTitle = handleEl.querySelector('.app-title');
  var appChip = handleEl.querySelector('.app-chip');
  var appNav = handleEl.querySelectorAll('.app-side [data-nav]');
  function paintDash(i) {
    var st = STATES[i];
    if (!st || !dash) return;
    if (appTitle) appTitle.textContent = st.title;
    if (appChip) appChip.textContent = st.chip;
    appNav.forEach(function (n) { n.classList.toggle('on', n.getAttribute('data-nav') === st.nav); });
    dash.innerHTML =
      '<div class="app-stats">' + st.stats.map(function (x, k) { return '<div class="app-stat s' + k + '"><b>' + esc(x[0]) + '</b><small>' + esc(x[1]) + '</small></div>'; }).join('') + '</div>' +
      '<p class="app-label">' + esc(st.label) + '</p>' +
      '<div class="app-list">' + st.rows.map(function (r, k) {
        return '<div class="app-row"><span class="av" style="background:' + AV[k % AV.length] + '">' + esc(initials(r[0])) + '</span>' +
          '<span class="who"><b>' + esc(r[0]) + '</b><small>' + esc(r[1]) + '</small></span>' +
          '<span class="tm">' + esc(r[2]) + '</span>' +
          '<span class="st ' + r[3] + '"><img src="public/assets/app/' + STATUS_ICON[r[3]] + '" alt=""></span></div>';
      }).join('') + '</div>';
    if (toastEl) {
      toastEl.querySelector('b').textContent = st.toast[0];
      toastEl.querySelector('small').textContent = st.toast[1];
    }
    handleEl.classList.remove('is-swap'); void handleEl.offsetWidth; handleEl.classList.add('is-swap');
  }
  paintDash(0);
  var progress = document.createElement('div');
  progress.className = 'handle-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = items.map(function () { return '<i></i>'; }).join('');
  acc.parentElement.appendChild(progress);
  var dots = progress.querySelectorAll('i');
  var current = 0;
  function setActive(i) {
    if (i === current) return;
    current = i;
    items.forEach(function (it, k) {
      it.classList.toggle('is-open', k === i);
      it.querySelector('.acc-head').setAttribute('aria-expanded', String(k === i));
    });
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    /* Multi-language & custom voices has its own visual (voice/language pack) instead of the dashboard */
    handleEl.classList.toggle('show-pack', i === 2);
    if (i !== 2) paintDash(i);
  }
  dots[0].classList.add('on');

  var pin = { on: false, top: 0, total: 0 };
  function layoutHandle() {
    var w = document.documentElement.clientWidth;
    scroller.style.height = '';
    scroller.style.removeProperty('--handle-zoom');
    scroller.classList.remove('is-pinned');
    pin.on = false;
    if (w <= MOBILE_MAX) return;
    var pz = parseFloat(page.style.zoom) || 1;
    var hdr = headerEl ? headerEl.getBoundingClientRect().height : 94;
    scroller.style.setProperty('--handle-zoom', '1');
    scroller.classList.add('is-pinned');
    var natural = handleEl.getBoundingClientRect().height;          /* on-screen px at zoom 1 */
    var room = window.innerHeight - hdr - 16;
    var hz = Math.min(1, room / natural);
    if (hz < 0.55) { scroller.classList.remove('is-pinned'); return; } /* very short window: leave it as a normal section */
    var shown = natural * hz;
    var step = Math.max(260, window.innerHeight * 0.42);
    pin.top = hdr + Math.max(8, (window.innerHeight - hdr - shown) / 2);
    pin.total = step * items.length;
    scroller.style.setProperty('--handle-zoom', String(hz));
    scroller.style.setProperty('--handle-top', (pin.top / (pz * hz)) + 'px');
    scroller.style.height = ((shown + pin.total) / pz) + 'px';
    scroller.classList.add('is-pinned');
    pin.on = true;
    onHandleScroll();
  }
  function onHandleScroll() {
    if (!pin.on) return;
    var r = scroller.getBoundingClientRect();
    var p = (pin.top - r.top) / pin.total;
    p = Math.max(0, Math.min(0.9999, p));
    setActive(Math.floor(p * items.length));
  }
  acc.addEventListener('click', function (e) {
    var head = e.target.closest('.acc-head');
    if (!head) return;
    var i = items.indexOf(head.parentElement);
    if (pin.on) {
      var r = scroller.getBoundingClientRect();
      var y = window.scrollY + r.top - pin.top + (i + 0.5) / items.length * pin.total;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActive(i);
  });
  window.addEventListener('scroll', onHandleScroll, { passive: true });
  window.addEventListener('resize', layoutHandle);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutHandle);
  window.addEventListener('load', layoutHandle);
  layoutHandle();

  /* ---------- FAQ ---------- */
  var faq = document.getElementById('faq-list');
  faq.addEventListener('click', function (e) {
    var q = e.target.closest('.faq-q');
    if (!q) return;
    var item = q.parentElement;
    var willOpen = !item.classList.contains('is-open');
    faq.querySelectorAll('.faq-item').forEach(function (it) {
      var open = it === item && willOpen;
      it.classList.toggle('is-open', open);
      it.querySelector('.faq-q').setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- Explore features CTA: inert until the features page link is set ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-explore-features]');
    if (a && a.getAttribute('href') === '#') e.preventDefault();
  });

  /* ---------- Generic modal triggers (e.g. AI Voice Receptionist "Learn more") ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open-modal]');
    if (!t) return;
    var m = document.getElementById(t.getAttribute('data-open-modal'));
    if (!m) return;
    e.preventDefault();
    openModal(m);
    var dlg = m.querySelector('.vr-dialog');
    if (dlg) dlg.scrollTop = 0;
    m.scrollTop = 0;
  });

  /* ---------- Voice popup: "Hear a sample call" replays the live call card ---------- */
  var callCard = document.getElementById('vr-call-card');
  var sampleTimer = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-vr-sample]');
    if (!b || !callCard) return;
    clearInterval(sampleTimer);
    callCard.classList.remove('is-playing'); void callCard.offsetWidth; callCard.classList.add('is-playing');
    b.classList.add('is-on');
    var timer = callCard.querySelector('.vr-timer'), sec = 0;
    timer.textContent = '0:00';
    sampleTimer = setInterval(function () {
      sec++; timer.textContent = '0:' + (sec < 10 ? '0' : '') + sec;
      if (sec >= 9) { clearInterval(sampleTimer); b.classList.remove('is-on'); timer.textContent = '0:42'; }
    }, 1000);
    callCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- Customer story videos (fired by the Reviews section) ---------- */
  var videoModal = document.getElementById('video-modal');
  function embedUrl(src) {
    var yt = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) return 'https://www.youtube.com/embed/' + yt[1] + '?autoplay=1&rel=0';
    var vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return 'https://player.vimeo.com/video/' + vm[1] + '?autoplay=1';
    return src;
  }
  window.addEventListener('bb:play-video', function (e) {
    var d = e.detail || {};
    var slot = videoModal.querySelector('.video-slot');
    var src = (d.src || '').trim();
    if (!src) {
      slot.innerHTML = '<div class="video-soon" style="background-image:url(\'' + d.poster + '\')"><p>' + d.title + '<small>Full video story coming soon.</small></p></div>';
    } else if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) {
      slot.innerHTML = '<video src="' + src + '" controls autoplay playsinline></video>';
    } else {
      slot.innerHTML = '<iframe src="' + embedUrl(src) + '" title="' + d.title + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    }
    openModal(videoModal);
  });

  /* ---------- Before / after slider (auto-sweeps until the visitor takes over) ---------- */
  var ba = document.getElementById('ba');
  var handle = ba.querySelector('.ba-handle');
  var BA_W = 1211;
  var bubbles = Array.prototype.slice.call(ba.querySelectorAll('.ba-bubble')).map(function (el) {
    var left = parseFloat(el.style.left), cx = (left + 162) / BA_W * 100;   // bubble centre, % of width
    return { el: el, cx: cx, before: el.classList.contains('b') };
  });
  var pos = 50;
  function setPos(pct) {
    pos = Math.max(0, Math.min(100, pct));
    ba.style.setProperty('--pos', pos + '%');
    handle.setAttribute('aria-valuenow', String(Math.round(pos)));
    bubbles.forEach(function (b) {
      var shown = b.before ? b.cx < pos : b.cx >= pos;
      b.el.classList.toggle('is-shown', shown);
    });
  }
  setPos(50);

  // fit the 1211px stage on narrow screens
  function fitBa() {
    var fit = ba.parentElement, w = fit.clientWidth;
    var z = Math.min(1, w / BA_W);
    ba.style.zoom = z < 1 ? String(z) : '';
    // keep the handle, tags and hint finger-sized on small screens
    ba.style.setProperty('--baz', String(z));
    ba.classList.toggle('is-small', z < 0.75);
  }
  fitBa();
  window.addEventListener('resize', fitBa);

  // automatic demo sweep: without → with → back to the middle, repeated while in view
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var auto = { on: false, raf: 0, t0: 0, idleTimer: 0, inView: false };
  var KEYS = [[0, 50], [1400, 50], [3000, 6], [4200, 6], [6400, 94], [7600, 94], [8800, 50]];   // [ms, pos]
  var CYCLE = 9400;
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function frame(now) {
    if (!auto.on) return;
    if (!auto.t0) auto.t0 = now;
    var t = (now - auto.t0) % CYCLE, p = 50;
    for (var i = 0; i < KEYS.length - 1; i++) {
      if (t >= KEYS[i][0] && t <= KEYS[i + 1][0]) {
        var k = (t - KEYS[i][0]) / (KEYS[i + 1][0] - KEYS[i][0]);
        p = KEYS[i][1] + (KEYS[i + 1][1] - KEYS[i][1]) * ease(k);
        break;
      }
    }
    setPos(p);
    auto.raf = requestAnimationFrame(frame);
  }
  function startAuto() {
    if (reduceMotion || auto.on || !auto.inView) return;
    auto.on = true; auto.t0 = 0; ba.classList.add('is-auto');
    // begin the cycle from wherever the handle is now
    KEYS[0][1] = pos; KEYS[1][1] = pos;
    auto.raf = requestAnimationFrame(frame);
  }
  function stopAuto() { auto.on = false; cancelAnimationFrame(auto.raf); ba.classList.remove('is-auto'); }
  function userTookOver() {
    stopAuto();
    clearTimeout(auto.idleTimer);
    auto.idleTimer = setTimeout(startAuto, 6000);   // resume the demo after 6s of no interaction
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      auto.inView = entries[0].isIntersecting;
      if (auto.inView) startAuto(); else stopAuto();
    }, { threshold: 0.45 }).observe(ba);
  }

  function fromEvent(e) {
    var r = ba.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX);
    setPos((x - r.left) / r.width * 100);
  }
  var dragging = false;
  function start(e) { userTookOver(); dragging = true; ba.classList.add('is-dragging'); fromEvent(e); }
  function move(e) { if (dragging) { fromEvent(e); if (e.cancelable) e.preventDefault(); } }
  function end() { if (dragging) userTookOver(); dragging = false; ba.classList.remove('is-dragging'); }
  ba.addEventListener('mousedown', start);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  handle.addEventListener('touchstart', start, { passive: true });
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);
  handle.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { userTookOver(); setPos(pos - 5); e.preventDefault(); }
    if (e.key === 'ArrowRight') { userTookOver(); setPos(pos + 5); e.preventDefault(); }
  });

  /* ---------- Count-up stats + reveal on scroll ---------- */
  function fmt(n, dec) { return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
  function countUp(el) {
    var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || '0', 10);
    var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    var t0 = null, dur = 1600;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(target * eased, dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.dataset.count) countUp(el); else el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal, [data-count]').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }
}
