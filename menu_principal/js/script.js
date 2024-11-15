import { saveProduct, getProducts, getProductListSize, 
    deleteProduct, getProduct, updateProduct, saveEmployee, getEmployees, getEmployeesListSize, deleteEmployee } from "./firebase.js";

let addButton = document.getElementById("submitdata");
let addButton_2 = document.getElementById("submitdataemp")
// Agrega un listener para el evento de click
addButton.addEventListener("click", AddData);
addButton_2.addEventListener("click", AddData_2);

// Mostrar las funciones al hacer clic en "Visualizar Funciones"
document.getElementById("visualizar-funciones").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    const functionsContainer = document.getElementById("functions-container");
    functionsContainer.style.display = "block"; // Muestra el contenedor
    showData(); // Llama a la función para cargar los datos
});

// Ocultar las funciones al mover el cursor fuera del contenedor
document.getElementById("functions-container").addEventListener("mouseleave", () => {
    const functionsContainer = document.getElementById("functions-container");
    functionsContainer.style.display = "none"; // Oculta el contenedor
    document.getElementById("crud-table").innerHTML = ""; // Limpia los datos
});



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
                <div class="card-body" id="cartass">
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

document.querySelector("#update").onclick = async function () {
    // Obtener los valores de los campos
    const id = document.getElementById("id-edit").value;
    const nombre = document.getElementById("nombre-edit").value;
    const dateTime = document.getElementById("dateTime-edit").value;
    const director = document.getElementById("director-edit").value;
    const productor = document.getElementById("productor-edit").value;
    const localidades = document.getElementById("localidades-edit").value;
    const price = document.getElementById("price-edit").value;
    const descripcion = document.getElementById("descripcion-edit").value;
    const clasificacion = document.getElementById("clasificacion-edit").value;
    const image = document.getElementById("inputGroupFile01-edit").files[0];

    // Validación de campos
    if (!id || !nombre || !dateTime || !director || !productor || !localidades || !price || !descripcion || !clasificacion) {
        alert("Todos los campos deben estar completos.");
        return;
    }

    // Si no se ha seleccionado una imagen, establecer un valor por defecto
    let imageData = image || null; // Si no hay imagen, se asigna null

    // Actualiza el producto con los datos obtenidos
    try {
        await updateProduct(id, { 
            nombre, 
            dateTime, 
            director, 
            productor, 
            localidades, 
            price, 
            descripcion, 
            clasificacion, 
            image: imageData // Se pasa la imagen o null si no se seleccionó una
        });

        // Refrescar los datos de la vista
        showData();

        // Mostrar un mensaje de éxito
        alert("Información Actualizada Correctamente");
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("Hubo un error al actualizar los datos. Por favor, inténtalo de nuevo.");
    }
};

function validateData_2() {
    let nombre_emp = document.getElementById("nombre-emp").value.trim();
    let apellido_emp = document.getElementById("apellido-emp").value.trim();
    let fecha_nac = document.getElementById("date").value;
    let email = document.getElementById("email-emp").value.trim();
    let telefono = document.getElementById("telefono-emp").value;
    let cargo = document.getElementById("cargo-emp").value;
    let departamento = document.getElementById("departamento-emp").value;

    // Resetear mensajes de error
    ["nombre-emp", "apellido-emp", "date", "email-emp", "telefono-emp", "cargo-emp", "departamento-emp"].forEach(id => {
        document.getElementById(id + "-error-msg").innerHTML = "";
    });

    let isValid = true;

    // Validaciones
    if (nombre_emp === "") {
        document.getElementById("nombre-emp-error-msg").innerHTML = "Debes ingresar el nombre del empleado";
        isValid = false;
    }
    if (apellido_emp === "") {
        document.getElementById("apellido-emp-error-msg").innerHTML = "Debes ingresar el apellido del empleado";
        isValid = false;
    }
    if (fecha_nac === "") {
        document.getElementById("date-error-msg").innerHTML = "Debes ingresar la fecha de nacimiento del empleado";
        isValid = false;
    }
    if (email === "") {
        document.getElementById("email-emp-error-msg").innerHTML = "Debes ingresar el correo del empleado";
        isValid = false;
    }
    if (telefono === "") {
        document.getElementById("telefono-emp-error-msg").innerHTML = "Debes ingresar el teléfono del empleado";
        isValid = false;
    }
    if (cargo === "") {
        document.getElementById("cargo-emp-error-msg").innerHTML = "Debes seleccionar un cargo";
        isValid = false;
    }
    if (departamento === "") {
        document.getElementById("departamento-emp-error-msg").innerHTML = "Debes seleccionar un departamento";
        isValid = false;
    }

    return isValid;
}

