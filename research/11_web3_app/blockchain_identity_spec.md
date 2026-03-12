# Blockchain Identity Specification for DTRN

## Overview

DTRN's Web3 identity system allows every user to own and control their decentralized identity, store reasoning proofs on-chain, and earn achievements as NFTs. Unlike traditional social media where platforms own user data, DTRN users own their `OwlAddress` and can carry it across any compatible application.

This document specifies:
- **Owl Address format** (`username.00v00.00`)
- **Polygon on-chain registration**
- **ERC-1155 achievement tokens**
- **Phone as blockchain wallet**
- **Reasoning proofs stored on Polygon**
- **Privacy-first architecture** (local-first, broadcast by choice)

---

## Part 1: Owl Address System

### Format: `username.00v00.00`

The owl address combines a human-readable username with a domain registration on Unstoppable Domains:

```
username.00v00.00
│        │ │  │
│        │ │  └─ Unstoppable domain TLD
│        │ └──── Ternary code (00v00: reflects three states)
│        └─────── Separator
└──────────────── Human-readable name
```

#### Rules for `username`

- **Length**: 3–63 characters
- **Characters**: lowercase alphanumeric + hyphens, no leading/trailing hyphens
- **Examples**: `alice-rome`, `bob`, `research-group-01`
- **Uniqueness**: Globally unique across all DTRN users
- **Immutability**: Once minted, cannot change (but user can register multiple addresses)

#### Domain: `00v00.00`

- **Registered on**: Unstoppable Domains (Polygon-backed)
- **Structure**: Each `00v00.00` subdomain belongs to the Symbiquity Foundation
- **Benefits**: No annual fees, decentralized, user-controlled, portable

### OwlAddress Data Structure

```typescript
interface OwlAddress {
  // ===== Core Identity =====
  address: string;                     // "alice-rome.00v00.00"
  username: string;                    // "alice-rome"
  domain: string;                      // "00v00.00"
  
  // ===== Polygon Registration =====
  polygon_address: string;             // 0x1A2b3C4d5E6f7G8h9I0j... (20 bytes)
  polygon_contract_address: string;    // contract that manages this address
  registration_tx_hash: string;        // tx that minted this address
  registration_block_number: number;
  registration_timestamp: number;      // unix timestamp
  
  // ===== Cryptographic Keys =====
  public_key_ed25519: string;         // for message signing (libp2p)
  public_key_secp256k1: string;       // for Ethereum/Polygon transactions
  
  // ===== Key Recovery & Guardianship =====
  recovery_addresses: string[];        // [polygon_address, ...] (guardians)
  recovery_threshold: number;          // how many guardians must approve recovery
  
  // ===== Metadata =====
  created_at: ISO8601;                // when address was registered
  last_verified_at: ISO8601;          // most recent proof-of-ownership signature
  name_at_creation: string;           // historical record of username
  
  // ===== Privacy & Sharing =====
  privacy_level: 'public' | 'semi_private' | 'private';
  // public = discoverable in explorer
  // semi_private = queryable only if you know the address
  // private = not listed anywhere (but still queryable by known contacts)
}

interface OwlAddressRegistry {
  // Polygon smart contract storing all registrations
  // Maps (username.00v00.00) → OwlAddress record
  // Enforces unique usernames across network
  // Enables decentralized identity discovery
}
```

### Registration Flow

```
User on Phone
│
├─ Choose username (alice-rome)
│
├─ Pay minimal fee (~0.10 MATIC) to register
│  └─ via MetaMask or WalletConnect on Polygon
│
├─ Phone generates Ed25519 keypair
│  ├─ Public key stored in OwlAddress
│  └─ Private key secured in phone's secure enclave
│
├─ Phone generates secp256k1 keypair (for Ethereum compatibility)
│  └─ Linked to Polygon wallet address
│
├─ Smart contract writes OwlAddress to Polygon
│  └─ tx hash recorded as proof
│
└─ User receives achievement token (ERC-1155)
   └─ "Identity Pioneer" badge
```

---

## Part 2: On-Chain Wallet & Signing

### Phone as Web3 Wallet

Every DTRN node phone functions as a self-custodial blockchain wallet:

#### Key Storage (Secure Enclave)

```typescript
interface PhoneWallet {
  // ===== Private Keys (in Secure Enclave) =====
  private_key_secp256k1: string;      // Polygon signing (256-bit)
  private_key_ed25519: string;        // Message signing (P2P, 256-bit)
  
  // ===== Derived Addresses =====
  polygon_address: string;            // checksummed (0x...)
  
  // ===== Public Keys (safe to share) =====
  public_key_secp256k1: string;
  public_key_ed25519: string;
  
  // ===== Signing Capability =====
  can_sign: boolean;                  // true if phone unlocked
  biometric_enabled: boolean;         // require fingerprint to sign
  
  // ===== Session =====
  session_timeout_ms: number;         // how long before re-auth
  current_session_token?: string;     // temporary signing capability
}
```

