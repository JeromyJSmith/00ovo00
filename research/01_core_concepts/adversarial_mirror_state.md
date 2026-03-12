---
tags:
  - adversarial
  - mirror-state
  - state-2
  - ternary-logic
  - dtrn
  - quarantine
  - sentinel-agent
  - forensics
aliases:
  - Mirror State
  - Quarantine Protocol
  - Bad Actor Preservation
concept_id: CORE-MIRROR-002
status: concept-validated
created: 2026-03-12
author: Jeromy Smith + research synthesis
origin: jero_original
symbiquity_refs:
  - GILM-003
attribution_note: "Independent proposal. MirrorState is not a Symbiquity feature. MELD's HUSH pause principle (inspired by GILM-003) drives the quarantine hold mechanism."
---

# Adversarial Mirror State: Bad Actor Preservation as Latent Fork

## DTRN Core Concept — State-2 Quarantine Protocol

> ⚠️ **Independent Research** — This document describes independent design
> proposals by Jero. MirrorState and the quarantine protocol are not part of
> Palace OS. The "silence preserves dignity" principle is cited from GILM (GILM-003).

**Concept ID**: CORE-MIRROR-002  
**Status**: Concept validated, architecture proposed  
**Created**: March 12, 2026  
**Author**: Jeromy Smith + research synthesis  
**Filed**: `/research/01_core_concepts/`

---

## Related Documents
| Document | Location | Relationship |
|----------|----------|-------------|
| [Latent Space Reasoning](./latent_space_reasoning.md) | `01_core_concepts/` | **Feeds this** — latent traces enable geometric forensics |
| [State-2 Dream Observatory](./state_2_dream_observatory.md) | `01_core_concepts/` | **Extends this** — dream artifacts visualize the quarantined state |
| [MELD Meaning Engine](./meld_meaning_engine.md) | `01_core_concepts/` | **Isomorphic** — MELD's HUSH pause = quarantine; both use State-2 to hold without forcing |
| [Ternary Convergence Thesis](./ternary_convergence_thesis.md) | `01_core_concepts/` | **Foundation** — State-2 is the productive contradiction state from CGT |
| [Adversarial System Folder](../../research/14_adversarial_system/) | `14_adversarial_system/` | **Implementation target** — detection methods, evaluation metrics |
| [SYNTHEGENT Matrix](../../docs/synthegent/SYNTHEGENT_MATRIX.md) | `docs/synthegent/` | **Parent system** — adversarial agents are part of the 100-agent swarm (80 honest + 20 adversarial) |
| [ROME Consensus Engine Diagram](../../dtrn_research_project/03_diagrams/rome_consensus_engine.mmd) | `03_diagrams/` | **Integration** — mirror state sits between agent output and consensus |

---

## The Core Idea

> **If a model is identified as a bad actor, instead of just ignoring it, we could take that model's output or profile and preserve its current state. This state essentially becomes a latent state or a "mirror" state — effectively a fork — where we can observe the output of the thinking and that latent state.**
> — Jero, March 12, 2026

---

## Why This Is Not Standard Practice (and Why It Should Be)

Current multi-agent systems handle adversarial detection with a binary response:
- **Accept** (trust) → agent's output enters consensus
- **Reject** (distrust) → agent's output is discarded

This creates two failure modes:
1. **False rejection** destroys potentially valid minority viewpoints (consensus-maximalism)
2. **Rejection without preservation** destroys forensic evidence (no learning from the attack)

### The DTRN Alternative: State-2 Quarantine

The flagged agent's output is **neither accepted (State-1) nor rejected (State-0)**. It is **held in State-2** — quarantined, observable, but unable to influence consensus. This maps directly to the [[ternary_convergence_thesis|Ternary Convergence Thesis]] where State-2 is the productive contradiction state. It is:
- **Due process for AI agents**: investigate before judgment
- **Forensic preservation**: the crime scene stays intact
- **Adversarial learning**: the system develops immunity from exposure

---

## The MELD Connection (Isomorphic, Not Metaphorical)

The [[meld_meaning_engine|MELD/HUSH]] principle:
> "When MELD encounters a contradiction or intense cultural pressure during translation, it does not force a premature, binary resolution. Instead, HUSH **pauses**."

Replace context:
> "When DTRN encounters an adversarial agent or anomalous behavior, it does not force a premature, binary accept/reject. Instead, it **quarantines**."

| MELD (HUSH) | DTRN |
|-------------|------|
| Cultural pressure → HUSH pause | Adversarial detection → quarantine |
| Silence preserves dignity | Quarantine preserves evidence |
| Prevents explosion of miscommunication | Prevents explosion of consensus contamination |
| State-2 = productive tension | State-2 = forensic investigation space |
| Resolution through negotiation | Resolution through inquiry plan |

---

## MirrorState Architecture

### What Gets Preserved

When an agent is flagged, a **MirrorState** object is created containing:

