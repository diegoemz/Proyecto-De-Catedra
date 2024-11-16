// Escucha los eventos de clic para mostrar secciones
document.getElementById("visualizar-funciones").addEventListener("click", () => {
    mostrarSeccion("funciones");
});

document.getElementById("visualizar-empleados").addEventListener("click", () => {
    mostrarSeccion("empleados");
});

// Función para mostrar u ocultar secciones
function mostrarSeccion(seccion) {
    const funcionesContainer = document.getElementById("functions-container");
    const empleadosContainer = document.getElementById("empleados-section");

    funcionesContainer.style.display = "none";
    empleadosContainer.style.display = "none";

    if (seccion === "funciones") {
        funcionesContainer.style.display = "block";
        showData(); 
    } else if (seccion === "empleados") {
        empleadosContainer.style.display = "block";
        showUsers(); 
    }
}

import { saveProduct, getProducts, getProductListSize, 
    deleteProduct, getProduct, updateProduct} from "./firebase.js";

import { getUsers, registerUser, deleteUser } from "./firebase2.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    let correo = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let firstName = document.getElementById("registerName").value;
    let lastName = document.getElementById("registerLastName").value;
    let fechaNac = document.getElementById("registerBirth").value;
    let telefono = document.getElementById("registerPhone").value;
    let cargo = document.getElementById("registerCharge").value;
    let departamento = document.getElementById("registerDepartment").value;
    
    
    const status = await registerUser(correo, password, firstName, lastName, fechaNac, telefono, cargo, departamento);
  
    if (status) {
      alert("Usuario creado exitosamente");
  
      // Limpiar los controles del formulario
      document.getElementById("registerEmail").value = '';
      document.getElementById("registerPassword").value = '';
      document.getElementById("registerName").value = '';
      document.getElementById("registerLastName").value = '';
      document.getElementById("registerBirth").value = '';
      document.getElementById("registerPhone").value = '';
      document.getElementById("registerCharge").value = '';
      document.getElementById("registerDepartment").value = '';
    } else {
      alert("Ya existe un usuario asociado a este correo");
    }
  });

async function showUsers() {
    let html = "";
    
    // Recuperar los usuarios de la colección
    const users = await getUsers();
  
    if (users.length === 0) { // Si no hay usuarios en la colección
        html = `<div class="card-body">
                    <div class="row gx-2">
                        <div class="col">
                            <div class="p-3 text-center">
                                <img src="img/no-data-found.png" class="img-fluid d-block" alt="No data found">
                                <p class="mt-3">No hay usuarios registrados.</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    } else { // Si hay usuarios
        users.forEach(user => {
            console.log(user);
            html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card shadow-sm h-100">
                <!-- Cuerpo de la tarjeta -->
                <div class="card-body">
                    <!-- Título con nombre del usuario -->
                    <h5 class="card-title text-center">
                        ${user.firstName || "Nombre no disponible"} ${user.lastName || "Apellido no disponible"}
                    </h5>
                    <!-- Lista de detalles del usuario -->
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <strong>Fecha de Nacimiento:</strong> ${user.fechaNac || "No disponible"}
                        </li>
                        <li class="list-group-item">
                            <strong>Email:</strong> ${user.email || "No disponible"}
                        </li>
                        <li class="list-group-item">
                            <strong>Teléfono:</strong> ${user.telefono || "No especificado"}
                        </li>
                        <li class="list-group-item">
                            <strong>Cargo:</strong> ${user.cargo || "No disponible"}
                        </li>
                        <li class="list-group-item">
                            <strong>Departamento:</strong> ${user.departamento || "No disponible"}
                        </li>
                    </ul>
                </div>
                <!-- Pie de la tarjeta con el botón de eliminar -->
                <div class="card-footer text-center">
                    <button class="btn btn-danger btn-delete" data-id="${user.id}">
                        <i class="bi bi-trash-fill"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
        `;
        });
    }
  
    // Insertar el HTML generado en el contenedor adecuado
    document.getElementById("crud-table-2").innerHTML = html;
    //Recuperando todos los botones con la clase btn-delete
    const btnsDeleteUser= document.getElementById("crud-table-2").querySelectorAll('.btn-delete');
    btnsDeleteUser.forEach(btn=>{
        // Asociando un manejador de eventos para el evento click
        btn.addEventListener('click',(event)=>{
            deleteUser(event.target.dataset.id);
                    alert('Empleado eliminado correctamente.');
                    showUsers();
        })
    })
  }  

let addButton = document.getElementById("submitdata");
// Agrega un listener para el evento de click
addButton.addEventListener("click", AddData);

