---
title: "N-O-W Phonetic Filter Sweep"
origin: mixed
symbiquity_refs: [CGT-002, PALACE-001]
related_docs:
  - adsr_universal_transfer_function.md
  - phonetic_chain_math.md
  - 80_percent_resonance_lock.md
  - global_ohm_app_architecture.md
source_lines: "L300–L900"
attribution_note: "The N-O-W conceptual framework is canonical Symbiquity. The precise mathematical formulations (fc(t), luminosity curves, Q factors, spin mechanics, proximity harmonics) represent Jero's engineering specifications for the Global Ohm app."
---

> ⚠️ **Mixed Provenance** — The N-O-W phonetic sweep concept is canonical Symbiquity
> Foundation material. The mathematical formulas, UI specifications, and engineering
> parameters are Jero's independent design work for the Global Ohm application.

# N-O-W Phonetic Filter Sweep

## Overview

Speaking the word **"NOW"** acts as a voltage-controlled analog filter sweep using the human resonant cavity. The First Formant (F₁) trajectory dictates frequency shifts that mirror the ADSR envelope.

## [CANONICAL] The Three Phases

| Phase | Mouth State | Filter Type | F₁ Frequency | F₂ Frequency | Ternary State |
|-------|-------------|-------------|---------------|---------------|---------------|
| **N** (Attack) | Closed, tongue on palate | Low-pass | **220 Hz** | 2500 Hz | State-0 (tension) |
| **O** (Sustain) | Maximum open cavity | Peak resonance | **730 Hz** | 1090 Hz | State-2 (OPEN) |
| **W** (Release) | Lips round and close | Sweep down | **300 Hz** | 870 Hz | State-1 (resolution) |

## [JERO] Mathematical Formulations

### Formant Cutoff Frequency fc(t)

The continuous phonetic morphing is defined:

**N to O (Rise):** `0 ≤ t < T₁`
```
fc(t) = 220 + 510 · (t / T₁)²
```

**O (Hold):** `T₁ ≤ t < T₂`
```
fc(t) = 730
```

**O to W (Fall):** `T₂ ≤ t < T₃`
```
fc(t) = 730 − 430 · ((t − T₂) / T₃)
```

Where T₁ = 0.3s, T₂ = 0.8s, T₃ = 1.5s.

### Visual Luminosity L(f)

As frequency increases, screen brightness follows a logarithmic curve matching human eye perception (γ = 1.8), ensuring the screen is never fully black (L_min = 0.05):

```
L(f) = L_min + (L_max − L_min) · ((f − 200) / (800 − 200))^1.8
```

### Synesthetic Color & Lightness Mapping

Frequency dictates color hue and lightness:
- **Hue**: 240-degree counter-clockwise shift from purple to orange
- **Lightness**: Bell curve peaking at mid-frequencies (vowels):

```
Lightness = 30 + 50 · sin(((f − 200) / 600) · π)
```

### Resonance Quality (Q Factor)

Determines sharpness of visual glow and audio filter. Spikes at pure vowel frequencies (270, 530, 730 Hz) and drops at consonants (220, 300 Hz):

```
Q = 2 + 13 · e^(−minDistance / 100)
```

### Triangle Spin Mechanics

A user's 3D geometric triangle spins at RPM proportional to distance from the 500 Hz neutral point, maxing at 120 RPM:

```
Speed = (|f − 500| / 300) · 120
```

- **Below 500 Hz**: Counter-clockwise spin
- **Above 500 Hz**: Clockwise spin
- **At 500 Hz**: Momentary pause and reverse (neutral crossing)

### Proximity Harmonic

When two users cross paths, the system generates a unified tone from the geometric mean:

```
Harmonic = √(Freq_A × Freq_B)
```

## [CANONICAL] The "NO" → "NOW" Transformation

By mathematically adding **waves (W)** to an **open circuit (O)** generating **vibration (N)**, the system transforms a static negation ("NO") into active, flowing presence ("NOW"):

- **NO** = N + O = Vibration + OPEN gap = negation, blocked circuit
- **NOW** = N + O + W = Vibration + OPEN gap + Waves = active presence, quantum tunneling

In quantum physics, an open circuit exists in superposition. Because of the addition of Waves, energy can "tunnel" through the gap, transforming "NO" into "NOW."
