// 🌟 EFECTO SCROLL REVEAL
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 100; // margen antes de aparecer

  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
