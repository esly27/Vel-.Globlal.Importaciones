// =======================
// HEADER DINÁMICO - Velu Global
// =======================

// ===== Topbar Velu Global (namespaced) =====
(function() {
  const topbar = document.querySelector('.vg-topbar');
  const welcome = document.getElementById('vg-welcome');

  // Bienvenida al entrar
  window.addEventListener('load', () => {
    if (!welcome) return;
    welcome.classList.add('vg-show');
    setTimeout(() => welcome.classList.add('vg-hide'), 3200);
    setTimeout(() => welcome.remove(), 3800);
  });

  // Auto-hide en scroll
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > last) {
      // bajando -> ocultar
      topbar.style.top = '-56px';
    } else {
      // subiendo -> mostrar
      topbar.style.top = '0';
    }
    last = Math.max(y, 0);
  }, { passive: true });
})();


// Empuja dinámicamente el header principal según la altura de la topbar
window.addEventListener("load", () => {
  const topbar = document.querySelector(".vg-topbar");
  const mainHeader = document.querySelector(".header-container");
  if (topbar && mainHeader) {
    const topbarHeight = topbar.offsetHeight;
    mainHeader.style.marginTop = `${topbarHeight + 10}px`;
  }
});


const ASESOR_1 = "51920835758";
const ASESOR_2 = "51926852886";

// Si quieres alternar asesores automáticamente (round-robin) en cada clic
let toggleAsesor = 0;
function nextAsesor() {
  toggleAsesor = (toggleAsesor + 1) % 2;
  return toggleAsesor ? ASESOR_2 : ASESOR_1;
}

// Construye el link con mensaje prellenado
function buildWaLink(numero, mensaje) {
  const txt = encodeURIComponent(mensaje);
  return `https://wa.me/${numero}?text=${txt}`;
}