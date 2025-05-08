// Esperar a que cargue la página
window.onload = () => {
    fetch("/api/products")
      .then(res => res.json())
      .then(products => {
        const tbody = document.querySelector("tbody");
        const totalDisplay = document.querySelector("#total");
        let total = 0;
  
        products.filter(p => p.cartCount > 0).forEach(producto => {
          const subtotal = producto.cartCount * producto.price;
          total += subtotal;
  
          const fila = `
            <tr>
              <td>${producto.name}</td>
              <td>${producto.cartCount}</td>
              <td>$${producto.price.toFixed(2)}</td>
              <td>$${subtotal.toFixed(2)}</td>
              <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
              </td>
            </tr>
          `;
          tbody.innerHTML += fila;
        });
  
        totalDisplay.textContent = `$${total.toFixed(2)}`;
      });
  };
  
  // Función para eliminar un producto del carrito
  function eliminarProducto(id) {
    fetch(`/api/remove/${id}`, { method: "POST" }).then(() => location.reload());
  }
  