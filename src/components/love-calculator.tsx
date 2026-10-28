"use client";

import { useState } from "react";

interface LoveCalculatorProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

export default function LoveCalculator({ onOpenConsultation }: LoveCalculatorProps) {
  const signs = [
    { name: "Aries", symbol: "♈", element: "Fire" },
    { name: "Taurus", symbol: "♉", element: "Earth" },
    { name: "Gemini", symbol: "♊", element: "Air" },
    { name: "Cancer", symbol: "♋", element: "Water" },
    { name: "Leo", symbol: "♌", element: "Fire" },
    { name: "Virgo", symbol: "♍", element: "Earth" },
    { name: "Libra", symbol: "♎", element: "Air" },
    { name: "Scorpio", symbol: "♏", element: "Water" },
    { name: "Sagittarius", symbol: "♐", element: "Fire" },
    { name: "Capricorn", symbol: "♑", element: "Earth" },
    { name: "Aquarius", symbol: "♒", element: "Air" },
    { name: "Pisces", symbol: "♓", element: "Water" },
  ];

  const [sign1, setSign1] = useState("Aries");
  const [sign2, setSign2] = useState("Leo");
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCompatibility = () => {
    const s1 = signs.find((s) => s.name === sign1);
    const s2 = signs.find((s) => s.name === sign2);
    if (!s1 || !s2) return { total: 85, emotional: 80, romance: 90, communication: 85, marriage: 85 };

    let total = 75;
    if (s1.element === s2.element) total = 94;
    else if (
      (s1.element === "Fire" && s2.element === "Air") ||
      (s1.element === "Air" && s2.element === "Fire") ||
      (s1.element === "Earth" && s2.element === "Water") ||
      (s1.element === "Water" && s2.element === "Earth")
    )
      total = 88;
    else total = 68;

    return {
      total,
      emotional: Math.min(99, total + 3),
      romance: Math.min(99, total + 5),
      communication: Math.min(99, total - 4),
      marriage: Math.min(99, total - 2),
    };
  };

  const scores = calculateCompatibility();

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 300);
  };

  return (
    <section id="love" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141c] border border-[#232734] text-[#d4af37] text-xs font-semibold mb-3">
            <span>✦</span>
            <span>Vedic Kundli Milan (36 Gunas)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Zodiac Love & Synastry Matcher
          </h2>
          <p className="text-[#8e919e] text-sm sm:text-base mt-2">
            Calculate relational resonance across emotional attachment, intellectual communication, and marital longevity according to Ashta Koota principles.
          </p>
        </div>

        {/* Dual Sign Selector & Gauge */}
        <div className="max-w-4xl mx-auto luxury-card rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Sign 1 Selector */}
            <div className="md:col-span-4 flex flex-col items-center text-center p-5 rounded-xl bg-[#14161f] border border-[#202330]">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8e919e] mb-2">
                Your Sign
              </span>
              <div className="w-16 h-16 rounded-xl bg-[#1a1d28] border border-[#282d3d] flex items-center justify-center text-3xl mb-3 text-[#d4af37]">
                {signs.find((s) => s.name === sign1)?.symbol}
              </div>
              <select
                value={sign1}
                onChange={(e) => {
                  setSign1(e.target.value);
                  handleRecalculate();
                }}
                className="w-full bg-[#0e1017] border border-[#222532] text-white rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#d4af37] text-center"
              >
                {signs.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.symbol} {s.name} ({s.element})
                  </option>
                ))}
              </select>
            </div>

            {/* Central Circular Progress Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#1c1f2a"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="8"
                    strokeDasharray={301.6}
                    strokeDashoffset={301.6 - (301.6 * scores.total) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white">
                    {isCalculating ? "..." : `${scores.total}%`}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-[#8e919e] tracking-wider mt-0.5">
                    {scores.total > 85 ? "Divine Match" : scores.total > 75 ? "Harmonious" : "Complementary"}
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#8e919e] mt-3">
                <span>Elemental Aspect: </span>
                <span className="text-white font-medium">
                  {signs.find((s) => s.name === sign1)?.element} + {signs.find((s) => s.name === sign2)?.element}
                </span>
              </div>
            </div>

            {/* Sign 2 Selector */}
            <div className="md:col-span-4 flex flex-col items-center text-center p-5 rounded-xl bg-[#14161f] border border-[#202330]">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8e919e] mb-2">
                Partner&apos;s Sign
              </span>
              <div className="w-16 h-16 rounded-xl bg-[#1a1d28] border border-[#282d3d] flex items-center justify-center text-3xl mb-3 text-[#d4af37]">
                {signs.find((s) => s.name === sign2)?.symbol}
              </div>
              <select
                value={sign2}
                onChange={(e) => {
                  setSign2(e.target.value);
                  handleRecalculate();
                }}
                className="w-full bg-[#0e1017] border border-[#222532] text-white rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#d4af37] text-center"
              >
                {signs.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.symbol} {s.name} ({s.element})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#1e212b]">
            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                <span className="text-[#8e919e]">Romance</span>
                <span className="font-semibold text-white">{scores.romance}%</span>
              </div>
              <div className="w-full bg-[#1c1f2a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4af37] h-full rounded-full" style={{ width: `${scores.romance}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                <span className="text-[#8e919e]">Emotional Bond</span>
                <span className="font-semibold text-white">{scores.emotional}%</span>
              </div>
              <div className="w-full bg-[#1c1f2a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${scores.emotional}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                <span className="text-[#8e919e]">Communication</span>
                <span className="font-semibold text-white">{scores.communication}%</span>
              </div>
              <div className="w-full bg-[#1c1f2a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: `${scores.communication}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                <span className="text-[#8e919e]">Marriage Harmony</span>
                <span className="font-semibold text-white">{scores.marriage}%</span>
              </div>
              <div className="w-full bg-[#1c1f2a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${scores.marriage}%` }} />
              </div>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="mt-8 pt-6 border-t border-[#1e212b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8e919e]">
              Need a full 36-Guna Kundli Milan consultation with remedies for Nadi or Bhakoot doshas?
            </p>
            <button
              onClick={() => onOpenConsultation?.(`Matchmaking Specialist (${sign1} + ${sign2})`)}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer whitespace-nowrap shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Full Matchmaking Report &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
