/* ==========================================================================
   MÓDULO: NAVEGACIÓN
   --------------------------------------------------------------------------
   1. Header sólido al hacer scroll (.is-scrolled)
   2. Barra de progreso de lectura
   3. Menú móvil (abrir/cerrar, tecla Escape, clic en enlace)
   4. Enlace activo según la sección visible (.is-active)
   ========================================================================== */

window.VX = window.VX || {};

VX.nav = (function () {
  "use strict";

  function initScrollState(header, progress) {
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 20);

      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      }
      ticking = false;
    }

    // requestAnimationFrame evita recalcular en cada evento de scroll
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  function initMobileMenu(toggle, nav) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Si se agranda la ventana con el menú abierto, ciérralo
    window.matchMedia("(min-width: 1280px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  function initActiveLink(links) {
    if (!("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = { link: link, section: section };
    });

    // Una sección es "activa" cuando cruza la franja central de la pantalla
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var item = map[entry.target.id];
        if (item) item.link.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(map).forEach(function (id) {
      observer.observe(map[id].section);
    });
  }

  return {
    init: function () {
      var header = document.getElementById("site-header");
      var toggle = document.getElementById("nav-toggle");
      var nav = document.getElementById("site-nav");
      var progress = document.querySelector(".scroll-progress");
      var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));

      if (header) initScrollState(header, progress);
      if (toggle && nav) initMobileMenu(toggle, nav);
      if (links.length) initActiveLink(links);
    }
  };
})();
