"use client";

interface ServicesProps {
  onScrollToSection?: (sectionId: string) => void;
  onOpenConsultation?: (astrologerName?: string) => void;
}

export default function Services({ onScrollToSection, onOpenConsultation }: ServicesProps) {
  const serviceList = [
    {
      title: "Free Janam Kundli",
      desc: "Instant Vedic birth chart with planetary degrees, Lagna house analysis, and 120-year Vimshottari Mahadasha cycles.",
      actionText: "Generate Chart",
      section: "kundli",
      badge: "Instant",
      icon: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Daily & Yearly Horoscope",
      desc: "Ephemeris-based forecast for all 12 Zodiac signs covering personal romance, career growth, and physical vitality.",
      actionText: "Read Today's Forecast",
      section: "horoscope",
      badge: "Updated Daily",
      icon: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        </svg>
      ),
    },
    {
      title: "3D Tarot Studio",
      desc: "Interactive 3-card spread exploring past karmic lessons, present realities, and future trajectory.",
      actionText: "Draw Cards Now",
      section: "tarot",
      badge: "3D Interactive",
      icon: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="3" width="14" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "Kundli Milan & Synastry",
      desc: "Authentic 36-Guna Ashta Koota matching for marriage harmony, emotional temperament, and longevity analysis.",
      actionText: "Check Match",
      section: "love",
      badge: "High Precision",
      icon: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Live Vedic Temple Pooja",
      desc: "Custom e-Pooja performed by verified priests at Kashi, Ujjain, and Haridwar holy shrines with consecrated prasad delivered.",
      actionText: "Book Pandit Live",
      consult: "Vedic Temple Pandit",
      badge: "Prasad Delivered",
      icon: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: "Today's Vedic Panchang",
      desc: "Surya Siddhanta calculations for auspicious Abhijit Muhurat, Rahu Kaal, Tithi, and Nakshatra.",
      actionText: "View Timings",
      section: "panchang",
      badge: "Astronomical",
      icon: (
        <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141c] border border-[#232734] text-[#d4af37] text-xs font-semibold mb-3">
            <span>✦</span>
            <span>Comprehensive Spiritual Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vedic Astrological Services
          </h2>
          <p className="text-[#8e919e] text-sm sm:text-base mt-2">
            Ancient sacred sciences presented through modern architectural clarity and mathematical precision.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {serviceList.map((srv) => (
            <div
              key={srv.title}
              onClick={() => {
                if (srv.consult) {
                  onOpenConsultation?.(srv.consult);
                } else if (srv.section) {
                  if (onScrollToSection) {
                    onScrollToSection(srv.section);
                  } else {
                    const el = document.getElementById(srv.section);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="luxury-card rounded-2xl p-7 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#14161f] border border-[#222532] flex items-center justify-center group-hover:border-[#d4af37]/40 transition-colors">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-[#8e919e] bg-[#14161f] border border-[#222532] px-2 py-0.5 rounded">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#8e919e] leading-relaxed mb-6">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c1f2a] flex items-center justify-between text-xs font-medium text-[#8e919e] group-hover:text-[#d4af37]">
                <span>{srv.actionText}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}