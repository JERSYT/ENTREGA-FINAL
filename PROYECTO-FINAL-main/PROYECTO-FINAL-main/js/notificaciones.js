/**
 * Función para leer las notificaciones desde la API.
 * Hace una solicitud GET a la API de tareas y programa notificaciones para cada tarea con fecha de recordatorio.
 */
function readNotificaciones() {
    fetch("http://localhost:8092/api/v1/tarea", {})
        .then(response => response.json())
        .then(data => {
            // Para cada tarea, programa una notificación utilizando la función programarNotificacion
            data.forEach(element => {
                programarNotificacion(new Date(element.fechaRecordatorio).getTime(), element.titulo, element.id);
            });
        })
}

/**
 * Función para programar una notificación.
 * Calcula el tiempo restante hasta la fecha programada, verifica si la fecha ya ha pasado y, si no, programa una notificación.
 * @param {number} fechaProgramada - La fecha y hora programada para la notificación en milisegundos.
 * @param {string} nombreTarea - El nombre de la tarea para mostrar en la notificación.
 * @param {number} id - El identificador único de la tarea.
 */
function programarNotificacion(fechaProgramada, nombreTarea, id) {
    // Obtener la fecha y hora actual
    const ahora = new Date().getTime();

    // Calcular el tiempo restante hasta la fecha programada
    const tiempoRestante = fechaProgramada - ahora;

    // Verificar si la fecha programada ya ha pasado
    if (tiempoRestante <= 0) {
        console.log('La fecha programada ya ha pasado.');
        eliminarNotaAntigua(id);
        return;
    }

    // Programar la notificación después del tiempo restante
    setTimeout(function () {
        // Verificar si las notificaciones son compatibles con el navegador
        if ('Notification' in window) {
            // Solicitar permiso para mostrar notificaciones
            Notification.requestPermission().then(function (permiso) {
                if (permiso === 'granted') {
                    // Crear y mostrar la notificación
                    const notificacion = new Notification('Recordatorio', {
                        body: nombreTarea,
                    });
                } else {
                    console.log('Permiso denegado para mostrar notificaciones.');
                }
            });
        } else {
            console.log('Las notificaciones no son compatibles con este navegador.');
        }
    }, tiempoRestante);
}

// Llamar a la función para leer notificaciones cuando se carga la página
readNotificaciones();

/**
 * Función para eliminar una tarea antigua.
 * Hace una solicitud DELETE a la API para eliminar la tarea con el ID proporcionado.
 * @param {number} id - El identificador único de la tarea a eliminar.
 */
function eliminarNotaAntigua(id) {
    fetch(`http://localhost:8092/api/v1/tarea/${id}`, {
        method: "DELETE"
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });
}
