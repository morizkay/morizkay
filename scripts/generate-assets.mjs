import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Deterministic brand artwork, generated locally; no external image service.
const socialCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f7f8f2"/>
<defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1" fill="#ced8c8"/></pattern></defs>
<rect x="750" width="450" height="630" fill="url(#dots)"/>
<circle cx="1000" cy="310" r="220" fill="none" stroke="#dce1d5"/>
<circle cx="1000" cy="310" r="170" fill="none" stroke="#dce1d5"/>
<rect x="70" y="60" width="50" height="50" rx="15" fill="#253e2f"/>
<text x="83" y="95" fill="#d7edb5" font-family="DejaVu Sans, sans-serif" font-size="36" font-weight="bold">m</text>
<text x="137" y="95" fill="#253e2f" font-family="DejaVu Sans, sans-serif" font-size="28" font-weight="bold">morizkay.</text>
<text x="70" y="192" fill="#52664b" font-family="DejaVu Sans Mono, monospace" font-size="17" letter-spacing="2">SOFTWARE DEVELOPER / INDONESIA</text>
<text x="65" y="298" fill="#252e28" font-family="DejaVu Sans, sans-serif" font-size="79" font-weight="bold" letter-spacing="-4">I build tools that</text>
<text x="65" y="395" fill="#252e28" font-family="DejaVu Sans, sans-serif" font-size="79" font-weight="bold" letter-spacing="-4">make work</text>
<text x="548" y="395" fill="#3e6246" font-family="DejaVu Serif, serif" font-size="91" font-style="italic" letter-spacing="-5">flow.</text>
<path d="M550 412Q640 397 739 410" stroke="#799165" stroke-width="2" fill="none"/>
<text x="70" y="470" fill="#626b62" font-family="DejaVu Sans, sans-serif" font-size="24">Developer tools. Thoughtful interfaces. A little curiosity.</text>
<path d="M70 520H1130" stroke="#dce1d5"/>
<text x="70" y="568" fill="#252e28" font-family="DejaVu Sans, sans-serif" font-size="20">Moh. Rizky Kay</text>
<text x="1130" y="568" text-anchor="end" fill="#52664b" font-family="DejaVu Sans Mono, monospace" font-size="18">morizkay.com / rizky.id</text>
<g transform="translate(915 225) rotate(8)"><rect width="160" height="160" rx="42" fill="#253e2f"/><path d="M31 113V56h20v8c9-14 28-14 37 0 11-14 40-14 40 12v37h-20V82c0-14-17-14-17 0v31H71V82c0-14-20-14-20 0v31Z" fill="#d7edb5"/><circle cx="142" cy="108" r="9" fill="#d7edb5"/></g>
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
