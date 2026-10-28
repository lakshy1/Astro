"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologerName?: string;
}

const ASTRO_INFO: Record<string, { image?: string; price: string }> = {
  "Acharya Sreejita": { image: "/vedic_astrologer_female.jpg", price: "₹30/min" },
  "Pandit Minesh Shastri": { image: "/vedic_astrologer_male.jpg", price: "₹40/min" },
  "Dr. Sarika Upadhyay": { image: "/vedic_astrologer_female.jpg", price: "₹50/min" },
  "Tarot Serena": { image: "/vedic_astrologer_female.jpg", price: "₹25/min" },
  "Acharya Gaurav": { image: "/vedic_astrologer_male.jpg", price: "₹35/min" },
  "Pandit Roopa Sharma": { image: "/vedic_astrologer_male.jpg", price: "₹35/min" },
};

export default function ConsultationModal({
  isOpen,
  onClose,
  astrologerName = "Acharya Sreejita",
}: ConsultationModalProps) {
  const [stage, setStage] = useState<"intake" | "live-session">("intake");
  const [topic, setTopic] = useState("Career & Business Direction");
  const [consultType, setConsultType] = useState<"chat" | "call">("chat");
  const [userName, setUserName] = useState("Seeker");
  const [messages, setMessages] = useState<{ sender: "guru" | "user"; text: string; time: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [typing, setTyping] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins free trial

  const dialogRef = useRef<HTMLDivElement>(null);
  const info = ASTRO_INFO[astrologerName];
  const photo = info ? info.image : undefined;

  const handleModalClose = () => {
    setStage("intake");
    setMessages([]);
    setInputText("");
    setTimerSeconds(300);
    onClose();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stage === "live-session" && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage, timerSeconds]);

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("live-session");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages([
        {
          sender: "guru",
          text: `Namaste ${userName || "Seeker"}. I am ${astrologerName}. I have your consultation topic set to "${topic}". Please share your exact birth date, time, and the core question you wish to examine today.`,
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg, time: "Just now" }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      let reply = `Looking at the current transit of Jupiter and Saturn, your chart indicates an upcoming period of restructuring. The next 30 to 45 days will bring clarity. Maintain focus and avoid hasty speculative decisions.`;
      if (topic.includes("Love") || topic.includes("Marriage")) {
        reply = `The Venusian aspect in your 7th house shows mutual respect, but communication requires clarity. A quiet conversation around upcoming goals will bring alignment. Friday meditations will assist emotional harmony.`;
      } else if (topic.includes("Career")) {
        reply = `The 10th lord is currently transiting an auspicious quadrant. A notable professional opportunity or role expansion is signaled within the next quarter. Ensure all documentation is prepared thoroughly.`;
      }
      setMessages((prev) => [...prev, { sender: "guru", text: reply, time: "Just now" }]);
    }, 1400);
  };

  const closeRef = useRef(handleModalClose);
  useEffect(() => {
    closeRef.current = handleModalClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = dialogRef.current;
    const focusables = () =>
      Array.from(
        el?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    (focusables()[1] ?? focusables()[0])?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      const active = document.activeElement;
      if (!el?.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [isOpen, stage]);

  if (!isOpen) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  const avatar = photo ? (
    <Image src={photo} alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover border border-line shrink-0" />
  ) : (
    <div aria-hidden="true" className="w-12 h-12 rounded-full bg-indigo text-white font-bold flex items-center justify-center shrink-0">
      {astrologerName.charAt(0)}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(4,2,16,.72)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleModalClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        className="relative w-full max-w-lg bg-bg-alt rounded-2xl shadow-[0_40px_120px_-30px_rgba(217,178,95,0.35)] border border-line p-5 sm:p-6 max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
      >
        <div className="flex items-center gap-3 pr-12">
          {avatar}
          <div className="min-w-0">
            <h2 id="consult-title" className="text-lg font-bold text-ink leading-tight">
              {astrologerName}
            </h2>
            <p className="text-sm text-ink-2 tnum">
              {info?.price ?? "₹30/min"} · <span className="text-leaf font-medium">First 5 minutes free</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleModalClose}
          aria-label="Close consultation"
          className="absolute top-3 right-3 w-11 h-11 rounded-full text-ink-2 hover:bg-bg-alt flex items-center justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {stage === "intake" ? (
          <form onSubmit={handleStartSession} className="mt-5 space-y-4">
            <div>
              <label htmlFor="consult-name" className="label">Your name</label>
              <input
                id="consult-name"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="field"
              />
            </div>
            <div>
              <label htmlFor="consult-topic" className="label">Topic</label>
              <select id="consult-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="field">
                <option value="Career & Business Direction">Career & Business Direction</option>
                <option value="Love & Marriage Compatibility">Love & Marriage Compatibility</option>
                <option value="Financial Growth & Investments">Financial Growth & Investments</option>
                <option value="Family Peace & Property Matters">Family Peace & Property Matters</option>
                <option value="Spiritual Guidance & Dosha Remedies">Spiritual Guidance & Dosha Remedies</option>
              </select>
            </div>
            <div>
              <span className="label" id="consult-mode">Consultation mode</span>
              <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="consult-mode">
                <button type="button" className="chip justify-center" aria-pressed={consultType === "chat"} onClick={() => setConsultType("chat")}>
                  Text chat
                </button>
                <button type="button" className="chip justify-center" aria-pressed={consultType === "call"} onClick={() => setConsultType("call")}>
                  Voice call
                </button>
              </div>
            </div>
            <p className="p-3 rounded-xl bg-bg-alt text-sm text-ink-2">
              <strong className="text-ink">Private session.</strong> Your birth details and chat history are not retained after the session ends.
            </p>
            <button type="submit" className="btn btn-brand btn-lg w-full">
              Start free consultation
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-[460px] max-h-[65dvh] mt-4">
            <div className="flex items-center justify-between pb-3 border-b border-line text-sm">
              <span className="inline-flex items-center gap-2 text-leaf font-medium">
                <span className="dot-live" aria-hidden="true" />
                Online
              </span>
              <span className="text-ink-2">
                Free time left{" "}
                <span className="font-bold text-ink tnum" role="timer">
                  {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                </span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3" aria-live="polite">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[15px] leading-relaxed text-ink ${
                      msg.sender === "user" ? "bg-brand-tint rounded-tr-sm" : "bg-bg-alt rounded-tl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-sm text-muted block text-right mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              {typing && (
                <p className="text-sm text-muted py-1">{astrologerName} is typing…</p>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-line flex items-center gap-2">
              <label htmlFor="consult-msg" className="sr-only">Your message</label>
              <input
                id="consult-msg"
                type="text"
                placeholder="Type your question"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="field flex-1"
              />
              <button type="submit" className="btn btn-brand">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
