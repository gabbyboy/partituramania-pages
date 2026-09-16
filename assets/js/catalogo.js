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
    var selectFiltroTipo = document.getElementById("filtro-tipo");

    function numeroDificultad(dificultad) {
      var n = parseFloat(dificultad);
      return isNaN(n) ? 0 : n;
    }

    function poblarFiltroDificultad() {
      if (!selectFiltroDificultad) return;
      var valores = [];
      tarjetas.forEach(function (t) {
        var d = t.dataset.dificultad;
        if (d && valores.indexOf(d) === -1) valores.push(d);
      });
      valores.sort(function (a, b) {
        return numeroDificultad(a) - numeroDificultad(b);
      });
      valores.forEach(function (v) {
        var opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
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
      var valorTipo = selectFiltroTipo ? selectFiltroTipo.value : "todos";

      tarjetas.forEach(function (t) {
        var pasaDificultad = valorDificultad === "todas" || t.dataset.dificultad === valorDificultad;
        var esEjercicio = t.dataset.ejercicio === "true";
        var pasaTipo =
          valorTipo === "todos" ||
          (valorTipo === "melodias" && !esEjercicio) ||
          (valorTipo === "ejercicios" && esEjercicio);

        t.hidden = !(pasaDificultad && pasaTipo);
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

    if (selectFiltroTipo) {
      selectFiltroTipo.addEventListener("change", filtrar);
    }
  });
})();
