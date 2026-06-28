/* ─────────────────────────────────────────────
   SOL Clash Whitepaper – Navigation & UI logic
───────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Nav structure ──────────────────────────── */
  const NAV = [
    {
      group: 'GETTING STARTED',
      items: [
        { id: 'introduction', icon: '○', label: 'Introduction' },
        { id: 'vision',       icon: '○', label: 'Vision & Mission' },
      ]
    },
    {
      group: 'THE GAME',
      items: [
        { id: 'how-to-play',  icon: '▷', label: 'How to play',
          sub: [
            { id: 'freetoplay',  label: 'Free to Play mode' },
            { id: 'competitive', label: 'Competitive mode' },
          ]
        },
        { id: 'energy',       icon: '⚡', label: 'Energy system' },
        { id: 'birds',        icon: '◎', label: 'Birds & skins' },
        { id: 'rank-system',  icon: '☆', label: 'Rank system' },
      ]
    },
    {
      group: 'ECONOMY',
      items: [
        { id: 'token',        icon: '◎', label: '$GOLD token' },
        { id: 'nests',        icon: '◇', label: 'Nests' },
        { id: 'upgrades',     icon: '⬆', label: 'Nest upgrades' },
        { id: 'farm',         icon: '◈', label: 'Hatchery / Farm' },
        { id: 'rewards',      icon: '☆', label: 'Reward structure' },
        { id: 'marketplace',  icon: '◈', label: 'Marketplace' },
        { id: 'leaderboard',  icon: '◆', label: 'Leaderboard' },
      ]
    },
    {
      group: 'PLATFORM',
      items: [
        { id: 'wallet',       icon: '○', label: 'Your wallet' },
        { id: 'fair-play',    icon: '○', label: 'Fair play' },
        { id: 'roadmap',      icon: '○', label: 'Roadmap' },
        { id: 'disclaimer',   icon: '○', label: 'Disclaimer' },
      ]
    },
  ];

  /* ── Page titles for breadcrumb ─────────────── */
  const TITLES = {
    introduction: 'Introduction',
    vision:       'Vision & Mission',
    'how-to-play':'How to play',
    freetoplay:   'Free to Play mode',
    competitive:  'Competitive mode',
    energy:       'Energy system',
    birds:        'Birds & skins',
    'rank-system':'Rank system',
    token:        '$GOLD token',
    nests:        'Nests',
    upgrades:     'Nest upgrades',
    farm:         'Hatchery / Farm',
    rewards:      'Reward structure',
    marketplace:  'Marketplace',
    leaderboard:  'Leaderboard',
    wallet:       'Your wallet',
    'fair-play':  'Fair play',
    roadmap:      'Roadmap',
    disclaimer:   'Disclaimer',
  };

  const PAGE_ORDER = Object.keys(TITLES);

  let currentPage = 'introduction';

  /* ── DOM refs ───────────────────────────────── */
  const sidebar   = document.getElementById('sidebar');
  const hamburger = document.getElementById('topbarHamburger');
  const bcCur     = document.getElementById('bcCurrent');

  /* ── Build sidebar ──────────────────────────── */
  function buildNav() {
    const wrap = document.getElementById('sidebarNav');
    wrap.innerHTML = '';
    NAV.forEach(group => {
      const g = document.createElement('div');
      g.className = 'nav-group';
      const lbl = document.createElement('div');
      lbl.className = 'nav-group-label';
      lbl.textContent = group.group;
      g.appendChild(lbl);
      group.items.forEach(item => {
        const a = document.createElement('a');
        a.className = 'nav-item' + (item.id === currentPage ? ' active' : '');
        a.id = 'nav-' + item.id;
        a.href = '#' + item.id;
        a.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;
        a.addEventListener('click', e => { e.preventDefault(); navigateTo(item.id); closeSidebar(); });
        g.appendChild(a);
        if (item.sub) {
          item.sub.forEach(sub => {
            const s = document.createElement('a');
            s.className = 'nav-subitem' + (sub.id === currentPage ? ' active' : '');
            s.id = 'nav-' + sub.id;
            s.href = '#' + sub.id;
            s.textContent = sub.label;
            s.addEventListener('click', e => { e.preventDefault(); navigateTo(sub.id); closeSidebar(); });
            g.appendChild(s);
          });
        }
      });
      wrap.appendChild(g);
    });
  }

  /* ── Navigate ───────────────────────────────── */
  function navigateTo(id) {
    document.querySelectorAll('.wp-section').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('page-' + id);
    if (sec) { sec.classList.add('active'); currentPage = id; }
    document.querySelectorAll('.nav-item, .nav-subitem').forEach(el => el.classList.remove('active'));
    const navEl = document.getElementById('nav-' + id);
    if (navEl) navEl.classList.add('active');
    if (bcCur) bcCur.textContent = TITLES[id] || id;
    window.location.hash = id;
    updatePag(id);
    window.scrollTo(0, 0);
    const m = document.querySelector('.main');
    if (m) m.scrollTop = 0;
  }

  /* ── Update prev/next buttons ───────────────── */
  function updatePag(id) {
    const idx = PAGE_ORDER.indexOf(id);
    const sec = document.getElementById('page-' + id);
    if (!sec) return;
    const prev = sec.querySelector('.pag-prev');
    const next = sec.querySelector('.pag-next');
    if (prev) {
      const pid = PAGE_ORDER[idx - 1];
      if (pid) {
        prev.removeAttribute('disabled');
        prev.querySelector('.pag-name').textContent = TITLES[pid];
        prev.onclick = () => navigateTo(pid);
      } else {
        prev.setAttribute('disabled', '');
      }
    }
    if (next) {
      const nid = PAGE_ORDER[idx + 1];
      if (nid) {
        next.removeAttribute('disabled');
        next.querySelector('.pag-name').textContent = TITLES[nid];
        next.onclick = () => navigateTo(nid);
      } else {
        next.setAttribute('disabled', '');
      }
    }
  }

  /* ── Token bar animation ─────────────────────── */
  function animateTokenBar() {
    document.querySelectorAll('.token-bar-segment[data-w]').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }

  /* ── Hamburger ───────────────────────────────── */
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  }
  if (hamburger) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }
  document.addEventListener('click', e => {
    if (sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && e.target !== hamburger) closeSidebar();
    }
  });

  /* ── Init ────────────────────────────────────── */
  function init() {
    buildNav();
    const hash = window.location.hash.replace('#', '');
    navigateTo(PAGE_ORDER.includes(hash) ? hash : 'introduction');
    setTimeout(animateTokenBar, 400);
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (PAGE_ORDER.includes(h) && h !== currentPage) navigateTo(h);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
