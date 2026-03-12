// Audio Engine — Tone.js formant synthesis
// NOW = N(220Hz) → O(730Hz) → W(300Hz) vocal filter sweep
// Three-oscillator formant model: F1, F2, F3 with amplitudes [0.6, 0.3, 0.1]
// Filter sweep math from the universal transfer function Φ(t)

"use client";

import type * as ToneType from "tone";
import {
  FORMANT_N,
  FORMANT_O,
  FORMANT_W,
  FORMANT_AMPLITUDES,
  SWEEP_T1,
  SWEEP_T2,
  SWEEP_T3,
} from "./constants";

let Tone: typeof ToneType | null = null;
let initialized = false;

// Main user oscillator chain
let oscillator: ToneType.Oscillator | null = null;
let filter: ToneType.Filter | null = null;
let gain: ToneType.Gain | null = null;

// Resonance achievement synth
let resonanceSynth: ToneType.Synth | null = null;

// Formant synthesis: 3 parallel oscillator+filter chains
interface FormantVoice {
  osc: ToneType.Oscillator;
  filter: ToneType.Filter;
  gain: ToneType.Gain;
}

let formantVoices: FormantVoice[] = [];
let formantMaster: ToneType.Gain | null = null;
let sweepFrameId: number | null = null;

const FORMANT_TABLE = {
  N: FORMANT_N,
  O: FORMANT_O,
  W: FORMANT_W,
} as const;

// Lazy-load Tone.js (browser only)
async function ensureTone(): Promise<typeof ToneType> {
  if (!Tone) {
    Tone = await import("tone");
  }
  return Tone;
}

export async function initAudio(): Promise<void> {
  if (initialized) return;

  const T = await ensureTone();
  await T.start();

  // Main oscillator — user's frequency knob
  oscillator = new T.Oscillator({
    frequency: 432,
    type: "sine",
    volume: -20,
  });

  filter = new T.Filter({
    frequency: 432,
    type: "bandpass",
    Q: 8,
  });

  gain = new T.Gain(0.3);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.toDestination();

  // Resonance achievement synth — 730 Hz sine burst
  resonanceSynth = new T.Synth({
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.5,
      decay: 0.3,
      sustain: 0.8,
      release: 2.0,
    },
    volume: -10,
  }).toDestination();

  // Formant synthesis voices (3 oscillators for F1, F2, F3)
  formantMaster = new T.Gain(0);
  formantMaster.toDestination();

  for (let i = 0; i < 3; i++) {
    const osc = new T.Oscillator({
      frequency: FORMANT_TABLE.N.F[i],
      type: "sine",
      volume: -12,
    });
    const flt = new T.Filter({
      frequency: FORMANT_TABLE.N.F[i],
      type: "bandpass",
      Q: FORMANT_TABLE.N.Q,
    });
    const g = new T.Gain(FORMANT_AMPLITUDES[i]);
    osc.connect(flt);
    flt.connect(g);
    g.connect(formantMaster);
    formantVoices.push({ osc, filter: flt, gain: g });
  }

  initialized = true;
}

export function startOscillator(): void {
  oscillator?.start();
}

export function stopOscillator(): void {
  oscillator?.stop();
}

// Update frequency — smoothly ramp
export function setFrequency(hz: number): void {
  if (!oscillator || !filter || !Tone) return;

  const now = Tone.now();
  oscillator.frequency.rampTo(hz, 0.05, now);
  filter.frequency.rampTo(hz, 0.05, now);

  // Q factor spikes near vowel formant frequencies
  const vowels = [270, 530, 730];
  const minDist = Math.min(...vowels.map((v) => Math.abs(hz - v)));
  const q = 2 + 13 * Math.exp(-minDist / 100);
  filter.Q.rampTo(q, 0.05, now);
}

export function setVolume(vol: number): void {
  if (!gain) return;
  gain.gain.value = Math.max(0, Math.min(1, vol));
}

// Trigger resonance achievement tone — 730 Hz
export function playResonanceTone(): void {
  resonanceSynth?.triggerAttackRelease(730, "4n");
}

