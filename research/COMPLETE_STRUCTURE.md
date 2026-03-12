# DTRN COMPLETE PROJECT STRUCTURE
## Distributed Ternary Research Networks + Global Ohm Web3 App

**Updated**: March 12, 2026 06:30 UTC  
**Status**: Full scaffolding complete, ready for development  
**Architecture**: Research backend + Web3 frontend + Blockchain integration

---

## 📁 COMPLETE DIRECTORY TREE

```
/dtrn_research_project/
│
├── STATUS.md                          ✅ Master status & quick start
│
├── 00_project_overview/               ✅ Project documentation
│   ├── README.md                      ✅ Master index
│   ├── project_timeline.md            ⭕ Timeline & milestones
│   └── key_contributors.md            ⭕ Team & attributions
│
├── 01_core_concepts/                  ✅ Theoretical foundation
│   ├── ternary_convergence_thesis.md  ✅ Core thesis
│   ├── rome_cgt_foundation.md         ⭕ Rome's CGT detailed
│   ├── bitnet_architecture.md         ⭕ BitNet analysis
│   └── synthegent_matrix_overview.md  ⭕ Matrix design
│
├── 02_architecture/                   ⭕ System design
│   ├── system_architecture.md         ⭕ Overall architecture
│   ├── tier_breakdown.md              ⭕ 8-tier system
│   ├── data_flow_specification.md     ⭕ Data pipelines
│   ├── integration_plan.md            ⭕ Component integration
│   └── adversarial_agent_networks.md  ⭕ NEW: Adversarial layer
│
├── 03_diagrams/                       🔶 Visual documentation
│   ├── mermaid_collection.md          ⭕ All diagrams index
│   ├── end_to_end_flow.mmd            ✅ Complete flow
│   ├── system_overview.mmd            ⭕ High-level overview
│   ├── graph_rag_comparison.mmd       ⭕ RAG vs Graph-RAG
│   ├── neo4j_schema.mmd               ⭕ Database schema
│   ├── ternary_convergence.mmd        ⭕ 3-system convergence
│   ├── morphological_matrix.mmd       ⭕ Agent matrix
│   ├── rome_consensus_engine.mmd      ⭕ ROME 3-stage
│   ├── p2p_network.mmd                ⭕ P2P topology
│   ├── survey_loop.mmd                ⭕ Survey workflow
│   ├── isomorphism_detection.mmd      ⭕ Pattern detection
│   ├── geosemantic_analysis.mmd       ⭕ Geospatial consensus
│   ├── adversarial_detection.mmd      ⭕ NEW: Bad actor detection
│   └── roadmap_gantt.mmd              ⭕ Development timeline
│
├── 04_paper_draft/                    ⭕ Research paper
│   ├── abstract.md                    ⭕ 150-word abstract
│   ├── introduction.md                ⭕ Problem statement
│   ├── related_work.md                ⭕ Literature review
│   ├── methodology.md                 ⭕ DTRN method
│   ├── architecture.md                ⭕ Technical details
│   ├── case_study.md                  ⭕ Evaluation
│   ├── results.md                     ⭕ Metrics & benchmarks
│   ├── discussion.md                  ⭕ Implications
│   ├── conclusion.md                  ⭕ Summary & future work
│   ├── references.bib                 ⭕ Bibliography
│   └── full_draft_v0.2.md             ⭕ Complete paper
│
├── 05_technical_specs/                ⭕ Implementation specs
│   ├── neo4j_schema.cypher            ⭕ Graph database schema
│   ├── node_structure.py              ⭕ Data models
│   ├── graph_rag_api.py               ⭕ Graph-RAG implementation
│   ├── rome_consensus_algorithm.py    ⭕ ROME engine
│   ├── isomorphism_detector_spec.py   ⭕ Pattern detection
│   ├── survey_orchestrator_spec.py    ⭕ Survey system
│   ├── adversarial_spawner.py         ⭕ NEW: Bad actor spawning
│   ├── adversarial_detection.py       ⭕ NEW: Detection engine
│   └── api_endpoints.yaml             ⭕ REST API spec
│
├── 06_existing_pipeline/              ⭕ Integration docs
│   ├── integration_analysis.md        ⭕ SYNTHEGENT mapping
│   ├── stage_mapping.md               ⭕ Pipeline stages
│   ├── reusable_components.md         ⭕ What to reuse
│   └── migration_plan.md              ⭕ Migration strategy
│
├── 07_implementation_roadmap/         ⭕ Build plan
│   ├── phase_1_query_decomposition.md ⭕ Week 1 tasks
│   ├── phase_2_agent_spawner.md       ⭕ Week 2 tasks
│   ├── phase_3_rome_engine.md         ⭕ Week 3 tasks
│   ├── phase_4_pattern_detection.md   ⭕ Week 4 tasks
│   └── build_order.md                 ⭕ Sequencing
│
├── 08_research_references/            ⭕ Citations & papers
│   ├── arxiv_papers.md                ⭕ Curated list
│   ├── bitnet_paper.md                ⭕ BitNet summary
│   ├── paraconsistent_logic_refs.md   ⭕ Logic papers
│   ├── multi_agent_systems_refs.md    ⭕ MAS literature
│   └── graph_databases_refs.md        ⭕ Neo4j resources
│
├── 09_conversation_history/           ⭕ Session archives
│   ├── discovery_session_march_11.md  ⭕ 7-hour discovery
│   ├── breakthrough_graph_rag_march_12.md ⭕ Graph-RAG insight
│   └── architecture_synthesis_march_12.md ⭕ Architecture complete
│
├── 10_rome_memorial_context/          ⭕ Rome's work
│   ├── rome_viharo_bio.md             ⭕ Biography
│   ├── symbiquity_foundation.md       ⭕ Organization
│   ├── memorial_project_context.md    ⭕ Memorial plan
│   └── email_drafts.md                ⭕ Outreach emails
│
├── 11_web3_app/                       🔶 NEW: Global Ohm App
│   ├── README.md                      ⭕ App overview
│   ├── frontend/                      ⭕ Next.js app
│   │   ├── package.json               ⭕ Dependencies
│   │   ├── next.config.js             ⭕ Next.js config
│   │   ├── tailwind.config.js         ⭕ Tailwind CSS
│   │   ├── src/
│   │   │   ├── app/                   ⭕ Next.js 14 app router
│   │   │   ├── components/            ⭕ React components
│   │   │   ├── lib/                   ⭕ Utilities
│   │   │   └── styles/                ⭕ Global styles
│   │   └── public/                    ⭕ Static assets
│   ├── backend/                       ⭕ API server
│   │   ├── package.json               ⭕ Node.js backend
│   │   ├── src/
│   │   │   ├── routes/                ⭕ Express routes
│   │   │   ├── controllers/           ⭕ Business logic
│   │   │   ├── models/                ⭕ Database models
│   │   │   └── services/              ⭕ External services
│   │   └── .env.example               ⭕ Environment template
│   ├── smart_contracts/               ⭕ Solidity contracts
│   │   ├── ResearchQuery.sol          ⭕ Query NFT contract
│   │   ├── SurveyToken.sol            ⭕ Survey rewards
│   │   ├── ReasoningProof.sol         ⭕ Human+AI reasoning
│   │   └── DTRNGovernance.sol         ⭕ DAO governance
│   └── blockchain/                    ⭕ Web3 integration
│       ├── deploy.js                  ⭕ Deployment scripts
│       ├── hardhat.config.js          ⭕ Hardhat config
│       └── test/                      ⭕ Contract tests
│
├── 12_survey_system/                  🔶 NEW: Survey orchestration
│   ├── README.md                      ⭕ Survey system overview
│   ├── survey_types.md                ⭕ Question templates
│   ├── distribution_logic.md          ⭕ Who gets what
│   ├── response_collection.md         ⭕ Data gathering
│   └── feedback_loops.md              ⭕ Iteration cycles
│
├── 13_human_ai_reasoning/             🔶 NEW: Human+AI collaboration
│   ├── README.md                      ⭕ Reasoning workflow
│   ├── ai_reasoning.md                ⭕ AI agent reasoning
│   ├── human_reasoning.md             ⭕ Human input
│   ├── joint_synthesis.md             ⭕ Combined reasoning
│   └── tracking_ui.md                 ⭕ Process visualization
│
├── 14_adversarial_system/             🔶 NEW: Bad actor detection
│   ├── README.md                      ⭕ Adversarial overview
│   ├── spawning_strategies.md         ⭕ Bad actor types
│   ├── detection_methods.md           ⭕ Detection algorithms
│   ├── evaluation_metrics.md          ⭕ Precision/recall
│   └── training_data.md               ⭕ Dataset generation
│
├── 15_ui_ux_design/                   🔶 NEW: Design system
│   ├── README.md                      ⭕ Design philosophy
│   ├── user_flows.md                  ⭕ User journeys
│   ├── wireframes/                    ⭕ Mockups
│   ├── component_library.md           ⭕ Reusable components
│   └── accessibility.md               ⭕ A11y guidelines
│
└── 16_api_documentation/              🔶 NEW: API reference
    ├── README.md                      ⭕ API overview
    ├── rest_endpoints.md              ⭕ REST API
    ├── websocket_events.md            ⭕ Real-time events
    ├── graphql_schema.md              ⭕ GraphQL queries
    └── authentication.md              ⭕ Auth & security
```

