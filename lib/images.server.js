import fs from "fs";
import path from "path";
import "server-only";
import sizeOf from "image-size";
import { services } from "./content";
import { GALLERY_CATEGORIES, classifyImages } from "./image-categorization";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;

const SERVICE_CATEGORY_MAP = {
  "pvc-cupboards": "Cupboards",
  "upvc-kitchen": "Kitchen",
  "aluminium-windows": "Windows",
  "mosquito-nets": "Nets",
  "custom-interior": "Interior Works",
};

// No remote fallbacks: use only local images from public/images for gallery and services

function buildAltText(category, title) {
  return `RF Interior Spot – ${title || category} project in Chennai`;
}

export function scanImageFiles() {
  const imagesDir = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  return fs
    .readdirSync(imagesDir)
    .filter((file) => IMAGE_EXTENSIONS.test(file))
    .map((filename) => {
      const filePath = path.join(imagesDir, filename);
      const stats = fs.statSync(filePath);
      let width = 1200;
      let height = 800;

      try {
        const dimensions = sizeOf(filePath);
        width = dimensions.width ?? width;
        height = dimensions.height ?? height;
      } catch {
        // Fall back to default aspect ratio when dimensions cannot be read.
      }

      return {
        filename,
        src: `/images/${filename}`,
        width,
        height,
        bytes: stats.size,
      };
    })
    .sort((a, b) => {
      const pixelArea = b.width * b.height - a.width * a.height;
      if (pixelArea !== 0) return pixelArea;
      return b.bytes - a.bytes;
    });
}

function takeImages(pool, count) {
  return pool.splice(0, Math.min(count, pool.length));
}

function distributeImages(scanned) {
  // Classify all scanned images but do not remove items when picking
  const allImages = classifyImages(scanned);

  const heroImage = allImages[0] ?? null;

  // Pick a representative image for each service by category (do not remove it)
  const serviceImages = {};
  for (const service of services) {
    const desiredCategory = SERVICE_CATEGORY_MAP[service.id];
    const image = allImages.find((img) => img.category === desiredCategory) ?? null;

    serviceImages[service.id] = image
      ? {
          ...image,
          alt: buildAltText(desiredCategory, service.title),
        }
      : null;
  }

  // About images: take up to 4 images preferring "Interior Works" then any
  const interiorImages = allImages.filter((img) => img.category === "Interior Works");
  const aboutImages = (interiorImages.length > 0 ? interiorImages : allImages)
    .slice(0, 4)
    .map((image, index) => ({
      ...image,
      alt: buildAltText("Interior Works", `About showcase ${index + 1}`),
    }));

  // Testimonial accent images: reuse first 4 images as accents
  const testimonialAccentImages = allImages.slice(0, 4).map((image, index) => ({
    ...image,
    alt: buildAltText("Interior Works", `Testimonial accent ${index + 1}`),
  }));

  // Gallery should include all local images with stable ids
  const galleryImages = allImages.map((image, index) => ({
    id: `gallery-${index + 1}`,
    src: image.src,
    width: image.width,
    height: image.height,
    alt: buildAltText(image.category, `${image.category} installation`),
    category: image.category,
  }));

  return {
    heroImage: heroImage
      ? {
          ...heroImage,
          alt: buildAltText("Interior Works", "Featured project hero"),
        }
      : null,
    serviceImages,
    aboutImages,
    testimonialAccentImages,
    galleryImages,
  };
}

const imageDistribution = distributeImages(scanImageFiles());

export const heroImage = imageDistribution.heroImage;
export const serviceImages = imageDistribution.serviceImages;
export const aboutImages = imageDistribution.aboutImages;
export const testimonialAccentImages = imageDistribution.testimonialAccentImages;
export const galleryImages = imageDistribution.galleryImages;

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryImages.map((image) => image.category))),
];

export const ogImage = heroImage?.src ?? "/images/img1.jpg";

export function getGalleryCategoryCounts() {
  return galleryImages.reduce((counts, image) => {
    counts[image.category] = (counts[image.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function getServicesWithImages() {
  return services.map((service) => ({
    ...service,
    image: serviceImages[service.id],
  }));
}
