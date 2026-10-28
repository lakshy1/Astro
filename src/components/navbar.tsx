"use client";

import { useState } from "react";

interface NavbarProps {
  onOpenConsultation?: (astrologerName?: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export default function Navbar({ onOpenConsultation, onScrollToSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState("EN");

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Micro-Bar */}
      <div className="bg-[#0b0c10] border-b border-[#1a1d26] py-1 px-4 sm:px-8 text-[11px] text-[#8e919e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-medium">3,420 Astrologers Online</span>
          </span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline">First 5-Min Consultation Free for New Users</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedLang(selectedLang === "EN" ? "HI" : "EN")}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer font-medium flex items-center gap-1"
            >
              <span>{selectedLang === "EN" ? "🇮🇳 English" : "🇮🇳 हिन्दी"}</span>
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <span className="text-zinc-600">|</span>
          <button
            onClick={() => onOpenConsultation?.("Customer Support")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            24/7 Care
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav className="backdrop-blur-xl bg-[#08090d]/90 border-b border-[#1c1f2a] px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            {/* Custom Architectural Astrolabe Logo SVG */}
            <div className="w-9 h-9 rounded-xl bg-[#12141c] border border-[#262a38] flex items-center justify-center text-[#d4af37] shadow-inner group-hover:border-[#d4af37]/60 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#d4af37] transition-colors">
                  AstroTalk
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-1.5 py-0.2 rounded border border-[#d4af37]/25">
                  Prime
                </span>
              </div>
              <p className="text-[10px] text-[#8e919e] hidden sm:block tracking-normal">
                Vedic Astrology & Guidance
              </p>
            </div>
          </button>

          {/* Desktop Nav Links with Refined Dropdowns */}
          <div className="hidden xl:flex items-center gap-1">
            {/* Dropdown 1: Consultations */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("consultations")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick("astrologers")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "consultations" ? "text-white bg-white/[0.04]" : "text-[#b0b3bf] hover:text-white"
                }`}
              >
                <span>Consultations</span>
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === "consultations" && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="bg-[#101218] border border-[#222532] rounded-2xl p-2 shadow-2xl backdrop-blur-2xl">
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenConsultation?.();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#181a24] transition-colors flex items-start gap-3 group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#181b24] border border-[#282d3d] flex items-center justify-center text-sm shrink-0">
                        💬
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-white group-hover:text-[#d4af37]">Chat with Astrologer</p>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded">FREE</span>
                        </div>
                        <p className="text-[11px] text-[#8e919e] mt-0.5">Instant live chat with verified gurus</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenConsultation?.();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#181a24] transition-colors flex items-start gap-3 group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#181b24] border border-[#282d3d] flex items-center justify-center text-sm shrink-0">
                        📞
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-[#d4af37]">Talk / Voice Call</p>
                        <p className="text-[11px] text-[#8e919e] mt-0.5">Direct phone connection with Vedic pandits</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick("astrologers")}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#181a24] transition-colors flex items-start gap-3 group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#181b24] border border-[#282d3d] flex items-center justify-center text-sm shrink-0">
                        ⭐
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-[#d4af37]">Celebrity Astrologers</p>
                        <p className="text-[11px] text-[#8e919e] mt-0.5">Consult top-rated spiritual authorities</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2: Horoscopes */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("horoscopes")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick("horoscope")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 cursor-pointer ${
                  activeDropdown === "horoscopes" ? "text-white bg-white/[0.04]" : "text-[#b0b3bf] hover:text-white"
                }`}
              >
                <span>Horoscopes</span>
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === "horoscopes" && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-[#101218] border border-[#222532] rounded-2xl p-2 shadow-2xl backdrop-blur-2xl">
                    <button
                      onClick={() => handleNavClick("horoscope")}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#181a24] transition-colors"
                    >
                      <p className="text-xs font-semibold text-white">Daily 12 Rashi Forecast</p>
                      <p className="text-[11px] text-[#8e919e]">Updated daily at sunrise</p>
                    </button>
                    <button
                      onClick={() => handleNavClick("horoscope")}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#181a24] transition-colors"
                    >
                      <p className="text-xs font-semibold text-white">Planetary Ephemeris 2026</p>
                      <p className="text-[11px] text-[#8e919e]">Major Saturn & Jupiter transits</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Link 3: Free Kundli */}
            <button
              onClick={() => handleNavClick("kundli")}
              className="px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-[#b0b3bf] hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              Free Kundli
            </button>

            {/* Link 4: 3D Tarot */}
            <button
              onClick={() => handleNavClick("tarot")}
              className="px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-[#b0b3bf] hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              3D Tarot Studio
            </button>

            {/* Link 5: Love Compatibility */}
            <button
              onClick={() => handleNavClick("love")}
              className="px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-[#b0b3bf] hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              Love Match
            </button>

            {/* Link 6: Panchang */}
            <button
              onClick={() => handleNavClick("panchang")}
              className="px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-[#b0b3bf] hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              Today&apos;s Panchang
            </button>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#12141c] border border-[#222532] text-xs text-[#8e919e] hover:border-[#383d4f] hover:text-zinc-200 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search Gurus & Tools...</span>
            <kbd className="text-[10px] bg-[#1a1d28] px-1.5 py-0.5 rounded border border-[#282d3e] text-zinc-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => onOpenConsultation?.()}
            className="shrink-0 whitespace-nowrap bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm tracking-wide cursor-pointer flex items-center gap-2 shadow-md shadow-amber-400/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
            <span>Talk to Astrologer</span>
            <svg className="w-3.5 h-3.5 text-neutral-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile / Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#12141c] border border-[#222532] text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Instant Search Overlay */}
      {searchOpen && (
        <div className="bg-[#0c0d12]/98 border-b border-[#222532] px-4 py-3 sm:px-8">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <svg className="w-4 h-4 text-[#8e919e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              autoFocus
              placeholder="Search by astrologer name (e.g. Sreejita, Minesh), sign (Aries, Leo), or service (Kundli, Tarot)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder-[#8e919e] focus:outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-[#181a24]"
            >
              ESC
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c0d12]/98 border-b border-[#222532] p-5 space-y-4 backdrop-blur-2xl">

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNavClick("astrologers")}
              className="p-3 rounded-xl bg-[#12141c] border border-[#222532] text-left font-medium text-zinc-200"
            >
              💬 Consult Astrologers
            </button>
            <button
              onClick={() => handleNavClick("horoscope")}
              className="p-3 rounded-xl bg-[#12141c] border border-[#222532] text-left font-medium text-zinc-200"
            >
              ♈ Daily Horoscope
            </button>
            <button
              onClick={() => handleNavClick("kundli")}
              className="p-3 rounded-xl bg-[#12141c] border border-[#222532] text-left font-medium text-zinc-200"
            >
              📜 Free Kundli
            </button>
            <button
              onClick={() => handleNavClick("tarot")}
              className="p-3 rounded-xl bg-[#12141c] border border-[#222532] text-left font-medium text-zinc-200"
            >
              🔮 3D Tarot Studio
            </button>
            <button
              onClick={() => handleNavClick("love")}
              className="p-3 rounded-xl bg-[#12141c] border border-[#222532] text-left font-medium text-zinc-200"
            >
              ❤️ Love Matcher
            </button>
            <button
              onClick={() => handleNavClick("panchang")}
              className="p-3 rounded-xl bg-[#12141c] border border-[#222532] text-left font-medium text-zinc-200"
            >
              🪐 Daily Panchang
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation?.();
            }}
            className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold text-center shadow-lg shadow-amber-400/20 cursor-pointer"
          >
            Start Free 5-Min Consultation
          </button>
        </div>
      )}
    </header>
  );
}
