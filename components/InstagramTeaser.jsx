"use client";

import { siteInfo } from "@/lib/content";
import Button from "./Button";
import InstagramIcon from "./InstagramIcon";
import FadeIn from "./FadeIn";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function InstagramTeaser() {
  return (
    <Section background="accent">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-accent/10 bg-surface p-8 text-center shadow-soft-lg md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-soft blur-3xl" />
          <div className="relative">
            <SectionHeading
              eyebrow="Follow Our Work"
              title="See Latest Projects on Instagram"
              description="Browse recent PVC cupboards, modular kitchens, window installations, and custom interior finishes from our Chennai workshop."
            />
            <Button
              href={siteInfo.instagram}
              external
              variant="primary"
              size="lg"
            >
              <InstagramIcon className="h-5 w-5" />
              @rf.interior.spot
            </Button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
