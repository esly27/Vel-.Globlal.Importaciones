// =======================================================
// 🧩 PRODUCTOS DESTACADOS (Sección del cuerpo)
// =======================================================
const productosGrid = document.getElementById("productosGrid");
const ofertasGrid = document.getElementById("ofertasGrid");

function renderProductosDestacados(items) {
  if (!productosGrid) return;
  if (!items || !items.length) {
    productosGrid.innerHTML = `<p>No hay productos por mostrar.</p>`;
    return;
  }

  productosGrid.innerHTML = items.map((p, i) => {
    const asesor = nextAsesor(); // función global
    const msg = `Hola Velu Global, estoy interesad@ en el producto: "${p.nombre}" (categoría: ${p.categoria}). ¿Me brindas más información?`;
    const waLink = buildWaLink(asesor, msg);

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
        <div class="cta-overlay">
          <a href="${waLink}" target="_blank" rel="noopener" class="cta-btn">
            <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </article>
    `;
  }).join("");
}
