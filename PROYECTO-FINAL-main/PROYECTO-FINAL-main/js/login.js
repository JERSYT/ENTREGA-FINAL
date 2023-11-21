/**
 * Event Listener para la Presentación del Formulario:
 * Este escuchador de eventos está adjunto al formulario de inicio de sesión y evita el comportamiento de envío predeterminado del formulario.
 * Valida los campos del formulario, específicamente el nombre de usuario (correo) y la contraseña.
 * Si los campos no están llenos, se muestra una alerta. De lo contrario, realiza una solicitud POST a la API de inicio de sesión.
 * Según la respuesta de la API, maneja intentos de inicio de sesión exitosos y no exitosos.
 */

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el comportamiento de envío predeterminado del formulario

  // Validar los campos del formulario
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();

  if (username === '' || password === '') {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Si todos los campos están llenos, continuar con el envío del formulario

  // Configurar encabezados y cuerpo para la solicitud POST
  let headersList = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
  }

  let bodyContent = JSON.stringify({
    "correo": username,
    "password": password
  });

  // Realizar una solicitud POST a la API de inicio de sesión
  fetch("http://localhost:8092/api/v1/usuario/login", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta de la API
      if (parseInt(data.status) === 200) {
        // Si el inicio de sesión es exitoso, almacenar la información del usuario en el almacenamiento local
        let usuario = {
          id: data.usuario.id,
          nombre: data.usuario.nombre,
          correo: data.usuario.correo
        }
        localStorage.setItem("user", JSON.stringify(usuario));

        // Mostrar una notificación de éxito y redirigir al panel de control
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: `Bienvenido ${data.usuario.nombre} <br> ${data.message}`
        }).then(() => {
          window.location.href = "dashboard.html";
        });
      } else if (parseInt(data.status) === 500) {
        // Si el inicio de sesión falla, mostrar una notificación de error
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: data.message
        });
      }
    })
});
