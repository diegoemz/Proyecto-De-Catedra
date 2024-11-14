import {registerUser, loginUser} from "./firebase.js";

document.getElementById("loginForm").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    alert("Datos capturados: " + email);
    //Await loginUser(email, password);
});

document.getElementById("registerForm").addEventListener("submit", async(e)=>{
    e.preventDefault();
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    
    const status = await registerUser(email, password, firstName, lastName);

    if(status){
        alert("Usuario registrado exitosamente");
    } else{
        alert("Ya existe un usuario asocidado con este correo");
    }
});