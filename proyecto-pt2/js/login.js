import { loginUser} from "./firebase2.js";

// Manejador para el formulario de inicio de sesión de empleados
document.getElementById("employeeLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("employeeEmail").value;
  const password = document.getElementById("employeePassword").value;

  const userData = await loginUser(email, password);
  if (userData && userData.role === "empleado") {
    alert("Inicio de sesión exitoso como empleado");
    window.location.href = "./menu_2.html"; 
  } else {
    alert("Credenciales incorrectas o no tiene permisos de empleado.");
  }
});

// Manejador para el formulario de inicio de sesión de administradores
document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  const userData = await loginUser(email, password);
  if (userData && userData.role === "administrador") {
    alert("Inicio de sesión exitoso como administrador");
    window.location.href = "./menu.html";
  } else {
    alert("Credenciales incorrectas o no tiene permisos de administrador.");
  }
});