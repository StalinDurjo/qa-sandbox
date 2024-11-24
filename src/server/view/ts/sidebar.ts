document.addEventListener('DOMContentLoaded', () => {
  const submenus = document.querySelectorAll('[data-submenu-toggle]');

  submenus.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      const submenuId = toggle.getAttribute('data-submenu-toggle');
      const submenu = document.getElementById(submenuId);
      const icon = toggle.querySelector('.chevron-icon');

      submenu.classList.toggle('open');
      icon.classList.toggle('rotated');
    });
  });
});
