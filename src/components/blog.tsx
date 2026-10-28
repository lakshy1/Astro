"use client";

import Image from "next/image";

export default function Blog() {
  const articles = [
    {
      id: 1,
      image: "/celestial_zodiac_wheel.jpg",
      title: "Solar Eclipse (Surya Grahan) 2026: Sutak Timings & Rashi Remedies",
      category: "Planetary Transits",
      readTime: "4 min read",
      date: "27 Oct 2026",
    },
    {
      id: 2,
      image: "/mystic_tarot_deck.jpg",
      title: "How to Read Your Own Kundli: A Guide to the 12 Vedic Bhavas",
      category: "Vedic Astrology",
      readTime: "6 min read",
      date: "26 Oct 2026",
    },
    {
      id: 3,
      image: "/vedic_astrologer_male.jpg",
      title: "Saturn (Shani) Transit in Pisces: Key Karmic Turning Points",
      category: "Shani Remedies",
      readTime: "5 min read",
      date: "25 Oct 2026",
    },
    {
      id: 4,
      image: "/mystic_tarot_deck.jpg",
      title: "The Power of 3-Card Tarot: Unlocking Subconscious Patterns",
      category: "Tarot & Archetypes",
      readTime: "4 min read",
      date: "24 Oct 2026",
    },
    {
      id: 5,
      image: "/vedic_astrologer_female.jpg",
      title: "Vedic Vastu Shastra for Prosperity in Contemporary Residences",
      category: "Vastu Shastra",
      readTime: "5 min read",
      date: "23 Oct 2026",
    },
    {
      id: 6,
      image: "/celestial_zodiac_wheel.jpg",
      title: "Navagraha Shanti: Daily Mantras for Planetary Harmony",
      category: "Spiritual Remedies",
      readTime: "3 min read",
      date: "22 Oct 2026",
    },
  ];

  return (
    <section id="blog" className="section">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="h-section">Astrology articles</h2>
            <p className="sub">Guides on kundli, transits and remedies from our astrologers.</p>
          </div>
          <button type="button" className="btn btn-outline self-start md:self-auto">View all articles</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.slice(0, 4).map((a) => (
            <article key={a.id} className="card card-hover flex flex-col overflow-hidden">
              <Image src={a.image} alt="" width={400} height={225} className="aspect-[16/9] w-full object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <span className="tag tag-brand self-start">{a.category}</span>
                <h3 className="mt-3 text-base font-bold text-ink leading-snug flex-1">{a.title}</h3>
                <p className="mt-3 text-sm text-muted tnum">{a.date} · {a.readTime}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
