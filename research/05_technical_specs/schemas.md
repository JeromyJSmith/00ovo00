# DTRN Unified Schema Reference

## Overview

This document is the canonical TypeScript definition of all schemas used across the DTRN (Distributed Ternary Reasoning Network) system. All code that touches DTRN should conform to these types.

Schema organization mirrors the research folder structure:

- **02_architecture**: `EdgeNode`, `P2PMessage`, `GossipConfig`
- **05_technical_specs**: (this file — complete reference)
- **11_web3_app**: `OwlAddress`, `BlockchainIdentity`, `ReasoningProof`
- **12_survey_system**: `SurveyQuery`, `SurveyResponse`, `SurveyCell`
- **13_human_ai_reasoning**: `HumanAIComparison`, `ReasoningDifference`

Plus cross-cutting schemas for **Quarantine & Safety**, **Dream Observatory**, **GILM (Meaning Engine)**, and **Research Mode**.

---

## Part 1: Core Node & Network

### EdgeNode

Every phone running DTRN is an edge node with this structure:

```typescript
interface EdgeNode {
  // ===== Identity =====
  node_id: string;                      // UUID (immutable)
  owl_address: string;                  // username.00v00.00 (mutable)
  polygon_public_key: string;           // Polygon address (public key hex)
  
  // ===== Frequency & Resonance =====
  frequency: number;                    // Hz (200–800, user-controlled)
  spin_direction: 'cw' | 'ccw';        // clockwise or counter-clockwise
  resonance_confidence: number;         // 0–1 (how aligned with peers)
  last_frequency_update: ISO8601;
  
  // ===== Local Reasoning =====
  ternary_state: 0 | 1 | 2;            // State 0=False, 1=True, 2=Unknown/Contradiction
  bitnet_model_version: string;        // "dtrn-X.Y.Z-ternary"
  local_graph_cache: LocalGraphCache;  // Neo4j subset
  reasoning_traces: LatentTrace[];      // recent outputs (max 100 per node)
  
  // ===== Network =====
  p2p_peers: PeerInfo[];               // list of connected peers
  last_heartbeat: ISO8601;             // last message sent/received
  is_online: boolean;                  // connectivity status
  
  // ===== Quarantine & Safety =====
  quarantine_status: 'active' | 'under_review' | 'paused';
  mirror_states: MirrorState[];        // anomaly snapshots
  
  // ===== Metadata =====
  created_at: ISO8601;
  updated_at: ISO8601;
}

interface PeerInfo {
  node_id: string;
  owl_address: string;
  frequency: number;
  last_seen: ISO8601;
  signal_strength: number;             // 0–1 (network quality)
  hop_distance: number;                // 1, 2, or 3 (in p2p topology)
}

interface LocalGraphCache {
  cached_nodes: string[];              // node_ids in local cache
  cached_edges: string[];              // edge_ids in local cache
  cache_version: string;               // timestamp of last sync
  cache_size_bytes: number;
}
```

### P2PMessage

All messages passed through libp2p/GossipSub:

```typescript
interface P2PMessage {
  // ===== Message Identity =====
  message_id: string;                  // UUID (content hash for dedup)
  sender_node_id: string;
  sender_owl_address: string;
  
  // ===== Content =====
  message_type: 'frequency' | 'reasoning' | 'consensus' | 'survey_response' | 'ping';
  payload: FrequencyUpdate | ReasoningTrace | ConsensusEvent | SurveyResponse | null;
  
  // ===== Cryptography =====
  signature: string;                   // Ed25519(payload + timestamp)
  public_key: string;                  // sender's public key (for verification)
  
  // ===== Gossip Metadata =====
  timestamp: ISO8601;
  ttl: number;                         // hops remaining (default 64)
  seen_by: string[];                   // node_ids that relayed this
  
  // ===== Encoding =====
  encoding: 'protobuf' | 'json';      // default protobuf for size
  checksum: string;                    // CRC32 for corruption detection
}

interface FrequencyUpdate {
  frequency: number;
  spin_direction: 'cw' | 'ccw';
  node_id: string;
  timestamp: ISO8601;
}

interface GossipConfig {
  message_retention_ms: number;        // default 5000
  heartbeat_interval_ms: number;       // default 3000
  history_size: number;                // default 100
  history_lookup: number;              // default 50
  max_peers: number;                   // max outbound connections (default 20)
  floodsub_fallback: boolean;         // fall back to floodsub if gossipsub unavailable
}
```

