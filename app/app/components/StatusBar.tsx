"use client";

import RomeScore from "./RomeScore";

interface StatusBarProps {
  participantCount: number;
  romeScore: number;
  ceremonyName: string;
  isResonance: boolean;
}

export default function StatusBar({
  participantCount,
  romeScore,
  ceremonyName,
  isResonance,
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-md px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            isResonance ? "bg-amber-400 animate-pulse" : "bg-green-400"
          }`}
        />
        <span className="text-xs text-white/60">{ceremonyName}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-white/40">
          {participantCount} tuned in
        </span>
        <RomeScore score={romeScore} />
      </div>
    </div>
  );
}
