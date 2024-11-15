import { getUsers } from "../proyecto-pt2/js/firebase2.js";


async function mostrarStaff() {
    const empleado = await getUsers(); 
    const arr = [];
    
    empleado.forEach((item) => {
        arr.push(item); // Assuming each item has a data() method
    });

    console.log(arr);

    // Selecciona el contenedor donde se agregarán las tarjetas
    const contenedorStaff = document.querySelector('.staff-grid');
    

    // Agrega una tarjeta por cada objeto en el arreglo arr
    arr.forEach((empleado) => {
        const tarjetaHtml = `
            
            <div class="staff-member">
                <img src="img/snupi.jpg">
                <h2>${empleado.firstName} ${empleado.lastName}</h2>
                <p>${empleado.cargo}</p>
                <a href="mailto:20235722@esen.edu.sv">${empleado.email}</a>
            </div>
        `;

        // Agrega la tarjeta al contenedor
        contenedorStaff.innerHTML += tarjetaHtml;
    });
    }



mostrarStaff()