---

## Part 2: Ternary Consensus & Reasoning

### ConsensusEvent

Output of ROME protocol:

```typescript
interface ConsensusEvent {
  // ===== Identity =====
  event_id: string;                    // UUID
  
  // ===== Proposition =====
  proposition: string;                 // what was voted on (or empty if implicit)
  proposition_type: 'explicit' | 'implicit' | 'resonance_lock';
  proposer_node_id: string;            // who initiated this
  
  // ===== Voting Results =====
  participants: string[];              // node_ids that participated
  state_0_count: number;              // FALSE votes
  state_1_count: number;              // TRUE votes
  state_2_count: number;              // UNKNOWN/CONTRADICTION votes
  quorum_reached: boolean;            // true if >= 51% participated
  
  // ===== Outcome =====
  consensus_state: 0 | 1 | 2;         // final result
  consensus_percentages: {
    state_0: number;                   // 0–1
    state_1: number;
    state_2: number;
  };
  confidence: number;                  // 0–1 (how strongly expressed)
  
  // ===== Reasoning Context =====
  reasoning_traces: LatentTrace[];     // from participants (hashed for privacy)
  reasoning_depth: number;             // average reasoning steps taken
  contradiction_value: number;         // 0–1 (State 2 quality metric)
  
  // ===== Blockchain Integration =====
  on_chain_proof?: {
    polygon_tx_hash: string;           // Polygon transaction
    block_number: number;
    timestamp: number;                 // unix timestamp
  };
  
  // ===== Metadata =====
  timestamp: ISO8601;
  created_at: ISO8601;
  duration_ms: number;                 // how long consensus took
}
```

### LatentTrace

Raw reasoning output from BitNet:

```typescript
interface LatentTrace {
  // ===== Identity =====
  trace_id: string;                    // UUID
  source_node_id: string;              // which node produced this
  
  // ===== Reasoning Content =====
  reasoning_depth: number;             // 0–5 (number of thought steps)
  reasoning_tokens: number;            // how many tokens generated
  reasoning_wall_time_ms: number;      // compute time
  
  // ===== Continuous Representation =====
  continuous_state: Float32Array;      // latent embedding (768 or 1024 dims)
  embedding_model_version: string;     // "embed-dtrn-1.0"
  
  // ===== Ternary Label & Confidence =====
  ternary_label: 0 | 1 | 2;           // ground truth or most likely
  confidence: number;                  // 0–1 (model certainty)
  logits: [number, number, number];   // raw scores for [0, 1, 2]
  
  // ===== Input Context =====
  input_text?: string;                // query or prompt (optional, may be hashed for privacy)
  input_hash: string;                 // SHA256 of input
  input_tokens: number;               // input length
  
  // ===== Metadata =====
  bitnet_model_version: string;       // "dtrn-1.2.3-ternary"
  timestamp: ISO8601;
  
  // ===== Optional: Human Annotation =====
  human_label?: 0 | 1 | 2;           // if human annotated
  human_confidence?: number;
  human_annotator_node_id?: string;
}
```

---

## Part 3: Adversarial Safety System

### MirrorState

Snapshot of a node's state at the moment an anomaly is detected:

