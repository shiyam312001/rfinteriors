import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { siteInfo } from "@/lib/content";
import { getServicesWithImages } from "@/lib/images.server";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import Button from "@/components/Button";
import Card from "@/components/Card";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Explore PVC cupboards, UPVC modular kitchens, aluminium windows, mosquito nets, and custom interior works from RF Interior Spot in Chennai.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getServicesWithImages();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Complete PVC & UPVC Interior Services"
        description="Detailed solutions for storage, kitchens, windows, screening, and bespoke interior work — designed and installed by our Chennai team."
      />

      <Section>
        <div className="space-y-8">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.05}>
              <Card
                className={`overflow-hidden ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } lg:flex`}
              >
                <div className="relative min-h-[280px] flex-1 bg-gradient-to-br from-accent-soft to-border-light lg:min-h-[360px]">
                  {service.image ? (
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={service.image.width}
                      height={service.image.height}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full min-h-[280px] items-center justify-center">
                      <ServiceIcon
                        name={service.icon}
                        className="h-16 w-16 text-accent"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                  <div className="mb-4 inline-flex w-fit rounded-xl bg-accent-soft p-3 text-accent">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h2 className="font-heading text-3xl font-semibold text-charcoal">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted">
                    {service.description}
                  </p>
                  <div className="mt-8">
                    <Button href={siteInfo.whatsappUrl} external>
                      Enquire on WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading
          title="Not Sure Where to Start?"
          description="Tell us about your space and we'll recommend the right combination of PVC cupboards, kitchen modules, windows, or custom works."
        />
        <div className="text-center">
          <Button href="/contact" variant="outline" size="lg">
            Talk to Our Team
          </Button>
        </div>
      </Section>
    </>
  );
}