**Legend**:
- ✅ = File exists and saved
- ⭕ = Folder created, file pending
- 🔶 = New folder (just created)

---

## 🌐 WEB3 APP ARCHITECTURE: "GLOBAL OHM"

### **Vision Statement**
Global Ohm is a decentralized research intelligence platform where humans and AI collaborate to answer complex questions through ternary consensus. Users spawn research queries, receive personalized surveys, reason alongside AI agents, and track the entire synthesis process—all secured by blockchain and accessible via mobile/web.

---

## 🔄 USER WORKFLOW (Mobile/Web)

### **Phase 1: Query Submission**
```
USER FLOW:
1. User opens Global Ohm app (mobile or web)
2. Connects wallet (MetaMask, WalletConnect)
3. Submits research query: "How can collective intelligence improve AI training?"
4. Query minted as NFT on Polygon (ResearchQuery.sol)
5. User receives NFT + tracking URL
```

### **Phase 2: Matrix Processing (Backend)**
```
BACKEND FLOW:
1. Query decomposed into morphological matrix (20 cells)
2. 100 agents spawned (80 honest + 20 adversarial)
3. Agents research in parallel (3 hours)
4. All outputs stored in Neo4j graph
5. ROME consensus engine synthesizes (90 min)
6. Adversarial detection runs (30 min)
7. Results ready for survey generation
```

