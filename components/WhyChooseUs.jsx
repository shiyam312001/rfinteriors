"use client";

import { whyChooseUs } from "@/lib/content";
import Card from "./Card";
import FadeIn from "./FadeIn";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import ServiceIcon from "./ServiceIcon";

export default function WhyChooseUs() {
  return (
    <Section background="muted">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Built on Trust, Finish & Timelines"
        description="Clients across Chennai choose RF Interior Spot for dependable delivery, thoughtful design, and interiors that feel premium without overspending."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {whyChooseUs.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.08}>
            <Card className="h-full p-6">
              <div className="mb-5 inline-flex rounded-xl bg-accent-soft p-3 text-accent">
                <ServiceIcon name={item.icon} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
