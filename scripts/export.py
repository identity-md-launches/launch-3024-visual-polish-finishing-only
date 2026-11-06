#!/usr/bin/env python3
"""Copy the dependency-free site to dist; no compilation or install is needed."""
from pathlib import Path
import hashlib
import shutil
import struct

ROOT = Path(__file__).resolve().parent.parent
FILES = ('index.html', 'favicon.svg', 'og.png', 'card.png')

def main():
    out = ROOT / 'dist'
    out.mkdir(exist_ok=True)
    for name in FILES:
        src = ROOT / name
        data = src.read_bytes()
        if name.endswith('.png'):
            assert data[:8] == b'\x89PNG\r\n\x1a\n', f'{name}: not a PNG'
        if name == 'og.png':
            assert struct.unpack('>II', data[16:24]) == (1200, 630), 'OG must be 1200 × 630'
        shutil.copyfile(src, out / name)
        assert (out / name).read_bytes() == data
        print(f'{name}: {len(data):,} bytes; sha256 {hashlib.sha256(data).hexdigest()}')
    size = sum((out / name).stat().st_size for name in FILES)
    print(f'Static production export: {size:,} bytes. Source and export match.')

if __name__ == '__main__':
    main()