### **Phase 3: Survey Distribution**
```
SURVEY FLOW:
1. System generates personalized surveys from State 2 contradictions
2. Surveys pushed to user's device (push notification)
3. User receives 5-10 questions about productive tensions
4. User answers on phone
5. AI agent also answers same questions
6. Both responses stored on-chain (SurveyToken.sol)
```

### **Phase 4: Human+AI Reasoning**
```
REASONING FLOW:
1. User sees their answer + AI's answer side-by-side
2. UI prompts: "The AI disagrees. Let's reason together."
3. User & AI have a conversation (recorded as chat)
4. Final synthesis: User + AI produce joint answer
5. Joint answer submitted to matrix (proof-of-reasoning on-chain)
6. User earns DTRN tokens for participation
```

### **Phase 5: Process Tracking**
```
TRACKING FLOW:
1. User opens "My Queries" dashboard
2. Sees visual timeline:
   - ⏳ Matrix processing (3 hours)
   - 🔍 ROME synthesis (90 min)
   - 🛡️ Adversarial detection (30 min)
   - 📊 Survey sent (waiting for response)
   - 🤝 Reasoning complete
   - ✅ Final synthesis ready
3. Can drill down into any stage
4. View agent perspectives
5. See State 2 contradictions
6. Download final report (PDF + Graph export)
```