showData();
showUsers();

function validateData(){
    let nombre = document.getElementById("nombre").value.trim();
    let dateTime = document.getElementById("dateTime").value.trim();
    let director = document.getElementById("director").value.trim();
    let productor = document.getElementById("productor").value.trim();
    let localidades = document.getElementById("localidades").value;
    let price = document.getElementById("price").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let clasificacion = document.getElementById("clasificacion").value;
    let image = document.getElementById("inputGroupFile01").files;

    // Resetear mensajes de error
    document.getElementById("nombre-error-msg").innerHTML = "";
    document.getElementById("dateTime-error-msg").innerHTML = "";
    document.getElementById("director-error-msg").innerHTML = "";
    document.getElementById("productor-error-msg").innerHTML = "";
    document.getElementById("localidades-error-msg").innerHTML = "";
    document.getElementById("price-error-msg").innerHTML = "";
    document.getElementById("descripcion-error-msg").innerHTML = "";
    document.getElementById("clasificacion-error-msg").innerHTML = "";
    document.getElementById("image-error-msg").innerHTML = "";


    let isValid = true;

    // Validaciones
    if (nombre === "") {
        document.getElementById("nombre-error-msg").innerHTML = "Debes ingresar el nombre de la obra";
        isValid = false;
    }
    if (dateTime === "") {
        document.getElementById("dateTime-error-msg").innerHTML = "Debes ingresar la fecha y hora de la obra";
        isValid = false;
    }
    if (director === "") {
        document.getElementById("director-error-msg").innerHTML = "Debes ingresar el nombre del director";
        isValid = false;
    }
    if (productor === "") {
        document.getElementById("productor-error-msg").innerHTML = "Debes ingresar el nombre del productor";
        isValid = false;
    }
    if (localidades === "") {
        document.getElementById("localidades-error-msg").innerHTML = "Debes seleccionar una localidad";
        isValid = false;
    }
    if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
        document.getElementById("price-error-msg").innerHTML = "Debes ingresar un precio válido";
        isValid = false;
    }
    if (descripcion === "") {
        document.getElementById("descripcion-error-msg").innerHTML = "Debes ingresar una descripción de la obra";
        isValid = false;
    }
    if (clasificacion === "") {
        document.getElementById("clasificacion-error-msg").innerHTML = "Debes seleccionar una clasificación";
        isValid = false;
    }
    if (image.length === 0) {
        document.getElementById("image-error-msg").innerHTML = "Debes seleccionar una imagen de la obra";
        isValid = false;
    }

    return isValid;
}

async function AddData(){
    if (validateData()) {
        // Obtener valores de los campos
        let nombre = document.getElementById("nombre").value;
        let dateTime = document.getElementById("dateTime").value;
        let director = document.getElementById("director").value;
        let productor = document.getElementById("productor").value;
        let localidades = document.getElementById("localidades").value;
        let price = document.getElementById("price").value;
        let descripcion = document.getElementById("descripcion").value;
        let clasificacion = document.getElementById("clasificacion").value;
        let image = document.getElementById("inputGroupFile01");

        // Leer archivo de imagen y convertir a base64
        let reader = new FileReader();
        reader.readAsDataURL(image.files[0]);
        reader.addEventListener("load", () => {
            saveProduct({
                nombre,
                dateTime,
                director,
                productor,
                localidades,
                price,
                descripcion,
                clasificacion,
                image: reader.result
            });
        });

        // Limpiar campos después de guardar
        document.getElementById("nombre").value = "";
        document.getElementById("dateTime").value = "";
        document.getElementById("director").value = "";
        document.getElementById("productor").value = "";
        document.getElementById("localidades").value = "Platea";
        document.getElementById("price").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("clasificacion").value = "General";
        document.getElementById("inputGroupFile01").value = "";

        // Cerrar modal y mostrar confirmación
        document.getElementById("close-btn").click();
        alert('Obra añadida exitosamente');
        showData();
    }
}

