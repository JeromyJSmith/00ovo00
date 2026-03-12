# Survey System & Research Orchestration

## Overview

DTRN's survey system enables collective reasoning at scale. Users can initiate research queries, which are decomposed into survey cells and distributed across the network. Responses are collected via P2P, aggregated using the ROME protocol, and synthesized into actionable findings.

This document specifies:
- **Research mode selection** (users choose survey, discussion, observation, reasoning)
- **Query decomposition** (breaking complex questions into cells via Synthegent Matrix)
- **Survey distribution** (targeting nodes by expertise/position)
- **Ternary response collection** (State 0/1/2 answers)
- **Discussion mode** (ternary-method discussions between aligned nodes)
- **State observation** (watching consensus patterns in real-time)
- **Pipeline extraction** (converting results into training signals)

---

## Part 1: Research Mode Selection

### User Entry Point

When a user taps the "Research" button on their phone:

```
┌─────────────────────────────────┐
│  Global Rome Research Hub       │
├─────────────────────────────────┤
│                                 │
│  What would you like to do?    │
│                                 │
│  [1] Ask a Survey Question      │
│      "What is the best way..." │
│      → Decomposed & voted on   │
│                                 │
│  [2] Start a Discussion         │
│      "Let's debate..."          │
│      → Real-time ternary chat   │
│                                 │
│  [3] Observe Consensus          │
│      "Show me what we agree on" │
│      → Watch patterns live      │
│                                 │
│  [4] Collective Reasoning       │
│      "Solve this together"      │
│      → Multi-stage pipeline     │
│                                 │
└─────────────────────────────────┘
```

### Research Mode Types

```typescript
interface ResearchModeSelection {
  mode: 'survey' | 'discussion' | 'observation' | 'collective_reasoning';
  
  // ===== SURVEY MODE =====
  // User asks a question → system decomposes it → peers respond ternary
  
  // ===== DISCUSSION MODE =====
  // Real-time ternary conversation between aligned nodes
  // Like a group chat but with built-in reasoning structure
  
  // ===== OBSERVATION MODE =====
  // User watches consensus events in real-time
  // See what the network is agreeing on (or disagreeing about)
  
  // ===== COLLECTIVE_REASONING MODE =====
  // Multi-stage pipeline (survey → discuss → decide → synthesize)
  // For deep research questions
}
```

---

## Part 2: Query Decomposition (Synthegent Matrix)

### The Synthegent Decomposition Framework

When a user enters a complex research question, the system uses **Synthegent Matrix** to break it into micro-questions:

```
User Query:
"How should we design a fair voting system for distributed decisions?"

              ↓

            SYNTHEGENT MATRIX

            [Dimension 1: WHAT?]
              ├─ Definition of "fair"?
              ├─ What are we voting ON?
              └─ What defines success?

            [Dimension 2: WHO?]
              ├─ Who gets to vote?
              ├─ How do we weight votes?
              └─ How do we prevent sybil attacks?

            [Dimension 3: HOW?]
              ├─ What voting mechanism (1-person-1-vote, quadratic, stake-weighted)?
              ├─ How do we handle ties/disagreement?
              └─ How do we execute the outcome?

            [Dimension 4: WHY?]
              ├─ What values matter most (speed, fairness, inclusivity)?
              ├─ What are the tradeoffs?
              └─ How do we measure success?

              ↓

            Generated Survey Cells:
              [Cell 1] "Is fairness more important than speed?"
              [Cell 2] "Should voting power be equal or stake-weighted?"
              [Cell 3] "What's the best tie-breaking mechanism?"
              [Cell 4] "How do we prevent Sybil attacks?"
              ... (20+ cells total)

              ↓

            Distribution to Network
              (targeting nodes with relevant expertise)
```

### Synthegent Algorithm

