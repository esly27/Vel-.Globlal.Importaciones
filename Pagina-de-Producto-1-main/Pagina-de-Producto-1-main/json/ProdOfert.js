// =======================================================
// 🧩 UTILIDADES
// =======================================================
const PLACEHOLDER_IMG = "img/LogoPrincipal/Logo.jpg"; // fallback seguro

function safeImg(src) {
  return src && src.trim() !== "" ? src : PLACEHOLDER_IMG;
}

function toMoney(n) {
  return "S/ " + Number(n).toFixed(2);
}

// =======================================================
// 📦 CARGA DE DATOS
// =======================================================
let DATA = {
  productos: [],
  ofertas: []
};

// Contenedores del DOM
const productosGrid = document.getElementById("productosGrid");
const ofertasGrid = document.getElementById("ofertasGrid");

fetch("data.json", {
    cache: "no-store"
  })
  .then((r) => {
    if (!r.ok) throw new Error("No se pudo cargar data.json");
    return r.json();
  })
  .then((json) => {
    DATA = json || {
      productos: [],
      ofertas: []
    };
    renderProductos(DATA.productos);
    renderOfertas(DATA.ofertas);
  })
  .catch((err) => {
    console.error("[VeluGlobal] Error cargando data.json:", err);
    if (productosGrid)
      productosGrid.innerHTML = `<p style="color:#c00">No se pudieron cargar los productos.</p>`;
    if (ofertasGrid)
      ofertasGrid.innerHTML = `<p style="color:#c00">No se pudieron cargar las ofertas.</p>`;
  });

// =======================================================
// 🛒 RENDERIZAR PRODUCTOS
// =======================================================
function renderProductos(items) {
  if (!productosGrid) return;
  if (!items || !items.length) {
    productosGrid.innerHTML = `<p>No hay productos por mostrar.</p>`;
    return;
  }

  productosGrid.innerHTML = items.map((p, i) => {
    // Mensaje y link WA (usamos helpers globales de header.js)
    const msg = `Hola Velu Global, estoy interesad@ en el producto "${p.nombre}" (${p.categoria}). ¿Podrías brindarme más información?`;
    // Alterna asesores o fija uno: const waLink = buildWaLink("51920835758", msg);
    const waLink = buildWaLink(nextAsesor(), msg);

    return `
      <article class="card" style="animation-delay:${i * 0.1}s">
        <img src="${safeImg(p.imagen)}" alt="${p.nombre}">
        <h4>${p.nombre}</h4>
        <p class="desc">${p.descripcion || ""}</p>
        <div class="meta">
          <span class="cat">${(p.categoria || "").toUpperCase()}</span>
          <span class="price">${toMoney(p.precio || 0)}</span>
        </div>

        <!-- CTA Overlay -->
        <div class="cta-overlay" aria-hidden="true">
          <a href="${waLink}" target="_blank" rel="noopener" class="cta-btn" aria-label="Consultar por WhatsApp sobre ${p.nombre}">
            <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </article>
    `;
  }).join("");
}


// =======================================================
// 💰 RENDERIZAR OFERTAS
// =======================================================
function renderOfertas(items) {
  if (!ofertasGrid) return;
  if (!items || !items.length) {
    ofertasGrid.innerHTML = `<p>No hay ofertas por mostrar.</p>`;
    return;
  }

  ofertasGrid.innerHTML = items.map((o, i) => {
    const msg = `Hola Velu Global, vi la oferta "${o.nombre}" (${o.categoria}) a ${toMoney(o.precioOferta || 0)}. ¿Podrías brindarme más información?`;
    // Alterna asesores o fija uno: const waLink = buildWaLink("51920835758", msg);
    const waLink = buildWaLink(nextAsesor(), msg);

    return `
      <article class="card" style="animation-delay:${i * 0.1}s">
        <img src="${safeImg(o.imagen)}" alt="${o.nombre}">
        <h4>${o.nombre}</h4>
        <p class="desc">${o.descripcion || ""}</p>
        <div class="meta">
          <span class="cat">${(o.categoria || "").toUpperCase()}</span>
          <div class="price-group">
            <span class="price-old">${o.precioAnterior ? toMoney(o.precioAnterior) : ""}</span>
            <span class="price">${toMoney(o.precioOferta || 0)}</span>
          </div>
        </div>

        <!-- CTA Overlay -->
        <div class="cta-overlay" aria-hidden="true">
          <a href="${waLink}" target="_blank" rel="noopener" class="cta-btn" aria-label="Consultar por WhatsApp sobre ${o.nombre}">
            <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </article>
    `;
  }).join("");
}
