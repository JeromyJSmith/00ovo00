---
tags:
  - provenance
  - mapping-matrix
  - divergence-ledger
  - symbiquity
  - dtrn
document_type: mapping_matrix
created: 2026-03-12
author: Jero
---

# Palace OS ↔ DTRN Mapping Matrix (Divergence Ledger)

> ⚠️ **Provenance Document** — This matrix compares publicly documented
> Symbiquity Foundation concepts with independent DTRN proposals by Jero.
> Relationship types are defined in `ATTRIBUTION_RULES.md`.
> Canonical claims reference IDs from `PALACE_OS_CANONICAL_BASELINE_2026-03-12.md`.

---

## Relationship Type Key

| Type | Meaning |
|---|---|
| `matches` | Same idea; independently desired by both |
| `inspired_by` | Conceptually derived from canonical concept |
| `extension` | Adds mechanisms not stated by Symbiquity |
| `divergence` | Different goal or architecture |
| `independent` | No relationship to any canonical concept |

---

## Core Logic Layer

| Claim ID | Symbiquity Feature | DTRN/Jero Feature | Relationship | Risk | Safe Wording |
|---|---|---|---|---|---|
| `CGT-002` | Ternary logic: 0=mystery, 1=objective, 2=subjective | Ternary decision engine with State-2 as "productive hold" | `extension` | Medium | "DTRN adopts CGT's ternary structure (CGT-002) and extends State-2 into an operational hold/quarantine mechanism" |
| `CGT-003` | Paraconsistent logic — contradiction tolerance | State-2 quarantine for contradictions | `extension` | Medium | "Extends the paraconsistent principle (CGT-003) into a quarantine protocol for adversarial agents" |
| `CGT-004` | Dynamic Nash Equilibrium — consensus by negotiation | Collective intelligence consensus in DTRN mesh | `inspired_by` | Low | "Inspired by CGT's Dynamic Nash Equilibrium (CGT-004) for distributed consensus" |
| `CGT-005` | 9×3 Narrative Logic Decision Tree | Not directly adopted | `divergence` | Low | N/A — no DTRN equivalent |
| `CGT-006` | Consensus Compositional Game Theory | DTRN consensus engine concept | `inspired_by` | Low | "Inspired by the CCGT class (CGT-006)" |

---

## Platform / Architecture Layer

| Claim ID | Symbiquity Feature | DTRN/Jero Feature | Relationship | Risk | Safe Wording |
|---|---|---|---|---|---|
| `PALACE-001` | The Palace — AI Governance OS | DTRN — Distributed Intelligence Architecture | `divergence` | Low | "DTRN is an independent architecture; not an implementation of Palace OS" |
| `PALACE-002` | Cognitive OS + Token OS (dual-layer) | Multimodal perception + edge AI inference | `inspired_by` | Medium | "Inspired by Palace OS's dual-layer model (PALACE-002), DTRN proposes a perception/inference split" |
| `PALACE-003` | "Collective intelligence, not AI" | Collective intelligence with consensus engine | `matches` | Low | "Both systems share the principle that intelligence emerges from collective process" |
| `PAXIS-001` | PAXIS — AI legal support platform | DTRN sovereign communication network | `inspired_by` | Medium | "Proposes infrastructure that could support platforms like PAXIS (PAXIS-001)" |
| `PAXIS-003` | Hosted independently from Big Tech | Self-hosted edge compute + mesh | `matches` | Low | "Both systems prioritize independence from commercial cloud providers" |

---

## GILM / MELD — Meaning Preservation Layer

