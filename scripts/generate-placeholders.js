const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function createPlaceholder(filename, w, h, colors) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors[0]}"/>
        <stop offset="100%" style="stop-color:${colors[1]}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
  </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 80 })
    .toFile(path.join(__dirname, "..", "public", filename));
}

async function main() {
  const outDir = path.join(__dirname, "..", "public", "projects");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await createPlaceholder("hero-bg.jpg", 1920, 1080, ["#3A3A2E", "#1A1A14"]);
  await createPlaceholder("about-portrait.jpg", 600, 750, ["#D4C9B8", "#B8A898"]);
  await createPlaceholder("projects/visionloop.jpg", 1200, 675, ["#6B7B6A", "#4A5A49"]);
  await createPlaceholder("projects/photoloop.jpg", 1200, 675, ["#8B7D6B", "#6B5D4B"]);
  await createPlaceholder("projects/lumind.jpg", 1200, 675, ["#7A7A72", "#5A5A52"]);
  await createPlaceholder("projects/miguang.jpg", 1200, 675, ["#7B8B7A", "#5B6B5A"]);
  await createPlaceholder("projects/shanhai.jpg", 1200, 675, ["#6B7A8B", "#4B5A6B"]);
  
  console.log("✅ All placeholder images created!");
}

main().catch(console.error);
