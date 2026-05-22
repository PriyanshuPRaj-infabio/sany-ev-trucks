import Navbar from "@/components/Navbar";
import ExperientialScroll from "@/components/ExperientialScroll";
import EVTrucksSection from "@/components/EVTrucksSection";
import RigorousTesting from "@/components/RigorousTesting";
import SmartFleetManagement from "@/components/SmartFleetManagement";
import GlobalSupportNetwork from "@/components/GlobalSupportNetwork";
import SuccessStories from "@/components/SuccessStories";
import StatsSection from "@/components/StatsSection";
import FooterTruck from "@/components/FooterTruck";
import CustomCursor from "@/components/CustomCursor";
import AerodynamicParticles from "@/components/AerodynamicParticles";

export default function Home() {
  return (
    <main className="relative bg-[#050505] w-full min-h-screen">
      {/* Global Aesthetics */}
      <CustomCursor />
      <AerodynamicParticles />

      {/* Header Navigation */}
      <Navbar />

      {/* Continuous Canvas Scrollytelling (Hero, About, Highway Drivetrain) */}
      <ExperientialScroll />

      {/* EV Trucks Grid and Features Accordion */}
      <EVTrucksSection />

      {/* Quality Validation & Extreme Weather Testing */}
      <RigorousTesting />

      {/* Fleet Telematics & Live Dashboard Widget */}
      <SmartFleetManagement />

      {/* Global Support Infrastructure and Grid Map */}
      <GlobalSupportNetwork />

      {/* Global client testimonials & reviews horizontal track */}
      <SuccessStories />

      {/* Performance metrics section */}
      <StatsSection />

      {/* Video CTA Footer section */}
      <FooterTruck />
    </main>
  );
}
