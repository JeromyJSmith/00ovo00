---
title: "80% Resonance Lock Algorithm"
origin: mixed
symbiquity_refs: [CGT-002, CGT-006]
related_docs:
  - global_ohm_app_architecture.md
  - now_phonetic_filter_sweep.md
  - ccgt_consensus_game_theory.md
source_lines: "L960–L982, L2240–L2295"
attribution_note: "The 80% quorum concept is discussed in source conversations as part of Palace OS principles. The specific algorithmic implementation (5 Hz buckets, modal detection, minimum thresholds, ceremony triggers) represents Jero's engineering specification."
---

> ⚠️ **Mixed Provenance** — The quorum-based resonance concept aligns with
> Symbiquity's Palace OS principles. The specific algorithmic parameters and
> implementation design are Jero's independent engineering work.

# 80% Resonance Lock Algorithm

## Overview

The 80% resonance lock algorithm is the mathematical core of the Global Ohm and Palace OS frameworks. It computationally triggers a collective "State-2" consensus moment **without relying on traditional voting**.

## The Clustering Mechanism

The system does **not** calculate a simple average (which could be skewed by outliers). Instead, it uses **modal frequency detection** to identify the densest cluster of agreement.

### Step 1: 5 Hz Buckets

As users turn their virtual knobs (200–800 Hz), the algorithm:
1. Takes each participant's current frequency
2. Rounds to the nearest **5 Hz**
3. Places them into frequency "buckets"

### Step 2: The 80% Threshold

The system continuously sorts buckets to find the single **most populated cluster** — the modal frequency.

**Lock condition:**
```
count_in_modal_bucket >= participants.length * 0.8
```

The lock is achieved only when **≥ 80%** of total active participants fall within the dominant **± 5 Hz** cluster.

### Step 3: Minimum Participation Limits

To prevent false positives:

| Mode | Minimum Users |
|------|--------------|
| Basic resonance detection | **3** active users |
| Full "Ceremony Mode" | **10** active users |

## The Systemic Trigger

Once 80% lock is achieved:

1. **Notification**: All devices receive "LOCK ACHIEVED" / "RESONANCE DETECTED" with progress bar
2. **Brief countdown**
3. **Override**: Algorithm overrides individual knob controls
4. **Synchronization**: All devices execute unified action:
   - **N-O-W phonetic filter sweep** (simultaneously on all phones)
   - **Triangle swarm reversal** — all 3D triangles reverse direction and lock into sacred geometry formation

## Biological Inspiration

The threshold is modeled after **biological quorum sensing** in honeybee swarms:
- Scout bees use vibrational "stop signals" (cross-inhibition) to suppress competing dances
- A critical mass must agree before the entire swarm acts
- The 80% threshold prevents premature lock-in while ensuring sufficient consensus

## Connection to Dynamic Nash Equilibrium

This algorithm is the **programmatic manifestation** of Rome Viharo's "Dynamic Nash Equilibrium":

> *"Collective intelligence does not require forcing binary choices, but can dynamically emerge when participants are given the tools to continuously tune and align their positions into a shared harmonic cluster."*
