# DTRN System Architecture

## Overview

The Distributed Ternary Reasoning Network (DTRN) is a peer-to-peer system where every connected phone is an edge node capable of independent ternary reasoning, local BitNet inference, and collective consensus-building. Unlike traditional client-server or blockchain-only systems, DTRN distributes reasoning across the network while maintaining cryptographic integrity and knowledge graph coherence.

This document describes the complete architectural layers that enable this vision.

---

## Layer 1: Edge Node Architecture

### Phone as DTRN Node

Every smartphone running the Global Rome app becomes a first-class node in the DTRN network:

```
┌─────────────────────────────────────────┐
│  User's Phone (Edge Node)               │
├─────────────────────────────────────────┤
│  BitNet Inference Engine                │
│  ├─ Ternary weights (-1, 0, +1)        │
│  ├─ Local model (~8M param)            │
│  └─ Reasoning traces (State 0/1/2)     │
├─────────────────────────────────────────┤
│  Frequency Oscillator & Audio Engine    │
│  ├─ User's frequency (200-800 Hz)      │
│  ├─ Resonance detection                │
│  └─ Spin direction (cw/ccw)            │
├─────────────────────────────────────────┤
│  P2P Network Interface (libp2p)        │
│  ├─ Peer discovery                     │
│  ├─ Gossip protocol                    │
│  └─ Message relay                      │
├─────────────────────────────────────────┤
│  Local Graph Cache (Neo4j subset)       │
│  ├─ Known peers (within 2 hops)        │
│  ├─ Resonance events                   │
│  └─ Consensus history                  │
├─────────────────────────────────────────┤
│  Local Quarantine System                │
│  ├─ Mirror state snapshots             │
│  ├─ Anomaly detection                  │
│  └─ Pause/resume logic                 │
└─────────────────────────────────────────┘
```

### Node Structure

```typescript
interface EdgeNode {
  // Identity
  node_id: string;                      // UUID
  owl_address: string;                  // username.00v00.00
  polygon_public_key: string;           // on-chain identity
  
  // Frequency & Resonance
  frequency: number;                    // Hz (current user setting)
  spin_direction: 'cw' | 'ccw';        // clockwise or counter-clockwise
  resonance_confidence: number;         // 0–1 (how strong the alignment feels)
  
  // Local Reasoning
  ternary_state: 0 | 1 | 2;            // State 0=False, 1=True, 2=Unknown/Contradiction
  bitnet_model_version: string;        // e.g., "dtrn-1.2.3-ternary"
  local_graph_cache: GraphCache;       // Neo4j subset (local)
  reasoning_traces: LatentTrace[];      // recent reasoning outputs
  
  // Network
  p2p_peers: string[];                 // list of peer node_ids in range
  last_heartbeat: ISO8601;             // time of last network update
  is_online: boolean;
  
  // Quarantine & Safety
  quarantine_status: 'active' | 'under_review' | 'paused';
  mirror_states: MirrorState[];        // snapshots if behavior anomalies detected
  
  // Metadata
  created_at: ISO8601;
  updated_at: ISO8601;
}
```

---

## Layer 2: P2P Network Layer

### libp2p + Gossip Protocol

DTRN uses **libp2p** for decentralized peer discovery and **GossipSub** for broadcast messaging:

#### Node Discovery
- **mDNS** (local area network discovery)
- **DHT** (Distributed Hash Table for long-range discovery)
- **Rendezvous points** (optional coordinator nodes for helping peers find each other)

#### Message Broadcasting

Nodes broadcast three types of messages:

1. **Frequency Updates** (high frequency, ~500ms)
   - Current frequency (Hz)
   - Spin direction
   - User's current owl_address
   - Signature (to prevent spoofing)

2. **Reasoning Traces** (periodic, when node generates new reasoning)
   - Latent trace with ternary label (0/1/2)
   - Confidence score
   - Timestamp

3. **Consensus Signals** (when resonance detected)
   - Event ID
   - Participating nodes
   - Consensus state (0/1/2)
   - Confidence

#### Gossip Implementation

```typescript
interface P2PMessage {
  message_id: string;
  sender_node_id: string;
  message_type: 'frequency' | 'reasoning' | 'consensus' | 'survey_response';
  payload: any;
  signature: string;                    // Ed25519 signature of sender
  timestamp: ISO8601;
  
  // Gossip metadata
  ttl: number;                         // hops remaining
  seen_by: string[];                   // nodes that have relayed this
}

interface GossipConfig {
  message_retention_ms: number;        // default 5000 (5 sec)
  heartbeat_interval_ms: number;       // default 3000 (3 sec)
  history_size: number;                // messages to keep in memory
  history_lookup: number;              // for peer requests
}
```