#### Signing Messages

When a user participates in reasoning or consensus:

```typescript
// 1. Message to sign
const message = {
  event_id: "consensus-12345",
  proposition: "Is 2+2=4?",
  my_vote: 1,  // State 1 (TRUE)
  timestamp: "2026-03-12T14:30:00Z"
};

// 2. User biometrically authorizes signing
// (on-phone authentication, no server involved)

// 3. Phone signs with Ed25519 private key
const signature = signEd25519(message, privateKey);

// 4. Include signature in P2P gossip
const signedMessage = {
  ...message,
  signature,
  signer_node_id: "node-uuid",
  signer_public_key: publicKey
};

// 5. Peers verify signature before accepting vote
const isValid = verifyEd25519(message, signature, publicKey);
```

#### Polygon Transactions

For on-chain proofs, the phone signs transactions:

```typescript
// User participates in reasoning milestone
// System proposes a Polygon transaction:

const tx = {
  to: "0x1234...ReasoningProofContract",
  data: encodeFunctionCall("recordReasoningProof", {
    comparison_id: "comparison-uuid",
    human_label: 1,
    ai_label: 1,
    agreement: true,
    timestamp: Math.floor(Date.now() / 1000)
  }),
  gasLimit: 150000,
  gasPrice: await getGasPrice(),  // from network
  nonce: await getNonce(polygonAddress),
  chainId: 137  // Polygon mainnet
};

// Phone signs with secp256k1 private key
const signedTx = signTransaction(tx, privateKey);

// Phone submits to Polygon RPC
const txHash = await submitToPolygon(signedTx);

// System records proof on-chain
const onChainProof = {
  comparison_id: "comparison-uuid",
  polygon_tx_hash: txHash,
  polygon_block: ...,  // once mined
  timestamp: Date.now()
};
```

---

## Part 3: ERC-1155 Achievement Tokens

### Token Design

DTRN uses **ERC-1155** (multi-token standard) to mint achievements as NFTs:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DRTNAchievements is ERC1155, Ownable {
  
  // ===== Token Metadata =====
  mapping(uint256 => string) public tokenURI;
  mapping(uint256 => Achievement) public achievements;
  
  struct Achievement {
    string name;           // "First Harmonic Lock"
    string description;
    string badge_image_url;
    uint256 mint_limit;    // 0 = unlimited
    uint256 mints_so_far;
  }
  
  // ===== Minting Logic =====
  function mintAchievement(
    address recipient,
    uint256 achievement_id,
    uint256 quantity,
    bytes memory data
  ) public onlyOwner {
    _mint(recipient, achievement_id, quantity, data);
    achievements[achievement_id].mints_so_far += quantity;
  }
  
  // ===== Batch Minting (for consensus events) =====
  function mintConsensusParticipation(
    address[] memory participants,
    uint256 consensus_event_id,
    bytes memory event_proof_data
  ) public onlyOwner {
    // e.g., mint "Consensus Contributor" to all who participated
    uint256 token_id = 200 + (consensus_event_id % 1000);
    for (uint i = 0; i < participants.length; i++) {
      _mint(participants[i], token_id, 1, "");
    }
  }
}
```

### Achievement Types

```typescript
enum AchievementType {
  // Identity & Onboarding
  IDENTITY_PIONEER = 1,          // First OwlAddress registration
  FIRST_FREQUENCY_BROADCAST = 2,
  
  // Resonance & Collaboration
  FIRST_HARMONIC_LOCK = 10,
  HUNDRED_HOURS_ALIGNED = 11,
  RESONANCE_MASTER = 12,         // 1000+ hours at 730 Hz
  
  // Reasoning & Consensus
  FIRST_REASONING_TRACE = 20,
  HUNDRED_CONSENSUS_VOTES = 21,
  STATE_2_INSIGHT = 22,          // Discovered a valuable contradiction
  
  // Human+AI Collaboration
  REASONING_PIONEER = 30,        // First human+AI comparison
  THOUSAND_COMPARISONS = 31,
  LABEL_AGREEMENT_MASTER = 32,   // 90%+ human-AI agreement over 100 comparisons
  
