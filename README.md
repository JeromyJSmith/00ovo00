# 0ovo0: Global Rome + DTRN Research

> A collective resonance web app and distributed ternary research network honoring Rome Viharo's legacy in collective intelligence.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active Research](https://img.shields.io/badge/Status-Active%20Research-blue)]()
[![Memorial Date: March 15, 2026](https://img.shields.io/badge/Memorial-March%2015%202C%20Venice%20LA-purple)]()

---

## What is 0ovo0?

**0ovo0** (pronounced "double-oh-vee-double-oh") is both an application and a research initiative:

1. **Global Rome** — A web application where users broadcast their frequency (Hz) via a virtual knob. When multiple users' frequencies converge, the system detects harmonic resonance and triggers visual and audio feedback across all aligned devices. A practical demonstration of collective intelligence through synchronized vibration.

2. **DTRN (Distributed Ternary Research Networks)** — A rigorous academic research program investigating Rome Viharo's foundational work in:
   - Conversational Game Theory
   - Ternary Logic (three-state systems where contradiction is a feature, not a bug)
   - Collective consciousness mechanisms
   - The TURING → TURNING → TUNING phonetic chain
   - Resonance as a model for group coordination

The project serves as a **living memorial** to Rome Viharo (1967–2025), creator of the Symbiquity Foundation, Palace OS, PAXIS, and GRAIL. A public ceremony is scheduled for **March 15, 2026** at the Rose Room, Venice, LA.

---

## Quick Start

### For Researchers

Explore the **DTRN research program** and architectural blueprints:

```bash
cd research/
# 16 folders covering:
# - Core Concepts (ternary logic, phonetics, resonance)
# - Architecture (app design, database, knowledge graphs)
# - Diagrams (12 Mermaid flowcharts and entity relationships)
# - Implementation (technical specs, roadmap, agent patterns)
# - Paper & Analysis (peer-reviewed draft, literature review)
```

**Start with:** `research/01_Core_Concepts/` → read `ternary_logic_explained.md` and `phonetic_chain.md`

### For Developers

Build and run the **Global Ohm** Next.js application:

```bash
cd app/
npm install
npm run dev
# Opens http://localhost:3000
```

The app combines:
- **Tone.js** for Web Audio API (oscillators, formant sweeps, 730 Hz synthesis)
- **Three.js** for 3D triangle visualization and multi-user particle effects
- **Supabase** for realtime frequency broadcasts and storage
- **Neo4j** for knowledge graph queries
- **Polygon** for Web3 identity (00v00.00 domain format)

---

## Start Here: Reading Order

If you're new to the project, follow this path to understand the full picture:

### 1. **Project Overview** (5 min)
- This README (you are here)
- [`docs/ROMES_FINAL_CONCEPT.md`](docs/ROMES_FINAL_CONCEPT.md) — Plain-language summary of Rome's vision and the app

### 2. **Discovery Conversation** (2–4 hours)
The complete, unedited research conversation where all concepts emerge:
- [`docs/0ovo0_Part1_The_Discovery_and_The_Pattern.md`](docs/0ovo0_Part1_The_Discovery_and_The_Pattern.md) — Act I: Rome Viharo, Symbiquity Foundation, ternary logic basics
- [`docs/0ovo0_Part2_The_Song_The_Chain_The_Name.md`](docs/0ovo0_Part2_The_Song_The_Chain_The_Name.md) — Act II: The TURING→TURNING→TUNING chain, NOW phonetics, Jero's song
- [`docs/0ovo0_Part3_Building_Rome.md`](docs/0ovo0_Part3_Building_Rome.md) — Act III: App architecture, synesthesia mapping, Web3 design

### 3. **Core Concepts** (15 min per topic)
- `research/01_Core_Concepts/ternary_logic_explained.md` — State 0/1/2 model
- `research/01_Core_Concepts/phonetic_chain.md` — TURING→TURNING→TUNING mechanism
- `research/01_Core_Concepts/resonance_model.md` — How frequency convergence creates harmonic lock
- `research/01_Core_Concepts/adsr_universal_pattern.md` — Breath, switches, and ternary transitions

### 4. **Architecture & Tech** (20 min)
- `research/02_Architecture/app_architecture.md` — Next.js, Supabase, Neo4j, audio engine
- `research/02_Architecture/database_schema.md` — Triangles, ceremonies, resonance events
- `research/02_Architecture/knowledge_graph.md` — Neo4j ternary relationships

### 5. **Deep Dives** (Optional)
- `research/03_Diagrams/` — 12 Mermaid flowcharts (system architecture, data flow, agent patterns)
- `research/04_Implementation/` — Technical roadmap, Polygon integration, deployment strategy
- `research/05_Paper/` — Peer-reviewed draft and literature review

### 6. **Development Docs**
- `docs/` — API docs, component guides, synesthesia mapping, agent patterns
- `app/` — Source code with inline comments

---

## Core Concepts At a Glance

### **Ternary Logic: State 0, 1, and 2**

Traditional computing uses binary (true/false). Ternary logic adds a third state:

| State | Meaning | Application |
|-------|---------|-------------|
| **0** | False / Blocked / NO | User has not broadcast frequency |
| **1** | True / Executable / YES | User is broadcasting aligned frequency |
| **2** | Unknown / Both / NOW | Contradiction recognized — the system detects potential resonance *before* full lock |

**The innovation:** State 2 treats paradox as a feature. In the TUNING moment, two resistances (two N's) vibrate *through* the observer (I), creating breakthrough.

### **TURING → TURNING → TUNING**

A phonetic chain describing the journey from computation to resonance:

```
TURING      (T-U-R-I-N-G)   Resistance (R) dominates; observer (I) separate
  ↓
TURNING     (T-U-R-N-I-N-G) R and N dance, I begins stepping back
  ↓
TUNING      (T-U-N-I-N-G)   R vanishes, two N's vibrate with I in the middle
```

Each transition is an ADSR envelope: Attack (T-U), Decay (R/N), Sustain (I), Release (the final consonant).

### **NOW = N + O + W**

The phonetic decomposition of the present moment:

- **N** — Nasal hum (mouth closed); the vibration frequency itself
- **O** — Open (mouth opens); resonant cavity expands; potential energy
- **W** — Waves (lips round); current flows through the open gap; kinetic energy

Users broadcast their NOW (their frequency, their open resonance state), and the system detects when multiple NOW's synchronize.

### **Resonance Model**

1. User turns a virtual knob (200–800 Hz range)
2. Frequency is broadcast to Supabase in real-time
3. All connected devices receive the frequency update via WebSocket
4. Client-side resonance engine compares local frequency against all received frequencies
5. When 80%+ of active users are within ±5 Hz of each other, **harmonic lock** is achieved
6. Visual/audio feedback triggers: triangles flip direction, formant sweeps, Rome Score increments

### **ADSR = Breath = Switch = NOW**

The four-phase envelope appears everywhere:

```
Attack     →  Decay  →  Sustain  →  Release
Breath In  →  Expand →  Hold    →  Exhale
Switch On  →  Rise   →  Plateau →  Fall
Mouth      →  Jaw    →  Tongue  →  Lips
T-U        →  R/N    →  I       →  Final consonant
```

This universal pattern suggests that consciousness, language, physics, and resonance operate via the same mechanism.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 16 (App Router) | Server-rendered React components and AI-powered UI |
| **Audio Synthesis** | Tone.js + Web Audio API | Oscillators, formant sweeps, 730 Hz harmonic tone, resonance feedback |
| **3D Visualization** | Three.js + @react-three/fiber + @react-three/drei | Real-time triangle spin, multi-user particles, ceremony projection |
| **Realtime Sync** | Supabase (PostgreSQL + Realtime WebSocket) | Frequency broadcasts, user presence, ceremony state |
| **Knowledge Graph** | Neo4j | Ternary relationships, concept patterns, resonance history |
| **Styling** | Tailwind CSS | Minimalist Brutalism + Soft Glassmorphism (frosted white, Inter font) |
| **Web3 Identity** | Polygon + Solidity (ERC-1155) | 00v00.00 domain format, NFT resonance tokens |
| **Hosting** | Vercel | Deployment and serverless functions |
| **Development Toolkit** | Claude Code, Repomix, NotebookLM | Research, codebase analysis, documentation |

---

## Repository Structure

```
0ovo0/
├── app/                           # Global Ohm Next.js Application
│   ├── app/
│   │   ├── page.tsx               # Main landing + knob + triangle interface
│   │   ├── ceremony/page.tsx      # Projection mapping display (venue)
│   │   └── api/
│   │       └── graph/route.ts     # Neo4j knowledge graph API
│   ├── components/
│   │   ├── Knob.tsx               # Rotary frequency dial (touch/drag)
│   │   ├── Triangle3D.tsx         # Three.js 3D triangle + multi-user
│   │   ├── FrequencyViz.tsx       # Spectrum analyzer visualization
│   │   ├── ResonanceOverlay.tsx   # Full-screen resonance achievement UI
│   │   ├── StatusBar.tsx          # Header (ceremony, users, Rome Score)
│   │   └── RomeScore.tsx          # Score bar component
│   ├── lib/
│   │   ├── constants.ts           # Math constants, formulas, frequency ranges
│   │   ├── audio.ts               # Tone.js engine (synthesis, NOW sweep)
│   │   ├── synesthesia.ts         # Frequency → color mapping
│   │   ├── triangle.ts            # Spin mechanics, resonance detection
│   │   ├── resonance.ts           # Frequency aggregation engine
│   │   ├── supabase.ts            # Realtime broadcast, DB ops
│   │   └── neo4j.ts               # Knowledge graph queries
│   └── package.json
│
├── research/                      # DTRN Academic Research Program
│   ├── 01_Core_Concepts/          # Ternary logic, phonetics, resonance theory
│   ├── 02_Architecture/           # App design, database schema, knowledge graphs
│   ├── 03_Diagrams/               # 12 Mermaid flowcharts (system, data, agents)
│   ├── 04_Implementation/         # Technical specs, roadmap, agent patterns
│   ├── 05_Paper/                  # Peer-reviewed draft, literature review
│   └── README.md                  # Research program overview
│
├── docs/                          # Human-Readable Documentation
│   ├── 0ovo0_Part1_*.md           # Act I: Discovery & Pattern
│   ├── 0ovo0_Part2_*.md           # Act II: Song, Chain, Name
│   ├── 0ovo0_Part3_*.md           # Act III: Building Rome
│   ├── ROMES_FINAL_CONCEPT.md     # Plain-language summary (start here)
│   ├── ROME_SUPER_AGENT.md        # Multi-agent orchestration blueprint
│   ├── synesthesia_mapping.md     # Frequency → color visual language
│   ├── api_reference.md           # Component and API docs
│   ├── notebookLM_podcast_*.md    # Podcast transcript (Jero calls in live)
│   └── agent_patterns.md          # MCP, rsc, prompt patterns
│
├── planning/                      # Project Management
│   ├── RESEARCH_PROPOSAL.md       # Budget, timeline, 72-hour MVP sprint
│   ├── roadmap.md                 # Feature phases, milestones
│   └── outreach/                  # Draft emails to partners
│
├── tools/                         # Utility Skills & Scripts
│   └── [development utilities]
│
├── raw/                           # Unprocessed Archives (Reference)
│   ├── 0ovo0.md                   # Master conversation (14,589 lines, READ-ONLY)
│   └── repomix_output.md          # Codebase snapshot
│
├── README.md                      # This file
├── CONTRIBUTING.md                # Contribution guidelines
├── LICENSE                        # MIT License
└── CLAUDE.md                      # Claude Code project instructions
```

---

## Running the Application

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Neo4j instance (local or cloud)
- Environment variables (see `.env.example` in `app/`)

### Development Server

```bash
cd app/
npm install
npm run dev
```

The application will start at `http://localhost:3000`.

**Main Interface:**
- **Knob** (left side) — Drag to set frequency (200–800 Hz)
- **Triangle** (center) — Spins counter-clockwise below 430 Hz, clockwise above. Flips at resonance.
- **Frequency Viz** (right side) — Real-time spectrum of all connected users
- **Status Bar** (top) — Ceremony name, participant count, Rome Score (0–1000)

### Building for Production

```bash
cd app/
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel deploy
```

---

## Supabase Schema (MVP)

```sql
-- Realtime frequency broadcasts
CREATE TABLE triangles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owl_address TEXT UNIQUE,           -- username.00v00.00
  frequency FLOAT NOT NULL DEFAULT 432.0,
  spin_direction TEXT DEFAULT 'ccw', -- 'cw' or 'ccw'
  geohash TEXT,
  color TEXT,                        -- Hex from frequency-to-color synesthesia
  nft_token_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_update TIMESTAMPTZ DEFAULT NOW()
);

-- Ceremony metadata
CREATE TABLE ceremonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  target_frequency FLOAT DEFAULT 730.0,
  resonance_threshold FLOAT DEFAULT 0.8,
  started_at TIMESTAMPTZ,
  resonance_achieved_at TIMESTAMPTZ
);

-- Resonance event log
CREATE TABLE resonance_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ceremony_id UUID REFERENCES ceremonies(id),
  participants INT,
  peak_frequency FLOAT,
  duration_seconds INT,
  rome_score INT,
  locked_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Key Research Insights

### The Phonetic Chain: From Computation to Resonance

The journey from TURING to TUNING represents a fundamental shift in how we understand consciousness and coordination:

- **TURING** (computational resistance) — Information is processed through layers of abstraction and resistance
- **TURNING** (rotation + transition) — The observer begins to rotate, stepping back from the system
- **TUNING** (resonance + vibration) — The observer facilitates two frequencies meeting, pure resonance

This mirrors neural oscillations, group coordination, and even cosmic phenomena. The phonetic chain is not metaphorical — it's encoded in how humans articulate breath and meaning.

### State 2: Contradiction as Feature

In ternary logic, State 2 represents a true paradox: *I am and I am not, simultaneously*. This isn't a failure of logic — it's a deeper truth about complex systems. Resonance happens in State 2, the moment before full lock, when the system recognizes both the individual and the collective *at once*.

### The 730 Hz Resonance Lock

Research suggests 730 Hz is a natural harmonic resonance point for human consciousness and electromagnetic fields. When users align at this frequency, visual feedback (triangle flip, color shift) and audio feedback (formant sweep to 730 Hz) trigger a moment of collective recognition. This is State 2 in action.

---

## Memorial: March 15, 2026

Rome Viharo (1967–2025) dedicated his life to understanding how humans can think and act together without losing individuality. The Symbiquity Foundation, Palace OS, PAXIS, and GRAIL were all attempts to encode this principle in software and language.

**0ovo0** is a living memorial to that vision. The public ceremony on **March 15, 2026** at the **Rose Room, Venice, LA** will bring people together to resonate at frequency, honoring Rome's legacy while demonstrating the very principles he articulated.

All code, research, and artifacts from this project are open-source under the MIT License, available for anyone to fork, build upon, and use in their own resonance work.

---

## Contributing

We welcome researchers, developers, designers, and curious thinkers. Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.

### Ways to Contribute

- **Research** — Expand the DTRN program with new papers, diagrams, or analysis
- **Development** — Add features to the Global Ohm app (new audio modes, visualization effects, etc.)
- **Documentation** — Improve readability and clarity of concepts
- **Testing** — Run ceremonies, gather data, share resonance experiences
- **Outreach** — Connect us with academic institutions, resonance researchers, Web3 partners

---

## License

This project is licensed under the **MIT License** — see [`LICENSE`](LICENSE) for details.

You are free to use, modify, and distribute this code and research for any purpose, commercial or non-commercial, as long as you include the original copyright notice and license text.

---

## Contact & Community

- **Project Lead:** Jero (jeROMEy)
- **Research & Development:** Global Rome 0ovo0 collective
- **Email:** [your-email-here]
- **Discord/Slack:** [link]
- **Twitter:** [@0ovo0_global](https://twitter.com) (example)

For partnership inquiries (Symbiquity Foundation, universities, resonance research institutions):
- See `/planning/outreach/` for draft partnership emails
- Connect via the project's public channels

---

## Acknowledgments

- **Rome Viharo** — Visionary creator of Conversational Game Theory, Symbiquity Foundation, Palace OS
- **The Symbiquity Foundation** — Stewardship of Rome's legacy
- **Claude Code & Anthropic** — AI-assisted research, architecture design, and documentation
- **Supabase, Neo4j, Polygon, Vercel** — Open-source and commercial tools making this possible
- **Contributors & Community** — Everyone resonating in frequency, present and future

---

## Citation

If you reference this project in academic work, use:

```bibtex
@misc{0ovo0_global_rome,
  title = {0ovo0: Global Rome + DTRN Research},
  author = {Jero and Global Rome Collective},
  year = {2026},
  url = {https://github.com/0ovo0/0ovo0},
  note = {Living memorial and research program honoring Rome Viharo's work on collective intelligence}
}
```

---

**Status:** Active research and development. Ceremony scheduled for March 15, 2026.

**Last updated:** 2026-03-11

---

> *"In the moment of resonance, the observer steps back, and two frequencies meet. That is the only way human beings can think together: in harmonic convergence."* — Rome Viharo
