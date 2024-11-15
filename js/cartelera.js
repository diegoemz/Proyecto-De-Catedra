let currentSlide = 0;
        
function showSlide(index) {
    const slides = document.querySelectorAll('.image-slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100; // -100% por cada slide
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Inicializa el carrusel mostrando el primer slide
showSlide(currentSlide);

function openModal(title, date, time, price) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-date").innerText = date;
    document.getElementById("modal-time").innerText = time;
    document.getElementById("modal-price").innerText = price;
    document.getElementById("ticketModal").style.display = "block"; // Mostrar modal
}

function closeModal() {
    document.getElementById("ticketModal").style.display = "none"; // Ocultar modal
}


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function addToCart() {
    const obra = document.getElementById('modal-title').textContent;
    const fecha = document.getElementById('modal-date').textContent;
    const hora = document.getElementById('modal-time').textContent;
    const precio = parseFloat(document.getElementById('modal-price').textContent);
    const cantidad = parseInt(document.getElementById('quantity').value);

    // Verificar que la cantidad sea válida
    if (cantidad <= 0) {
        alert('Por favor, selecciona una cantidad válida.');
        return;
    }

    const item = { obra, fecha, hora, precio, cantidad };
    carrito.push(item); // Agregar el artículo al carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en almacenamiento local
    alert('Artículo agregado al carrito');

    // Redirigir a la página del carrito después de agregar el artículo
    window.location.href = 'carrito.html';
}