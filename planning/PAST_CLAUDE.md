# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Global Rome (0ovo0) + DTRN Research

A collective resonance web app and distributed ternary reasoning network inspired by Rome Viharo's work on collective intelligence (Symbiquity Foundation, Palace OS, Conversational Game Theory). Users turn a virtual knob on their phone to set a frequency; when multiple users align frequencies, they achieve harmonic resonance together. Memorial application for Rome Viharo (1967–2025), scheduled for March 15, 2026 at the Rose Room, Venice, LA.

**Critical architectural insight**: The app and the research framework are NOT separate systems. Every phone IS an edge node in the Distributed Ternary Reasoning Network (DTRN). The resonance experience IS the consensus protocol. The user IS the training data. "Roam" IS Rome.

---

## ⚠️ ATTRIBUTION GUARDRAILS (READ FIRST)

**This project is inspired by but NOT affiliated with the Symbiquity Foundation.**

When writing ANY content that touches both Symbiquity concepts and DTRN/Jero's ideas:

1. **Never write "Palace OS includes/does X"** unless X is in `external/symbiquity_canonical/PALACE_OS_CANONICAL_BASELINE_2026-03-12.md`
2. **Jero's independent designs** (GILM spec, MirrorState, Dream Observatory, BitNet edge, mesh networking, Owl Address, survey orchestration, synesthesia mapping, phonetic chain) must always be labeled as independent proposals
3. **Use safe language**: "inspired by", "compatible with", "maps to" — NEVER "is part of", "implements", "extends their platform"
4. **Check the mapping matrix** at `external/symbiquity_canonical/PALACE_OS_DTRN_MAPPING_MATRIX.md` before making any attribution claims
5. **Add provenance metadata** to new idea documents: `origin: jero_original | inspired_by | symbiquity_public`

See: `external/symbiquity_canonical/` for the full three-document provenance system.

---

## Repository Structure

```
0ovo0/
├── CLAUDE.md                          ← You are here
├── README.md                          ← GitHub landing page
├── CONTRIBUTING.md                    ← How to contribute
├── REPO_ORGANIZATION_STRATEGY.md      ← Repo organization plan + rationale
│
├── global-ohm/                        ← ★ CANONICAL CODEBASE (Next.js app)
│   ├── app/                           ← App Router (route groups for multi-experience)
│   │   ├── page.tsx                   ← Resonance view (knob + triangles)
│   │   ├── ceremony/page.tsx          ← Ceremony projection mapping
│   │   ├── api/                       ← API routes (graph, broadcast, survey, consensus)
│   │   └── components/                ← UI components
│   ├── lib/                           ← Shared modules
│   │   ├── node.ts                    ← ★ CORE: This device as a DTRN edge node
│   │   ├── audio.ts                   ← Tone.js engine
│   │   ├── synesthesia.ts             ← Frequency → color mapping
│   │   ├── triangle.ts                ← Spin mechanics, resonance detection
│   │   ├── resonance.ts               ← Consensus aggregation
│   │   ├── supabase.ts                ← Realtime broadcast
│   │   ├── neo4j.ts                   ← Knowledge graph operations
│   │   ├── p2p.ts                     ← libp2p connection manager
│   │   ├── bitnet.ts                  ← Local BitNet inference
│   │   ├── consensus.ts               ← ROME 3-stage ternary consensus
│   │   ├── gilm.ts                    ← GILM meaning-tone-nuance engine
│   │   └── constants.ts               ← Ternary logic constants, frequency math
│   └── README.md                      ← App-specific dev instructions
│
├── research/                          ← DTRN Research (16-folder structure)
│   ├── 00_project_overview/           ← Project overview + README
│   ├── 01_core_concepts/              ← Ternary convergence thesis, latent reasoning research
│   ├── 02_architecture/               ← System architecture, edge node design
│   ├── 03_diagrams/                   ← 13 Mermaid diagrams (.mmd files)
│   ├── 04_paper_draft/                ← Academic paper (LaTeX, target: arXiv, NeurIPS)
│   ├── 05_technical_specs/            ← Unified schemas, SQL, API specs
│   ├── 06_existing_pipeline/          ← GILM/Palace OS snap-in, Synthegent integration
│   ├── 07_implementation_roadmap/     ← Build phases, GILM research
│   ├── 08_research_references/        ← 70+ academic citations by domain
│   ├── 09_conversation_history/       ← AI conversation transcripts archive
│   ├── 10_rome_memorial_context/      ← Rome Viharo biography + legacy
│   ├── 11_web3_app/                   ← Blockchain identity spec (Owl Address, Polygon)
│   ├── 12_survey_system/              ← Survey orchestration + research mode
│   ├── 13_human_ai_reasoning/         ← Human+AI side-by-side collaboration
│   ├── 14_adversarial_system/         ← Adversarial Mirror State + Dream Observatory
│   └── 15_ui_ux_design/               ← Design system (Minimalist Brutalism + Glassmorphism)
│
├── docs/                              ← Human-readable documentation
│   ├── discovery/                     ← Origin story (3 Acts)
│   ├── concepts/                      ← Plain-language explanations + Edge Node Architecture
│   ├── analysis/                      ← Deep dives and cross-analysis
│   ├── synthegent/                    ← Synthegent Matrix docs
│   ├── agents/                        ← Agent patterns and orchestration
│   ├── media/                         ← Podcast transcripts, NotebookLM
│   └── outreach/                      ← Partnership/grant documents
│
├── planning/                          ← Project management
│   ├── CONNECTION_MAP.md              ← Rosetta Stone: how all concepts connect
│   ├── RESEARCH_PROPOSAL.md           ← Build plan + budget
│   └── ROME.md                        ← Original project index
│
├── external/                          ← Third-party canonical baselines (DO NOT MIX)
│   └── symbiquity_canonical/          ← Frozen Symbiquity public claims + source snapshots
│
├── inspired_by_palace/                ← Safe mapping between Symbiquity + DTRN
│   └── (mapping matrix lives in external/symbiquity_canonical/)
│
├── raw/                               ← Unprocessed reference material
│   └── 0ovo0.md                       ← Master 14,589-line conversation (DO NOT MODIFY)
│
└── tools/                             ← Utilities and skills
```

