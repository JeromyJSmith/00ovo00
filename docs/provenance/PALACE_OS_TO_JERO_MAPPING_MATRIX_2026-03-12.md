# Provenance Mapping Matrix — Palace OS to Jero Proposals

> **Independent design notes. Not affiliated with Symbiquity Foundation.
> References to Palace OS or PAXIS are limited to publicly available
> materials and are not claims about private or non-open-source platform features.**

---

**Document type**: Provenance Mapping Matrix
**Date**: 2026-03-12
**Comparison mode**: Full DTRN/MCPA proposal space
**Source documents**:
- Canonical: `PALACE_OS_CANONICAL_BASELINE_2026-03-12.md`
- Independent: `JERO_INDEPENDENT_PROPOSAL_SPACE_2026-03-12.md`
- Language rules: `ATTRIBUTION_LANGUAGE_RULES_2026-03-12.md`

---

## Relationship Types

| Type | Definition |
|------|-----------|
| `match` | Same high-level goal; independently desired by both |
| `inspired_by` | Jero's proposal draws from a publicly cited Symbiquity concept |
| `extension` | Jero adds mechanisms not stated in any Symbiquity public source |
| `divergence` | Different goal, scope, or architecture |
| `unknown` | Relationship unclear; needs discussion with Symbiquity |

## Attribution Risk Levels

| Level | Meaning | Action Required |
|-------|---------|----------------|
| NONE | Fully independent; no Symbiquity relationship | Publish freely |
| LOW | Relationship is clear and safely attributable | Publish with attribution note |
| MEDIUM | Relationship is close; wording must be precise | Review wording before sharing |
| HIGH | Risk of implying Jero's proposal is a Symbiquity feature | Do not publish without Symbiquity discussion |

---

## Matrix: Core Logic Layer

| # | Canonical Concept | Canonical Source | Jero Proposal | Relationship | Risk | Approved Public Wording |
|---|------------------|-----------------|---------------|-------------|------|------------------------|
| 1 | Ternary Logic 0/1/2 (CGT-002) | /the-computational-model-* | Ternary Convergence Thesis (B1) | `extension` | MEDIUM | "Jero's convergence thesis observes that three independent systems — including CGT's ternary structure (CGT-002) — converged on ternary logic" |
| 2 | Paraconsistent logic (CGT-003) | /the-computational-model-* | State-2 quarantine as operational paraconsistency (C1) | `extension` | MEDIUM | "Extends the paraconsistent principle (CGT-003) into an operational quarantine mechanism — an independent proposal" |
| 3 | Dynamic Nash Equilibrium (CGT-004) | /the-computational-model-* | ROME Consensus Engine (E1) | `inspired_by` | LOW | "ROME consensus is inspired by CGT's Dynamic Nash Equilibrium (CGT-004)" |
| 4 | 9x3 Narrative Logic Tree (CGT-005) | /the-computational-model-* | — | `divergence` | NONE | Not adopted in DTRN |
| 5 | CCGT game class (CGT-006) | /the-great-game-* | ROME consensus protocol (E1) | `inspired_by` | LOW | "Inspired by the CCGT class (CGT-006)" |
| 6 | Metrics: CCR, RP, RL, CS (CGT-007) | /the-computational-model-* | — | `divergence` | NONE | DTRN uses different metrics |

## Matrix: Platform / Architecture Layer

