import { saveProduct, getProduct, getProductListSize, deleteProduct, getProducts, updateProduct } from "./firebase.js";

let addButton = document.getElementById("submitData");

addButton.addEventListener("click", addData);

showData();

function validateData() {
    let nombre = document.getElementById("nombre").value.trim();
    let dateTime = document.getElementById("dateTime").value.trim();
    let director = document.getElementById("director").value.trim();
    let productor = document.getElementById("productor").value.trim();
    let localidades = document.getElementById("localidades").value;
    let price = document.getElementById("price").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let elenco = document.getElementById("elenco").value.trim();
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
    document.getElementById("elenco-error-msg").innerHTML = "";
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
    if (elenco === "") {
        document.getElementById("elenco-error-msg").innerHTML = "Debes ingresar el elenco de la obra";
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

async function addData() {
    if (validateData()) {
        // Obtener valores de los campos
        let nombre = document.getElementById("nombre").value;
        let dateTime = document.getElementById("dateTime").value;
        let director = document.getElementById("director").value;
        let productor = document.getElementById("productor").value;
        let localidades = document.getElementById("localidades").value;
        let price = document.getElementById("price").value;
        let descripcion = document.getElementById("descripcion").value;
        let elenco = document.getElementById("elenco").value;
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
                elenco,
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
        document.getElementById("elenco").value = "";
        document.getElementById("clasificacion").value = "General";
        document.getElementById("inputGroupFile01").value = "";

        // Cerrar modal y mostrar confirmación
        document.getElementById("close-btn").click();
        alertify.success('Obra añadida exitosamente');
        
        // Mostrar datos actualizados
        showData();
    }
}

async function showData(){
    let html = "";
    let size = await getProductListSize();
    if(size == 0){
        html = `<div class="card-body">
                    <div class="row gx-2">
                        <div class="col">
                            <div class="p-3">
                                <img src="img/no-data-found.png" class="img-fluid d-block">
                            </div>
                        </div>
                    </div>
                </div>`;
    } else {
        const productList = await getProducts();
        productList.forEach(element => {
            const product = element.data();
            html += `<div class="row gx-2">
                        <div class="col">
                            <div class="p-3">
                                <div class="card d-flex card-all">
                                    <div class="card-body" style="width: 18rem;">
                                        <h5 class="card-title text-center">${product.nombre}</h5>
                                        <img src="${product.image}" class="card-img-top" alt="Imagen de la obra">
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item"><strong>Fecha y Hora:</strong> ${product.dateTime}</li>
                                        <li class="list-group-item"><strong>Director:</strong> ${product.director}</li>
                                        <li class="list-group-item"><strong>Productor:</strong> ${product.productor}</li>
                                        <li class="list-group-item"><strong>Elenco:</strong> ${product.elenco}</li>
                                        <li class="list-group-item"><strong>Descripción:</strong> ${product.descripcion}</li>
                                        <li class="list-group-item"><strong>Clasificación:</strong> ${product.clasificacion}</li>
                                        <li class="list-group-item"><strong>Localidades:</strong> ${product.localidades}</li>
                                        <li class="list-group-item"><strong>Precio:</strong> $${product.price}</li>
                                    </ul>
                                    <div class="card-body text-center">
                                        <button class="btn btn-success btn-edit" data-id="${element.id}" data-bs-toggle='modal' data-bs-target='#exampleModal-2'>Editar</button>
                                        <button class="btn btn-danger btn-delete" data-id="${element.id}">Eliminar</button>                               
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        });
    }
    document.getElementById("crud-table").innerHTML = html;

    const btnsDelete = document.getElementById("crud-table").querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
        btn.addEventListener('click', (event) => {
            alertify.confirm("Confirmación", "¿Quieres eliminar esta función?", 
                function() {
                    deleteProduct(event.target.dataset.id)
                        .then(() => {
                            alertify.success('Función eliminada correctamente');
                            showData(); 
                        })
                        .catch((error) => {
                            alertify.error('Hubo un error al eliminar la función');
                        });
                },
                function() {
                    alertify.error('Eliminación cancelada');
                }
            );
        });
    });
    


    const btnsEdits = document.getElementById("crud-table").querySelectorAll('.btn-edit');
    btnsEdits.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            let prod = await getProduct(event.target.dataset.id);
            let id = prod.id;
            prod = prod.data();
    
            document.getElementById("id-edit").value = id;
            document.getElementById("nombre-edit").value = prod.nombre;
            document.getElementById("dateTime-edit").value = prod.dateTime;
            document.getElementById("director-edit").value = prod.director;
            document.getElementById("productor-edit").value = prod.productor;
            document.getElementById("localidades-edit").value = prod.localidades;
            document.getElementById("price-edit").value = prod.price;
            document.getElementById("descripcion-edit").value = prod.descripcion;
            document.getElementById("elenco-edit").value = prod.elenco;
            document.getElementById("clasificacion-edit").value = prod.clasificacion;
    
            let imagePreview = document.getElementById("image-div-edit");
            imagePreview.innerHTML = `<img src="${prod.imagen}" alt="Imagen de la Obra" width="100%" height="100%">`;
        });
    });

    document.querySelector("#update").onclick = function() {
        const id = document.getElementById("id-edit").value;
        const nombre = document.getElementById("nombre-edit").value;
        const dateTime = document.getElementById("dateTime-edit").value;
        const director = document.getElementById("director-edit").value;
        const productor = document.getElementById("productor-edit").value;
        const localidades = document.getElementById("localidades-edit").value;
        const price = document.getElementById("price-edit").value;
        const descripcion = document.getElementById("descripcion-edit").value;
        const elenco = document.getElementById("elenco-edit").value;
        const clasificacion = document.getElementById("clasificacion-edit").value;
        const image = document.getElementById("inputGroupFile01-edit").files[0];
    
        // Actualiza la función con los datos obtenidos
        updateProduct(id, { 
            nombre, 
            dateTime, 
            director, 
            productor, 
            localidades, 
            price, 
            descripcion, 
            elenco, 
            clasificacion, 
            image
        });
        
        showData(); // Actualiza la visualización de los datos
    
        // Cierra el modal y limpia los campos
        document.getElementById("btn-close").click();
        document.getElementById("id-edit").value = "";
        document.getElementById("nombre-edit").value = "";
        document.getElementById("dateTime-edit").value = "";
        document.getElementById("director-edit").value = "";
        document.getElementById("productor-edit").value = "";
        document.getElementById("localidades-edit").value = "";
        document.getElementById("price-edit").value = "";
        document.getElementById("descripcion-edit").value = "";
        document.getElementById("elenco-edit").value = "";
        document.getElementById("clasificacion-edit").value = "";
        document.getElementById("inputGroupFile01-edit").value = "";
    
        alertify.success("Data Updated Successfully");
    };      
};

document.addEventListener("DOMContentLoaded", showData);

