# Attribution Language Rules — Safe Wording Guide

> **Independent design notes. Not affiliated with Symbiquity Foundation.
> References to Palace OS or PAXIS are limited to publicly available
> materials and are not claims about private or non-open-source platform features.**

---

**Document type**: Safe Language Guide
**Date**: 2026-03-12
**Purpose**: Prevent any sentence from implying that Jero's proposals are existing Symbiquity features
**Scope**: All documents, presentations, papers, emails, and conversations that reference both Symbiquity and DTRN

---

## 1. Required Disclaimer

Add this to the top of ANY document that mentions both Symbiquity and Jero's work:

```
Independent design notes. Not affiliated with Symbiquity Foundation.
References to Palace OS or PAXIS are limited to publicly available
materials and are not claims about private or non-open-source
platform features.
```

For formal/external documents, use this expanded version:

```
This document contains independent research proposals and is not
affiliated with the Symbiquity Foundation. References to Palace OS
or PAXIS are limited to publicly available materials and do not
imply access to proprietary systems. All independent proposals are
clearly labeled and attributed to their author.
```

---

## 2. Safe Phrasing Examples

### When referencing Symbiquity concepts:

| Context | Safe Phrasing |
|---------|--------------|
| Ternary logic adoption | "Inspired by CGT's ternary structure (CGT-002)" |
| Paraconsistency | "Extends the paraconsistent principle (CGT-003) into an independent quarantine mechanism" |
| Dual-layer architecture | "Conceptually aligned with Palace OS's dual-layer model (PALACE-002)" |
| Consensus approach | "Inspired by the Dynamic Nash Equilibrium described in CGT-004" |
| MELD system | "Jero's MELD system (Meaning Engine for Language Dynamics) is an independent meaning preservation engine" |
| MELD/TONE | "MELD's TONE subsystem processes meaning and nuance independently" |
| MELD/HUSH | "MELD's HUSH protocol pauses instead of forcing resolution — conceptually aligned with paraconsistent approaches (CGT-003)" |
| MELD/VEIL | "MELD's VEIL layer provides independent verification and integrity checks" |
| GRAIL relationship | "Compatible with GRAIL's concept of collective knowledge publishing (GRAIL-001)" |
| PAXIS relationship | "Proposes infrastructure that could support platforms like PAXIS" |
| General relationship | "Independent proposal by Jero, related to concepts explored by Symbiquity" |

### When describing Jero's proposals:

| Context | Safe Phrasing |
|---------|--------------|
| MirrorState | "Jero's independent quarantine protocol" |
| Dream Observatory | "Jero's independent visualization system for adversarial state analysis" |
| ROME Consensus | "Jero's consensus protocol, inspired by CGT game-theoretic approaches" |
| DTRN overall | "An independent distributed intelligence architecture" |
| MELD overall | "Jero's independent meaning preservation system with TONE, HUSH, and VEIL subsystems" |

---

## 3. Prohibited Phrasing

### Never use these unless directly supported by a cited claim_id:

| Prohibited Phrase | Why It's Dangerous |
|------------------|--------------------|
| "Palace OS includes X" | Implies knowledge of private implementation |
| "Palace OS implements X" | Implies knowledge of private implementation |
| "Symbiquity's MirrorState" | MirrorState is Jero-original |
| "Symbiquity's DreamArtifact" | DreamArtifact is Jero-original |
| "Symbiquity's SentinelAgent" | SentinelAgent is Jero-original |
| "GILM Extension Proposal" | MELD is independent, not a GILM extension |
| "Jero's GILM" or "extending GILM" | MELD replaces this framing entirely |
| "GILM's quarantine protocol" | Quarantine is Jero-original (HUSH protocol) |
| "Palace OS State-2 quarantine" | Symbiquity's State-2 = "subjective/false", not quarantine |
| "Extending Palace OS with..." | Implies modifying their codebase |
| "Part of the Palace architecture" | For any Jero concept |
| "DTRN implements Palace OS" | DTRN is independent |
| "Symbiquity platform does..." | Implies internal platform knowledge |
| "Palace OS system contains..." | Implies internal system knowledge |
| "Symbiquity architecture uses..." | Implies access to proprietary design |

### Never use identity language:

| Prohibited Pattern | Safe Alternative |
|-------------------|-----------------|
| "X is part of Palace OS" | "X is conceptually aligned with Palace OS principles" |
| "X implements Palace OS" | "X is an independent proposal inspired by Palace OS" |
| "X extends their platform" | "X is an independent extension of publicly described principles" |
| "Their system does Y" | "Their public materials describe Y" |

---

## 4. Relationship Type Language