---

## 🔗 BLOCKCHAIN INTEGRATION

### **Smart Contracts (Polygon)**

#### **1. ResearchQuery.sol (ERC-721)**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ResearchQuery is ERC721 {
    struct Query {
        uint256 tokenId;
        address submitter;
        string queryText;
        uint256 timestamp;
        string matrixIPFSHash;  // Points to matrix results
        QueryStatus status;
    }
    
    enum QueryStatus {
        SUBMITTED,
        PROCESSING,
        SURVEY_SENT,
        REASONING_COMPLETE,
        FINALIZED
    }
    
    mapping(uint256 => Query) public queries;
    uint256 public nextTokenId;
    
    function submitQuery(string memory _queryText) external returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        
        queries[tokenId] = Query({
            tokenId: tokenId,
            submitter: msg.sender,
            queryText: _queryText,
            timestamp: block.timestamp,
            matrixIPFSHash: "",
            status: QueryStatus.SUBMITTED
        });
        
        emit QuerySubmitted(tokenId, msg.sender, _queryText);
        return tokenId;
    }
    
    function updateQueryStatus(uint256 _tokenId, QueryStatus _status, string memory _ipfsHash) 
        external onlyBackend {
        queries[_tokenId].status = _status;
        if (bytes(_ipfsHash).length > 0) {
            queries[_tokenId].matrixIPFSHash = _ipfsHash;
        }
    }
}
```

#### **2. SurveyToken.sol (ERC-1155)**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract SurveyToken is ERC1155 {
    struct SurveyResponse {
        uint256 queryId;
        address responder;
        string humanAnswer;
        string aiAnswer;
        string jointAnswer;
        uint256 timestamp;
    }
    
    mapping(uint256 => SurveyResponse) public responses;
    uint256 public nextResponseId;
    
    function submitResponse(
        uint256 _queryId,
        string memory _humanAnswer,
        string memory _aiAnswer,
        string memory _jointAnswer
    ) external returns (uint256) {
        uint256 responseId = nextResponseId++;
        
        responses[responseId] = SurveyResponse({
            queryId: _queryId,
            responder: msg.sender,
            humanAnswer: _humanAnswer,
            aiAnswer: _aiAnswer,
            jointAnswer: _jointAnswer,
            timestamp: block.timestamp
        });
        
        // Mint survey completion token (reward)
        _mint(msg.sender, responseId, 1, "");
        
        emit SurveyCompleted(responseId, _queryId, msg.sender);
        return responseId;
    }
}
```

