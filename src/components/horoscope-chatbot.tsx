"use client";

import { useEffect, useId, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ["What is my rashi?", "What is Rahu Kaal?", "How does Kundli matching work?"];

const GREETING: Msg = {
  role: "assistant",
  content: "Namaste! I'm Jyotish Mitra. Ask me about zodiac signs, planets, Panchang or Kundli. For a personal reading, a verified astrologer is a tap away.",
};

/* Zodiac-wheel mark used on the floating button and the panel header */
function WheelIcon({ size = 28 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e3a8" />
          <stop offset=".5" stopColor="#d9b25f" />
          <stop offset="1" stopColor="#a8792f" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="none" stroke="#1a1305" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        const p = (r: number, f: (x: number) => number) => (16 + f(a) * r).toFixed(2);
        return <line key={i} x1={p(10.5, Math.cos)} y1={p(10.5, Math.sin)} x2={p(14, Math.cos)} y2={p(14, Math.sin)} stroke="#1a1305" strokeWidth="1" />;
      })}
      <path d="M16 7l1.5 5.6 5.5-1.5-4 4 4 4-5.5-1.5L16 25l-1.5-5.6L9 20.9l4-4-4-4 5.5 1.5Z" fill="#1a1305" />
    </svg>
  );
}

export default function HoroscopeChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only; send the real conversation
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="fixed bottom-24 right-4 z-[60] flex h-[min(34rem,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line-strong bg-bg-alt shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:right-6"
        >
          <header className="flex items-center gap-3 border-b border-line bg-[linear-gradient(180deg,rgba(217,178,95,0.14),transparent)] px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[image:var(--aurora)]">
              <WheelIcon size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="font-display text-lg font-semibold leading-tight">Jyotish Mitra</h2>
              <p className="text-xs text-muted">AI guide. Not a substitute for an astrologer.</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full text-ink-2 hover:bg-white/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" /></svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[0.9375rem] leading-relaxed ${m.role === "user" ? "rounded-br-md bg-[image:var(--aurora)] text-[#1a1305]" : "rounded-bl-md border border-line bg-white/[0.04] text-ink"}`}>
                  {m.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" role="status" aria-label="Jyotish Mitra is typing">
                <span className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-white/[0.04] px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${d * 120}ms` }} />
                  ))}
                </span>
              </div>
            )}
            {error && <p role="alert" className="rounded-lg bg-sindoor-tint px-3 py-2 text-sm text-sindoor">{error}</p>}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chip min-h-9 text-[0.8125rem]" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="astro-chat-input" className="sr-only">Message</label>
            <input
              id="astro-chat-input"
              ref={inputRef}
              className="field min-w-0 flex-1"
              placeholder="Ask about your rashi, dasha…"
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="btn btn-brand px-4" disabled={loading || !input.trim()} aria-label="Send message">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6Z" /></svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close horoscope assistant" : "Open horoscope assistant"}
        className="fixed bottom-5 right-4 z-[60] grid h-16 w-16 place-items-center rounded-full bg-[image:var(--aurora)] text-[#1a1305] shadow-[0_14px_40px_-8px_rgba(217,178,95,0.7),inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform hover:scale-105 sm:right-6"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-brand/30 [animation-duration:2.8s]" aria-hidden="true" />}
        <span className="relative">{open ? (
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" /></svg>
        ) : <WheelIcon size={34} />}</span>
      </button>
    </>
  );
}
