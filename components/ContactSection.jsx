"use client";

import { MapPin, Phone } from "lucide-react";
import { siteInfo } from "@/lib/content";
import Button from "./Button";
import ContactForm from "./ContactForm";
import FadeIn from "./FadeIn";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function ContactSection() {
  return (
    <Section id="contact" background="surface">
      <SectionHeading
        eyebrow="Contact"
        title="Visit Our Workshop or Request a Quote"
        description="Based in Manali, Chennai — we serve homeowners across Greater Chennai with site visits, measurements, and end-to-end installation."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <FadeIn>
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-2xl border border-border/80 bg-background p-6 shadow-soft">
              <h3 className="font-heading text-xl font-semibold text-charcoal">
                Location & Hours
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-6 text-muted">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {siteInfo.address}
                </p>
                <p>{siteInfo.workingHours.weekdays}</p>
                <p>{siteInfo.workingHours.sunday}</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`tel:+91${siteInfo.phone}`} variant="outline">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
                <Button href={siteInfo.whatsappUrl} external>
                  WhatsApp Us
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/80 shadow-soft">
              <iframe
                title="RF Interior Spot location on Google Maps"
                src={siteInfo.mapEmbedUrl}
                className="h-72 w-full border-0 md:h-full md:min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
