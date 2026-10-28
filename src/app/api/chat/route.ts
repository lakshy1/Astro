import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Jyotish Mitra", the friendly guide inside AstroSpace, a Vedic astrology consultation platform.
- Reply in the same language the user writes in (English by default; Hinglish or Hindi only if they do). Be brief (under 110 words), plain and warm. Use Hindi terms (rashi, kundli, dasha) only where natural, and explain them.
- Be factually careful. For example, Rahu Kaal is a daily window of about 90 minutes (one eighth of daylight), at a different time each weekday, that many people avoid for starting new work; it is not a planetary conjunction. If unsure, say so rather than guess.
- Use plain text, no markdown headings or bold.
- You can explain zodiac signs, planets (grahas), houses, Panchang terms, tarot basics and how Kundli matching works.
- Give general, reflective guidance only. Never predict death, illness, lawsuits or money outcomes with certainty, and never give medical, legal or financial advice.
- If someone needs a personal reading, suggest chatting with a verified astrologer or generating a free Kundli on this page.
- If asked something unrelated to astrology or the site, politely steer back.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Chat is not configured." }, { status: 503 });
  }

  let messages: Msg[];
  try {
    const body = await req.json();
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m: Msg) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12)
      .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Send a message first." }, { status: 400 });
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
      reasoning_effort: "low",
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "The assistant is busy. Try again in a moment." }, { status: 502 });
  }
  const data = await res.json();
  const reply: string = data.choices?.[0]?.message?.content?.trim() ?? "";
  return NextResponse.json({ reply: reply || "I couldn't think of an answer. Could you rephrase?" });
}
