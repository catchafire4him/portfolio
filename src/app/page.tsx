import { Hero } from "@/components/home/Hero";
import {
  ContactSection,
  ServicesSection,
  StrengthsSection,
  WorkSection,
} from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ServicesSection />
      <StrengthsSection />
      <ContactSection />
    </>
  );
}
