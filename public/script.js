let cartCount = 0;

// Cargar productos desde el backend y mostrarlos
fetch("/api/products")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("product-list");
    cartCount = 0;
    container.innerHTML = "";

    products.forEach((p) => {
      cartCount += p.cartCount;

      const productDiv = document.createElement("div");
      productDiv.className = "col-md-4 col-sm-6 mb-4";
      productDiv.innerHTML = `
        <div class="product card h-100">
          <img src="${p.image}" class="card-img-top img-fluid" alt="${p.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">$${p.price.toFixed(2)}</p>

            <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
              <button class="btn btn-danger btn-sm" onclick="modificarCantidad(${p.id}, -1)">−</button>
              <span id="cantidad-${p.id}">${p.cartCount}</span>
              <button class="btn btn-success btn-sm" onclick="modificarCantidad(${p.id}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(productDiv);
    });

    actualizarContador();
  });

// Función para sumar o restar cantidad de un producto
function modificarCantidad(id, cambio) {
  if (!id || isNaN(id)) {
    console.error("ID inválido:", id);
    return;
  }

  const ruta = cambio > 0 ? "/api/add/" : "/api/remove/";
  fetch(`${ruta}${id}`, { method: "POST" })
    .then(() => {
      fetch("/api/products")
        .then((res) => res.json())
        .then((products) => {
          const producto = products.find((p) => p.id === id);
          if (producto) {
            document.getElementById(`cantidad-${id}`).textContent = producto.cartCount;
            cartCount = products.reduce((acc, p) => acc + p.cartCount, 0);
            actualizarContador();
          }
        });
    });
}



// Actualizar el número del carrito
function actualizarContador() {
  document.getElementById("cart-count").textContent = cartCount;
}

// Vaciar todo el carrito
function vaciarCarrito() {
  fetch("/api/products")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((p) => {
        for (let i = 0; i < p.cartCount; i++) {
          fetch(`/api/remove/${p.id}`, { method: "POST" });
        }
      });

      setTimeout(() => {
        location.reload(); // Refresca la página después de vaciar
      }, 500);
    });
}
