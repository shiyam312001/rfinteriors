import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { testimonials } from "@/lib/content";
import { testimonialAccentImages } from "@/lib/images.server";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Card from "@/components/Card";

export const metadata = createMetadata({
  title: "Testimonials",
  description:
    "Read client feedback for RF Interior Spot — praised for professionalism, on-time delivery, creative design, and value for money in Chennai.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Trusted by Homeowners Across Chennai"
        description="A 4–5 star average on Google — with clients highlighting our professionalism, punctual delivery, design sense, and fair pricing."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05}>
              <Card className="relative h-full overflow-hidden p-8">
                {testimonialAccentImages[index % testimonialAccentImages.length] ? (
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 overflow-hidden rounded-full opacity-10">
                    <Image
                      src={
                        testimonialAccentImages[
                          index % testimonialAccentImages.length
                        ].src
                      }
                      alt=""
                      fill
                      className="object-cover"
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
                <div className="relative z-10">
                  <Quote className="mb-3 h-6 w-6 text-accent/40" />
                  <div className="mb-4 flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-4 w-4 ${
                          starIndex < item.rating
                            ? "fill-accent text-accent"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="font-heading text-xl leading-relaxed text-charcoal">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                    {item.name}
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
