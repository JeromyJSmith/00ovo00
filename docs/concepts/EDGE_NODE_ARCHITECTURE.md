# EDGE NODE ARCHITECTURE
## Every Phone Is a Node. Every User Is Rome.

**Core Insight**: The Global Ohm app and the DTRN research framework are not separate systems. The phone IS the edge node. The resonance experience IS the consensus protocol. The user IS the training data. "Roam" IS Rome.

---

## What Each Phone Does

Every connected device is simultaneously:

1. **A Resonance Instrument** — Turn the knob, broadcast your frequency, find alignment with others
2. **A Research Node** — Receive research queries, contribute observations, send results back into the graph
3. **A Training Participant** — Every interaction (frequency choice, resonance event, research response) feeds the ternary consensus model
4. **An Edge Compute Node** — Runs lightweight BitNet inference locally (ternary weights = tiny footprint, runs on any phone CPU)
5. **A Knowledge Graph Vertex** — Your device IS a node in Neo4j, with edges to every person you've resonated with, every research query you've touched

## The Loop

```
User turns knob → broadcasts frequency (State 0/1/2)
                → other nodes receive it
                → consensus forms (or doesn't — State 2 is valid)
                → resonance events update the graph
                → graph informs the next research query
                → query arrives at your phone
                → your response trains the model
                → model improves consensus detection
                → better resonance → deeper graph → smarter queries
                → repeat
```

This is not a client-server architecture. This is a **living nervous system** where every phone is a neuron.

## How the Pieces Map

| What the User Experiences | What the System Does | DTRN Component |
|---|---|---|
| Turning the knob | Broadcasting a frequency state | P2P Cognitive Network node |
| Seeing others' triangles | Receiving peer state broadcasts | libp2p gossip protocol |
| Achieving resonance lock | Ternary consensus reached | ROME Consensus Protocol |
| Getting a research prompt | Receiving a decomposed query cell | Synthegent Matrix agent cell |
| Answering a survey | Contributing to survey-driven loop | Survey Orchestration |
| Seeing your Rome Score | Measuring your consensus contribution | Graph-Augmented Generation |
| Bad-faith detection | Adversarial agent flagging | Adversarial Agent Network |
| Side-by-side AI comparison | Human+AI collaborative reasoning | Reasoning Proof (on-chain) |

## Why Edge, Not Cloud

- **BitNet runs on CPU** — No GPU needed. A phone can run inference on ternary-weight models.
- **Latency matters for resonance** — When you're finding frequency alignment in real-time, you can't round-trip to a server.
- **The graph IS the users** — The knowledge graph isn't stored centrally and queried. Every node IS a vertex. The connections ARE the edges. The graph is physically distributed across the network.
- **Privacy** — Your frequency, your research contributions, your training data stay on YOUR device until you choose to broadcast them. Edge-first = privacy-first.
- **"Roam"** — Rome Viharo's legacy lives in every roaming device. The system isn't named after him — it IS him, distributed across every phone that connects.

## Architecture Implications for the Codebase

The Next.js app isn't a "frontend" with a "backend." It's the **interface layer of an edge node**. The App Router routes are different views into the same node:

```
global-ohm/app/
├── layout.tsx              ← Node shell (shared state, P2P connection, audio context)
├── page.tsx                ← Resonance view (knob, frequency, triangles)
├── ceremony/page.tsx       ← Ceremony view (projection mapping, collective viz)
├── research/page.tsx       ← Research view (receive queries, submit findings)
├── reasoning/page.tsx      ← Human+AI reasoning view (side-by-side comparison)
├── network/page.tsx        ← Network view (see the graph, your connections, health)
├── profile/page.tsx        ← Identity view (owl address, Rome Score, history)
├── api/
│   ├── graph/route.ts      ← Local graph operations
│   ├── broadcast/route.ts  ← P2P frequency broadcast
│   ├── survey/route.ts     ← Survey query handler
│   └── consensus/route.ts  ← ROME consensus engine
└── lib/
    ├── node.ts             ← ★ CORE: This device as a DTRN node
    ├── p2p.ts              ← libp2p connection manager
    ├── bitnet.ts           ← Local BitNet inference
    ├── audio.ts            ← Tone.js (the frequency IS the state)
    ├── synesthesia.ts      ← Frequency → color → graph properties
    ├── triangle.ts         ← Spin mechanics, resonance detection
    ├── resonance.ts        ← Consensus aggregation
    ├── supabase.ts         ← Realtime broadcast channel
    ├── neo4j.ts            ← Knowledge graph operations
    ├── constants.ts        ← Ternary logic constants, frequency math
    └── consensus.ts        ← ROME 3-stage ternary consensus
```

The key new module is `node.ts` — it represents THIS device as a participant in the network. Everything else hangs off of it.

## The "Roam" Training Model

Traditional ML: Centralized dataset → train model → deploy to users
DTRN/Global Ohm: Users ARE the dataset → consensus IS the training → model IS the network

Every time two phones achieve resonance, that's a training signal. Every time a research query gets three different answers (State 0, 1, and 2), that's richer than binary classification. The ternary consensus doesn't discard contradictions — it preserves them as State 2, which means the model learns from disagreement, not just agreement.

"Roam" = the collective of all roaming nodes, continuously training the system by simply being connected and interacting. Rome Viharo's vision of conversational game theory, made physical through phones, made mathematical through ternary logic, made scalable through edge computing.