```typescript
interface MirrorState {
  // ===== Identity =====
  mirror_id: string;                   // UUID
  original_node_id: string;            // which node is being mirrored
  
  // ===== Capture Context =====
  capture_timestamp: ISO8601;
  trigger_event: TriggerEvent;         // what caused the mirror
  
  // ===== Frozen State =====
  frozen_state: FrozenState;           // snapshot of node at capture
  
  // ===== Quarantine Management =====
  quarantine_status: 'active' | 'under_review' | 'archived' | 'rehabilitated';
  quarantine_protocol: QuarantineProtocol;  // linked safety protocol
  
  // ===== Analysis Results =====
  automated_findings: Finding[];       // algorithmic anomaly scores
  human_review_findings?: Finding[];   // if human reviewed
  
  // ===== Classification =====
  anomaly_type?: 'frequency_spam' | 'reasoning_hallucination' | 'identity_spoofing' | 'bad_faith_voting' | 'other';
  severity_score: number;              // 0–1 (how serious)
  
  // ===== Metadata =====
  ternary_label: 2;                    // mirrors are always State 2 (unknown/contradiction)
  created_at: ISO8601;
}

interface TriggerEvent {
  event_type: 'anomaly_detection' | 'user_report' | 'consensus_trigger' | 'behavioral_entropy';
  event_description: string;
  event_severity: number;              // 0–1
  event_timestamp: ISO8601;
}

interface FrozenState {
  node_id: string;
  frequency: number;
  spin_direction: 'cw' | 'ccw';
  ternary_state: 0 | 1 | 2;
  last_reasoning_trace: LatentTrace;
  p2p_peers_at_capture: string[];
  recent_messages: P2PMessage[];       // last 20 messages sent
  model_version: string;
  timestamp: ISO8601;
}

interface Finding {
  finding_id: string;
  finding_type: 'anomaly_score' | 'pattern_deviation' | 'behavioral_entropy' | 'manual_review';
  severity: number;                    // 0–1
  description: string;
  evidence: string;                    // human-readable explanation
  timestamp: ISO8601;
}
```

### QuarantineProtocol

The safety workflow itself:

```typescript
interface QuarantineProtocol {
  // ===== Identity =====
  protocol_id: string;                 // UUID
  mirror_id: string;                   // linked mirror
  affected_node_id: string;
  
  // ===== Protocol Stage =====
  stage: 'detection' | 'freeze' | 'mirror' | 'isolate' | 'analyze' | 'decide';
  stage_transitions: {
    to_stage: string;
    at_timestamp: ISO8601;
  }[];
  
  // ===== Automated Findings =====
  automated_findings: Finding[];
  automated_decision?: 'benign' | 'suspicious' | 'malicious' | 'inconclusive';
  
  // ===== Human Review (Optional) =====
  human_review?: {
    reviewer_node_id: string;          // who reviewed
    review_timestamp: ISO8601;
    review_decision: 'approve' | 'reject' | 'investigate_further';
    review_notes: string;
  };
  
  // ===== Collective Vote (Optional) =====
  collective_vote?: {
    vote_event_id: string;             // ConsensusEvent for rehabilitation vote
    proposition: string;
    consensus_state: 0 | 1 | 2;
    confidence: number;
    decision: 'rehabilitate' | 'permanent_ban' | 'extended_quarantine';
  };
  
  // ===== Final Outcome =====
  final_decision: 'rehabilitated' | 'banned' | 'ongoing_monitoring';
  decision_timestamp: ISO8601;
  decision_reasoning: string;
  
  // ===== Metadata =====
  created_at: ISO8601;
  updated_at: ISO8601;
}
```

---

## Part 4: Dream Observatory (Latent Reasoning Analysis)

### NoiseTrace

Behavioral noise extracted from a mirror's frozen state:

```typescript
interface NoiseTrace {
  // ===== Identity =====
  trace_id: string;                    // UUID
  mirror_id: string;                   // source mirror
  
  // ===== Latent Analysis =====
  filtered_embeddings: Float32Array;   // denoised representation
  denoising_method: 'pca' | 'autoencoder' | 'diffusion';
  
  // ===== Behavioral Metrics =====
  behavioral_entropy: number;          // 0–1 (unpredictability)
  temporal_pattern: number[];          // frequency spectrum of behavior
  frequency_of_anomalies: number;      // per unit time
  anomaly_score: number;               // 0–1 (composite severity)
  
  // ===== Interpretation =====
  interpretation: string;              // natural language summary
  is_adversarial: boolean;             // heuristic guess
  
  // ===== Metadata =====
  analysis_timestamp: ISO8601;
  analysis_model_version: string;
}
```

### DreamSeedSpec

Prompt construction for generating dreams about the mirror's anomaly:

