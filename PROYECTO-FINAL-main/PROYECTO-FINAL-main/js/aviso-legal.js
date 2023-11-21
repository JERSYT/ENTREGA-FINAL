/**
 * Función toggleNavbar:
 * Esta función se encarga de alternar la visibilidad de los enlaces de la barra de navegación.
 * Si los enlaces están visibles, los oculta; si están ocultos, los muestra.
 */
function toggleNavbar() {
  // Obtiene el elemento con el id "navbarLinks"
  var navbarLinks = document.getElementById("navbarLinks");

  // Verifica el estado actual de la propiedad de estilo "display"
  if (navbarLinks.style.display === "flex") {
    // Si los enlaces están visibles, los oculta al establecer "display" a "none"
    navbarLinks.style.display = "none";
  } else {
    // Si los enlaces están ocultos, los muestra al establecer "display" a "flex"
    navbarLinks.style.display = "flex";
  }
}
