"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Knob from "./components/Knob";
import FrequencyViz from "./components/FrequencyViz";
import ResonanceOverlay from "./components/ResonanceOverlay";
import StatusBar from "./components/StatusBar";
import { FREQ_DEFAULT } from "@/lib/constants";
import { frequencyToHSL } from "@/lib/synesthesia";
import { calcRomeScore, type Triangle as TriangleData } from "@/lib/triangle";
import {
  createResonanceEngine,
  type ResonanceEngine,
  type ResonanceState,
} from "@/lib/resonance";
import {
  subscribeToFrequencies,
  broadcastFrequency,
  unsubscribe,
} from "@/lib/supabase";
import {
  initAudio,
  setFrequency as setAudioFreq,
  startOscillator,
  stopOscillator,
  playResonanceTone,
  dispose as disposeAudio,
} from "@/lib/audio";

// Lazy-load Three.js component (no SSR)
const Triangle3D = dynamic(() => import("./components/Triangle3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
    </div>
  ),
});

function generateUserId(): string {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem("global-rome-user-id");
  if (!id) {
    id = `user-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem("global-rome-user-id", id);
  }
  return id;
}

export default function Home() {
  const [frequency, setFrequency] = useState(FREQ_DEFAULT);
  const [audioStarted, setAudioStarted] = useState(false);
  const [resonanceState, setResonanceState] = useState<ResonanceState>({
    participants: new Map(),
    isResonance: false,
    resonancePercentage: 0,
    modalFrequency: 730,
    alignedCount: 0,
    totalCount: 0,
  });
  const [romeScore, setRomeScore] = useState(0);
  const [wasResonance, setWasResonance] = useState(false);

  const engineRef = useRef<ResonanceEngine | null>(null);
  const userIdRef = useRef<string>("anon");
  const triangleRef = useRef<TriangleData>({
    userId: "anon",
    frequency: FREQ_DEFAULT,
    spinDirection: "ccw",
    spinSpeed: 0,
    color: frequencyToHSL(FREQ_DEFAULT),
    romeScore: 0,
    joinedAt: Date.now(),
    hasCrossedNeutral: false,
    resonanceTime: 0,
    changeTimestamps: [],
  });
  const tickRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Initialize
  useEffect(() => {
    userIdRef.current = generateUserId();
    triangleRef.current.userId = userIdRef.current;

    const engine = createResonanceEngine();
    engineRef.current = engine;

    // Subscribe to ceremony channel
    const ceremonyId = "memorial-2026-03-15";
    subscribeToFrequencies(ceremonyId, (data) => {
      engine.handleFrequencyUpdate(data);
    });

    // Tick: update state every 100ms
    tickRef.current = setInterval(() => {
      const state = engine.getState();
      setResonanceState(state);

      // Update Rome Score
      const t = triangleRef.current;
      if (state.isResonance) {
        t.resonanceTime += 100;
      }
      const score = calcRomeScore(t, state.isResonance);
      setRomeScore(score);
    }, 100);

    return () => {
      clearInterval(tickRef.current);
      unsubscribe();
      disposeAudio();
    };
  }, []);

  // Resonance achievement
  useEffect(() => {
    if (resonanceState.isResonance && !wasResonance) {
      playResonanceTone();
      setWasResonance(true);
    }
    if (!resonanceState.isResonance && wasResonance) {
      setWasResonance(false);
    }
  }, [resonanceState.isResonance, wasResonance]);

  const handleFrequencyChange = useCallback((hz: number) => {
    setFrequency(hz);
    setAudioFreq(hz);
    broadcastFrequency(userIdRef.current, hz);

    // Track for bad-faith detection
    const t = triangleRef.current;
    t.frequency = hz;
    t.changeTimestamps.push(Date.now());
    // Keep only last 60s
    const cutoff = Date.now() - 60_000;
    t.changeTimestamps = t.changeTimestamps.filter((ts) => ts > cutoff);

    // Track neutral crossing
    if (!t.hasCrossedNeutral && hz > 500 !== t.frequency > 500) {
      t.hasCrossedNeutral = true;
    }
  }, []);

  const handleStart = useCallback(async () => {
    await initAudio();
    startOscillator();
    setAudioStarted(true);
    broadcastFrequency(userIdRef.current, frequency);
  }, [frequency]);

  const color = frequencyToHSL(frequency);

  // Landing state — tap to begin
  if (!audioStarted) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6">
        {/* Background glow */}
        <div
          className="fixed inset-0 -z-10 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
          }}
        />

        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Global Rome
          </h1>
          <p className="mt-3 text-lg text-white/50">
            For Rome Viharo (1967–2025)
          </p>
        </div>

        <p className="max-w-xs text-center text-sm text-white/40">
          Turn your knob. Tune your frequency. When enough of us align, we
          resonate together.
        </p>

        <button
          onClick={handleStart}
          className="mt-4 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-lg font-medium backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
        >
          Tune In
        </button>

        <p className="text-xs text-white/20">
          TURN &rarr; TUNE &rarr; NOW
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between gap-4 px-4 py-6">
      {/* Background frequency glow */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${color}22, transparent 60%)`,
        }}
      />

      {/* Status bar */}
      <StatusBar
        participantCount={resonanceState.totalCount}
        romeScore={romeScore}
        ceremonyName="Rome Memorial"
        isResonance={resonanceState.isResonance}
      />

      {/* Triangle visualization */}
      <Triangle3D
        frequency={frequency}
        isResonance={resonanceState.isResonance}
        className="h-64 w-full flex-1"
      />

      {/* Frequency spectrum */}
      <FrequencyViz
        participants={resonanceState.participants}
        myFrequency={frequency}
        resonancePercentage={resonanceState.resonancePercentage}
        isResonance={resonanceState.isResonance}
      />

      {/* Knob */}
      <Knob frequency={frequency} onChange={handleFrequencyChange} />

      {/* Resonance overlay */}
      <ResonanceOverlay
        isResonance={resonanceState.isResonance}
        modalFrequency={resonanceState.modalFrequency}
      />
    </div>
  );
}