```typescript
interface DreamSeedSpec {
  // ===== Identity =====
  seed_id: string;                     // UUID
  noise_trace_id: string;              // source anomaly
  
  // ===== Deterministic Seeding =====
  deterministic_seed: number;          // int hash of mirror_id + trace_id
  
  // ===== Conditioning =====
  conditioning_vector: Float32Array;   // embedding of "what went wrong"
  conditioning_strength: number;       // 0–1 (how much to emphasize the anomaly)
  
  // ===== Prompt Engineering =====
  prompt_template: string;             // template with placeholders
  prompt_variables: {
    [key: string]: string;
  };
  generated_prompt: string;            // filled-in prompt
  
  // ===== Generation Guidance =====
  guidance_scale: number;              // 0–20 (7.5 is default)
  num_inference_steps: number;         // diffusion steps (default 50)
  
  // ===== Metadata =====
  created_at: ISO8601;
}
```

### DreamArtifact

Generated image/visualization from dream seed:

```typescript
interface DreamArtifact {
  // ===== Identity =====
  artifact_id: string;                 // UUID
  dream_seed_id: string;               // source seed
  
  // ===== Image Data =====
  image_data: string;                  // base64 or IPFS hash
  image_hash: string;                  // SHA256 of image
  image_size: {
    width: number;
    height: number;
  };
  
  // ===== Diffusion Params =====
  diffusion_params: {
    model: string;                     // "stable-diffusion-2" etc.
    prompt: string;
    negative_prompt?: string;
    guidance_scale: number;
    inference_steps: number;
    seed: number;
  };
  
  // ===== Interpretation =====
  interpretation: string;              // what the dream reveals
  dream_insights: string[];            // bullet points of meaning
  
  // ===== Metadata =====
  created_at: ISO8601;
  generation_time_ms: number;
  ipfs_hash?: string;                  // if pinned to IPFS
}
```

---

## Part 5: GILM (Guided Interpretation via Language Model)

### InterpretationPackage

A query + cultural context → multiple interpretations → consensus meaning:

```typescript
interface InterpretationPackage {
  // ===== Identity =====
  package_id: string;                  // UUID
  
  // ===== Source Material =====
  source_text: string;                 // what is being interpreted
  source_origin?: string;              // where it came from
  source_culture: CulturalContext;     // who/where/when context
  
  // ===== Multiple Interpretations =====
  interpretations: Interpretation[];   // diverse viewpoints
  
  // ===== Consensus =====
  meaning_consensus: MeaningConsensus; // ROME protocol output
  
  // ===== GILM Analysis =====
  gilm_analysis: {
    primary_themes: string[];
    emotional_valence: number;         // -1 (negative) to +1 (positive)
    cultural_specificity: number;      // 0–1 (how much depends on context)
    universal_resonance: number;       // 0–1 (human-readable across cultures)
    depth_score: number;               // 0–1 (philosophical depth)
  };
  
  // ===== Metadata =====
  created_at: ISO8601;
}

interface CulturalContext {
  source_culture: string;              // "Western", "Eastern", "Indigenous", etc.
  time_period: string;                 // "ancient", "medieval", "modern", "future"
  symbolic_density: number;            // 0–1 (how much hidden meaning)
  interpretation_frameworks: string[]; // ["Jungian", "Buddhist", "secular", ...]
}

interface Interpretation {
  interpretation_id: string;           // UUID
  interpreter_node_id: string;         // who provided this view
  interpretation_text: string;         // the meaning they found
  confidence: number;                  // 0–1 (how sure they are)
  cultural_lens: string;               // which framework
  evidence: string;                    // why they believe this
  
  // Optional: compare to other interpretations
  divergence_from_consensus: number;   // 0–1 (how unique)
}

interface MeaningConsensus {
  consensus_event_id: string;          // linked ConsensusEvent
  consensus_state: 0 | 1 | 2;         // what the network agrees on
  primary_meaning: string;             // the "true" meaning (if State 1)
  conflicting_meanings?: string[];     // if State 2 (contradiction)
  confidence: number;                  // 0–1
}
```

---

## Part 6: Survey & Research System

### SurveyQuery

A research question decomposed into survey cells:

