import { createMetadata } from "@/lib/metadata";
import {
  galleryCategories,
  galleryImages,
  getGalleryCategoryCounts,
} from "@/lib/images.server";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = createMetadata({
  title: "Gallery",
  description:
    "Browse RF Interior Spot project photos — PVC cupboards, UPVC kitchens, aluminium windows, mosquito nets, and custom interior works in Chennai.",
  path: "/gallery",
});

export default function GalleryPage() {
  const categoryCounts = getGalleryCategoryCounts();

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Recent Project Showcase"
        description="A curated look at completed PVC and UPVC interior work across Chennai homes — filter by category to explore specific project types."
      />

      <Section>
        <SectionHeading
          title="Explore by Category"
          description="Images are auto-assigned from filenames for now — update categories in lib/content.js as needed."
        />
        <GalleryGrid images={galleryImages} categories={galleryCategories} />

        {Object.keys(categoryCounts).length > 0 ? (
          <p className="mt-12 text-center text-sm text-muted-light">
            Current gallery distribution:{" "}
            {Object.entries(categoryCounts)
              .map(([category, count]) => `${category} (${count})`)
              .join(" · ")}
          </p>
        ) : null}
      </Section>
    </>
  );
}
