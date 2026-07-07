import fs from "fs";
import path from "path";
import "server-only";
import sizeOf from "image-size";
import { services } from "./content";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;

const GALLERY_CATEGORIES = [
  "Cupboards",
  "Kitchen",
  "Windows",
  "Nets",
  "Interior Works",
];

const SERVICE_CATEGORY_MAP = {
  "pvc-cupboards": "Cupboards",
  "upvc-kitchen": "Kitchen",
  "aluminium-windows": "Windows",
  "mosquito-nets": "Nets",
  "custom-interior": "Interior Works",
};

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
  const pool = [...scanned];
  const heroImage = pool.shift() ?? null;

  const serviceImages = {};
  for (const service of services) {
    const image = pool.shift() ?? null;
    serviceImages[service.id] = image
      ? {
          ...image,
          alt: buildAltText(
            SERVICE_CATEGORY_MAP[service.id],
            service.title,
          ),
        }
      : null;
  }

  const aboutImages = takeImages(pool, 4).map((image, index) => ({
    ...image,
    alt: buildAltText("Interior Works", `About showcase ${index + 1}`),
  }));

  const testimonialAccentImages = takeImages(pool, 4).map((image, index) => ({
    ...image,
    alt: buildAltText("Interior Works", `Testimonial accent ${index + 1}`),
  }));

  // TODO: recategorize — generic filenames are assigned round-robin below.
  const galleryImages = pool.map((image, index) => {
    const category = GALLERY_CATEGORIES[index % GALLERY_CATEGORIES.length];
    return {
      id: `gallery-${index + 1}`,
      src: image.src,
      width: image.width,
      height: image.height,
      alt: buildAltText(category, `${category} installation`),
      category,
    };
  });

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
