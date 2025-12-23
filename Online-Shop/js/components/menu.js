export function setupMenuToggle() {
  const catalogBtn = document.querySelector('.header__catalog-btn');
  const mainMenu = document.querySelector('.main-menu');
  const closeBtn = mainMenu?.querySelector('.main-menu__close');
  
  if (!catalogBtn || !mainMenu) return;

  catalogBtn.addEventListener('click', () => {
    mainMenu.classList.add('main-menu--active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mainMenu.classList.remove('main-menu--active');
    });
  }
  
  document.addEventListener('click', (e) => {
    if (!mainMenu.contains(e.target) && !catalogBtn.contains(e.target)) {
      mainMenu.classList.remove('main-menu--active');
    }
  });
}
