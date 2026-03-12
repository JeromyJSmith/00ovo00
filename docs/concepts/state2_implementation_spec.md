---
title: "State-2 Implementation Specification"
origin: jero_original
symbiquity_refs: [CGT-002, CGT-003]
related_docs:
  - bitnet_ternary_weights.md
  - ccgt_consensus_game_theory.md
  - ternary_pyramid_geometry.md
source_lines: "L1522–L1700"
attribution_note: "This pasteable specification is Jero's original engineering work. It references Symbiquity's canonical ternary logic (CGT-002, CGT-003) but the data model, transition rules, and implementation details are entirely Jero's independent contributions."
canonical_baseline: "/external/symbiquity_canonical/PALACE_OS_CANONICAL_BASELINE_2026-03-12.md"
attribution_rules: "/external/inspired_by_palace/ATTRIBUTION_RULES.md"
---

> ⚠️ **Independent Research** — This document describes independent design
> proposals by Jero. References to Symbiquity Foundation concepts (ternary logic,
> paraconsistent reasoning) are citations to publicly available materials only.
> This specification is not affiliated with, endorsed by, or part of the Palace OS
> platform.

# State-2 Implementation Specification

## Overview

This is a **pasteable implementation specification** for storing and reasoning with ternary truth values in AI systems. It translates Rome Viharo's theoretical State-2 concept into concrete data structures, transition rules, and query-time behavior.

## Data Model

### Ternary Proposition Structure

```python
class TernaryProposition:
    claim_id: str                    # e.g., "claim_42"
    state: TernaryState              # AFFIRM | HOLD | DENY
    confidence: float                # 0.0 – 1.0
    evidence_for: list[Evidence]     # Supporting evidence
    evidence_against: list[Evidence] # Contradicting evidence
    hold_reason: str | None          # Why this is in HOLD (if applicable)
    timestamp: datetime              # Last state change
```

### Ternary State Enum

```python
class TernaryState(Enum):
    AFFIRM = 1    # Sufficient evidence supports the claim
    HOLD = 2      # Contradictory or insufficient evidence — the claim is neither true nor false
    DENY = 0      # Sufficient evidence refutes the claim
```

## Transition Rules

### AFFIRM → HOLD
**Trigger**: New contradictory evidence arrives with `weight ≥ 0.3`
```python
if new_evidence.contradicts(current_claim) and new_evidence.weight >= 0.3:
    claim.state = HOLD
    claim.hold_reason = f"Contradicted by {new_evidence.source}"
    claim.evidence_against.append(new_evidence)
```

### HOLD → AFFIRM
**Trigger**: Contradiction is resolved AND supporting evidence confidence exceeds `0.7`
```python
if contradiction_resolved(claim) and claim.confidence > 0.7:
    claim.state = AFFIRM
    claim.hold_reason = None
```

### HOLD → DENY
**Trigger**: Contradiction-resolving evidence firmly refutes AND confidence drops below `0.3`
```python
if refuting_evidence_dominant(claim) and claim.confidence < 0.3:
    claim.state = DENY
    claim.hold_reason = None
```

### DENY → HOLD
**Trigger**: New supporting evidence arrives with `weight ≥ 0.3`
```python
if new_evidence.supports(current_claim) and new_evidence.weight >= 0.3:
    claim.state = HOLD
    claim.hold_reason = f"Reopened by {new_evidence.source}"
    claim.evidence_for.append(new_evidence)
```

## Query-Time Behavior

When a system queries a claim in **HOLD state**, the response is:

```python
def query_claim(claim_id: str) -> TernaryResponse:
    claim = get_claim(claim_id)
    if claim.state == TernaryState.HOLD:
        return TernaryResponse(
            state="HOLD",
            message="This claim has conflicting evidence",
            evidence_for=claim.evidence_for,
            evidence_against=claim.evidence_against,
            recommendation="Gather more evidence before deciding"
        )
```

**Key behavior**: The system **returns both sides of the conflict** without forcing resolution. This is the computational implementation of Palace OS's State-2 principle.

## NMLSM Alignment (Neural Multi-Level State Machine)

| NMLSM Layer | State-2 Role | Description |
|-------------|-------------|-------------|
| **Perception** | Ambiguity flag | Input cannot be classified clearly |
| **Working Memory** | Conflict buffer | Two conflicting facts held simultaneously |
| **Long-term Memory** | Unresolved archive | Claims stored with full evidence on both sides |
| **Decision** | Deliberation gate | Prevents premature action under uncertainty |
| **Output** | Qualified response | "I hold conflicting evidence on this" |

## Confidence Scoring

```python
def calculate_confidence(claim: TernaryProposition) -> float:
    total_for = sum(e.weight for e in claim.evidence_for)
    total_against = sum(e.weight for e in claim.evidence_against)
    total = total_for + total_against
    if total == 0:
        return 0.5  # Perfect uncertainty
    return total_for / total
```

## Integration with Existing AI Systems

### LLM Integration
- **System prompt injection**: "When you encounter conflicting evidence, do not force a binary answer. Instead, present both sides and state your confidence level."
- **Structured output**: Use the `TernaryResponse` schema for any claim-evaluation task
- **Memory layer**: Store propositions with ternary states in vector databases alongside embeddings

### RAG Pipeline Integration
- **Retrieval**: Fetch evidence from both sides when a HOLD-state claim is queried
- **Generation**: LLM explicitly acknowledges contradictions rather than hallucinating a resolution
- **Verification**: Cross-check generated claims against the ternary store before outputting

## Design Principles

1. **Never force resolution** — HOLD is a valid permanent state
2. **Evidence-weighted** — All transitions require quantified evidence
3. **Transparent** — Users always see why a claim is in HOLD
4. **Reversible** — States can move in any direction as evidence changes
5. **Paraconsistent** — Contradictions don't crash the system (no "principle of explosion")
