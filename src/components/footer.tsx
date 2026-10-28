"use client";

interface FooterProps {
  onScrollToSection?: (sectionId: string) => void;
  onOpenConsultation?: (astrologerName?: string) => void;
}

export default function Footer({ onScrollToSection, onOpenConsultation }: FooterProps) {
  const handleScroll = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#050608] text-[#8e919e] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Newsletter Bar */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[#0e1016] border border-[#1e212b] mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-white">Daily Planetary Ephemeris Alerts</h3>
            <p className="text-xs text-[#8e919e] mt-1">
              Receive auspicious Shubh Muhurat windows, transit updates, and festival vidhis directly in your inbox.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-[#14161f] border border-[#222532] text-xs text-white rounded-lg px-3.5 py-2.5 w-full sm:w-72 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              onClick={() => alert("Thank you for subscribing to daily Vedic transit updates.")}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-lg text-xs whitespace-nowrap cursor-pointer shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* 5 Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#14161f] border border-[#262a38] flex items-center justify-center text-[#d4af37]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                AstroTalk <span className="text-[#d4af37]">Prime</span>
              </span>
            </div>

            <p className="text-xs text-[#8e919e] leading-relaxed max-w-sm">
              India&apos;s verified digital astrology consultation platform. Bringing classical Parashari, Jaimini, and Nadi Vedic sciences to millions with complete confidentiality and technological excellence.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px]">
              <span className="font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                ✓ 100% Confidential
              </span>
              <span className="font-medium text-zinc-300 bg-[#14161f] border border-[#222532] px-2 py-0.5 rounded">
                ✓ Certified Astrologers
              </span>
              <span className="font-medium text-zinc-300 bg-[#14161f] border border-[#222532] px-2 py-0.5 rounded">
                ✓ 24/7 Direct Care
              </span>
            </div>
          </div>

          {/* Column 2: Consultations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Consultations
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenConsultation?.("Vedic Astrologer")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Chat with Astrologer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenConsultation?.("Senior Pandit")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Voice Call Astrologer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("astrologers")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Celebrity Astrologers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("kundli")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kundli Analysis Session
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("love")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Marriage Compatibility
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Astrology Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Astrology Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleScroll("horoscope")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Horoscope (12 Signs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("kundli")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Free Janam Kundli (D1)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("tarot")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D Tarot Card Spread
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("love")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Zodiac Synastry Meter
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("panchang")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Today&apos;s Panchang & Muhurat
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Network
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Astrologer Code of Ethics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy (Encrypted)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Refund & Satisfaction Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1c1f2a] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#6b6e7a]">
          <p>© 2026 AstroTalk Prime. All Sacred Rights Reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: Vedic Astrology is an interpretive spiritual advisory discipline. Consultations offer cosmic guidance and spiritual perspective. Free will governs personal decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}