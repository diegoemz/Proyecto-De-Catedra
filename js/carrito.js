// carrito.js

// Simulando los artículos del carrito almacenados en el almacenamiento local
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar los artículos en el carrito
function renderizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = ''; // Limpiar el contenido actual
    let total = 0;

    carrito.forEach((item, index) => {
        const totalItem = item.precio * item.cantidad;
        total += totalItem;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.obra}</td>
            <td>${item.fecha}</td>
            <td>${item.hora}</td>
            <td>$${ item.precio.toFixed(2)}</td>
            <td>${item.cantidad}</td>
            <td>$${totalItem.toFixed(2)}</td>
            <td><button onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
        `;
        carritoItems.appendChild(row);
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Función para eliminar un artículo del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el artículo del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el almacenamiento local
    renderizarCarrito(); // Volver a renderizar el carrito
}

// Inicializar la página del carrito
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito(); // Renderizar los artículos al cargar la página
});