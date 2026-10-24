/* ==========================================================================
   MÓDULO: APARICIÓN AL HACER SCROLL + CONTADORES
   --------------------------------------------------------------------------
   - Elementos con [data-reveal] reciben .is-visible al entrar en pantalla.
   - Elementos con [data-count="N"] cuentan de 0 a N la primera vez que
     se ven.
   ========================================================================== */

window.VX = window.VX || {};

VX.reveal = (function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) {
      el.textContent = target;
      return;
    }

    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.round(target * eased);
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  /** Observa elementos; se puede volver a llamar para contenido nuevo. */
  function observe(root) {
    var scope = root || document;
    var items = scope.querySelectorAll("[data-reveal]:not(.is-visible)");
    var counters = scope.querySelectorAll("[data-count]");

    // Navegadores antiguos: muestra todo sin animación
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
      return;
    }

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // solo se anima una vez
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    items.forEach(function (el) { revealObserver.observe(el); });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  return {
    init: function () { observe(document); },
    observe: observe
  };
})();
