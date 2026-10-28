"use client";

import { useState } from "react";

interface KundliGeneratorProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const LAGNA_SIGN = 5; // Leo

const PLANETS = [
  { name: "Sun", abbr: "Su", house: 1, deg: "24°12′" },
  { name: "Moon", abbr: "Mo", house: 10, deg: "11°48′" },
  { name: "Mars", abbr: "Ma", house: 4, deg: "07°30′" },
  { name: "Mercury", abbr: "Me", house: 2, deg: "03°05′" },
  { name: "Jupiter", abbr: "Ju", house: 7, deg: "18°22′" },
  { name: "Venus", abbr: "Ve", house: 12, deg: "26°41′" },
  { name: "Saturn", abbr: "Sa", house: 6, deg: "14°09′" },
  { name: "Rahu", abbr: "Ra", house: 8, deg: "09°55′" },
  { name: "Ketu", abbr: "Ke", house: 2, deg: "09°55′" },
];

// Centre points of the 12 houses in a North Indian chart (400x400 viewBox).
const HOUSE_POS: [number, number][] = [
  [200, 105], [100, 52], [52, 100], [100, 200], [52, 300], [100, 348],
  [200, 300], [300, 348], [348, 300], [300, 200], [348, 100], [300, 52],
];

const signOf = (house: number) => ((LAGNA_SIGN - 1 + house - 1) % 12) + 1;

const CITIES = ["New Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal", "Patna", "Varanasi", "Kochi", "Indore"];

const INCLUDED = ["Lagna (ascendant) chart", "Planet positions with sign, house and degree", "Your Moon nakshatra", "Manglik check", "Current Vimshottari dasha"];

