// replace-extensions.cjs
const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/data/safaris.ts',
  'src/data/destinations.ts',
  'src/data/destinations-lodges.ts',
  'src/components/home/HeroSection.tsx',
  'src/components/home/ActivitiesSection.tsx',
  'src/components/home/AboutPreview.tsx',
  'src/components/home/PartnersSection.tsx',
  'src/pages/Gallery.tsx',
  'src/pages/Index.tsx',
  'src/pages/TravelInfo.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace .jpg, .jpeg, .png with .webp when preceded by /images/
    const newContent = content.replace(/(\/images\/[^"']+)\.(jpe?g|png)/gi, '$1.webp');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Updated extensions in: ${file}`);
    }
  }
});
