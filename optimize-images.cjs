// optimize-images.cjs
// Run with: node optimize-images.cjs
// This script recursively compresses and converts images in public/images to WebP format using sharp.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

function isImage(file) {
  // Ignore already optimized webp and logo
  if (file.toLowerCase().includes('logo')) return false;
  return /\.(jpe?g|png)$/i.test(file);
}

async function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else if (isImage(file)) {
      await optimizeImage(filePath);
    }
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.substring(0, filePath.lastIndexOf(ext));
  const webpPath = base + '.webp';
  
  try {
    await sharp(filePath)
      .resize({ width: 1920, withoutEnlargement: true }) // Standard HD max width
      .webp({ quality: 75, effort: 6 }) // Balanced quality and compression
      .toFile(webpPath);
    
    // Success: Delete the original massive file
    fs.unlinkSync(filePath);
    console.log(`✅ Optimized & Replaced: ${path.relative(publicDir, filePath)} -> .webp`);
  } catch (err) {
    console.error(`❌ Error optimizing ${filePath}:`, err.message);
  }
}

console.log('🚀 Starting Recursive Image Optimization...');
walkDir(publicDir).then(() => {
  console.log('✨ Optimization Complete!');
}).catch(console.error);
