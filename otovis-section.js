/* OtoVIS section: keeps the words, the progress rails and the anatomy labels in step with
   the film. No dependencies. Load it once, after the section markup, with `defer`. */
(function () {
  'use strict';
  var root = document.querySelector('[data-ovs]');
  if (!root) return;

  var FPS = 24;
  var ASSETS = 'assets/otovis/';
  var STILLS = ['poster-education.webp', 'poster-clinical.webp', 'poster-skull-base.webp'];
  // The film, shot by shot. `chapter` is the tab it belongs to, `still` the frame the poster was
  // taken from, `window` the frames its labels show for, and each label's `pts` its screen path
  // (x, y pairs as fractions of the frame, one pair every `step` frames from window[0]).
  var SHOTS = [{"chapter":0,"frames":72,"still":48,"caption":"Endoscopic view","window":[14,60],"step":3,"labels":[{"name":"Malleus","dx":70,"dy":52,"pts":[0.8114,0.4034,0.8152,0.403,0.8193,0.4025,0.8235,0.4018,0.8278,0.4012,0.8323,0.4003,0.8367,0.3993,0.8412,0.3982,0.8457,0.3971,0.8501,0.3958,0.8544,0.3945,0.8584,0.3931,0.8621,0.3919,0.8655,0.3905,0.8686,0.3893,0.8711,0.3883,0.8732,0.3875]},{"name":"Stapes","dx":-92,"dy":58,"pts":[0.6848,0.2969,0.6855,0.2963,0.6861,0.2958,0.6868,0.2952,0.6874,0.2948,0.6881,0.2942,0.6888,0.2937,0.6895,0.2931,0.6901,0.2926,0.6908,0.2921,0.6914,0.2917,0.6919,0.2913,0.6924,0.2909,0.6929,0.2906,0.6933,0.2903,0.6937,0.29,0.6939,0.2898]},{"name":"Facial Nerve","dx":62,"dy":58,"pts":[0.723,0.1621,0.724,0.1595,0.7251,0.1568,0.7263,0.1541,0.7274,0.1513,0.7286,0.1486,0.7297,0.1458,0.7308,0.143,0.7319,0.1404,0.7329,0.1379,0.7338,0.1356,0.7348,0.1334,0.7356,0.1313,0.7363,0.1295,0.7369,0.1279,0.7374,0.1266,0.7379,0.1256]}]},{"chapter":0,"frames":144,"still":126,"window":[102,130],"step":3,"labels":[{"name":"Semicircular canals","dx":-48,"dy":-30,"pts":[0.5531,0.1945,0.5478,0.1836,0.5437,0.1741,0.5412,0.167,0.5403,0.1622,0.5397,0.1583,0.5394,0.1551,0.5393,0.1526,0.5394,0.1507,0.5397,0.1494,0.5401,0.1485]},{"name":"Malleus","dx":-30,"dy":-100,"pts":[0.5027,0.4536,0.4938,0.4525,0.4863,0.4514,0.481,0.4503,0.4778,0.4492,0.4751,0.4483,0.4728,0.4474,0.4709,0.4467,0.4692,0.446,0.4679,0.4454,0.4668,0.4449]},{"name":"Stapes","dx":30,"dy":130,"pts":[0.567,0.4457,0.5618,0.4444,0.5576,0.4432,0.5549,0.4421,0.5537,0.4411,0.5528,0.4403,0.5521,0.4396,0.5516,0.4389,0.5512,0.4384,0.551,0.438,0.5509,0.4377]},{"name":"Cochlea","dx":110,"dy":96,"pts":[0.6588,0.4307,0.6562,0.429,0.6541,0.4274,0.6527,0.4261,0.6519,0.425,0.6512,0.4241,0.6504,0.4234,0.6495,0.4229,0.6487,0.4225,0.6478,0.4222,0.6469,0.422]}]},{"chapter":0,"frames":96,"still":66,"window":[34,82],"step":3,"labels":[{"name":"Malleus","dx":-100,"dy":-64,"pts":[0.6388,0.4189,0.6349,0.4181,0.6311,0.4174,0.6272,0.4168,0.6234,0.4161,0.6196,0.4154,0.6159,0.4148,0.6122,0.4141,0.6086,0.4136,0.605,0.413,0.6016,0.4126,0.5982,0.4121,0.595,0.4117,0.5919,0.4113,0.5889,0.4111,0.5861,0.4109,0.5834,0.4108]},{"name":"Incus","dx":96,"dy":-56,"pts":[0.6394,0.3539,0.6386,0.3533,0.6379,0.3527,0.6372,0.352,0.6366,0.3514,0.636,0.3508,0.6355,0.3502,0.635,0.3496,0.6346,0.3491,0.6342,0.3486,0.6339,0.3481,0.6337,0.3478,0.6336,0.3474,0.6336,0.3472,0.6336,0.347,0.6337,0.347,0.6339,0.347]},{"name":"Stapes","dx":36,"dy":92,"pts":[0.8427,0.5659,0.8432,0.5663,0.8437,0.5669,0.8441,0.5674,0.8444,0.568,0.8446,0.5686,0.8448,0.5691,0.8449,0.5697,0.8448,0.5701,0.8447,0.5706,0.8444,0.571,0.8441,0.5714,0.8435,0.5718,0.8429,0.5721,0.8421,0.5724,0.8411,0.5727,0.84,0.5729]}]},{"chapter":1,"frames":96,"still":52,"caption":"BONE BRIDGE 602® placement","window":[0,0],"step":3,"labels":[]},{"chapter":2,"frames":144,"still":126,"window":[92,130],"step":3,"labels":[{"name":"Temporal branch","dx":40,"dy":-110,"pts":[0.6309,0.3304,0.6296,0.3297,0.6282,0.329,0.6269,0.3284,0.6255,0.3278,0.6241,0.3272,0.6228,0.3266,0.6214,0.3261,0.62,0.3256,0.6186,0.3251,0.6172,0.3247,0.6158,0.3243,0.6144,0.324,0.6131,0.3237]},{"name":"Brainstem","dx":-40,"dy":-50,"pts":[0.5496,0.3621,0.55,0.3616,0.5504,0.361,0.5509,0.3605,0.5514,0.36,0.5519,0.3596,0.5524,0.3591,0.5529,0.3587,0.5535,0.3583,0.5541,0.3579,0.5547,0.3576,0.5554,0.3572,0.5561,0.357,0.5568,0.3567]},{"name":"Buccal branch","dx":20,"dy":135,"pts":[0.5994,0.4862,0.5976,0.4861,0.5958,0.486,0.594,0.4859,0.5922,0.4858,0.5904,0.4857,0.5887,0.4856,0.5869,0.4855,0.5851,0.4854,0.5833,0.4853,0.5816,0.4852,0.5798,0.4852,0.5781,0.4851,0.5764,0.485]},{"name":"Zygomatic branch","dx":52,"dy":71,"pts":[0.6244,0.4176,0.6227,0.4172,0.6211,0.4169,0.6195,0.4166,0.6178,0.4163,0.6162,0.416,0.6145,0.4157,0.6128,0.4154,0.6112,0.4151,0.6095,0.4149,0.6078,0.4146,0.6062,0.4144,0.6045,0.4143,0.6029,0.4141]}]}];

  var total = 0;
  SHOTS.forEach(function (s) {
    s.start = total;
    total += s.frames / FPS;
    s.end = total;
  });
  var CHAPTERS = [];
  SHOTS.forEach(function (s, i) {
    var c = CHAPTERS[s.chapter];
    if (!c) c = CHAPTERS[s.chapter] = { first: i, start: s.start, end: s.end };
    c.end = s.end;
  });

  var film = root.querySelector('.ovs-film');
  var video = root.querySelector('.ovs-video');
  var still = root.querySelector('.ovs-still');
  var labelHost = root.querySelector('.ovs-labels');
  var caption = root.querySelector('.ovs-shotcap');
  var chapters = [].slice.call(root.querySelectorAll('.ovs-chapter'));
  var chapterBox = root.querySelector('.ovs-chapters');
  var tabs = [].slice.call(root.querySelectorAll('.ovs-tab'));
  var toggle = root.querySelector('.ovs-toggle');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var narrow = window.matchMedia('(max-width: 860px), (max-aspect-ratio: 1/1)');

  var active = -1;
  var userPaused = false;
  var inView = false;
  var stillMode = false;
  var raf = 0;
  var box = { w: 0, h: 0, posX: 0.5, posY: 0.5 };

  /* ---------- labels ---------- */
  var labels = SHOTS.map(function (shot) {
    return shot.labels.map(function (def) {
      var el = document.createElement('div');
      el.className = 'ovs-label';
      var line = document.createElement('span');
      line.className = 'ovs-label-line';
      var text = document.createElement('span');
      text.className = 'ovs-label-text';
      text.textContent = def.name;
      el.appendChild(line);
      el.appendChild(text);
      labelHost.appendChild(el);
      return { el: el, line: line, text: text, def: def };
    });
  });

  // Film-frame fractions to pixels in the stage, allowing for object-fit: cover.
  function place(x, y) {
    var s = Math.max(box.w / 1920, box.h / 1080);
    var vw = 1920 * s;
    var vh = 1080 * s;
    return [(box.w - vw) * box.posX + x * vw, (box.h - vh) * box.posY + y * vh];
  }

  function layoutLabels() {
    var scale = Math.max(0.58, Math.min(1, box.w / 1280));
    labels.forEach(function (set) {
      set.forEach(function (l) {
        var dx = l.def.dx * scale;
        var dy = l.def.dy * scale;
        // A label that would run off the stage points the other way instead.
        var width = l.text.offsetWidth + 7;
        var last = l.def.pts.length / 2 - 1;
        var x = place(l.def.pts[last * 2], l.def.pts[last * 2 + 1])[0];
        if ((dx < 0 && x + dx - width < 8) || (dx >= 0 && x + dx + width > box.w - 8)) dx = -dx;
        l.el.style.setProperty('--len', Math.hypot(dx, dy).toFixed(1) + 'px');
        l.el.style.setProperty('--ang', Math.atan2(dy, dx).toFixed(4) + 'rad');
        l.el.style.setProperty('--tx', (dx + (dx < 0 ? -7 : 7)).toFixed(1) + 'px');
        l.el.style.setProperty('--ty', dy.toFixed(1) + 'px');
        l.el.style.setProperty('--ax', dx < 0 ? '-100%' : '0%');
      });
    });
  }

  function measure() {
    box.w = film.clientWidth;
    box.h = film.clientHeight;
    var media = stillMode ? still : video;
    var pos = getComputedStyle(media).objectPosition.split(' ');
    box.posX = parseFloat(pos[0]) / 100;
    box.posY = parseFloat(pos[1]) / 100;
    layoutLabels();
  }

  function drawLabels(index, frame) {
    labels.forEach(function (set, i) {
      var shot = SHOTS[i];
      var shown = i === index && frame >= shot.window[0] && frame <= shot.window[1];
      set.forEach(function (l) {
        l.el.classList.toggle('is-on', shown);
        if (!shown) return;
        var f = (frame - shot.window[0]) / shot.step;
        var a = Math.min(Math.floor(f), l.def.pts.length / 2 - 2);
        var k = f - a;
        var x = l.def.pts[a * 2] + (l.def.pts[a * 2 + 2] - l.def.pts[a * 2]) * k;
        var y = l.def.pts[a * 2 + 1] + (l.def.pts[a * 2 + 3] - l.def.pts[a * 2 + 1]) * k;
        var p = place(x, y);
        l.el.style.transform = 'translate3d(' + p[0].toFixed(1) + 'px,' + p[1].toFixed(1) + 'px,0)';
      });
    });
  }

  var captionText = null;
  function setCaption(text) {
    if (text === captionText) return;
    captionText = text;
    caption.classList.toggle('is-on', !!text);
    if (text) caption.textContent = text;
  }

  /* ---------- chapters ---------- */
  // On desktop the button follows the words, so it eases up or down when a headline changes
  // length. On phones the block keeps the tallest chapter's height so the page never jumps.
  function fitChapters() {
    chapterBox.style.height = narrow.matches || active < 0 ? '' : chapters[active].offsetHeight + 'px';
  }

  function setChapter(i) {
    if (i === active) return;
    active = i;
    chapters.forEach(function (c, n) { c.classList.toggle('is-active', n === i); });
    tabs.forEach(function (t, n) {
      if (n === i) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
    });
    fitChapters();
    if (stillMode) {
      still.src = ASSETS + STILLS[i];
      tabs.forEach(function (t, n) { t.querySelector('i').style.setProperty('--p', n === i ? 1 : 0); });
      var shot = SHOTS[CHAPTERS[i].first];
      setCaption(shot.caption || null);
      drawLabels(CHAPTERS[i].first, shot.still);
    }
  }

  function shotAt(t) {
    for (var i = 0; i < SHOTS.length; i++) if (t < SHOTS[i].end) return i;
    return SHOTS.length - 1;
  }

  function render() {
    var t = video.currentTime % total;
    var index = shotAt(t);
    var shot = SHOTS[index];
    var frame = (t - shot.start) * FPS;
    setChapter(shot.chapter);
    tabs.forEach(function (tab, n) {
      var c = CHAPTERS[n];
      var p = t >= c.end ? 1 : t < c.start ? 0 : (t - c.start) / (c.end - c.start);
      tab.querySelector('i').style.setProperty('--p', p.toFixed(4));
    });
    setCaption(shot.caption && frame > 14 && frame < shot.frames - 16 ? shot.caption : null);
    drawLabels(index, frame);
  }

  function loop() {
    render();
    raf = requestAnimationFrame(loop);
  }
  function startLoop() { if (!raf) raf = requestAnimationFrame(loop); }
  function stopLoop() { cancelAnimationFrame(raf); raf = 0; }

  /* ---------- playback ---------- */
  function setToggle(playing) {
    toggle.dataset.state = playing ? 'playing' : 'paused';
    toggle.setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
  }

  // load() cancels a pending play(), so it runs once and always before the first play.
  var fetched = false;
  function fetchFilm() {
    if (fetched || stillMode) return;
    fetched = true;
    video.preload = 'auto';
    video.load();
  }

  function play() {
    if (stillMode || userPaused || !inView) return;
    fetchFilm();
    var p = video.play();
    // Only a refusal to autoplay means stills; an interrupted play (scrolled away) does not.
    if (p && p.catch) p.catch(function (e) { if (e && e.name === 'NotAllowedError') goStill(); });
  }

  function goStill() {
    if (stillMode) return;
    stillMode = true;
    stopLoop();
    root.classList.add('is-still');
    video.pause();
    video.removeAttribute('src');
    while (video.firstChild) video.removeChild(video.firstChild);
    video.load();
    video.hidden = true;
    still.hidden = false;
    measure();
    var current = active < 0 ? 0 : active;
    active = -1;
    setChapter(current);
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      if (stillMode) {
        setChapter(i);
        return;
      }
      // Shots open on an empty frame, so a paused film lands on the finished picture.
      var shot = SHOTS[CHAPTERS[i].first];
      video.currentTime = userPaused ? shot.start + shot.still / FPS : shot.start + 0.02;
      render();
      play();
    });
  });

  toggle.addEventListener('click', function () {
    if (video.paused) {
      userPaused = false;
      play();
    } else {
      userPaused = true;
      video.pause();
    }
  });
  video.addEventListener('play', function () { setToggle(true); startLoop(); });
  video.addEventListener('pause', function () { setToggle(false); stopLoop(); render(); });
  video.addEventListener('seeked', render);

  // The last <source> failing means no format worked: show the stills instead.
  var sources = video.querySelectorAll('source');
  if (sources.length) {
    sources[sources.length - 1].addEventListener('error', goStill);
  }

  /* ---------- the card that opens to full width as it arrives ---------- */
  var ticking = false;
  function openCard() {
    ticking = false;
    var vh = window.innerHeight;
    var top = root.getBoundingClientRect().top;
    var p = Math.max(0, Math.min(1, 1 - (top - vh * 0.08) / (vh * 0.8)));
    var eased = p * p * (3 - 2 * p);
    var max = Math.min(40, window.innerWidth * 0.035);
    root.style.setProperty('--ovs-inset', ((1 - eased) * max).toFixed(2) + 'px');
    root.style.setProperty('--ovs-radius', ((1 - eased) * 32).toFixed(2) + 'px');
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(openCard);
  }

  /* ---------- start ---------- */
  if (narrow.matches) {
    // Phones get the lighter 720p encode.
    while (video.firstChild) video.removeChild(video.firstChild);
    var phone = document.createElement('source');
    phone.src = ASSETS + 'otovis-film-720.mp4';
    phone.type = 'video/mp4';
    phone.addEventListener('error', goStill);
    video.appendChild(phone);
  }

  measure();
  setChapter(0);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitChapters);
  window.addEventListener('resize', function () {
    measure();
    fitChapters();
    if (stillMode) drawLabels(CHAPTERS[active].first, SHOTS[CHAPTERS[active].first].still);
    else render();
    if (!reduceMotion) openCard();
  });

  if (reduceMotion || saveData) {
    goStill();
  } else {
    video.preload = 'none';
    window.addEventListener('scroll', onScroll, { passive: true });
    openCard();
    // Fetch the film shortly before it is needed, and only run it while it can be seen.
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) fetchFilm();
    }, { rootMargin: '700px 0px' }).observe(root);
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) play();
      else video.pause();
    }, { threshold: 0.2 }).observe(film);
  }
})();
