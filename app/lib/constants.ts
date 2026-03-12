// Global Ohm — Core Constants
// All mathematical formulas from Rome's pattern analysis

// Frequency bounds
export const FREQ_MIN = 200;
export const FREQ_MAX = 800;
export const FREQ_DEFAULT = 432; // Rome's frequency
export const FREQ_NEUTRAL = 500; // Spin reversal point (no spin)
export const FREQ_TARGET = 730; // Resonance lock target (O vowel peak)

// NOW phoneme frequencies
export const FREQ_N = 220; // Nasal hum, closed
export const FREQ_O = 730; // Open vowel, peak resonance
export const FREQ_W = 300; // Rounded lips, decay

// Resonance
export const RESONANCE_THRESHOLD = 0.8; // 80% of users must align
export const RESONANCE_TOLERANCE = 5; // Within ±5 Hz

// Triangle spin
export const SPIN_MAX_RPM = 120; // 2 rotations/sec max
export const SPIN_NEUTRAL = FREQ_NEUTRAL; // 500 Hz = no spin

// Rome Score
export const SCORE_MAX = 1000;
export const SCORE_ALIGNMENT = 400;
export const SCORE_SUSTAINED = 300;
export const SCORE_CROSSING = 200; // Crossing 500 Hz neutral
export const SCORE_EARLY = 100;

// Formant table (3-oscillator model)
// Each phoneme: [F1, F2, F3] Hz, Q factor, duration (s)
export const FORMANT_N = { F: [220, 2500, 3500] as const, Q: 3, dur: 0.15 };
export const FORMANT_O = { F: [730, 1090, 2440] as const, Q: 14, dur: 0.40 };
export const FORMANT_W = { F: [300, 870, 2240] as const, Q: 4, dur: 0.20 };
export const FORMANT_AMPLITUDES = [0.6, 0.3, 0.1] as const;

// NOW sweep timing (universal transfer function Φ(t))
// T1: attack/rise (N→O quadratic), T2: sustain end, T3: release end
export const SWEEP_T1 = 0.3; // seconds
export const SWEEP_T2 = 0.8;
export const SWEEP_T3 = 1.5;

// Bad-faith detection
export const BAD_FAITH_CHANGES_PER_MIN = 10;
export const BAD_FAITH_PENALTY = 0.9; // 90% slash

// Visual
export const LUMINOSITY_MIN = 0.05; // Never fully black
export const LUMINOSITY_GAMMA = 1.8;

// Design
export const GLASS_OPACITY = 0.85; // Frosted white (#FFFFFF @ 85%)
