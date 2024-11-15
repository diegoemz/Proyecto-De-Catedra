import {getProducts, getProductListSize, 
    deleteProduct, getProduct,} from "./admin_2/js/firebase.js";


showData();
showData_2();

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
}