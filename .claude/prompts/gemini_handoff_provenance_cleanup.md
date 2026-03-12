# Gemini Handoff: Provenance Cleanup + Linter Build

## Context — What's Already Done

Claude completed the following work in this repo (`/Users/ojeromyo/00ovo00/`). Do NOT redo any of this:

### ✅ Provenance Package (4 deliverables — all created)
- `docs/provenance/PALACE_OS_CANONICAL_BASELINE_2026-03-12.md` — 25 canonical claims from 4-URL corpus
- `docs/provenance/JERO_INDEPENDENT_PROPOSAL_SPACE_2026-03-12.md` — 23 independent proposals (19 jero_original, 4 jero_extension)
- `docs/provenance/PALACE_OS_TO_JERO_MAPPING_MATRIX_2026-03-12.md` — 38-row mapping matrix, 0 HIGH risk
- `docs/provenance/ATTRIBUTION_LANGUAGE_RULES_2026-03-12.md` — Safe/prohibited language guide with 10-point linter checklist

### ✅ MELD Rename (GILM Extension → MELD System)
- Created `research/01_core_concepts/meld_meaning_engine.md` (replaces the old gilm doc)
- Updated ~20 files across research/, docs/provenance/, external/
- 4 subsystems: MELD (engine), TONE (processing), HUSH (State-2 pause), VEIL (verification)
- Risk dropped from 2 HIGH → 0 HIGH items

### ✅ Productive Hold Pipeline (MirrorState update)
- Added 5-stage analysis pipeline to `research/01_core_concepts/adversarial_mirror_state.md`
- Stages: Diagnose → Correct → Understand → Solve → Train
- Updated MirrorState schema with `productive_hold` field
- Cross-referenced from `research/01_core_concepts/state_2_dream_observatory.md`

---

## Your Tasks — What Needs Doing

### Task 1: GILM Filename Cleanup (stale files)

Three files still use the old `gilm` filename. The content in some was updated but the filenames weren't changed:

**A. Delete or deprecate the OLD file (replaced by meld_meaning_engine.md):**
```
research/01_core_concepts/gilm_meaning_tone_engine.md
```
This file is superseded by `research/01_core_concepts/meld_meaning_engine.md`. Add a one-line redirect note at the top pointing to the new file, or delete it if you can confirm nothing else links to it by filename.

