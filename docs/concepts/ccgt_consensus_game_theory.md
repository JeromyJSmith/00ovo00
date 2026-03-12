---
title: "Consensus Compositional Game Theory (CCGT)"
origin: symbiquity_public
symbiquity_refs: [CGT-001, CGT-002, CGT-003, CGT-004, CGT-005, CGT-006, GAME-001, GAME-002]
related_docs:
  - hegelian_dialectic_palace.md
  - collective_intelligence_ci.md
  - state2_implementation_spec.md
  - ternary_pyramid_geometry.md
  - 80_percent_resonance_lock.md
source_lines: "L2100–L2300, L2445–L2474"
attribution_note: "Content derived from Symbiquity Foundation's public materials describing Rome Viharo's Consensus Compositional Game Theory. All claim IDs reference the canonical baseline."
canonical_baseline: "/external/symbiquity_canonical/PALACE_OS_CANONICAL_BASELINE_2026-03-12.md"
attribution_rules: "/external/inspired_by_palace/ATTRIBUTION_RULES.md"
---

# Consensus Compositional Game Theory (CCGT)

## Overview

**Consensus Compositional Game Theory (CCGT)** — also known as **Conversational Game Theory (CGT)** — is Rome Viharo's core mathematical framework for transforming human disagreement into collaborative intelligence. It is the computational heart of the Palace OS platform.

CCGT replaces competitive voting mechanisms with a system of continuous, collaborative refinement, where **contradiction is computationally useful** rather than destructive.

## The Computational Model of Intelligence

Rome Viharo's foundational paper — *"The Computational Model of Intelligence as Process-Substrate"* — establishes the theoretical basis:

### Three Folds of Intelligence

| Fold | Name | Property | Description |
|------|------|----------|-------------|
| 1 | **Intelligence** | Self-teaching | Localized cognitive ability to adapt, learn, problem-solve |
| 2 | **High Intelligence** | Self-organizing | Systemic coherence; patterns without plan, generates stability without overseer |
| 3 | **Higher Intelligence** | Self-distributing | Relational continuity across time, scale, environments |

These are **not separable layers** nor **levels stacked hierarchically** — they are **"relational aspects of one and the same substrate-process."**

## Paraconsistent Ternary Logic

CCGT operates on a paraconsistent logic system with three states:

| State | Code | Meaning (Canonical) |
|-------|------|---------------------|
| State-0 | `0` | Mystery / False / Unknown |
| State-1 | `1` | Objective / True / Known |
| State-2 | `2` | Subjective / Contradictory / Both |

### Key Property: Contradiction Tolerance
In classical logic, a contradiction (A ∧ ¬A) triggers the **"principle of explosion"** — everything becomes trivially true with arbitrary, meaningless outputs. CCGT's paraconsistent logic **isolates** contradictions, preventing propagation.

## The 9×3 Narrative Logic Decision Tree

CCGT uses a **9×3 structure** that produces **243 possible narrative states**:

- 9 positions × 3 ternary states = 27 per dimension
- 27 × 9 contextual frames = **243 states**

This tree structure ensures that every possible combination of thesis, antithesis, and context is explicitly computable.

## Dynamic Nash Equilibrium

Rome's innovation beyond traditional Nash Equilibrium:

### Traditional Nash Equilibrium
- Static: once found, players have no incentive to deviate
- Binary: each player optimizes their own payoff
- Zero-sum possible: one player's gain can be another's loss

### Dynamic Nash Equilibrium (CCGT)
- **Continuous**: equilibrium shifts as new information enters
- **Ternary**: players can hold multiple positions simultaneously (State-2)
- **Win-win guaranteed**: mutual resolution is the only computationally stable outcome
- **Bad-faith immunity**: agents who refuse collaboration are computationally excluded

## Influence Distribution Rules

| Agent Behavior | Influence Granted |
|---------------|-------------------|
| Forces binary closure (demands 0 or 1) | **Zero influence** |
| Acknowledges contradiction (enters State-2) | **Edit permissions** → shapes consensus |
| Collaborates to decompose positions | **Full participation** → refines shared narrative |
| Rapid oscillation (bad-faith gaming) | **Flagged and decayed** |

## The Great Game Protocol

### Setup
- Multiple agents (human or AI) enter a structured dialogue
- Each agent holds an initial position (thesis)

### Process
1. **Expression**: Each agent states their position
2. **Contradiction Detection**: System identifies where positions conflict
3. **State-2 Entry**: Agents who acknowledge contradictions enter the "Hold" state
4. **Decomposition**: Grand claims are broken into contextual sub-claims
5. **Refinement**: Sub-claims are independently evaluated
6. **Synthesis**: A new composite position emerges from resolved and unresolved sub-claims

### Resolution
The game produces a **"consensus narrative"** — not a vote tally, not a majority opinion, but a **compositional synthesis** that preserves the complexity of all inputs.

## GRAIL Database Schema

GRAIL (Global Resolution, Alignment, and Inquiry Library) stores the game's outputs:

```cypher
(Person)-[:HOLDS_POSITION]->(Position)
(Position)-[:CONTRADICTS]->(Position)
(Position)-[:SYNTHESIZES {via: "State-2"}]->(Position)
(Agent)-[:INFLUENCE {score: float}]->(Narrative)
```

## Connection to Biological Systems

CCGT mirrors biological collective intelligence:

| Biological System | CCGT Parallel |
|------------------|---------------|
| Honeybee uncommitted scouts | State-2 agents (exploration phase) |
| Stop signals (cross-inhibition) | Bad-faith neutralization |
| Waggle dance (information sharing) | Position expression |
| Quorum threshold | Dynamic Nash convergence |
| No central authority | No moderator, no vote |
