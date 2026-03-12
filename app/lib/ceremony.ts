/**
 * Ceremony State Machine
 *
 * Five-phase orchestration for the Rome Viharo memorial ceremony.
 * Uses XState for deterministic phase transitions.
 *
 * Phases:
 *   1. GATHERING   — People arrive, landing screen, ambient tone
 *   2. INDIVIDUAL  — Everyone tunes their own frequency, triangles appear
 *   3. CONVERGENCE — Frequencies start pulling toward each other
 *   4. BREATH      — Collective NOW sweep (N → O → W), synchronized
 *   5. TRIBUTE     — Resonance achieved, 730 Hz lock, Rome's message
 */

import { createMachine, assign } from "xstate";

// ── Types ─────────────────────────────────────────────────────────
export type CeremonyPhase =
  | "gathering"
  | "individual"
  | "convergence"
  | "breath"
  | "tribute";

export interface CeremonyContext {
  phase: CeremonyPhase;
  participantCount: number;
  alignedCount: number;
  resonancePercentage: number;
  elapsedMs: number;
  phaseStartedAt: number;
  nowSweepTriggered: boolean;
  resonanceAchieved: boolean;
  targetFrequency: number;
}

// ── Events ────────────────────────────────────────────────────────
export type CeremonyEvent =
  | { type: "PARTICIPANT_JOIN"; count: number }
  | { type: "PARTICIPANT_LEAVE"; count: number }
  | { type: "RESONANCE_UPDATE"; aligned: number; total: number; percentage: number }
  | { type: "TICK"; elapsedMs: number }
  | { type: "HOST_ADVANCE" }       // Manual override by ceremony host
  | { type: "NOW_SWEEP_COMPLETE" }
  | { type: "RESET" };

// ── Thresholds ────────────────────────────────────────────────────
export const CEREMONY_THRESHOLDS = {
  /** Minimum participants to leave gathering phase */
  minParticipants: 3,
  /** Seconds in individual phase before auto-advance */
  individualDurationSec: 120,
  /** Resonance percentage to trigger breath phase */
  convergenceThreshold: 0.6,
  /** Resonance percentage to achieve tribute */
  resonanceThreshold: 0.8,
  /** Target frequency for lock */
  targetFrequency: 730,
} as const;

// ── Guards ────────────────────────────────────────────────────────
const hasEnoughParticipants = ({ context }: { context: CeremonyContext }) =>
  context.participantCount >= CEREMONY_THRESHOLDS.minParticipants;

const individualTimeElapsed = ({ context }: { context: CeremonyContext }) =>
  context.elapsedMs - context.phaseStartedAt >=
  CEREMONY_THRESHOLDS.individualDurationSec * 1000;

const convergenceReached = ({ context }: { context: CeremonyContext }) =>
  context.resonancePercentage >= CEREMONY_THRESHOLDS.convergenceThreshold;

const resonanceReached = ({ context }: { context: CeremonyContext }) =>
  context.resonancePercentage >= CEREMONY_THRESHOLDS.resonanceThreshold;

// ── Machine ───────────────────────────────────────────────────────
export const ceremonyMachine = createMachine({
  id: "ceremony",
  initial: "gathering",
  context: {
    phase: "gathering" as CeremonyPhase,
    participantCount: 0,
    alignedCount: 0,
    resonancePercentage: 0,
    elapsedMs: 0,
    phaseStartedAt: 0,
    nowSweepTriggered: false,
    resonanceAchieved: false,
    targetFrequency: CEREMONY_THRESHOLDS.targetFrequency,
  } as CeremonyContext,
  on: {
    TICK: {
      actions: assign({
        elapsedMs: ({ event }) => event.elapsedMs,
      }),
    },
    PARTICIPANT_JOIN: {
      actions: assign({
        participantCount: ({ event }) => event.count,
      }),
    },
    PARTICIPANT_LEAVE: {
      actions: assign({
        participantCount: ({ event }) => event.count,
      }),
    },
    RESONANCE_UPDATE: {
      actions: assign({
        alignedCount: ({ event }) => event.aligned,
        resonancePercentage: ({ event }) => event.percentage,
      }),
    },
  },
  states: {
    gathering: {
      entry: assign({ phase: "gathering" }),
      on: {
        HOST_ADVANCE: { target: "individual" },
        TICK: [
          {
            guard: hasEnoughParticipants,
            target: "individual",
          },
        ],
      },
    },

    individual: {
      entry: assign({
        phase: "individual",
        phaseStartedAt: ({ context }) => context.elapsedMs,
      }),
      on: {
        HOST_ADVANCE: { target: "convergence" },
        TICK: [
          {
            guard: convergenceReached,
            target: "convergence",
          },
          {
            guard: individualTimeElapsed,
            target: "convergence",
          },
        ],
      },
    },

    convergence: {
      entry: assign({
        phase: "convergence",
        phaseStartedAt: ({ context }) => context.elapsedMs,
      }),
      on: {
        HOST_ADVANCE: { target: "breath" },
        TICK: [
          {
            guard: resonanceReached,
            target: "breath",
          },
        ],
      },
    },

    breath: {
      entry: assign({
        phase: "breath",
        nowSweepTriggered: true,
        phaseStartedAt: ({ context }) => context.elapsedMs,
      }),
      on: {
        NOW_SWEEP_COMPLETE: { target: "tribute" },
        HOST_ADVANCE: { target: "tribute" },
      },
    },

    tribute: {
      entry: assign({
        phase: "tribute",
        resonanceAchieved: true,
        phaseStartedAt: ({ context }) => context.elapsedMs,
      }),
      on: {
        RESET: { target: "gathering" },
      },
    },
  },
});

// ── Phase metadata for UI ─────────────────────────────────────────
export const PHASE_META: Record<
  CeremonyPhase,
  { label: string; description: string; color: string }
> = {
  gathering: {
    label: "Gathering",
    description: "Welcome. Find your frequency.",
    color: "#666666",
  },
  individual: {
    label: "Individual",
    description: "Turn your knob. Express yourself.",
    color: "#00F5FF",
  },
  convergence: {
    label: "Convergence",
    description: "Listen to each other. Move toward resonance.",
    color: "#FFD700",
  },
  breath: {
    label: "Collective Breath",
    description: "N → O → W. Breathe together.",
    color: "#FF6B35",
  },
  tribute: {
    label: "For Rome",
    description: "We resonate as one. TURING → TURNING → TUNING.",
    color: "#FFFFFF",
  },
};