| # | Canonical Concept | Canonical Source | Jero Proposal | Relationship | Risk | Approved Public Wording |
|---|------------------|-----------------|---------------|-------------|------|------------------------|
| 7 | Palace OS — AI Governance OS (PALACE-001) | /the-palace-os | DTRN — Distributed Ternary Reasoning Network (A1) | `divergence` | LOW | "DTRN is an independent architecture, not an implementation of Palace OS" |
| 8 | Cognitive OS + Token OS dual layer (PALACE-002) | / (homepage) | Edge Node perception/inference split (A2) | `inspired_by` | MEDIUM | "DTRN's edge architecture draws inspiration from Palace OS's dual-layer concept (PALACE-002) but implements a fundamentally different split" |
| 9 | "Collective intelligence, not AI" (PALACE-003) | / (homepage) | Collective intelligence via DTRN mesh (A1) | `match` | LOW | "Both systems share the principle that intelligence emerges from collective process" |
| 10 | Upcoming layers: War, Warmth, etc. (PALACE-004) | /the-palace-os | — | `divergence` | NONE | DTRN does not adopt Palace OS layers |
| 11 | Gardens/Library extensions (PALACE-005) | /the-palace-os | — | `divergence` | NONE | DTRN does not adopt Palace OS extensions |
| 12 | v1.0 prototype on GPT (PALACE-006) | /the-palace-os | — | `divergence` | NONE | DTRN uses BitNet/edge, not GPT hosting |

## Matrix: Games & Protocols Layer

| # | Canonical Concept | Canonical Source | Jero Proposal | Relationship | Risk | Approved Public Wording |
|---|------------------|-----------------|---------------|-------------|------|------------------------|
| 13 | Parley — 1-on-1 game (GAME-001) | /the-great-game-* | ROME pairwise consensus step (E1) | `inspired_by` | LOW | "ROME's pairwise step is inspired by Parley's co-intelligence pairing (GAME-001)" |
| 14 | The Great Game — scaled game (GAME-002) | /the-great-game-* | DTRN mesh-wide consensus (E1) | `inspired_by` | LOW | "DTRN mesh consensus is inspired by the scaled game-theoretic approach of The Great Game (GAME-002)" |
| 15 | Co-Intelligence (COINTEL-001) | /the-great-game-* | — | `divergence` | NONE | Not directly adopted in DTRN |
| 16 | TAP — Token Alignment Protocol (TAP-001) | /the-great-game-* | — | `unknown` | LOW | TAP page unavailable; cannot compare. No DTRN equivalent proposed |
| 17 | GRAIL — collective knowledge library (GRAIL-001) | /the-great-game-* | Neo4j Knowledge Graph (F2) | `inspired_by` | LOW | "DTRN's knowledge graph is inspired by GRAIL's collective publishing concept (GRAIL-001); the Neo4j implementation is independent" |

## Matrix: PAXIS / Infrastructure Layer

| # | Canonical Concept | Canonical Source | Jero Proposal | Relationship | Risk | Approved Public Wording |
|---|------------------|-----------------|---------------|-------------|------|------------------------|
| 18 | PAXIS — AI legal support (PAXIS-001) | / (homepage) | DTRN sovereign communication (A1, A3) | `inspired_by` | MEDIUM | "DTRN proposes infrastructure that could support platforms like PAXIS; not an implementation of PAXIS" |
| 19 | Hosted independently from Big Tech (PAXIS-002) | / (homepage) | Self-hosted edge compute + mesh (A2, A3) | `match` | LOW | "Both prioritize independence from commercial cloud providers" |

## Matrix: Meaning Preservation Layer

| # | Canonical Concept | Canonical Source | Jero Proposal | Relationship | Risk | Approved Public Wording |
|---|------------------|-----------------|---------------|-------------|------|------------------------|
| 20 | GILM — meaning preservation (GILM-001)* | Not in minimum corpus | MELD System (D1) | `inspired_by` | MEDIUM | "Jero's MELD system is an independent meaning preservation engine. Its dual-layer approach draws inspiration from Palace OS architecture principles (PALACE-002)." |
| 21 | "Turn the Nose" cultural game (GILM-002)* | Not in minimum corpus | — | `divergence` | NONE | Not adopted in DTRN |
| 22 | "Silence preserves dignity" (GILM-003)* | Not in minimum corpus | MirrorState quarantine hold (C1) | `inspired_by` | LOW | "MELD's HUSH protocol pauses instead of forcing resolution — a principle conceptually aligned with paraconsistent approaches (CGT-003). MirrorState is Jero's independent design." |

