"use client";

import { useState } from "react";

interface TarotInteractiveProps {
  onOpenConsultation?: (astrologerName?: string) => void;
}

interface TarotCard {
  id: number;
  name: string;
  numeral: string;
  arcana: string;
  keywords: string;
  meaning: string;
  position: "Past" | "Present" | "Future";
  revealed: boolean;
}

export default function TarotInteractive({ onOpenConsultation }: TarotInteractiveProps) {
  const defaultCards: TarotCard[] = [
    {
      id: 1,
      name: "The Moon",
      numeral: "XVIII",
      arcana: "Major Arcana",
      keywords: "Intuition • Subconscious • Perception",
      meaning:
        "The Moon indicates that past challenges were steered by emotional undercurrents. Trust the discernment forged through earlier uncertainty—it grounds your clarity today.",
      position: "Past",
      revealed: false,
    },
    {
      id: 2,
      name: "The Sun",
      numeral: "XIX",
      arcana: "Major Arcana",
      keywords: "Vitality • Expansion • Resolution",
      meaning:
        "The Sun brings radiant certainty into your present circumstances. Fog and hesitation dissolve. Strategic partnerships and professional focus receive cosmic favor.",
      position: "Present",
      revealed: false,
    },
    {
      id: 3,
      name: "The Universe",
      numeral: "XXI",
      arcana: "Major Arcana",
      keywords: "Fulfillment • Mastery • Karmic Cycle",
      meaning:
        "The Universe promises culmination and integration. A long-term endeavor completes with lasting stability, opening an elevated plateau of spiritual peace.",
      position: "Future",
      revealed: false,
    },
  ];

  const [cards, setCards] = useState<TarotCard[]>(defaultCards);
  const [shuffling, setShuffling] = useState(false);

  const flipCard = (id: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, revealed: !c.revealed } : c))
    );
  };

  const shuffleDeck = () => {
    setShuffling(true);
    setCards((prev) => prev.map((c) => ({ ...c, revealed: false })));

    setTimeout(() => {
      const pool = [
        { name: "The Magician", numeral: "I", arcana: "Major Arcana", keywords: "Focus • Manifestation • Skill", meaning: "You possess all necessary resources to translate clear intent into tangible results." },
        { name: "The High Priestess", numeral: "II", arcana: "Major Arcana", keywords: "Intuition • Mystery • Serenity", meaning: "Prioritize quiet inner observation over hurried actions. Truth speaks in stillness." },
        { name: "The Empress", numeral: "III", arcana: "Major Arcana", keywords: "Creation • Abundance • Harmony", meaning: "Creative endeavors and material stability flourish through steady nurturing." },
        { name: "The Emperor", numeral: "IV", arcana: "Major Arcana", keywords: "Order • Structure • Fortitude", meaning: "Firm boundaries and strategic methodology secure decisive long-term stability." },
        { name: "The Star", numeral: "XVII", arcana: "Major Arcana", keywords: "Hope • Guidance • Renewal", meaning: "Grace enters after testing seasons. Your direction is clear and validated." },
        { name: "Wheel of Fortune", numeral: "X", arcana: "Major Arcana", keywords: "Cycles • Turning Point • Destiny", meaning: "Karmic momentum shifts favorably. Prepare to step forward decisively." },
      ];

      const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);

      setCards([
        {
          id: 1,
          name: shuffled[0].name,
          numeral: shuffled[0].numeral,
          arcana: shuffled[0].arcana,
          keywords: shuffled[0].keywords,
          meaning: `In your Past: ${shuffled[0].meaning}`,
          position: "Past",
          revealed: false,
        },
        {
          id: 2,
          name: shuffled[1].name,
          numeral: shuffled[1].numeral,
          arcana: shuffled[1].arcana,
          keywords: shuffled[1].keywords,
          meaning: `In your Present: ${shuffled[1].meaning}`,
          position: "Present",
          revealed: false,
        },
        {
          id: 3,
          name: shuffled[2].name,
          numeral: shuffled[2].numeral,
          arcana: shuffled[2].arcana,
          keywords: shuffled[2].keywords,
          meaning: `In your Future: ${shuffled[2].meaning}`,
          position: "Future",
          revealed: false,
        },
      ]);
      setShuffling(false);
    }, 500);
  };

  const POS_LABEL: Record<string, string> = { Past: "Past", Present: "Present", Future: "Future" };

  return (
    <section id="tarot" className="section section-dark">
      <div className="wrap">
        <div className="mb-10 max-w-2xl">
          <h2 className="h-section text-white">3-card tarot reading</h2>
          <p className="sub">Think of a question, draw three cards, then tap each one to reveal your past, present and future.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={shuffleDeck} disabled={shuffling} className="btn btn-brand">
              {shuffling ? "Drawing…" : "Draw 3 cards"}
            </button>
            <button type="button" onClick={() => setCards((prev) => prev.map((c) => ({ ...c, revealed: false })))} className="btn btn-outline">
              Reset
            </button>
          </div>
        </div>

        <div className="perspective-1000 mx-auto grid max-w-4xl gap-10 md:grid-cols-3 md:gap-6">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col items-center">
              <p className="mb-3 text-base font-bold text-white">{POS_LABEL[card.position]}</p>
              <button
                type="button"
                onClick={() => flipCard(card.id)}
                aria-pressed={card.revealed}
                aria-label={card.revealed ? `${card.position}: ${card.name}. Tap to hide.` : `${card.position} card, face down. Tap to reveal.`}
                className="relative h-96 w-full max-w-64 cursor-pointer rounded-2xl border-0 bg-transparent p-0 transition-transform duration-700 preserve-3d"
                style={{ transformStyle: "preserve-3d", transform: card.revealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                <span className="backface-hidden absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border border-line-strong bg-[radial-gradient(circle_at_50%_40%,#1b2658_0%,#0b1130_70%)]">
                  <span className="absolute inset-3 rounded-xl border border-brand/50" aria-hidden="true" />
                  <span className="absolute inset-[18px] rounded-lg border border-brand/20" aria-hidden="true" />
                  {/* Card back: sun, crescent moon and zodiac wheel in gold leaf */}
                  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" stroke="var(--brand)" aria-hidden="true">
                    <circle cx="75" cy="75" r="62" strokeWidth="1.2" />
                    <circle cx="75" cy="75" r="50" strokeWidth="0.6" opacity=".7" />
                    {Array.from({ length: 12 }, (_, i) => {
                      const a = (i * Math.PI) / 6;
                      return (
                        <line key={i} x1={(75 + Math.cos(a) * 50).toFixed(2)} y1={(75 + Math.sin(a) * 50).toFixed(2)} x2={(75 + Math.cos(a) * 62).toFixed(2)} y2={(75 + Math.sin(a) * 62).toFixed(2)} strokeWidth="0.8" />
                      );
                    })}
                    <circle cx="75" cy="75" r="16" fill="var(--brand)" fillOpacity=".15" strokeWidth="1.2" />
                    {Array.from({ length: 8 }, (_, i) => {
                      const a = (i * Math.PI) / 4;
                      return (
                        <line key={i} x1={(75 + Math.cos(a) * 21).toFixed(2)} y1={(75 + Math.sin(a) * 21).toFixed(2)} x2={(75 + Math.cos(a) * (i % 2 ? 30 : 40)).toFixed(2)} y2={(75 + Math.sin(a) * (i % 2 ? 30 : 40)).toFixed(2)} strokeWidth="1.2" strokeLinecap="round" />
                      );
                    })}
                  </svg>
                  <svg className="absolute top-7" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 3a9 9 0 1 0 6 15.5A8 8 0 0 1 15 3Z" fill="var(--brand)" />
                  </svg>
                  <svg className="absolute bottom-7" width="16" height="16" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14l-1.6-5.4L0 7l5.4-1.6Z" fill="var(--brand)" />
                  </svg>
                </span>
                <span
                  className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-[rgba(217,178,95,0.55)] bg-[linear-gradient(160deg,#16204a_0%,#0b1130_65%,#1a1630_100%)] p-5 text-left text-ink shadow-[0_0_40px_-12px_rgba(217,178,95,0.45)]"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="flex items-center justify-between border-b border-line pb-2 text-sm text-muted">
                    <span>{card.arcana}</span>
                    <span className="font-semibold text-ink">{card.numeral}</span>
                  </span>
                  <span className="mt-4 text-2xl font-extrabold leading-tight text-aurora">{card.name}</span>
                  <span className="mt-2 text-sm font-semibold text-brand-ink">Upright: {card.keywords.replace(/ • /g, ", ")}</span>
                  <span className="mt-3 text-sm leading-relaxed text-ink-2">{card.meaning.replace(/^In your \w+: /, "")}</span>
                </span>
              </button>
              {card.revealed && (
                <p className="mt-4 max-w-64 text-center text-[0.9375rem] text-ink-2">
                  <span className="font-semibold text-white">{card.name}.</span> {card.meaning.replace(/^In your \w+: /, "")}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-3 text-center">
          <p className="text-base text-ink-2">Want a reading on your own question? Talk to a tarot reader.</p>
          <button type="button" onClick={() => onOpenConsultation?.("Certified Tarot Master")} className="btn btn-outline">
            Talk to a tarot reader
          </button>
        </div>
      </div>
    </section>
  );
}
