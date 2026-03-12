# Jero's Independent Proposal Space

> **Independent design notes. Not affiliated with Symbiquity Foundation.
> References to Palace OS or PAXIS are limited to publicly available
> materials and are not claims about private or non-open-source platform features.**

---

**Document type**: Independent Proposal Space
**Author**: Jeromy Smith (Jero)
**Date**: 2026-03-12
**Purpose**: Catalog all of Jero's independent concepts in one place, clearly separated from Symbiquity canonical claims
**Rule**: Nothing in this document belongs to Symbiquity Foundation. Where inspiration is drawn from public Symbiquity materials, it is explicitly noted.

---

## How to Read This Document

Every entry below is Jero's independent work. Entries are grouped by domain. Each entry includes:

- **Concept name** and brief description
- **Origin type**: `jero_original` (no Symbiquity relationship) or `jero_extension` (builds on a cited Symbiquity concept)
- **Symbiquity refs**: Specific claim_ids from the Canonical Baseline if any relationship exists; empty if fully independent
- **Source file**: Where the full proposal lives in the repository

---

## A. Architecture Proposals

### A1. Distributed Ternary Reasoning Network (DTRN)
- **Description**: Peer-to-peer system where every phone is an edge node capable of independent ternary reasoning, local BitNet inference, and collective consensus-building.
- **Origin**: `jero_original`
- **Symbiquity refs**: None. DTRN is not an implementation of Palace OS.
- **Source**: `/research/02_architecture/system_architecture.md`

### A2. Edge Node Architecture
- **Description**: Phone as first-class DTRN node with BitNet inference engine, frequency oscillator, P2P network interface, local graph cache, and quarantine system.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/research/02_architecture/system_architecture.md`, `/docs/concepts/EDGE_NODE_ARCHITECTURE.md`

### A3. P2P Mesh Networking (libp2p / Reticulum / LoRa / HaLow)
- **Description**: Decentralized physical communication infrastructure enabling sovereign, off-cloud connectivity between DTRN nodes.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/research/02_architecture/system_architecture.md`

### A4. BitNet Ternary Weight Integration
- **Description**: Using Microsoft's BitNet ternary weights (-1, 0, +1) for local inference on phones. Maps hardware-level ternary to DTRN's logical ternary.
- **Origin**: `jero_original`
- **Symbiquity refs**: None. BitNet is Microsoft Research, not Symbiquity.
- **Source**: `/docs/concepts/bitnet_ternary_weights.md`

### A5. Owl Address (Decentralized Identity)
- **Description**: Format `username.00v00.00` for decentralized identity in DTRN mesh. Web3-compatible alternatives (Unstoppable Domains, ENS).
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/research/02_architecture/system_architecture.md`

---

## B. Cognition & Reasoning Proposals

### B1. Ternary Convergence Thesis
- **Description**: Three independent systems (BitNet, Rome's CGT, Synthegent) converged on ternary logic, suggesting it is the natural structure of distributed intelligence. This convergence observation and synthesis are Jero's original work.
- **Origin**: `jero_extension`
- **Symbiquity refs**: CGT-002 (ternary logic), CGT-003 (paraconsistency) — cited as one of three converging systems
- **Source**: `/research/01_core_concepts/ternary_convergence_thesis.md`

### B2. Latent Space Reasoning (AI Subconscious)
- **Description**: Seven paradigms for reasoning in continuous vector space without tokenization (COCONUT, Soft Thinking, Huginn, Pause Tokens, etc.). Proposes latent space as the continuous substrate beneath discrete ternary labels.
- **Origin**: `jero_original`
- **Symbiquity refs**: None. Cites academic ML literature only.
- **Source**: `/research/01_core_concepts/latent_space_reasoning.md`

### B3. State-2 Implementation Specification
- **Description**: Technical spec for operationalizing State-2 as a "productive hold" mechanism — observable-but-isolated semantics, quarantine protocol details.
- **Origin**: `jero_extension`
- **Symbiquity refs**: CGT-002 (defines State-2 as "subjective/false"); Jero reinterprets as "productive hold"
- **Source**: `/docs/concepts/state2_implementation_spec.md`

---

## C. Safety & Adversarial Proposals

### C1. Adversarial Mirror State (MirrorState) + Productive Hold Pipeline
- **Description**: When a bad actor is identified, instead of binary accept/reject, the observer state is frozen as a read-only "mirror" for productive analysis. The frozen state feeds a five-stage pipeline: (1) Diagnose — identify the anomaly pattern, (2) Correct — fix the immediate issue, (3) Understand — learn the pattern via geometric forensics, (4) Solve — prevent recurrence by updating detection rules, (5) Train — label the event for model improvement. Costs more compute than discard, but compounds: each quarantine event makes the next one cheaper. Due process for AI agents.
- **Origin**: `jero_original`
- **Symbiquity refs**: CGT-003 (paraconsistent principle conceptually aligned with the quarantine hold concept)
- **Note**: MirrorState is NOT a Symbiquity feature. The pause-over-force principle is formalized in MELD's HUSH protocol (D1). The entire Productive Hold pipeline is Jero-original.
- **Source**: `/research/01_core_concepts/adversarial_mirror_state.md`

### C2. SentinelAgent (Anomaly Detection)
- **Description**: Automated detection mechanism that identifies behavioral anomalies and triggers MirrorState creation. Part of the adversarial system.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/research/01_core_concepts/adversarial_mirror_state.md`

