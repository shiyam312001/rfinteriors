"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Card from "./Card";
import FadeIn from "./FadeIn";

export default function GalleryGrid({ images = [], categories = ["All"] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((image) => image.category === activeCategory);
  }, [activeCategory, images]);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeCategory === category
                ? "bg-accent text-white shadow-soft"
                : "border border-border bg-surface text-muted hover:border-accent/30 hover:bg-accent-soft hover:text-charcoal"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredImages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted shadow-soft">
          No gallery images found yet. Add project photos to{" "}
          <code className="rounded-md bg-background px-2 py-0.5 text-sm text-charcoal">
            public/images/
          </code>{" "}
          and rebuild.
        </p>
      ) : (
        <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
          {filteredImages.map((image, index) => (
            <FadeIn key={image.id} delay={(index % 6) * 0.05}>
              <Card hover className="mb-6 break-inside-avoid overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="px-5 py-3.5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    {image.category}
                  </span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      )}
    </>
  );
}