⚠️ **`app/` at root is a DUPLICATE** — an accidental copy of `global-ohm/`. Delete it. The canonical codebase is `global-ohm/`.

---

## Core Concepts

### Ternary Logic (The Foundation)
The system uses three states, not binary:
- **State 0**: False / Blocked / Alone / NO
- **State 1**: True / Executable / Aligned / YES
- **State 2**: Unknown / Both / Contradictory / NOW — **the key innovation**: contradiction as feature, not bug

### Edge Node Architecture
Every phone is simultaneously:
1. **A Resonance Instrument** — Turn the knob, broadcast frequency, find alignment
2. **A Research Node** — Receive queries, contribute observations, return results
3. **A Training Participant** — Every interaction feeds the ternary consensus model
4. **An Edge Compute Node** — Runs BitNet inference locally (ternary weights on CPU)
5. **A Knowledge Graph Vertex** — Your device IS a node in Neo4j

See: `docs/concepts/EDGE_NODE_ARCHITECTURE.md`

### The Phonetic Chain — TURING → TURNING → TUNING
- R (rotation/resistance) and N (vibration) separated by I (observer/ego)
- As I steps back, R→N: resistance transforms into resonance
- In TUNING, R disappears, two N's vibrate with I facilitating between them

### NOW = N + O + W
- N = vibration (nasal hum, mouth closed)
- O = OPEN (mouth opens, resonant cavity expands — like an open circuit with potential)
- W = waves (lips round, filter sweeps — current flowing through the open gap)

### ROME Consensus Protocol
Not binary consensus — ternary. When nodes disagree, that disagreement (State 2) is preserved as productive contradiction and used as a training signal. "Roam" = the collective of all roaming edge nodes, continuously training the system.

### Latent Space Reasoning
Models that "think in the subconscious" — reasoning in continuous latent space without generating text tokens. Seven paradigms studied: COCONUT (Meta), Recurrent Depth/Huginn, Pause Tokens, Soft Thinking, Token Assorted, LT-Tuning, MCOUT.

See: `research/01_core_concepts/latent_reasoning_research_brief.md`

### Adversarial Mirror State
When a bad actor is detected, don't ban them — fork their cognitive state into a read-only "mirror" in State-2 quarantine. The mirror can be studied, replayed, and its "noise" transformed into abstract diagnostic images via diffusion (the Dream Observatory).

See: `research/14_adversarial_system/adversarial_mirror_state_proposal.md`

### GILM / Palace OS
Global Interpreter for Language and Meaning — Symbiquity's meaning-tone-nuance engine built on Palace OS dual-layer architecture (Cognitive OS governs meaning; Token OS regulates generation). Uses "State-2 Silence" when meaning cannot be fully captured.

See: `research/06_existing_pipeline/gilm_meaning_tone_engine_dtrn_snapin.md`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Audio | Tone.js (Web Audio API — oscillators, formant sweeps, 730 Hz synthesis) |
| 3D Visuals | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Realtime Sync | Supabase (PostgreSQL + Realtime WebSocket broadcast) |
| Knowledge Graph | Neo4j (ternary relationships, resonance history) |
| P2P Network | libp2p + GossipSub (edge-to-edge communication) |
| Edge AI | BitNet (ternary-weight inference on phone CPU) |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Web3 | Polygon, Solidity (ERC-1155) |
| Identity | Owl Address format (username.00v00.00) |
| Decentralized Storage | IPFS + OrbitDB |

## Key Schemas

All schemas are defined in `research/05_technical_specs/schemas.md`. Key types:
- `EdgeNode` — Device as DTRN participant
- `ConsensusEvent` — Ternary consensus result
- `LatentTrace` — Latent space reasoning metadata
- `MirrorState` — Quarantined adversarial state
- `NoiseTrace` / `DreamSeedSpec` / `DreamArtifact` — Dream Observatory pipeline
- `InterpretationPackage` — GILM meaning analysis
- `SurveyQuery` / `ResearchSession` — Research mode operations

## Development

```bash
cd global-ohm
npm run dev    # starts on http://localhost:3000
```

## Architecture Notes

- This is NOT a client-server architecture — it's a **living nervous system** where every phone is a neuron
- The Next.js App Router routes are different views into the same edge node, not separate apps
- `node.ts` is the core module representing THIS device as a DTRN participant
- Resonance detection happens client-side and triggers visual/audio lock at 80%+ alignment within 5 Hz
- Triangle spin: < 430 Hz = counter-clockwise, > 430 Hz = clockwise
- At harmonic lock (730 Hz): all triangles flip simultaneously
- Research mode: users choose survey/discussion/observation/collective_reasoning
- Training loop: Interactions → Ternary Signals → Consensus Events → Model Update → Better Resonance → repeat
- Design language: Minimalist Brutalism + Soft Glassmorphism, frosted white (#FFFFFF @ 85%), Inter font family
