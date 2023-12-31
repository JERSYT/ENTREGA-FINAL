// Función para leer y organizar las tareas
function read() {
    // Obtener el ID del usuario desde el almacenamiento local
  idUsuario = JSON.parse(localStorage.getItem('user')).id;
    // Realizar una solicitud de fetch para obtener las tareas del usuario
  fetch(`http://localhost:8092/api/v1/tarea/usuario/${idUsuario}`, {
  })
    .then(response => response.json())
    .then(data => {
            // Organizar las tareas por categoría y etiqueta de prioridad
      const datosEstudioUrg = organizarCategoriaPrioridad(data, "Estudio", "Urgente")
      const datosEstudioImp = organizarCategoriaPrioridad(data, "Estudio", "Importante")
      const datosEstudioSec = organizarCategoriaPrioridad(data, "Estudio", "Secundario")
      const datosEventosUrg = organizarCategoriaPrioridad(data, "Eventos", "Urgente")
      const datosEventosImp = organizarCategoriaPrioridad(data, "Eventos", "Importante")
      const datosEventosSec = organizarCategoriaPrioridad(data, "Eventos", "Secundario")
      const datosFinanzasUrg = organizarCategoriaPrioridad(data, "Finanzas", "Urgente")
      const datosFinanzasImp = organizarCategoriaPrioridad(data, "Finanzas", "Importante")
      const datosFinanzasSec = organizarCategoriaPrioridad(data, "Finanzas", "Secundario")
      const datosNotas_rapidasUrg = organizarCategoriaPrioridad(data, "Notas_rapidas", "Urgente")
      const datosNotas_rapidasImp = organizarCategoriaPrioridad(data, "Notas_rapidas", "Importante")
      const datosNotas_rapidasSec = organizarCategoriaPrioridad(data, "Notas_rapidas", "Secundario")
      const datosPersonalUrg = organizarCategoriaPrioridad(data, "Personal", "Urgente")
      const datosPersonalImp = organizarCategoriaPrioridad(data, "Personal", "Importante")
      const datosPersonalSec = organizarCategoriaPrioridad(data, "Personal", "Secundario")
      const datosTrabajoUrg = organizarCategoriaPrioridad(data, "Trabajo", "Urgente")
      const datosTrabajoImp = organizarCategoriaPrioridad(data, "Trabajo", "Importante")
      const datosTrabajoSec = organizarCategoriaPrioridad(data, "Trabajo", "Secundario")

      // Contar la cantidad de tareas en cada categoría y mostrar los badges
      const cantidadEstudio = datosEstudioUrg.length + datosEstudioImp.length + datosEstudioSec.length
      const cantidadEventos = datosEventosUrg.length + datosEventosImp.length + datosEventosSec.length
      const cantidadFinanzas = datosFinanzasUrg.length + datosFinanzasImp.length + datosFinanzasSec.length
      const cantidadNotas = datosNotas_rapidasUrg.length + datosNotas_rapidasImp.length + datosNotas_rapidasSec.length
      const cantidadPersonal = datosPersonalUrg.length + datosPersonalImp.length + datosPersonalSec.length
      const cantidadTrabajo = datosTrabajoUrg.length + datosTrabajoImp.length + datosTrabajoSec.length

      cantidadEstudio > 0 ? badge_estudio.innerHTML = cantidadEstudio : ''
      cantidadEventos > 0 ? badge_eventos.innerHTML = cantidadEventos : ''
      cantidadFinanzas > 0 ? badge_finanzas.innerHTML = cantidadFinanzas : ''
      cantidadNotas > 0 ? badge_notas.innerHTML = cantidadNotas : ''
      cantidadPersonal > 0 ? badge_personal.innerHTML = cantidadPersonal : ''
      cantidadTrabajo > 0 ? badge_trabajo.innerHTML = cantidadTrabajo : ''

      // Contar la cantidad de tareas en cada categoría y mostrar los badges
      mostrarTareas(datosEstudioUrg, "listaTareaEstudioUrgentes")
      mostrarTareas(datosEstudioImp, "listaTareaEstudioImportantes")
      mostrarTareas(datosEstudioSec, "listaTareaEstudioSecundarios")
      mostrarTareas(datosEventosUrg, "listaTareaEventosUrgentes")
      mostrarTareas(datosEventosImp, "listaTareaEventosImportantes")
      mostrarTareas(datosEventosSec, "listaTareaEventosSecundarios")
      mostrarTareas(datosFinanzasUrg, "listaTareaFinanzasUrgentes")
      mostrarTareas(datosFinanzasImp, "listaTareaFinanzasImportantes")
      mostrarTareas(datosFinanzasSec, "listaTareaFinanzasSecundarios")
      mostrarTareas(datosNotas_rapidasUrg, "listaTareaNotasUrgentes")
      mostrarTareas(datosNotas_rapidasImp, "listaTareaNotasImportantes")
      mostrarTareas(datosNotas_rapidasSec, "listaTareaNotasSecundarios")
      mostrarTareas(datosPersonalUrg, "listaTareaPersonalUrgentes")
      mostrarTareas(datosPersonalImp, "listaTareaPersonalImportantes")
      mostrarTareas(datosPersonalSec, "listaTareaPersonalSecundarios")
      mostrarTareas(datosTrabajoUrg, "listaTareaTrabajoUrgentes")
      mostrarTareas(datosTrabajoImp, "listaTareaTrabajoImportantes")
      mostrarTareas(datosTrabajoSec, "listaTareaTrabajoSecundarios")
    })
}

