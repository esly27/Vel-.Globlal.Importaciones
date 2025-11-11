// menu.js
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  // botón hamburguesa: abrir / cerrar menú en movil
  menuToggle.addEventListener("click", function () {
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", String(!expanded));
    this.classList.toggle("open");
    navMenu.classList.toggle("active");
  });

  // comportamiento de submenus en móvil:
  // los enlaces .dropdown-toggle abren/ciernan su submenu cuando la pantalla es pequeña
  const dropdownToggles = document.querySelectorAll(".dropdown > .dropdown-toggle");

  function isMobile() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  dropdownToggles.forEach(function (toggle) {
    // click handler
    toggle.addEventListener("click", function (e) {
      if (isMobile()) {
        e.preventDefault(); // evitar anchor jump
        const parent = this.parentElement;
        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", String(!expanded));
        parent.classList.toggle("open");
      }
      // en desktop dejamos que el hover funcione (no interferimos)
    });
  });

  // opcional: cerrar menu si se hace click fuera (mobile)
  document.addEventListener("click", function (e) {
    if (!isMobile()) return;
    const target = e.target;
    if (!menuToggle.contains(target) && !navMenu.contains(target)) {
      // cerrar todo
      if (navMenu.classList.contains("active")) {
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      }
      // cerrar submenus
      document.querySelectorAll(".nav-item.open").forEach(it => it.classList.remove("open"));
      document.querySelectorAll(".dropdown > .dropdown-toggle").forEach(t => t.setAttribute("aria-expanded", "false"));
    }
  });

});
