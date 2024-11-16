import { getProducts } from "../proyecto-pt2/js/firebase.js";


async function mostrarObra() {
    const obra = await getProducts(); // Assumes getProducts() returns a promise that resolves to an array of products
    const arr = [];
    
    obra.forEach((item) => {
        arr.push(item.data()); // Assuming each item has a data() method
    });

    console.log(arr);

    arr.sort((a, b) => {
        const nameA = a.nombre.toLowerCase(); // Convertir a minúsculas para una comparación case-insensitive
        const nameB = b.nombre.toLowerCase();
        if (nameA < nameB) return -1; // Si nameA es menor, a va primero
        if (nameA > nameB) return 1;  // Si nameA es mayor, b va primero
        return 0; // Si son iguales, no cambia el orden
    });


    // Selecciona el contenedor donde se agregarán las tarjetas
    const contenedorCartelera = document.querySelector('.cartelera-container');
    

    // Agrega una tarjeta por cada objeto en el arreglo arr
    arr.forEach((obra) => {
        const fechaObjeto = new Date(obra.dateTime); // Convertir a objeto Date

        // Obtener el año, mes y día
        const año = fechaObjeto.getFullYear(); // Obtiene el año (ej. 2024)
        const mes = fechaObjeto.getMonth() + 1; // Obtiene el mes (0-11), se suma 1 para obtener (1-12)
        const dia = fechaObjeto.getDate(); // Obtiene el día (1-31)
        const hora = fechaObjeto.getHours()%12; // Obtiene la hora (0-23)
        const minutos = fechaObjeto.getMinutes();
        
        const tarjetaHtml = `
            <section class="cartelera-item">
                <img src="${obra.image}" alt="${obra.nombre}">
                <div class="contenido-cartelera">
                    <h2>${obra.nombre.toUpperCase()}</h2>
                    <div class="detalles">
                        <p><strong>Fecha:</strong> ${dia}-${mes}-${año}</p>
                        <p><strong>Hora:</strong> ${hora}:${String(minutos).padStart(2, '0')} p.m</p>
                        <p><strong>Precio:</strong> $${parseFloat(obra.price).toFixed(2)}</p>
                        <p><strong>Descripción:</strong> ${obra.descripcion}</p>
                        <p><strong>Producción:</strong> ${obra.productor}</p>
                        <p><strong>Dirección:</strong> ${obra.director}</p>
                        <button onclick="openModal('${obra.nombre}', '${dia}-${mes}-${año}', '${hora}:${String(minutos).padStart(2, '0')} p.m', ${parseFloat(obra.price)})" class="btn-regreso">Adquirir Boletos</button>
                    </div>
                </div>
            </section>
        `;

        // Agrega la tarjeta al contenedor
        contenedorCartelera.innerHTML += tarjetaHtml;
    });
    }



mostrarObra()



