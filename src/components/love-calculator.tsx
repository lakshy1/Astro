"use client";

import { useState } from "react";

interface LoveCalculatorProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

const SIGNS = [
  { name: "Aries", symbol: "♈", element: "Fire" },
  { name: "Taurus", symbol: "♉", element: "Earth" },
  { name: "Gemini", symbol: "♊", element: "Air" },
  { name: "Cancer", symbol: "♋", element: "Water" },
  { name: "Leo", symbol: "♌", element: "Fire" },
  { name: "Virgo", symbol: "♍", element: "Earth" },
  { name: "Libra", symbol: "♎", element: "Air" },
  { name: "Scorpio", symbol: "♏", element: "Water" },
  { name: "Sagittarius", symbol: "♐", element: "Fire" },
  { name: "Capricorn", symbol: "♑", element: "Earth" },
  { name: "Aquarius", symbol: "♒", element: "Air" },
  { name: "Pisces", symbol: "♓", element: "Water" },
];

function compute(a: string, b: string) {
  const s1 = SIGNS.find((s) => s.name === a);
  const s2 = SIGNS.find((s) => s.name === b);
  let total = 68;
  if (s1 && s2) {
    if (s1.element === s2.element) total = 94;
    else if (
      (s1.element === "Fire" && s2.element === "Air") ||
      (s1.element === "Air" && s2.element === "Fire") ||
      (s1.element === "Earth" && s2.element === "Water") ||
      (s1.element === "Water" && s2.element === "Earth")
    )
      total = 88;
  }
  return {
    total,
    romance: Math.min(99, total + 5),
    emotional: Math.min(99, total + 3),
    marriage: Math.min(99, total - 2),
    communication: Math.min(99, total - 4),
  };
}

export default function LoveCalculator({ onOpenConsultation }: LoveCalculatorProps) {
  const [sign1, setSign1] = useState("Aries");
  const [sign2, setSign2] = useState("Leo");
  const [shown, setShown] = useState<{ a: string; b: string } | null>({ a: "Aries", b: "Leo" });

  const r = shown ? compute(shown.a, shown.b) : null;
  const gunas = r ? Math.round((r.total / 100) * 36) : 0;
  const verdict = !r ? "" : r.total > 85 ? "Excellent match" : r.total > 75 ? "Good match" : "Workable match with effort";
  const factors = r
    ? [
        ["Romance", r.romance],
        ["Emotional bond", r.emotional],
        ["Marriage harmony", r.marriage],
        ["Communication", r.communication],
      ]
    : [];

  const opts = SIGNS.map((s) => (
    <option key={s.name} value={s.name}>
      {s.name} ({s.element})
    </option>
  ));

  return (
    <section id="love" className="section section-alt">
      <div className="wrap">
        <div className="mb-10 max-w-2xl">
          <h2 className="h-section">Kundli matching</h2>
          <p className="sub">Compare two zodiac signs for a quick compatibility score out of 36 gunas.</p>
        </div>

        <div className="card mx-auto max-w-3xl p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShown({ a: sign1, b: sign2 });
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="love-s1" className="label">Boy&apos;s sign</label>
                <select id="love-s1" className="field" value={sign1} onChange={(e) => setSign1(e.target.value)}>{opts}</select>
              </div>
              <div>
                <label htmlFor="love-s2" className="label">Girl&apos;s sign</label>
                <select id="love-s2" className="field" value={sign2} onChange={(e) => setSign2(e.target.value)}>{opts}</select>
              </div>
            </div>
            <button type="submit" className="btn btn-brand btn-lg mt-6 w-full sm:w-auto">Check compatibility</button>
          </form>

          {r && shown && (
            <div className="mt-8 border-t border-line pt-8" aria-live="polite">
              <p className="text-sm text-muted">{shown.a} and {shown.b}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="tnum text-6xl font-extrabold leading-none tracking-tight">{gunas}</span>
                <span className="tnum text-2xl font-bold text-muted">/ 36 gunas</span>
              </p>
              <p className="mt-3 text-lg font-semibold">{verdict} <span className="tnum font-medium text-ink-2">({r.total}%)</span></p>

              <ul className="mt-6 space-y-4">
                {factors.map(([label, v]) => (
                  <li key={label as string}>
                    <div className="mb-1.5 flex justify-between text-[0.9375rem]">
                      <span className="font-medium">{label}</span>
                      <span className="tnum font-semibold">{v}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-bg-alt" role="presentation">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${v}%` }} />
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted">This is guidance based on zodiac elements, not a guarantee. A full chart-to-chart match is more detailed.</p>
              <button type="button" onClick={() => onOpenConsultation?.(`Matchmaking Specialist (${shown.a} + ${shown.b})`)} className="btn btn-outline mt-4">
                Get detailed matching report
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
