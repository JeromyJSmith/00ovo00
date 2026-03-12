"use client";

import { PHASE_META, type CeremonyPhase } from "@/lib/ceremony";

interface PhaseIndicatorProps {
  phase: CeremonyPhase;
  className?: string;
}

export default function PhaseIndicator({
  phase,
  className,
}: PhaseIndicatorProps) {
  const meta = PHASE_META[phase];
  const phases: CeremonyPhase[] = [
    "gathering",
    "individual",
    "convergence",
    "breath",
    "tribute",
  ];
  const currentIndex = phases.indexOf(phase);

  return (
    <div className={`flex flex-col items-center gap-3 ${className || ""}`}>
      {/* Phase dots */}
      <div className="flex gap-2">
        {phases.map((p, i) => (
          <div
            key={p}
            className={`h-2 rounded-full transition-all duration-500 ${
              i <= currentIndex ? "w-6" : "w-2"
            }`}
            style={{
              backgroundColor:
                i <= currentIndex ? meta.color : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Phase label */}
      <h2
        className="text-2xl font-bold tracking-tight transition-colors duration-500"
        style={{ color: meta.color }}
      >
        {meta.label}
      </h2>

      {/* Phase description */}
      <p className="text-sm text-white/50 transition-all duration-500">
        {meta.description}
      </p>
    </div>
  );
}
