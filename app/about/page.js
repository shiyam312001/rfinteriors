import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { siteInfo } from "@/lib/content";
import { aboutImages } from "@/lib/images.server";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about RF Interior Spot — Chennai-based specialists in PVC cupboards, UPVC kitchens, aluminium windows, and custom interior craftsmanship.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Craftsmanship You Can See in Every Finish"
        description="RF Interior Spot brings together practical design, reliable timelines, and premium PVC & UPVC workmanship for homes across Chennai."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built Around Real Homes, Real Timelines"
              description="What started as focused PVC and UPVC interior work in Manali has grown into a trusted name for modular kitchens, storage, windows, and custom detail work — always with an emphasis on clean finishing and honest pricing."
            />
            <div className="space-y-4 text-base leading-7 text-muted">
              <p>
                We work closely with homeowners from the first measurement visit
                through installation, keeping communication clear and the site
                organised. That approach has earned us repeat referrals and
                consistent praise for professionalism and on-time delivery.
              </p>
              <p>
                Whether you are upgrading a single room or planning a full interior
                package, our team treats every project with the same care — precise
                fittings, balanced proportions, and materials chosen to last in
                Chennai conditions.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {aboutImages.length > 0 ? (
                aboutImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={`overflow-hidden rounded-2xl border border-border/80 shadow-soft ${
                      index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="col-span-2 aspect-[16/10] rounded-2xl bg-gradient-to-br from-accent-soft to-border-light" />
                  <div className="aspect-square rounded-2xl bg-border-light" />
                  <div className="aspect-square rounded-2xl bg-accent-soft/60" />
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section background="muted">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Our Mission",
              copy: "Deliver premium-looking interiors through thoughtful PVC and UPVC solutions — without compromising on durability, service, or value.",
            },
            {
              title: "Our Approach",
              copy: "Measure accurately, design practically, and install with precision. We believe great interiors should feel effortless to live with every day.",
            },
            {
              title: "Our Promise",
              copy: "Transparent quotes, respectful site work, and finishes that hold up — backed by a team that stands behind every project we complete.",
            },
          ].map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-border/80 bg-surface p-8 shadow-soft">
                <h2 className="font-heading text-2xl font-semibold text-charcoal">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">{item.copy}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-14 text-center">
          <Button href={siteInfo.whatsappUrl} external size="lg">
            Start Your Project
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
