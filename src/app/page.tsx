import { Hero } from "@/components/home/Hero";
import {
  ContactSection,
  SecuritySection,
  ServicesSection,
  WorkSection,
} from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ServicesSection />
      <SecuritySection />
      <ContactSection />
    </>
  );
}
