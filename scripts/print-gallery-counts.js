const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;
const GALLERY_CATEGORIES = [
  "Cupboards",
  "Kitchen",
  "Windows",
  "Nets",
  "Interior Works",
];

const imagesDir = path.join(process.cwd(), "public", "images");
const files = fs.existsSync(imagesDir)
  ? fs
      .readdirSync(imagesDir)
      .filter((file) => IMAGE_EXTENSIONS.test(file))
      .sort()
  : [];

// Distribution: 1 hero + 5 services + 4 about + 4 testimonials = 14 reserved
const galleryPool = files.slice(14);
const galleryImages = galleryPool.map((_, index) => ({
  category: GALLERY_CATEGORIES[index % GALLERY_CATEGORIES.length],
}));

const counts = galleryImages.reduce((acc, image) => {
  acc[image.category] = (acc[image.category] ?? 0) + 1;
  return acc;
}, {});

console.log("\nRF Interior Spot — Gallery Category Counts\n");
console.log(`Total scanned images: ${files.length}`);
console.log(`Total gallery images: ${galleryImages.length}\n`);

if (Object.keys(counts).length === 0) {
  console.log("No images found in public/images/");
  console.log("Add your project photos and re-run: npm run gallery:counts\n");
} else {
  Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
  console.log("\n// TODO: recategorize misassigned images in lib/images.server.js\n");
}