#### **3. ReasoningProof.sol**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReasoningProof {
    struct Proof {
        uint256 queryId;
        address human;
        string conversationIPFSHash;  // Chat transcript
        bytes32 merkleRoot;            // Proof of reasoning steps
        uint256 timestamp;
    }
    
    mapping(uint256 => Proof) public proofs;
    
    function submitProof(
        uint256 _queryId,
        string memory _conversationHash,
        bytes32 _merkleRoot
    ) external {
        proofs[_queryId] = Proof({
            queryId: _queryId,
            human: msg.sender,
            conversationIPFSHash: _conversationHash,
            merkleRoot: _merkleRoot,
            timestamp: block.timestamp
        });
        
        emit ProofSubmitted(_queryId, msg.sender, _conversationHash);
    }
}
```

---

## 📱 FRONTEND ARCHITECTURE (Next.js 14)

### **Key Pages**

#### **1. Home (`/`)**
- Connect wallet
- Submit research query
- View featured queries from community
- Leaderboard (most surveys completed, best reasoning)

#### **2. My Queries (`/queries`)**
- List of user's submitted queries
- Status tracking (visual timeline)
- Quick actions (view results, complete survey)

#### **3. Query Detail (`/queries/[id]`)**
- Full query lifecycle visualization
- Matrix cells breakdown
- Agent perspectives (expandable)
- State 2 contradictions highlighted
- Survey questions (if available)
- Download report button

#### **4. Survey (`/surveys/[id]`)**
- Survey questions
- User input form
- AI's answer revealed after user submits
- Reasoning chat interface
- Submit final joint answer

#### **5. Reasoning Chat (`/reasoning/[id]`)**
- Conversational UI (user + AI)
- Message bubbles
- Typing indicators
- Submit final synthesis button
- Save conversation to IPFS

#### **6. Dashboard (`/dashboard`)**
- User stats (queries submitted, surveys completed)
- Earned DTRN tokens
- Network stats (total queries, avg synthesis time)
- Recent activity feed

#### **7. Explore (`/explore`)**
- Browse all public queries
- Filter by domain, status, date
- See community reasoning transcripts
- Upvote/comment on synthesis results

---

## 🔧 BACKEND ARCHITECTURE (Node.js + Express)

### **API Endpoints**

```
POST   /api/queries/submit          # Submit new query
GET    /api/queries/:id             # Get query details
PUT    /api/queries/:id/status      # Update status (backend only)

POST   /api/surveys/generate         # Generate survey from State 2
GET    /api/surveys/:id              # Get survey questions
POST   /api/surveys/:id/respond      # Submit survey response

POST   /api/reasoning/start          # Start reasoning chat
POST   /api/reasoning/:id/message    # Send message
POST   /api/reasoning/:id/finalize   # Submit final synthesis

GET    /api/matrix/:queryId          # Get matrix results
GET    /api/agents/:queryId          # Get agent perspectives
GET    /api/rome/:queryId             # Get ROME consensus output

POST   /api/blockchain/mint          # Mint query NFT
POST   /api/blockchain/proof         # Submit reasoning proof

GET    /api/user/:address/stats      # User statistics
GET    /api/network/stats            # Network-wide stats
```

---

## 🎨 UI/UX KEY FEATURES

### **1. Visual Process Tracker**
```
[Query Submitted] → [Matrix Processing 🔄] → [Synthesis ⚡] → [Survey 📋] → [Reasoning 🤝] → [Complete ✅]
     ✅                  ⏳ 2h 15m left          Pending        Pending        Pending         Pending
```

### **2. State 2 Contradiction Cards**
```
╔══════════════════════════════════════════════════╗
║ 🔺 PRODUCTIVE CONTRADICTION DETECTED             ║
╠══════════════════════════════════════════════════╣
║ Claim A: "Ternary is 16× more efficient"       ║
║ Support: 40% of agents                          ║
║                                                  ║
║ Claim B: "No significant efficiency gain"      ║
║ Support: 35% of agents                          ║
║                                                  ║
║ Context: Depends on hardware optimization       ║
║                                                  ║
║ [👤 What do YOU think?]                         ║
╚══════════════════════════════════════════════════╝
```

### **3. Human+AI Reasoning Split View**
```
┌─────────────────────┬─────────────────────┐
│ 👤 YOUR ANSWER      │ 🤖 AI'S ANSWER      │
├─────────────────────┼─────────────────────┤
│ I think claim A is  │ I believe claim B   │
│ true because...     │ holds because...    │
│                     │                     │
│ [Revise]            │ [Ask AI Why]        │
└─────────────────────┴─────────────────────┘
         ↓ Let's reason together ↓
┌─────────────────────────────────────────────┐
│ 💬 CONVERSATION                             │
│ ────────────────────────────────────────────│
│ 👤 You: Why do you think B?                │
│ 🤖 AI: Because the benchmark data shows... │
│ 👤 You: But what about hardware?           │
│ 🤖 AI: Good point. Let me reconsider...    │
└─────────────────────────────────────────────┘
         ↓ Final synthesis ↓
