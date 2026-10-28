"use client";

import { useEffect, useState } from "react";
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
import Categories from "@/components/categories";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";
import HoroscopeChatbot from "@/components/horoscope-chatbot";
import Footer from "@/components/footer";
import ConsultationModal from "@/components/consultation-modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAstrologer, setActiveAstrologer] = useState("Acharya Sreejita");


  // 3D tilt + pointer sheen for every interactive card (.card-hover)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let current: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".card-hover");
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const max = Math.max(2, 9 - r.width / 80);
      el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

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
    <div className="relative min-h-screen">
      {/* Floating Sticky Navigation Bar */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onScrollToSection={handleScrollToSection}
      />

      <main className="relative z-10 flex flex-col">
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onScrollToSection={handleScrollToSection}
        />

        <Astrologers onOpenConsultation={handleOpenConsultation} />

        <Categories onOpenConsultation={handleOpenConsultation} />

        <HoroscopeGrid onOpenConsultation={handleOpenConsultation} />

        <KundliGenerator onOpenConsultation={handleOpenConsultation} />

        <LoveCalculator onOpenConsultation={handleOpenConsultation} />

        <TarotInteractive onOpenConsultation={handleOpenConsultation} />

        <Panchang />

        <Services
          onScrollToSection={handleScrollToSection}
          onOpenConsultation={handleOpenConsultation}
        />

        <Testimonials />

        <Blog />

        <Faq />
      </main>

      {/* 10. Comprehensive Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenConsultation={handleOpenConsultation}
      />

      <HoroscopeChatbot />

      {/* Global Interactive Consultation & Live Chat Simulation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        astrologerName={activeAstrologer}
      />
    </div>
  );
}