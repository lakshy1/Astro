"use client";

import { useEffect, useId, useState } from "react";

interface NavbarProps {
  onOpenConsultation?: (astrologerName?: string) => void;
  onScrollToSection?: (sectionId: string) => void;
}

const LINKS = [
  { id: "astrologers", label: "Astrologers" },
  { id: "horoscope", label: "Horoscope" },
  { id: "kundli", label: "Free Kundli" },
  { id: "love", label: "Kundli Matching" },
  { id: "tarot", label: "Tarot" },
  { id: "panchang", label: "Panchang" },
  { id: "blog", label: "Blog" },
];

export function Logo() {
  const id = useId();
  return (
    <span className="flex items-center gap-2.5 font-display text-[1.6rem] font-semibold tracking-tight text-ink">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6e3a8" />
            <stop offset=".5" stopColor="#d9b25f" />
            <stop offset="1" stopColor="#a8792f" />
          </linearGradient>
        </defs>
        {/* Zodiac wheel: outer ring, 12 ticks, eight-point star */}
        <circle cx="16" cy="16" r="14.5" fill="none" stroke={`url(#${id})`} strokeWidth="1.3" />
        <circle cx="16" cy="16" r="11" fill="none" stroke={`url(#${id})`} strokeWidth="0.7" opacity="0.7" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          const p = (r: number, f: (x: number) => number) => (16 + f(a) * r).toFixed(2);
          return (
            <line key={i} x1={p(11, Math.cos)} y1={p(11, Math.sin)} x2={p(14.5, Math.cos)} y2={p(14.5, Math.sin)} stroke={`url(#${id})`} strokeWidth="0.8" />
          );
        })}
        <path d="M16 6.5l1.7 6.1 6.1-1.6-4.4 4.6 4.4 4.6-6.1-1.6L16 24.7l-1.7-6.1-6.1 1.6 4.4-4.6-4.4-4.6 6.1 1.6Z" fill={`url(#${id})`} />
      </svg>
      AstroSpace
    </span>
  );
}

export default function Navbar({ onOpenConsultation, onScrollToSection }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    onScrollToSection?.(id);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "bg-bg/75 backdrop-blur-xl shadow-[0_1px_0_var(--line)]" : "bg-transparent"}`}>
      <div className="wrap flex h-[4.25rem] items-center gap-6">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go("hero");
          }}
          aria-label="AstroSpace home"
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5 ml-2">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(l.id);
              }}
              className="rounded-full px-3 py-2 text-[0.9rem] font-semibold text-ink-2 hover:bg-bg-alt hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className="hidden sm:grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-bold text-ink-2 hover:bg-bg-alt"
            aria-label={`Language: ${lang === "EN" ? "English" : "Hindi"}. Switch language`}
          >
            {lang === "EN" ? "EN" : "हि"}
          </button>
          <span className="hidden md:inline-flex">
            <button className="btn btn-outline">Sign in</button>
          </span>
          <button className="btn btn-brand" onClick={() => onOpenConsultation?.()}>
            Chat free
          </button>
          <button
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full hover:bg-bg-alt"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M5 5l12 12M17 5 5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden border-t border-line bg-bg/95 backdrop-blur-xl">
          <div className="wrap flex flex-col py-2">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className="border-b border-line py-3.5 font-semibold"
              >
                {l.label}
              </a>
            ))}
            <button className="btn btn-outline mt-4">Sign in</button>
          </div>
        </nav>
      )}
    </header>
  );
}