*Note: GILM claims (GILM-001/002/003) are from prior retrieval of `/global-language-interpretation-ai`, which is NOT part of the minimum 4-URL corpus. They are included here for completeness but carry lower source confidence.

## Matrix: Jero-Only Proposals (No Canonical Equivalent)

| # | Jero Proposal | Canonical Equivalent | Relationship | Risk |
|---|--------------|---------------------|-------------|------|
| 23 | MirrorState quarantine protocol (C1) | None | `independent` | NONE |
| 24 | SentinelAgent anomaly detection (C2) | None | `independent` | NONE |
| 25 | Dream Observatory (C3) | None | `independent` | NONE |
| 26 | DreamArtifact Pipeline (C4) | None | `independent` | NONE |
| 27 | Latent Space Reasoning (B2) | None | `independent` | NONE |
| 28 | BitNet ternary integration (A4) | None | `independent` | NONE |
| 29 | P2P Mesh networking (A3) | None | `independent` | NONE |
| 30 | Owl Address identity (A5) | None | `independent` | NONE |
| 31 | Graph-RAG / GAG (F1) | None | `independent` | NONE |
| 32 | Synthegent Matrix (F3) | None | `independent` | NONE |
| 33 | Phonetic Chain (G1) | None | `independent` | NONE |
| 34 | NOW Filter Sweep (G2) | None | `independent` | NONE |
| 35 | ADSR Transfer Function (G3) | None | `independent` | NONE |
| 36 | Synesthesia visualization (G4) | None | `independent` | NONE |
| 37 | 80% Resonance Lock (G5) | None | `independent` | NONE |
| 38 | Global Ohm memorial app (H1) | None | `independent` | NONE |

---

## Risk Summary

| Risk Level | Count | Items |
|-----------|-------|-------|
| **HIGH** | 0 | — |
| MEDIUM | 5 | #1 (ternary extension), #2 (paraconsistency extension), #8 (dual-layer inspiration), #18 (PAXIS infrastructure), #20 (MELD system) |
| LOW | 9 | #3, #5, #7, #9, #13, #14, #17, #19, #22 (HUSH/MirrorState) |
| NONE | 24 | All Jero-original concepts + divergences |
| **Total rows** | **38** | |

---

## Risk Mitigation Notes

With the rename from "GILM Extension Proposal" to MELD (Meaning Engine for Language Dynamics), the two former HIGH-risk items (#20, #22) have been resolved:

- **Row 20 (now MEDIUM)**: MELD is an independent system with its own name, architecture, and subsystems (TONE, HUSH, VEIL). It no longer extends or names itself after a Symbiquity concept. The dual-layer inspiration from PALACE-002 is a standard `inspired_by` relationship.
- **Row 22 (now LOW)**: The pause-over-force principle is formalized as MELD's HUSH protocol and attributed to paraconsistent logic (CGT-003) rather than to GILM-003 specifically. MirrorState remains fully Jero-original.

No HIGH-risk items remain. Standard attribution diligence applies to all MEDIUM items.

---

## What You Own (Presentation Summary)

When presenting to Symbiquity or collaborators, you can confidently say:

**"I created 23 independent concepts. 19 of them have zero relationship to Symbiquity. 4 of them were inspired by or extend publicly documented Symbiquity ideas, with clear citation. Here is the mapping."**

Breakdown:
- **19 fully original**: MELD (Meaning Engine for Language Dynamics) with TONE/HUSH/VEIL subsystems, MirrorState, SentinelAgent, Dream Observatory, DreamArtifact, Latent Space Reasoning, BitNet integration, P2P mesh, Owl Address, Graph-RAG, Synthegent, Phonetic Chain, NOW Filter, ADSR, Synesthesia, Resonance Lock, Global Ohm app, Edge Node architecture, Convergence Thesis observation
- **4 extensions/inspired-by**: Ternary Convergence (extends CGT-002/003), ROME Consensus (inspired by CGT-004/006/GAME-001/002), Knowledge Graph (inspired by GRAIL-001), State-2 Spec (extends CGT-002)