  // Research Contributions
  SURVEY_CONTRIBUTOR = 40,
  RESEARCH_CATALYST = 41,        // Initiated 5+ research sessions
  DISCOVERY_MAKER = 42,          // Found novel insight via collective reasoning
  
  // Memorial & Community
  ROME_MEMORY_KEEPER = 50,       // Attended/participated in memorial ceremony
  BUILDER_OF_ROME = 51,          // Contributed to Global Rome development
}
```

### Minting Triggers

```typescript
// When user registrations OwlAddress
event OwlAddressRegistered(address indexed user, string owl_address);
// → Mint IDENTITY_PIONEER token

// When user achieves 100-hour resonance milestone
event RessonaneMilestoneReached(address indexed user, uint256 hours);
// → Mint HUNDRED_HOURS_ALIGNED token

// When user participates in consensus event
event ConsensusParticipationLogged(
  address[] indexed participants,
  string event_id
);
// → Mint CONSENSUS_CONTRIBUTOR token to all

// When State 2 signal is particularly valuable
event State2InsightRecorded(address indexed contributor, string insight_id);
// → Mint STATE_2_INSIGHT token

// When human+AI comparison shows interesting disagreement
event HumanAIComparisonRecorded(
  address indexed human,
  uint256 training_value
);
// → Mint THOUSAND_COMPARISONS if threshold reached
```

### Token Metadata & Visual Design

```json
{
  "token_id": 1,
  "achievement_type": "IDENTITY_PIONEER",
  "name": "Identity Pioneer",
  "description": "First to register an OwlAddress in the Global Rome network",
  "image_url": "ipfs://QmXxxx.../identity-pioneer-badge.svg",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    },
    {
      "trait_type": "Category",
      "value": "Identity"
    },
    {
      "trait_type": "Minted Date",
      "value": "2026-03-12"
    }
  ],
  "animation_url": "ipfs://QmXxxx.../identity-pioneer-animated.mp4"
}
```

All metadata and images stored on **IPFS** (pinned by Symbiquity Foundation) for censorship resistance.

---

## Part 4: Reasoning Proofs (On-Chain Records)

### Proof Architecture

When a user completes a human+AI reasoning comparison, the result is optionally recorded on Polygon as immutable proof:

```typescript
interface ReasoningProof {
  // ===== Identity =====
  proof_id: string;                    // UUID
  human_respondent: string;            // OwlAddress
  comparison_id: string;               // linked HumanAIComparison.id
  
  // ===== The Proof =====
  prompt_hash: string;                 // SHA256(prompt) — not full prompt for privacy
  human_label: 0 | 1 | 2;             // what human said
  ai_label: 0 | 1 | 2;                // what AI said
  labels_agree: boolean;               // human === AI?
  confidence_gap: number;              // |human_confidence - ai_confidence|
  
  // ===== Timestamp & Versioning =====
  reasoning_completed_at: ISO8601;     // when reasoning happened
  bitnet_model_version: string;        // which AI version
  
  // ===== On-Chain Storage =====
  polygon_tx_hash: string;             // transaction that recorded this
  polygon_block_number: number;        // which block it was in
  polygon_timestamp: number;           // unix timestamp from block
  proof_contract_address: string;      // 0x... address of storage contract
  
  // ===== Privacy Controls =====
  visibility: 'public' | 'private' | 'researchers_only';
  // public: anyone can query
  // private: only human can view
  // researchers_only: visible to approved research nodes
  
  // ===== Metadata =====
  created_at: ISO8601;
}
```

### Smart Contract for Proof Storage

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReasoningProofRegistry {
  
  struct ReasoningProof {
    bytes32 prompt_hash;        // SHA256 of prompt
    uint8 human_label;          // 0, 1, or 2
    uint8 ai_label;            // 0, 1, or 2
    uint256 timestamp;
    string model_version;
  }
  
  // proof_id → proof data
  mapping(bytes32 => ReasoningProof) public proofs;
  
  // user → [proof_ids]
  mapping(address => bytes32[]) public userProofs;
  
  event ProofRecorded(
    bytes32 indexed proof_id,
    address indexed user,
    bytes32 prompt_hash,
    uint8 human_label,
    uint8 ai_label
  );
  
  function recordProof(
    bytes32 proof_id,
    bytes32 prompt_hash,
    uint8 human_label,
    uint8 ai_label,
    string calldata model_version
  ) public {
    require(human_label <= 2, "Invalid label");
    require(ai_label <= 2, "Invalid label");
    
    proofs[proof_id] = ReasoningProof({
      prompt_hash: prompt_hash,
      human_label: human_label,
      ai_label: ai_label,
      timestamp: block.timestamp,
      model_version: model_version
    });
    
    userProofs[msg.sender].push(proof_id);
    
    emit ProofRecorded(
      proof_id,
      msg.sender,
      prompt_hash,
      human_label,
      ai_label
    );
  }
  
  // Verify that a proof exists and was recorded at specific block
  function getProof(bytes32 proof_id) 
    public 
    view 
    returns (ReasoningProof memory) 
  {
    return proofs[proof_id];
  }
  
  // User's full proof history
  function userProofHistory(address user)
    public
    view
    returns (bytes32[] memory)
  {
    return userProofs[user];
  }
}
```

