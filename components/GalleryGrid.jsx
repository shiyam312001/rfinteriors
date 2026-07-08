// No "use client" — this is a plain Server Component.
// Filtering is done entirely with CSS (radio inputs + :has()),
// so there's zero client-side JS needed for it to work.

import Image from "next/image";
import Card from "./Card";

export const galleryCategories = [
  "All",
  "Cupboards",
  "Kitchen",
  "Windows",
  "Nets",
  "Interior Works",
];

export const MANUAL_ASSIGNMENTS = {
  // Cupboards
  "IMG-20260707-WA0011.jpg": "Cupboards",
  "IMG-20260707-WA0017.jpg": "Cupboards",
  "IMG-20260707-WA0018.jpg": "Cupboards",
  "IMG-20260707-WA0019.jpg": "Cupboards",
  "IMG-20260707-WA0020.jpg": "Cupboards",
  "IMG-20260707-WA0021.jpg": "Cupboards",
  "IMG-20260707-WA0022.jpg": "Cupboards",
  "IMG-20260707-WA0025.jpg": "Cupboards",
  "IMG-20260707-WA0026.jpg": "Cupboards",
  "IMG-20260707-WA0027.jpg": "Cupboards",
  "IMG-20260707-WA0028.jpg": "Cupboards",
  "IMG-20260707-WA0029.jpg": "Cupboards",
  "IMG-20260707-WA0033.jpg": "Cupboards",
  "IMG-20260707-WA0035.jpg": "Cupboards",
  "IMG-20260707-WA0039.jpg": "Cupboards",
  "IMG-20260707-WA0040.jpg": "Cupboards",
  "IMG-20260707-WA0042.jpg": "Cupboards",

  // Kitchen
  "IMG-20260707-WA0024.jpg": "Kitchen",
  "IMG-20260707-WA0034.jpg": "Kitchen",
  "IMG-20260707-WA0041.jpg": "Kitchen",
  "IMG-20260707-WA0044.jpg": "Kitchen",
  "IMG-20260707-WA0046.jpg": "Kitchen",
  "IMG-20260707-WA0047.jpg": "Kitchen",

  // Windows
  "IMG-20260707-WA0014.jpg": "Windows",

  // Nets
  "mosquito-nets-1.jpg": "Nets",
  "nets2.jpg": "Nets",

  // Interior Works (bare rooms, TV units, wall/floor finishing)
  "IMG-20260707-WA0012.jpg": "Interior Works",
  "IMG-20260707-WA0032.jpg": "Interior Works",
  "IMG-20260707-WA0036.jpg": "Interior Works",
  "IMG-20260707-WA0037.jpg": "Interior Works",
  "IMG-20260707-WA0038.jpg": "Interior Works",
  "IMG-20260707-WA0043.jpg": "Interior Works",
  "IMG-20260707-WA0045.jpg": "Interior Works",
};

// Turn a category name into a safe id/class token, e.g. "Interior Works" -> "interior-works"
function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// Pull the filename off the end of a src path, e.g. "/images/gallery/IMG-...WA0011.jpg" -> "IMG-...WA0011.jpg"
function getFilename(src = "") {
  return src.split("/").pop();
}

// Resolve the category for an image: explicit image.category wins, otherwise
// fall back to MANUAL_ASSIGNMENTS keyed by filename, otherwise "Interior Works".
function resolveCategory(image) {
  if (image.category) return image.category;
  const filename = getFilename(image.src);
  return MANUAL_ASSIGNMENTS[filename] || "Interior Works";
}

export default function GalleryGrid({ images = [], categories = galleryCategories }) {
  // Resolve categories once, statically, at render time.
  const resolvedImages = images.map((image) => ({
    ...image,
    category: resolveCategory(image),
  }));

  // Build the CSS rules for each category once, statically.
  // Default state = "All" checked -> only the first 8 shown (see allLimitCss below).
  const filterCss = categories
    .filter((c) => c !== "All")
    .map((category) => {
      const slug = slugify(category);
      return `
        .gallery-filter:has(#cat-${slug}:checked) .gallery-item:not([data-category="${category}"]) {
          display: none;
        }
      `;
    })
    .join("\n");

  // When "All" is selected, cap the visible tiles at 8 (individual category
  // views still show every matching image).
  const ALL_LIMIT = 9;
  const allLimitCss = `
    .gallery-filter:has(#cat-all:checked) .gallery-item:nth-child(n + ${ALL_LIMIT + 1}) {
      display: none;
    }
  `;

  return (
    <div className="gallery-filter">
      <style>{filterCss}</style>
      <style>{allLimitCss}</style>

      {/* Radio inputs live inside their labels: this makes native click-to-select
          work unambiguously, and lets has-[:checked] on the label actually match
          (a label can only :has() its own descendants, not a preceding sibling). */}
      <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-14">
        <label
          htmlFor="cat-all"
          className="cursor-pointer rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-soft hover:text-charcoal has-[:checked]:border-transparent has-[:checked]:bg-accent has-[:checked]:text-white has-[:checked]:shadow-soft"
        >
          <input
            type="radio"
            name="gallery-category"
            id="cat-all"
            defaultChecked
            className="sr-only"
          />
          All
        </label>
        {categories
          .filter((c) => c !== "All")
          .map((category) => (
            <label
              key={category}
              htmlFor={`cat-${slugify(category)}`}
              className="cursor-pointer rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-soft hover:text-charcoal has-[:checked]:border-transparent has-[:checked]:bg-accent has-[:checked]:text-white has-[:checked]:shadow-soft"
            >
              <input
                type="radio"
                name="gallery-category"
                id={`cat-${slugify(category)}`}
                className="sr-only"
              />
              {category}
            </label>
          ))}
      </div>

      {resolvedImages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted shadow-soft">
          No gallery images found yet. Add project photos to{" "}
          <code className="rounded-md bg-background px-2 py-0.5 text-sm text-charcoal">
            public/images/
          </code>{" "}
          and rebuild.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-8">
          {resolvedImages.map((image) => (
            // data-category lives on a plain div so it's guaranteed to hit the DOM,
            // regardless of whether Card forwards unknown props.
            <div
              key={image.id}
              data-category={image.category}
              className="gallery-item h-full"
            >
              <Card hover className="flex h-full flex-col overflow-hidden">
                {/* Fixed aspect ratio keeps every tile the same size, so the
                    grid rows line up instead of the ragged masonry look. */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-5 py-4">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    {image.category}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}