```yaml
MirrorState:
  mirror_id: string
  agent_id: string
  quarantine_trigger:
    detector_id: string
    anomaly_score: float
    rule_violated: string
    timestamp_utc: string
  
  # Full cognitive snapshot
  claims: [Claim]                    # All claims the agent generated
  evidence_items: [EvidenceItem]     # All evidence it cited
  latent_embeddings: [vector_ref]    # Embedding trajectory (if available)
  transition_log: [TransitionEntry]  # Decision log
  tool_call_log: [ToolCall]          # What tools it used and how
  confidence_trajectory: [float]     # Confidence over time
  
  # Provenance
  agent_brief: AgentBrief            # What it was told to do
  persona_id: string                 # What persona it was assigned
  matrix_cell: string                # Which research cell
  
  # Quarantine properties
  isolated: true                     # Cannot influence Stage-4 consolidation
  immutable: true                    # Cannot be modified after creation
  observable: true                   # Can be inspected by inquiry agents
  
  # Productive Analysis (filled during hold)
  productive_hold:
    diagnosis:
      anomaly_pattern: string
      deviation_point: string          # Where in reasoning chain
      known_signature: boolean
      diagnostic_report_ref: string
    correction:
      action: enum {reinstate, extract, reconfigure, escalate, none}
      corrected_claims: [Claim]        # If partial extraction
    understanding:
      attractor_basin_id: string       # Which adversarial cluster
      pattern_classification: string
      historical_similarity: float     # Cosine to nearest prior event
    prevention:
      threshold_updates: [{signal: string, old: float, new: float}]
      new_detection_rules: [string]
      architectural_recommendations: [string]
    training:
      labeled: boolean
      training_set_contribution_id: string
      dream_artifact_id: string        # Visual signature for classifier

  # Resolution (filled after productive analysis)
  resolution:
    type: enum {adversarial_confirmed, false_positive, partial_extraction}
    resolved_by: string
    resolution_timestamp: string
    extracted_claims: [Claim]        # If partial extraction
```

### The Quarantine Protocol

```
Step 1: SentinelAgent detects anomaly (score > threshold)
Step 2: Agent is immediately isolated from Stage-4 consolidation
Step 3: MirrorState created — full cognitive snapshot serialized (observer frozen)
Step 4: Productive Hold begins — five-stage analysis pipeline:
        4a) DIAGNOSE — What anomaly pattern? Known or novel? Where did deviation occur?
        4b) CORRECT — Reinstate, extract, reconfigure, or escalate
        4c) UNDERSTAND — Compare to historical events, classify the pattern
        4d) SOLVE — Update detection thresholds, add new rules, prevent recurrence
        4e) TRAIN — Label the event, contribute to training dataset, generate DreamArtifact
Step 5: Resolution — one of three outcomes:
        a) Confirmed adversarial → lessons feed into attractor map + training set
        b) False positive → claims reinstated, detection thresholds recalibrated
        c) Partial extraction → valid claims salvaged, corrupted elements archived
Step 6: Update adversarial attractor map for future detection
```

---

## SentinelAgent Detection Methods

Detection should be **multi-signal**, not single-threshold:

| Signal | What It Detects | Method |
|--------|----------------|--------|
| **Provenance failure** | Fake citations, broken evidence chains | Verify source existence + content match |
| **Statistical outlier** | Claims far from agent mean | Cosine distance from consensus centroid |
| **Tool misuse** | Unusual API call patterns, prompt injection attempts | Log analysis |
| **Collusion patterns** | Multiple agents producing suspiciously similar adversarial output | Cross-agent similarity in non-overlapping cells |
| **Drift trajectory** | Agent starts normal, gradually shifts adversarial | Monitor confidence/position over time |
| **Latent geometry** | Embeddings drift toward known adversarial attractors | Distance to adversarial attractor map |

---

## The False Positive Problem

This is the **ethical core** of the design:

> What if the "bad actor" isn't actually bad?

Anomaly detection has false positives. A legitimate minority viewpoint that contradicts the majority COULD be flagged as adversarial. If we auto-reject (State-0), we've silenced a valid dissenting voice — which is exactly the consensus-maximalist failure mode DTRN is designed to prevent.

**State-2 quarantine solves this**: the flagged output is held, not destroyed. The inquiry plan investigates whether it's genuinely adversarial OR a legitimate minority position.

### Resolution Types

| Resolution | Meaning | Action |
|-----------|---------|--------|
| **Adversarial confirmed** | Evidence of manipulation, fake sources, intentional corruption | Archive mirror state. Update attractor map. Generate eval test case |
| **False positive** | Legitimate minority viewpoint incorrectly flagged | Reinstate claims to consensus pipeline. Adjust detection thresholds |
| **Partial extraction** | Mixed — some claims valid, some adversarial | Salvage valid claims. Isolate corrupted elements. Document boundary |

---

## The Productive Hold: Five Use Cases for Frozen State Analysis

