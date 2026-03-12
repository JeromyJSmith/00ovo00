"use client";

import { Participant } from "@/lib/resonance";
import { FREQ_MIN, FREQ_MAX, FREQ_TARGET, FREQ_NEUTRAL } from "@/lib/constants";

interface FrequencyVizProps {
  participants: Map<string, Participant>;
  myFrequency: number;
  resonancePercentage: number;
  isResonance: boolean;
}

export default function FrequencyViz({
  participants,
  myFrequency,
  resonancePercentage,
  isResonance,
}: FrequencyVizProps) {
  const allParticipants = Array.from(participants.values());
  const freqRange = FREQ_MAX - FREQ_MIN;

  // Position on the bar (0-100%)
  const freqToPercent = (hz: number) =>
    ((hz - FREQ_MIN) / freqRange) * 100;

  return (
    <div className="w-full max-w-md">
      {/* Resonance bar */}
      <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
        {/* Resonance fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
          style={{
            width: `${resonancePercentage * 100}%`,
            background: isResonance
              ? "linear-gradient(90deg, #a855f7, #f97316)"
              : "linear-gradient(90deg, rgba(168,85,247,0.5), rgba(249,115,22,0.5))",
          }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-1 flex justify-between text-xs text-white/40">
        <span>{allParticipants.length} tuned in</span>
        <span className={isResonance ? "text-amber-400 font-bold" : ""}>
          {Math.round(resonancePercentage * 100)}% aligned
        </span>
      </div>

      {/* Frequency spectrum */}
      <div className="relative mt-4 h-16 w-full rounded-lg bg-white/5 overflow-hidden">
        {/* Target zone (730 Hz ± 5) */}
        <div
          className="absolute inset-y-0 border border-amber-500/30 bg-amber-500/10"
          style={{
            left: `${freqToPercent(FREQ_TARGET - 5)}%`,
            width: `${((10 / freqRange) * 100)}%`,
          }}
        />

        {/* Neutral line (500 Hz) */}
        <div
          className="absolute inset-y-0 w-px bg-white/20"
          style={{ left: `${freqToPercent(FREQ_NEUTRAL)}%` }}
        />

        {/* Other participants */}
        {allParticipants.map((p) => (
          <div
            key={p.userId}
            className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full opacity-60 transition-all duration-200"
            style={{
              left: `${freqToPercent(p.frequency)}%`,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}

        {/* My frequency (larger, brighter) */}
        <div
          className="absolute top-1/2 h-8 w-2 -translate-y-1/2 rounded-full transition-all duration-100"
          style={{
            left: `${freqToPercent(myFrequency)}%`,
            backgroundColor: "white",
            boxShadow: "0 0 12px rgba(255,255,255,0.8)",
          }}
        />
      </div>

      {/* Spectrum labels */}
      <div className="mt-1 flex justify-between text-[10px] text-white/30">
        <span>N 220</span>
        <span>W 300</span>
        <span>432</span>
        <span>500</span>
        <span>O 730</span>
      </div>
    </div>
  );
}
