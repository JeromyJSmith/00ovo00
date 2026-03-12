"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { createActor } from "xstate";
import { useSelector } from "@xstate/react";
import {
  createResonanceEngine,
  type ResonanceEngine,
  type ResonanceState,
} from "@/lib/resonance";
import { subscribeToFrequencies, unsubscribe } from "@/lib/supabase";
import { FREQ_TARGET } from "@/lib/constants";
import {
  playResonanceTone,
  playNOWSweep,
  initAudio,
} from "@/lib/audio";
import {
  ceremonyMachine,
  PHASE_META,
  type CeremonyPhase,
} from "@/lib/ceremony";
import PhaseIndicator from "../components/PhaseIndicator";

// Lazy-load ceremony triangles (no SSR)
const CeremonyTriangles = dynamic(
  () => import("../components/Triangle3D").then((m) => m.CeremonyTriangles),
  { ssr: false },
);

// Lazy-load Manim content (no SSR)
const ManimContent = dynamic(
  () => import("../components/ManimContent"),
  { ssr: false },
);

// ── Ceremony Actor ────────────────────────────────────────────────
// Single persistent actor for the ceremony state machine
const ceremonyActor = createActor(ceremonyMachine);

// ── Projection mapping display for the memorial venue ─────────────
// Orchestrates 5 phases: Gathering → Individual → Convergence → Breath → Tribute
export default function CeremonyPage() {
  const [resonanceState, setResonanceState] = useState<ResonanceState>({
    participants: new Map(),
    isResonance: false,
    resonancePercentage: 0,
    modalFrequency: 730,
    alignedCount: 0,
    totalCount: 0,
  });
  const engineRef = useRef<ResonanceEngine | null>(null);
  const startTimeRef = useRef(Date.now());

  // XState selectors
  const phase = useSelector(ceremonyActor, (s) => s.context.phase);
  const nowSweepTriggered = useSelector(
    ceremonyActor,
    (s) => s.context.nowSweepTriggered,
  );
  const resonanceAchieved = useSelector(
    ceremonyActor,
    (s) => s.context.resonanceAchieved,
  );

  const meta = PHASE_META[phase];

  // Start the actor on mount
  useEffect(() => {
    ceremonyActor.start();
    return () => {
      ceremonyActor.stop();
    };
  }, []);

  // Supabase subscription + resonance engine
  useEffect(() => {
    const engine = createResonanceEngine();
    engineRef.current = engine;

    const ceremonyId = "memorial-2026-03-15";
    subscribeToFrequencies(ceremonyId, (data) => {
      engine.handleFrequencyUpdate(data);
    });

    initAudio();

    // 100ms tick: feed resonance data into ceremony machine
    const tick = setInterval(() => {
      const state = engine.getState();
      setResonanceState(state);

      const elapsedMs = Date.now() - startTimeRef.current;

      // Feed updates into the state machine
      ceremonyActor.send({
        type: "TICK",
        elapsedMs,
      });

      ceremonyActor.send({
        type: "RESONANCE_UPDATE",
        aligned: state.alignedCount,
        total: state.totalCount,
        percentage: state.resonancePercentage,
      });

      ceremonyActor.send({
        type: "PARTICIPANT_JOIN",
        count: state.totalCount,
      });
    }, 100);

    return () => {
      clearInterval(tick);
      unsubscribe();
    };
  }, []);

  // Trigger NOW sweep during breath phase
  useEffect(() => {
    if (nowSweepTriggered && phase === "breath") {
      playNOWSweep().then(() => {
        ceremonyActor.send({ type: "NOW_SWEEP_COMPLETE" });
      });
    }
  }, [nowSweepTriggered, phase]);

  // Trigger resonance tone when tribute is achieved
  useEffect(() => {
    if (resonanceAchieved) {
      playResonanceTone();
    }
  }, [resonanceAchieved]);

  // Manual advance for ceremony host (keyboard shortcut)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && e.shiftKey) {
        e.preventDefault();
        ceremonyActor.send({ type: "HOST_ADVANCE" });
      }
      if (e.key === "r" && e.shiftKey) {
        e.preventDefault();
        ceremonyActor.send({ type: "RESET" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const participants = Array.from(resonanceState.participants.values());

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center overflow-hidden transition-all duration-1000"
      style={{
        background: `radial-gradient(circle at 50% 40%, ${meta.color}15, #000000 70%)`,
      }}
    >
      {/* Phase indicator — top center */}
      <div className="relative z-10 pt-8">
        <PhaseIndicator phase={phase} />
      </div>

      {/* Main content area — phase-dependent */}
      <div className="relative z-0 flex-1 w-full">
        {/* Triangles — always visible, scaled by phase */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            phase === "gathering" ? "opacity-30" : "opacity-100"
          }`}
        >
          <CeremonyTriangles
            participants={participants}
            isResonance={resonanceState.isResonance}
            className="h-full w-full"
          />
        </div>

        {/* Gathering: Welcome message */}
        {phase === "gathering" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-1000">
            <div className="text-center max-w-lg px-8">
              <p className="text-5xl font-bold text-white/90 mb-4">
                Global Rome
              </p>
              <p className="text-xl text-white/50">
                For Rome Viharo (1967–2025)
              </p>
              <p className="mt-8 text-lg text-white/30">
                Waiting for participants to join...
              </p>
              <p className="mt-2 text-sm text-white/20">
                {resonanceState.totalCount} connected
              </p>
            </div>
          </div>
        )}

        {/* Individual: Phonetic chain animation */}
        {phase === "individual" && (
          <div className="absolute inset-x-0 bottom-16 flex justify-center">
            <ManimContent
              animation="phonetic-chain"
              width={600}
              height={200}
              className="rounded-xl overflow-hidden"
            />
          </div>
        )}

        {/* Convergence: Transfer function + live stats */}
        {phase === "convergence" && (
          <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-4">
            <p className="text-3xl font-bold text-amber-400/80">
              {Math.round(resonanceState.resonancePercentage * 100)}% aligned
            </p>
            <p className="text-lg text-white/40">
              {resonanceState.alignedCount} of {resonanceState.totalCount}{" "}
              converging toward {FREQ_TARGET} Hz
            </p>
          </div>
        )}

        {/* Breath: N → O → W sweep visualization */}
        {phase === "breath" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-8xl font-bold tracking-[0.5em] text-orange-400 animate-pulse">
                NOW
              </p>
              <p className="mt-6 text-xl text-white/40">
                N → O → W
              </p>
              <p className="mt-2 text-sm text-white/25">
                220 Hz → 730 Hz → 300 Hz
              </p>
            </div>
          </div>
        )}

        {/* Tribute: Resonance achieved — Rome's message */}
        {phase === "tribute" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center max-w-xl px-8 space-y-3">
              <p className="text-xl tracking-widest text-amber-400/80 uppercase animate-pulse">
                Resonance Achieved
              </p>
              <p className="text-7xl font-bold text-white">
                {Math.round(resonanceState.modalFrequency)} Hz
              </p>
              <div className="pt-4 space-y-3">
                <p className="text-2xl font-light text-white/70">
                  TURING → TURNING → TUNING
                </p>
                <p className="text-lg text-white/40">
                  Resistance became resonance.
                </p>
                <p className="pt-4 text-lg text-white/50">For Rome.</p>
                <p className="pt-2 text-4xl font-bold tracking-[0.5em] text-amber-400">
                  NOW
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats overlay — bottom left */}
      <div className="absolute bottom-6 left-6 z-10 text-white/40 text-xs space-y-1">
        <p>
          Phase: <strong className="text-white/60">{meta.label}</strong>
        </p>
        <p>
          Participants:{" "}
          <strong className="text-white/60">{resonanceState.totalCount}</strong>
        </p>
        <p>
          Aligned:{" "}
          <strong className="text-white/60">{resonanceState.alignedCount}</strong>{" "}
          ({Math.round(resonanceState.resonancePercentage * 100)}%)
        </p>
        <p>
          Target: <strong className="text-amber-400/60">{FREQ_TARGET} Hz</strong>
        </p>
      </div>

      {/* Host controls hint — bottom right */}
      <div className="absolute bottom-6 right-6 z-10 text-white/20 text-xs text-right">
        <p>Shift+Space: Advance phase</p>
        <p>Shift+R: Reset ceremony</p>
      </div>
    </div>
  );
}