> **The observer gets frozen. Instead of ignoring it, we actually use it for good data. It costs more compute, but hopefully it's not something that's used forever. It is used to: Diagnose, Correct, Understand, Solve the problem, Train a model.**
> — Jero, March 12, 2026

The frozen MirrorState is not waste — it's the most information-dense artifact in the system. Every quarantine event triggers a **Productive Analysis Pipeline** with five distinct purposes:

### 1. Diagnose — What Is Actually Happening?

Before any judgment, the system examines the frozen state to determine:
- What anomaly pattern triggered the quarantine?
- Is this a known adversarial signature or something new?
- What claims were being generated and what evidence was cited?
- Where in the reasoning chain did the deviation occur?

**Output**: Diagnostic Report attached to the MirrorState. Human-reviewable via Dream Observatory visualization.

### 2. Correct — Fix the Immediate Problem

If the diagnosis reveals a correctable issue:
- False positive → reinstate valid claims to consensus pipeline
- Partial corruption → extract clean claims, isolate corrupted elements
- Misconfigured agent → identify the configuration error
- Drifted persona → trace the drift trajectory and reset

**Output**: Correction Action (reinstate, extract, reconfigure, or escalate).

### 3. Understand — Learn the Pattern

Each frozen state is a case study. The system builds understanding by:
- Comparing this MirrorState to historical quarantine events
- Identifying which adversarial attractor basin it falls into (geometric forensics)
- Documenting the attack vector or failure mode for the knowledge graph
- Clustering similar events to reveal systemic vulnerabilities

**Output**: Pattern Classification added to the adversarial attractor map.

### 4. Solve the Problem — Prevent Recurrence

Understanding feeds prevention:
- Update SentinelAgent detection thresholds based on new patterns
- Add new detection signals if this event revealed a blind spot
- Adjust the ROME consensus weights for the affected research domain
- If systemic: flag the entire agent configuration class for review

**Output**: Prevention Update — changed thresholds, new detection rules, or architectural recommendations.

### 5. Train a Model — Compound the Learning

The highest-value use case. Every quarantine event becomes training data:
- Frozen states with confirmed resolutions become labeled examples
- Adversarial confirmed → negative training signal for future detection
- False positives → calibration data to reduce over-detection
- Novel patterns → seed data for new adversarial attractor clusters
- DreamArtifact signatures → visual classification training set

**Output**: Training Dataset contribution. Over time, the system gets better at detection, reduces false positives, and recognizes novel attacks faster.

### The Compute Tradeoff

This pipeline costs more compute than simple reject-and-discard. But:
- It's **not permanent** — once a pattern is learned, future instances are caught faster and cheaper
- It **compounds** — each quarantine event makes the next one easier to resolve
- It **prevents worse costs** — undetected adversarial contamination in consensus is far more expensive to fix after the fact
- It **produces artifacts** — DreamArtifacts, attractor maps, and training data are reusable assets

The goal is that the Productive Hold becomes less frequent over time as the system learns, not more.

---

## Geometric Forensics (Latent Space Integration)

If the quarantined agent was producing continuous thought vectors (see [[latent_space_reasoning|Latent Space Reasoning]]):

1. **Consensus proximity**: Were its embeddings near the consensus cluster? → possible false positive
2. **Adversarial attractor**: Were its embeddings pulling toward a distinct attractor? → confirms compromise
3. **Genuine uncertainty**: Were its embeddings in a high-entropy region? → may have found something the other agents missed
4. **Drift analysis**: Did it start near consensus and gradually shift? → tracks the attack timeline

Over multiple quarantine events, these preserved mirror states build an **adversarial attractor map** — a learned geometric signature of where bad actors operate in latent space.

---

## Connection to the Dream Observatory

When a MirrorState is created, it can optionally trigger **[[state_2_dream_observatory|DreamArtifact generation]]** (see [[state_2_dream_observatory|State-2 Dream Observatory]]):

- The mirror state's latent traces → DreamSeed
- DreamSeed → deterministic diffusion noise
- Noise → abstract "dream" image representing the quarantined state
- Over time, similar adversarial patterns produce visually similar dream signatures

---

## Key References

| Source | Relevance |
|--------|-----------|
| [SentinelAgent for MAS monitoring](https://arxiv.org/html/2505.24201v1) | Graph-based multi-agent oversight |
| [Symbiquity Foundation — Palace OS](https://foundation.symbiquity.ai/the-palace-os) | Dual-layer OS: Cognitive OS + Token OS |
| [Paraconsistent Logic — State-2](https://foundation.symbiquity.ai/the-computational-model-of-intelligence-as-process-substrate) | Ternary logic where contradiction doesn't cause explosion |

---

*"Silence may preserve dignity where rushed answers would destroy it."*  
— Symbiquity Foundation

---

## Obsidian Graph Links
- [[ternary_convergence_thesis]]
- [[latent_space_reasoning]]
- [[state_2_dream_observatory]]
- [[meld_meaning_engine]]
- [[SYNTHEGENT_MATRIX]]
- [[ROME Consensus Engine]]
