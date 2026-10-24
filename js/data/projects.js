/* ==========================================================================
   DATOS: PROYECTOS
   --------------------------------------------------------------------------
   AQUÍ AGREGAS TUS PROYECTOS. No necesitas tocar el HTML.
   Cada objeto del arreglo se convierte en una tarjeta en la sección
   "Proyectos". Se muestran en el mismo orden en que aparecen aquí.

   CAMPOS DE CADA PROYECTO
   ┌─────────────┬──────────────────────────────────────────────────────────┐
   │ title       │ (obligatorio) Nombre del proyecto                        │
   │ description │ (obligatorio) 1–2 frases: qué problema resuelve          │
   │ category    │ (obligatorio) Clave de CATEGORIES (abajo): "web",        │
   │             │  "estrategia", "ia", "redes"                             │
   │ year        │ Año, ej. "2026"                                          │
   │ tags        │ Tecnologías usadas: ["Python", "MySQL"]                  │
   │ image       │ Ruta de la captura: "assets/img/projects/mi-app.webp"    │
   │             │  Si se deja vacío, se muestra un placeholder.            │
   │ demo        │ URL del sitio en vivo (opcional)                         │
   │ repo        │ URL del repositorio en GitHub (opcional)                 │
   │ status      │ Texto de insignia opcional: "En desarrollo", "Nuevo"     │
   │ featured    │ true → tarjeta grande (usa solo uno)                     │
   │ placeholder │ true → espacio reservado. BÓRRALO cuando lo completes.   │
   └─────────────┴──────────────────────────────────────────────────────────┘

   NOTA DE DISEÑO: el proyecto "featured" ocupa 2 espacios. Con 5 proyectos
   (1 destacado + 4) la cuadrícula queda completa en 3 y en 2 columnas.
   Si agregas más, múltiplos de 3 extra (8, 11...) mantienen las filas llenas.

   CONSEJO: usa imágenes 16:10 (ej. 1600×1000) en formato .webp o .jpg.
   ========================================================================== */

window.VX = window.VX || {};

/* Categorías del filtro. La clave se usa en "category"; el valor es el texto
   que se muestra en el botón. Agrega o quita las que necesites. */
VX.CATEGORIES = {
  saas: "SaaS",
  web: "Desarrollo web",
  estrategia: "Estrategia digital",
  ia: "Inteligencia artificial",
  redes: "Redes sociales"
};

/* Color de cada categoría (uno de los cuatro vértices de la marca):
   "teal" (turquesa), "indigo", "amber" (ámbar) o "coral".
   Coinciden con la leyenda del inicio de la página.
   Si agregas una categoría nueva, asígnale aquí su color. */
VX.CATEGORY_TONES = {
  saas: "indigo",
  web: "teal",
  estrategia: "indigo",
  ia: "amber",
  redes: "coral"
};

VX.PROJECTS = [
  /* ---------- EJEMPLO DE PROYECTO COMPLETO (descomenta y edita) ----------
  {
    title: "Landing page para restaurante",
    description: "Sitio responsivo con menú, ubicación y botón de WhatsApp que ayudó al negocio a recibir pedidos en línea.",
    category: "web",
    year: "2026",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "assets/img/projects/restaurante.webp",
    demo: "https://mi-demo.com",
    repo: "https://github.com/jesusivangd11/restaurante",
    status: "",
    featured: true
  },
  ------------------------------------------------------------------------- */

  {
    title: "FoodPoint · Punto de venta para restaurantes",
    description: "Sistema de punto de venta para loncherías, fondas y restaurantes: toma la orden, imprime la comanda en cocina y cobra en segundos. Incluye monitor de cocina, combos, respaldos y licencias.",
    category: "saas",
    year: "2026",
    tags: ["Punto de venta", "Windows", "Impresoras térmicas"],
    image: "assets/img/projects/foodpoint.webp",
    demo: "https://mesana-alpha.vercel.app/",
    repo: "",
    status: "En producción",
    featured: true
  },
  {
    title: "Fajas Colombianas Maydel",
    description: "Tienda en línea con catálogo por categorías y marcas, carrito, programa de mayoreo para distribuidoras y asesoría de tallas por WhatsApp.",
    category: "web",
    year: "2026",
    tags: ["E-commerce", "Mayoreo", "WhatsApp"],
    image: "assets/img/projects/fajas-maydel.webp",
    demo: "https://www.fajascolombianasmaydel.com/",
    repo: ""
  },
  {
    title: "Fanny Sáenz BeautyStudio",
    description: "Sitio para un estudio de belleza en Chihuahua: presenta sus servicios, su ubicación y lleva a las clientas a agendar su cita por WhatsApp.",
    category: "web",
    year: "2026",
    tags: ["WordPress", "WhatsApp", "Negocio local"],
    image: "assets/img/projects/fanny-saenz.webp",
    demo: "https://misitiochihuahua.com/",
    repo: ""
  },
  {
    title: "Catálogo Maestro · Inventario multinegocio",
    description: "Plataforma para administrar el inventario de varios negocios: productos con variantes y SKU, alta masiva desde fotos y Excel con apoyo de IA, catálogos en PDF y archivos de carga para Mercado Libre y TikTok Shop.",
    category: "web",
    year: "2026",
    tags: ["React", "TypeScript", "Fastify", "PostgreSQL", "Claude API"],
    image: "assets/img/projects/catalogo-maestro-panel.png",
    gallery: [
      { src: "assets/img/projects/catalogo-maestro-panel.png", alt: "Panel general" },
      { src: "assets/img/projects/catalogo-maestro-lotes.png", alt: "Lote de alta masiva" },
      { src: "assets/img/projects/catalogo-maestro-revision.png", alt: "Revisión de productos en tabla" },
      { src: "assets/img/projects/catalogo-maestro-detalle.png", alt: "Detalle de producto con variantes" },
      { src: "assets/img/projects/catalogo-maestro-variantes.png", alt: "Variantes y existencias" }
    ],
    demo: "",
    repo: "https://github.com/jesusivangd11/Sistema-de-Inventario-Maestro",
    featured: true
  }
];
