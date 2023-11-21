/**
 * Función createNote:
 * Esta función se encarga de crear una nueva nota con la información proporcionada,
 * como título, contenido, color, fecha de creación, fecha de recordatorio, categoría y etiqueta.
 * Luego, realiza una solicitud POST a la API para registrar la tarea en el servidor.
 * Finalmente, muestra una notificación de éxito y recarga la página.
 */
function createNote() {
  // Obtener los valores de los elementos del formulario
  const title = document.getElementById('note-title').value;
  const contenido = document.getElementById('note-text').value;
  const color = document.getElementById('note-color').value;
  const fechaCreacion = new Date();
  const fechaRecordatorio = document.getElementById('note-datetime').value;
  const categoria = document.getElementById('categoria').value;
  const input_etiqueta = document.getElementsByName('etiqueta');
  const usuarioId = JSON.parse(localStorage.getItem('user')).id;
  let etiqueta;

  // Obtener la etiqueta seleccionada
  input_etiqueta.forEach(element => {
    if (element.checked)
      etiqueta = element.value;
  });

  // Validar que se ingresen título y contenido
  if (!title || !contenido) {
    alert('Por favor, ingresa un título y contenido para la nota.');
    return;
  }

  // Configurar encabezados y cuerpo de la solicitud
  let headersList = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
  }

  let bodyContent = JSON.stringify({
    "titulo": title,
    "contenido": contenido,
    "color": color,
    "fechaRecordatorio": fechaRecordatorio,
    "fechaCreacion": fechaCreacion,
    "etiqueta": etiqueta,
    "categoria": categoria,
    "usuario": {
      id: usuarioId
    }
  });

  // Realizar solicitud POST a la API
  fetch("http://localhost:8092/api/v1/tarea", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Mostrar notificación de éxito y recargar la página
      Swal.fire({
        title: "¡Excelente!",
        text: "¡Tarea creada!",
        icon: "success",
        timerProgressBar: true,
      }).then(() => {
        location.reload();
        limpiarCampos();
      });
    });
}

/**
 * Función usuarioDatos:
 * Esta función obtiene y muestra el nombre del usuario almacenado en el almacenamiento local.
 */
function usuarioDatos() {
  let usuario = JSON.parse(localStorage.getItem("user"));
  infoUsuario.innerHTML = usuario.nombre;
}

/**
 * Función logout:
 * Esta función elimina la información del usuario del almacenamiento local al cerrar sesión.
 */
function logout() {
  localStorage.removeItem("user");
}

/**
 * Función validarSession:
 * Esta función verifica si hay un usuario almacenado en el almacenamiento local.
 * Si no hay un usuario, redirige a la página de inicio de sesión.
 */
function validarSession() {
  if (localStorage.getItem("user") == null) {
    window.location.href = "login.html";
  }
}

/**
 * Función limpiarCampos:
 * Esta función restablece los valores de los campos del formulario a sus valores predeterminados.
 */
function limpiarCampos() {
  document.getElementById('note-title').value = '';
  document.getElementById('note-text').value = '';
  document.getElementById('note-color').value = '#000000';
  document.getElementById('note-datetime').value = '';
  document.getElementById('categoria').value = '0';
  var opcionesRadio = document.getElementsByName("etiqueta");
  for (var i = 0; i < opcionesRadio.length; i++) {
    opcionesRadio[i].checked = false;
  }
}

// Llamadas a funciones al cargar la página
validarSession();
usuarioDatos();
