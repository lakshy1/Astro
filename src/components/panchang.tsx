"use client";

import { useState } from "react";

export default function Panchang() {
  const [selectedCity, setSelectedCity] = useState("New Delhi");

  const cities = ["New Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad"];

  const panchangDetails = {
    date: "Tuesday, 27 October 2026",
    samvat: "Vikram Samvat 2083 • Kartika Shukla Paksha",
    tithi: "Navami (up to 07:42 PM)",
    nakshatra: "Rohini (up to 09:15 PM)",
    yoga: "Vriddhi Yoga (Auspicious Expansion)",
    karana: "Balava (up to 08:30 AM), then Kaulava",
    sunrise: "06:29 AM",
    sunset: "05:41 PM",
    abhijitMuhurat: "11:43 AM - 12:28 PM",
    rahuKaal: "02:54 PM - 04:18 PM",
    yamaganda: "09:17 AM - 10:41 AM",
    dishaShool: "North (Avoid major travel North)",
  };

  return (
    <section id="panchang" className="py-24 relative overflow-hidden bg-[#08090d] border-b border-[#1c1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d4af37]">
                Solar & Lunar Ephemeris
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Today&apos;s Vedic Panchang & Muhurat
            </h2>
            <p className="text-[#8e919e] text-sm sm:text-base mt-2 max-w-xl">
              Daily Tithi, Nakshatra, Shubh Abhijit Muhurat, and Rahu Kaal computed according to Surya Siddhanta calculations.
            </p>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8e919e]">Location:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-[#12141c] border border-[#222532] text-white rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#d4af37]"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  📍 {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Panchang Highlight Card */}
        <div className="luxury-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#1e212b] gap-4">
            <div>
              <span className="text-xs font-medium text-[#d4af37]">
                {panchangDetails.samvat}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{panchangDetails.date}</h3>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14161f] border border-[#202330] text-zinc-300">
                <span>Sunrise:</span>
                <span className="font-bold text-white">{panchangDetails.sunrise}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14161f] border border-[#202330] text-zinc-300">
                <span>Sunset:</span>
                <span className="font-bold text-white">{panchangDetails.sunset}</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            <div className="p-4 rounded-xl bg-[#14161f] border border-[#202330]">
              <span className="text-[11px] text-[#8e919e] block">Tithi (Lunar Day)</span>
              <h4 className="text-sm font-bold text-white mt-1">{panchangDetails.tithi}</h4>
              <p className="text-[10px] text-[#8e919e] mt-1">Lord Brahma Ruler</p>
            </div>

            <div className="p-4 rounded-xl bg-[#14161f] border border-[#202330]">
              <span className="text-[11px] text-[#8e919e] block">Nakshatra</span>
              <h4 className="text-sm font-bold text-white mt-1">{panchangDetails.nakshatra}</h4>
              <p className="text-[10px] text-[#8e919e] mt-1">Exalted Moon Alignment</p>
            </div>

            <div className="p-4 rounded-xl bg-[#14161f] border border-[#202330]">
              <span className="text-[11px] text-[#8e919e] block">Yoga</span>
              <h4 className="text-sm font-bold text-white mt-1">{panchangDetails.yoga}</h4>
              <p className="text-[10px] text-[#8e919e] mt-1">Progressive endeavors</p>
            </div>

            <div className="p-4 rounded-xl bg-[#14161f] border border-[#202330]">
              <span className="text-[11px] text-[#8e919e] block">Karana</span>
              <h4 className="text-sm font-bold text-white mt-1">{panchangDetails.karana}</h4>
              <p className="text-[10px] text-[#8e919e] mt-1">Favorable for trade</p>
            </div>
          </div>

          {/* Auspicious vs Inauspicious Muhurats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#1e212b]">
            {/* Shubh Muhurats */}
            <div className="p-5 rounded-xl bg-[#14171f] border border-[#222a38]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Auspicious Shubh Muhurat
                </h4>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                  <span className="text-zinc-300">Abhijit Muhurat</span>
                  <span className="font-bold text-emerald-400">{panchangDetails.abhijitMuhurat}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
                  <span className="text-zinc-300">Amrit Kaal</span>
                  <span className="font-semibold text-white">05:12 PM - 06:45 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Brahma Muhurat</span>
                  <span className="font-semibold text-white">04:48 AM - 05:38 AM</span>
                </div>
              </div>
            </div>

            {/* Inauspicious Timings */}
            <div className="p-5 rounded-xl bg-[#16141a] border border-[#2d2228]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Inauspicious Timing (Rahu Kaal)
                </h4>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#251e23]">
                  <span className="text-zinc-300">Rahu Kaal (Avoid New Initiatives)</span>
                  <span className="font-bold text-rose-400">{panchangDetails.rahuKaal}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#251e23]">
                  <span className="text-zinc-300">Yamaganda</span>
                  <span className="font-semibold text-white">{panchangDetails.yamaganda}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Disha Shool</span>
                  <span className="font-semibold text-white">{panchangDetails.dishaShool}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
