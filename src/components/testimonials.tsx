const Star = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);
const Stars = () => (
  <span className="flex gap-0.5 text-brand-ink" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
  </span>
);

const reviews = [
  { q: "The astrologer explained my Saturn period calmly and gave practical steps. I finally felt clear about my job switch.", name: "Priya Sharma", city: "Pune", topic: "Career" },
  { q: "Kundli matching was detailed and honest. We understood the strengths and the points to talk about before deciding.", name: "Rahul Verma", city: "Lucknow", topic: "Marriage" },
  { q: "Chatting in Tamil made it easy to explain my situation. The advice was specific and respectful.", name: "Meenakshi Iyer", city: "Chennai", topic: "Family" },
  { q: "I was sceptical but the first free chat convinced me. The remedies suggested were simple and affordable.", name: "Amit Patel", city: "Ahmedabad", topic: "Business & money" },
  { q: "Booked a pooja at Ujjain and received the prasad in four days with a video of the ritual.", name: "Sunita Reddy", city: "Hyderabad", topic: "Pooja" },
  { q: "Got my Vastu questions answered in one call. The suggestions were easy to follow without renovation.", name: "Karan Malhotra", city: "Gurugram", topic: "Vastu" },
];
const press = ["Economic Times", "Mint", "Business Standard", "YourStory", "NDTV", "Forbes India"];

export default function Testimonials() {
  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <div className="mb-8">
          <h2 className="h-section">4.8 out of 5 from 19 lakh+ reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex gap-0.5 text-brand-ink" role="img" aria-label="4.8 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
            </span>
            <p className="sub !mt-0">Verified feedback from people who consulted on AstroSpace.</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          {reviews.map((r) => (
            <li key={r.name} className="card p-5 flex flex-col">
              <Stars />
              <blockquote className="text-sm text-ink-2 mt-3 line-clamp-3 flex-1">&ldquo;{r.q}&rdquo;</blockquote>
              <div className="mt-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-bg-alt border border-line flex items-center justify-center text-sm font-bold text-ink" aria-hidden="true">
                  {r.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-sm text-muted">{r.city}</p>
                </div>
                <span className="tag">{r.topic}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">As featured in</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-10 gap-y-3 list-none p-0 m-0">
            {press.map((p) => (
              <li key={p} className="text-lg font-bold text-muted tracking-tight">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
