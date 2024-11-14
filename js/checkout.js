
// Recuperar los artículos del carrito desde localStorage
const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
const cartItemsList = document.getElementById('cart-items');
let totalPrice = 0;

// Mostrar los artículos en el resumen del carrito
cartItems.forEach(item => {
    const listItem = document.createElement('li');
    const itemTotal = item.precio * item.cantidad; // Calcular el total por artículo
    totalPrice += itemTotal; // Sumar al total general
    listItem.innerHTML = `<span>${item.obra} (x${item.cantidad})</span> <span>$${itemTotal.toFixed(2)}</span>`;
    cartItemsList.appendChild(listItem);
});

// Mostrar el total en el resumen
document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
