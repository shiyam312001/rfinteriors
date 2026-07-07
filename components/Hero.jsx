"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteInfo } from "@/lib/content";
import Button from "./Button";
import FadeIn from "./FadeIn";

const highlights = [
  "Free site visit & measurement",
  "Premium PVC & UPVC finishes",
  "On-time delivery across Chennai",
];

export default function Hero({ heroImage }) {
  return (
    <section className="relative overflow-hidden bg-surface pt-24 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-8 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28 lg:pt-12">
        <FadeIn className="order-2 lg:order-1">
          <p className="mb-5 inline-flex items-center rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Chennai&apos;s Trusted Interior Partner
          </p>
          <h1 className="max-w-xl font-heading text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {siteInfo.name}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            {siteInfo.tagline}
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm font-medium text-charcoal"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={siteInfo.whatsappUrl} external size="lg">
              Get Free Quote
            </Button>
            <Button href="/gallery" variant="outline" size="lg">
              View Work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/10 via-transparent to-accent-soft/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/80 shadow-soft-xl">
              {heroImage ? (
                <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-accent-soft via-surface to-border-light sm:aspect-[5/4]" />
              )}
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/80 bg-surface px-5 py-4 shadow-soft-lg md:block">
              <p className="text-2xl font-bold text-charcoal">4.8★</p>
              <p className="text-xs font-medium text-muted">
                Google Reviews
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
