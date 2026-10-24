/* ==========================================================================
   MAIN — punto de entrada
   --------------------------------------------------------------------------
   Inicializa cada módulo en orden. Si quieres desactivar una función,
   comenta su línea aquí.
   ========================================================================== */

(function () {
  "use strict";

  /** Ejecuta un módulo sin que un error en uno detenga a los demás. */
  function safeInit(name) {
    try {
      if (VX[name] && typeof VX[name].init === "function") VX[name].init();
    } catch (err) {
      console.error("[Kato Labs] Error al iniciar el módulo " + name + ":", err);
    }
  }

  /** Año actual en todos los elementos [data-year]. */
  function setYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  setYear();

  safeInit("theme");        // Tema claro/oscuro
  safeInit("nav");          // Header, menú móvil, enlace activo
  safeInit("vertexField");  // Fondo animado del hero
  safeInit("projects");     // Tarjetas y filtros (antes de reveal)
  safeInit("contact");      // Copiar correo
  safeInit("reveal");       // Animaciones al hacer scroll (siempre al final)
})();
