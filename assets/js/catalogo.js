(function () {
  // Ordena/filtra en el cliente sólo las tarjetas que ya están en el DOM de
  // esta página (una sola grilla de un instrumento) — nunca descarga ni
  // parsea un dataset completo del catálogo.
  document.addEventListener("DOMContentLoaded", function () {
    var grilla = document.querySelector("[data-partitura-grid]");
    if (!grilla) return;

    var tarjetas = Array.prototype.slice.call(grilla.children);
    var selectOrden = document.getElementById("ordenar-por");
    var selectFiltroDificultad = document.getElementById("filtro-dificultad");

    function numeroDificultad(dificultad) {
      var n = parseFloat(dificultad);
      return isNaN(n) ? 0 : n;
    }

    function poblarFiltroDificultad() {
      if (!selectFiltroDificultad) return;
      var vistos = {};
      var opciones = [];
      tarjetas.forEach(function (t) {
        var d = t.dataset.dificultad;
        if (d && !vistos[d]) {
          vistos[d] = true;
          opciones.push({ valor: d, texto: t.dataset.dificultadMostrada || d });
        }
      });
      opciones.sort(function (a, b) {
        return numeroDificultad(a.valor) - numeroDificultad(b.valor);
      });
      opciones.forEach(function (o) {
        var opt = document.createElement("option");
        opt.value = o.valor;
        opt.textContent = o.texto;
        selectFiltroDificultad.appendChild(opt);
      });
    }

    function ordenar(criterio) {
      var ordenadas = tarjetas.slice().sort(function (a, b) {
        switch (criterio) {
          case "nombre-asc":
            return a.dataset.nombre.localeCompare(b.dataset.nombre, "es");
          case "puntaje-desc":
            return parseFloat(b.dataset.puntaje) - parseFloat(a.dataset.puntaje);
          case "puntaje-asc":
            return parseFloat(a.dataset.puntaje) - parseFloat(b.dataset.puntaje);
          case "dificultad-desc":
            return numeroDificultad(b.dataset.dificultad) - numeroDificultad(a.dataset.dificultad);
          case "dificultad-asc":
          default:
            return numeroDificultad(a.dataset.dificultad) - numeroDificultad(b.dataset.dificultad);
        }
      });
      ordenadas.forEach(function (t) {
        grilla.appendChild(t);
      });
    }

    function filtrar() {
      var valorDificultad = selectFiltroDificultad ? selectFiltroDificultad.value : "todas";

      tarjetas.forEach(function (t) {
        var pasaDificultad = valorDificultad === "todas" || t.dataset.dificultad === valorDificultad;
        t.hidden = !pasaDificultad;
      });
    }

    poblarFiltroDificultad();

    if (selectOrden) {
      selectOrden.addEventListener("change", function (e) {
        ordenar(e.target.value);
      });
      ordenar(selectOrden.value);
    }

    if (selectFiltroDificultad) {
      selectFiltroDificultad.addEventListener("change", filtrar);
    }
  });
})();
