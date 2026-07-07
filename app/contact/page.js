import { Phone } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { siteInfo } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact RF Interior Spot in Manali, Chennai for PVC cupboards, UPVC kitchens, aluminium windows, mosquito nets, and custom interior work.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Plan Your Interior Upgrade"
        description="Call, WhatsApp, or send your requirements — we'll respond with guidance, measurements, and a clear quote."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/80 bg-surface p-8 shadow-soft">
                <h2 className="font-heading text-2xl font-semibold text-charcoal">
                  Reach Us Directly
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {siteInfo.address}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Button href={`tel:+91${siteInfo.phone}`} variant="outline">
                    <Phone className="h-4 w-4" />
                    Call +91 {siteInfo.phone}
                  </Button>
                  <Button href={siteInfo.whatsappUrl} external>
                    Chat on WhatsApp
                  </Button>
                  <Button href={siteInfo.mapLinkUrl} external variant="ghost">
                    Open in Google Maps
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/80 shadow-soft">
                <iframe
                  title="RF Interior Spot location on Google Maps"
                  src={siteInfo.mapEmbedUrl}
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
