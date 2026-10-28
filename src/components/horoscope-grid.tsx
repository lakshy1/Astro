"use client";

import { useState, useSyncExternalStore } from "react";

interface HoroscopeGridProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

interface RashiData {
  name: string;
  sanskrit: string;
  symbol: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  ruling: string;
  todayRating: "Favorable" | "Neutral" | "Very Favorable";
  loveScore: number;
  careerScore: number;
  moneyScore: number;
  healthScore: number;
  luckyNumber: string;
  luckyColor: string;
  luckyStone: string;
  prediction: string;
}

const PERIODS = ["Today", "Tomorrow", "Weekly", "Monthly"] as const;

const SWATCH: Record<string, string> = {
  "Crimson Red": "#c2272d",
  "Emerald Green": "#0f7a55",
  "Warm Amber": "#e09a00",
  "Pearl White": "#f1ede6",
  "Saffron Gold": "#f4a300",
  "Forest Green": "#2d5a3d",
  "Rose Quartz": "#f0b6c2",
  "Deep Maroon": "#6b1a2a",
  "Royal Gold": "#d4a017",
  "Midnight Slate": "#2f3a4f",
  "Electric Blue": "#1e6bff",
  "Ocean Teal": "#12878a",
};

// Short per-area lines: [love, career, health, money]
const LINES: Record<string, [string, string, string, string]> = {
  Aries: ["Warmth returns at home; speak calmly and listen first.", "Promotion talks and new contracts move forward.", "Energy is high; channel it into a workout.", "Steady gains; avoid impulse buys."],
  Taurus: ["Venus deepens bonds with a partner.", "Steady progress; a senior notices your work.", "Good stamina; keep meals light.", "Earlier investments show returns."],
  Gemini: ["Playful conversation lifts the mood.", "Strong day for pitches and negotiations.", "Rest your eyes from screens.", "Hold off on large commitments."],
  Cancer: ["Intuition guides you to the right words.", "Trust your instinct in team decisions.", "Emotionally balanced; evening calm helps.", "A good day to settle family finances."],
  Leo: ["Generosity wins hearts today.", "Authority shines in reviews and meetings.", "Vitality is strong; stay hydrated.", "Income prospects look bright."],
  Virgo: ["Loosen up; spontaneity helps more than analysis.", "Detailed work earns praise.", "Routine habits keep you well.", "Careful budgeting pays off."],
  Libra: ["Harmony and romance are in the air.", "Joint deals and legal matters go smoothly.", "Well balanced; a walk refreshes you.", "Wise advice improves a money decision."],
  Scorpio: ["Honest talk deepens trust.", "You spot leverage others miss.", "Good recovery; avoid overwork.", "Lucrative terms emerge; clear old dues."],
  Sagittarius: ["Shared travel plans bring joy.", "Mentors and partners open doors.", "Excellent vitality; stay active.", "Fortune favours bold, planned moves."],
  Capricorn: ["Show care in small gestures.", "Discipline brings visible results.", "Stretch often; mind your posture.", "Slow, durable gains build security."],
  Aquarius: ["A fresh perspective excites a partner.", "Original ideas find backers.", "Mind is active; sleep on time.", "Networking leads to useful contacts."],
  Pisces: ["Tenderness heals an old grievance.", "Creative work earns appreciation.", "Quiet time restores your energy.", "Steady income; skip risky bets."],
};

const ELEMENT_DEFAULTS: Record<RashiData["element"], { color: string; number: string }> = {
  Fire: { color: "Crimson Red", number: "9" },
  Earth: { color: "Forest Green", number: "6" },
  Air: { color: "Electric Blue", number: "5" },
  Water: { color: "Pearl White", number: "2" },
};