### Why Record on-Chain?

1. **Immutable audit trail**: Proof exists forever, can't be falsified later
2. **Researcher access**: Data scientists can query Polygon subgraph for research
3. **Collective ownership**: Users own proofs, not a central server
4. **Blockchain timestamp**: Independent proof of when reasoning occurred
5. **Privacy by design**: Only hash of prompt stored, full text remains local

---

## Part 5: Privacy-First Architecture

### Local-First, Broadcast by Choice

Unlike traditional systems that collect data first and ask forgiveness later, DTRN inverts this:

#### Data Lives Local

```
User's Phone
│
├─ Raw input (text, frequency, etc.) → stays on phone
├─ Reasoning (BitNet inference) → stays on phone
├─ Latent trace (embeddings) → stays on phone
│
└─ User chooses what to broadcast:
   ├─ Frequency (always, by design of knob UI)
   ├─ Reasoning summary (opt-in) → sent to peers as LatentTrace
   ├─ Consensus vote (opt-in) → sent to participate
   └─ Full prompt text (never, by default)
```

#### Selective Disclosure

```typescript
interface PrivacySettings {
  broadcast_frequency: boolean;        // default true (core feature)
  broadcast_reasoning_summary: boolean;// default false
  include_prompt_in_trace: boolean;   // default false (hash only)
  research_opt_in: boolean;           // default false
  // If true: allow researchers to query your data (anonymized)
  researcher_access_token?: string;   // for query auth
}
```

#### Researcher Access Pattern

```
Researcher wants to study voting patterns
│
├─ Submits data request to smart contract
│  └─ Polygon records: "researcher X wants data Y with consent from users"
│
├─ Users with opt_in=true see notification
│  └─ "Researcher at MIT wants 1000 consensus votes for study on disagreement"
│
├─ Users approve/decline (with deadline)
│
└─ If approved:
   ├─ System generates anonymized dataset
   ├─ Researcher gets IPFS hash
   └─ Block explorer shows: "Data released 2026-03-12 for study XYZ"
```

### Encryption at Rest

```typescript
// User's local data encrypted with their phone's PIN/biometric
interface EncryptedLocalData {
  // All stored locally in encrypted format
  
  reasoning_traces: EncryptedValue;    // encrypted with secp256k1 pub key
  latent_embeddings: EncryptedValue;
  private_keys: EncryptedValue;        // encrypted with biometric/PIN
  
  // Decryption only happens in memory when needed
  decrypt(): void {
    // Phone asks for fingerprint/PIN
    // Decrypts in secure enclave
    // Returns to app in plaintext, only in memory
  }
}
```

### No Server-Side Reasoning Storage

- Supabase stores: user profiles, frequencies, ceremony metadata, survey responses
- **Never stored on server**: Raw prompts, full reasoning traces, BitNet activations
- **Supabase policy**: Automatic deletion of temporary data after 30 days

---

## Part 6: Identity Recovery & Guardianship

### Multi-Signature Recovery

If a user loses their phone, they can recover their OwlAddress by using guardian keys:

```typescript
interface IdentityRecovery {
  original_owl_address: string;        // "alice-rome.00v00.00"
  recovery_initiated_at: ISO8601;
  
  // ===== Guardians =====
  guardians: {
    guardian_polygon_address: string;  // trusted friend's address
    guardian_owl_address?: string;     // optional (if also on DTRN)
    approval_status: 'pending' | 'approved' | 'rejected';
    approval_timestamp?: ISO8601;
  }[];
  
  recovery_threshold: number;          // how many guardians must approve
  // e.g., 2-of-3 (need 2 out of 3 guardians)
  
  // ===== New Device =====
  new_polygon_address: string;         // new phone's address
  migration_tx_hash?: string;          // Polygon tx that moves identity
  
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

// Recovery flow (on Polygon):
// 1. User calls recoverIdentity(original_address, new_address)
// 2. Contract emits IdentityRecoveryRequested
// 3. Guardians see notification (off-chain, via subgraph)
// 4. Guardians call approveRecovery(recovery_id)
// 5. Once threshold met, contract transfers identity to new_address
// 6. Old address invalidated, new address becomes owner
```

