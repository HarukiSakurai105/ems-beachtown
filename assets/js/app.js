/**
 * EMS Beach Town — app.js
 * Modular, extendable JavaScript. Each feature is a self-contained function.
 * To add new features, export a new init function and call it in init().
 *
 * @version 1.0.0
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & STATE
   ═══════════════════════════════════════════════════════════════════════════ */
const STORAGE_KEYS = {
  darkMode:    'ems_darkMode',
  activeTab:   'ems_activeTab',
};

const state = {
  activeTab: localStorage.getItem(STORAGE_KEYS.activeTab) || 'resident',
  darkMode:  localStorage.getItem(STORAGE_KEYS.darkMode) === 'true',
  searchQuery: '',
};

/* ═══════════════════════════════════════════════════════════════════════════
   HELPER UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Query selector shorthand.
 * @param {string} sel
 * @param {Element} [ctx=document]
 */
const $ = (sel, ctx = document) => ctx.querySelector(sel);

/**
 * Query selector all shorthand.
 * @param {string} sel
 * @param {Element} [ctx=document]
 */
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/**
 * Debounce function.
 */
function debounce(fn, ms = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: DARK MODE
   ═══════════════════════════════════════════════════════════════════════════ */
function initDarkMode() {
  const toggle = $('#darkModeToggle');
  const html   = document.documentElement;

  function apply(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    toggle.textContent = dark ? '☀️' : '🌙';
    toggle.title = dark ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode';
    state.darkMode = dark;
    localStorage.setItem(STORAGE_KEYS.darkMode, dark);
  }

  // Restore saved preference
  apply(state.darkMode);

  toggle.addEventListener('click', () => apply(!state.darkMode));
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: ACCORDION
   ═══════════════════════════════════════════════════════════════════════════ */
function initAccordion() {
  $$('.accordion-header').forEach(header => {
    header.addEventListener('click', () => toggleAccordion(header));
  });
}

/**
 * Toggle a single accordion item.
 * @param {HTMLButtonElement} header
 */
function toggleAccordion(header) {
  const body     = header.nextElementSibling;
  const expanded = header.getAttribute('aria-expanded') === 'true';

  header.setAttribute('aria-expanded', !expanded);
  if (expanded) {
    body.hidden = true;
  } else {
    body.hidden = false;
  }
}

/**
 * Open a specific accordion by item ID.
 * @param {string} id - The accordion-item's id attribute
 */
function openAccordionById(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const header = item.querySelector('.accordion-header');
  if (header && header.getAttribute('aria-expanded') !== 'true') {
    toggleAccordion(header);
  }
}

/**
 * Open all accordions in the current active section.
 */
function openAllAccordions() {
  const section = $(`.content-section.active`);
  if (!section) return;
  section.querySelectorAll('.accordion-header').forEach(h => {
    h.setAttribute('aria-expanded', 'true');
    h.nextElementSibling.hidden = false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: TAB SWITCHING
   ═══════════════════════════════════════════════════════════════════════════ */
function initTabs() {
  // Main tab buttons (above content)
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });
  // Sidebar tab buttons
  $$('.sidebar-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });

  // Restore last active tab
  switchTab(state.activeTab, false);
}

/**
 * Switch the visible section.
 * @param {string} target - 'resident' | 'ems'
 * @param {boolean} [save=true]
 */
function switchTab(target, save = true) {
  // Update sections
  $$('.content-section').forEach(s => {
    s.classList.remove('active');
    s.hidden = true;
  });
  const section = $(`#section-${target}`);
  if (section) {
    section.classList.add('active');
    section.hidden = false;
  }

  // Update all tab buttons
  $$('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.target === target);
    b.setAttribute('aria-selected', b.dataset.target === target);
  });
  $$('.sidebar-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.target === target);
    b.setAttribute('aria-selected', b.dataset.target === target);
  });

  state.activeTab = target;
  if (save) localStorage.setItem(STORAGE_KEYS.activeTab, target);

  // Rebuild sidebar nav for the new tab
  buildSidebarNav(target);

  // Clear search when switching tabs
  clearSearch();
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: SIDEBAR NAV (auto-generated)
   ═══════════════════════════════════════════════════════════════════════════ */
function buildSidebarNav(target) {
  const nav   = $('#sidebarNav');
  const items = $$(`[data-section="${target}"]`);

  nav.innerHTML = '';

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const num    = item.querySelector('.accordion-num')?.textContent  || '';
    const title  = item.querySelector('.accordion-title')?.textContent || '';
    const id     = item.id;

    const a = document.createElement('a');
    a.href       = '#' + id;
    a.innerHTML  = `<span style="opacity:.5;font-size:.7em;min-width:3em">${num}</span><span>${title}</span>`;
    a.addEventListener('click', e => {
      e.preventDefault();
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
      openAccordionById(id);
      closeSidebar();
      updateActiveSidebarLink(a);
    });
    nav.appendChild(a);
  });
}

function updateActiveSidebarLink(active) {
  $$('#sidebarNav a').forEach(a => a.classList.remove('active'));
  if (active) active.classList.add('active');
}

function initSidebarScrollSpy() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const link = $(`#sidebarNav a[href="#${id}"]`);
        if (link) updateActiveSidebarLink(link);
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  $$('.accordion-item').forEach(item => observer.observe(item));
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: MOBILE SIDEBAR
   ═══════════════════════════════════════════════════════════════════════════ */
function initSidebar() {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';
  document.body.appendChild(overlay);

  const hamburger = $('#navHamburger');
  const sidebar   = $('#sidebar');
  const closeBtn  = $('#sidebarClose');

  hamburger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });
}