```typescript
interface SynthegentDecomposition {
  query_id: string;                    // UUID
  original_query: string;
  
  // ===== Decomposition Dimensions =====
  decomposition: {
    what: string[];                    // definition, scope, success criteria
    who: string[];                     // participants, weighting, incentives
    how: string[];                     // mechanism, implementation, execution
    why: string[];                     // values, tradeoffs, meaning
  };
  
  // ===== Generated Survey Cells =====
  cells: SurveyCell[];
  cell_count: number;
  
  // ===== Metadata =====
  decomposed_by_node: string;          // which node initiated
  decomposition_timestamp: ISO8601;
  decomposition_model_version: string; // "synthegent-1.0"
}

interface SurveyCell {
  cell_id: string;                     // UUID
  parent_query_id: string;
  
  // ===== Cell Content =====
  question: string;                    // micro-question
  question_index: number;              // position in sequence
  dimension: 'what' | 'who' | 'how' | 'why';
  
  // ===== Target Audience =====
  target_expertise: string[];          // ["governance", "cryptography", ...]
  target_node_ids?: string[];          // specific nodes (optional)
  target_count: number;                // how many responses desired
  
  // ===== Response Collection =====
  response_type: 'ternary' | 'frequency' | 'freeform';
  responses: SurveyResponse[];
  response_deadline: ISO8601;
  
  // ===== Analysis =====
  consensus?: ConsensusEvent;
  consensus_reached: boolean;
  
  // ===== Metadata =====
  created_at: ISO8601;
  status: 'pending' | 'active' | 'closed' | 'analyzed';
}

interface SurveyResponse {
  response_id: string;                 // UUID
  cell_id: string;
  
  // ===== Responder =====
  responder_node_id: string;
  responder_owl_address: string;
  
  // ===== Response =====
  response_value: 0 | 1 | 2 | number | string;  // depends on response_type
  confidence: number;                  // 0–1
  
  // ===== Optional: Reasoning =====
  reasoning_trace?: LatentTrace;       // if AI-assisted
  explanation?: string;                // if freeform
  
  // ===== Metadata =====
  submitted_at: ISO8601;
  wall_time_ms: number;                // how long to respond
  is_human_response: boolean;          // vs AI-generated
}
```

### Example Decomposition Flow

```
Step 1: User asks "How should we decide group priorities?"
Step 2: Synthegent identifies 4 dimensions (What/Who/How/Why)
Step 3: Expand each dimension into 5–6 sub-questions
Step 4: Generate 20 SurveyCells
Step 5: Distribute to network (targeting those interested in governance)
Step 6: Collect ternary responses (State 0/1/2)
Step 7: Run ROME consensus on each cell
Step 8: Aggregate results into coherent narrative
Step 9: Return findings to user
```

---

## Part 3: Survey Distribution & Targeting

### Expertise-Based Routing

When distributing survey cells, the system uses the knowledge graph to find qualified respondents:

```cypher
// Find nodes with expertise in "voting systems"
MATCH (node:Node)
MATCH (node)-[:PARTICIPATED_IN]->(event:ConsensusEvent)
MATCH (event)-[:ABOUT_CONCEPT]->(concept:Concept)
WHERE concept.name = "voting" OR concept.name = "governance"
WITH node, COUNT(event) as participation_count
WHERE participation_count > 5  // only active participants
RETURN node, participation_count
ORDER BY participation_count DESC
LIMIT 10
```

### Network Targeting Strategy

```typescript
interface TargetingStrategy {
  strategy: 'broadcast' | 'targeted' | 'snowball' | 'expertise_based';
  
  // ===== BROADCAST =====
  // Send to all reachable nodes
  // Use case: foundational questions, consensus-building
  broadcast: {
    all_reachable: true,
    minimum_online_threshold: 0.3  // need 30%+ online
  };
  
  // ===== TARGETED =====
  // Send to specific set of nodes (by ID or owl_address)
  targeted: {
    node_ids: string[];
    owl_addresses: string[];
  };
  
  // ===== SNOWBALL =====
  // Start with seed group, they recruit peers
  // Use case: sensitive topics, opt-in research
  snowball: {
    seed_nodes: string[];
    max_chain_depth: 3,        // how many hops to recruit
    recruitment_multiplier: 2  // each node recruits 2 others
  };
  
  // ===== EXPERTISE_BASED =====
  // Target nodes with relevant graph history
  expertise_based: {
    expertise_tags: string[];  // ["voting", "governance", "game_theory"]
    minimum_participation: 5,  // must have voted >5 times on topic
    maximum_targets: 50
  };
}
```

