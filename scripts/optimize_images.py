#!/usr/bin/env python3
"""Genera variantes WebP. Requiere Pillow; conserva originales y descargas."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/img/optimized'
OUT.mkdir(exist_ok=True)
manifest = {}
patterns = ['*.md', '*.html', '_config.yml', '_includes/*.html', '_layouts/*.html', '_disenos/*.md', '_agenda/*.md', '_posts/*.md', '_posts/*.markdown', 'assets/css/torre-escribana.css']
markup = '\n'.join(path.read_text() for pattern in patterns for path in ROOT.glob(pattern))
source_bytes = output_bytes = 0
for path in sorted((ROOT / 'assets/img').rglob('*')):
    if path.suffix.lower() not in {'.jpg', '.jpeg', '.png'} or OUT in path.parents:
        continue
    relative = '/' + path.relative_to(ROOT).as_posix()
    if relative.lstrip('/') not in markup and path.name != 'fondo.jpg':
        continue
    with Image.open(path) as opened:
        photo = ImageOps.exif_transpose(opened)
        if photo.mode not in ('RGB', 'RGBA'):
            photo = photo.convert('RGBA' if 'transparency' in photo.info else 'RGB')
        width, height = photo.size
        digest = hashlib.sha256(path.read_bytes()).hexdigest()[:16]
        texture = path.name == 'fondo.jpg'
        sizes = [width] if texture else sorted({min(width, size) for size in (480, 960, 1600, 1920)})
        variants = []
        for size in sizes:
            target = OUT / f'{digest}-{size}.webp'
            if not target.exists():
                photo.resize((size, round(height * size / width)), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=84, method=6, lossless=texture)
            variants.append({'width': size, 'url': '/' + target.relative_to(ROOT).as_posix()})
        manifest[relative] = {'width': width, 'height': height, 'variants': variants}
        source_bytes += path.stat().st_size
        output_bytes += (ROOT / variants[-1]['url'].lstrip('/')).stat().st_size
referenced = {variant['url'] for item in manifest.values() for variant in item['variants']}
for generated in OUT.glob('*.webp'):
    if '/' + generated.relative_to(ROOT).as_posix() not in referenced:
        generated.unlink()
(ROOT / '_data').mkdir(exist_ok=True)
(ROOT / '_data/image_assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'{len(manifest)} imágenes; originales {source_bytes:,} B; variantes grandes {output_bytes:,} B')
