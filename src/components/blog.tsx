"use client";

import Image from "next/image";

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "Solar Eclipse (Surya Grahan) 2026: Sutak Timings & Rashi Remedies",
      category: "Planetary Transits",
      readTime: "4 min read",
      date: "27 Oct 2026",
      image: "/celestial_zodiac_wheel.jpg",
      snippet:
        "Understand the astronomical and Vedic significance of the upcoming solar transit and essential remedies to harmonize natal Sun placements.",
    },
    {
      id: 2,
      title: "How to Read Your Own Kundli: A Guide to the 12 Vedic Bhavas",
      category: "Vedic Astrology",
      readTime: "6 min read",
      date: "26 Oct 2026",
      image: "/mystic_tarot_deck.jpg",
      snippet:
        "Demystifying houses of profession (10th), marriage (7th), and wealth (2nd & 11th). Learn what planets mean in quadrant houses.",
    },
    {
      id: 3,
      title: "Saturn (Shani) Transit in Pisces: Key Karmic Turning Points",
      category: "Shani Remedies",
      readTime: "5 min read",
      date: "25 Oct 2026",
      image: "/vedic_astrologer_male.jpg",
      snippet:
        "Lord Shani rewards authentic spiritual discipline and methodical labor. Discover which 4 signs will witness major financial breakthroughs.",
    },
    {
      id: 4,
      title: "The Power of 3-Card Tarot: Unlocking Subconscious Patterns",
      category: "Tarot & Archetypes",
      readTime: "4 min read",
      date: "24 Oct 2026",
      image: "/mystic_tarot_deck.jpg",
      snippet:
        "How the interplay of Past Karma, Present Realities, and Future Destiny mirrors ancient Vedic synchronicity principles.",
    },
    {
      id: 5,
      title: "Vedic Vastu Shastra for Prosperity in Contemporary Residences",
      category: "Vastu Shastra",
      readTime: "5 min read",
      date: "23 Oct 2026",
      image: "/vedic_astrologer_female.jpg",
      snippet:
        "Practical North-East (Ishanya) corner alignments to invite peaceful family resonance and steady financial growth.",
    },
    {
      id: 6,
      title: "Navagraha Shanti: Daily Mantras for Planetary Harmony",
      category: "Spiritual Remedies",
      readTime: "3 min read",
      date: "22 Oct 2026",
      image: "/celestial_zodiac_wheel.jpg",
      snippet:
        "Ancient classical chants to balance afflicted planets and cultivate fortunate natal placements through quiet daily discipline.",
    },
  ];

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d4af37]">
                Spiritual Wisdom & Insights
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Astrology Journal & Research
            </h2>
            <p className="text-[#8e919e] text-sm sm:text-base mt-2 max-w-xl">
              Classical Vedic perspectives, planetary ephemeris breakdowns, and spiritual remedies penned by master astrologers.
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-[#12141c] hover:bg-[#181a24] border border-[#222532] text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer self-start md:self-auto">
            View All Research Articles &rarr;
          </button>
        </div>

        {/* 6 Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {articles.map((item) => (
            <article
              key={item.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Article Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#14161f]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={220}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#08090d]/90 backdrop-blur-md text-[#d4af37] border border-[#242838] text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#8e919e] mb-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#d4af37] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8e919e] leading-relaxed line-clamp-2">
                    {item.snippet}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="text-xs font-medium text-[#d4af37] flex items-center gap-1.5 cursor-pointer">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}