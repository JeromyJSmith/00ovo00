# REPO ORGANIZATION STRATEGY
## 0ovo0 — Global Rome + DTRN Research

**Created**: March 11, 2026
**Purpose**: Organize this repo for GitHub collaboration with researchers and app developers
**Status**: PARTIALLY EXECUTED — see corrections below
**Updated**: March 11, 2026 — Fixed duplicate app/ issue

---

## THE SITUATION

### What We Have
- **27 root-level markdown files** — mixed research, transcripts, proposals, app docs
- **`dtrn_research_project/`** — Well-scaffolded 16-folder structure, 3 folders populated, 13 empty
- **`global-ohm/`** — Working Next.js app (the memorial/resonance app)
- **`AI Agent Thread Patterns/`** — 10 agent workflow pattern docs
- **`outreach/`** — 6 partnership/grant documents
- **`repomix-skill/`** — Skill file (utility)

### The Problem
A new collaborator arriving at this repo would face 27 loose markdown files with no clear entry point. The DTRN research project has great structure but lives as a subfolder. The app code is separate from its documentation. The connections between Rome's work, DTRN research, and the Global Ohm app aren't visible.

---

## PROPOSED STRUCTURE

```
0ovo0/
│
├── README.md                          ← NEW: GitHub landing page (replace current)
├── CLAUDE.md                          ← KEEP: AI assistant context
├── LICENSE                            ← KEEP/CREATE: MIT
├── CONTRIBUTING.md                    ← NEW: How to contribute
│
├── research/                          ← DTRN research (EVOLVE from dtrn_research_project/)
│   ├── README.md                      ← Already exists (00_project_overview/README.md)
│   ├── 01_core_concepts/              ← ✅ Has ternary_convergence_thesis.md
│   ├── 02_architecture/               ← ⭕ Empty, fill from Genspark content
│   ├── 03_diagrams/                   ← ✅ Has 12 .mmd files
│   ├── 04_paper_draft/                ← ⭕ Fill from arXiv draft in Genspark
│   ├── 05_technical_specs/            ← ⭕ Fill from code specs in Genspark
│   ├── 06_existing_pipeline/          ← ⭕ Map SYNTHEGENT integration
│   ├── 07_implementation_roadmap/     ← ⭕ Build phases
│   ├── 08_research_references/        ← ⭕ Literature citations
│   ├── 09_conversation_history/       ← Move conversation transcripts here
│   ├── 10_rome_memorial_context/      ← ⭕ Rome's bio + memorial context
│   ├── 11_web3_app/                   ← Specs only (code stays in app/)
│   ├── 12_survey_system/              ← ⭕ Survey orchestration docs
│   ├── 13_human_ai_reasoning/         ← ⭕ Human+AI collaboration docs
│   ├── 14_adversarial_system/         ← ⭕ Bad actor detection docs
│   └── 15_ui_ux_design/               ← ⭕ Design system docs
│
├── global-ohm/                        ← KEEP original name (the living Next.js codebase)
│   ├── app/                           ← Next.js App Router (route groups for multi-app)
│   │   ├── (resonance)/               ← Main frequency/knob/ceremony experience
│   │   ├── (research)/                ← DTRN research interfaces (future)
│   │   ├── (identity)/                ← Web3/owl-address identity (future)
│   │   └── api/                       ← Shared API routes
│   ├── lib/                           ← Shared modules (audio, synesthesia, neo4j, etc.)
│   └── README.md                      ← App-specific dev instructions
│
│   ⚠️  DELETE the `app/` folder at root — it's an accidental copy of global-ohm/
│
├── docs/                              ← NEW: Human-readable documentation
│   ├── README.md                      ← Docs index
│   ├── discovery/                     ← The origin story
│   │   ├── 0ovo0_Part1_The_Discovery_and_The_Pattern.md
│   │   ├── 0ovo0_Part2_The_Song_The_Chain_The_Name.md
│   │   └── 0ovo0_Part3_Building_Rome.md
│   ├── concepts/                      ← Plain-language explanations
│   │   ├── ROMES_FINAL_CONCEPT.md
│   │   ├── GLOBAL_ROME_SUMMARY.md
│   │   └── APP_UX_FLOW.md
│   ├── analysis/                      ← Deep dives and cross-analysis
│   │   ├── DEEP_ANALYSIS_Two_Transcripts.md
│   │   ├── RESEARCH_MATRIX_Ternary_Concepts.md
│   │   ├── notebookLM_analysis.md
│   │   └── SYNTHEGENT_INTEGRATION_ANALYSIS.md
│   ├── synthegent/                    ← Synthegent-specific docs
│   │   ├── SYNTHEGENT_MATRIX.md
│   │   ├── SYNTHEGENT_MATRIX_Application.md
│   │   ├── SYNTHEGENT_1.1.1.md
│   │   └── aynthagent_research_1.1.1.md
│   ├── agents/                        ← Agent patterns and orchestration
│   │   ├── ROME_SUPER_AGENT.md
│   │   └── (contents of AI Agent Thread Patterns/)
│   ├── media/                         ← Podcast transcripts, external media
│   │   ├── notebookLM_podcast_transcript.md
│   │   └── notebookLM.md
│   └── outreach/                      ← MOVE from outreach/
│       └── (all 6 existing files)
│
├── planning/                          ← Project management
│   ├── RESEARCH_PROPOSAL.md
│   ├── ROME.md                        ← Original project README/index
│   ├── rome_w.md
│   ├── MERMAID DIAGRAM SUITE.md
│   └── CONNECTION_MAP.md              ← NEW: How everything connects
│
├── raw/                               ← Unprocessed reference material
│   ├── 0ovo0.md                       ← Master 14,589-line conversation (DO NOT MODIFY)
│   ├── GENSPARK_CONVERSATION_RAW.md   ← Raw Genspark DTRN session
│   └── repomix-output.md
│
└── tools/                             ← Utilities and skills
    └── repomix-skill/
```