// NOW filter sweep using exact spec equations:
// f_c(t) = 220 + 510·(t/T1)²         for 0 ≤ t < T1      (quadratic rise)
// f_c(t) = 730                         for T1 ≤ t < T2     (sustain)
// f_c(t) = 730 - 430·((t-T2)/(T3-T2)) for T2 ≤ t < T3     (linear fall)
//
// With 3-oscillator formant model interpolating F1/F2/F3 and Q
export async function playNOWSweep(duration: number = SWEEP_T3): Promise<void> {
  if (!Tone || formantVoices.length < 3 || !formantMaster) return;

  // Cancel any running sweep
  if (sweepFrameId !== null) {
    cancelAnimationFrame(sweepFrameId);
    sweepFrameId = null;
  }

  // Time boundaries from universal transfer function Φ(t)
  const scale = duration / SWEEP_T3;
  const T1 = SWEEP_T1 * scale;
  const T2 = SWEEP_T2 * scale;
  const T3 = SWEEP_T3 * scale;

  // Start formant voices
  formantMaster.gain.rampTo(0.5, 0.05);
  for (const v of formantVoices) {
    v.osc.start();
  }

  const startTime = performance.now() / 1000;

  function tick() {
    if (!Tone) return;
    const elapsed = performance.now() / 1000 - startTime;

    if (elapsed >= T3) {
      // Sweep complete — stop voices
      for (const v of formantVoices) {
        v.osc.stop();
      }
      formantMaster!.gain.rampTo(0, 0.1);
      sweepFrameId = null;
      return;
    }

    // Compute normalized phase (0-1) through N→O→W
    let phase: number;
    if (elapsed < T1) {
      // N→O: quadratic rise
      phase = (elapsed / T1) ** 2;
    } else if (elapsed < T2) {
      // O sustain
      phase = 1.0;
    } else {
      // O→W: linear fall
      phase = 1.0 - (elapsed - T2) / (T3 - T2);
    }

    // Interpolate formant parameters
    // phase 0→1: N→O, phase 1→0: O→W
    // For the fall phase, interpolate between O and W
    let fromFormant: { F: readonly number[]; Q: number; dur: number };
    let toFormant: { F: readonly number[]; Q: number; dur: number };
    let t: number;

    if (elapsed < T2) {
      // Rising or sustaining: interpolate N → O
      fromFormant = FORMANT_TABLE.N;
      toFormant = FORMANT_TABLE.O;
      t = phase; // 0→1 quadratic during rise, 1.0 during sustain
    } else {
      // Falling: interpolate O → W
      fromFormant = FORMANT_TABLE.O;
      toFormant = FORMANT_TABLE.W;
      t = (elapsed - T2) / (T3 - T2); // 0→1 linear
    }

    const now = Tone!.now();
    for (let i = 0; i < 3; i++) {
      const freq = fromFormant.F[i] + (toFormant.F[i] - fromFormant.F[i]) * t;
      const q = fromFormant.Q + (toFormant.Q - fromFormant.Q) * t;
      formantVoices[i].osc.frequency.rampTo(freq, 0.016, now);
      formantVoices[i].filter.frequency.rampTo(freq, 0.016, now);
      formantVoices[i].filter.Q.rampTo(q, 0.016, now);
    }

    sweepFrameId = requestAnimationFrame(tick);
  }

  sweepFrameId = requestAnimationFrame(tick);
}

export function dispose(): void {
  if (sweepFrameId !== null) {
    cancelAnimationFrame(sweepFrameId);
    sweepFrameId = null;
  }
  oscillator?.dispose();
  filter?.dispose();
  gain?.dispose();
  resonanceSynth?.dispose();
  for (const v of formantVoices) {
    v.osc.dispose();
    v.filter.dispose();
    v.gain.dispose();
  }
  formantMaster?.dispose();
  oscillator = null;
  filter = null;
  gain = null;
  resonanceSynth = null;
  formantVoices = [];
  formantMaster = null;
  initialized = false;
}
