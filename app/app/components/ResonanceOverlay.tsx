"use client";

import { useEffect, useState } from "react";

interface ResonanceOverlayProps {
  isResonance: boolean;
  modalFrequency: number;
}

export default function ResonanceOverlay({
  isResonance,
  modalFrequency,
}: ResonanceOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isResonance) {
      setVisible(true);
      const timer = setTimeout(() => setShowText(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setShowText(false);
    }
  }, [isResonance]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-amber-400/30 animate-ping"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Central text */}
      <div
        className={`text-center transition-all duration-1000 ${
          showText ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <p className="text-lg tracking-widest text-amber-400/80 uppercase">
          Resonance Achieved
        </p>
        <p className="mt-2 text-6xl font-bold text-white">
          {Math.round(modalFrequency)} Hz
        </p>
        <p className="mt-6 text-sm text-white/50">For Rome.</p>
        <p className="mt-2 text-3xl font-bold tracking-[0.5em] text-amber-400 animate-pulse">
          NOW
        </p>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
