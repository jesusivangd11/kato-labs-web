/* ==========================================================================
   MÓDULO: CAMPO DE VÉRTICES (fondo animado del hero)
   --------------------------------------------------------------------------
   Dibuja en un <canvas> una red de puntos (vértices) que flotan lentamente
   y se unen con líneas cuando están cerca. El cursor actúa como un vértice
   más: atrae conexiones a su alrededor.

   Rendimiento:
   - Se pausa cuando el hero no está en pantalla o la pestaña está oculta.
   - La cantidad de puntos se ajusta al tamaño de la pantalla.
   - Con "reducir movimiento" activo, dibuja un solo cuadro estático.

   Ajustes rápidos: modifica CONFIG.
   ========================================================================== */

window.VX = window.VX || {};

VX.vertexField = (function () {
  "use strict";

  var CONFIG = {
    density: 0.000085,   // puntos por píxel² (más alto = más puntos)
    maxPoints: 110,
    minPoints: 28,
    linkDistance: 150,   // distancia máxima para unir dos puntos (px)
    mouseDistance: 220,  // radio de influencia del cursor (px)
    speed: 0.22,         // velocidad de desplazamiento
    pointRadius: 1.6
  };

  var canvas, ctx, points = [];
  var width = 0, height = 0, dpr = 1;
  var mouse = { x: -9999, y: -9999, active: false };
  var accentRGB = "94, 224, 193";
  var textRGB = "236, 239, 247";
  // Colores de los vértices destacados (se leen de las variables CSS)
  var TONE_VARS = ["--c-teal-rgb", "--c-indigo-rgb", "--c-amber-rgb", "--c-coral-rgb"];
  var toneRGB = [accentRGB, accentRGB, accentRGB, accentRGB];
  var running = false, visible = true, rafId = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Lee los colores actuales desde las variables CSS (cambian con el tema). */
  function readColors() {
    var styles = getComputedStyle(document.documentElement);
    accentRGB = styles.getPropertyValue("--c-teal-rgb").trim() || accentRGB;
    textRGB = styles.getPropertyValue("--c-text-rgb").trim() || textRGB;
    toneRGB = TONE_VARS.map(function (v) {
      return styles.getPropertyValue(v).trim() || accentRGB;
    });
  }

  function createPoints() {
    var count = Math.round(width * height * CONFIG.density);
    count = Math.max(CONFIG.minPoints, Math.min(CONFIG.maxPoints, count));
    points = [];
    for (var i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        // ~1 de cada 5 puntos es un "vértice" destacado de color
        hub: Math.random() < 0.2,
        tone: Math.floor(Math.random() * 4)
      });
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createPoints();
    if (!running) draw();
  }

  function update() {
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      p.x += p.vx;
      p.y += p.vy;

      // Rebote suave en los bordes
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // El cursor atrae ligeramente a los puntos cercanos
      if (mouse.active) {
        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseDistance && dist > 1) {
          p.x += (dx / dist) * 0.12;
          p.y += (dy / dist) * 0.12;
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    var linkD2 = CONFIG.linkDistance * CONFIG.linkDistance;
    var i, j, a, b, dx, dy, d2, alpha;

    // Líneas entre puntos cercanos
    ctx.lineWidth = 1;
    for (i = 0; i < points.length; i++) {
      a = points[i];
      for (j = i + 1; j < points.length; j++) {
        b = points[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 < linkD2) {
          alpha = (1 - d2 / linkD2) * 0.3;
          // Si un extremo es vértice de color, la línea toma ese color
          var lineRGB = a.hub ? toneRGB[a.tone] : b.hub ? toneRGB[b.tone] : textRGB;
          ctx.strokeStyle = "rgba(" + lineRGB + "," + (lineRGB === textRGB ? alpha * 0.7 : alpha) + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Líneas desde el cursor (color acento)
    if (mouse.active) {
      var mD2 = CONFIG.mouseDistance * CONFIG.mouseDistance;
      for (i = 0; i < points.length; i++) {
        a = points[i];
        dx = a.x - mouse.x;
        dy = a.y - mouse.y;
        d2 = dx * dx + dy * dy;
        if (d2 < mD2) {
          alpha = (1 - d2 / mD2) * 0.55;
          ctx.strokeStyle = "rgba(" + accentRGB + "," + alpha + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Puntos
    for (i = 0; i < points.length; i++) {
      a = points[i];
      ctx.beginPath();
      if (a.hub) {
        ctx.fillStyle = "rgba(" + toneRGB[a.tone] + ",0.95)";
        ctx.shadowColor = "rgba(" + toneRGB[a.tone] + ",0.9)";
        ctx.shadowBlur = 10;
        ctx.arc(a.x, a.y, CONFIG.pointRadius * 1.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        continue;
      } else {
        ctx.fillStyle = "rgba(" + textRGB + ",0.35)";
        ctx.arc(a.x, a.y, CONFIG.pointRadius, 0, Math.PI * 2);
      }
      ctx.fill();
    }
  }

  function loop() {
    if (!running) return;
    update();
    draw();
    rafId = window.requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    rafId = window.requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
  }

  function bindEvents() {
    var hero = canvas.parentElement;

    hero.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    hero.addEventListener("pointerleave", function () {
      mouse.active = false;
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    // Pausa cuando el hero sale de la pantalla
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }).observe(hero);
    }

    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });

    document.addEventListener("vx:themechange", function () {
      readColors();
      if (!running) draw();
    });
  }

  return {
    init: function () {
      canvas = document.getElementById("vertex-field");
      if (!canvas || !canvas.getContext) return;
      ctx = canvas.getContext("2d");

      readColors();
      resize();
      bindEvents();
      start();
    }
  };
})();