```typescript
interface SurveyQuery {
  // ===== Identity =====
  query_id: string;                    // UUID
  
  // ===== Question =====
  original_question: string;           // user's research query
  decomposed_from?: string;            // parent query_id if recursive
  
  // ===== Distribution =====
  target_nodes: string[];              // node_ids to survey
  target_selection_method: 'all' | 'expertise' | 'geographic' | 'random';
  
  // ===== Response Type =====
  response_type: 'ternary' | 'frequency' | 'freeform' | 'likert';
  
  // ===== Responses Collected =====
  responses: SurveyResponse[];          // incoming answers
  response_count: number;
  response_deadline?: ISO8601;
  
  // ===== Analysis =====
  consensus?: ConsensusEvent;          // if aggregated via ROME
  consensus_confidence?: number;       // how clear the outcome
  
  // ===== Metadata =====
  created_by: string;                  // initiator node_id
  created_at: ISO8601;
  status: 'open' | 'closed' | 'analyzing' | 'closed_with_consensus';
}

interface SurveyResponse {
  response_id: string;                 // UUID
  survey_id: string;                   // linked query_id
  responder_node_id: string;
  
  // ===== Response Content =====
  response_value: 0 | 1 | 2 | number | string; // depends on response_type
  confidence: number;                  // 0–1 (how sure responder is)
  
  // ===== Optional: Reasoning =====
  reasoning_trace?: LatentTrace;       // if BitNet generated this
  human_reasoning?: string;            // if human wrote it
  
  // ===== Metadata =====
  submitted_at: ISO8601;
  wall_time_ms: number;                // how long to respond
}

interface SurveyCell {
  cell_id: string;                     // UUID
  parent_survey_id: string;
  
  // ===== Micro-Question =====
  question: string;                    // one decomposed sub-question
  question_index: number;              // position in decomposition
  
  // ===== Target =====
  target_node_id?: string;             // if unicast (otherwise broadcast)
  
  // ===== Response & Analysis =====
  response?: SurveyResponse;
  consensus?: ConsensusEvent;          // if multiple nodes voted
  
  // ===== Metadata =====
  created_at: ISO8601;
  deadline?: ISO8601;
}
```

---

## Part 7: Human+AI Collaboration

### HumanAIComparison

Side-by-side reasoning comparison:

```typescript
interface HumanAIComparison {
  // ===== Identity =====
  comparison_id: string;               // UUID
  
  // ===== Input =====
  prompt: string;                      // the question/task
  context?: string;                    // additional context
  
  // ===== Human Reasoning =====
  human_response: {
    respondent_node_id: string;        // which person
    response_text: string;             // their answer
    confidence: number;                // 0–1
    reasoning_depth: number;           // estimated thought steps
    wall_time_ms: number;              // how long they thought
    ternary_label: 0 | 1 | 2;         // (optional) assigned label
  };
  
  // ===== AI Reasoning (BitNet) =====
  ai_response: {
    model_version: string;             // "dtrn-1.2.3-ternary"
    response_text: string;             // its answer
    confidence: number;                // 0–1
    latent_trace: LatentTrace;         // reasoning trace
    ternary_label: 0 | 1 | 2;         // predicted label
  };
  
  // ===== Comparison Analysis =====
  reasoning_difference: ReasoningDifference;
  
  // ===== Training Value =====
  is_disagreement: boolean;            // human ≠ AI?
  disagreement_type?: 'confidence' | 'label' | 'reasoning_path' | 'interpretation';
  training_value_score: number;        // 0–1 (how valuable for training)
  
  // ===== Blockchain Proof =====
  on_chain_proof?: {
    polygon_tx_hash: string;
    block_number: number;
    timestamp: number;
    proof_data_hash: string;           // hash of this comparison
  };
  
  // ===== Metadata =====
  created_at: ISO8601;
  reviewed: boolean;
  review_timestamp?: ISO8601;
}

interface ReasoningDifference {
  difference_id: string;               // UUID
  
  // ===== Label Disagreement =====
  human_label: 0 | 1 | 2;
  ai_label: 0 | 1 | 2;
  labels_agree: boolean;
  label_conflict_severity: number;     // 0–1
  
  // ===== Confidence Disagreement =====
  human_confidence: number;
  ai_confidence: number;
  confidence_gap: number;              // absolute difference
  
  // ===== Semantic Disagreement =====
  semantic_similarity: number;         // 0–1 (cosine similarity of embeddings)
  concepts_human_only: string[];       // ideas only human mentioned
  concepts_ai_only: string[];          // ideas only AI mentioned
  shared_concepts: string[];           // overlap
  
  // ===== Reasoning Path =====
  human_path_length: number;           // steps in human reasoning
  ai_path_length: number;              // BitNet depth
  path_divergence: number;             // 0–1 (how different)
  
  // ===== Value for Training =====
  contradiction_strength: number;      // 0–1 (if disagreeing, how strong)
  training_signal_type: 'state_2_signal' | 'confidence_correction' | 'novel_concept' | 'reasoning_path';
  
  created_at: ISO8601;
}
```