// Función para mostrar tareas en el HTML
function mostrarTareas(data, ubicacion) {
  let tareas = ''
  data.forEach(element => {
    tareas += `
        <div class="col">
          <div class="card my-2" style="background-color:${element.color}">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <img src="imagenes/motivacion1.jpg" class="card-img-top w-100">
                </div>
                <div class="col-6">
                  <h5 class="card-title"><strong>Título: </strong>${element.titulo}</h5>
                  <p class="card-text"><strong>Descripción: </strong>${element.contenido}</p>
                  <p class="card-text"><strong>Fecha recordatorio:<br> </strong>${formatoFecha(element.fechaRecordatorio)}</p>                 
                </div>
              </div>
              <div class="row mt-3">                
                <div class="col-6">
                  <a onclick='cargarDatos(${JSON.stringify(element)})' class="btn btn-light" data-bs-toggle="modal" data-bs-target="#tareaModal"><i class="fa-solid fa-pen-to-square"></i> Editar</a>
                </div>
                <div class="col-6">
                  <a onclick="eliminar(${element.id})" class="btn btn-light"><i class="fa-solid fa-trash"></i>Eliminar</a>
                </div> 
              </div>              
            </div>
          </div>
        </div>`
  });
  document.getElementById(ubicacion).innerHTML = tareas
}

// Función para organizar tareas por categoría y etiqueta de prioridad
function organizarCategoriaPrioridad(data, valorCategoria, valorEtiqueta) {
  const organizar = data.reduce((acc, item) => {
    if (item.categoria === valorCategoria && item.etiqueta === valorEtiqueta) {
      acc.push(item);
    }
    return acc;
  }, [])
  return organizar
}

