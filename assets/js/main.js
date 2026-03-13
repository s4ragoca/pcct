function setActiveSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach((section) => {
    section.classList.toggle('active', section.id === sectionId);
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigationTabs() {
  const navLinks = document.querySelectorAll('.nav-link');
  const exploreButton = document.getElementById('explore-btn');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = link.getAttribute('href').replace('#', '');
      setActiveSection(target);
      history.replaceState(null, '', `#${target}`);
    });
  });

  if (exploreButton) {
    exploreButton.addEventListener('click', () => {
      setActiveSection('dashboards');
      history.replaceState(null, '', '#dashboards');
    });
  }

  const hashTarget = window.location.hash.replace('#', '');
  if (hashTarget && document.getElementById(hashTarget)) {
    setActiveSection(hashTarget);
  } else {
    setActiveSection('home');
  }
}

function initThemeToggle() {
  const themeButton = document.getElementById('theme-btn');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeButton.textContent = '☀️';
  } else {
    themeButton.textContent = '🌙';
  }

  themeButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeButton.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

function initMobileMenu() {
  const menuButton = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuButton || !menuOverlay) {
    return;
  }

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    document.body.classList.add('menu-open');
    menuButton.setAttribute('aria-expanded', 'true');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('menu-open')) {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigationTabs();
  initMobileMenu();
});
