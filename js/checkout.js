
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

function processPayment() {
    // Obtener datos del formulario
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiration = document.getElementById('expiration').value;
    const cvv = document.getElementById('cvv').value;

    // Crear un objeto con los datos
    const paymentData = {
        firstName,
        lastName,
        email,
        phone,
        country,
        cardName,
        cardNumber,
        expiration,
        cvv
    };

    // Guardar los datos en localStorage
    localStorage.setItem('paymentData', JSON.stringify(paymentData));

    // Redirigir a la página de éxito
    window.location.href = 'exito.html';
}