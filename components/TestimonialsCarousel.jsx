"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import Card from "./Card";
import FadeIn from "./FadeIn";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function TestimonialsCarousel({ accentImages = [] }) {
  const [index, setIndex] = useState(0);
  const featured = testimonials.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const current = featured[index];

  return (
    <Section id="testimonials" className="relative overflow-hidden">
      {accentImages[0] ? (
        <div className="pointer-events-none absolute -right-16 top-16 hidden h-56 w-56 overflow-hidden rounded-full opacity-10 blur-sm lg:block">
          <Image
            src={accentImages[0].src}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <SectionHeading
        eyebrow="Client Stories"
        title="What Homeowners Say"
        description="Real feedback themes from our Google reviews — professionalism, punctuality, creative design, and strong value."
      />

      <FadeIn>
        <Card className="relative mx-auto max-w-4xl overflow-hidden p-8 md:p-12">
          {accentImages[1] ? (
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 overflow-hidden rounded-2xl opacity-10">
              <Image
                src={accentImages[1].src}
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
          ) : null}

          <div className="relative z-10">
            <Quote className="mb-4 h-8 w-8 text-accent/40" />
            <div className="mb-6 flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className={`h-5 w-5 ${
                    starIndex < current.rating
                      ? "fill-accent text-accent"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <blockquote className="font-heading text-2xl leading-relaxed text-charcoal md:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              {current.name}
            </p>
          </div>

          <div className="relative z-10 mt-10 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {featured.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show testimonial ${dotIndex + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    dotIndex === index
                      ? "w-8 bg-accent"
                      : "w-2 bg-border hover:bg-accent/40"
                  }`}
                  onClick={() => setIndex(dotIndex)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="rounded-xl border border-border bg-surface p-2.5 text-charcoal shadow-sm transition-all hover:border-accent/30 hover:bg-accent-soft hover:text-accent"
                onClick={() =>
                  setIndex(
                    (currentIndex) =>
                      (currentIndex - 1 + featured.length) % featured.length,
                  )
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="rounded-xl border border-border bg-surface p-2.5 text-charcoal shadow-sm transition-all hover:border-accent/30 hover:bg-accent-soft hover:text-accent"
                onClick={() =>
                  setIndex((currentIndex) => (currentIndex + 1) % featured.length)
                }
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Card>
      </FadeIn>
    </Section>
  );
}
