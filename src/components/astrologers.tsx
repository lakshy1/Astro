"use client";

import { useState } from "react";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating" | "experience";

const BADGE_INFO: Record<string, string> = {
  "Top Choice": "4.9+ rating over 5,000 consultations",
  "Celebrity Astrologer": "Featured by national media, 20+ years of practice",
  "High Demand": "10,000+ consultations completed",
  "Tarot Master": "Certified tarot guild member, 4.9+ rating",
  "Wealth Specialist": "Verified career and finance track record",
  Trending: "Most booked in the last 7 days",
};

const num = (v: string) => parseFloat(v.replace(/[^\d.]/g, "")) || 0;
import Image from "next/image";

interface AstrologersProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

export default function Astrologers({ onOpenConsultation }: AstrologersProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterSearch, setFilterSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("recommended");
  const [language, setLanguage] = useState("All");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [notified, setNotified] = useState<string[]>([]);

  const categories = [
    "All",
    "Vedic Astrology",
    "Tarot Reading",
    "Numerology",
    "Love & Marriage",
    "Career & Wealth",
  ];

  const astrologerList: {
    id: string; name: string; title: string; category: string[]; experience: string; languages: string;
    rating: string; orders: string; price: string; originalPrice?: string; online: boolean;
    status: "online" | "busy" | "offline"; waitMins?: number;
    image?: string; credentials: string; badge: string;
  }[] = [
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
      status: "online",
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
      status: "busy", waitMins: 4,
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
      status: "online",
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
      status: "busy", waitMins: 7,
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
      status: "offline",
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
      status: "online",
      image: "/vedic_astrologer_male.jpg",
      credentials: "Vedic Prashna Ratna",
      badge: "Trending",
    },
  ];

  const languageOptions = [
    "All",
    ...Array.from(new Set(astrologerList.flatMap((a) => a.languages.split(",").map((l) => l.trim())))).sort(),
  ];

  const filtered = astrologerList
    .filter((ast) => {
      const q = filterSearch.toLowerCase();
      const matchesCategory = activeCategory === "All" || ast.category.includes(activeCategory);
      const matchesSearch = ast.name.toLowerCase().includes(q) || ast.title.toLowerCase().includes(q);
      const matchesLang =
        language === "All" || ast.languages.split(",").map((l) => l.trim()).includes(language);
      const matchesOnline = !onlineOnly || ast.status === "online";
      return matchesCategory && matchesSearch && matchesLang && matchesOnline;
    })
    .map((ast, i) => ({ ast, i }))
    .sort((x, y) => {
      switch (sortBy) {
        case "price-asc": return num(x.ast.price) - num(y.ast.price) || x.i - y.i;
        case "price-desc": return num(y.ast.price) - num(x.ast.price) || x.i - y.i;
        case "rating": return num(y.ast.rating) - num(x.ast.rating) || x.i - y.i;
        case "experience": return num(y.ast.experience) - num(x.ast.experience) || x.i - y.i;
        default: return x.i - y.i;
      }
    })
    .map((r) => r.ast);

  const hasFilters =
    activeCategory !== "All" || filterSearch !== "" || language !== "All" || onlineOnly || sortBy !== "recommended";

  const clearFilters = () => {
    setActiveCategory("All");
    setFilterSearch("");
    setLanguage("All");
    setOnlineOnly(false);
    setSortBy("recommended");
  };

  const statusView = (ast: { status: "online" | "busy" | "offline"; waitMins?: number }) =>
    ast.status === "online"
      ? { text: "Online now", cls: "text-leaf", dot: "bg-leaf" }
      : ast.status === "busy"
        ? { text: `Busy · ~${ast.waitMins ?? 5} min wait`, cls: "text-gold", dot: "bg-gold" }
        : { text: "Offline · Notify me", cls: "text-muted", dot: "bg-muted" };

  const discount = (price: string, original?: string) => {
    const p = parseInt(price.replace(/\D/g, ""), 10);
    const o = original ? parseInt(original.replace(/\D/g, ""), 10) : 0;
    return o > p ? Math.round(((o - p) / o) * 100) : 0;
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .filter((w) => !/^(dr\.|pandit|acharya)$/i.test(w))
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <section id="astrologers" className="section">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="h-section">Talk to top-rated astrologers</h2>
            <p className="sub mt-2 max-w-xl">
              Every astrologer passes a 4-step verification covering identity, credentials, a skills test and a mock consultation.
            </p>
          </div>
          <a href="#astrologers" className="btn btn-outline self-start md:self-auto">
            View all astrologers
          </a>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="scroll-x flex gap-2 lg:flex-wrap" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="chip shrink-0"
                aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
            <button
              type="button"
              className="chip shrink-0"
              aria-pressed={onlineOnly}
              onClick={() => setOnlineOnly((v) => !v)}
            >
              <span className="dot-live mr-1.5" aria-hidden="true" />
              Online only
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="astro-search" className="label">Search by name or skill</label>
              <input
                id="astro-search"
                type="search"
                className="field"
                placeholder="e.g. Tarot, Sreejita"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="astro-lang" className="label">Language</label>
              <select id="astro-lang" className="field" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {languageOptions.map((l) => (
                  <option key={l} value={l}>{l === "All" ? "All languages" : l}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="astro-sort" className="label">Sort by</label>
              <select id="astro-sort" className="field" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6 text-sm">
          <p className="text-ink-2 tnum" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "astrologer" : "astrologers"}
            {hasFilters && (
              <button type="button" className="ml-3 text-brand-ink underline underline-offset-2" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </p>
          <p className="text-muted">
            Badges: <span className="text-ink-2">Top Choice</span> = {BADGE_INFO["Top Choice"]}. Hover any badge for its criteria. First chat is free.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-ink font-semibold">No astrologers match your filters.</p>
            <p className="text-muted mt-1">Try a different category, language or search term.</p>
            <button type="button" className="btn btn-outline mt-4" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((ast) => {
              const off = discount(ast.price, ast.originalPrice);
              const sv = statusView(ast);
              const perMin = num(ast.price);
              const isNotified = notified.includes(ast.id);
              return (
                <li key={ast.id} className="card card-hover p-5 flex flex-col">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      {ast.image ? (
                        <Image
                          src={ast.image}
                          alt={`Photo of ${ast.name}`}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover border border-line"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="w-16 h-16 rounded-full bg-indigo text-white flex items-center justify-center font-bold text-lg"
                        >
                          {initials(ast.name)}
                        </div>
                      )}
                      <span
                        title={sv.text}
                        className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-bg ${sv.dot}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-ink text-base leading-tight">{ast.name}</h3>
                        <svg className="w-4 h-4 shrink-0 text-brand-ink" viewBox="0 0 20 20" fill="currentColor" role="img" aria-label="Verified">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-ink-2 text-sm mt-0.5">{ast.title}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="tag tag-brand" title={BADGE_INFO[ast.badge] ?? ast.badge}>{ast.badge}</span>
                    {ast.category.map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>

                  <dl className="mt-3 text-sm text-ink-2 space-y-1">
                    <div className="flex gap-1.5"><dt className="text-muted">Languages:</dt><dd>{ast.languages}</dd></div>
                    <div className="flex gap-1.5"><dt className="text-muted">Experience:</dt><dd>{ast.experience.replace("yrs exp", "years")}</dd></div>
                  </dl>

                  <p className={`mt-2 text-sm font-semibold ${sv.cls}`}>{sv.text}</p>

                  <p className="mt-3 text-sm text-ink tnum">
                    <span aria-hidden="true" className="text-gold">★★★★★</span>{" "}
                    <span className="font-semibold">{ast.rating}</span>
                    <span className="text-muted"> · {ast.orders} orders</span>
                  </p>

                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 tnum">
                    <span className="text-xl font-bold text-ink">{ast.price}</span>
                    {ast.originalPrice && (
                      <span className="text-muted line-through">{ast.originalPrice}/min</span>
                    )}
                    {off > 0 && <span className="tag tag-sindoor">{off}% off</span>}
                  </div>
                  <p className="mt-1 text-sm text-ink-2 tnum">
                    10 min ≈ ₹{perMin * 10} <span className="text-muted">· </span>
                    <span className="text-leaf">First chat free</span>
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                    {ast.status === "offline" ? (
                      <button
                        type="button"
                        className="btn btn-outline"
                        disabled={isNotified}
                        onClick={() => setNotified((n) => [...n, ast.id])}
                      >
                        {isNotified ? "We'll notify you" : "Notify me"}
                      </button>
                    ) : (
                      <button type="button" className="btn btn-ink" onClick={() => onOpenConsultation?.(ast.name)}>
                        Chat
                      </button>
                    )}
                    <button type="button" className="btn btn-outline" disabled={ast.status === "offline"} onClick={() => onOpenConsultation?.(ast.name)}>
                      Call
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
