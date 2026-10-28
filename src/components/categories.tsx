"use client";

const P = { strokeLinecap: "round", strokeLinejoin: "round" } as const;
const cats: { name: string; d: React.ReactNode }[] = [
  { name: "Love", d: <path {...P} d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" /> },
  { name: "Marriage", d: <><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></> },
  { name: "Career", d: <><rect x="3" y="8" width="18" height="12" rx="2" /><path {...P} d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" /></> },
  { name: "Business & money", d: <><circle cx="12" cy="12" r="9" /><path {...P} d="M9 9.5h5a1.5 1.5 0 010 3h-4a1.5 1.5 0 000 3h5" /></> },
  { name: "Health", d: <path {...P} d="M12 5v14M5 12h14" /> },
  { name: "Family", d: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path {...P} d="M3 20c0-3 2.5-5 5-5s5 2 5 5M15 15c3 0 6 1.5 6 5" /></> },
  { name: "Education", d: <path {...P} d="M2 9l10-5 10 5-10 5-10-5zM6 11.5V16c3 2.5 9 2.5 12 0v-4.5" /> },
  { name: "Legal issues", d: <path {...P} d="M12 4v16M6 20h12M5 8h14M5 8l-3 7a3 3 0 006 0L5 8zm14 0l-3 7a3 3 0 006 0l-3-7z" /> },
  { name: "Foreign travel", d: <><circle cx="12" cy="12" r="9" /><path {...P} d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></> },
  { name: "Child birth", d: <><circle cx="12" cy="9" r="4" /><path {...P} d="M5 20c0-4 3-6 7-6s7 2 7 6" /></> },
  { name: "Property", d: <path {...P} d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" /> },
  { name: "Vastu", d: <><rect x="4" y="4" width="16" height="16" rx="1" /><path {...P} d="M12 4v16M4 12h16" /></> },
];

export default function Categories({ onOpenConsultation }: { onOpenConsultation?: (name?: string) => void }) {
  return (
    <section id="categories" className="section">
      <div className="wrap">
        <div className="mb-8">
          <h2 className="h-section">Find an astrologer for your question</h2>
          <p className="sub">Pick a topic and we will match you with a verified expert.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {cats.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => onOpenConsultation?.()}
              className="card card-hover flex items-center gap-3 p-3 min-h-14 text-left cursor-pointer"
            >
              <span className="w-10 h-10 shrink-0 rounded-xl bg-brand-tint text-brand-ink flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  {c.d}
                </svg>
              </span>
              <span className="text-sm font-semibold text-ink leading-tight">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