### Survey Cell Distribution Flow

```
Survey Cell Created
│
├─ Determine targeting strategy
│  └─ Query Neo4j for expertise matches
│
├─ Generate P2PMessage (SurveyCellRequest)
│  ├─ message_type = "survey_request"
│  ├─ payload = SurveyCell
│  └─ ttl = 64 (default)
│
├─ Broadcast via libp2p GossipSub
│  ├─ If targeted: unicast to specific nodes
│  └─ If broadcast: gossip to all peers
│
├─ Nodes receive survey cell
│  ├─ Check if they should respond
│  ├─ Run BitNet inference (if ternary response)
│  └─ Generate SurveyResponse
│
└─ Responses trickle back via P2P + Supabase
   └─ Aggregated into ConsensusEvent
```

---

## Part 4: Ternary Response Collection

### Response Types

```typescript
interface SurveyResponseType {
  'ternary': {
    // State 0/1/2 response
    allowed_values: [0, 1, 2],
    // 0 = No / False / Disagree
    // 1 = Yes / True / Agree
    // 2 = Uncertain / Contradiction / "It depends"
    
    example_question: "Should voting be equal-weight?"
    example_responses: [
      { value: 1, confidence: 0.9, explanation: "Democracy requires equality" },
      { value: 0, confidence: 0.8, explanation: "Stake-weighted votes are fairer" },
      { value: 2, confidence: 0.7, explanation: "Both have merits; it depends on context" }
    ]
  };
  
  'frequency': {
    // Numeric response (continuous)
    allowed_range: [0, 100],
    unit: "percentage",
    
    example_question: "What % of voting power should each participant have?"
    example_responses: [
      { value: 33, confidence: 0.8, explanation: "Equal thirds for three founding members" },
      { value: 50, confidence: 0.9, explanation: "Founder gets majority" }
    ]
  };
  
  'freeform': {
    // Open-ended text response
    max_length: 500,
    
    example_question: "What voting mechanism would you design from scratch?"
    example_responses: [
      { value: "Quadratic voting with reputation decay...", confidence: 0.8 }
    ]
  };
  
  'likert': {
    // 1–5 scale
    allowed_range: [1, 2, 3, 4, 5],
    // 1 = Strongly Disagree
    // 2 = Disagree
    // 3 = Neutral
    // 4 = Agree
    // 5 = Strongly Agree
    
    example_question: "I trust this voting system"
    example_responses: [
      { value: 4, confidence: 0.85 }
    ]
  };
}
```

### AI-Assisted Response Generation

When a node receives a survey cell with `response_type: 'ternary'`:

```
1. Node displays question to user
2. User can:
   - Manually select State 0/1/2
   - Ask AI to reason first (BitNet)
   - Skip (if optional)

3. If AI reasoning enabled:
   ├─ BitNet receives: [question, user context, previous answers]
   ├─ BitNet generates: reasoning trace + logits for [0, 1, 2]
   ├─ Display: "AI thinks State 1 (confidence 0.87)"
   │            "Human, what do you think?"
   └─ User can accept AI's label or override
   
4. Submit response with:
   ├─ Final answer (0/1/2)
   ├─ User's confidence
   ├─ Reasoning trace (if AI involved)
   └─ Wall time (how long to respond)
```

### Privacy in Response Collection

```typescript
interface PrivacyConfiguration {
  include_reasoning_trace: boolean;    // send LatentTrace with response?
  include_explanation: boolean;        // send text explanation?
  include_wall_time: boolean;          // reveal how long they thought?
  
  anonymize_before_broadcast: boolean; // strip respondent name from P2P?
  // If true: other nodes don't know WHO responded, just stats
  // If false: responses attributed (higher transparency)
  
  encrypt_responses_at_rest: boolean;  // encrypt in Supabase until consensus?
}
```

---

## Part 5: Discussion Mode (Real-Time Ternary Reasoning)