async function AddData_2() {
    if (validateData_2()) {
        try {
            // Obtener valores de los campos
            let dui = document.getElementById("dui-emp").value;
            let nombre_emp = document.getElementById("nombre-emp").value;
            let apellido_emp = document.getElementById("apellido-emp").value;
            let fecha_nac = document.getElementById("date").value;
            let email = document.getElementById("email-emp").value;
            let telefono = document.getElementById("telefono-emp").value;
            let cargo = document.getElementById("cargo-emp").value;
            let departamento = document.getElementById("departamento-emp").value;

            // Guardar datos del empleado
            await saveEmployee({
                dui,
                nombre: nombre_emp,
                apellido: apellido_emp,
                fecha_nacimiento: fecha_nac,
                email,
                telefono,
                cargo,
                departamento
            });

            // Limpiar campos después de guardar
            ["dui-emp","nombre-emp", "apellido-emp", "date", "email-emp", "telefono-emp", "cargo-emp", "departamento-emp"].forEach(id => {
                document.getElementById(id).value = "";
            });

            // Cerrar modal y mostrar confirmación
            document.getElementById("close-btn").click();
            alert('Empleado añadido exitosamente');
            showData_2();
        } catch (error) {
            console.error("Error al añadir el empleado:", error);
            alert("Hubo un error al añadir el empleado.");
        }
    }
}

async function showData_2() {
    let html = "";
    try {
        // Recuperando el tamaño de la lista de empleados
        let size = await getEmployeesListSize();

        if (size === 0) { // Si no hay empleados en la colección
            html = `<div class="card-body">
                    <div class="row gx-2">
                    <div class="col">
                    <div class="p-3">
                        <img src="img/no-data-found.png" class="img-fluid d-block">
                    </div></div></div></div>`;
            
        } else { // Si hay empleados
            const employeeList = await getEmployees();
            employeeList.forEach(element => {
                const employee = element.data();
                html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title text-center">${employee.nombre} ${employee.apellido}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>DUI:</strong> ${employee.dui}</li>
                            <li class="list-group-item"><strong>Fecha de Nacimiento:</strong> ${employee.fecha_nacimiento}</li>
                            <li class="list-group-item"><strong>Email:</strong> ${employee.email}</li>
                            <li class="list-group-item"><strong>Teléfono:</strong> ${employee.telefono}</li>
                            <li class="list-group-item"><strong>Cargo:</strong> ${employee.cargo}</li>
                            <li class="list-group-item"><strong>Departamento:</strong> ${employee.departamento}</li>
                        </ul>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-danger btn-delete" data-id="${element.id}">Eliminar</button>
                    </div>
                </div>
            </div>`;
            });
        }
        document.getElementById("crud-table-2").innerHTML = html;

        // Asociar manejadores de eventos a botones de eliminar
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (event) => {
                try {
                    await deleteEmployee(event.target.dataset.id);
                    alert('Empleado eliminado correctamente.');
                    showData_2();
                } catch (error) {
                    console.error("Error al eliminar el empleado:", error);
                    alert("Hubo un error al eliminar el empleado.");
                }
            });
        });
    } catch (error) {
        console.error("Error al mostrar los empleados:", error);
        alert("Hubo un error al mostrar los empleados.");
    }
}

document.addEventListener("DOMContentLoaded", showData);
document.addEventListener("DOMContentLoaded", showData_2);
