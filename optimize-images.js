// optimize-images.js
// Run with: node optimize-images.js
// This script compresses and converts images in public/images to WebP format using sharp.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'images');

function isImage(file) {
  return /\.(jpe?g|png)$/i.test(file);
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.replace(ext, '');
  const webpPath = base + '.webp';
  await sharp(filePath)
    .resize({ width: 1600, withoutEnlargement: true }) // adjust max width as needed
    .webp({ quality: 80 })
    .toFile(webpPath);
  // Optionally, remove original file: fs.unlinkSync(filePath);
  console.log(`Optimized: ${filePath} -> ${webpPath}`);
}

fs.readdirSync(imagesDir).forEach(file => {
  if (isImage(file)) {
    const filePath = path.join(imagesDir, file);
    optimizeImage(filePath).catch(console.error);
  }
});
