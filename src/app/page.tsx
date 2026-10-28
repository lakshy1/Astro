"use client";

import { useState } from "react";
import CelestialCanvas from "@/components/celestial-canvas";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Astrologers from "@/components/astrologers";
import HoroscopeGrid from "@/components/horoscope-grid";
import TarotInteractive from "@/components/tarot-interactive";
import KundliGenerator from "@/components/kundli-generator";
import LoveCalculator from "@/components/love-calculator";
import Panchang from "@/components/panchang";
import Services from "@/components/services";
import Blog from "@/components/blog";
import Footer from "@/components/footer";
import ConsultationModal from "@/components/consultation-modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAstrologer, setActiveAstrologer] = useState("Acharya Sreejita");

  const handleOpenConsultation = (astrologerName?: string) => {
    if (astrologerName) {
      setActiveAstrologer(astrologerName);
    } else {
      setActiveAstrologer("Acharya Sreejita");
    }
    setModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090d] text-[#ededef] selection:bg-[#d4af37] selection:text-[#08090d]">
      {/* 3D Celestial Background Particle & Constellation Canvas */}
      <CelestialCanvas />

      {/* Floating Sticky Navigation Bar */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onScrollToSection={handleScrollToSection}
      />

      <main className="relative z-10 flex flex-col">
        {/* 1. 3D Interactive Hero Section */}
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onScrollToSection={handleScrollToSection}
        />

        {/* 2. Verified Astrologers Directory & Live Filters */}
        <Astrologers onOpenConsultation={handleOpenConsultation} />

        {/* 3. Daily Horoscope & 3D Zodiac Deep-Dive Explorer */}
        <HoroscopeGrid onOpenConsultation={handleOpenConsultation} />

        {/* 4. 3D Interactive Tarot Studio (Flip Cards) */}
        <TarotInteractive onOpenConsultation={handleOpenConsultation} />

        {/* 5. Authentic Free Vedic Kundli Generator (D1 Diamond Chart) */}
        <KundliGenerator onOpenConsultation={handleOpenConsultation} />

        {/* 6. Zodiac Love & Compatibility Synastry Meter */}
        <LoveCalculator onOpenConsultation={handleOpenConsultation} />

        {/* 7. Daily Panchang & Shubh Muhurat Times */}
        <Panchang />

        {/* 8. Sacred Astrological Services */}
        <Services
          onScrollToSection={handleScrollToSection}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 9. Astrological Journal & Wisdom Guides */}
        <Blog />
      </main>

      {/* 10. Comprehensive Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Global Interactive Consultation & Live Chat Simulation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        astrologerName={activeAstrologer}
      />
    </div>
  );
}