---

## Part 7: Integration with Global Rome App

### On-Phone Wallet Integration

```typescript
// In /app/page.tsx (main app)

import { useWallet } from '@/hooks/useWallet';
import { OwlAddressRegistry } from '@/lib/blockchain';

export default function GlobalRome() {
  const { 
    wallet, 
    owlAddress, 
    signMessage, 
    recordProof 
  } = useWallet();
  
  // When user participates in consensus
  const participateInConsensus = async (event_id, vote) => {
    const message = {
      event_id,
      vote,
      timestamp: new Date().toISOString()
    };
    
    // Sign with phone's Ed25519 key
    const signature = await signMessage(message);
    
    // Broadcast via P2P
    broadcast({
      ...message,
      signature,
      signer: owlAddress
    });
  };
  
  // When user completes human+AI comparison (State 2 signal valuable)
  const recordAIComparison = async (comparison_id) => {
    // Optional: record on Polygon for permanent proof
    const tx_hash = await recordProof(comparison_id);
    
    // Mint achievement if threshold reached
    if (await checkMilestone('hundred_comparisons')) {
      await mintAchievement('THOUSAND_COMPARISONS');
    }
  };
  
  return (
    <div>
      <div>Connected as: {owlAddress}</div>
      <Knob onFrequencyChange={broadcastFrequency} />
      <Triangle3D />
    </div>
  );
}
```

### Achievement Badge Display

```typescript
// Component to show user's achievements

import { useAchievements } from '@/hooks/useAchievements';

export function AchievementBadges() {
  const { achievements, isLoading } = useAchievements(owlAddress);
  
  if (isLoading) return <div>Loading achievements...</div>;
  
  return (
    <div className="achievement-grid">
      {achievements.map(achievement => (
        <div key={achievement.token_id} className="badge">
          <img src={achievement.image_url} alt={achievement.name} />
          <h3>{achievement.name}</h3>
          <p>{achievement.description}</p>
          <a href={`https://opensea.io/assets/matic/${achievement.contract}/${achievement.token_id}`}>
            View on OpenSea
          </a>
        </div>
      ))}
    </div>
  );
}
```

---

## Part 8: Polygon Integration Summary

### Smart Contracts Deployed

| Contract | Purpose | Address (Polygon Mainnet) |
|----------|---------|---------------------------|
| `OwlAddressRegistry` | Register/resolve .00v00.00 addresses | `0x...` |
| `DRTNAchievements` | Mint ERC-1155 tokens | `0x...` |
| `ReasoningProofRegistry` | Store human+AI comparison proofs | `0x...` |
| `ConsensusProofRegistry` | Store consensus event summaries | `0x...` |
| `IdentityRecovery` | Guardian-based recovery flows | `0x...` |

### Gas Optimization

- Batch minting for achievements (up to 100 users per tx)
- Data compression (hashes instead of full text)
- IPFS for large metadata (images, descriptions)
- Polygon's low fees (~$0.01 per tx vs Ethereum $10+)

### Subgraph (The Graph Protocol)

DTRN deploys a Subgraph on The Graph for querying:

```graphql
query getUserProofs {
  reasoningProofs(
    where: { user: "0x..." }
    orderBy: timestamp
    orderDirection: desc
    first: 100
  ) {
    id
    promptHash
    humanLabel
    aiLabel
    timestamp
  }
}

query getAchievements {
  erc1155Transfers(
    where: { to: "0x..." }
    first: 50
  ) {
    tokenId
    value
    timestamp
  }
}
```

---

## Part 9: Roadmap & Future Enhancements

### Phase 1 (MVP): Identity + Proofs
- OwlAddress registration (Polygon)
- ERC-1155 basic achievements
- Reasoning proof recording
- Phone wallet integration

### Phase 2: Cross-Chain
- Mirror identity to Ethereum, Solana
- Portable achievements across chains
- Cross-chain recovery

### Phase 3: Decentralized Governance
- DAO for Symbiquity Foundation
- Collective decision-making on protocol upgrades
- Community-minted achievements

### Phase 4: Privacy Enhancements
- Zero-knowledge proofs for reasoning verification
- Encrypted consensus (threshold encryption)
- Privacy-preserving research data access

---

## Related Documents

- `research/02_architecture/system_architecture.md` — Full system design
- `research/05_technical_specs/schemas.md` — Complete schema definitions
- `research/13_human_ai_reasoning/human_ai_collaboration.md` — Reasoning comparison details
