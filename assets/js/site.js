/* Menú, agenda y movimiento suave, sin dependencias. */
(() => {
  'use strict';
  const nav = document.querySelector('.navbar');
  const menu = document.querySelector('#main-navbar');
  const toggle = document.querySelector('.navbar-toggler');
  const dropdowns = [...document.querySelectorAll('.dropdown-toggle')];
  const setDropdown = (button, open) => {
    button.setAttribute('aria-expanded', String(open));
    button.parentElement.classList.toggle('show', open);
    button.nextElementSibling.classList.toggle('show', open);
  };
  const closeDropdowns = () => dropdowns.forEach(button => setDropdown(button, false));
  const setMenu = open => {
    menu?.classList.toggle('show', open);
    nav?.classList.toggle('top-nav-expanded', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (!open) closeDropdowns();
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  dropdowns.forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeDropdowns();
    setDropdown(button, open);
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdown')) closeDropdowns();
    if (!event.target.closest('.navbar')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = dropdowns.find(button => button.getAttribute('aria-expanded') === 'true');
    if (active) { closeDropdowns(); active.focus(); }
    else if (toggle?.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', () => setMenu(false));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const photos = [...document.querySelectorAll('.banda-parallax-img')];
  let frame = 0;
  const paint = () => {
    frame = 0;
    nav?.classList.toggle('top-nav-short', window.scrollY > 50);
    photos.forEach(photo => {
      if (reducedMotion.matches) { photo.style.transform = ''; return; }
      const rect = photo.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const ratio = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      photo.style.transform = `translateY(${ratio * 60}px)`;
    });
  };
  const schedulePaint = () => { if (!frame) frame = requestAnimationFrame(paint); };
  window.addEventListener('scroll', schedulePaint, {passive: true});
  window.addEventListener('resize', schedulePaint, {passive: true});
  reducedMotion.addEventListener('change', schedulePaint);
  schedulePaint();
  const dateInZaragoza = () => {
    const parts = new Intl.DateTimeFormat('en', {timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date());
    const part = type => parts.find(value => value.type === type).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
  };
  const updateAgenda = () => {
    const today = dateInZaragoza();
    document.querySelectorAll('[data-agenda-board]').forEach(board => {
      const future = board.querySelector('[data-upcoming]');
      const archive = board.querySelector('[data-past]');
      const events = [...board.querySelectorAll('[data-event]')];
      events.sort((a, b) => a.dataset.start.localeCompare(b.dataset.start));
      for (const event of events) {
        const past = event.dataset.end < today;
        event.classList.toggle('past-event', past);
        event.querySelector('.agenda-cta').textContent = past ? 'Ver actividad' : (event.dataset.inscription === 'true' ? 'Inscríbete' : 'Ver detalles');
        if (past) archive.prepend(event); else future.append(event);
      }
      board.querySelector('[data-agenda-empty]').hidden = future.children.length > 0;
    });
    document.querySelectorAll('[data-event-page]').forEach(page => {
      const notice = page.querySelector('[data-past-notice]');
      if (notice) notice.hidden = page.dataset.end >= today;
    });
  };
  updateAgenda();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateAgenda(); });
  if (document.querySelector('[data-agenda-board],[data-event-page]')) setInterval(updateAgenda, 60000);
})();