---

## Part 8: Research Mode & Pipeline

### ResearchSession

Multi-stage reasoning pipeline for collective inquiry:

```typescript
interface ResearchSession {
  // ===== Identity =====
  session_id: string;                  // UUID
  
  // ===== Initiation =====
  initiator_node: string;              // who started the research
  query: string;                       // the research question
  query_decomposition?: string;        // if split into sub-queries
  
  // ===== Mode Selection =====
  mode: 'survey' | 'discussion' | 'observation' | 'collective_reasoning';
  
  // ===== Pipeline Stages =====
  pipeline_stages: PipelineStage[];
  current_stage_index: number;
  current_stage: PipelineStage;
  
  // ===== Findings =====
  findings: Finding[];                 // intermediate results
  
  // ===== Final Outcome =====
  ternary_outcome: 0 | 1 | 2;         // State 0/1/2 conclusion
  outcome_confidence: number;          // 0–1
  outcome_narrative: string;           // summary for humans
  
  // ===== Metadata =====
  created_at: ISO8601;
  updated_at: ISO8601;
  duration_ms: number;
  participants: string[];              // node_ids involved
  status: 'in_progress' | 'completed' | 'paused' | 'archived';
}

interface PipelineStage {
  stage_id: string;                    // UUID
  stage_type: 'decompose' | 'survey' | 'discuss' | 'aggregate' | 'decide';
  stage_name: string;                  // human-readable name
  
  // ===== Execution =====
  started_at: ISO8601;
  completed_at?: ISO8601;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  
  // ===== Input & Output =====
  input_data: any;                     // what this stage receives
  output_data: any;                    // what this stage produces
  
  // ===== Computation =====
  computation_description: string;
  computation_time_ms: number;
  
  // ===== Findings & Confidence =====
  intermediate_findings: Finding[];
  intermediate_confidence: number;     // 0–1 (how sure at this point)
}
```

---

## Part 9: Web3 & Blockchain Identity

### OwlAddress

User's decentralized identity:

```typescript
interface OwlAddress {
  // ===== Format =====
  address: string;                     // "username.00v00.00"
  username: string;
  domain: "00v00.00";                 // Unstoppable Domains
  
  // ===== Polygon Registration =====
  polygon_address: string;             // 0x... hex address
  registration_tx_hash: string;
  registration_block: number;
  
  // ===== Identity Proof =====
  public_key_ed25519: string;         // for message signing
  public_key_secp256k1: string;       // for Ethereum/Polygon
  
  // ===== Metadata =====
  created_at: ISO8601;
  last_verified: ISO8601;
}

interface BlockchainIdentity {
  identity_id: string;                 // UUID (off-chain reference)
  owl_address: OwlAddress;
  
  // ===== Tokens Minted =====
  erc1155_tokens: {
    token_id: number;                  // ERC-1155 token ID
    contract_address: string;          // Polygon contract
    balance: number;                   // how many minted
    achievement: string;               // "first_resonance", "100_hours", etc.
    minted_at: ISO8601;
  }[];
  
  // ===== Achievements =====
  achievements: Achievement[];
}

interface Achievement {
  achievement_id: string;              // UUID
  name: string;                        // e.g., "First Harmonic Lock"
  description: string;
  badge_image_hash: string;           // IPFS hash of badge PNG
  earned_at: ISO8601;
  on_chain_token_id?: number;         // linked ERC-1155
}

interface ReasoningProof {
  proof_id: string;                    // UUID
  comparison_id: string;               // linked HumanAIComparison
  
  // ===== Proof Data =====
  comparison_hash: string;             // SHA256 of HumanAIComparison
  reasoning_summary: string;           // key facts
  human_label: 0 | 1 | 2;
  ai_label: 0 | 1 | 2;
  labels_agree: boolean;
  
  // ===== On-Chain Record =====
  polygon_tx_hash: string;
  polygon_block: number;
  polygon_timestamp: number;           // unix timestamp
  proof_contract_address: string;      // where stored on-chain
  
  // ===== Metadata =====
  proof_type: 'human_ai_comparison' | 'consensus_participation' | 'reasoning_achievement';
  created_at: ISO8601;
}
```