async function showData(){
    
    let html="";
    // Recuperando el tamaño de la lista de productos
    let size= await getProductListSize();

    if(size==0){ // Si no hay productos en la colección
        html=`<div class="card-body">
                <div class="row gx-2">
                <div class="col">
                <div class="p-3">
                    <img src="img/no-data-found.png" class="img-fluid d-block">
                </div></div></div></div>`;
        
    }
    else{ // Si hay productos
        //Recuperando los productos
        const productList= await getProducts();
        productList.forEach(element => {
            console.log(element);
            const product=element.data();
            html+=`<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card shadow-sm h-100">
                <img src="${product.image}" class="card-img-top" alt="Imagen de la obra">
                <div class="card-body">
                    <h5 class="card-title text-center">${product.nombre}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Fecha y Hora:</strong> ${product.dateTime}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${product.director}</li>
                        <li class="list-group-item"><strong>Productor:</strong> ${product.productor}</li>
                        <li class="list-group-item"><strong>Descripción:</strong> ${product.descripcion}</li>
                        <li class="list-group-item"><strong>Clasificación:</strong> ${product.clasificacion}</li>
                        <li class="list-group-item"><strong>Localidades:</strong> ${product.localidades}</li>
                        <li class="list-group-item"><strong>Precio:</strong> $${product.price}</li>
                    </ul>
                </div>
                <div class="card-footer text-center">
                    <button class="btn btn-success btn-edit" data-id="${element.id}" data-bs-toggle="modal" data-bs-target="#exampleModal-2">Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${element.id}">Eliminar</button>
                </div>
            </div>
        </div>`;
        });
    }
    document.getElementById("crud-table").innerHTML=html;

    //Recuperando todos los botones con la clase btn-delete
    const btnsDelete= document.getElementById("crud-table").querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn=>{
        // Asociando un manejador de eventos para el evento click
        btn.addEventListener('click',(event)=>{
            deleteProduct(event.target.dataset.id);
                    alert('Función eliminada correctamente.');
                    showData();
        })
    })


   // Recuperar todos los botones con la clase btn-edit
     const btnsEdits = document.getElementById("crud-table").querySelectorAll('.btn-edit');
     btnsEdits.forEach(btn => {
         btn.addEventListener('click', async (event) => {
             try {
                 // Recuperando el producto a partir del id
                 let prod = await getProduct(event.target.dataset.id);
                
                 if (prod) {
                     // Guardando el id del producto
                     let id = prod.id;
                     // Recuperando exclusivamente los datos del producto
                     prod = prod.data();

                     // Verificar si los valores existen antes de asignarlos
                     document.getElementById("id-edit").value = id || '';
                     document.getElementById("nombre-edit").value = prod.nombre || '';
                     document.getElementById("dateTime-edit").value = prod.dateTime || '';
                     document.getElementById("director-edit").value = prod.director || '';
                     document.getElementById("productor-edit").value = prod.productor || '';
                     document.getElementById("localidades-edit").value = prod.localidades || '';
                     document.getElementById("price-edit").value = prod.price || '';
                     document.getElementById("descripcion-edit").value = prod.descripcion || '';
                     document.getElementById("clasificacion-edit").value = prod.clasificacion || '';

                     // Mostrar la imagen del producto
                     let imagePreview = document.getElementById("image-div");

                     // Comprobar si la imagen existe antes de asignarla
                     if (prod.image) {
                         imagePreview.innerHTML = "<img src='" + prod.image + "' width='100%' height='100%'>";
                     } else {
                         imagePreview.innerHTML = "<p>No hay imagen disponible</p>";
                     }
                 } else {
                     console.error("Producto no encontrado.");
                 }
             } catch (error) {
                 console.error("Error al obtener el producto:", error);
                 // Mostrar un mensaje de error si la obtención del producto falla
                 alert("Hubo un error al cargar los datos del producto.");
             }
         });
     });
}

document.querySelector("#update").onclick = async function (){
    const id = document.getElementById("id-edit").value;
    const nombre = document.getElementById("nombre-edit").value;
    const fecha = document.getElementById("dateTime-edit").value;
    const director = document.getElementById("director-edit").value;
    const productor = document.getElementById("productor-edit").value;
    const localidades = document.getElementById("localidades-edit").value;
    const price = document.getElementById("price-edit").value;
    const clasificacion = document.getElementById("clasificacion-edit").value;
    const descripcion = document.getElementById("descripcion-edit").value;

    updateProduct(id, {nombre, fecha, director, productor, localidades, descripcion, price, clasificacion})
    showData();

    document.getElementById("btn-close").click();
    document.getElementById("id-edit").value = "";
    document.getElementById("nombre-edit").value = "";
    document.getElementById("dateTime-edit").value = "";
    document.getElementById("director-edit").value = "";
    document.getElementById("productor-edit").value = "";
    document.getElementById("localidades-edit").value = "";
    document.getElementById("price-edit").value = "";
    document.getElementById("descripcion-edit").value = "";
    document.getElementById("clasificacion-edit").value = "";
    alert("Información actualizada exitosamente");
};

document.addEventListener("DOMContentLoaded", showData);