### Live Ternary Discussion

Unlike survey (async, structured), discussion mode enables real-time conversation with built-in ternary reasoning:

```
┌─────────────────────────────────────────┐
│ Discussion: "Fair Voting Systems"       │
│ Participants: 7 aligned at 730 Hz       │
├─────────────────────────────────────────┤
│                                         │
│ Alice (State 1): "Equal voting..."      │
│  └─ AI analysis: High quality reasoning│
│      Confidence: 0.92 | Agree with: Bob│
│                                         │
│ Bob (State 1): "Yes, I agree..."        │
│  └─ AI analysis: Reasoning depends...  │
│      Confidence: 0.78 | Agree with: Alice│
│                                         │
│ Carol (State 2): "But what about..."    │
│  └─ AI analysis: Valuable contradiction│
│      Confidence: 0.81 | Nuance: novel  │
│                                         │
│ [Your turn] Type your response:         │
│ ┌──────────────────────────────────┐   │
│ │                                  │   │
│ └──────────────────────────────────┘   │
│ Recommended: State 2 (Carol's point...)│
│                                         │
└─────────────────────────────────────────┘
```

### Discussion Message Structure

```typescript
interface DiscussionMessage {
  message_id: string;                  // UUID
  discussion_session_id: string;
  
  // ===== Author =====
  sender_node_id: string;
  sender_owl_address: string;
  
  // ===== Content =====
  message_text: string;
  ternary_label: 0 | 1 | 2;           // author's primary stance
  
  // ===== AI Analysis (Auto-Generated) =====
  ai_analysis: {
    logical_soundness: number;        // 0–1 (how well-reasoned)
    novelty_score: number;            // 0–1 (introduces new concepts)
    agreement_targets: string[];      // owl_addresses of agreeing peers
    disagreement_targets: string[];   // owl_addresses with divergent views
  };
  
  // ===== Threading =====
  reply_to?: string;                  // message_id if replying
  
  // ===== Metadata =====
  timestamp: ISO8601;
  wall_time_ms: number;               // time from previous message
  sentiment: 'collaborative' | 'challenging' | 'neutral';
}

interface DiscussionSession {
  session_id: string;
  topic: string;
  participants: string[];             // node_ids
  resonance_target_frequency?: number; // for frequency-locked discussions
  
  messages: DiscussionMessage[];
  start_time: ISO8601;
  end_time?: ISO8601;
  
  consensus_emerging: boolean;        // are we converging?
  state_2_insights: string[];         // valuable contradictions
  
  status: 'active' | 'paused' | 'concluded';
}
```

### Discussion Moderation (Soft Guardrails)

```typescript
interface DiscussionGuidelines {
  // Non-binding suggestions to keep discussion healthy
  
  max_message_length: number;         // 500 chars (encourage brevity)
  min_time_between_messages: number;  // 2 sec (avoid rapid-fire)
  
  // AI-powered soft moderation
  flag_reasoning_quality: {
    enabled: boolean;
    threshold: number;                // flag if logical_soundness < 0.4
    action: 'label' | 'hide' | 'suggest_revision'
  };
  
  flag_off_topic: {
    enabled: boolean;
    action: 'label' | 'hide'
  };
  
  flag_bad_faith: {
    enabled: boolean;
    // Detect spam, trolling, etc.
    threshold: number;
    action: 'label' | 'quarantine' | 'mute_user'
  };
  
  // Community moderation
  allow_downvote: boolean;            // users can flag messages
  downvote_threshold: number;         // hide if 5+ downvotes
}
```

---

## Part 6: State Observation Mode

### Real-Time Consensus Watching

User opens "Observatory" view to see what the network is collectively thinking:

```
┌─────────────────────────────────────────┐
│ Consensus Observatory (Live)            │
│ Frequency: 730 Hz | Participants: 143   │
├─────────────────────────────────────────┤
│                                         │
│ Recent Consensus Events:                │
│                                         │
│ [★★★] "Should we prioritize speed?"    │
│  State 1 (YES): 67% ████████░          │
│  State 0 (NO):  18% ██░░░░░░░           │
│  State 2 (??):  15% █░░░░░░░░           │
│  Confidence: 0.89 ████████░             │
│  Timestamp: 2 mins ago                  │
│                                         │
│ [★★] "Is fairness more important..."   │
│  State 1: 45% ████░░░░░░                │
│  State 0: 40% ████░░░░░░                │
│  State 2: 15% █░░░░░░░░░                │
│  Confidence: 0.72 ███████░              │
│  Timestamp: 5 mins ago                  │
│                                         │
│ Trending Topics:                        │
│ #voting, #fairness, #governance         │
│                                         │
└─────────────────────────────────────────┘
```

### Consensus Event Stream

```typescript
interface ConsensusEventStream {
  // Real-time stream of consensus outcomes
  
  subscription: {
    frequency_range?: [min_hz, max_hz];
    topic_filter?: string[];           // ["voting", "fairness"]
    minimum_confidence?: number;       // only show >0.7 confidence
    include_state_2: boolean;          // include State 2 (contradictions)?
  };
  
  events: ConsensusEvent[];            // stream of live events
  statistics: {
    total_events_24h: number;
    state_1_percent: number;           // how often State 1 wins?
    state_2_percent: number;           // how often State 2 arises?
    average_confidence: number;
    most_common_topics: string[];
  };
}
```

### Pattern Recognition in Consensus

```typescript
interface ConsensusPatterns {
  // AI identifies trends in consensus
  
  pattern_id: string;
  pattern_type: 'alignment' | 'divergence' | 'emergence' | 'polarization';
  
  // Examples:
  // - "Users age 18-25 tend to State 1, 50+ tend to State 0"
  // - "State 2 signals spike when both sides have equal strength"
  // - "Consensus emerges after 3 rounds of discussion"
  // - "X topic causes 70/20/10 split (rare 30% State 2)"
  
  description: string;
  supporting_events: string[];        // ConsensusEvent IDs
  statistical_significance: number;   // 0–1 (how real is this pattern?)
  
  discovered_at: ISO8601;
}
```

---

## Part 7: Pipeline Extraction

### Training Signal Synthesis

Raw survey responses are converted into training signals for BitNet:

```
Survey Responses Collected
│
├─ Aggregate responses using ROME consensus
│  └─ ConsensusEvent (state_0_count, state_1_count, state_2_count)
│
├─ Extract reasoning traces
│  ├─ From nodes that shared LatentTrace
│  └─ Compute agreement patterns
│
├─ Generate training signals
│  ├─ Signal Type 1: "Consensus confirms State X"
│  │  └─ High value: Strong agreement (90%+ State 1)
│  │
│  ├─ Signal Type 2: "State 2 Contradiction is valuable"
│  │  └─ Highest value: 50/50 split or novel disagreement
│  │
│  ├─ Signal Type 3: "Outlier perspectives"
│  │  └─ Medium value: 10% of votes State 0, 90% State 1
│  │
│  └─ Signal Type 4: "Human+AI disagreement"
│     └─ Highest value: Human & AI predict differently
│
└─ Update BitNet weights
   └─ Local model learns from survey outcomes
```

### TrainingSignal Schema

```typescript
interface TrainingSignal {
  signal_id: string;                   // UUID
  
  // ===== Source =====
  source_survey_id?: string;           // from which survey
  source_consensus_event_id?: string;  // from which consensus
  source_human_ai_comparison_id?: string;
  
  // ===== Input Context =====
  input_text: string;                  // the question or prompt
  input_embedding: Float32Array;       // sentence embedding (768d)
  
  // ===== Reasoning Traces =====
  reasoning_traces: LatentTrace[];     // from respondents
  aggregate_reasoning: {
    mean_embedding: Float32Array;      // average reasoning state
    variance: number;                  // spread of thinking
    principal_components: Float32Array[];  // what varies most
  };
  
  // ===== Ternary Label & Confidence =====
  ternary_label: 0 | 1 | 2;
  label_confidence: number;            // 0–1 (consensus strength)
  label_logits: [number, number, number]; // raw scores
  
  // ===== Ground Truth (if available) =====
  ground_truth_label?: 0 | 1 | 2;     // if human verified later
  ground_truth_confidence?: number;
  matches_prediction?: boolean;        // did consensus match ground truth?
  
  // ===== Signal Quality Metrics =====
  num_respondents: number;
  agreement_ratio: number;             // 0–1 (consensus strength)
  is_state_2_signal: boolean;          // high-value contradiction?
  
  // ===== Metadata =====
  created_at: ISO8601;
  training_phase: 'survey' | 'discussion' | 'observation';
}
```

