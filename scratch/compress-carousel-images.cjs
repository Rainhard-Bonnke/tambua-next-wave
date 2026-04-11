const sharp = require('sharp');
const path = require('path');

const files = [
  'public/images/popular activities/culture tours.jpg',
  'public/images/popular activities/culture tours (2).jpg',
  'public/images/popular activities/game drives.jpg',
  'public/images/popular activities/game drives1.jpg',
];

async function convert(file) {
  const out = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.webp');
  try {
    await sharp(file)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toFile(out);
    console.log('✅ Converted', file, '->', out);
  } catch (err) {
    console.error('❌ Failed', file, err.message);
  }
}

(async () => {
  for (const file of files) {
    await convert(file);
  }
})();
