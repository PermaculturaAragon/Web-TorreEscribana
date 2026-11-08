#!/usr/bin/env python3
"""Prepara fuentes WOFF2. Requiere fonttools y Brotli."""
import re
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
ROOT = Path(__file__).resolve().parents[1]
fonts = ROOT / 'assets/fonts'
font = TTFont(fonts / 'EscribanaFont.otf')
font.flavor = 'woff2'
font.save(fonts / 'escribana.woff2')
font = TTFont(ROOT / 'assets/vendor/OpenSans.ttf')
selection = subset.Subsetter()
selection.populate(unicodes=list(range(0x20, 0x180)) + list(range(0x2000, 0x2070)) + [0x20ac])
selection.subset(font)
font.flavor = 'woff2'
font.save(fonts / 'open-sans-latin.woff2')
markup = '\n'.join(path.read_text() for pattern in ['*.md', '*.html', '_includes/*.html', '_layouts/*.html', '_agenda/*.md', '_disenos/*.md', '_posts/*.md', '_posts/*.markdown'] for path in ROOT.glob(pattern))
classes = set(re.findall(r'fa-[a-z0-9-]+', markup))
css = (ROOT / 'assets/vendor/fontawesome.css').read_text()
codes = [int(code, 16) for name, code in re.findall(r'\.(fa-[\w-]+):before\s*\{\s*content:\s*"\\([0-9a-f]+)"', css) if name in classes]
for name in ['solid', 'brands']:
    font = TTFont(fonts / f'fa-{name}.woff2')
    selection = subset.Subsetter()
    selection.populate(unicodes=codes)
    selection.subset(font)
    font.flavor = 'woff2'
    font.save(fonts / f'fa-{name}-subset.woff2')
print('Fuentes preparadas; iconos:', len(codes))
