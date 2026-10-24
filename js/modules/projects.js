/* ==========================================================================
   MÓDULO: PROYECTOS
   --------------------------------------------------------------------------
   Genera las tarjetas y los filtros a partir de js/data/projects.js.
   Para agregar proyectos NO edites este archivo: edita js/data/projects.js.
   ========================================================================== */

window.VX = window.VX || {};

VX.projects = (function () {
  "use strict";

  var grid, filtersEl;

  /** Escapa texto para insertarlo de forma segura en HTML. */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }


  /** Clase de color según la categoría (ver VX.CATEGORY_TONES). */
  function toneClass(category) {
    var tones = VX.CATEGORY_TONES || {};
    return tones[category] ? "tone-" + tones[category] : "tone-teal";
  }

  function icon(id) {
    return '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>';
  }

  /** Construye el HTML de una tarjeta. */
  function cardTemplate(p, index) {
    var categories = VX.CATEGORIES || {};
    var classes = ["project-card", toneClass(p.category)];
    if (p.featured) classes.push("is-featured");
    if (p.half) classes.push("is-half");
    if (p.reverse) classes.push("is-reverse");
    if (p.fit === "contain") classes.push("is-contain");
    if (p.placeholder) classes.push("is-placeholder");

    var media = p.image
      ? '<img src="' + esc(p.image) + '" alt="Captura de ' + esc(p.title) + '" loading="lazy">'
      : '<div class="project-card__placeholder">' + icon("i-crosshair") +
          "<span>Espacio para tu proyecto</span></div>";

    var badge = p.status
      ? '<span class="project-card__badge">' +
          esc(p.status) + "</span>"
      : "";

    var gallery = (p.gallery || []).length
      ? '<div class="project-card__gallery">' + p.gallery.map(function (g) {
          return '<a href="' + esc(g.src) + '" target="_blank" rel="noopener" aria-label="Ver captura: ' + esc(g.alt) + '">' +
            '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy"></a>';
        }).join("") + "</div>"
      : "";

    var tags = (p.tags || []).map(function (t) {
      return '<li class="tag">' + esc(t) + "</li>";
    }).join("");

    var links = "";
    if (p.demo) {
      links += '<a class="link-underline" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' +
        "Ver demo " + icon("i-arrow-up-right") + "</a>";
    }
    if (p.repo) {
      links += '<a class="link-underline" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' +
        "Código " + icon("i-github") + "</a>";
    }
    if (!links && p.placeholder) {
      links = '<span class="mono" style="font-size:.75rem;color:var(--c-text-faint)">Edita js/data/projects.js</span>';
    }

    return (
      '<article class="' + classes.join(" ") + '" data-category="' + esc(p.category) + '">' +
        '<div class="project-card__media"' + (gallery ? ' role="button" tabindex="0" aria-label="Ver capturas de ' + esc(p.title) + '"' : "") + ">" + media + badge + "</div>" +
        '<div class="project-card__body">' +
          '<div class="project-card__meta">' +
            '<span class="text-accent">' + esc(categories[p.category] || p.category) + "</span>" +
            (p.year ? "<span>" + esc(p.year) + "</span>" : "") +
          "</div>" +
          '<h3 class="project-card__title">' + esc(p.title) + "</h3>" +
          '<p class="project-card__desc">' + esc(p.description) + "</p>" +
          gallery +
          (tags ? '<ul class="tag-list">' + tags + "</ul>" : "") +
          (links ? '<div class="project-card__links">' + links + "</div>" : "") +
        "</div>" +
      "</article>"
    );
  }

  /** Crea los botones de filtro (solo para categorías que tienen proyectos). */
  function renderFilters(projects) {
    var categories = VX.CATEGORIES || {};
    var counts = {};
    projects.forEach(function (p) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    var html = filterButton("all", "Todos", projects.length, true);
    Object.keys(categories).forEach(function (key) {
      if (counts[key]) html += filterButton(key, categories[key], counts[key], false);
    });
    filtersEl.innerHTML = html;

    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filtersEl.querySelectorAll(".filter-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      applyFilter(btn.getAttribute("data-filter"));
    });
  }

  function filterButton(key, label, count, pressed) {
    var tone = key === "all" ? "" : " " + toneClass(key);
    return '<button class="filter-btn' + tone + '" type="button" data-filter="' + esc(key) +
      '" aria-pressed="' + pressed + '">' + esc(label) +
      '<span class="filter-btn__count">' + count + "</span></button>";
  }

  function applyFilter(key) {
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var match = key === "all" || card.getAttribute("data-category") === key;
      card.classList.toggle("is-hidden", !match);
      card.classList.remove("is-entering");
      if (match) {
        void card.offsetWidth; // reinicia la animación
        card.classList.add("is-entering");
      }
    });
  }

  /** Efecto de luz que sigue al cursor dentro de cada tarjeta. */
  function bindSpotlight() {
    grid.addEventListener("pointermove", function (e) {
      var card = e.target.closest(".project-card");
      if (!card) return;
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  }

  /* ---------- Visor de capturas (lightbox) ---------- */
  var lb, lbImg, lbCap, lbCount, lbItems = [], lbIndex = 0, lbTrigger = null, touchX = null;

  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Capturas del proyecto");
    lb.innerHTML =
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Cerrar">&times;</button>' +
      '<button class="lightbox__btn lightbox__nav lightbox__nav--prev" type="button" aria-label="Anterior">&#8249;</button>' +
      '<figure class="lightbox__figure"><img class="lightbox__img" alt="">' +
      '<figcaption class="lightbox__caption"><span class="lightbox__text"></span><span class="lightbox__count"></span></figcaption></figure>' +
      '<button class="lightbox__btn lightbox__nav lightbox__nav--next" type="button" aria-label="Siguiente">&#8250;</button>';
    document.body.appendChild(lb);

    lbImg = lb.querySelector(".lightbox__img");
    lbCap = lb.querySelector(".lightbox__text");
    lbCount = lb.querySelector(".lightbox__count");

    lb.addEventListener("click", function (e) {
      if (e.target.closest(".lightbox__close") || e.target === lb) return closeLightbox();
      if (e.target.closest(".lightbox__nav--prev")) return stepLightbox(-1);
      if (e.target.closest(".lightbox__nav--next")) return stepLightbox(1);
    });
    lb.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
    });
  }

  function showLightboxItem() {
    var item = lbItems[lbIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCap.textContent = item.alt;
    lbCount.textContent = (lbIndex + 1) + " / " + lbItems.length;
  }

  function stepLightbox(dir) {
    lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
    showLightboxItem();
  }

  function openLightbox(items, index, trigger) {
    if (!lb) buildLightbox();
    lbItems = items;
    lbIndex = index;
    lbTrigger = trigger;
    lb.classList.toggle("is-single", items.length < 2);
    showLightboxItem();
    lb.hidden = false;
    document.documentElement.classList.add("lightbox-open");
    lb.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    lbImg.removeAttribute("src");
    document.documentElement.classList.remove("lightbox-open");
    if (lbTrigger) lbTrigger.focus();
  }

  function galleryItems(card) {
    return Array.prototype.map.call(card.querySelectorAll(".project-card__gallery a"), function (a) {
      var img = a.querySelector("img");
      return { src: a.getAttribute("href"), alt: img ? img.getAttribute("alt") : "" };
    });
  }

  function bindGallery() {
    function openFrom(target, index) {
      var card = target.closest(".project-card");
      var items = card ? galleryItems(card) : [];
      if (items.length) openLightbox(items, index, target);
    }

    grid.addEventListener("click", function (e) {
      var thumb = e.target.closest(".project-card__gallery a");
      if (thumb) {
        e.preventDefault();
        var siblings = Array.prototype.slice.call(thumb.parentNode.children);
        return openFrom(thumb, siblings.indexOf(thumb));
      }
      var media = e.target.closest(".project-card__media[role=button]");
      if (media) openFrom(media, 0);
    });

    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var media = e.target.closest(".project-card__media[role=button]");
      if (!media) return;
      e.preventDefault();
      openFrom(media, 0);
    });
  }

  return {
    init: function () {
      grid = document.getElementById("projects-grid");
      filtersEl = document.getElementById("project-filters");
      var projects = VX.PROJECTS || [];
      if (!grid) return;

      grid.innerHTML = projects.map(cardTemplate).join("");

      // Animación escalonada de aparición
      grid.querySelectorAll(".project-card").forEach(function (card, i) {
        card.setAttribute("data-reveal", "");
        card.setAttribute("data-reveal-delay", String((i % 3) + 1));
      });

      if (filtersEl) renderFilters(projects);
      bindSpotlight();
      bindGallery();
    }
  };
})();
