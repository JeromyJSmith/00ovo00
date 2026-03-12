"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { FREQ_MIN, FREQ_MAX, FREQ_DEFAULT } from "@/lib/constants";
import { frequencyToHSL } from "@/lib/synesthesia";

interface KnobProps {
  frequency: number;
  onChange: (hz: number) => void;
  disabled?: boolean;
}

export default function Knob({ frequency, onChange, disabled }: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);

  // Map frequency to rotation angle (0-270 degrees)
  const freqToAngle = (hz: number) =>
    ((hz - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)) * 270;
  const angleToFreq = (deg: number) =>
    FREQ_MIN + (deg / 270) * (FREQ_MAX - FREQ_MIN);

  const rotation = freqToAngle(frequency);
  const color = frequencyToHSL(frequency);

  const getAngleFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      if (!knobRef.current) return 0;
      const rect = knobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let angle =
        Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      return Math.max(0, Math.min(270, angle));
    },
    []
  );

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled) return;
      isDragging.current = true;
      const angle = getAngleFromEvent(clientX, clientY);
      lastAngle.current = angle;
      onChange(angleToFreq(angle));
    },
    [disabled, getAngleFromEvent, onChange]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging.current || disabled) return;
      const angle = getAngleFromEvent(clientX, clientY);
      lastAngle.current = angle;
      onChange(angleToFreq(angle));
    },
    [disabled, getAngleFromEvent, onChange]
  );

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const onUp = () => handleEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleMove, handleEnd]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Frequency display */}
      <div className="text-center">
        <span
          className="text-4xl font-bold tabular-nums"
          style={{ color }}
        >
          {Math.round(frequency)}
        </span>
        <span className="ml-1 text-lg text-white/60">Hz</span>
      </div>

      {/* Knob */}
      <div
        ref={knobRef}
        className="relative h-48 w-48 cursor-grab select-none active:cursor-grabbing"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleStart(touch.clientX, touch.clientY);
        }}
        role="slider"
        aria-label="Frequency knob"
        aria-valuemin={FREQ_MIN}
        aria-valuemax={FREQ_MAX}
        aria-valuenow={Math.round(frequency)}
      >
        {/* Track ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-white/10"
          style={{
            background: `conic-gradient(from 135deg, ${color} ${
              (rotation / 270) * 100
            }%, transparent ${(rotation / 270) * 100}%)`,
            opacity: 0.3,
          }}
        />

        {/* Knob body */}
        <div
          className="absolute inset-4 rounded-full border-2 border-white/20 shadow-2xl"
          style={{
            background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.15), rgba(0,0,0,0.5))`,
            transform: `rotate(${rotation - 135}deg)`,
            transition: isDragging.current ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Indicator dot */}
          <div
            className="absolute top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
          />
        </div>

        {/* Center glow */}
        <div
          className="absolute inset-16 rounded-full"
          style={{
            background: color,
            opacity: 0.15,
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex w-48 justify-between text-xs text-white/40">
        <span>{FREQ_MIN}</span>
        <span>432</span>
        <span>{FREQ_MAX}</span>
      </div>

      {/* Label */}
      <p className="text-sm text-white/50">Turn to tune in</p>
    </div>
  );
}
