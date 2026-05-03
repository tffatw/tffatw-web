import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
// import MembersSection from "@/components/sections/MembersSection";
import EventsPreviewSection from "@/components/sections/EventsPreviewSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* <MembersSection /> */}
      <EventsPreviewSection />
    </>
  );
}
