# Kato Labs — Portafolio

Portafolio personal de **Jesús García** bajo la marca **Kato Labs**.
Sitio estático hecho con HTML, CSS y JavaScript puro: no necesita instalar nada ni compilar.

---

## Cómo verlo

- **Opción rápida:** doble clic en `index.html`.
- **Recomendada (recarga automática):** en VS Code instala la extensión *Live Server*, clic derecho sobre `index.html` → **Open with Live Server**.

---

## Estructura

```
Vertex Labs/
├── index.html                  ← Todo el contenido (textos, secciones)
├── README.md                   ← Este archivo
├── .gitignore
│
├── css/
│   ├── base/
│   │   ├── variables.css       ← COLORES, fuentes, espacios (tema claro y oscuro)
│   │   ├── reset.css           ← Normalización del navegador
│   │   ├── typography.css      ← Títulos, eyebrow, párrafos
│   │   └── layout.css          ← Contenedor, secciones, grano, accesibilidad
│   ├── components/             ← Piezas reutilizables
│   │   ├── buttons.css
│   │   ├── header.css          ← Navegación + menú móvil
│   │   ├── tags.css            ← Chips de tecnologías y píldora de estado
│   │   ├── project-card.css    ← Tarjeta de proyecto
│   │   └── footer.css
│   ├── sections/               ← Un archivo por sección de la página
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── skills.css        ← Tecnologías y habilidades
│   │   ├── projects.css
│   │   ├── process.css
│   │   ├── experience.css
│   │   └── contact.css
│   └── utilities/
│       └── animations.css      ← Keyframes y sistema de aparición al hacer scroll
│
├── js/
│   ├── data/
│   │   └── projects.js         ← TUS PROYECTOS (edita aquí)
│   ├── modules/
│   │   ├── theme.js            ← Tema claro/oscuro
│   │   ├── nav.js              ← Header, menú móvil, enlace activo, barra de progreso
│   │   ├── reveal.js           ← Animaciones al hacer scroll y contadores
│   │   ├── vertex-field.js     ← Red de vértices animada del hero (canvas)
│   │   ├── projects.js         ← Genera tarjetas y filtros
│   │   └── contact.js          ← Botón "copiar correo"
│   └── main.js                 ← Punto de entrada: inicia todos los módulos
│
└── assets/
    ├── icons/favicon.svg
    ├── img/
    │   ├── profile/            ← Tu foto de perfil
    │   └── projects/           ← Capturas de tus proyectos
    └── docs/                   ← Tu CV (cv.pdf)
```

---

## Checklist de personalización

Busca **`TODO`** en `index.html` (Ctrl+F en VS Code) para encontrar cada punto.

| # | Qué | Dónde |
|---|-----|-------|
| 1 | Nombre completo y descripción SEO | `index.html` → `<head>` |
| 2 | Frase de presentación del hero | `index.html` → sección `#inicio` |
| 3 | Datos rápidos (enfoque, ubicación, idiomas) | `index.html` → `.hero__meta` |
| 4 | Foto de perfil | `assets/img/profile/` + `index.html` → `#sobre-mi` |
| 5 | Texto "Sobre mí" y bloque de impacto | `index.html` → `#sobre-mi` |
| 6 | Tecnologías y habilidades | `index.html` → `#habilidades` |
| 7 | **Proyectos** | `js/data/projects.js` |
| 8 | Experiencia y formación | `index.html` → `#trayectoria` |
| 9 | Correo (3 lugares) | `index.html` → `#contacto`, `#proyectos` y footer |
| 10 | CV en PDF (ya incluido; reemplázalo al actualizarlo) | `assets/docs/cv.pdf` |

---

## Agregar un proyecto

1. Guarda la captura en `assets/img/projects/` (ideal 1600×1000, `.webp` o `.jpg`).
2. Abre `js/data/projects.js` y agrega un objeto al arreglo `VX.PROJECTS`:

```js
{
  title: "Sistema de Punto de Venta",
  description: "Gestión de ventas, inventario y cortes de caja para comercios.",
  category: "web",                // web | estrategia | ia | redes
  year: "2026",
  tags: ["Python", "MySQL"],
  image: "assets/img/projects/punto-venta.webp",
  demo: "https://...",            // opcional
  repo: "https://github.com/...", // opcional
  featured: true                  // opcional: tarjeta grande
}
```

