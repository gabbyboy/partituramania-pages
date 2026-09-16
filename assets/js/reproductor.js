(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".boton-play").forEach(function (boton) {
      var audio = document.getElementById(boton.getAttribute("data-audio-target"));
      if (!audio) return;

      var icono = boton.querySelector(".boton-play__icono");
      var texto = boton.querySelector("[data-i18n]");

      function actualizar(reproduciendo) {
        icono.textContent = reproduciendo ? "⏸" : "▶";
        var clave = reproduciendo ? "pausar" : "reproducir";
        texto.setAttribute("data-i18n", clave);
        if (window.pmTexto) texto.textContent = window.pmTexto(clave);
      }

      boton.addEventListener("click", function () {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      });

      audio.addEventListener("play", function () {
        actualizar(true);
      });
      audio.addEventListener("pause", function () {
        actualizar(false);
      });
      audio.addEventListener("ended", function () {
        actualizar(false);
      });
    });
  });
})();
