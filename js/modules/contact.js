/* ==========================================================================
   MÓDULO: CONTACTO
   --------------------------------------------------------------------------
   Botón para copiar el correo al portapapeles (lee el atributo data-copy).
   ========================================================================== */

window.VX = window.VX || {};

VX.contact = (function () {
  "use strict";

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Respaldo para file:// o navegadores antiguos
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(area);
      ok ? resolve() : reject();
    });
  }

  return {
    init: function () {
      var btn = document.querySelector(".contact__copy");
      var toast = document.querySelector(".contact__toast");
      if (!btn) return;

      var timer;
      btn.addEventListener("click", function () {
        copyText(btn.getAttribute("data-copy"))
          .then(function () {
            btn.classList.add("is-copied");
            if (toast) toast.textContent = "¡Copiado!";
          })
          .catch(function () {
            if (toast) toast.textContent = "No se pudo copiar";
          })
          .then(function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
              btn.classList.remove("is-copied");
              if (toast) toast.textContent = "";
            }, 2000);
          });
      });
    }
  };
})();
