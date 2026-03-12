"use client";

import { SCORE_MAX } from "@/lib/constants";

interface RomeScoreProps {
  score: number;
}

export default function RomeScore({ score }: RomeScoreProps) {
  const percentage = score / SCORE_MAX;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${percentage * 100}%`,
            background: `linear-gradient(90deg,
              hsl(270, 80%, 50%) 0%,
              hsl(45, 90%, 60%) 100%)`,
          }}
        />
      </div>
      <span className="text-xs tabular-nums text-white/60">
        {score}
      </span>
    </div>
  );
}
