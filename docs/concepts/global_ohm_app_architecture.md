---
title: "Global Ohm App Architecture"
origin: jero_extension
symbiquity_refs: [CGT-002, CGT-006, PALACE-001]
related_docs:
  - gsni_proximity_resonance.md
  - 80_percent_resonance_lock.md
  - unimplemented_features.md
  - global_ohm_memorial.md
  - now_phonetic_filter_sweep.md
source_lines: "L500–L906, L1970–L2003"
attribution_note: "The Global Ohm as a playable proof-of-concept for Palace OS is described in source conversations. The specific technology stack, scoring algorithms, and architectural decisions are Jero's original engineering designs."
---

> ⚠️ **Independent Research** — This document describes independent design
> proposals by Jero for the Global Ohm application. References to Symbiquity
> Foundation concepts (Palace OS, CGT) are citations to publicly available
> materials only. The technology stack, scoring system, and engineering
> specifications are Jero's original contributions.

# Global Ohm App Architecture

## Overview

The **Global Ohm** is a collective resonance web application designed as a living memorial to Rome Viharo and a playable proof-of-concept for Palace OS and Consensus Compositional Game Theory. It replaces competitive voting with a game-theoretic process of continuous, collaborative tuning.

## [CANONICAL] Core Concept

The app maps collective intelligence to a **physical metaphor: the analog dimmer switch (potentiometer)**:

- **Individual Agency**: Every participant uses their phone to turn a virtual knob, adjusting their own frequency between 200 Hz and 800 Hz
- **Transparency**: Users can visually hear and see everyone else tuning simultaneously
- **Collaborative Refinement**: Users dynamically adjust in real-time, gravitating toward a shared tone — no "winners" or "losers"

## [JERO] Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend & Audio** | Next.js 14, React Three Fiber (3D triangles), Tone.js (Web Audio API formant synthesis) |
| **Backend & Sync** | Supabase Realtime via WebSockets (frequency states, swarm visualization) |
| **Blockchain** | Polygon network, RomeEventBus smart contract |
| **Spatial** | Geosemantic Network Intelligence (GSNI) via The Graph Protocol + Cloudflare Workers |
| **Identity** | 00v00.00 domain protocol ("Owl Protocol") |

## [JERO] The "Rome Score" Algorithm (1,000 Points Max)

Good-faith participation is gamified:

| Component | Points | Criteria |
|-----------|--------|----------|
| **Frequency Alignment** | 400 | Proximity to the modal cluster frequency |
| **Time in Resonance** | 300 | Duration sustained in the locked state |
| **Open-Mindedness** | 200 | Crossing the 500 Hz neutral point (flip spin direction) |
| **Early Joining** | 100 | Bonus for early participation |

## [JERO] System Thresholds & Logic

### Resonance Lock Threshold
≥ 80% of participants must tune to within **± 2 Hz** or **± 5 Hz** of the modal cluster frequency.

### Bad-Faith Exploitation Penalty
If a participant exceeds **>10 frequency changes per minute** (rate > 0.16 changes/second):
- Algorithm flags them
- Rome Score slashed by **90%**
- Visual opacity and audio volume gradually decay

### Proximity Detection
- BLE: ~10 meters
- Geohash: 7-character prefix → ~150 meters precision

### Minimum Participation
- Basic resonance detection: ≥ 3 active users
- Full "Ceremony Mode": ≥ 10 active users

## [CANONICAL] Proving Palace OS

The app demonstrates:
1. **Consensus through tuning, not voting** — no binary choices
2. **State-2 in action** — the knob's middle space IS collaborative refinement
3. **Bad-faith neutralization** — disruptors are computationally ignored, not censored
4. **Win-win as computational guarantee** — alignment is the only stable outcome

> *"Intelligence isn't something you invent, it's something you tune into."*
