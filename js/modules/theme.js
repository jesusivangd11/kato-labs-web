/* ==========================================================================
   MÓDULO: TEMA (claro / oscuro)
   --------------------------------------------------------------------------
   Este archivo se carga en el <head> SIN defer, a propósito:
   aplica el tema guardado antes de que se pinte la página (evita parpadeo).

   - Guarda la preferencia en localStorage ("vx-theme").
   - Si no hay preferencia guardada, usa el tema oscuro.
   - Agrega la clase .js al <html> (activa animaciones de aparición).
   ========================================================================== */

window.VX = window.VX || {};

(function () {
  "use strict";

  var STORAGE_KEY = "vx-theme";
  var root = document.documentElement;

  // Indica a CSS que JavaScript está disponible
  root.classList.remove("no-js");
  root.classList.add("js");

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // modo privado o almacenamiento bloqueado
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* sin almacenamiento: el tema solo dura esta visita */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#EAEFF7" : "#0A0D18");
    // Avisa a otros módulos (ej. el canvas del hero cambia de color)
    document.dispatchEvent(new CustomEvent("vx:themechange", { detail: { theme: theme } }));
  }

  // Tema inicial: el guardado por el visitante o, si no hay, el oscuro
  // (es el que mejor luce la paleta de color de Kato Labs).
  var initial = getSavedTheme() || "dark";
  root.setAttribute("data-theme", initial);

  // Se llama desde main.js cuando el DOM está listo
  VX.theme = {
    init: function () {
      applyTheme(root.getAttribute("data-theme"));
      var btn = document.getElementById("theme-toggle");
      if (!btn) return;

      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
        saveTheme(next);
      });
    }
  };
})();