3. Borra los objetos con `placeholder: true` que ya no necesites.

Los filtros se crean solos según las categorías que tengan proyectos.
Para crear una categoría nueva, agrégala en `VX.CATEGORIES` del mismo archivo.

---

## WhatsApp y redes sociales

Ya configurados en `index.html`:

| Red | Dónde aparece | Enlace |
|-----|---------------|--------|
| WhatsApp (614 133 6763) | Contacto + footer | `https://wa.me/526141336763?text=...` |
| Instagram (@kato_labs) | Contacto + footer | `https://www.instagram.com/kato_labs/` |
| Facebook | Footer | `https://www.facebook.com/profile.php?id=61595503166496` |

**Cambiar el mensaje predeterminado de WhatsApp:** edita el texto después de `text=` en los 2 enlaces `wa.me` (busca `wa.me` en `index.html`). Los espacios se escriben `%20`, la coma `%2C`, la `ú` `%C3%BA` y la `í` `%C3%AD`.
Mensaje actual: *"Hola Jesús, vi tu portafolio de Kato Labs y me gustaría platicar contigo sobre una oportunidad."*

---

## Cambiar colores

Todo está en `css/base/variables.css`. La paleta usa **cuatro colores**: cada color representa un área de trabajo y se repite en todo el sitio (leyenda del inicio, habilidades, filtros de proyectos, proceso, trayectoria).

| Variable | Color | Significado | Oscuro | Claro |
|----------|-------|-------------|--------|-------|
| `--c-teal` | Turquesa | Marca principal · Desarrollo web | `#5EE0C1` | `#0B9A7C` |
| `--c-indigo` | Índigo | Estrategia digital · Plataformas | `#8B9BFF` | `#4C5BDB` |
| `--c-amber` | Ámbar | Inteligencia artificial · Estrategia | `#FFC46B` | `#C47D06` |
| `--c-coral` | Coral | Redes sociales · Infraestructura | `#FF8D7E` | `#DB5440` |
| `--c-bg` | Azul tinta | Fondo | `#0A0D18` | `#EAEFF7` |

- Si cambias un color, actualiza también su variable `-rgb` (la usan el canvas del hero y las transparencias).
- Gradientes listos: `--grad-brand` (los cuatro colores), `--grad-cool` (turquesa → índigo), `--grad-deep` (panel de contacto).
- **Para darle un color a un componente** agrégale una clase de tono en el HTML: `tone-teal`, `tone-indigo`, `tone-amber` o `tone-coral`. El componente usa `var(--tone)` en su CSS.
- **Color de las categorías de proyectos:** `VX.CATEGORY_TONES` en `js/data/projects.js`.
- El sitio abre en **tema oscuro** por defecto; el visitante puede cambiarlo con el botón ☀/☾ y se recuerda su elección.

**Tamaño de letra:** todo el sitio usa `rem`. El tamaño base está al inicio de `css/base/typography.css` (17px en móvil, 18px en escritorio); cambiarlo agranda o reduce toda la página.

**Tipografías:** Bricolage Grotesque (títulos), Instrument Sans (texto), JetBrains Mono (etiquetas). Se cargan desde Google Fonts en el `<head>`.

---

## Características

- Responsivo desde 320px hasta pantallas grandes (menú móvil a pantalla completa).
- Tema oscuro por defecto y tema claro opcional (se recuerda la elección).
- Hero con manchas de color animadas y red de vértices de colores que reacciona al cursor.
- Animaciones al hacer scroll, contadores y filtros de proyectos.
- Accesible: navegación con teclado, "saltar al contenido", `aria-*` y respeto a *reducir movimiento*.
- Funciona sin servidor (scripts clásicos, no ES modules).

---

## Publicar (cuando estés listo)

Aún no está en GitHub. Cuando quieras publicarlo, **GitHub Pages** es gratis:
crea un repositorio, sube la carpeta y en *Settings → Pages* elige la rama `main`.