---

## Part 10: Common Utilities

### ISO8601

All timestamps use ISO 8601 format (string type):

```typescript
type ISO8601 = string;  // "2026-03-12T14:30:00Z" or with fractional seconds/timezone
```

### Validation Rules

```typescript
// Ternary state must be 0, 1, or 2
type TernaryState = 0 | 1 | 2;

// Confidence must be 0–1
type Confidence = number;  // 0 <= confidence <= 1

// Frequency in Hz (musical range)
type Frequency = number;   // 200 <= frequency <= 800

// UUID format
type UUID = string;        // matches pattern [0-9a-f]{8}-[0-9a-f]{4}-...

// Base64 for small data
type Base64 = string;      // base64url encoded

// Polygon address (Ethereum compatible)
type PolygonAddress = string;  // 0x[0-9a-f]{40}
```

---

## Organization Reference

| Schema Group | Primary Research Folder | Key Types |
|--------------|------------------------|-----------|
| **Node & Network** | `02_architecture` | `EdgeNode`, `P2PMessage`, `PeerInfo` |
| **Consensus** | `02_architecture` | `ConsensusEvent`, `LatentTrace`, `ROME` |
| **Safety** | `09_safety_adversarial` | `MirrorState`, `QuarantineProtocol`, `Finding` |
| **Dream Observatory** | `10_dream_observatory` | `NoiseTrace`, `DreamSeedSpec`, `DreamArtifact` |
| **GILM** | `06_meaning_engine` | `InterpretationPackage`, `MeaningConsensus` |
| **Survey** | `12_survey_system` | `SurveyQuery`, `SurveyResponse`, `SurveyCell` |
| **Research Mode** | `12_survey_system` | `ResearchSession`, `PipelineStage` |
| **Human+AI** | `13_human_ai_reasoning` | `HumanAIComparison`, `ReasoningDifference` |
| **Web3** | `11_web3_app` | `OwlAddress`, `BlockchainIdentity`, `ReasoningProof` |

---

## Import Conventions

```typescript
// In next.js/React components
import type { EdgeNode, P2PMessage, ConsensusEvent } from '@/lib/dtrn-schemas';
import type { HumanAIComparison } from '@/lib/human-ai-schemas';
import type { SurveyQuery } from '@/lib/survey-schemas';

// In backend (API routes)
import type { ConsensusEvent, LatentTrace } from 'dtrn-core';
import { validateConsensusEvent, validateLatentTrace } from 'dtrn-core/validate';
```

---

## Versioning

All schemas are versioned via the `bitnet_model_version`, `embedding_model_version`, and similar fields. When schemas change:

1. Increment version (e.g., `dtrn-1.2.3-ternary` → `dtrn-1.3.0-ternary`)
2. Add migration code in backend
3. Tag old schema version as deprecated
4. Communicate to network nodes (via gossip) about upgrade

This allows rolling upgrades without hard forks.

---

## Related Documents

- `research/02_architecture/system_architecture.md` — Detailed explanation of each layer
- `research/11_web3_app/blockchain_identity_spec.md` — Polygon integration details
- `research/12_survey_system/survey_orchestration.md` — Survey distribution pipeline
- `research/13_human_ai_reasoning/human_ai_collaboration.md` — Human+AI comparison detailed flow