When describing how Jero's proposals relate to Symbiquity concepts:

| Relationship | Approved Language |
|-------------|------------------|
| `match` | "Both systems share the principle that..." |
| `inspired_by` | "Inspired by [concept] as described in [claim_id]" |
| `extension` | "Extends the [principle] (claim_id) into [independent mechanism]" |
| `divergence` | "DTRN takes a different approach from [concept]" |
| `independent` | "No relationship to Symbiquity concepts" |
| `unknown` | "Relationship unclear; requires discussion with Symbiquity" |

---

## 5. Required Frontmatter for Research Documents

Every core concept document must include:

```yaml
origin: jero_original | jero_extension | inspired_by
symbiquity_refs: []  # list of claim_ids, or empty
attribution_note: "Independent proposal. Not part of Palace OS."
```

| Origin Value | When to Use |
|-------------|-------------|
| `jero_original` | No canonical Symbiquity equivalent exists |
| `jero_extension` | Builds on a verified Symbiquity concept |
| `inspired_by` | Shares philosophy but different implementation |

---

## 6. Confidence Labels for Uncertain Claims

When a Symbiquity concept is discussed publicly but not clearly specified:

| Label | Meaning | When to Use |
|-------|---------|-------------|
| `direct_quoteable` | Exact words from a public page | Strong confidence |
| `paraphraseable` | Meaning is clear but exact wording differs | Good confidence |
| `implied` | Suggested by context but not explicitly stated | Use cautiously |
| `unclear` | Not enough information to characterize | Flag for verification |
| `not_in_public_corpus` | Concept is referenced but page is 404 or inaccessible | Cannot verify |
| `needs_verification` | Requires direct discussion with Symbiquity | Do not publish as canonical |

---

## 7. Document Review Checklist (Provenance Linter)

Before sharing any document externally, verify all of the following:

```
[ ] Does the disclaimer appear at the top?
[ ] Does every Symbiquity claim reference a specific claim_id?
[ ] Is every Jero-original idea marked with origin: jero_original?
[ ] Does no sentence say "Palace OS does X" where X is Jero's design?
[ ] Does MELD appear as Jero-original (not as a GILM extension)?
[ ] Does no sentence use identity language ("is part of", "implements", "extends their platform")?
[ ] Are all relationship types from the approved list (match/inspired_by/extension/divergence/independent/unknown)?
[ ] Would a reader unfamiliar with both projects be able to distinguish what belongs to whom?
[ ] Are MEDIUM-risk items reviewed for precise wording?
[ ] Could any sentence reasonably be interpreted as claiming Jero's uncited proposal is a Symbiquity feature?
```

If the answer to the last question is YES, mark that sentence as **INVALID** and rewrite it using safe phrasing from Section 2.

---

## 8. Quick Reference Card

### Three questions before writing any sentence about Symbiquity:

1. **Is this claim backed by a claim_id?** If no, do not attribute it to Symbiquity.
2. **Is this Jero's design?** If yes, label it as independent.
3. **Would Symbiquity recognize this description?** If uncertain, use "needs verification."

### Three-level phrasing hierarchy:

| Level | Use When | Example |
|-------|---------|---------|
| **Strong** | Direct quote from public source | "Symbiquity publicly describes Palace OS as 'an AI Governance Operating System' (PALACE-001)" |
| **Medium** | Paraphrased relationship | "DTRN's consensus approach is inspired by CGT's game-theoretic framework (CGT-004)" |
| **Weak** | Uncertain or implied | "This concept may be related to Symbiquity's publicly described work, but the relationship is unclear" |

---

## 9. Template for Mixed-Context Presentations

When presenting both Symbiquity context and Jero proposals in the same deck or document:

### Slide/Section 1: What Symbiquity Has Built (Their Work)
- Only canonical claims with claim_ids
- Source URLs visible
- No Jero proposals mixed in

### Slide/Section 2: What Jero Has Built (Your Work)
- Only independent proposals
- Each marked as jero_original or jero_extension
- Symbiquity refs listed where applicable

### Slide/Section 3: How They Relate (The Mapping)
- Use the mapping matrix structure
- Relationship types from approved list
- Risk levels visible
- Safe wording only

### Slide/Section 4: Collaboration Opportunity
- What you bring to the table
- Where your work is complementary
- What needs discussion (HIGH risk items)

---

## 10. Emergency Rule

**If you cannot determine whether a concept belongs to Symbiquity or Jero:**

1. Label it `needs_verification`
2. Do not publish it in any external document
3. Add it to the "Known Unknowns" section of the Canonical Baseline
4. Discuss with Symbiquity before resolving

**Conservative phrasing always beats expansive interpretation.**