### C3. State-2 Dream Observatory
- **Description**: Pipeline that takes noise filtered from flagged agents, puts it through latent space, and uses a diffusion model to generate diagnostic abstract images (DreamArtifacts). Produces visual feedback on WHY something was flagged.
- **Origin**: `jero_original`
- **Symbiquity refs**: CGT-002 (ternary structure referenced for State-2 semantics)
- **Source**: `/research/01_core_concepts/state_2_dream_observatory.md`

### C4. DreamArtifact Pipeline (NoiseTrace -> DreamSeed -> DreamArtifact)
- **Description**: Three-stage conversion: capture adversarial noise traces, seed them into latent space, render via diffusion. Deterministic reproducibility for audit.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/research/01_core_concepts/state_2_dream_observatory.md`

---

## D. Meaning Preservation Proposals

### D1. MELD System (Meaning Engine for Language Dynamics)
- **Description**: Independent meaning preservation engine for DTRN with four subsystems: MELD (system-level orchestration), TONE (meaning/nuance processing), HUSH (State-2 pause protocol — holds ambiguity without forcing resolution), VEIL (verification and integrity layer). Includes MirrorState integration, State-2 quarantine mapping, and observability layers.
- **Origin**: `jero_original`
- **Symbiquity refs**: PALACE-002 (dual-layer architecture concept inspired MELD's layered approach), CGT-002 (ternary logic informs State-2 semantics), CGT-003 (paraconsistent principle inspired HUSH's pause-over-force design)
- **Source**: `/research/01_core_concepts/meld_meaning_engine.md`

---

## E. Consensus & Game Proposals

### E1. ROME Consensus Engine
- **Description**: Ternary consensus protocol for DTRN mesh. Multi-stage pipeline with anomaly detection, quarantine, and graph-based knowledge consolidation.
- **Origin**: `jero_extension`
- **Symbiquity refs**: CGT-004 (Dynamic Nash Equilibrium), CGT-006 (CCGT), GAME-001 (Parley), GAME-002 (Great Game) — inspired by these game-theoretic approaches
- **Note**: ROME is Jero's implementation proposal, not a Symbiquity product.
- **Source**: `/dtrn_research_project/03_diagrams/rome_consensus_engine.mmd`

---

## F. Knowledge & Data Proposals

### F1. Graph-RAG (GAG) — Graph-Augmented Generation
- **Description**: Breakthrough insight combining retrieval-augmented generation with Neo4j knowledge graph for DTRN. Enables distributed knowledge synthesis.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/dtrn_research_project/STATUS.md`

