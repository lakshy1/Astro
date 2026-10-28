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

  const revealAll = () => {
    setCards((prev) => prev.map((c) => ({ ...c, revealed: true })));
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

  return (
    <section id="tarot" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141c] border border-[#232734] text-[#d4af37] text-xs font-semibold mb-3">
            <span>✦</span>
            <span>3D Interactive Arcana Divination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            3-Card Tarot Studio
          </h2>
          <p className="text-[#8e919e] text-sm sm:text-base mt-2">
            Center your mind on an important question. Click each 3D card to flip and unveil your Past Roots, Present Dynamics, and Future Trajectory.
          </p>

          {/* Action triggers */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={shuffleDeck}
              disabled={shuffling}
              className="px-4 py-2 rounded-lg bg-[#12141c] hover:bg-[#181a24] border border-[#232734] text-xs font-medium text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className={shuffling ? "animate-spin" : ""}>↻</span>
              <span>{shuffling ? "Shuffling Cards..." : "Shuffle & Deal New Spread"}</span>
            </button>
            <button
              onClick={revealAll}
              className="px-4 py-2 rounded-lg bg-[#181b24] hover:bg-[#202432] border border-[#2e3446] text-xs font-medium text-zinc-200 transition-all cursor-pointer"
            >
              Reveal All 3 Cards
            </button>
          </div>
        </div>

        {/* 3D Cards Spread Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto perspective-1000">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col items-center">
              {/* Position Header Tag */}
              <div className="mb-3 px-3 py-1 rounded-md bg-[#101217] border border-[#1e212b] text-[11px] font-medium text-[#8e919e]">
                {card.position === "Past" && "1. Past Karma & Roots"}
                {card.position === "Present" && "2. Present Energies"}
                {card.position === "Future" && "3. Future Trajectory"}
              </div>

              {/* 3D Flip Card */}
              <div
                onClick={() => flipCard(card.id)}
                className={`relative w-64 h-96 rounded-2xl cursor-pointer preserve-3d transition-transform duration-700 shadow-xl hover:scale-102 ${
                  card.revealed ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: card.revealed ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Card Back Face (Architectural Geometric Design) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#101218] border border-[#272b38] p-5 flex flex-col items-center justify-between shadow-2xl backface-hidden">
                  <div className="w-full flex justify-between text-[#d4af37]/40 text-xs font-mono">
                    <span>✦</span>
                    <span>✦</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 rounded-full border border-[#2b3040] flex items-center justify-center bg-[#151722] mb-4">
                      <svg className="w-7 h-7 text-[#d4af37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v18M3 12h18M7.05 7.05l9.9 9.9M7.05 16.95l9.9-9.9" />
                      </svg>
                    </div>
                    <p className="text-[11px] font-bold tracking-widest text-[#d4af37] uppercase">
                      Tap To Flip
                    </p>
                    <p className="text-[10px] text-[#8e919e] mt-0.5">Arcana Divination</p>
                  </div>

                  <div className="w-full flex justify-between text-[#d4af37]/40 text-xs font-mono">
                    <span>✦</span>
                    <span>✦</span>
                  </div>
                </div>

                {/* Card Front Face (Revealed Tarot Card) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl bg-[#12141c] border border-[#303648] p-5 flex flex-col justify-between shadow-2xl backface-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#1e212b]">
                      <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                        {card.arcana}
                      </span>
                      <span className="text-xs font-serif text-[#d4af37] font-semibold">{card.numeral}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-3 leading-tight">
                      {card.name}
                    </h3>
                    <p className="text-[11px] font-medium text-[#b0b3bf] mt-1">
                      {card.keywords}
                    </p>

                    <p className="text-xs text-zinc-300 mt-4 leading-relaxed">
                      {card.meaning}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1e212b] flex items-center justify-between text-[10px] text-[#8e919e]">
                    <span>● Verified Archetype</span>
                    <span>Tap to flip back</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tarot Consultation CTA */}
        <div className="mt-14 max-w-xl mx-auto p-5 rounded-2xl bg-[#101217] border border-[#1e212b] text-center">
          <p className="text-xs text-zinc-300">
            Need in-depth guidance on your personal spread? Consult a certified Tarot master.
          </p>
          <button
            onClick={() => onOpenConsultation?.("Certified Tarot Master")}
            className="mt-3 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold cursor-pointer shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Connect with Tarot Master Now &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
