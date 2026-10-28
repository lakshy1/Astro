"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroProps {
  onOpenConsultation?: (astrologerName?: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export default function Hero({ onOpenConsultation, onScrollToSection }: HeroProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 18, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const categories = [
    {
      name: "Chat with Astrologer",
      tag: "First 5 Mins Free",
      section: "astrologers",
      desc: "Live text consultation",
      iconSvg: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      name: "Talk to Astrologer",
      tag: "Instant 24/7",
      section: "astrologers",
      desc: "Secure voice connection",
      iconSvg: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      name: "Free Janam Kundli",
      tag: "Vedic D1",
      section: "kundli",
      desc: "Birth chart calculation",
      iconSvg: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "3D Tarot Studio",
      tag: "Arcana",
      section: "tarot",
      desc: "3-card interactive spread",
      iconSvg: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="3" width="14" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      name: "Love Compatibility",
      tag: "36 Gunas",
      section: "love",
      desc: "Zodiac synastry score",
      iconSvg: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: "Today's Panchang",
      tag: "Muhurat",
      section: "panchang",
      desc: "Tithi & Rahu Kaal",
      iconSvg: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-[#1c1f2a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clean Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12141c] border border-[#232734] text-xs font-medium text-[#b0b3bf]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>India&apos;s Verified Vedic Consultation Network</span>
            </div>

            {/* Clean, Non-Slop High-Impact Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.14]">
              Unlock Your Cosmic Destiny with{" "}
              <span className="block text-[#d4af37] mt-1 font-semibold">
                India&apos;s Revered Astrologers
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-[#8e919e] text-base sm:text-lg max-w-xl leading-relaxed">
              Experience the ancient accuracy of Vedic astrology, Tarot foresight, and Kundli revelations. Connect 24/7 for career breakthroughs, soulmate clarity, and spiritual remedies.
            </p>

            {/* Action Buttons - Fully Visible & High Contrast */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <button
                onClick={() => onOpenConsultation?.()}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold px-8 py-4 rounded-xl text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-amber-400/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Chat with Astrologer</span>
                <span className="text-[10px] uppercase font-bold bg-neutral-950 text-amber-300 px-1.5 py-0.5 rounded ml-1">
                  5 Min Free
                </span>
              </button>

              <button
                onClick={() => {
                  if (onScrollToSection) {
                    onScrollToSection("horoscope");
                  } else {
                    const el = document.getElementById("horoscope");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-7 py-4 rounded-xl bg-[#141620] hover:bg-[#1a1e2b] border border-[#2a2e3f] hover:border-amber-400/40 text-white font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Read Today&apos;s Horoscope</span>
                <span className="text-amber-400 text-base">♈</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1c1f2a] w-full max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">50,000+</p>
                <p className="text-xs text-[#8e919e] mt-0.5">Verified Gurus</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#d4af37] tracking-tight">4.98 / 5</p>
                <p className="text-xs text-[#8e919e] mt-0.5">1.6M+ User Reviews</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">100%</p>
                <p className="text-xs text-[#8e919e] mt-0.5">Private & Secure</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Celestial Astrolabe Orrery */}
          <div className="lg:col-span-5 flex items-center justify-center relative perspective-1000">
            <div
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] preserve-3d"
            >
              {/* Outer Architectural Ring */}
              <div className="absolute inset-0 rounded-full border border-[#262a38] pointer-events-none" />

              {/* Middle Rotating Ring with Astronomical Graduations */}
              <div className="absolute inset-5 rounded-full border border-dashed border-[#d4af37]/30 animate-orbit-slow pointer-events-none flex items-center justify-between p-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                <span className="w-2 rounded-full h-2 bg-[#8e919e]" />
              </div>

              {/* Core Astrolabe Artwork */}
              <div className="absolute inset-10 rounded-full overflow-hidden border border-[#2a2f3f] bg-[#0c0d14] shadow-2xl">
                <Image
                  src="/celestial_zodiac_wheel.jpg"
                  alt="3D Interactive Astrolabe"
                  width={440}
                  height={440}
                  priority
                  className="w-full h-full object-cover animate-orbit-slow"
                />
              </div>

              {/* Floating Real Consultant Badge */}
              <div
                style={{ transform: "translateZ(45px)" }}
                className="absolute -top-2 -right-2 sm:right-2 bg-[#12141c]/95 border border-[#262b3b] rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-subtle-float"
              >
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#d4af37]/40 shrink-0">
                  <Image
                    src="/vedic_astrologer_female.jpg"
                    alt="Acharya Sreejita"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Acharya Sreejita</p>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[11px] text-[#d4af37] font-medium">Vedic & Tarot • 5.0 ⭐ (4.8k)</p>
                  <p className="text-[10px] text-[#8e919e]">Next available now</p>
                </div>
              </div>

              {/* Floating Transit Insight Badge */}
              <div
                style={{ transform: "translateZ(35px)" }}
                className="absolute -bottom-3 -left-2 sm:left-2 bg-[#12141c]/95 border border-[#262b3b] rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#181b24] border border-[#282d3d] flex items-center justify-center text-[#d4af37] text-sm">
                  🪐
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">Jupiter Transit in Pisces</p>
                  <p className="text-[10px] text-emerald-400 font-medium">Favorable wealth phase for 6 signs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Architectural Category Tiles (Bento Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-16">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                if (cat.section === "astrologers") {
                  onOpenConsultation?.();
                } else if (onScrollToSection) {
                  onScrollToSection(cat.section);
                } else {
                  const el = document.getElementById(cat.section);
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="luxury-card p-4 rounded-xl text-left flex flex-col justify-between h-32 cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#161822] border border-[#242838] flex items-center justify-center group-hover:border-[#d4af37]/40 transition-colors">
                  {cat.iconSvg}
                </div>
                <span className="text-[10px] font-semibold text-[#8e919e] group-hover:text-[#d4af37] transition-colors">
                  {cat.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-[#8e919e] mt-0.5 truncate">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}