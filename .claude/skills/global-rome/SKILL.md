---
name: global-rome
description: Development skill for the Global Rome memorial app — a collective resonance web application for Rome Viharo (1967-2025). Use when building, modifying, or debugging the Global Rome app (Next.js 16 + Tone.js + Three.js + Supabase + Neo4j + Polygon). Covers frequency-to-color synesthesia mapping, triangle spin mechanics, resonance detection, Rome Score calculation, audio synthesis (formant/NOW sweep), ceremony mode projection, Neo4j knowledge graph operations, and Supabase realtime broadcasting. Reference this skill for any work on the memorial app codebase in global-ohm/ directory.
---

# Global Rome — Development Skill

Collective resonance memorial app for Rome Viharo. Users turn a virtual knob (200-800 Hz), and when enough align within ±5 Hz, resonance is achieved.

## When to Use

- Building or modifying the Global Rome app (`global-ohm/` directory)
- Working with frequency-based audio synthesis (Tone.js)
- Implementing triangle 3D visualizations (Three.js/R3F)
- Managing Supabase realtime frequency broadcasting
- Querying or updating the Neo4j knowledge graph
- Debugging resonance detection or Rome Score logic
- Setting up ceremony/projection mapping mode

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Audio | Tone.js (formant synthesis, NOW sweep, resonance tone) |
| 3D | Three.js via @react-three/fiber + @react-three/drei |
| Realtime | Supabase (broadcast channels, no DB writes for freq updates) |
| Knowledge Graph | Neo4j (ternary concepts, patterns, resonance events) |
| Styling | Tailwind CSS (glassmorphism + minimalist brutalism) |
| Web3 | Polygon, ERC-1155 triangle NFTs |

## Key Frequencies

- **220 Hz** — N phoneme (nasal, closed)
- **300 Hz** — W phoneme (rounded lips, decay)
- **432 Hz** — Default/Rome's frequency
- **500 Hz** — Neutral (spin reversal point, no spin)
- **730 Hz** — O phoneme (open, peak resonance, lock target)

## Core Formulas

See [references/formulas.md](references/formulas.md) for all mathematical formulas.

## App Structure

```
global-ohm/
├── app/
│   ├── page.tsx              — Landing + main app (knob + triangle)
│   ├── ceremony/page.tsx     — Projection mapping display
│   ├── api/graph/route.ts    — Neo4j knowledge graph API
│   └── components/           — Knob, Triangle3D, FrequencyViz, etc.
├── lib/
│   ├── constants.ts          — All constants and thresholds
│   ├── audio.ts              — Tone.js engine
│   ├── synesthesia.ts        — Frequency → color mapping
│   ├── triangle.ts           — Spin mechanics, resonance, Rome Score
│   ├── resonance.ts          — Client-side frequency aggregation
│   ├── supabase.ts           — Realtime broadcast
│   └── neo4j.ts              — Knowledge graph operations
```

## Development Commands

```bash
cd global-ohm
npm run dev          # Start dev server
npm run build        # Production build
```

## Design Language

- **Minimalist Brutalism + Soft Glassmorphism**
- Background: `#0a0a0a` (near black)
- Glass: `rgba(255,255,255,0.05)` with `backdrop-blur(20px)`
- Font: Inter
- Primary geometric element: Triangle (equilateral)
- Color spectrum: Purple (220 Hz) → Orange (800 Hz)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEO4J_URI` / `NEO4J_USER` / `NEO4J_PASSWORD`

## Reference

- [Formulas & Thresholds](references/formulas.md)