export default function HoroscopeGrid({ onOpenConsultation }: HoroscopeGridProps) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("Today");
  const [selected, setSelected] = useState("Aries");
  const [mode, setMode] = useState<"moon" | "sun">("moon");

  const rashis: RashiData[] = [
    {
      name: "Aries",
      sanskrit: "Mesh",
      symbol: "♈",
      dates: "Mar 21 - Apr 19",
      element: "Fire",
      ruling: "Mars (Mangal)",
      todayRating: "Very Favorable",
      loveScore: 88,
      careerScore: 94,
      moneyScore: 85,
      healthScore: 90,
      luckyNumber: "9 & 18",
      luckyColor: "Crimson Red",
      luckyStone: "Red Coral (Moonga)",
      prediction:
        "Mars energizes your 10th house of profession. High executive clarity opens strategic discussions regarding promotions, new contracts, and long-range expansion. Maintain calm tact in domestic dialogue.",
    },
    {
      name: "Taurus",
      sanskrit: "Vrishabh",
      symbol: "♉",
      dates: "Apr 20 - May 20",
      element: "Earth",
      ruling: "Venus (Shukra)",
      todayRating: "Very Favorable",
      loveScore: 95,
      careerScore: 82,
      moneyScore: 91,
      healthScore: 86,
      luckyNumber: "6 & 15",
      luckyColor: "Emerald Green",
      luckyStone: "Diamond / White Sapphire",
      prediction:
        "Venus radiates harmony in close personal partnerships. Prior investment moves show encouraging traction. An excellent day for domestic settlements and financial budgeting.",
    },
    {
      name: "Gemini",
      sanskrit: "Mithun",
      symbol: "♊",
      dates: "May 21 - Jun 20",
      element: "Air",
      ruling: "Mercury (Budh)",
      todayRating: "Favorable",
      loveScore: 84,
      careerScore: 89,
      moneyScore: 78,
      healthScore: 82,
      luckyNumber: "5 & 14",
      luckyColor: "Warm Amber",
      luckyStone: "Emerald (Panna)",
      prediction:
        "Mercury boosts intellect and negotiation agility. Favorable for technical proposals, client presentations, and contracts. Take scheduled pauses from digital screens.",
    },
    {
      name: "Cancer",
      sanskrit: "Kark",
      symbol: "♋",
      dates: "Jun 21 - Jul 22",
      element: "Water",
      ruling: "Moon (Chandra)",
      todayRating: "Very Favorable",
      loveScore: 92,
      careerScore: 86,
      moneyScore: 88,
      healthScore: 89,
      luckyNumber: "2 & 11",
      luckyColor: "Pearl White",
      luckyStone: "Natural Pearl (Moti)",
      prediction:
        "The Moon forms an auspicious trine, sharpening intuition. Rely on your instinct regarding financial agreements and domestic affairs. Evening brings deep mental clarity.",
    },
    {
      name: "Leo",
      sanskrit: "Simha",
      symbol: "♌",
      dates: "Jul 23 - Aug 22",
      element: "Fire",
      ruling: "Sun (Surya)",
      todayRating: "Very Favorable",
      loveScore: 90,
      careerScore: 96,
      moneyScore: 92,
      healthScore: 91,
      luckyNumber: "1 & 10",
      luckyColor: "Saffron Gold",
      luckyStone: "Ruby (Manik)",
      prediction:
        "The Sun radiates solar confidence through your ascendant. You command natural authority in executive reviews and public appearances. Generosity in family matters bears rich fruit.",
    },
    {
      name: "Virgo",
      sanskrit: "Kanya",
      symbol: "♍",
      dates: "Aug 23 - Sep 22",
      element: "Earth",
      ruling: "Mercury (Budh)",
      todayRating: "Favorable",
      loveScore: 79,
      careerScore: 91,
      moneyScore: 84,
      healthScore: 87,
      luckyNumber: "5 & 23",
      luckyColor: "Forest Green",
      luckyStone: "Peridot",
      prediction:
        "Analytical rigor and auditing tasks yield spotless results. Avoid over-examining personal relations; make room for spontaneous warmth in relationships.",
    },
    {
      name: "Libra",
      sanskrit: "Tula",
      symbol: "♎",
      dates: "Sep 23 - Oct 22",
      element: "Air",
      ruling: "Venus (Shukra)",
      todayRating: "Very Favorable",
      loveScore: 96,
      careerScore: 85,
      moneyScore: 89,
      healthScore: 92,
      luckyNumber: "6 & 24",
      luckyColor: "Rose Quartz",
      luckyStone: "Opal",
      prediction:
        "Balance and aesthetic inspiration surround you. Joint commercial contracts and legal settlements move into favorable terms. High-value advisors provide timely counsel.",
    },
    {
      name: "Scorpio",
      sanskrit: "Vrishchik",
      symbol: "♏",
      dates: "Oct 23 - Nov 21",
      element: "Water",
      ruling: "Mars & Ketu",
      todayRating: "Very Favorable",
      loveScore: 86,
      careerScore: 93,
      moneyScore: 95,
      healthScore: 88,
      luckyNumber: "9 & 18",
      luckyColor: "Deep Maroon",
      luckyStone: "Red Coral / Cat's Eye",
      prediction:
        "Unseen opportunities and lucrative terms emerge. Your perceptive edge allows you to identify hidden leverage in negotiations. Good day to clear outdated commitments.",
    },
    {
      name: "Sagittarius",
      sanskrit: "Dhanu",
      symbol: "♐",
      dates: "Nov 22 - Dec 21",
      element: "Fire",
      ruling: "Jupiter (Guru)",
      todayRating: "Very Favorable",
      loveScore: 91,
      careerScore: 95,
      moneyScore: 90,
      healthScore: 94,
      luckyNumber: "3 & 12",
      luckyColor: "Royal Gold",
      luckyStone: "Yellow Sapphire (Pukhraj)",
      prediction:
        "Jupiter showers expansive grace upon your 9th house of fortune. Higher education, international partnerships, and mentorship blessings thrive today.",
    },
    {
      name: "Capricorn",
      sanskrit: "Makar",
      symbol: "♑",
      dates: "Dec 22 - Jan 19",
      element: "Earth",
      ruling: "Saturn (Shani)",
      todayRating: "Favorable",
      loveScore: 80,
      careerScore: 92,
      moneyScore: 89,
      healthScore: 84,
      luckyNumber: "8 & 17",
      luckyColor: "Midnight Slate",
      luckyStone: "Blue Sapphire (Neelam)",
      prediction:
        "Disciplined persistence overcomes persistent operational friction. Saturn rewards methodical diligence with durable financial security. Maintain posture and stretch regularly.",
    },
    {
      name: "Aquarius",
      sanskrit: "Kumbh",
      symbol: "♒",
      dates: "Jan 20 - Feb 18",
      element: "Air",
      ruling: "Saturn & Rahu",
      todayRating: "Very Favorable",
      loveScore: 87,
      careerScore: 90,
      moneyScore: 86,
      healthScore: 89,
      luckyNumber: "4 & 13",
      luckyColor: "Electric Blue",
      luckyStone: "Hessonite (Gomed)",
      prediction:
        "Innovative engineering or research ideas find receptive ground. Unconventional approaches solve complex group dilemmas. Network growth yields productive contacts.",
    },
    {
      name: "Pisces",
      sanskrit: "Meen",
      symbol: "♓",
      dates: "Feb 19 - Mar 20",
      element: "Water",
      ruling: "Jupiter (Guru)",
      todayRating: "Very Favorable",
      loveScore: 94,
      careerScore: 88,
      moneyScore: 87,
      healthScore: 93,
      luckyNumber: "3 & 21",
      luckyColor: "Ocean Teal",
      luckyStone: "Yellow Topaz",
      prediction:
        "Intuitive insights and quiet reflection provide valuable tactical direction. Creative projects earn high appreciation. A reassuring discussion heals an old grievance.",
    },
  ];

  // Read the date only on the client so server and client markup match.
  const today = useSyncExternalStore(
    () => () => {},
    () => new Date().toDateString(),
    () => null
  );

  const active = rashis.find((r) => r.name === selected) ?? rashis[0];
  const lines = LINES[active.name] ?? ["", "", "", ""];
  const ratings = [
    { label: "Love", value: active.loveScore, line: lines[0] },
    { label: "Career", value: active.careerScore, line: lines[1] },
    { label: "Health", value: active.healthScore, line: lines[2] },
    { label: "Money", value: active.moneyScore, line: lines[3] },
  ];
  const luckyColor = active.luckyColor || ELEMENT_DEFAULTS[active.element].color;
  const luckyNumber = active.luckyNumber || ELEMENT_DEFAULTS[active.element].number;
  const showDates = mode === "sun";
  const goKundli = () => document.getElementById("kundli")?.scrollIntoView({ behavior: "smooth" });
  const d = today ? new Date(today) : null;
  if (d && period === "Tomorrow") d.setDate(d.getDate() + 1);
  const dateLabel = !d
    ? period
    : period === "Weekly"
      ? "This week"
      : period === "Monthly"
        ? d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
        : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section id="horoscope" className="section section-alt">
      <div className="wrap">
        <div className="mb-8">
          <h2 className="h-section">Your daily horoscope</h2>
          <p className="sub mt-2">Pick your {mode === "moon" ? "Moon" : "Sun"} sign to read what the planets say about love, career, health and money.</p>
        </div>

        <div className="mb-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sign type">
            <button type="button" className="chip" aria-pressed={mode === "moon"} onClick={() => setMode("moon")}>Moon sign (Vedic)</button>
            <button type="button" className="chip" aria-pressed={mode === "sun"} onClick={() => setMode("sun")}>Sun sign (Western)</button>
          </div>
          <p className="mt-2 text-sm text-muted">
            Vedic astrology reads your Moon sign. Don&apos;t know it?{" "}
            <button type="button" onClick={goKundli} className="font-semibold text-brand-ink underline underline-offset-2 hover:text-ink">
              Get it free from your Kundli
            </button>
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Horoscope period">
          {PERIODS.map((p) => (
            <button key={p} type="button" className="chip" aria-pressed={period === p} onClick={() => setPeriod(p)}>
              {p}
            </button>
          ))}
        </div>

        <div className="scroll-x -mx-4 flex gap-3 px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-2 lg:overflow-visible lg:px-0" role="group" aria-label="Zodiac signs">
          {rashis.map((r) => {
            const on = r.name === selected;
            return (
              <button
                key={r.name}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(r.name)}
                className={`flex w-[8.25rem] shrink-0 flex-col items-center rounded-2xl border p-3 text-center lg:col-span-1 lg:w-auto ${
                  on ? "border-brand-hover bg-brand-tint shadow-[0_0_0_2px_var(--brand),0_0_26px_-2px_rgba(217,178,95,0.6)]" : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-line bg-bg-alt text-2xl text-ink" aria-hidden="true">
                  {r.symbol}&#xFE0E;
                </span>
                <span className="mt-2 text-sm font-bold text-ink">{r.name}</span>
                <span className="text-sm text-ink-2">{r.sanskrit}</span>
                {showDates && <span className="mt-1 text-[0.8125rem] leading-tight text-muted">{r.dates}</span>}
              </button>
            );
          })}
        </div>

        <div className="card mt-6 p-5 sm:p-8" aria-live="polite">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-tint text-3xl text-brand-ink" aria-hidden="true">
              {active.symbol}&#xFE0E;
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-ink">
                {active.name} <span className="font-semibold text-ink-2">({active.sanskrit})</span> · {period}
              </h3>
              <p className="text-sm text-muted">{dateLabel}{showDates ? ` · ${active.dates}` : ""} · Ruled by {active.ruling}</p>
            </div>
          </div>

          <div className="mt-6">
            <div>
              <p className="max-w-[65ch] text-base leading-relaxed text-ink-2">{active.prediction}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {ratings.map((x) => (
                  <section key={x.label} aria-label={x.label} className="rounded-xl border border-line bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-ink">{x.label}</h4>
                      <span className="tag tag-brand tnum">{x.value}%</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" role="presentation">
                      <div className="h-full rounded-full" style={{ width: `${x.value}%`, background: "var(--aurora)" }} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{x.line}</p>
                  </section>
                ))}
              </div>
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted">Mood</dt>
                  <dd className="font-semibold text-ink">{active.todayRating}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Lucky number</dt>
                  <dd className="tnum font-semibold text-ink">{luckyNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Lucky colour</dt>
                  <dd className="flex items-center gap-2 font-semibold text-ink">
                    <span className="size-4 rounded-full border border-line-strong" style={{ background: SWATCH[luckyColor] ?? "var(--brand)" }} aria-hidden="true" />
                    {luckyColor}
                  </dd>
                </div>
              </dl>
            </div>

          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-brand">Read full horoscope</button>
            <button type="button" className="btn btn-outline" onClick={() => onOpenConsultation?.(`${active.name} Specialist Astrologer`)}>
              Ask an astrologer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