| Claim ID | Symbiquity Feature | DTRN/Jero Feature | Relationship | Risk | Safe Wording |
|---|---|---|---|---|---|
| `GILM-001` | GILM — Global Interpreter for Language and Meaning | MELD — Meaning Engine for Language Dynamics | `independent` | Low | "MELD is an independent meaning-engine design by Jero. Inspired by the general principle of meaning preservation referenced in GILM-001, but architecturally distinct" |
| `GILM-002` | "Turn the Nose" cultural game | Not directly adopted in DTRN | `divergence` | Low | N/A — DTRN does not implement Turn the Nose |
| `GILM-003` | "Silence preserves dignity" pause principle | HUSH protocol (Hold Until Semantically Harmonized) + MirrorState preservation | `inspired_by` | Low | "GILM's principle that 'silence may preserve dignity' (GILM-003) inspired the HUSH protocol concept. HUSH is Jero's independent design within MELD" |
| `COINTEL-001` | Co-Intelligence — paired perspectives | Not directly adopted | `divergence` | Low | N/A |

---

## Jero-Original Concepts (No Canonical Equivalent)

| DTRN/Jero Feature | Canonical Equivalent | Relationship | Risk | Notes |
|---|---|---|---|---|
| MirrorState quarantine protocol | None | `independent` | Low | Entirely Jero's design for adversarial agent preservation |
| SentinelAgent anomaly detection | None | `independent` | Low | Jero's proposed detection mechanism |
| DreamArtifact pipeline (NoiseTrace → DreamSeed) | None | `independent` | Low | Latent-to-diffusion visualization — no Symbiquity equivalent |
| State-2 Dream Observatory | None | `independent` | Low | Generating images from quarantined states |
| Latent Space Reasoning (as DTRN substrate) | None | `independent` | Low | COCONUT/Huginn/Pause Tokens — academic ML research |
| MELD (Meaning Engine for Language Dynamics) | None | `independent` | Low | Jero's independent meaning-engine architecture. Not an extension of GILM |
| TONE (Tonal Overtone Nuance Engine) | None | `independent` | Low | Jero's tone/nuance tracking subsystem within MELD |
| HUSH (Hold Until Semantically Harmonized) | None | `independent` | Low | Jero's silence/quarantine protocol within MELD. Inspired by GILM-003 principle but architecturally independent |
| VEIL (Verification Engine for Interpretive Layers) | None | `independent` | Low | Jero's validation subsystem within MELD |
| GRAIL-Bench evaluation suite | None — name "GRAIL" originates from Rome Viharo | `independent` | Low | Jero's benchmark design augmenting Rome's GRAIL concept into an evaluation suite. 8 domains, scoring rubric, red line failures |
| Thread Policy Engine | None | `independent` | Low | Jero's proposed governance enforcement |
| BitNet ternary integration | None | `independent` | Low | Hardware-level ternary optimization |
| Mesh networking (Reticulum/LoRa/HaLow) | None | `independent` | Low | Physical communication infrastructure |
| Edge AI inference (BitNet/TinyLlama) | None | `independent` | Low | On-device model execution |
| Multimodal perception layer | None | `independent` | Low | Browser-based CV for event detection |
| Sovereign infrastructure model | None — PAXIS is "independently hosted" but different scope | `divergence` | Low | Community-owned telecom vs. app-level hosting |

---

## Risk Summary

| Risk Level | Count | Items |
|---|---|---|
| **HIGH** | 0 | None — MELD rename eliminates former GILM extension risks |
| Medium | 4 | Ternary logic extension, paraconsistency extension, dual-layer inspiration, PAXIS infrastructure |
| Low | 19+ | All Jero-original concepts (including MELD/TONE/HUSH/VEIL), divergences, matches |

### Notes on Former HIGH-risk Items

The rename from "GILM Extension Proposal" to **MELD (Meaning Engine for Language Dynamics)** eliminates the two former HIGH-risk items:

1. **MELD** is an independent system, not an extension of Symbiquity's GILM. No naming conflict exists.
2. **HUSH** (Hold Until Semantically Harmonized) replaces the former "State-2 quarantine hold" language that implied extending GILM-003. HUSH is Jero's independent protocol, inspired by the silence principle but architecturally distinct.
3. **Canonical GILM references**: Continue to cite `GILM-001`/`GILM-003` claim IDs when referencing Symbiquity's original concepts.
4. **MirrorState**: Remains Jero's independent design. Never attribute to Symbiquity.
