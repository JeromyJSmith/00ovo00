// Resonance Engine — Client-side frequency aggregation and detection
"use client";

import { FrequencyBroadcast } from "./supabase";
import { checkResonance, calcSpinSpeed, calcSpinDirection } from "./triangle";
import { frequencyToHSL } from "./synesthesia";
import { FREQ_DEFAULT } from "./constants";

export interface Participant {
  userId: string;
  frequency: number;
  color: string;
  spinSpeed: number;
  spinDirection: "cw" | "ccw";
  lastUpdate: number;
}

export interface ResonanceState {
  participants: Map<string, Participant>;
  isResonance: boolean;
  resonancePercentage: number;
  modalFrequency: number;
  alignedCount: number;
  totalCount: number;
}

const STALE_TIMEOUT = 10_000; // Remove users who haven't updated in 10s

export function createResonanceEngine() {
  const participants = new Map<string, Participant>();

  function handleFrequencyUpdate(data: FrequencyBroadcast): void {
    const { userId, frequency, timestamp } = data;
    participants.set(userId, {
      userId,
      frequency,
      color: frequencyToHSL(frequency),
      spinSpeed: calcSpinSpeed(frequency),
      spinDirection: calcSpinDirection(frequency),
      lastUpdate: timestamp,
    });
  }

  function pruneStale(): void {
    const now = Date.now();
    for (const [id, p] of participants) {
      if (now - p.lastUpdate > STALE_TIMEOUT) {
        participants.delete(id);
      }
    }
  }

  function getState(): ResonanceState {
    pruneStale();

    const frequencies = Array.from(participants.values()).map(
      (p) => p.frequency
    );
    const result = checkResonance(frequencies);

    return {
      participants,
      isResonance: result.achieved,
      resonancePercentage: result.percentage,
      modalFrequency: result.modalFrequency,
      alignedCount: result.alignedCount,
      totalCount: result.totalCount,
    };
  }

  function reset(): void {
    participants.clear();
  }

  return {
    handleFrequencyUpdate,
    getState,
    reset,
    participants,
  };
}

export type ResonanceEngine = ReturnType<typeof createResonanceEngine>;
