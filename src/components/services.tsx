"use client";

interface ServicesProps {
  onScrollToSection?: (sectionId: string) => void;
  onOpenConsultation?: (astrologerName?: string) => void;
}

interface Item {
  title: string;
  desc: string;
  action: string;
  price: number | null;
  was?: number;
  from?: boolean;
  section?: string;
  consult?: string;
}

const items: Item[] = [
  { title: "Detailed Kundli report", desc: "60+ page birth chart analysis with planets, houses and Vimshottari dasha.", action: "Buy report", price: 499, was: 999, section: "kundli" },
  { title: "Career report", desc: "Strengths, ideal fields and favourable periods for job changes.", action: "Buy report", price: 399, was: 799, consult: "Career Astrologer" },
  { title: "Marriage report", desc: "Timing, partner traits and compatibility factors from your chart.", action: "Buy report", price: 599, was: 1199, consult: "Marriage Astrologer" },
  { title: "Lal Kitab report", desc: "Lal Kitab debts, planetary positions and simple home remedies.", action: "Buy report", price: 699, consult: "Lal Kitab Expert" },
  { title: "Book a pooja", desc: "Performed by verified priests at Kashi, Ujjain and Haridwar, with prasad delivered.", action: "Book", price: 1100, from: true, consult: "Vedic Temple Pandit" },
  { title: "Gemstone recommendation", desc: "Which stone suits your chart, with weight, metal and wearing day.", action: "Buy report", price: 299, consult: "Gemstone Expert" },
  { title: "Free Janam Kundli", desc: "Instant Vedic birth chart with planetary degrees and Lagna.", action: "Generate", price: null, section: "kundli" },
  { title: "Kundli Milan", desc: "36-guna Ashtakoota matching for marriage compatibility.", action: "Check match", price: null, section: "love" },
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function Services({ onScrollToSection, onOpenConsultation }: ServicesProps) {
  const act = (s: Item) => {
    if (s.consult) {
      onOpenConsultation?.(s.consult);
    } else if (s.section) {
      if (onScrollToSection) onScrollToSection(s.section);
      else document.getElementById(s.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="section section-alt">
      <div className="wrap">
        <div className="mb-8">
          <h2 className="h-section">Kundli reports & services</h2>
          <p className="sub">Detailed reports and poojas, prepared by verified astrologers.</p>
        </div>

        <ul className="scroll-x lg:grid lg:grid-cols-4 gap-4 list-none p-0 m-0">
          {items.map((s) => (
            <li key={s.title} className="card flex flex-col p-5 min-w-[16rem] lg:min-w-0">
              <h3 className="text-base font-bold text-ink">{s.title}</h3>
              <p className="text-sm text-ink-2 mt-1.5 flex-1">{s.desc}</p>
              <div className="mt-4 flex items-center gap-2 flex-wrap tnum">
                {s.price === null ? (
                  <span className="tag tag-leaf">Free</span>
                ) : (
                  <>
                    {s.from && <span className="text-sm text-muted">from</span>}
                    <span className="text-lg font-extrabold text-ink">{inr(s.price)}</span>
                    {s.was && (
                      <>
                        <span className="text-sm text-muted line-through">{inr(s.was)}</span>
                        <span className="tag tag-sindoor">{Math.round(100 - (s.price / s.was) * 100)}% off</span>
                      </>
                    )}
                  </>
                )}
              </div>
              <button type="button" onClick={() => act(s)} className="btn btn-ink btn-sm mt-4 w-full">
                {s.action}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
