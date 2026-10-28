"use client";

import { useState } from "react";

interface HoroscopeGridProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

interface RashiData {
  name: string;
  sanskrit: string;
  symbol: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  ruling: string;
  todayRating: "Favorable" | "Neutral" | "Very Favorable";
  loveScore: number;
  careerScore: number;
  moneyScore: number;
  healthScore: number;
  luckyNumber: string;
  luckyColor: string;
  luckyStone: string;
  prediction: string;
}

export default function HoroscopeGrid({ onOpenConsultation }: HoroscopeGridProps) {
  const [selectedElement, setSelectedElement] = useState<string>("All");
  const [activeRashi, setActiveRashi] = useState<RashiData | null>(null);

  const rashis: RashiData[] = [
    {
      name: "Aries",
      sanskrit: "Mesh",
      symbol: "♈",
      dates: "Mar 21 - Apr 19",
      element: "Fire",
      ruling: "Mars (Mangal)",
      todayRating: "Very Favorable",
      loveScore: 88,
      careerScore: 94,
      moneyScore: 85,
      healthScore: 90,
      luckyNumber: "9 & 18",
      luckyColor: "Crimson Red",
      luckyStone: "Red Coral (Moonga)",
      prediction:
        "Mars energizes your 10th house of profession. High executive clarity opens strategic discussions regarding promotions, new contracts, and long-range expansion. Maintain calm tact in domestic dialogue.",
    },
    {
      name: "Taurus",
      sanskrit: "Vrishabh",
      symbol: "♉",
      dates: "Apr 20 - May 20",
      element: "Earth",
      ruling: "Venus (Shukra)",
      todayRating: "Very Favorable",
      loveScore: 95,
      careerScore: 82,
      moneyScore: 91,
      healthScore: 86,
      luckyNumber: "6 & 15",
      luckyColor: "Emerald Green",
      luckyStone: "Diamond / White Sapphire",
      prediction:
        "Venus radiates harmony in close personal partnerships. Prior investment moves show encouraging traction. An excellent day for domestic settlements and financial budgeting.",
    },
    {
      name: "Gemini",
      sanskrit: "Mithun",
      symbol: "♊",
      dates: "May 21 - Jun 20",
      element: "Air",
      ruling: "Mercury (Budh)",
      todayRating: "Favorable",
      loveScore: 84,
      careerScore: 89,
      moneyScore: 78,
      healthScore: 82,
      luckyNumber: "5 & 14",
      luckyColor: "Warm Amber",
      luckyStone: "Emerald (Panna)",
      prediction:
        "Mercury boosts intellect and negotiation agility. Favorable for technical proposals, client presentations, and contracts. Take scheduled pauses from digital screens.",
    },
    {
      name: "Cancer",
      sanskrit: "Kark",
      symbol: "♋",
      dates: "Jun 21 - Jul 22",
      element: "Water",
      ruling: "Moon (Chandra)",
      todayRating: "Very Favorable",
      loveScore: 92,
      careerScore: 86,
      moneyScore: 88,
      healthScore: 89,
      luckyNumber: "2 & 11",
      luckyColor: "Pearl White",
      luckyStone: "Natural Pearl (Moti)",
      prediction:
        "The Moon forms an auspicious trine, sharpening intuition. Rely on your instinct regarding financial agreements and domestic affairs. Evening brings deep mental clarity.",
    },
    {
      name: "Leo",
      sanskrit: "Simha",
      symbol: "♌",
      dates: "Jul 23 - Aug 22",
      element: "Fire",
      ruling: "Sun (Surya)",
      todayRating: "Very Favorable",
      loveScore: 90,
      careerScore: 96,
      moneyScore: 92,
      healthScore: 91,
      luckyNumber: "1 & 10",
      luckyColor: "Saffron Gold",
      luckyStone: "Ruby (Manik)",
      prediction:
        "The Sun radiates solar confidence through your ascendant. You command natural authority in executive reviews and public appearances. Generosity in family matters bears rich fruit.",
    },
    {
      name: "Virgo",
      sanskrit: "Kanya",
      symbol: "♍",
      dates: "Aug 23 - Sep 22",
      element: "Earth",
      ruling: "Mercury (Budh)",
      todayRating: "Favorable",
      loveScore: 79,
      careerScore: 91,
      moneyScore: 84,
      healthScore: 87,
      luckyNumber: "5 & 23",
      luckyColor: "Forest Green",
      luckyStone: "Peridot",
      prediction:
        "Analytical rigor and auditing tasks yield spotless results. Avoid over-examining personal relations; make room for spontaneous warmth in relationships.",
    },
    {
      name: "Libra",
      sanskrit: "Tula",
      symbol: "♎",
      dates: "Sep 23 - Oct 22",
      element: "Air",
      ruling: "Venus (Shukra)",
      todayRating: "Very Favorable",
      loveScore: 96,
      careerScore: 85,
      moneyScore: 89,
      healthScore: 92,
      luckyNumber: "6 & 24",
      luckyColor: "Rose Quartz",
      luckyStone: "Opal",
      prediction:
        "Balance and aesthetic inspiration surround you. Joint commercial contracts and legal settlements move into favorable terms. High-value advisors provide timely counsel.",
    },
    {
      name: "Scorpio",
      sanskrit: "Vrishchik",
      symbol: "♏",
      dates: "Oct 23 - Nov 21",
      element: "Water",
      ruling: "Mars & Ketu",
      todayRating: "Very Favorable",
      loveScore: 86,
      careerScore: 93,
      moneyScore: 95,
      healthScore: 88,
      luckyNumber: "9 & 18",
      luckyColor: "Deep Maroon",
      luckyStone: "Red Coral / Cat's Eye",
      prediction:
        "Unseen opportunities and lucrative terms emerge. Your perceptive edge allows you to identify hidden leverage in negotiations. Good day to clear outdated commitments.",
    },
    {
      name: "Sagittarius",
      sanskrit: "Dhanu",
      symbol: "♐",
      dates: "Nov 22 - Dec 21",
      element: "Fire",
      ruling: "Jupiter (Guru)",
      todayRating: "Very Favorable",
      loveScore: 91,
      careerScore: 95,
      moneyScore: 90,
      healthScore: 94,
      luckyNumber: "3 & 12",
      luckyColor: "Royal Gold",
      luckyStone: "Yellow Sapphire (Pukhraj)",
      prediction:
        "Jupiter showers expansive grace upon your 9th house of fortune. Higher education, international partnerships, and mentorship blessings thrive today.",
    },
    {
      name: "Capricorn",
      sanskrit: "Makar",
      symbol: "♑",
      dates: "Dec 22 - Jan 19",
      element: "Earth",
      ruling: "Saturn (Shani)",
      todayRating: "Favorable",
      loveScore: 80,
      careerScore: 92,
      moneyScore: 89,
      healthScore: 84,
      luckyNumber: "8 & 17",
      luckyColor: "Midnight Slate",
      luckyStone: "Blue Sapphire (Neelam)",
      prediction:
        "Disciplined persistence overcomes persistent operational friction. Saturn rewards methodical diligence with durable financial security. Maintain posture and stretch regularly.",
    },
    {
      name: "Aquarius",
      sanskrit: "Kumbh",
      symbol: "♒",
      dates: "Jan 20 - Feb 18",
      element: "Air",
      ruling: "Saturn & Rahu",
      todayRating: "Very Favorable",
      loveScore: 87,
      careerScore: 90,
      moneyScore: 86,
      healthScore: 89,
      luckyNumber: "4 & 13",
      luckyColor: "Electric Blue",
      luckyStone: "Hessonite (Gomed)",
      prediction:
        "Innovative engineering or research ideas find receptive ground. Unconventional approaches solve complex group dilemmas. Network growth yields productive contacts.",
    },
    {
      name: "Pisces",
      sanskrit: "Meen",
      symbol: "♓",
      dates: "Feb 19 - Mar 20",
      element: "Water",
      ruling: "Jupiter (Guru)",
      todayRating: "Very Favorable",
      loveScore: 94,
      careerScore: 88,
      moneyScore: 87,
      healthScore: 93,
      luckyNumber: "3 & 21",
      luckyColor: "Ocean Teal",
      luckyStone: "Yellow Topaz",
      prediction:
        "Intuitive insights and quiet reflection provide valuable tactical direction. Creative projects earn high appreciation. A reassuring discussion heals an old grievance.",
    },
  ];

  const filteredRashis =
    selectedElement === "All"
      ? rashis
      : rashis.filter((r) => r.element === selectedElement);

  return (
    <section id="horoscope" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d4af37]">
                Planetary Ephemeris & Transits
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Daily Horoscope & Rashi Insights
            </h2>
            <p className="text-[#8e919e] text-sm sm:text-base mt-2 max-w-xl">
              Calculated every morning according to planetary transits. Select your Rashi to review today&apos;s career, financial, and relational focus.
            </p>
          </div>

          {/* Element Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#101217] border border-[#1e212b]">
            {["All", "Fire", "Earth", "Air", "Water"].map((elem) => (
              <button
                key={elem}
                onClick={() => setSelectedElement(elem)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedElement === elem
                    ? "bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20"
                    : "text-[#8e919e] hover:text-white"
                }`}
              >
                {elem}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Rashi Architectural Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredRashis.map((rashi) => (
            <div
              key={rashi.name}
              onClick={() => setActiveRashi(rashi)}
              className="luxury-card rounded-2xl p-5 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#151821] border border-[#232734] flex items-center justify-center text-xl text-[#d4af37] group-hover:border-[#d4af37]/40 transition-colors">
                    {rashi.symbol}
                  </div>
                  <span className="text-[10px] font-semibold text-[#8e919e] bg-[#14161f] border border-[#222532] px-2 py-0.5 rounded">
                    {rashi.element}
                  </span>
                </div>

                {/* Sign Titles */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {rashi.name}
                    </h3>
                    <span className="text-xs text-[#8e919e]">({rashi.sanskrit})</span>
                  </div>
                  <p className="text-[11px] text-[#8e919e] mt-0.5">{rashi.dates}</p>
                </div>

                {/* Status Table */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2 px-2.5 rounded-xl bg-[#14161f] border border-[#1e212b] mb-3">
                  <div>
                    <span className="text-[10px] text-[#8e919e] block">Today</span>
                    <span className="font-semibold text-white">{rashi.todayRating}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e919e] block">Ruler</span>
                    <span className="font-semibold text-zinc-300 truncate block">{rashi.ruling}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e919e] block">Career</span>
                    <span className="font-semibold text-emerald-400">{rashi.careerScore}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e919e] block">Love</span>
                    <span className="font-semibold text-rose-400">{rashi.loveScore}%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-2 border-t border-[#1c1f2a] flex items-center justify-between text-xs font-medium text-[#8e919e] group-hover:text-[#d4af37]">
                <span>Read Full Forecast</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Zodiac Modal */}
      {activeRashi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-[#0f1117] border border-[#252936] rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveRashi(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#161822] border border-[#232734] text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#151821] border border-[#2a2f3f] flex items-center justify-center text-3xl text-[#d4af37]">
                {activeRashi.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-white">{activeRashi.name}</h3>
                  <span className="text-sm text-[#8e919e]">({activeRashi.sanskrit})</span>
                  <span className="text-[10px] font-semibold text-[#8e919e] bg-[#14161f] border border-[#222532] px-2 py-0.5 rounded">
                    {activeRashi.element} Element
                  </span>
                </div>
                <p className="text-xs text-[#8e919e] mt-1">
                  Ruling Planet: <span className="text-white font-medium">{activeRashi.ruling}</span> • {activeRashi.dates}
                </p>
              </div>
            </div>

            {/* Today's Forecast Paragraph */}
            <div className="bg-[#14161f] border border-[#202330] p-5 rounded-xl mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
                Today&apos;s Astrological Forecast
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">{activeRashi.prediction}</p>
            </div>

            {/* 4 Energy Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-[#14161f] border border-[#202330]">
                <span className="text-xs text-[#8e919e] block mb-1">Career & Focus</span>
                <span className="text-lg font-bold text-emerald-400">{activeRashi.careerScore}%</span>
                <div className="w-full bg-[#1e212d] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${activeRashi.careerScore}%` }} />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14161f] border border-[#202330]">
                <span className="text-xs text-[#8e919e] block mb-1">Love & Harmony</span>
                <span className="text-lg font-bold text-rose-400">{activeRashi.loveScore}%</span>
                <div className="w-full bg-[#1e212d] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${activeRashi.loveScore}%` }} />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14161f] border border-[#202330]">
                <span className="text-xs text-[#8e919e] block mb-1">Wealth / Money</span>
                <span className="text-lg font-bold text-[#d4af37]">{activeRashi.moneyScore}%</span>
                <div className="w-full bg-[#1e212d] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#d4af37] h-full rounded-full" style={{ width: `${activeRashi.moneyScore}%` }} />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14161f] border border-[#202330]">
                <span className="text-xs text-[#8e919e] block mb-1">Vitality / Health</span>
                <span className="text-lg font-bold text-sky-400">{activeRashi.healthScore}%</span>
                <div className="w-full bg-[#1e212d] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full" style={{ width: `${activeRashi.healthScore}%` }} />
                </div>
              </div>
            </div>

            {/* Lucky Factors */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-[#14161f] border border-[#202330] text-xs">
              <div>
                <span className="text-[#8e919e] block">Lucky Numbers</span>
                <span className="font-bold text-white text-sm">{activeRashi.luckyNumber}</span>
              </div>
              <div>
                <span className="text-[#8e919e] block">Lucky Color</span>
                <span className="font-bold text-zinc-200 text-sm">{activeRashi.luckyColor}</span>
              </div>
              <div>
                <span className="text-[#8e919e] block">Lucky Gemstone</span>
                <span className="font-bold text-[#d4af37] text-sm">{activeRashi.luckyStone}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const rashiName = activeRashi.name;
                  setActiveRashi(null);
                  onOpenConsultation?.(`${rashiName} Specialist Astrologer`);
                }}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold flex-1 py-3 rounded-xl text-xs sm:text-sm text-center cursor-pointer shadow-md shadow-amber-400/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Consult {activeRashi.name} Specialist Astrologer
              </button>
              <button
                onClick={() => setActiveRashi(null)}
                className="px-6 py-3 rounded-xl bg-[#14161f] hover:bg-[#1a1c28] border border-[#202330] hover:border-[#333748] text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}