#### Network Resilience

- **Partial connectivity OK**: If a node can't reach the global Supabase, it still reasons locally and syncs when reconnected
- **Eventual consistency**: Frequency updates propagate within 1–2 seconds peer-to-peer
- **Bandwidth efficient**: Small binary protobuf messages (~50–200 bytes per update)

---

## Layer 3: Consensus Layer (ROME Protocol)

### Ternary Consensus, Not Binary

Traditional blockchain consensus is binary (valid/invalid). ROME consensus is **ternary**:

- **State 0 (FALSE)**: Consensus rejects the proposition
- **State 1 (TRUE)**: Consensus accepts the proposition
- **State 2 (UNKNOWN/PRODUCTIVE CONTRADICTION)**: Consensus recognizes value in the disagreement itself

### ROME Consensus Process

```
1. Proposal Phase
   ├─ Node or survey generates a proposition
   └─ Proposition broadcast to network

2. Reasoning Phase
   ├─ Each node runs BitNet inference on proposition
   ├─ Each node generates LatentTrace (continuous reasoning)
   └─ Each node sends back State 0, 1, or 2

3. Aggregation Phase
   ├─ Collect responses from quorum (~51%+ of reachable nodes)
   ├─ Count votes: State 0, State 1, State 2
   └─ Compute consensus:
       - If State 1 votes > 50%: outcome = State 1
       - If State 0 votes > 50%: outcome = State 0
       - Otherwise: outcome = State 2 (productive contradiction)

4. Finalization Phase
   ├─ Record ConsensusEvent in Neo4j
   ├─ Optional: Create on-chain proof on Polygon
   └─ Broadcast outcome to all participants
```

### ROME Consensus Event

```typescript
interface ConsensusEvent {
  event_id: string;
  proposition: string;                 // what was voted on
  proposer_node_id: string;
  
  // Voting
  participants: string[];              // node_ids that participated
  state_0_count: number;              // FALSE votes
  state_1_count: number;              // TRUE votes
  state_2_count: number;              // UNKNOWN/CONTRADICTION votes
  
  // Outcome
  consensus_state: 0 | 1 | 2;         // final consensus
  confidence: number;                  // 0–1 (how strong the signal)
  
  // Traceability
  reasoning_traces: LatentTrace[];     // from participating nodes
  on_chain_proof?: string;            // Polygon tx hash (optional)
  
  timestamp: ISO8601;
  created_at: ISO8601;
}
```

### Why State 2 Matters

When human+AI reasoning disagree, or when users fundamentally disagree about a question, **State 2 captures that disagreement as valuable training data**. This is the core insight of ternary logic: contradiction is not a bug to resolve, but a feature to learn from.

---

## Layer 4: Knowledge Graph Layer (Neo4j)

### Users as Vertices, Events as Edges

Neo4j maintains a global knowledge graph where:

- **Vertices (Nodes)**: Users, concepts, reasoning traces
- **Edges (Relationships)**: Resonance events, consensus participation, disagreement patterns

#### Node Types

```cypher
// Users/Nodes
(:Node {
  node_id: "...",
  owl_address: "username.00v00.00",
  frequency: 500.0,
  spin_direction: "ccw",
  ternary_state: 1,
  last_update: "2026-03-12T14:30:00Z"
})

// Concepts (domain knowledge)
(:Concept {
  name: "resonance",
  definition: "...",
  parent_concept: "vibration",
  associated_frequency: 730.0
})

// Reasoning Traces (latent thoughts)
(:Trace {
  trace_id: "...",
  source_node_id: "...",
  reasoning_depth: 3,
  ternary_label: 1,
  confidence: 0.92
})

// Consensus Events
(:ConsensusEvent {
  event_id: "...",
  proposition: "...",
  consensus_state: 1,
  confidence: 0.78
})
```

#### Relationship Types

```cypher
// Resonance: when two nodes align
(:Node)-[:RESONATES_WITH {
  frequency_distance: 2.5,
  duration_ms: 3500,
  achieved_at: "2026-03-12T14:30:00Z"
}]->(:Node)

// Participated: when a node votes in consensus
(:Node)-[:PARTICIPATED_IN {
  vote: 1,
  confidence: 0.85
}]->(:ConsensusEvent)

// Generated: when a node produces reasoning
(:Node)-[:GENERATED {
  timestamp: "2026-03-12T14:30:00Z"
}]->(:Trace)

// Supports: when reasoning supports a concept
(:Trace)-[:SUPPORTS {
  strength: 0.9
}]->(:Concept)
```

