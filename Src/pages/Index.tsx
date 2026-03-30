import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BiographySection from "@/components/BiographySection";
import EventsSection from "@/components/EventsSection";
import ContratacionesSection from "@/components/ContratacionesSection";
import MusicSection from "@/components/MusicSection";
import ShopSection from "@/components/ShopSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BiographySection />
      <EventsSection />
      <ContratacionesSection />
      <MusicSection />
      <ShopSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
