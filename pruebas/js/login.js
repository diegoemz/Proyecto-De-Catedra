import { registerUser, loginUser, getUsers } from "./firebase2.js";

showUsers();
  
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

// Manejo del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  
  try {
    // Intentar iniciar sesión
    const userData = await loginUser(email, password);
    
    if (userData) {
      // Redirigir a la página de contactos si el inicio de sesión fue exitoso
      window.location.href = "menu.html";
    } else {
      alert("Usuario y/o contraseña incorrectos.");
    }
  } catch (error) {
    alert("Hubo un problema al iniciar sesión.");
    console.error("Error al iniciar sesión:", error.message);
  }
});

// Definir las credenciales predeterminadas
const defaultEmail = "karla@gmail.com";
const defaultPassword = "karla1234";

// Escuchar el evento de envío del formulario
document.getElementById("loginForm2").addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Obtener el correo electrónico y la contraseña ingresados
  const email = document.getElementById("loginEmail2").value;
  const password = document.getElementById("loginPassword2").value;
  
  // Deshabilitar el botón de envío mientras se procesa el inicio de sesión
  const loginButton = document.querySelector('button[type="submit"]');
  loginButton.disabled = true;
  loginButton.textContent = "Verificando...";

  // Comparar con las credenciales predeterminadas
  if (email === defaultEmail && password === defaultPassword) {
    // Redirigir a la página de menú si las credenciales son correctas
    window.location.href = "menu_2.html";
  } else {
    // Si las credenciales no son correctas, mostrar un mensaje de error
    alert("Usuario y/o contraseña incorrectos.");
  }

  // Habilitar el botón nuevamente después de la validación
  loginButton.disabled = false;
  loginButton.textContent = "Iniciar Sesión como Administrador";
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
}