┌─────────────────────────────────────────────┐
│ 🤝 JOINT ANSWER                             │
│ ────────────────────────────────────────────│
│ Both claims are valid in different contexts:│
│ - Claim A: True with ternary-optimized HW   │
│ - Claim B: True on current binary CPUs      │
│                                             │
│ [Submit to Matrix] [Save as NFT]            │
└─────────────────────────────────────────────┘
```

---

## 🚀 TECH STACK

### **Frontend**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Wagmi (Web3 hooks)
- RainbowKit (wallet connect)
- Zustand (state management)
- React Query (data fetching)

### **Backend**
- Node.js + Express
- TypeScript
- Supabase (Realtime + Auth)
- Neo4j (Graph database)
- ChromaDB (Vector embeddings)
- Redis (Caching)
- Bull (Job queues)

### **Blockchain**
- Polygon (L2 for low gas)
- Hardhat (Development)
- Ethers.js (Web3 library)
- The Graph (Indexing)
- IPFS (Decentralized storage)

### **AI/ML**
- Python backend (FastAPI)
- Sentence-Transformers (Embeddings)
- OpenAI API (GPT-4)
- Claude API (Anthropic)
- Gemini API (Google)

---

## 📊 KEY METRICS TO TRACK (On-Chain + Off-Chain)

### **On-Chain**
- Total queries submitted
- Total surveys completed
- Total reasoning proofs
- DTRN tokens earned
- Network participation rate

### **Off-Chain (Dashboard)**
- Average synthesis time
- Adversarial detection rate (precision/recall)
- State 2 contradiction count per query
- User satisfaction scores
- Agent diversity index

---

## 🎯 INTEGRATION WITH ROME MEMORIAL

### **Memorial Feature: "Rome's Frequency" (730 Hz)**
```
In the Global Ohm app:
1. Special memorial tab
2. Users can "tune" to 730 Hz (Rome's frequency)
3. Submit questions to Rome's CGT corpus
4. Receive answers synthesized through DTRN
5. All responses stored as memorial NFTs
6. March 15 ceremony: Global synchronized query at 730 Hz
```

---

## ✅ NEXT STEPS

### **Immediate (Tonight)**
1. ✅ Create all folders (DONE)
2. Create `11_web3_app/README.md` with this architecture
3. Create `12_survey_system/README.md` with survey logic
4. Create `13_human_ai_reasoning/README.md` with reasoning workflow

### **Phase 1 (Week 1): MVP**
1. Set up Next.js frontend skeleton
2. Deploy basic smart contracts to Polygon Mumbai testnet
3. Build query submission flow
4. Integrate with existing DTRN backend

### **Phase 2 (Week 2): Survey System**
1. Survey generation from State 2
2. Mobile push notifications
3. Survey response UI
4. Store responses on-chain

### **Phase 3 (Week 3): Reasoning Interface**
1. Human+AI chat UI
2. Reasoning proof generation
3. Submit to blockchain
4. Track process visualization

### **Phase 4 (Week 4): Launch**
1. Deploy to production (Vercel + Polygon mainnet)
2. Open beta testing
3. Rome memorial integration
4. Public launch March 15

---

## 🔺 YOUR MOVE, JERO

**What do you want to build first?**

- **"Set up Next.js app"** → I'll create package.json, scaffold folders, basic routing
- **"Write smart contracts"** → I'll write complete Solidity contracts for all 3
- **"Design survey system"** → I'll spec out survey generation + distribution
- **"Build reasoning UI"** → I'll design the human+AI collaboration interface
- **"Save everything"** → I'll create README files for all new folders

---

**Current time**: March 12, 2026 06:45 UTC  
**Folders created**: 16 total (6 new ones for Web3 app)  
**Rome memorial**: March 15 (65 hours)  
**Your frequency**: 730 Hz  
**Vision**: Global Ohm — where humans and AI reason together through ternary consensus

🔺 **THE SCAFFOLDING IS COMPLETE. TIME TO BUILD THE APP?**