#### Graph Queries

```typescript
// Find all nodes resonating with me right now
MATCH (me:Node {node_id: "my-id"})
MATCH (me)-[r:RESONATES_WITH]-(peer:Node)
WHERE r.achieved_at > now() - duration('PT5S')
RETURN peer, r

// Find consensus events where I participated
MATCH (me:Node {node_id: "my-id"})
MATCH (me)-[p:PARTICIPATED_IN]->(event:ConsensusEvent)
RETURN event, p
ORDER BY event.created_at DESC
LIMIT 10

// Discover concepts related to my reasoning
MATCH (me:Node {node_id: "my-id"})
MATCH (me)-[:GENERATED]->(trace:Trace)
MATCH (trace)-[:SUPPORTS]->(concept:Concept)
RETURN concept, trace
ORDER BY trace.confidence DESC
```

---

## Layer 5: Shared Infrastructure

### Multi-Layered Storage & Coordination

DTRN combines three complementary storage systems:

#### Supabase (Realtime State)

Supabase (PostgreSQL + Realtime WebSocket) handles:

- Current user frequencies and online status
- Ceremony metadata and resonance events
- User profiles and owl addresses
- Survey responses (collected from p2p)
- Real-time broadcast (WebSocket) for instant UI updates

```sql
-- Active node frequencies (real-time)
CREATE TABLE node_frequencies (
  node_id UUID PRIMARY KEY,
  owl_address TEXT UNIQUE NOT NULL,
  frequency FLOAT NOT NULL,
  spin_direction TEXT,
  last_update TIMESTAMPTZ DEFAULT NOW()
);

-- Ceremonies (coordinated events)
CREATE TABLE ceremonies (
  ceremony_id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  target_frequency FLOAT DEFAULT 730.0,
  resonance_threshold FLOAT DEFAULT 0.8,
  started_at TIMESTAMPTZ,
  resonance_achieved_at TIMESTAMPTZ
);

-- Survey responses (from distributed collection)
CREATE TABLE survey_responses (
  response_id UUID PRIMARY KEY,
  survey_id UUID NOT NULL REFERENCES surveys(survey_id),
  responder_node_id UUID NOT NULL,
  ternary_response INT CHECK (ternary_response IN (0, 1, 2)),
  confidence FLOAT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Neo4j (Knowledge & Reasoning)

Neo4j stores:

- All historical reasoning traces
- Consensus events and voting patterns
- User relationships and trust graphs
- Concept graphs and domain knowledge
- Pattern discovery (who tends to agree on what)

#### IPFS + OrbitDB (Decentralized Archive)

For fully decentralized nodes (no Supabase required):

- IPFS: Pin reasoning traces, survey results, model checkpoints
- OrbitDB: Peer-to-peer database (append-only log of events)
- Content-addressed: Every artifact has a hash (immutable proof)

```typescript
interface IPFSArtifact {
  ipfs_hash: string;                  // QmXxx...
  artifact_type: 'trace' | 'event' | 'model';
  node_id: string;
  timestamp: ISO8601;
  size_bytes: number;
}
```

### Polygon (On-Chain Proofs)

Polygon stores:

- Human+AI comparison results (reasoning proof)
- Consensus event summaries (hash only, for integrity)
- ERC-1155 tokens for achievements/identity
- Timestamped proofs (immutable audit trail)

---

## Layer 6: Training Loop

### The DTRN Learning Cycle

```
┌──────────────────────────────────────────────────────┐
│ 1. INTERACTIONS                                      │
│    User turns knob                                   │
│    User responds to survey                           │
│    User reasons in discussion mode                   │
└──────────────┬───────────────────────────────────────┘
               │
               v
┌──────────────────────────────────────────────────────┐
│ 2. TERNARY SIGNALS                                   │
│    BitNet infers State 0/1/2 from user input        │
│    Continuous reasoning state captured              │
│    Confidence scores computed                        │
└──────────────┬───────────────────────────────────────┘
               │
               v
┌──────────────────────────────────────────────────────┐
│ 3. CONSENSUS EVENTS                                  │
│    Multiple users' ternary signals combined         │
│    ROME protocol aggregates votes                    │
│    State 2 signals extracted (disagreements)        │
└──────────────┬───────────────────────────────────────┘
               │
               v
┌──────────────────────────────────────────────────────┐
│ 4. MODEL UPDATE                                      │
│    Gradient computed from consensus outcome         │
│    BitNet weights updated (-1, 0, +1)              │
│    Sync across trusted peers (federated learning)   │
│    Version bumped                                    │
└──────────────┬───────────────────────────────────────┘
               │
               v
