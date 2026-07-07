"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Card from "./Card";
import FadeIn from "./FadeIn";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import ServiceIcon from "./ServiceIcon";

export default function ServicesOverview({ services }) {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Our Services"
        title="Crafted PVC & UPVC Solutions"
        description="From modular kitchens to custom storage and window systems, every project is built for durability, style, and everyday comfort."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <FadeIn key={service.id} delay={index * 0.08}>
            <Card hover className="group h-full overflow-hidden">
              {service.image ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={service.image.width}
                    height={service.image.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-accent-soft to-border-light">
                  <ServiceIcon
                    name={service.icon}
                    className="h-12 w-12 text-accent"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-4 inline-flex rounded-xl bg-accent-soft p-3 text-accent">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {service.shortDescription}
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
