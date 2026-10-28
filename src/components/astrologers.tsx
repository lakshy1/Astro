"use client";

import { useState } from "react";
import Image from "next/image";

interface AstrologersProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

export default function Astrologers({ onOpenConsultation }: AstrologersProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterSearch, setFilterSearch] = useState("");

  const categories = [
    "All",
    "Vedic Astrology",
    "Tarot Reading",
    "Numerology",
    "Love & Marriage",
    "Career & Wealth",
  ];

  const astrologerList = [
    {
      id: "1",
      name: "Acharya Sreejita",
      title: "Gold Medalist Vedic & Tarot Master",
      category: ["Vedic Astrology", "Tarot Reading", "Love & Marriage"],
      experience: "12 yrs exp",
      languages: "English, Hindi, Bengali",
      rating: "4.98",
      orders: "4,820",
      price: "₹30/min",
      originalPrice: "₹60",
      online: true,
      image: "/vedic_astrologer_female.jpg",
      credentials: "B.H.U. Jyotish Visharad",
      badge: "Top Choice",
    },
    {
      id: "2",
      name: "Pandit Minesh Shastri",
      title: "Senior Vedic & KP System Authority",
      category: ["Vedic Astrology", "Career & Wealth"],
      experience: "22 yrs exp",
      languages: "English, Hindi, Sanskrit",
      rating: "4.99",
      orders: "8,140",
      price: "₹40/min",
      originalPrice: "₹80",
      online: true,
      image: "/vedic_astrologer_male.jpg",
      credentials: "Vedic Parashari Scholar",
      badge: "Celebrity Astrologer",
    },
    {
      id: "3",
      name: "Dr. Sarika Upadhyay",
      title: "Nadi Astrology & Palmistry Specialist",
      category: ["Vedic Astrology", "Love & Marriage"],
      experience: "19 yrs exp",
      languages: "Hindi, Marathi, English",
      rating: "4.94",
      orders: "14,200",
      price: "₹50/min",
      originalPrice: "₹100",
      online: true,
      image: "/vedic_astrologer_female.jpg",
      credentials: "PhD in Astrological Sciences",
      badge: "High Demand",
    },
    {
      id: "4",
      name: "Tarot Serena",
      title: "Clairvoyant & Arcana Divination Expert",
      category: ["Tarot Reading", "Love & Marriage"],
      experience: "8 yrs exp",
      languages: "English, Hindi",
      rating: "4.96",
      orders: "9,450",
      price: "₹25/min",
      originalPrice: "₹50",
      online: true,
      image: "/vedic_astrologer_female.jpg",
      credentials: "Certified International Tarot Guild",
      badge: "Tarot Master",
    },
    {
      id: "5",
      name: "Acharya Gaurav",
      title: "Corporate Vastu & Gemology Consultant",
      category: ["Vedic Astrology", "Career & Wealth", "Numerology"],
      experience: "15 yrs exp",
      languages: "English, Hindi, Gujarati",
      rating: "4.91",
      orders: "6,200",
      price: "₹35/min",
      originalPrice: "₹70",
      online: true,
      image: "/vedic_astrologer_male.jpg",
      credentials: "All India Astrological Federation",
      badge: "Wealth Specialist",
    },
    {
      id: "6",
      name: "Pandit Roopa Sharma",
      title: "Prashna Kundli & Name Numerologist",
      category: ["Numerology", "Love & Marriage"],
      experience: "16 yrs exp",
      languages: "Hindi, Punjabi, English",
      rating: "4.97",
      orders: "11,800",
      price: "₹35/min",
      originalPrice: "₹70",
      online: true,
      image: "/vedic_astrologer_male.jpg",
      credentials: "Vedic Prashna Ratna",
      badge: "Trending",
    },
  ];

  const filtered = astrologerList.filter((ast) => {
    const matchesCategory =
      activeCategory === "All" || ast.category.includes(activeCategory);
    const matchesSearch =
      ast.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
      ast.title.toLowerCase().includes(filterSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="astrologers" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400">
                Verified Gurus Online Now
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Consult Top-Rated Astrologers
            </h2>
            <p className="text-[#8e919e] text-sm sm:text-base mt-2 max-w-xl">
              Strict 5-stage qualification screening. Experience 100% private, compassionate, and accurate answers for career, marriage, and life transitions.
            </p>
          </div>

          {/* Quick Filter Search */}
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by name or skill..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full bg-[#101217] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-[#8e919e] focus:outline-none transition-colors"
              />
              <svg
                className="w-3.5 h-3.5 text-[#8e919e] absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20 font-bold"
                  : "bg-[#101217] text-[#8e919e] hover:text-white hover:bg-[#161822] border border-[#1e212b]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Astrologers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ast) => (
            <div
              key={ast.id}
              className="luxury-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Badge & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-semibold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2 py-0.5 rounded">
                    {ast.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>

                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden border border-[#2a2f3f] shrink-0 bg-[#161822]">
                    <Image
                      src={ast.image}
                      alt={ast.name}
                      width={72}
                      height={72}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-white text-base hover:text-[#d4af37] transition-colors">
                        {ast.name}
                      </h3>
                      <svg className="w-4 h-4 text-[#d4af37]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs text-[#b0b3bf] font-medium mt-0.5 leading-snug">{ast.title}</p>
                    <p className="text-[11px] text-[#8e919e] mt-1">{ast.credentials}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2.5 px-3 rounded-xl bg-[#14161f] border border-[#202330] mb-4">
                  <div>
                    <span className="text-[10px] text-[#8e919e] block">Rating & Orders</span>
                    <span className="font-bold text-white">⭐ {ast.rating} ({ast.orders})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8e919e] block">Languages</span>
                    <span className="font-medium text-zinc-300 truncate block">{ast.languages}</span>
                  </div>
                </div>

                {/* Pricing Line */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-lg font-bold text-white">{ast.price}</span>
                  <span className="text-xs text-[#8e919e] line-through">{ast.originalPrice}</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    5 Mins Free
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[#1c1f2a]">
                <button
                  onClick={() => onOpenConsultation?.(ast.name)}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-3.5 h-3.5 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat Now</span>
                </button>
                <button
                  onClick={() => onOpenConsultation?.(ast.name)}
                  className="py-2.5 px-3 rounded-xl bg-[#14161f] hover:bg-[#1a1c28] border border-[#242838] hover:border-[#383d4f] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}