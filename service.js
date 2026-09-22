(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-panel');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        menuButton.focus();
      }
    });
  }
  document.querySelector('[data-language-switch]')?.addEventListener('change', event => {
    location.href = event.target.value;
  });
})();
