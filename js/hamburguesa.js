const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar")

abrir.addEventListener("click", function() {
    nav.classList.add("visible"); // Alternar la clase 'active'
});

cerrar.addEventListener("click", function(){
    nav.classList.remove("visible");
});