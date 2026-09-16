(function () {
  var CLAVE = "pm-theme";

  function temaGuardado() {
    try {
      return localStorage.getItem(CLAVE);
    } catch (e) {
      return null;
    }
  }

  function temaEfectivo() {
    var guardado = temaGuardado();
    if (guardado === "light" || guardado === "dark") return guardado;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function actualizarBoton() {
    var boton = document.getElementById("theme-toggle");
    if (!boton) return;
    var efectivo = temaEfectivo();
    boton.textContent = efectivo === "dark" ? "☀️" : "🌙";
    if (window.pmTexto) {
      var titulo = window.pmTexto(efectivo === "dark" ? "cambiarAClaro" : "cambiarAOscuro");
      boton.title = titulo;
      boton.setAttribute("aria-label", titulo);
    }
  }

  // Expuesto para que i18n.js pueda refrescar el tooltip del botón (queda en
  // el idioma viejo si no se avisa) cuando cambia el idioma sin tocar el tema.
  window.pmActualizarBotonTema = actualizarBoton;

  document.addEventListener("DOMContentLoaded", function () {
    // El anti-parpadeo del <head> ya aplicó data-theme si había una elección
    // guardada; acá sólo hace falta reflejarlo en el ícono del botón.
    actualizarBoton();

    var boton = document.getElementById("theme-toggle");
    if (boton) {
      boton.addEventListener("click", function () {
        var nuevo = temaEfectivo() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nuevo);
        try {
          localStorage.setItem(CLAVE, nuevo);
        } catch (e) {}
        actualizarBoton();
      });
    }
  });
})();
