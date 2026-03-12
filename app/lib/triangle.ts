// Triangle System — Spin mechanics and resonance detection
// Speed = (|f - 500| / 300) * 120 RPM

import {
  SPIN_MAX_RPM,
  SPIN_NEUTRAL,
  RESONANCE_THRESHOLD,
  RESONANCE_TOLERANCE,
  BAD_FAITH_CHANGES_PER_MIN,
  BAD_FAITH_PENALTY,
  SCORE_MAX,
  SCORE_ALIGNMENT,
  SCORE_SUSTAINED,
  SCORE_CROSSING,
  SCORE_EARLY,
  FREQ_TARGET,
} from "./constants";

export type SpinDirection = "cw" | "ccw";

export interface Triangle {
  userId: string;
  frequency: number;
  spinDirection: SpinDirection;
  spinSpeed: number; // RPM
  color: string;
  romeScore: number;
  joinedAt: number;
  hasCrossedNeutral: boolean;
  resonanceTime: number; // ms spent in resonance
  changeTimestamps: number[]; // for bad-faith detection
}

// Spin speed from frequency
// Speed = (|f - 500| / 300) * 120 RPM
export function calcSpinSpeed(freq: number): number {
  return (Math.abs(freq - SPIN_NEUTRAL) / 300) * SPIN_MAX_RPM;
}

// Spin direction from frequency
export function calcSpinDirection(freq: number): SpinDirection {
  return freq < SPIN_NEUTRAL ? "ccw" : "cw";
}

// Convert RPM to radians per second for Three.js animation
export function rpmToRadPerSec(rpm: number): number {
  return (rpm * 2 * Math.PI) / 60;
}

// Bad-faith detection: >10 frequency changes per minute
export function isBadFaith(changeTimestamps: number[]): boolean {
  const now = Date.now();
  const oneMinuteAgo = now - 60_000;
  const recentChanges = changeTimestamps.filter((t) => t > oneMinuteAgo);
  return recentChanges.length > BAD_FAITH_CHANGES_PER_MIN;
}

// Resonance check: ≥80% of users within ±5 Hz of modal cluster
export function checkResonance(frequencies: number[]): {
  achieved: boolean;
  alignedCount: number;
  totalCount: number;
  modalFrequency: number;
  percentage: number;
} {
  if (frequencies.length === 0) {
    return {
      achieved: false,
      alignedCount: 0,
      totalCount: 0,
      modalFrequency: FREQ_TARGET,
      percentage: 0,
    };
  }

  // Find modal cluster by binning frequencies
  const bins = new Map<number, number>();
  for (const f of frequencies) {
    const bin = Math.round(f);
    bins.set(bin, (bins.get(bin) || 0) + 1);
  }

  // Find the bin with most entries (considering ±5 Hz window)
  let bestCenter = FREQ_TARGET;
  let bestCount = 0;

  for (const [center] of bins) {
    const count = frequencies.filter(
      (f) => Math.abs(f - center) <= RESONANCE_TOLERANCE
    ).length;
    if (count > bestCount) {
      bestCount = count;
      bestCenter = center;
    }
  }

  const percentage = bestCount / frequencies.length;

  return {
    achieved: percentage >= RESONANCE_THRESHOLD,
    alignedCount: bestCount,
    totalCount: frequencies.length,
    modalFrequency: bestCenter,
    percentage,
  };
}

// Proximity harmonic between two users
// Harmonic = sqrt(Freq_A * Freq_B)
export function proximityHarmonic(freqA: number, freqB: number): number {
  return Math.sqrt(freqA * freqB);
}

// Resonance Quality Factor
// Q = 2 + 13 * e^(-minDistance / 100)
export function qualityFactor(
  freq: number,
  vowelFrequencies: number[] = [270, 530, 730]
): number {
  const minDist = Math.min(...vowelFrequencies.map((v) => Math.abs(freq - v)));
  return 2 + 13 * Math.exp(-minDist / 100);
}

// Rome Score calculation (1000 pts max)
export function calcRomeScore(triangle: Triangle, isInResonance: boolean): number {
  let score = 0;

  // 400 pts: frequency alignment to target
  const freqDiff = Math.abs(triangle.frequency - FREQ_TARGET);
  score += SCORE_ALIGNMENT * Math.max(0, 1 - freqDiff / 300);

  // 300 pts: time sustained in resonance (max at 60 seconds)
  score += SCORE_SUSTAINED * Math.min(1, triangle.resonanceTime / 60_000);

  // 200 pts: has crossed 500 Hz neutral (showing openness)
  if (triangle.hasCrossedNeutral) {
    score += SCORE_CROSSING;
  }

  // 100 pts: early joining (within first 60 seconds)
  const timeSinceJoin = Date.now() - triangle.joinedAt;
  score += SCORE_EARLY * Math.max(0, 1 - timeSinceJoin / 60_000);

  // Bad-faith penalty
  if (isBadFaith(triangle.changeTimestamps)) {
    score *= 1 - BAD_FAITH_PENALTY;
  }

  return Math.min(SCORE_MAX, Math.round(score));
}
