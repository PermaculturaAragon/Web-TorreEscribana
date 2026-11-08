import fs from 'node:fs';
import { Liquid } from 'liquidjs';
import yaml from 'js-yaml';
import { PurgeCSS } from 'purgecss';
import { minify } from 'csso';
const config = yaml.load(fs.readFileSync('_config.yml', 'utf8'));
const engine = new Liquid();
engine.registerFilter('relative_url', value => (config.baseurl || '') + value);
engine.registerFilter('absolute_url', value => config.url + (config.baseurl || '') + value);
const images = JSON.parse(fs.readFileSync('_data/image_assets.json', 'utf8'));
const content = ['*.{md,html,yml}', '_includes/*.html', '_layouts/*.html', '_agenda/*.md', '_disenos/*.md', '_posts/*.{md,markdown}', 'assets/js/site.js'];
// header.html genera estas clases con {{ include.type }}: no aparecen completas
// en las plantillas que examina PurgeCSS. Conservar sus reglas y media queries.
const headerClasses = ['page-heading', 'post-heading', 'page-subheading', 'post-subheading'];
const safelist = {standard: [...headerClasses, /^show$/, /^collapse$/, /^collapsing$/, /^top-nav/, /^past-event$/, /^letralogo$/, /^marca-escribana$/, /^navbar-/, /^sr-only$/, /^highlight$/, /^language-/, /^lineno$/]};
let custom = await engine.parseAndRender(fs.readFileSync('assets/css/torre-escribana.css', 'utf8').replace(/^---\n[\s\S]*?\n---\n/, ''), {site: config});
custom = custom.replace(/url\(['"]?([^'"\)]+)['"]?\)/g, (original, value) => {
  const local = value.replace(config.url, '').replace(/^\.\.\/img\//, '/assets/img/');
  return images[local] ? `url("${(config.baseurl || '') + images[local].variants.at(-1).url}")` : original;
});
const fa = fs.readFileSync('assets/vendor/fontawesome.css', 'utf8').replace(/@font-face\s*\{[^}]*\}/g, '');
const faces = `@font-face{font-family:"Font Awesome 5 Free";font-style:normal;font-weight:900;font-display:swap;src:url('../fonts/fa-solid-subset.woff2') format('woff2')}@font-face{font-family:"Font Awesome 5 Brands";font-style:normal;font-weight:400;font-display:swap;src:url('../fonts/fa-brands-subset.woff2') format('woff2')}`;
for (const [name, css] of [['vendor', fs.readFileSync('assets/vendor/bootstrap.css', 'utf8') + fa + faces], ['torre-escribana', custom]]) {
  const [{css: used}] = await new PurgeCSS().purge({content, css: [{raw: css}], safelist});
  const output = minify(used).css;
  if (name === 'torre-escribana' && headerClasses.some(className => !output.includes(`.${className}`))) {
    throw new Error('Faltan estilos de cabecera; se cancela la generación para conservar el CSS anterior.');
  }
  fs.writeFileSync(`assets/css/${name}.min.css`, '/*! Torre Escribana; licencias: assets/css/LICENSES.txt */\n' + output + '\n');
  console.log(`${name}: ${Buffer.byteLength(css)} → ${Buffer.byteLength(output)} bytes`);
}
