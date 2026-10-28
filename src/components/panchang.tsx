"use client";

import { useState } from "react";

export default function Panchang() {
  const [selectedCity, setSelectedCity] = useState("New Delhi");

  const cities = ["New Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad"];

  const panchangDetails = {
    date: "Tuesday, 27 October 2026",
    samvat: "Vikram Samvat 2083",
    paksha: "Kartika Shukla Paksha",
    tithi: "Navami (up to 07:42 PM)",
    nakshatra: "Rohini (up to 09:15 PM)",
    yoga: "Vriddhi Yoga",
    karana: "Balava (up to 08:30 AM), then Kaulava",
    sunrise: "06:29 AM",
    sunset: "05:41 PM",
    abhijitMuhurat: "11:43 AM - 12:28 PM",
    rahuKaal: "02:54 PM - 04:18 PM",
    yamaganda: "09:17 AM - 10:41 AM",
    dishaShool: "North (avoid major travel north)",
  };

  const rows: [string, string][] = [
    ["Tithi", panchangDetails.tithi],
    ["Nakshatra", panchangDetails.nakshatra],
    ["Yoga", panchangDetails.yoga],
    ["Karana", panchangDetails.karana],
    ["Paksha", panchangDetails.paksha],
    ["Sunrise", panchangDetails.sunrise],
    ["Sunset", panchangDetails.sunset],
  ];

  const good: [string, string][] = [
    ["Abhijit Muhurat", panchangDetails.abhijitMuhurat],
    ["Amrit Kaal", "05:12 PM - 06:45 PM"],
    ["Brahma Muhurat", "04:48 AM - 05:38 AM"],
  ];
  const avoid: [string, string][] = [
    ["Rahu Kaal", panchangDetails.rahuKaal],
    ["Yamaganda", panchangDetails.yamaganda],
    ["Disha Shool", panchangDetails.dishaShool],
  ];

  const list = (items: [string, string][]) => (
    <dl className="mt-4">
      {items.map(([k, v], i) => (
        <div key={k} className={`flex flex-wrap justify-between gap-x-4 py-3 ${i ? "border-t border-line" : ""}`}>
          <dt className="text-ink-2">{k}</dt>
          <dd className="tnum font-semibold text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section id="panchang" className="section">
      <div className="wrap">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h-section">Today&apos;s Panchang</h2>
            <p className="sub mt-2">Tithi, nakshatra, yoga and the day&apos;s auspicious and inauspicious timings for your city.</p>
          </div>
          <div>
            <label htmlFor="panchang-city" className="label">City</label>
            <select id="panchang-city" className="field md:w-56" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card p-5 sm:p-8">
            <p className="text-sm text-muted">{panchangDetails.samvat} · {selectedCity}</p>
            <h3 className="mt-1 text-2xl font-extrabold text-ink">{panchangDetails.date}</h3>
            <dl className="mt-5 grid sm:grid-cols-2 sm:gap-x-10">
              {rows.map(([k, v]) => (
                <div key={k} className="border-t border-line py-3">
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className="tnum font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-ink">Shubh muhurat</h3>
                <span className="tag tag-leaf">Good time</span>
              </div>
              {list(good)}
            </div>
            <div className="card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-ink">Avoid</h3>
                <span className="tag tag-sindoor">Inauspicious</span>
              </div>
              {list(avoid)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
