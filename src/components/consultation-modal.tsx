"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologerName?: string;
}

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

  if (!isOpen) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#0e1017] border border-[#222534] rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#161822] border border-[#232734] text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors z-10"
        >
          ✕
        </button>

        {stage === "intake" ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-13 h-13 rounded-xl overflow-hidden border border-[#2a2f3f] relative bg-[#151821] shrink-0">
                <Image
                  src="/vedic_astrologer_female.jpg"
                  alt={astrologerName}
                  width={52}
                  height={52}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-emerald-400">Available Online Now</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">{astrologerName}</h3>
                <p className="text-xs text-[#d4af37]">First 5 Minutes Free Consultation</p>
              </div>
            </div>

            <form onSubmit={handleStartSession} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#14161f] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Primary Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#14161f] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Career & Business Direction">Career & Business Direction</option>
                  <option value="Love & Marriage Compatibility">Love & Marriage Compatibility</option>
                  <option value="Financial Growth & Investments">Financial Growth & Investments</option>
                  <option value="Family Peace & Property Matters">Family Peace & Property Matters</option>
                  <option value="Spiritual Guidance & Dosha Remedies">Spiritual Guidance & Dosha Remedies</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultType("chat")}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      consultType === "chat"
                        ? "bg-[#181b25] border-[#d4af37] text-white"
                        : "bg-[#14161f] border-[#202330] text-[#8e919e]"
                    }`}
                  >
                    <span>💬 Text Chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultType("call")}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      consultType === "call"
                        ? "bg-[#181b25] border-[#d4af37] text-white"
                        : "bg-[#14161f] border-[#202330] text-[#8e919e]"
                    }`}
                  >
                    <span>📞 Voice Call</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#14161f] border border-[#202330] text-[11px] text-[#8e919e] leading-relaxed">
                🔒 <strong>Confidentiality Guaranteed:</strong> End-to-end encrypted session. Your birth credentials and chat history are never retained.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs sm:text-sm font-bold cursor-pointer mt-2 shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Connect with Astrologer (Start Free) &rarr;
              </button>
            </form>
          </div>
        ) : (
          /* Live Chat Simulation Stage */
          <div className="flex flex-col h-[500px]">
            {/* Live Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1e212b]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#2a2f3f]">
                  <Image
                    src="/vedic_astrologer_female.jpg"
                    alt={astrologerName}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{astrologerName}</h4>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Answering
                  </span>
                </div>
              </div>

              {/* Free Trial Timer */}
              <div className="text-right">
                <span className="text-[10px] text-[#8e919e] block">Free Session Remaining</span>
                <span className="text-sm font-mono font-bold text-[#d4af37]">
                  {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl ${
                      msg.sender === "user"
                        ? "bg-[#d4af37] text-[#08090d] font-medium rounded-tr-none"
                        : "bg-[#14161f] text-zinc-200 border border-[#202330] rounded-tl-none leading-relaxed"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block text-right ${
                        msg.sender === "user" ? "text-black/60" : "text-[#8e919e]"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2 text-[#8e919e] text-xs py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#8e919e]">{astrologerName} is reviewing your chart...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#1e212b] flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your query regarding career, relationships, remedies..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#14161f] border border-[#222532] focus:border-[#d4af37] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#8e919e] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
