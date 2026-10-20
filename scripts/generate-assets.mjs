import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Deterministic brand artwork, generated locally; no external image service.
// Fonts: Geist and Geist Mono must be installed (or exposed via FONTCONFIG_FILE) for an exact render.
const socialCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f5f4f0"/>
<rect x="80" y="80" width="18" height="18" rx="3" fill="#c2410c"/>
<text x="114" y="96" fill="#171715" font-family="Geist Mono" font-size="26">morizkay</text>
<text x="80" y="290" fill="#171715" font-family="Geist, sans-serif" font-size="68" font-weight="500" letter-spacing="-2.4">I’m Rizky, a software developer.</text>
<text x="80" y="372" fill="#6f6d66" font-family="Geist, sans-serif" font-size="68" font-weight="500" letter-spacing="-2.4">Developer tools, design systems,</text>
<text x="80" y="454" fill="#6f6d66" font-family="Geist, sans-serif" font-size="68" font-weight="500" letter-spacing="-2.4">and tooling for AI agents.</text>
<path d="M80 526H1120" stroke="#e2e0d8" stroke-width="2"/>
<text x="80" y="572" fill="#52514b" font-family="Geist Mono" font-size="22">Moh. Rizky Kay · Palu, Indonesia</text>
<text x="1120" y="572" text-anchor="end" fill="#52514b" font-family="Geist Mono" font-size="22">morizkay.com</text>
</svg>`;
await sharp(Buffer.from(socialCard)).png().toFile('public/social-card.png');
const png = await sharp('public/favicon.svg').resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, png]));
console.log('Generated social-card.png (1200×630) and favicon.ico (32×32).');