function openSidebar() {
  $('#sidebar').classList.add('is-open');
  $('#sidebarOverlay').classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  $('#sidebar').classList.remove('is-open');
  $('#sidebarOverlay').classList.remove('is-active');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: SEARCH
   ═══════════════════════════════════════════════════════════════════════════ */
function initSearch() {
  const input    = $('#searchInput');
  const clearBtn = $('#clearSearch');
  const notice   = $('#searchNotice');

  input.addEventListener('input', debounce(() => {
    const q = input.value.trim().toLowerCase();
    state.searchQuery = q;
    clearBtn.hidden = !q;

    if (!q) {
      clearSearch();
      return;
    }

    performSearch(q);
  }, 250));

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearSearch();
    input.focus();
  });
}

function performSearch(query) {
  const notice = $('#searchNotice');
  let total = 0;
  let visible = 0;

  $$('.accordion-item').forEach(item => {
    const title    = item.querySelector('.accordion-title')?.textContent.toLowerCase() || '';
    const num      = item.querySelector('.accordion-num')?.textContent.toLowerCase()   || '';
    const keywords = (item.dataset.keywords || '').toLowerCase();
    const matches  = title.includes(query) || num.includes(query) || keywords.includes(query);

    total++;
    if (matches) {
      visible++;
      item.classList.remove('search-hidden');
      item.classList.add('search-highlight');
      // Auto-open matched items
      const header = item.querySelector('.accordion-header');
      if (header && header.getAttribute('aria-expanded') === 'false') {
        toggleAccordion(header);
      }
    } else {
      item.classList.add('search-hidden');
      item.classList.remove('search-highlight');
    }
  });

  // Show both sections when searching
  $$('.content-section').forEach(s => { s.hidden = false; s.classList.add('active'); });

  notice.hidden = false;
  if (visible === 0) {
    notice.textContent = `🔍 Không tìm thấy kết quả nào cho "${query}".`;
    notice.style.background = 'var(--danger-bg)';
    notice.style.borderColor = 'var(--danger-border)';
    notice.style.color = 'var(--danger-text)';
  } else {
    notice.textContent = `🔍 Tìm thấy ${visible} mục khớp với "${query}".`;
    notice.style.background = '';
    notice.style.borderColor = '';
    notice.style.color = '';
  }
}

function clearSearch() {
  $$('.accordion-item').forEach(item => {
    item.classList.remove('search-hidden', 'search-highlight');
  });

  const notice = $('#searchNotice');
  notice.hidden = true;

  // Restore active tab visibility
  $$('.content-section').forEach(s => {
    const isActive = s.id === `section-${state.activeTab}`;
    s.classList.toggle('active', isActive);
    s.hidden = !isActive;
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: SCROLL-TO-TOP
   ═══════════════════════════════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = $('#scrollTopBtn');

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: FADE-IN ANIMATION (IntersectionObserver)
   ═══════════════════════════════════════════════════════════════════════════ */
function initFadeInObserver() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    $$('.fade-in-up').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.fade-in-up').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: PRINT
   ═══════════════════════════════════════════════════════════════════════════ */
function initPrint() {
  $('#printBtn').addEventListener('click', () => {
    // Open all accordions before printing
    openAllAccordions();
    setTimeout(() => window.print(), 150);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE: NAVBAR SCROLL SHADOW
   ═══════════════════════════════════════════════════════════════════════════ */
function initNavbarScroll() {
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,.35)'
      : '0 2px 12px rgba(0,0,0,.25)';
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN INIT
   ═══════════════════════════════════════════════════════════════════════════ */
function init() {
  initDarkMode();
  initAccordion();
  initTabs();
  initSidebar();
  initSearch();
  initScrollTop();
  initFadeInObserver();
  initPrint();
  initNavbarScroll();
  initSidebarScrollSpy();

  console.log('🏥 EMS Beach Town v1.0.0 — Ready');
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
