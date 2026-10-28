"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const CosmosScene = dynamic(() => import("./cosmos-scene"), { ssr: false });

interface HeroProps {
  onOpenConsultation?: (astrologerName?: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

const ONLINE = [
  { name: "Acharya Sreejita", skills: "Vedic, Tarot", exp: 12, rating: "4.9", price: 30, img: "/vedic_astrologer_female.jpg", wait: "Available" },
  { name: "Pandit Minesh Shastri", skills: "Vedic, KP", exp: 22, rating: "5.0", price: 40, img: "/vedic_astrologer_male.jpg", wait: "Available" },
  { name: "Dr. Sarika Upadhyay", skills: "Nadi, Palmistry", exp: 15, rating: "4.9", price: 35, img: null, wait: "Wait ~3 min" },
];

const STATS = [
  { k: "5 Cr+", v: "people guided" },
  { k: "50,000+", v: "verified astrologers" },
  { k: "13", v: "languages" },
  { k: "4.8★", v: "from 19L+ reviews" },
];

const ACTIVITY = [
  "Priya from Pune started a chat with Acharya Sreejita",
  "Rahul from Mumbai booked a Saturn shanti pooja",
  "Neha from Hyderabad generated her free Kundli",
  "Arjun from Delhi matched Kundlis: 28 of 36 gunas",
  "Simran from Ludhiana called Pandit Minesh Shastri",
  "Karthik from Chennai read his Scorpio horoscope",
];

const QUICK = [
  { title: "Chat with astrologer", sub: "Text consult, first chat free", section: "astrologers", icon: "M7 9h10M7 13h6M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12Z" },
  { title: "Call an astrologer", sub: "Private voice call in seconds", section: "astrologers", icon: "M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 5.3 5.3l1.4-2.2L19 14.5V18a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" },
  { title: "Free Kundli", sub: "Full birth chart in 60 seconds", section: "kundli", icon: "M12 3 21 12 12 21 3 12Z M3 3h18v18H3Z" },
  { title: "Kundli matching", sub: "36-guna compatibility score", section: "love", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" },
];

export default function Hero({ onOpenConsultation, onScrollToSection }: HeroProps) {
  return (
    <section id="hero" className="pt-[6.5rem] sm:pt-28">
      <div className="wrap grid items-center gap-10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-leaf-tint px-3 py-1.5 text-sm font-semibold text-leaf">
            <span className="dot-live" aria-hidden="true" />
            <span className="tnum">1,240</span> astrologers online now
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-balance">
            Talk to a verified astrologer <span className="text-aurora">in under a minute</span>
          </h1>
          <ul className="mt-6 space-y-2.5 text-[1.0625rem] text-ink-2">
            {["First chat free for new users", "Average reply in 12 seconds", "Chats are private and never shared"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="var(--brand-tint)" />
                  <path d="m6 10.2 2.6 2.6L14 7.5" fill="none" stroke="var(--brand-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="btn btn-brand btn-lg" onClick={() => onOpenConsultation?.()}>
              Start free chat
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => onScrollToSection?.("kundli")}>
              Get free Kundli
            </button>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.v}>
                <dt className="text-2xl font-extrabold tracking-tight tnum">{s.k}</dt>
                <dd className="mt-0.5 text-sm text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3D cosmos with the live astrologer panel floating in front */}
        <div className="relative">
          <CosmosScene className="relative h-[380px] sm:h-[480px] -mx-4 sm:mx-0" />
          <p className="pointer-events-none absolute right-2 top-3 text-xs text-muted">Drag to rotate</p>
        <div className="card relative z-10 -mt-24 p-2 sm:-mt-32 sm:p-3">
          <div className="flex items-center justify-between px-3 pt-2 pb-3">
            <p className="font-bold">Available right now</p>
            <button className="text-sm font-semibold text-brand-ink hover:underline" onClick={() => onScrollToSection?.("astrologers")}>
              See all
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {ONLINE.map((a) => (
              <li key={a.name} className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-line p-3">
                <div className="relative shrink-0">
                  {a.img ? (
                    <Image src={a.img} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                  ) : (
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-indigo-2 text-lg font-bold text-white">SU</span>
                  )}
                  <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-leaf" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{a.name}</p>
                  <p className="truncate text-sm text-muted">
                    {a.skills} · {a.exp} yrs
                  </p>
                  <p className="mt-0.5 text-sm">
                    <span className="font-semibold">★ {a.rating}</span>
                    <span className="ml-2 font-bold tnum">₹{a.price}/min</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <button className="btn btn-ink btn-sm" onClick={() => onOpenConsultation?.(a.name)} aria-label={`Chat with ${a.name}`}>
                    Chat
                  </button>
                  <span className={`text-xs font-semibold ${a.wait === "Available" ? "text-leaf" : "text-muted"}`}>{a.wait}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="px-3 pt-3 pb-1.5 text-sm text-muted">
            Every astrologer passes a qualification check, panel interview and live audits before going online.
          </p>
        </div>
        </div>
      </div>

      {/* Live activity */}
      <div className="ticker border-y border-line bg-white/[0.03] py-3 overflow-hidden" aria-label="Recent activity">
        <ul className="ticker-track flex w-max gap-10 text-sm text-ink-2">
          {[...ACTIVITY, ...ACTIVITY].map((t, i) => (
            <li key={i} className="flex items-center gap-2 whitespace-nowrap" aria-hidden={i >= ACTIVITY.length}>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick actions */}
      <div className="wrap grid grid-cols-1 gap-3 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {QUICK.map((q) => (
          <button
            key={q.title}
            onClick={() => (q.section === "astrologers" ? onOpenConsultation?.() : onScrollToSection?.(q.section))}
            className="card card-hover flex items-center gap-3.5 p-4 text-left sm:p-5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand-ink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                <path d={q.icon} />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-bold leading-tight">{q.title}</span>
              <span className="mt-0.5 block text-sm text-muted leading-snug">{q.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