### F2. Neo4j Knowledge Graph (DTRN-specific)
- **Description**: Distributed knowledge graph with local caches on edge nodes. Inspired by the concept of collective knowledge publishing.
- **Origin**: `jero_extension`
- **Symbiquity refs**: GRAIL-001 (GRAIL's collective publishing concept inspired the knowledge graph approach)
- **Note**: The specific Neo4j implementation and distributed cache architecture are Jero-original.
- **Source**: `/research/02_architecture/system_architecture.md`

### F3. Synthegent Matrix (100-Agent Research Orchestration)
- **Description**: Multi-agent research framework with 80 honest + 20 adversarial agents. Distributed knowledge gathering with survey orchestration.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/docs/synthegent/SYNTHEGENT_MATRIX.md`

---

## G. Embodiment & Frequency Proposals

### G1. Phonetic Chain Discovery (TURING -> TURNING -> TUNING)
- **Description**: Linguistic-mathematical discovery that these three words form an isomorphic transformation chain. Maps to ternary state transitions.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/docs/concepts/phonetic_chain_math.md`

### G2. NOW Phonetic Filter Sweep (N+O+W = 220 -> 730 -> 300 Hz)
- **Description**: The word "NOW" decomposes into a vocal filter sweep mapping phonemes to frequencies. Maps to ADSR envelope.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/docs/concepts/now_phonetic_filter_sweep.md`

### G3. ADSR as Universal Transfer Function
- **Description**: Attack/Decay/Sustain/Release envelope maps to respiration, phonetic articulation, and ternary state transitions. Universal pattern across domains.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/docs/concepts/adsr_universal_transfer_function.md`

### G4. Frequency-to-Color Synesthesia
- **Description**: Embodied frequency visualization system mapping audio frequencies to colors for the Global Ohm app interface.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/docs/concepts/gsni_proximity_resonance.md`

### G5. 80% Resonance Lock Threshold
- **Description**: Harmonic lock specification: 80% user alignment triggers consensus. Threshold for the Global Ohm app.
- **Origin**: `jero_original`
- **Symbiquity refs**: None
- **Source**: `/docs/concepts/80_percent_resonance_lock.md`

---

## H. Application Proposals

### H1. Global Ohm Memorial App
- **Description**: Next.js web app as memorial to Rome Viharo (1967-2025). Implements ternary knob interface, frequency oscillation, resonance visualization, Supabase Realtime sync, ceremony projection mode.
- **Origin**: `jero_original`
- **Symbiquity refs**: None (the app uses ternary concepts but is not a Symbiquity product)
- **Source**: `/global-ohm/`

---

## I. Evaluation & Benchmarking Proposals

### I1. GRAIL-Bench (Multi-Domain Reasoning Benchmark)
- **Description**: 8-domain evaluation suite testing AI on meaning preservation, contradiction handling, State-2 hold behavior, cultural nuance, and epistemic humility. Includes scoring rubric with red line failures and per-domain criteria.
- **Origin**: `jero_original`
- **Symbiquity refs**: None for benchmark design. Name "GRAIL" originates from Rome Viharo; benchmark augments the concept.
- **Source**: `/research/01_core_concepts/GRAIL_BENCH_SPEC.md`, `/research/01_core_concepts/GRAIL_BENCH_PROMPTS.md`, `/research/01_core_concepts/GRAIL_BENCH_RUBRIC.md`

---

## Summary Statistics

| Category | Count | Origin Breakdown |
|----------|-------|--------------------|
| Architecture | 5 | 5 jero_original |
| Cognition & Reasoning | 3 | 1 jero_original, 2 jero_extension |
| Safety & Adversarial | 4 | 4 jero_original |
| Meaning Preservation | 1 | 1 jero_original |
| Consensus & Games | 1 | 1 jero_extension |
| Knowledge & Data | 3 | 2 jero_original, 1 jero_extension |
| Embodiment & Frequency | 5 | 5 jero_original |
| Application | 1 | 1 jero_original |
| Evaluation & Benchmarking | 1 | 1 jero_original |
| **Total** | **24** | **20 jero_original, 4 jero_extension** |

---

## Boundary Statement

Every concept in this document is Jero's independent work. The 4 items marked `jero_extension` build on publicly cited Symbiquity concepts and include explicit claim_id references. The 19 items marked `jero_original` have no Symbiquity equivalent and no attribution obligation.

**Nothing in this document is part of Palace OS, PAXIS, GRAIL, or any other Symbiquity platform.**
