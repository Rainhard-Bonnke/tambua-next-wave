import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const images = [
  { src: 'Wildbeast Migration 1.jpg', dest: 'wildbeast-migration-1.webp' },
  { src: 'Wild beast migration 2.jpg', dest: 'wildbeast-migration-2.webp' },
  { src: 'Wildbeast migration 3.jpg', dest: 'wildbeast-migration-3.webp' }
];

async function compress() {
  console.log("Starting WebP compression...");
  for (const img of images) {
    const srcPath = path.join(imagesDir, img.src);
    const destPath = path.join(imagesDir, img.dest);
    
    if (fs.existsSync(srcPath)) {
      try {
        await sharp(srcPath)
          .webp({ quality: 80 })
          .toFile(destPath);
        console.log(`Successfully compressed: ${img.src} -> ${img.dest}`);
      } catch (err) {
        console.error(`Error compressing ${img.src}:`, err);
      }
    } else {
      console.error(`File not found: ${srcPath}`);
    }
  }
}

compress();
