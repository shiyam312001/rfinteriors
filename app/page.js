import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import InstagramTeaser from "@/components/InstagramTeaser";
import ContactSection from "@/components/ContactSection";
import {
  getServicesWithImages,
  heroImage,
  testimonialAccentImages,
} from "@/lib/images.server";

export default function HomePage() {
  return (
    <>
      <Hero heroImage={heroImage} />
      <ServicesOverview services={getServicesWithImages()} />
      <WhyChooseUs />
      <TestimonialsCarousel accentImages={testimonialAccentImages} />
      <InstagramTeaser />
      <ContactSection />
    </>
  );
}