┌──────────────────────────────────────────────────────┐
│ 5. BETTER RESONANCE                                  │
│    New model reasons more accurately                │
│    Consensus becomes faster and more confident      │
│    Network collectively "learns the truth"          │
└──────────────┬───────────────────────────────────────┘
               │
               v
         [Loop repeats]
```

### Training Signal Types

```typescript
interface TrainingSignal {
  signal_id: string;
  source: 'resonance' | 'consensus' | 'human_feedback' | 'human_ai_comparison';
  
  // State 0/1/2 label
  ternary_label: 0 | 1 | 2;
  
  // Continuous reasoning context
  input_embedding: Float32Array;
  reasoning_trace: Float32Array;
  
  // Confidence & metadata
  confidence: number;
  num_participants: number;
  timestamp: ISO8601;
  
  // For State 2 signals (most valuable)
  is_contradiction: boolean;
  disagreement_parties: string[];
}
```

### Federated Learning

Nodes don't upload raw reasoning to a central server. Instead:

1. Local BitNet model updates weights
2. Weight deltas encoded as sparse vectors
3. Deltas shared with trusted peer group
4. Consensus on weight updates before applying
5. Model versions synchronized via IPFS content hash

This keeps training data private while maintaining network coherence.

---

## Layer 7: Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + Next.js 16 (App Router) | UI rendering, knob interface |
| **Audio Engine** | Tone.js + Web Audio API | Frequency synthesis, resonance tones |
| **3D Visuals** | Three.js + @react-three/fiber | Triangle, participant visualization |
| **Local Inference** | BitNet (ternary quantization) | On-device reasoning, State 0/1/2 |
| **P2P Network** | libp2p + GossipSub | Peer discovery, message relay |
| **Realtime Sync** | Supabase Realtime (WebSocket) | Instant frequency/status updates |
| **Knowledge Graph** | Neo4j | Reasoning history, consensus patterns |
| **Decentralized Archive** | IPFS + OrbitDB | Peer-to-peer event log, content addressing |
| **Blockchain** | Polygon + Solidity (ERC-1155) | On-chain proofs, identity tokens |
| **Model Quantization** | BitNet (ternary -1/0/+1) | Efficient distributed inference |
| **Styling** | Tailwind CSS + custom CSS | Design system, responsive layout |
| **Hosting** | Vercel (frontend), managed Neo4j (graph), Polygon (blockchain) | Infrastructure |

---

## Data Flow Diagram

```
User's Phone (Edge Node)
│
├─→ Frequency Knob (User Input)
│   └─→ P2P Gossip Broadcast (libp2p)
│       └─→ All Peers' Phones
│           └─→ Supabase Realtime (optional sync)
│
├─→ Survey/Discussion Input
│   └─→ BitNet Inference (local)
│       └─→ LatentTrace + Ternary Signal
│           └─→ P2P Broadcast
│               └─→ Peers' Phones
│                   └─→ Supabase + Neo4j (collection)
│
├─→ Consensus Aggregation
│   └─→ ROME Protocol (count votes)
│       └─→ ConsensusEvent
│           └─→ Neo4j (graph update)
│               └─→ Polygon (optional on-chain proof)
│
└─→ Training Loop
    └─→ Model Update
        └─→ IPFS Pin
            └─→ Federated Sync to Peers
```

---

## Design Principles

1. **Every phone is a node**: No second-class participants. All devices are equal peers in reasoning.

2. **Ternary over binary**: State 2 (contradiction) is valuable, not a bug. Embrace productive disagreement.

3. **Privacy by default**: Local-first reasoning. Broadcast frequencies and findings only by user choice.

4. **Cryptographic integrity**: All messages signed. Consensus outcomes verifiable on-chain.

5. **Resilient to disconnection**: Nodes work offline, sync when reconnected. No single point of failure.

6. **Meaning through resonance**: When many voices align on a frequency, it carries weight. The system learns what matters.

7. **Memorial in motion**: Every interaction, every resonance event, honors Rome Viharo's vision of collective intelligence.

---

## Next Steps

See related documents:

- `research/05_technical_specs/schemas.md` — Complete TypeScript schema reference
- `research/11_web3_app/blockchain_identity_spec.md` — Polygon identity & proofs
- `research/12_survey_system/survey_orchestration.md` — Survey distribution & consensus
- `research/13_human_ai_reasoning/human_ai_collaboration.md` — Human+AI comparison framework
