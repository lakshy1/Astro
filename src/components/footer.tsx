"use client";

import { Logo } from "./navbar";

interface FooterProps {
  onScrollToSection?: (sectionId: string) => void;
  onOpenConsultation?: (astrologerName?: string) => void;
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export default function Footer({ onScrollToSection, onOpenConsultation }: FooterProps) {
  const go = (id: string) => {
    if (onScrollToSection) onScrollToSection(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cols: { title: string; links: { label: string; run: () => void }[] }[] = [
    { title: "Horoscope", links: [
      { label: "Daily horoscope", run: () => go("horoscope") },
      { label: "Panchang & muhurat", run: () => go("panchang") },
      { label: "Tarot reading", run: () => go("tarot") },
    ] },
    { title: "Free services", links: [
      { label: "Free Janam Kundli", run: () => go("kundli") },
      { label: "Kundli Milan", run: () => go("love") },
      { label: "Reports & poojas", run: () => go("services") },
    ] },
    { title: "Consult", links: [
      { label: "Chat with astrologer", run: () => onOpenConsultation?.() },
      { label: "Call an astrologer", run: () => onOpenConsultation?.() },
      { label: "All astrologers", run: () => go("astrologers") },
    ] },
    { title: "Company", links: ["About", "Pricing", "Refund policy", "Privacy", "Terms", "Disclaimer"].map((l) => ({ label: l, run: () => go("hero") })) },
  ];

  const link = "text-ink-2 hover:text-white transition-colors cursor-pointer text-sm min-h-9 inline-flex items-center text-left";

  return (
    <footer className="border-t border-line bg-[rgba(4,7,22,0.6)] text-white pt-14 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 pb-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-ink-2 max-w-xs">Talk to verified astrologers by chat or call, in your language.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Download on the App Store", "Get it on Google Play"].map((t) => (
                <button key={t} type="button" className="btn btn-sm border border-white/40 text-white hover:bg-white/10">{t}</button>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
              <ul className="list-none p-0 m-0">
                {c.links.map((l) => (
                  <li key={l.label}><button type="button" onClick={l.run} className={link}>{l.label}</button></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col gap-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0 text-sm text-white">
            {["Private & confidential", "Verified astrologers", "Secure payments"].map((b) => (
              <li key={b} className="flex items-center gap-2"><span className="text-brand"><Check /></span>{b}</li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row md:justify-between gap-2 text-sm text-ink-2">
            <p>© 2026 AstroSpace</p>
            <p>Astrology is guidance, not medical, legal or financial advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
