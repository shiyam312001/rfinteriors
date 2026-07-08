import fs from "fs";
import path from "path";
import { MANUAL_ASSIGNMENTS } from "./manualAssignments.js";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;

const imagesDir = path.join(process.cwd(), "public", "images");
const files = fs.existsSync(imagesDir)
  ? fs.readdirSync(imagesDir).filter((f) => IMAGE_EXTENSIONS.test(f)).sort()
  : [];

export const galleryCategories = [
  "All",
  "Cupboards",
  "Kitchen",
  "Windows",
  "Nets",
  "Interior Works",
];

export const galleryImages = files.map((filename, index) => ({
  id: `gallery-${index + 1}`,
  filename,
  src: `/images/${filename}`,
  width: 1200,
  height: 800,
  alt: filename,
  // Default category is All; edit this file to assign specific categories manually.
  category: MANUAL_ASSIGNMENTS[filename] ?? "All",
}));

export default { galleryCategories, galleryImages };
