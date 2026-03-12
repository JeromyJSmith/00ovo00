---
title: "Geosemantic Network Intelligence (GSNI) & Proximity Resonance"
origin: mixed
symbiquity_refs: [PALACE-001, CGT-002]
related_docs:
  - global_ohm_app_architecture.md
  - global_ohm_memorial.md
  - 80_percent_resonance_lock.md
source_lines: "L700–L960, L1998–L2003, L2164–L2176"
attribution_note: "GSNI as a conceptual architecture is described in source conversations as part of the Symbiquity ecosystem. The specific implementation details (Polygon smart contracts, The Graph indexing, geohash precision, WebSocket protocol) are Jero's engineering contributions."
---

> ⚠️ **Mixed Provenance** — The GSNI concept as philosophical architecture is
> discussed in Symbiquity-adjacent materials. The specific blockchain implementation,
> smart contract design, and inference engine specifications are Jero's independent
> engineering proposals.

# Geosemantic Network Intelligence (GSNI) & Proximity Resonance

## Overview

**GSNI** reinvents how devices detect and interact with one another in the physical world. Instead of fragile, direct phone-to-phone connections (BLE), GSNI uses a **decentralized knowledge graph** and the **blockchain** as the communication layer.

## Step-by-Step Logic

### 1. State Publication (No Direct Scanning)

Each phone acts as an independent node. Every **10 seconds**, the app silently publishes to a smart contract (`RomeEventBus`) on the **Polygon blockchain**:

| Published Data | Example |
|---------------|---------|
| Identity | `username.00v00.00` |
| Current frequency | 540 Hz |
| Geohash location | 7-character prefix (~150m precision) |

**Why no BLE?** Direct Bluetooth scanning drains battery and exposes MAC addresses.

### 2. Graph Indexing

An indexer (like **The Graph Protocol**) listens in real-time and updates a continuous knowledge graph — the **"Rome Graph"**:
- Every **person** = a node
- Every **location/frequency** = an edge

### 3. The Inference Engine

An off-chain semantic inference engine scans the graph for overlaps. A **"Proximity Event"** triggers only when **three conditions are met**:

| Condition | Requirement |
|-----------|-------------|
| **Spatial Proximity** | Geohash prefixes match (same physical area) |
| **Frequency Alignment** | Within 100 Hz delta |
| **Temporal Overlap** | Both users actively engaged NOW |

### 4. The Resonance Trigger (The "McDonald's Scenario")

If two "Romans" happen to be in the same McDonald's:
1. Their phones **never communicate with each other**
2. Both talk to the graph independently
3. The inference engine detects alignment
4. **WebSocket push** sent to both phones simultaneously

Both phones will:
- Play a **unified harmonic tone** (geometric mean of the two frequencies)
- **Pulse with haptic feedback**
- Display a notification with option to log an **on-chain "handshake"** (resonance pair NFT)

## Philosophical Architecture

> *"Intelligence isn't in the nodes (us). It's in the edges (our connections)."*

GSNI proves Palace OS's principle that intelligence is relational. By removing direct communication, the system demonstrates that a living, planet-scale knowledge graph can infer relationships and "coaxingly connect" people who are tuned into the same frequency — turning the blockchain into a **global nervous system for human consensus**.

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Publication interval | 10 seconds |
| Blockchain | Polygon (low gas) |
| Smart contract | `RomeEventBus` |
| Indexer | The Graph Protocol |
| Alert delivery | Cloudflare Workers → WebSocket |
| Spatial precision | 7-char geohash → ~150m |
| Frequency threshold | ± 100 Hz delta |
| Handshake record | ERC-1155 token |
