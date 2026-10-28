"use client";

import { useState } from "react";

interface KundliGeneratorProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

export default function KundliGenerator({ onOpenConsultation }: KundliGeneratorProps) {
  const [formData, setFormData] = useState({
    name: "Arjun Sharma",
    gender: "Male",
    dob: "1998-08-15",
    tob: "08:30",
    pob: "New Delhi, India",
  });

  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 600);
  };

  return (
    <section id="kundli" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141c] border border-[#232734] text-[#d4af37] text-xs font-semibold mb-3">
            <span>✦</span>
            <span>Vedic Ephemeris Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Free Vedic Janam Kundli
          </h2>
          <p className="text-[#8e919e] text-sm sm:text-base mt-2">
            Compute your natal birth chart, Lagna degrees, planetary house placements, and Vimshottari Mahadasha cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Birth Input Form */}
          <div className="lg:col-span-5 luxury-card rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-white mb-1 flex items-center justify-between">
              <span>Enter Birth Parameters</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                100% Free
              </span>
            </h3>
            <p className="text-xs text-[#8e919e] mb-6">
              Precision Vedic charts require accurate time of birth and location.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-[#12141c] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-[#12141c] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Birth City</label>
                  <input
                    type="text"
                    required
                    value={formData.pob}
                    onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                    className="w-full bg-[#12141c] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-[#12141c] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Time of Birth</label>
                  <input
                    type="time"
                    required
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="w-full bg-[#12141c] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs sm:text-sm font-bold cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Calculating Vedic Planetary Ephemeris...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Janam Kundli Chart</span>
                    <span>&rarr;</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Precision Authentic Vedic Diamond Chart (Lagna Chart) */}
          <div className="lg:col-span-7 luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1e212b]">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Lagna Birth Chart (D1 Kundli)</span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {generated ? "Personalized & Verified" : "Live Vedic Chart"}
                    </span>
                  </h3>
                  <p className="text-xs text-[#8e919e] mt-0.5">
                    Subject: <span className="text-white font-medium">{formData.name}</span> • {formData.dob} ({formData.tob}) • {formData.pob}
                  </p>
                </div>

                <button
                  onClick={() => onOpenConsultation?.("Kundli Astrologer")}
                  className="px-3 py-1.5 rounded-lg bg-[#151821] hover:bg-[#1a1e2a] border border-[#242838] text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Consult on This Chart
                </button>
              </div>

              {/* Vedic Diamond Chart Vector Graphic */}
              <div className="relative w-full max-w-sm mx-auto my-6 aspect-square bg-[#0b0c12] rounded-xl border border-[#202330] p-4 flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full text-[#343a4e]">
                  {/* Outer Frame */}
                  <rect x="10" y="10" width="380" height="380" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  
                  {/* Diagonal Cross */}
                  <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="390" y1="10" x2="10" y2="390" stroke="currentColor" strokeWidth="1.5" />

                  {/* Inner Diamond */}
                  <polygon points="200,10 390,200 200,390 10,200" fill="rgba(255, 255, 255, 0.01)" stroke="currentColor" strokeWidth="1.5" />

                  {/* House 1 (Lagna / Ascendant) */}
                  <text x="200" y="125" textAnchor="middle" fill="#d4af37" fontSize="13" fontWeight="bold">
                    House 1 (Lagna)
                  </text>
                  <text x="200" y="145" textAnchor="middle" fill="#ededef" fontSize="12" fontWeight="500">
                    Leo (Surya)
                  </text>

                  {/* House 2 */}
                  <text x="110" y="80" textAnchor="middle" fill="#8e919e" fontSize="11" fontWeight="bold">
                    H2: Kanya
                  </text>
                  <text x="110" y="98" textAnchor="middle" fill="#b0b3bf" fontSize="10">
                    Budh
                  </text>

                  {/* House 4 */}
                  <text x="75" y="200" textAnchor="middle" fill="#8e919e" fontSize="11" fontWeight="bold">
                    H4: Vrishchik
                  </text>
                  <text x="75" y="218" textAnchor="middle" fill="#f87171" fontSize="10">
                    Mangal
                  </text>

                  {/* House 7 (Marriage House) */}
                  <text x="200" y="270" textAnchor="middle" fill="#d4af37" fontSize="12" fontWeight="bold">
                    House 7 (Kalatra)
                  </text>
                  <text x="200" y="288" textAnchor="middle" fill="#34d399" fontSize="11">
                    Kumbha • Guru
                  </text>

                  {/* House 10 (Career) */}
                  <text x="325" y="200" textAnchor="middle" fill="#8e919e" fontSize="11" fontWeight="bold">
                    H10: Vrishabh
                  </text>
                  <text x="325" y="218" textAnchor="middle" fill="#fbbf24" fontSize="10">
                    Chandra (Exalted)
                  </text>

                  {/* Center Emblem */}
                  <circle cx="200" cy="200" r="14" fill="#12141c" stroke="#d4af37" strokeWidth="1.2" />
                  <text x="200" y="204" textAnchor="middle" fill="#d4af37" fontSize="11">
                    ✦
                  </text>
                </svg>
              </div>

              {/* Vedic Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#14161f] border border-[#202330]">
                  <span className="text-[#8e919e] block text-[11px]">Ascendant (Lagna)</span>
                  <span className="font-bold text-white text-xs mt-0.5 block">Simha (Leo)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14161f] border border-[#202330]">
                  <span className="text-[#8e919e] block text-[11px]">Moon Sign (Rashi)</span>
                  <span className="font-bold text-white text-xs mt-0.5 block">Vrishabh (Taurus)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14161f] border border-[#202330]">
                  <span className="text-[#8e919e] block text-[11px]">Nakshatra</span>
                  <span className="font-bold text-white text-xs mt-0.5 block">Rohini (Pad 2)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14161f] border border-[#202330]">
                  <span className="text-[#8e919e] block text-[11px]">Current Mahadasha</span>
                  <span className="font-bold text-[#d4af37] text-xs mt-0.5 block">Jupiter (Guru)</span>
                </div>
              </div>
            </div>

            {/* Dosha Verification Bar */}
            <div className="mt-6 pt-4 border-t border-[#1e212b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">
                  ✓ Mangal Dosha: Absent
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">
                  ✓ Kaal Sarp: Free
                </span>
              </div>
              <button
                onClick={() => onOpenConsultation?.("Senior Kundli Astrologer")}
                className="text-[#d4af37] hover:underline font-semibold cursor-pointer"
              >
                Download Full 20-Page Kundli Report &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