// Función para mostrar el nombre de usuario en el HTML
function usuarioDatos() {
  let usuario = JSON.parse(localStorage.getItem("user"))
  infoUsuario.innerHTML = usuario.nombre
}
// Función para cerrar sesión eliminando la información del usuario del almacenamiento local
function logout() {
  localStorage.removeItem("user")
}
// Función para validar la sesión del usuario y redirigir a la página de inicio de sesión si no hay usuario
function validarSession() {
  if (localStorage.getItem("user") == null) {
    window.location.href = "login.html";
  }
}
// Función para formatear una fecha ISO a un formato legible
function formatoFecha(fechaISO) {
  const fecha = new Date(fechaISO);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const segundos = fecha.getSeconds().toString().padStart(2, '0');
  const ampm = horas >= 12 ? 'Pm' : 'Am';

  const fechaFormateada = `${dia}-${mes}-${anio} ${horas % 12 || 12}:${minutos}:${segundos} ${ampm}`;

  return fechaFormateada
}
// Variable global para almacenar el ID de la tarea actual
var id = 0
// Función para cargar datos de una tarea en el formulario de edición
function cargarDatos(data) {
  console.log(data);
  document.getElementById("note-title-mod").value = data.titulo
  document.getElementById("note-text-mod").value = data.contenido
  document.getElementById("note-color-mod").value = data.color
  document.getElementById("note-datetime-mod").value = data.fechaRecordatorio
  document.getElementById("categoria-mod").value = data.categoria
  document.getElementById(`${data.etiqueta}`).checked = true
  this.id = data.id
}
// Función para modificar una tarea
function modificar() {
    // Obtener valores de los campos del formulario de edición
  const title = document.getElementById('note-title-mod').value
  const contenido = document.getElementById('note-text-mod').value
  const color = document.getElementById('note-color-mod').value
  const fechaRecordatorio = document.getElementById('note-datetime-mod').value
  const categoria = document.getElementById('categoria-mod').value
  const input_etiqueta = document.getElementsByName('etiqueta-mod')
  const usuarioId = JSON.parse(localStorage.getItem('user')).id;
  let etiqueta
  // Obtener la etiqueta seleccionada
  input_etiqueta.forEach(element => {
    if (element.checked)
      etiqueta = element.value
  });
  // Validar campos obligatorios
  if (!title || !contenido) {
    alert('Por favor, ingresa un título y contenido para la nota.');
    return;
  }

  // Construir el cuerpo de la solicitud
  let headersList = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
  }

  let bodyContent = JSON.stringify({
    "id": this.id,
    "titulo": title,
    "contenido": contenido,
    "color": color,
    "fechaRecordatorio": fechaRecordatorio,
    "fechaCreacion": new Date(),
    "etiqueta": etiqueta,
    "categoria": categoria,
    "usuario": {
      id: usuarioId
    }
  });

  // Realizar la solicitud para modificar la tarea
  fetch(`http://localhost:8092/api/v1/tarea`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
            // Actualizar la lista de tareas y mostrar una notificación de éxito
      read()
      Swal.fire({
        title: "Excelente!",
        text: "Tarea modificada!",
        icon: "success",
        timerProgressBar: true,
      }).then(() => {
        location.reload();
        limpiarCampos()
      });
    })
}
// Función para eliminar una tarea
function eliminar(id) {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar la tarea
  Swal.fire({
    title: "Eliminar",
    text: "Vas a borrar una tarea!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
            // Realizar la solicitud para eliminar la tarea
      fetch(`http://localhost:8092/api/v1/tarea/${id}`, {
        method: "DELETE"
      })
        .then(response => response.text())
        .then(data => {
                    // Actualizar la lista de tareas y mostrar una notificación de éxito
          read()
          Swal.fire({
            title: "Eliminado!",
            text: "La tarea ha sido eliminada.",
            icon: "success"
          });
        })
    }
  })

};

// Función para limpiar los campos del formulario de edición
function limpiarCampos() {
  document.getElementById('note-title-mod').value = ''
  document.getElementById('note-text-mod').value = ''
  document.getElementById('note-color-mod').value = '#000000'
  document.getElementById('note-datetime-mod').value = ''
  document.getElementById('categoria-mod').value = '0'
  var opcionesRadio = document.getElementsByName("etiqueta-mod");
  for (var i = 0; i < opcionesRadio.length; i++) {
    opcionesRadio[i].checked = false;
  }
}

// Validar la sesión del usuario y cargar tareas al cargar la página
validarSession()
read()
usuarioDatos()

