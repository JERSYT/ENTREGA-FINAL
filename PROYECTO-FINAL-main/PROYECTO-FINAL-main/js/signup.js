// Definición de la función toggleNavbar
function toggleNavbar() {
  // Obtener el elemento del DOM con el id "navbarLinks"
  var navbarLinks = document.getElementById("navbarLinks");

  // Verificar el estado actual de la propiedad de estilo "display"
  if (navbarLinks.style.display === "flex") {
    // Si el valor es "flex", cambiarlo a "none" (ocultar el elemento)
    navbarLinks.style.display = "none";
  } else {
    // Si el valor no es "flex", cambiarlo a "flex" (mostrar el elemento)
    navbarLinks.style.display = "flex";
  }
}

// Configurar un event listener para el formulario de registro
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  // Prevenir la acción predeterminada del formulario (envío)
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validación de nombre de usuario
  const usernameRegex = /^[a-zA-Z0-9-_]{1,20}$/;
  if (!username.match(usernameRegex)) {
    alert('Nombre de usuario inválido. Solo letras, números, guiones o barras bajas.');
    return;
  }

  // Validación de correo electrónico utilizando una expresión regular
  if (!validateEmail(email)) {
    alert('Correo electrónico inválido.');
    return;
  }

  // Validación de contraseña utilizando una expresión regular
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_,.;@?¿])[A-Za-z0-9-_.,;@?¿]{10,20}$/;
  if (!password.match(passwordRegex)) {
    alert('Contraseña inválida. Debe contener al menos una mayúscula, una minúscula, un dígito, un caracter especial y tener una longitud de 10 a 20 caracteres.');
    return;
  }

  // Verificar que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Si todas las validaciones pasan, puedes enviar el formulario o realizar otras acciones

  // Configuración de las cabeceras para la solicitud fetch
  let headersList = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
  }

  // Crear el cuerpo del contenido en formato JSON
  let bodyContent = JSON.stringify({
    "nombre": username,
    "correo": email,
    "password": password,
  });

  // Realizar una solicitud fetch para registrar el usuario
  fetch("http://localhost:8092/api/v1/usuario", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta de la solicitud
      if (data.status === 500) {
        // Mostrar un mensaje de error si el correo ya está registrado
        Swal.fire({
          title: "Error!",
          text: "Correo ya registrado!",
          icon: "error",
          timerProgressBar: true,
        });
      } else {
        // Mostrar un mensaje de éxito si el usuario se registra correctamente
        Swal.fire({
          title: "Excelente!",
          text: "Usuario registrado con éxito!",
          icon: "success",
          timerProgressBar: true,
          timer: 2000
        })
          .then(() => {
            // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
            window.location.href = 'login.html';
          });
      }
    })
});

// Función para validar el formato de correo electrónico utilizando una expresión regular
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.match(emailRegex);
}
