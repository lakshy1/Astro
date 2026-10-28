const faqs = [
  { q: "Is the first chat really free?", a: "Yes. New users get a free first chat of a few minutes with a verified astrologer. You only pay if you choose to continue." },
  { q: "How are astrologers verified?", a: "Every astrologer is screened on credentials and experience, takes a test consultation, and is rated by users after each session. Low-rated profiles are removed." },
  { q: "Are my chats private?", a: "Your chats and calls are confidential. Astrologers cannot see your phone number, and we never share your birth details with third parties." },
  { q: "How does per-minute pricing work?", a: "Each astrologer sets a per-minute rate shown on their profile. You are charged only for the minutes you speak, from your wallet balance." },
  { q: "Can I get a refund?", a: "If a session fails because of a technical issue or the astrologer does not join, the amount is returned to your wallet. See the refund policy for details." },
  { q: "Which languages are supported?", a: "Astrologers are available in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada and more. Filter by language on the astrologer list." },
];

export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="wrap" style={{ maxWidth: "48rem" }}>
        <h2 className="h-section mb-8">Questions, answered</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group">
              <summary className="flex items-center justify-between gap-4 p-5 min-h-14 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-ink">
                {f.q}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-ink-2" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" className="group-open:hidden" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-ink-2 text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
