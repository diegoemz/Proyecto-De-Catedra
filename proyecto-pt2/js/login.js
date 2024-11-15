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

// Manejador para el formulario de inicio de sesión de empleados
document.getElementById("employeeLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("employeeEmail").value;
  const password = document.getElementById("employeePassword").value;

  const userData = await loginUser(email, password);
  if (userData && userData.role === "empleado") {
    alert("Inicio de sesión exitoso como empleado");
    window.location.href = "../menu2.html"; 
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
    window.location.href = "../menu.html";
  } else {
    alert("Credenciales incorrectas o no tiene permisos de administrador.");
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
}
