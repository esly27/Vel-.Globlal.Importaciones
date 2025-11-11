const track = document.querySelector('.carousel-track');
const filterButtons = document.querySelectorAll('.filter-btn');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;
let totalItems = 0;
let productos = [];
let autoPlayInterval;

// 1) Cargar datos desde el mismo nivel que index2.html
fetch('data.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar data.json');
    return res.json();
  })
  .then(data => {
    console.log('✅ JSON cargado:', data);
    productos = data.productos || [];
    renderProductos(productos);
    totalItems = document.querySelectorAll('.carousel-item').length;
    iniciarAutoplay();
  })
  .catch(err => {
    console.error('❌ Error cargando data.json:', err);
    track.innerHTML = `<div style="color:#fff; padding:20px">No se pudo cargar el catálogo.</div>`;
  });

// =======================================================
// 🧩 SECCIONES: Productos destacados y Ofertas
// =======================================================
fetch("data.json", {
    cache: "no-store"
  })
  .then(r => {
    if (!r.ok) throw new Error("No se pudo cargar data.json");
    return r.json();
  })
  .then(json => {
    console.log("📦 Cargando productos y ofertas destacados...");
    renderProductosDestacados(json.productos);
    renderOfertasDestacadas(json.ofertas);
  })
  .catch(err => {
    console.error("[VeluGlobal] Error cargando secciones:", err);
    document.getElementById("productosGrid").innerHTML =
      `<p style="color:#c00">Error al cargar productos destacados.</p>`;
    document.getElementById("ofertasGrid").innerHTML =
      `<p style="color:#c00">Error al cargar ofertas.</p>`;
  });






// 2) Render dinámico
function renderProductos(lista) {
  track.innerHTML = '';

  lista.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'carousel-item';

    const etiquetasHTML = (prod.etiquetas || [])
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="carousel-info">
        ${etiquetasHTML}
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <p class="precio">S/ ${Number(prod.precio).toFixed(2)}</p>
        <a href="#" class="btn-vermas">Ver más</a>
      </div>
    `;
    track.appendChild(card);
  });

  // actualizar conteo y resetear posición
  totalItems = document.querySelectorAll('.carousel-item').length;
  index = 0;
  moveCarousel();
}

// 3) Filtros
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.category;
    const filtrados = cat === 'todos' ?
      productos :
      productos.filter(p => p.categoria === cat);

    renderProductos(filtrados);
  });
});

// 4) Movimiento del carrusel
function moveCarousel() {
  const item = document.querySelector('.carousel-item');
  if (!item) return;
  const width = item.offsetWidth + 20; // ancho + margen lateral
  track.style.transform = `translateX(-${index * width}px)`;
}

nextBtn.addEventListener('click', () => {
  if (!totalItems) return;
  index = (index + 1) % totalItems;
  moveCarousel();
});

prevBtn.addEventListener('click', () => {
  if (!totalItems) return;
  index = (index - 1 + totalItems) % totalItems;
  moveCarousel();
});

// 5) Auto-play con pausa en hover
function iniciarAutoplay() {
  detenerAutoplay();
  autoPlayInterval = setInterval(() => {
    if (!totalItems) return;
    index = (index + 1) % totalItems;
    moveCarousel();
  }, 4000);
}

function detenerAutoplay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

const container = document.querySelector('.carousel-container');
container.addEventListener('mouseenter', detenerAutoplay);
container.addEventListener('mouseleave', iniciarAutoplay);