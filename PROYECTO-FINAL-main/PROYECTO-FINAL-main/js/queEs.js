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
