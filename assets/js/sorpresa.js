(function () {
  // El botón no descarga el catálogo completo: pide sólo un JSON liviano con
  // las URLs de las partituras (generado en build), y recién ahí — al
  // hacer click, no en cada carga de página — para elegir una al azar.
  // Selecciona por clase (no por id) porque puede haber más de un botón en
  // la misma página (el del nav y, por ejemplo, el de la 404).
  document.addEventListener("DOMContentLoaded", function () {
    var botones = document.querySelectorAll(".js-boton-sorpresa");
    if (!botones.length) return;

    botones.forEach(function (boton) {
      boton.addEventListener("click", function () {
        botones.forEach(function (b) {
          b.disabled = true;
        });

        fetch("/assets/data/partituras.json")
          .then(function (respuesta) {
            return respuesta.json();
          })
          .then(function (urls) {
            if (!urls.length) {
              botones.forEach(function (b) {
                b.disabled = false;
              });
              return;
            }
            var url = urls[Math.floor(Math.random() * urls.length)];
            window.location.href = url;
          })
          .catch(function () {
            botones.forEach(function (b) {
              b.disabled = false;
            });
          });
      });
    });
  });
})();