**B. Rename this file (content was updated, filename wasn't):**
```
research/06_existing_pipeline/gilm_meaning_tone_engine_dtrn_snapin.md
→ rename to: meld_meaning_engine_dtrn_snapin.md
```
Update any cross-references after renaming.

**C. Review this canonical reference (probably fine, but verify):**
```
docs/concepts/gilm_canonical_reference.md
```
This should reference Symbiquity's GILM (the canonical concept), NOT Jero's engine. Verify it's not accidentally describing Jero's MELD system using Symbiquity's name.

### Task 2: Fix Stale Cross-References (6 files)

These files still reference the old filename `gilm_meaning_tone_engine` in their links or text:

```
research/06_existing_pipeline/README.md
research/01_core_concepts/GRAIL_BENCH_RUBRIC.md
research/01_core_concepts/GRAIL_BENCH_PROMPTS.md
research/01_core_concepts/GRAIL_BENCH_SPEC.md
walkthrough.md.resolved.md
PAST_CLAUDE.md
```

For each: update `gilm_meaning_tone_engine` → `meld_meaning_engine` in links and references. For `PAST_CLAUDE.md` — this is historical context, you can leave it as-is or add a note that the file was renamed.

### Task 3: Audit Remaining GILM References (24 files)

Run a grep for `\bGILM\b` across the repo. You'll find ~24 files. Classify each reference as:

- **LEGITIMATE** — Refers to Symbiquity's GILM concept (canonical baseline, mapping matrix, attribution rules). Leave these alone.
- **STALE** — Refers to Jero's engine using the old name. Update to MELD.
- **BORDERLINE** — Mixed context. Add clarifying language.

**Files that should have LEGITIMATE GILM references (don't change these):**
- `external/symbiquity_canonical/*` — canonical baseline docs
- `docs/provenance/PALACE_OS_CANONICAL_BASELINE_2026-03-12.md` — canonical claims
- `docs/provenance/ATTRIBUTION_LANGUAGE_RULES_2026-03-12.md` — lists "GILM Extension" as PROHIBITED phrasing
- `docs/provenance/PALACE_OS_TO_JERO_MAPPING_MATRIX_2026-03-12.md` — maps GILM to MELD
- `docs/concepts/gilm_canonical_reference.md` — Symbiquity's concept definition

**Files that need investigation:**
- `research/05_technical_specs/schemas.md`
- `research/14_adversarial_system/adversarial_mirror_state_proposal.md`
- `notebooklm-prefix.md`

### Task 4: Build the Provenance Linter Script

The 10-point checklist exists in `docs/provenance/ATTRIBUTION_LANGUAGE_RULES_2026-03-12.md` (Section 7). Turn it into an executable script.

**Requirements:**
- Language: Bash + grep (keep it simple, no dependencies)
- Location: Save to `scripts/provenance-lint.sh`
- Input: Takes a file path or directory as argument
- Output: PASS/WARN/FAIL for each check, with line numbers for violations

**The 10 checks to implement:**

1. **No unattributed Symbiquity terms** — Grep for: `Palace OS`, `PAXIS`, `GRAIL`, `CGT`, `Parley`, `Great Game`, `Co-Intelligence`, `TAP`, `Symbiquity` without an accompanying attribution qualifier (e.g., "inspired by", "compatible with", "as described by Symbiquity")
2. **No ownership claims over Symbiquity concepts** — Grep for: `our Palace`, `our GRAIL`, `our CGT`, `we built Palace`, `Jero's GILM`, `Jero's Palace`
3. **No GILM Extension language** — Grep for: `GILM Extension`, `extends GILM`, `GILM-based`, `building on GILM`
4. **Safe relationship language present** — Check that files containing Symbiquity terms also contain at least one of: `inspired by`, `compatible with`, `informed by`, `builds upon concepts from`, `independently developed`
5. **Attribution disclaimer present** — Files in `research/` and `docs/` should contain the independent research disclaimer block
6. **No confidence overstatement** — Grep for: `Symbiquity requires`, `Palace OS demands`, `CGT mandates` (asserting requirements without source)
7. **Source citations present** — Files referencing Symbiquity concepts should contain at least one URL from the canonical 4-URL corpus
8. **MELD/TONE/HUSH/VEIL correctly attributed** — These should NEVER appear with Symbiquity attribution
9. **MirrorState correctly attributed** — Should NEVER appear as a Symbiquity/Palace OS feature
10. **Provenance frontmatter present** — Files in `research/01_core_concepts/` should have `origin:` and `symbiquity_refs:` in YAML frontmatter

**Bonus checks (if time permits):**
- Flag any file that uses both "Jero" and "Symbiquity" in the same sentence without a relationship qualifier
- Flag any file in `external/symbiquity_canonical/` that contains Jero-original concept names (cross-contamination check)

### Task 5: Run the Linter

After building the script, run it against:
1. All files in `docs/provenance/`
2. All files in `research/01_core_concepts/`
3. All files in `external/`

Report the results. Fix any FAIL items. Document any WARN items that are intentional (e.g., the canonical baseline legitimately references GILM as a Symbiquity concept).

---

## Important Rules

1. **Never modify `0ovo0.md`** — Master document, read-only
2. **Never attribute MELD/TONE/HUSH/VEIL to Symbiquity** — These are Jero-original
3. **GILM references in canonical/provenance docs are CORRECT** — They refer to Symbiquity's concept, not Jero's engine
4. **When in doubt, check the mapping matrix** — `docs/provenance/PALACE_OS_TO_JERO_MAPPING_MATRIX_2026-03-12.md` is the source of truth for what belongs to whom
5. **Use `fnm use 22.18.0`** if you need Node.js (v26 canary has npm compat issues)

---

## Validation

When you're done, the following should be true:
- [ ] No file in the repo refers to Jero's meaning engine as "GILM" (only Symbiquity's GILM concept appears)
- [ ] All cross-references point to `meld_meaning_engine.md`, not the old filename
- [ ] `scripts/provenance-lint.sh` exists and runs cleanly
- [ ] Linter produces 0 FAIL results on `docs/provenance/` and `research/01_core_concepts/`
- [ ] Any WARN results are documented with justification
