/* ==========================================================================
   DATOS: PROYECTOS
   --------------------------------------------------------------------------
   AQUÍ AGREGAS TUS PROYECTOS. No necesitas tocar el HTML.
   Cada objeto del arreglo se convierte en una tarjeta en la sección
   "Proyectos". Se muestran en el mismo orden en que aparecen aquí.

   CAMPOS DE CADA PROYECTO
   ┌─────────────┬──────────────────────────────────────────────────────────┐
   │ title       │ (obligatorio) Nombre del proyecto                        │
   │ description │ (obligatorio) 1 frase: qué es                            │
   │ problem     │ La problemática que tenía el negocio                     │
   │ solution    │ Cómo se resolvió                                         │
   │ category    │ (obligatorio) Clave de CATEGORIES (abajo): "web",        │
   │             │  "estrategia", "ia", "redes"                             │
   │ year        │ Año, ej. "2026"                                          │
   │ tags        │ Tecnologías usadas: ["Python", "MySQL"]                  │
   │ image       │ Ruta de la captura: "assets/img/projects/mi-app.webp"    │
   │             │  Si se deja vacío, se muestra un placeholder.            │
   │ demo        │ URL del sitio en vivo (opcional)                         │
   │ repo        │ URL del repositorio en GitHub (opcional)                 │
   │ status      │ Texto de insignia opcional: "En desarrollo", "Nuevo"     │
   │ featured    │ true → tarjeta a todo el ancho de la fila                │
   │ reverse     │ true → (con featured) imagen a la derecha                │
   │ half        │ true → tarjeta de media fila (2 por fila)                │
   │ fit         │ "contain" → muestra la captura completa y centrada       │
   │ placeholder │ true → espacio reservado. BÓRRALO cuando lo completes.   │
   └─────────────┴──────────────────────────────────────────────────────────┘

   NOTA DE DISEÑO: en escritorio la cuadrícula tiene 6 columnas: normal = 1/3
   de fila, "half" = 1/2, "featured" = fila completa. Combina para llenar filas
   (3 normales, 2 half, o 1 featured).

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
    description: "Software de punto de venta para loncherías, fondas y restaurantes, con licencias por negocio.",
    problem: "Muchas loncherías y fondas toman los pedidos en papel: las comandas se pierden o no se entienden, la cocina no sabe qué orden sigue y en la hora pico cobrar se vuelve lento.",
    solution: "Un sistema para Windows que toma la orden, imprime la comanda en cocina al momento y cobra en segundos. Incluye monitor de cocina, combos, respaldos e impresoras térmicas.",
    category: "saas",
    year: "2026",
    tags: ["Punto de venta", "Windows", "Impresoras térmicas"],
    image: "assets/img/projects/foodpoint.webp",
    demo: "https://mesana-alpha.vercel.app/",
    repo: "",
    featured: true
  },
  {
    title: "Maydek · Punto de venta e inventario",
    description: "Programa de escritorio para Windows con caja, inventario y administración para negocios pequeños.",
    problem: "Muchos negocios pequeños llevan ventas y existencias en libretas o Excel: los cortes de caja no cuadran, el inventario nunca está al día y no saben cuánto ganan realmente.",
    solution: "Un solo programa que cobra con lector de código de barras, descuenta el inventario automáticamente y ofrece tablero de ventas, kardex, créditos a clientes y roles de usuario. Funciona sin internet, con la base de datos en la propia computadora.",
    category: "saas",
    year: "2026",
    tags: ["Punto de venta", "Windows", "Inventario", "Sin internet"],
    image: "assets/img/projects/maydek-caja-venta.jpg",
    gallery: [
      { src: "assets/img/projects/maydek-caja-venta.jpg", alt: "Caja: pantalla de venta" },
      { src: "assets/img/projects/maydek-caja-cobro.jpg", alt: "Caja: cobro" },
      { src: "assets/img/projects/maydek-admin-tablero.jpg", alt: "Administración: tablero de ventas" }
    ],
    demo: "https://maydek.vercel.app",
    repo: "",
    status: "En proceso",
    featured: true,
    reverse: true
  },
  {
    title: "Fajas Colombianas Maydel",
    description: "Tienda en línea de fajas colombianas para venta al público y a distribuidoras.",
    problem: "El negocio vendía principalmente por mensajes: las clientas no podían ver el catálogo completo y atender pedidos de mayoreo y dudas de tallas era manual y lento.",
    solution: "Una tienda en línea con catálogo por categorías y marcas, carrito, programa de mayoreo para distribuidoras y asesoría de tallas directa por WhatsApp.",
    category: "web",
    year: "2026",
    tags: ["E-commerce", "Mayoreo", "WhatsApp"],
    image: "assets/img/projects/fajas-maydel.webp",
    demo: "https://www.fajascolombianasmaydel.com/",
    repo: "",
    half: true
  },
  {
    title: "Fanny Sáenz BeautyStudio",
    description: "Sitio web para un estudio de belleza en Chihuahua.",
    problem: "El estudio dependía solo de redes sociales: a las clientas nuevas les costaba encontrar sus servicios, la ubicación y la forma de agendar.",
    solution: "Un sitio en WordPress que presenta los servicios y la ubicación, y lleva a cada clienta a agendar su cita por WhatsApp con un clic.",
    category: "web",
    year: "2026",
    tags: ["WordPress", "WhatsApp", "Negocio local"],
    image: "assets/img/projects/fanny-saenz.webp",
    demo: "https://misitiochihuahua.com/",
    repo: "",
    half: true
  },
  {
    title: "Catálogo Maestro · Inventario multinegocio",
    description: "Plataforma web para administrar el inventario de varios negocios desde un solo lugar.",
    problem: "Llevar el inventario de varios negocios implicaba hojas de Excel separadas, capturar producto por producto y rehacer los archivos para cada canal de venta.",
    solution: "Una plataforma central con variantes y SKU, alta masiva desde fotos y Excel con apoyo de IA, catálogos en PDF y archivos listos para Mercado Libre y TikTok Shop.",
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
    demo: "",            // TODO: pega aquí la URL de la demo cuando esté lista y borra "status"
    repo: "https://github.com/jesusivangd11/Sistema-de-Inventario-Maestro",
    status: "En proceso",
    featured: true,
    reverse: true,
    fit: "contain"
  }
];