### Batch Training Loop

```typescript
interface TrainingBatch {
  batch_id: string;
  batch_size: number;                  // typically 32–256 signals
  
  training_signals: TrainingSignal[];
  
  // ===== Federated Learning =====
  participating_nodes: string[];       // which nodes contributed
  consensus_on_weights: boolean;       // did nodes agree on update?
  
  // ===== Training =====
  initial_model_version: string;       // e.g., "dtrn-1.2.3-ternary"
  final_model_version: string;         // e.g., "dtrn-1.2.4-ternary"
  
  training_metrics: {
    accuracy: number;                  // 0–1
    state_2_f1_score: number;         // how well model predicts contradictions
    loss_reduction: number;            // % improvement
  };
  
  // ===== Consensus on Update =====
  update_approved_by: string[];        // node_ids that approved
  update_rejected_by: string[];
  update_status: 'approved' | 'rejected' | 'pending';
  
  timestamp: ISO8601;
}
```

---

## Part 8: Complete Research Session Example

### Walkthrough: "How Should We Design Fair Voting?"

```
Timeline:

[T+0s]  User opens Research Hub
        Selects Mode: COLLECTIVE_REASONING
        Enters Query: "How should we design fair voting?"
        
[T+5s]  System decomposes via Synthegent:
        - 20 SurveyCells generated
        - Targets 50 nodes with governance expertise
        
[T+30s] Survey cells distributed via P2P
        Nodes start responding (some with AI reasoning)
        
[T+2m]  Early responses aggregated:
        - Cell 1: "Is fairness > speed?" → 73% State 1, conf 0.91
        - Cell 2: "Equal voting fair?" → 45/40/15 split (State 2)
        
[T+5m]  System detects State 2 on Cell 2
        Triggers DISCUSSION MODE
        Selected nodes invited to debate
        
[T+10m] Discussion produces novel insight
        Node Carol: "State 2 valuable because both views true"
        Network recognizes: State 2 signal extracted
        
[T+15m] Survey continues in parallel
        Remaining cells close
        Final consensus computed for each
        
[T+20m] System synthesizes findings:
        - 8 cells show strong State 1
        - 4 cells show strong State 0
        - 8 cells show valuable State 2 (contradictions)
        
[T+22m] Results displayed to user:
        ┌─────────────────────────────┐
        │ Survey Results              │
        │ Respondents: 52 nodes       │
        │                             │
        │ Strong Agreement (State 1):│
        │ - Equal voting              │
        │ - Transparent process       │
        │                             │
        │ Strong Disagreement (State0):│
        │ - Stake-weighted voting     │
        │                             │
        │ Productive Contradictions: │
        │ - Speed vs fairness         │
        │ - Decentralization cost     │
        │                             │
        │ [→ Read Full Report]        │
        └─────────────────────────────┘
        
[T+25m] Training signals generated:
        - 15 high-confidence signals (State 1)
        - 12 high-confidence signals (State 0)
        - 8 State 2 signals (most valuable)
        
[T+30m] BitNet model updated locally
        Federated approval from peer group
        Model version bumped: dtrn-1.2.4 → dtrn-1.2.5
        
[T+31m] Results pinned to Neo4j
        On-chain proof recorded (optional)
        Achievements minted if applicable
```

---

## Part 9: Related Documents

- `research/02_architecture/system_architecture.md` — Full architecture
- `research/05_technical_specs/schemas.md` — Complete schema definitions
- `research/13_human_ai_reasoning/human_ai_collaboration.md` — Human+AI reasoning