function Chart({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" role="img" aria-label={label} style={{ filter: "drop-shadow(0 0 14px rgba(217,178,95,0.3))" }}>
      <rect x="4" y="4" width="392" height="392" fill="rgba(255,255,255,0.03)" stroke="var(--line-strong)" strokeWidth="2" />
      <polygon points="200,4 298,102 200,200 102,102" fill="var(--brand-tint)" />
      <path d="M4 4 396 396M396 4 4 396" stroke="var(--line-strong)" strokeWidth="1.5" />
      <polygon points="200,4 396,200 200,396 4,200" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {HOUSE_POS.map(([x, y], i) => {
        const h = i + 1;
        const here = PLANETS.filter((p) => p.house === h);
        return (
          <g key={h} textAnchor="middle">
            <text x={x} y={y - (h === 1 ? 22 : 14)} fontSize="13" fill={h === 1 ? "var(--brand-ink)" : "var(--muted)"} fontWeight={h === 1 ? 800 : 500}>
              {h === 1 ? "1 Lagna" : signOf(h)}
            </text>
            {here.map((p, j) => (
              <text key={p.abbr} x={x + (j % 2 ? 14 : -14) * (here.length > 1 ? 1 : 0)} y={y + 6 + Math.floor(j / 2) * 18} fontSize="15" fontWeight="700" fill={p.name === "Sun" || p.name === "Moon" ? "var(--gold)" : "var(--ink)"}>
                {p.abbr}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function KundliGenerator({ onOpenConsultation }: KundliGeneratorProps) {
  const [formData, setFormData] = useState({
    name: "Arjun Sharma",
    gender: "Male",
    dob: "1998-08-15",
    tob: "08:30",
    pob: "New Delhi",
  });
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!formData.dob) next.dob = "Choose your date of birth.";
    if (!timeUnknown && !formData.tob) next.tob = "Enter your time of birth, or tick Time unknown.";
    if (!formData.pob.trim()) next.pob = "Enter your city of birth.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 600);
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={`k-${k}-err`} role="alert" className="mt-1.5 text-sm font-medium text-sindoor">
        {errors[k]}
      </p>
    ) : null;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `k-${k}-err` : undefined });
  const set = (k: keyof typeof formData, v: string) => setFormData({ ...formData, [k]: v });

  return (
    <section id="kundli" className="section">
      <div className="wrap">
        <div className="mb-10 max-w-2xl">
          <h2 className="h-section">Free Kundli</h2>
          <p className="sub">Enter your birth details to see your Lagna chart and planet positions.</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[5fr_7fr]">
          <form onSubmit={handleGenerate} noValidate className="card p-6 sm:p-8">
            <h3 className="text-xl font-bold">Get your free Kundli</h3>
            <p className="mt-1 text-sm text-muted">An accurate time and place of birth give the most reliable chart.</p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="k-name" className="label">Full name <span className="font-normal text-muted">(optional)</span></label>
                <input id="k-name" className="field" type="text" autoComplete="name" value={formData.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Rahul Verma" {...inv("name")} />
                {err("name")}
              </div>

              <div>
                <span id="k-gender-l" className="label">Gender</span>
                <div role="group" aria-labelledby="k-gender-l" className="flex flex-wrap gap-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <button key={g} type="button" className="chip" aria-pressed={formData.gender === g} onClick={() => set("gender", g)}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="k-dob" className="label">Date of birth</label>
                  <input id="k-dob" className="field" type="date" value={formData.dob} onChange={(e) => set("dob", e.target.value)} {...inv("dob")} />
                  {err("dob")}
                </div>
                <div>
                  <label htmlFor="k-tob" className="label">Time of birth</label>
                  <input id="k-tob" className="field disabled:opacity-50" type="time" disabled={timeUnknown} value={timeUnknown ? "12:00" : formData.tob} onChange={(e) => set("tob", e.target.value)} aria-describedby={errors.tob ? "k-tob-err" : "k-tob-hint"} aria-invalid={!!errors.tob} />
                  <label className="mt-2 flex items-center gap-2 text-sm text-ink-2">
                    <input type="checkbox" className="size-4 accent-[var(--brand)]" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} />
                    Time unknown
                  </label>
                  <p id="k-tob-hint" className="mt-1.5 text-sm text-muted">Exact time fixes your Lagna (ascendant). Don&apos;t know it? Tick &apos;Time unknown&apos; and we&apos;ll use 12:00 noon.</p>
                  {err("tob")}
                </div>
              </div>

              <div>
                <label htmlFor="k-pob" className="label">Place of birth</label>
                <input id="k-pob" className="field" type="text" list="k-cities" autoComplete="off" value={formData.pob} onChange={(e) => set("pob", e.target.value)} placeholder="City, State" {...inv("pob")} />
                <datalist id="k-cities">
                  {CITIES.map((c) => <option key={c} value={c} />)}
                </datalist>
                {err("pob")}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-brand btn-lg mt-7 w-full">
              {loading ? "Calculating…" : "Generate free Kundli"}
            </button>
            <p className="mt-3 text-center text-sm text-muted">Your birth details are private and never shared.</p>
          </form>

          <div className="card p-6 sm:p-8" aria-live="polite">
            {!generated ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                  <h3 className="text-xl font-bold">What your free Kundli includes</h3>
                  <span className="tag tag-brand">Sample — yours appears after you generate</span>
                </div>
                <div className="mx-auto my-6 w-full max-w-xs opacity-70" aria-hidden="true">
                  <Chart label="Sample Lagna chart" />
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {INCLUDED.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.9375rem] text-ink-2">
                      <span className="mt-0.5 text-leaf" aria-hidden="true">&#10003;</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <div className="border-b border-line pb-4">
                  <h3 className="text-xl font-bold">Lagna chart{formData.name.trim() ? ` for ${formData.name.trim()}` : ""}</h3>
                  <p className="mt-1 text-sm text-muted">
                    <span className="tnum">{formData.dob}</span> at <span className="tnum">{timeUnknown ? "12:00 (assumed)" : formData.tob}</span>, {formData.pob}. Ascendant: {SIGNS[LAGNA_SIGN - 1]}.
                  </p>
                </div>

                <div className="mx-auto my-6 w-full max-w-sm">
                  <Chart label={`North Indian Lagna chart with ${SIGNS[LAGNA_SIGN - 1]} ascendant`} />
                  <p className="mt-2 text-center text-sm text-muted">Numbers show the zodiac sign in each house (1 = Aries).</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[0.9375rem]">
                    <caption className="sr-only">Planet positions</caption>
                    <thead>
                      <tr className="border-b border-line-strong text-muted">
                        <th scope="col" className="py-2 pr-3 font-semibold">Planet</th>
                        <th scope="col" className="py-2 pr-3 font-semibold">Sign</th>
                        <th scope="col" className="py-2 pr-3 font-semibold">House</th>
                        <th scope="col" className="py-2 font-semibold">Degree</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PLANETS.map((p) => (
                        <tr key={p.name} className="border-b border-line">
                          <th scope="row" className="py-2 pr-3 font-semibold">{p.name}</th>
                          <td className="py-2 pr-3 text-ink-2">{SIGNS[signOf(p.house) - 1]}</td>
                          <td className="tnum py-2 pr-3 text-ink-2">{p.house}</td>
                          <td className="tnum py-2 text-ink-2">{p.deg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button type="button" onClick={() => onOpenConsultation?.("Kundli Astrologer")} className="btn btn-outline mt-6 w-full sm:w-auto">
                  Talk to an astrologer about this chart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
