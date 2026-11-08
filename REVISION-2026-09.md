# Renovación de Torre Escribana — septiembre de 2026

Preparada para revisión. No se ha modificado la web pública ni se han subido los cambios a GitHub; Ángel hará la subida.

## Cambios acordados

- Excedentes retirado temporalmente de la portada. Qué hacemos adelantado y botones descriptivos.
- Página de voluntariado con WWOOF, Worldpackers y CES, sus enlaces y logos. Tres reseñas facilitadas por Ángel, con seudónimos y sin fotos personales; traducción indicada.
- Agenda con próximas actividades y archivo secundario en gris. Aviso cuando no hay fechas futuras. Tarjetas antiguas con Ver actividad. Fechas actualizadas con el día de Zaragoza.
- Reserva de visitas en Permacultura Aragón y descarga única del menú JPG. Scouts mantiene información práctica bajo consulta.
- Quiénes somos: texto aprobado sobre Irene, Ángel, la familia y la historia del proyecto.
- Página Permacultura con éticas, principios y CTA a visitas.
- Nueve fichas nuevas con contenido genérico, fotos de la finca y CTA; fichas anteriores conservadas.
- Contacto reordenado, con datos y cita previa al principio; Google Forms conservado.
- Se mantienen papel, letra manuscrita, cabeceras grandes, efectos y bloque de inspiración acordados.

## Recursos y SEO

CSS servido una sola vez, con reglas de terceros reducidas a los componentes utilizados. JavaScript local para menú, agenda y movimiento. Imágenes WebP responsivas con dimensiones, alt y carga diferida; originales conservados, incluida la descarga del menú. Textura sin pérdida. Fuentes WOFF2 locales e iconos reducidos.

Un H1 por página, jerarquía coherente, descripciones, canónicas, metadatos sociales, robots y sitemap. Configuración noindex independiente para la copia de revisión. Navegación interna dentro de la copia que se está viendo.

## Comprobaciones

Jekyll compila correctamente. Verificadas 40 páginas sin errores de referencias locales, alt, dimensiones, H1, jerarquía, descripciones o canónicas. Se conservan todas las rutas del sitio anterior y se añade /voluntariado/. La agenda contiene cinco actividades archivadas y ninguna futura. JavaScript comprobado con node --check. Reseñas contrastadas con las capturas.

CSS completo servido: aproximadamente 55 KB, sin compresión HTTP. Los tamaños de archivos no equivalen a una medición de velocidad o tráfico real del navegador.

No se ha enviado ningún formulario. La revisión visual de escritorio y móvil se está comprobando por separado; este documento no certifica compatibilidad exhaustiva entre navegadores.

## Corrección de cabeceras — 8 de noviembre de 2026

La reducción del CSS había eliminado las reglas de las clases dinámicas page-heading, post-heading, page-subheading y post-subheading. Se conservan expresamente al generar los estilos y se añade una comprobación para impedir una generación sin esas clases.

Restaurados los colores, sombras, alineación, tamaños y espacios originales de las cabeceras, incluidas sus reglas para distintas anchuras. Las cabeceras con fotografía recuperan el texto blanco; las que tienen fondo claro mantienen el texto oscuro. Los artículos conservan su alineación original.

Comprobado que las 39 páginas con cabecera comparten el CSS corregido. Revisión visual y de estilos calculados en navegador de escritorio: Visitas, Voluntariado, Agenda y el artículo sobre bosque comestible. La revisión visual en móvil sigue pendiente. La copia privada y este paquete contienen la misma corrección. No se ha modificado GitHub ni la web pública.

## Recuperación

Repositorio: https://github.com/PermaculturaAragon/Web-TorreEscribana

Punto anterior: f7c5754d9f2965fc5bff6768eacc5b515caae566.

Rama local de trabajo: codex/renovacion-torre-escribana. Rama de recuperación: backup/antes-renovacion-2026-09-17.

El paquete descargable contiene solo archivos añadidos o modificados. No es necesario borrar ningún archivo existente. Antes de integrar en main, revisar diferencias si la web ha cambiado desde el punto anterior. Para deshacer una futura publicación, revertir los commits de la renovación y desplegar de nuevo; no forzar ni borrar la historia.

## Mantenimiento

La web continúa usando Jekyll y el flujo de GitHub Pages existente. Los recursos preparados se incluyen en el paquete: no es necesario ejecutar Node o Python para publicar. Para futuras regeneraciones se incluyen scripts de imágenes (Pillow), fuentes (fonttools y Brotli) y estilos (npm ci; npm run styles). Se conservan fuentes originales y licencias.

Construcción pública: bundle exec jekyll build.

Construcción de prueba: bundle exec jekyll build --config _config.yml,_config.preview.yml.
