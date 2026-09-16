(function () {
  var diccionario = {
    es: {
      inicio: "Inicio",
      partituras: "partituras",
      ordenarPor: "Ordenar por",
      dificultad: "Dificultad",
      puntaje: "Puntaje",
      filtrarDificultad: "Filtrar por dificultad",
      todas: "Todas",
      anterior: "Anterior",
      siguiente: "Siguiente",
      pagina: "Página",
      descargarPartitura: "Descargar partitura",
      verVideo: "Ver video de referencia",
      verEjecucion: "Ver mi ejecución",
      ejercicio: "Ejercicio",
      footerTexto: "catálogo de partituras puntuadas por dificultad",
      libros: "Libros",
      filtrarTipo: "Mostrar",
      todosTipo: "Melodías y ejercicios",
      soloMelodias: "Sólo melodías",
      soloEjercicios: "Sólo ejercicios",
      cambiarAIngles: "Cambiar la interfaz a inglés",
      cambiarAEspanol: "Cambiar la interfaz a español",
      nombre: "Nombre",
      capitulo: "Capítulo",
      escuchar: "Escuchar",
      reproducir: "Reproducir",
      pausar: "Pausar",
      instrumentos: "Instrumentos",
      duracion: "Duración",
      perteneceALibros: "Pertenece a",
      sorprendeme: "Sorpréndeme",
      autor: "Autor",
      autores: "Autores",
      instrumento: "Instrumento",
      estadisticas: "Estadísticas",
      porInstrumento: "Por instrumento",
      melodiasVsEjercicios: "Melodías vs. ejercicios",
      porDificultad: "Por dificultad",
      extremos: "Extremos",
      masDificil: "Más difícil",
      masFacil: "Más fácil",
      puntajePromedio: "Puntaje promedio",
      suscribirseRss: "Suscribirse por RSS",
      "404Titulo": "Esta página no existe",
      "404Texto": "Puede que el link esté roto o que la partitura se haya movido. Probá desde acá:",
      cambiarAOscuro: "Cambiar a modo oscuro",
      cambiarAClaro: "Cambiar a modo claro",
      acercaDe: "Acerca de",
    },
    en: {
      inicio: "Home",
      partituras: "scores",
      ordenarPor: "Sort by",
      dificultad: "Difficulty",
      puntaje: "Score",
      filtrarDificultad: "Filter by difficulty",
      todas: "All",
      anterior: "Previous",
      siguiente: "Next",
      pagina: "Page",
      descargarPartitura: "Download score",
      verVideo: "Watch reference video",
      verEjecucion: "Watch my performance",
      ejercicio: "Exercise",
      footerTexto: "a catalog of scores rated by difficulty",
      libros: "Books",
      filtrarTipo: "Show",
      todosTipo: "Melodies and exercises",
      soloMelodias: "Melodies only",
      soloEjercicios: "Exercises only",
      cambiarAIngles: "Switch interface to English",
      cambiarAEspanol: "Switch interface to Spanish",
      nombre: "Name",
      capitulo: "Chapter",
      escuchar: "Listen",
      reproducir: "Play",
      pausar: "Pause",
      instrumentos: "Instruments",
      duracion: "Duration",
      perteneceALibros: "Part of",
      sorprendeme: "Surprise me",
      autor: "Author",
      autores: "Authors",
      instrumento: "Instrument",
      estadisticas: "Statistics",
      porInstrumento: "By instrument",
      melodiasVsEjercicios: "Melodies vs. exercises",
      porDificultad: "By difficulty",
      extremos: "Extremes",
      masDificil: "Hardest",
      masFacil: "Easiest",
      puntajePromedio: "Average score",
      suscribirseRss: "Subscribe via RSS",
      "404Titulo": "This page doesn't exist",
      "404Texto": "The link might be broken, or the score may have moved. Try from here:",
      cambiarAOscuro: "Switch to dark mode",
      cambiarAClaro: "Switch to light mode",
      acercaDe: "About",
    },
  };

  var BANDERAS = { es: "🇪🇸", en: "🇺🇸" };

  // Helper mínimo para que otros scripts (ej. reproductor.js) puedan pedir
  // un texto en el idioma actual sin duplicar el diccionario.
  window.pmTexto = function (clave) {
    var idioma = "es";
    try {
      idioma = localStorage.getItem("pm-lang") || "es";
    } catch (e) {}
    var textos = diccionario[idioma] || diccionario.es;
    return textos[clave] || clave;
  };

  function aplicarIdioma(idioma) {
    var textos = diccionario[idioma] || diccionario.es;
    document.documentElement.lang = idioma;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var clave = el.getAttribute("data-i18n");
      if (textos[clave]) el.textContent = textos[clave];
    });

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      var idiomaDestino = idioma === "es" ? "en" : "es";
      toggle.textContent = BANDERAS[idiomaDestino];
      toggle.title = idioma === "es" ? textos.cambiarAIngles : textos.cambiarAEspanol;
      toggle.setAttribute("aria-label", toggle.title);
    }

    if (window.pmActualizarBotonTema) window.pmActualizarBotonTema();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var guardado = "es";
    try {
      guardado = localStorage.getItem("pm-lang") || "es";
    } catch (e) {}

    aplicarIdioma(guardado);

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var actual = "es";
        try {
          actual = localStorage.getItem("pm-lang") || "es";
        } catch (e) {}
        var nuevo = actual === "es" ? "en" : "es";
        try {
          localStorage.setItem("pm-lang", nuevo);
        } catch (e) {}
        aplicarIdioma(nuevo);
      });
    }
  });
})();