---

## FILE MIGRATION MAP

### Root Files → New Locations

| Current File | → New Location | Rationale |
|---|---|---|
| `0ovo0.md` | `raw/` | Master transcript, archive reference |
| `0ovo0_Part1_*.md` | `docs/discovery/` | Origin story Act I |
| `0ovo0_Part2_*.md` | `docs/discovery/` | Origin story Act II |
| `0ovo0_Part3_*.md` | `docs/discovery/` | Origin story Act III |
| `APP_UX_FLOW.md` | `docs/concepts/` | App concept doc |
| `CLAUDE.md` | `.` (root) | AI context, stays at root |
| `DEEP_ANALYSIS_Two_Transcripts.md` | `docs/analysis/` | Cross-analysis |
| `GITHUB_SETUP_COMPLETE.md` | DELETE or `planning/` | Setup artifact, may be obsolete |
| `GIT_SETUP.md` | DELETE or `planning/` | Setup artifact, may be obsolete |
| `GLOBAL_ROME_SUMMARY.md` | `docs/concepts/` | Plain-language summary |
| `MERMAID DIAGRAM SUITE.md` | `planning/` | Diagram collection reference |
| `README.md` | REPLACE with new root README | Current one needs updating |
| `RESEARCH_MATRIX_Ternary_Concepts.md` | `docs/analysis/` | Research matrix |
| `RESEARCH_PROPOSAL.md` | `planning/` | Build plan + budget |
| `ROME.md` | `planning/` | Original project index |
| `ROMES_FINAL_CONCEPT.md` | `docs/concepts/` | Core concept overview |
| `ROME_SUPER_AGENT.md` | `docs/agents/` | Agent architecture |
| `SYNTHEGENT_*.md` (4 files) | `docs/synthegent/` | Synthegent cluster |
| `aynthagent_research_1.1.1.md` | `docs/synthegent/` | Synthegent variant |
| `notebookLM.md` | `docs/media/` | NotebookLM reference |
| `notebookLM_analysis.md` | `docs/analysis/` | Analysis doc |
| `notebookLM_podcast_transcript.md` | `docs/media/` | Podcast transcript |
| `repomix-output.md` | `raw/` | Generated output |
| `rome_w.md` | `planning/` | Planning doc |

