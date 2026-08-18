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

### Poner las imágenes reales

Hay dos huecos preparados. Si el archivo no existe, cae con gracia a un degradado
que se ve intencional, así que se puede mostrar tal cual:

| Archivo            | Dónde aparece        | Proporción sugerida |
|--------------------|----------------------|---------------------|
| `img/ceiba.jpg`    | Sección de la muestra| vertical 4:5        |
| `img/casona.jpg`   | Sección del museo    | horizontal 16:10    |

El hero usa un campo generado por canvas, no una imagen. Si más adelante hay
video del museo, reemplaza el `<canvas id="field">` por un `<video>` con
`muted playsinline loop` y un póster.

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

## Hallazgos sobre el sitio actual

No pude cargar `mui.cl` directamente desde el entorno donde trabajé (bloqueo de
red), así que esto sale de lo que está **indexado públicamente**. Cada punto hay
que confirmarlo en vivo antes de mostrarlo en una reunión, pero todos son
verificables en un minuto.

1. **La marca en los títulos quedó en la etapa anterior.** Las páginas indexadas
   se titulan «Museo Interactivo Las Condes». El museo se relanzó como
   **Inmersivo**. Cada resultado de búsqueda y cada enlace compartido usa el
   nombre viejo.
2. **Sigue publicado contenido de la etapa anterior.** La sección «Conoce el MUI»
   describe un museo educativo para niños y jóvenes sobre historia y ciencia. Ese
   museo ya no existe.
3. **Hay un entorno de desarrollo público e indexable** (`www-desarrollo.mui.cl`),
   compitiendo con el sitio real en resultados de búsqueda.
4. **La página de compra aparece indexada bajo `http://`**, sin cifrar. Es
   justamente la página de la que depende la venta.
5. **Los horarios se contradicen.** El pie de la portada dice 10:00 a 20:00; el
   resto del sitio y la prensa dicen 10:00–14:00 y 15:00–19:00.
6. **La venta ocurre fuera del dominio**, en el sitio de la Corporación. El museo
   no puede medir su propio embudo ni saber dónde pierde compradores.
7. **No hay versión en inglés.**
8. **El contacto está repartido** entre `contacto@mui.cl` y `ventas@mui.cl` sin
   un criterio visible para el visitante.

El argumento de negocio: con 65 personas por función, 50 minutos de recorrido y
apertura de martes a domingo, el sitio es el embudo de varios cientos de cupos
diarios. No es una pieza de diseño, es el mostrador.

---

## Lo que este prototipo **no** es

Es una página, no el sitio. Fuera de alcance por ahora, y por lo tanto materia de
una fase siguiente: cartelera con varias muestras, integración real con la
ticketera, gestor de contenidos para que el equipo publique sin tocar código,
traducción completa, formularios de colegios y visitas guiadas, analítica y
migración de contenido.

---

Anothen · 2026
