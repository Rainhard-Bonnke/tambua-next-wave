const fs = require('fs');

const images = [
  "/images/beautiful-shot-three-cute-giraffes-field-with-trees-blue-sky.jpg",
  "/images/pexels-maasai-magic-3752887-5574091.jpg",
  "/images/ancient-ceramic-pots-found-ruins-building-pompeii-italy.jpg",
  "/images/pile-stones-with-city-background.jpg",
  "/images/pexels-abelalemseged-17272121.jpg",
  "/images/pexels-alexandra-karnasopoulos-1962842-4017572.jpg",
  "/images/pexels-andname-5536965.jpg",
  "/images/pexels-joaoaguiar-7731450.jpg",
  "/images/pexels-kureng-workx-2546437-4314681.jpg",
  "/images/pexels-kureng-workx-2546437-7637401.jpg",
  "/images/pexels-lan-yao-324969-20879645.jpg",
  "/images/pexels-marri-shyam-366418-7463697.jpg",
  "/images/pexels-ross-green-2159326053-36048575.jpg",
  "/images/pexels-sulimansallehi-1586662.jpg",
  "/images/pexels-taryn-elliott-5214036.jpg"
];

const replaceImages = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let imgIndex = 0;
  content = content.replace(/image:\s*["']https:\/\/images\.unsplash\.com[^"']*["']/g, () => {
    const replacement = `image: "${images[imgIndex % images.length]}"`;
    imgIndex++;
    return replacement;
  });
  fs.writeFileSync(filePath, content);
  console.log(`Replaced images in ${filePath}`);
};

replaceImages('./src/data/safaris.ts');
replaceImages('./src/data/destinations.ts');
