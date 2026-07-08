export const GALLERY_CATEGORIES = [
  "Cupboards",
  "Kitchen",
  "Windows",
  "Nets",
  "Interior Works",
];
// Only these filenames should be treated as Nets (case-insensitive)
// Accept common extensions for the explicit nets whitelist so filenames
// in public/images (jpg, jpeg, png) all match.
export const NET_ONLY_FILENAMES = [
  "mosquito-nets-1.png",
  "mosquito-nets-1.jpg",
  "mosquito-nets-1.jpeg",
  "nets2.png",
  "nets2.jpg",
  "nets2.jpeg",
];
const CATEGORY_KEYWORDS = {
  Cupboards: ["cupboard", "wardrobe", "cabinet", "closet", "storage"],
  Kitchen: ["kitchen", "modular", "counter", "sink", "hob", "cook"],
  Windows: ["window", "windows", "door", "aluminium", "glazing"],
  Nets: ["net", "mesh", "screen", "mosquito", "insect"],
  "Interior Works": [
    "interior",
    "panel",
    "partition",
    "wall",
    "ceiling",
    "tv",
    "design",
    "decor",
  ],
};

export function getImageCategory(filename, fallbackIndex = 0) {
  const normalizedName = (filename || "").toLowerCase();

  // If file is explicitly listed as a net image, return Nets
  if (NET_ONLY_FILENAMES.includes(normalizedName)) return "Nets";

  // Do not allow keyword-based matching for Nets — it is reserved for the
  // explicit filename whitelist above. Match other categories by keywords.
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === "Nets") continue;
    if (keywords.some((keyword) => normalizedName.includes(keyword))) {
      return category;
    }
  }

  // Ensure fallback never assigns the Nets category; Nets is reserved for the
  // explicit filename whitelist above.
  const nonNetCategories = GALLERY_CATEGORIES.filter((c) => c !== "Nets");
  return nonNetCategories[fallbackIndex % nonNetCategories.length];
}

export function classifyImages(images = []) {
  return images.map((image, index) => ({
    ...image,
    category: getImageCategory(image.filename, index),
  }));
}
