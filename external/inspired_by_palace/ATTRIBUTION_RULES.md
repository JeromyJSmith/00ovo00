---
tags:
  - provenance
  - attribution
  - guidelines
document_type: attribution_rules
created: 2026-03-12
---

# Attribution Rules — Safe Language for DTRN/Symbiquity References

> This document defines the language rules that prevent provenance confusion
> between Symbiquity Foundation's publicly documented concepts and Jero's
> independent research proposals.

---

## Standard Attribution Banner

Add this blockquote to every document that references both Symbiquity concepts and Jero's proposals:

```markdown
> ⚠️ **Independent Research** — This document describes independent design
> proposals by Jero. References to Symbiquity Foundation concepts are
> citations to publicly available materials only. This work is not
> affiliated with, endorsed by, or part of the Palace OS platform.
```

---

## Required Frontmatter Fields

Every core concept document must include:

```yaml
origin: jero_original | jero_extension | inspired_by | symbiquity_public
symbiquity_refs: []        # list of claim_ids from canonical baseline
attribution_note: "Independent proposal. Not part of Palace OS."
```

### Origin Values

| Value | Meaning | When to Use |
|---|---|---|
| `jero_original` | Entirely Jero's idea | No canonical Symbiquity equivalent exists |
| `jero_extension` | Builds on a canonical concept | Takes a verified Symbiquity idea further |
| `inspired_by` | Conceptually related | Shares philosophy but different implementation |
| `symbiquity_public` | Direct description of their work | Only for canonical baseline docs |

---

## Safe Phrasing Patterns ✅

Use these patterns when referencing Symbiquity concepts:

- "Inspired by Symbiquity's paraconsistent approach (see CGT-003)"
- "Maps to CGT's ternary structure as described in claim CGT-002"
- "Compatible with the Cognitive OS framing described in PALACE-002"
- "Independent proposal by Jero, related to concepts explored by Symbiquity"
- "Extends the principle of contradiction tolerance (CGT-003) into operational quarantine"
- "GILM's 'silence preserves dignity' principle (GILM-003) inspired this mechanism"
- "DTRN adopts a ternary hold state inspired by paraconsistent approaches"

---

## Forbidden Phrasing Patterns ❌

Never use these patterns unless the claim has a verified `claim_id`:

- "Palace OS includes/does/has X" (unless X has a verified claim_id)
- "Symbiquity's MirrorState" (MirrorState is Jero-original)
- "Symbiquity's DreamArtifact" (DreamArtifact is Jero-original)
- "Symbiquity's SentinelAgent" (SentinelAgent is Jero-original)
- "Symbiquity's MELD" (MELD is Jero-original)
- "Symbiquity's TONE" (TONE is Jero-original)
- "Symbiquity's HUSH" (HUSH is Jero-original)
- "Symbiquity's VEIL" (VEIL is Jero-original)
- "Palace OS State-2 quarantine" (their State-2 = "subjective/false", not quarantine)
- "Extending Palace OS with..." (implies modifying their codebase)
- "Part of the Palace architecture" (for any Jero-original concept)
- "DTRN implements Palace OS" (DTRN is independent)

---

## Relationship Type Definitions

| Type | Definition | Example |
|---|---|---|
| `matches` | Same idea; Jero independently wants the same thing | Ternary logic adoption |
| `inspired_by` | Conceptually derived from canonical concept | State-2 "hold" from CGT's 2="subjective" |
| `extension` | Adds new mechanisms not stated by Symbiquity | MirrorState quarantine from GILM's "pause" |
| `divergence` | Different goal or architecture entirely | Mesh networking vs. Palace OS (no overlap) |
| `independent` | No relationship to any canonical concept | Latent space reasoning, edge AI |

---

## Quick Reference Card

Before publishing or sharing any document, verify:

1. ✅ Does every Symbiquity claim reference a `claim_id`?
2. ✅ Is every Jero-original idea marked with `origin: jero_original`?
3. ✅ Does the attribution banner appear at the top?
4. ✅ Does no sentence say "Palace OS does X" where X is Jero's design?
5. ✅ Are GILM references canonical only (GILM-001/002/003)? Are MELD/TONE/HUSH/VEIL marked as Jero-original?