### Folder Moves

| Current | → New | Notes |
|---|---|---|
| `global-ohm/` | `app/` | Cleaner name for the codebase |
| `dtrn_research_project/` | `research/` | Promoted to top-level |
| `AI Agent Thread Patterns/` | `docs/agents/` | Merged into agents docs |
| `outreach/` | `docs/outreach/` | Under docs umbrella |
| `repomix-skill/` | `tools/repomix-skill/` | Under tools |

---

## NEW FILES TO CREATE

1. **Root `README.md`** — GitHub landing page with:
   - Project name, tagline, memorial context
   - Quick navigation to research/, app/, docs/
   - Status badges
   - "Start here" pointers for researchers vs. developers

2. **`CONTRIBUTING.md`** — How to contribute:
   - Research contributions → `research/`
   - App development → `app/`
   - Documentation → `docs/`
   - Filing issues, PR conventions

3. **`planning/CONNECTION_MAP.md`** — The Rosetta Stone:
   - How DTRN connects to Global Ohm app
   - How Rome's CGT connects to BitNet ternary
   - How Synthegent connects to DTRN agents
   - How the phonetic chain connects to the math
   - Visual connection diagram (Mermaid)

4. **`docs/README.md`** — Documentation index with guided reading order

5. **Section READMEs** — Brief index files for `docs/discovery/`, `docs/agents/`, etc.

---

## DECISIONS & RATIONALE

### Why `research/` instead of keeping `dtrn_research_project/`?
Shorter, cleaner, top-level visibility. The existing 16-folder structure inside is excellent and stays intact. Just rename the container.

### Why separate `app/` from `research/11_web3_app/`?
The DTRN structure has `11_web3_app/` for *specs and documentation*. The actual Next.js code lives in `app/`. Specs describe what to build; code is the built thing. Researchers read specs, developers read code. Keep both, cross-reference.

### Why `docs/` separate from `research/`?
`research/` is the academic/technical paper trail (thesis, specs, diagrams, paper drafts). `docs/` is the human story — the discovery conversation, plain-language concepts, podcast transcripts, agent patterns. Different audiences, different purposes.

### Why `raw/` for the master transcripts?
The 14,589-line `0ovo0.md` and the Genspark conversation are source material, not documentation. They're reference archives. Researchers might search them, but they're not meant to be read linearly. Isolating them prevents clutter.

### Why not nest deeper?
GitHub repos work best with 2-3 levels max. Anything deeper becomes hard to navigate and link to. The DTRN research structure already goes 2 levels deep, which is the sweet spot.

---

## EXECUTION ORDER

1. Create new directories (`docs/`, `planning/`, `raw/`, `tools/`)
2. Move files according to migration map
3. Rename `dtrn_research_project/` → `research/`
4. Rename `global-ohm/` → `app/`
5. Create new README.md, CONTRIBUTING.md, CONNECTION_MAP.md
6. Create section README files
7. Update all internal cross-references
8. Populate empty research/ folders from Genspark conversation content
9. Final audit — verify no broken links, no orphaned files

---

## WHAT THIS ENABLES

After reorganization:
- **New researcher** → Reads root README → goes to `research/` → finds thesis, diagrams, paper draft
- **New developer** → Reads root README → goes to `app/` → runs `npm run dev`
- **Curious person** → Reads root README → goes to `docs/discovery/` → reads the origin story
- **Collaborator** → Reads CONTRIBUTING.md → knows exactly where to put their work
- **AI agent** → Reads CLAUDE.md → understands the whole structure
