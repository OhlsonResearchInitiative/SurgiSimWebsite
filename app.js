(() => {
  'use strict';

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- nav ---------------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', open);
    navLinks.classList.toggle('open', open);
  });
  navLinks.addEventListener('click', e => {
    if (e.target.closest('a')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    }
  });

  // highlight the section in view
  const linkFor = new Map([...navLinks.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const a = linkFor.get(e.target.id);
      if (a && e.isIntersecting) {
        linkFor.forEach(l => l.classList.remove('active'));
        a.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  linkFor.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  // the last section is too short to cross the middle of the viewport
  addEventListener('scroll', () => {
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) {
      linkFor.forEach(l => l.classList.remove('active'));
      linkFor.get('institutions').classList.add('active');
    }
  }, { passive: true });

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ------------- pause animations offscreen ------------- */
  const vis = new IntersectionObserver(entries => {
    entries.forEach(e => {
      e.target.classList.toggle('offscreen', !e.isIntersecting);
      e.target.querySelectorAll('svg').forEach(svg => {
        if (!svg.pauseAnimations) return;
        if (e.isIntersecting && !reduceMotion) svg.unpauseAnimations(); else svg.pauseAnimations();
      });
    });
  }, { rootMargin: '80px 0px' });
  document.querySelectorAll('[data-anim]').forEach(el => vis.observe(el));
  if (reduceMotion) document.querySelectorAll('svg').forEach(s => s.pauseAnimations && s.pauseAnimations());

  /* ---------------- hardware configurator ---------------- */
  const hw = document.getElementById('hw');
  const swSrd = document.getElementById('swSrd');
  const swHap = document.getElementById('swHap');
  const outTitle = document.getElementById('hwOutTitle');
  const outText = document.getElementById('hwOutText');
  const meter = [...document.querySelectorAll('.hw-out-meter i')];
  const rows = [...document.querySelectorAll('.hw-table tbody tr')];
  const hwState = { srd: true, hap: true };
  const OUT = {
    '00': ['Specimen viewer', 'Explore and inspect patient-specific anatomy on a desktop or laptop computer.'],
    '10': ['3D visualization', 'Adds glasses-free 3D viewing of the anatomy on a spatial reality display.'],
    '01': ['Tactile dissection', 'Adds force-feedback dissection with a haptic device.'],
    '11': ['Full surgical simulation experience', '3D visualization and tactile dissection together, on the patient’s own anatomy.'],
  };
  function renderHw() {
    hw.classList.toggle('has-srd', hwState.srd);
    hw.classList.toggle('has-hap', hwState.hap);
    swSrd.setAttribute('aria-checked', hwState.srd);
    swHap.setAttribute('aria-checked', hwState.hap);
    const key = `${+hwState.srd}${+hwState.hap}`;
    const tier = hwState.srd + hwState.hap;
    outTitle.textContent = OUT[key][0];
    outText.textContent = OUT[key][1];
    meter.forEach((m, i) => m.classList.toggle('on', i <= tier));
    rows.forEach((r, i) => r.classList.toggle('current', i === tier));
  }
  swSrd.addEventListener('click', () => { hwState.srd = !hwState.srd; renderHw(); });
  swHap.addEventListener('click', () => { hwState.hap = !hwState.hap; renderHw(); });
  // clicking an empty slot's + adds only that device
  document.querySelector('.slot-srd').addEventListener('click', () => { hwState.srd = true; renderHw(); });
  document.querySelector('.slot-hap').addEventListener('click', () => { hwState.hap = true; renderHw(); });
  rows.forEach((r, i) => r.addEventListener('click', () => {
    if (i === 0) { hwState.srd = false; hwState.hap = false; }
    if (i === 1 && hwState.srd + hwState.hap !== 1) { hwState.srd = true; hwState.hap = false; }
    if (i === 2) { hwState.srd = true; hwState.hap = true; }
    renderHw();
  }));
  renderHw();

})();
