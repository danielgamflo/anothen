# MUI — Propuesta de rediseño

Prototipo de una página para el **Museo Inmersivo Las Condes**. Un solo archivo
(`index.html`), sin dependencias ni build: se abre con doble clic.

> **No es el sitio oficial.** Lleva `noindex` y una cinta visible que lo declara
> propuesta. No publicar en un dominio indexable ni presentarlo como sitio del museo.

---

## Cómo verlo

Doble clic en `index.html`, o para servirlo:

```bash
python3 -m http.server 8080 --directory mui
# http://localhost:8080
```

Para deploy de demostración: Netlify Drop o GitHub Pages, con URL privada.

### Dónde van los archivos

Todo se detecta solo. Si un archivo no está, la página usa su respaldo y se ve
bien igual — no hay que tocar código para probar.

```
mui/
├── img/
│   ├── logo-mui.svg              → marca en la barra superior
│   ├── logo-municipalidad.svg    → pie institucional
│   ├── logo-corporacion.svg      → pie institucional
│   ├── logo-125.svg              → pie institucional
│   ├── logo-cpued.svg            → tarjeta de funciones adaptadas
│   ├── ceiba.webp                → sección de la muestra (vertical 4:5)
│   ├── casona.webp               → sección del museo (horizontal 16:10)
│   └── hero-poster.webp          → primer fotograma del video
└── video/
    ├── hero.webm                 → fondo del hero (preferido, más liviano)
    └── hero.mp4                  → respaldo para Safari
```

**Respaldos automáticos, por si falta algo:**

| Si falta… | La página… |
|---|---|
| `logo-*.svg` | escribe el nombre en texto, con la tipografía del sitio |
| `ceiba.webp` | prueba `ceiba.jpg`; si tampoco está, deja el degradado |
| `casona.webp` | prueba `casona.jpg`; si tampoco está, deja el degradado |
| `hero.webm` y `hero.mp4` | mantiene el campo de luz generado por canvas |

Los logos se fuerzan a blanco por CSS (`filter:brightness(0) invert(1)`) para que
peguen sobre el fondo oscuro. Si llegan SVG monocromos en blanco, quitar ese filtro
en la regla `.inst-logo`.

El video del hero debe ir **sin audio, sin cortes y sin texto quemado**: es fondo,
no contenido. Cuando carga, el canvas generado se apaga solo para no gastar batería.

---

## Qué se corrigió respecto del sitio actual

**Jerarquía.** El sitio actual abre con cuatro logotipos compitiendo. Aquí abre
con la obra en exhibición: una sola marca arriba, los escudos institucionales en
el pie, donde el respaldo institucional se lee sin tapar el producto.

**Conversión.** El precio va en el botón desde el primer pixel, el CTA se repite
en cada sección relevante y en móvil hay una barra fija que nunca sale de
pantalla. Tarifas, horario, duración y cómo llegar están en una sola sección
escaneable en vez de en letra chica al pie.

**Lectura.** Medida de línea acotada a ~34 caracteres. El sitio actual pasa los
100 por línea, que es donde el ojo empieza a perder el renglón.

**Accesibilidad.** El museo ofrece funciones adaptadas para personas
neurodivergentes junto a la Fundación CpueD; aquí eso tiene sección propia en vez
de ser una nota al pie. Además el sitio hace lo mismo que el museo: respeta
`prefers-reduced-motion`, así que a quien pide menos estímulo se le entrega la
página quieta. Contraste alto en todo el cuerpo de texto, foco visible en
teclado, marcado semántico y `aria` en los controles.

**Rendimiento.** Un archivo, cero librerías, cero peticiones a terceros salvo la
tipografía —y esa se carga sin bloquear el primer pintado—. El fondo animado se
dibuja en un lienzo del 22 % del tamaño y se escala con blur, y se detiene solo
cuando el hero sale de pantalla. Si el JavaScript falla o tarda, el contenido
igual se ve: sólo se oculta para animar cuando el JS está confirmado.

**Idioma.** Conmutador ES/EN funcional. La obra viene de Londres, Barcelona y
Cannes; la prensa internacional entra por aquí.

**Metadatos.** `title`, `description`, Open Graph y `schema.org/Museum` con
dirección, teléfono y horarios, para que el enlace se vea bien al compartirse y
para que el museo aparezca correctamente en resultados de búsqueda.

---

## Informe de condición

Ver [`INFORME.md`](./INFORME.md) para hallazgos sobre el sitio actual.

---

## Lo que este prototipo **no** es

Es una página, no el sitio. Fuera de alcance por ahora, y por lo tanto materia de
una fase siguiente: cartelera con varias muestras, integración real con la
ticketera, gestor de contenidos para que el equipo publique sin tocar código,
traducción completa, formularios de colegios y visitas guiadas, analítica y
migración de contenido.

---

Anothen · 2026
