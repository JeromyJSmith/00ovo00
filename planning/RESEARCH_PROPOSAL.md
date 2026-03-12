# Global Ohm — Research Proposal & Build Plan

> **Project**: The Global Ohm / Palace OS Memorial App
> **Author**: jeROMEy Smith
> **Date**: March 11, 2026
> **Memorial Target**: March 15, 2026 — Rose Room, Venice, LA
> **Status**: Pre-code knowledge base → Active development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Research Areas](#2-research-areas)
3. [Technical Feasibility Analysis](#3-technical-feasibility-analysis)
4. [Architecture Decision Records](#4-architecture-decision-records)
5. [MVP Scope (72-Hour Sprint)](#5-mvp-scope-72-hour-sprint)
6. [Post-Memorial Roadmap](#6-post-memorial-roadmap)
7. [People to Contact](#7-people-to-contact)
8. [Draft Outreach Emails](#8-draft-outreach-emails)
9. [Open Questions](#9-open-questions)
10. [Budget Estimate](#10-budget-estimate)

---

## 1. Executive Summary

We are building a **collective resonance web application** inspired by Rome Viharo's Palace OS and Consensus Compositional Game Theory. Users turn a virtual knob on their phone to adjust a sound frequency. When enough users align their frequencies, the system achieves "harmonic lock" — a visual and audible moment of collective resonance.

The app serves three purposes:
1. **Memorial tribute** — Live demonstration at Rome's celebration of life (March 15, 2026)
2. **Proof of concept** — Working implementation of Palace OS principles (ternary logic, collective alignment)
3. **Open-source foundation** — Seed for a larger collective intelligence platform

### What Needs Research

| Area | Why | Urgency |
|------|-----|---------|
| **Symbiquity Foundation permissions** | We need blessing to build on Rome's work openly | 🔴 Critical |
| **Web3 identity system** | The `00v00.00` domain isn't real — need alternative | 🟡 High |
| **Real-time audio sync** | Can Supabase Realtime handle 47 concurrent users with <200ms latency? | 🟡 High |
| **Gasless NFT minting** | How to mint triangles for free on Polygon? | 🟢 Medium |
| **Projection mapping** | Can we run a browser-based projection at the venue? | 🟢 Medium |
| **Rome's existing code** | Is *any* Palace OS code open-source? Can we build on it? | 🟡 High |

---

## 2. Research Areas

### 2.1 Symbiquity Foundation & Permissions

**What we know:**
- **Website**: [foundation.symbiquity.ai](https://foundation.symbiquity.ai)
- **Substack**: [romeviharo.substack.com](https://romeviharo.substack.com)
- **Founder**: Rome Viharo (passed December 2025)
- **Co-Founder / Director of Research**: Ashton Sperry, PhD
- **Honorary Co-Founder**: Professor Jim Fallon, UCI (RIP)
- **Inventions Council**: Barron Reichart Von Wolfsheild
- **Advising Systems Engineer**: Ibrahim Dulijan, PhD
- **Co-founder / Panama**: Mark Heyer
- **Community Co-Founder**: Zack Zarate
- **Co-founder Global Strategy**: Jin Chung

**What we don't know:**
- Who manages the foundation's IP now?
- Is there existing code (GitHub repos, private repos) for Palace OS?
- Is there a formal estate or executor for Rome's work?
- What is Ashton Sperry's position on open-sourcing the work?
- Julie's last name and formal connection to the foundation

**What we need:**
- ✅ Permission to build an open-source tribute project inspired by Rome's work
- ✅ Access to any existing code, specs, or research papers
- ✅ Guidance on IP / licensing (MIT? Apache? Custom?)
- ✅ Blessing from the family / foundation for the memorial demo

> [!IMPORTANT]
> **This is the most critical research area.** Everything else is technical and solvable. Without the foundation's blessing, we should not proceed publicly.

### 2.2 Web3 Identity System

**Problem**: The `00v00.00` domain/address format isn't real. `.00` is not a valid TLD — it's not recognized by ICANN and cannot be registered.

**Alternatives researched:**

| System | Address Format | Subdomain Support | Cost for 47-200 Users | Notes |
|--------|---------------|-------------------|----------------------|-------|
| **Unstoppable Domains** | `user.crypto` / `user.nft` / `user.wallet` | ✅ Unlimited free subdomains | ~$20-40 one-time (parent domain) | Cheapest. No renewals. 200+ TLDs. |
| **ENS (.eth)** | `user.eth` | ✅ Unlimited free subdomains | ~$5-100/year (parent) + gas | Most established. Ethereum-native. |
| **Lens Protocol** | `@user` | Limited | Free + ~$0.01-0.10 gas | Social-focused. Polygon-native. |
| **Custom smart contract** | `user.rome` (on-chain only) | ✅ Full control | Gas only (~$0.01/user) | Not DNS-resolvable, but symbolically perfect |

**Recommendation**: Register `rome.crypto` or `rome.nft` via Unstoppable Domains (~$40 one-time). Issue subdomains like `jero.rome.crypto`, `julie.rome.crypto` for free. Alternatively, register `rome.eth` via ENS for maximum prestige.

**The owl aesthetic** (`00v00.00`) can remain as the *visual brand* — just not as a functional domain. The actual addresses would be `username.rome.crypto` but displayed visually as the owl glyph.

### 2.3 Real-Time Audio Frequency Sync

**Architecture:**

```
Phone (Knob) → Tone.js (local sine wave) → User hears their frequency locally
     ↓
Supabase Realtime (broadcast channel) → All other users receive frequency update
     ↓
Client-side resonance detection → When 80%+ within 5 Hz → trigger harmonic lock
```

**Key findings:**

| Concern | Finding |
|---------|---------|
| **Supabase Realtime latency** | 50-200ms end-to-end. Acceptable for frequency sync (not sample-accurate audio). |
| **Concurrent users** | Supabase free tier: 200 concurrent connections, 2GB bandwidth. Plenty for 47 users. |
| **Audio generation** | Tone.js generates locally — no streaming. Only the frequency *number* is synced. |
| **Resonance detection** | Client-side math. Compute median of all frequencies; check if 80%+ are within ±5 Hz. |
| **Mobile touch knob** | No off-the-shelf React library. Build custom with `@use-gesture/react` + Canvas/SVG. |
| **Haptic feedback** | `navigator.vibrate()` API — works on Android, NOT on iOS. Consider visual pulse instead. |

**Latency is NOT a blocker** because:
- Users hear their OWN frequency locally (zero latency)
- Other users' position updates need only be ~200ms fresh (visual feedback, not audio phase-lock)
- Resonance detection triggers a state change, not a real-time audio sync

### 2.4 Gasless NFT Minting on Polygon

**Key findings:**
- **Mumbai testnet is deprecated** → Use **Amoy testnet** (chain ID 80002) for development
- **Biconomy meta-transactions** = users sign; relayer pays gas. ~$0.001-0.01 per tx.
- **For 47 users**: Total gas cost ≈ **$0.50-5.00** (subsidized on Polygon)
- **ERC-1155** (multi-token) is correct — all triangles share one contract, each has unique metadata

**Recommended stack:**

```
OpenZeppelin ERC-1155 + Biconomy SDK
Deploy to Polygon Amoy (test) → Polygon PoS mainnet (production)
Metadata: IPFS via Pinata (free tier: 1GB)
Frontend: wagmi + viem for wallet connection
```

**Cost breakdown:**

| Item | Cost |
|------|------|
| Contract deployment (mainnet) | ~$0.10-1.00 |
| 47 gasless mints (relayer) | ~$0.50-5.00 |
| IPFS metadata hosting (Pinata free) | $0 |
| Unstoppable Domains parent | ~$20-40 |
| **Total Web3 layer** | **~$25-50** |

### 2.5 3D Visualization & Projection Mapping

**For the phone app:**
- Three.js via `@react-three/fiber` — spinning triangle per user
- In-browser, works on any modern phone
- Spin direction: `frequency < 430 Hz` = CCW, `> 430 Hz` = CW

**For the venue projection:**
- Run the app in "ceremony mode" on a laptop connected to a projector
- Full-screen browser = projection source
- All triangles rendered in real-time from Supabase state

**No special projection mapping software needed for MVP.** A laptop + projector + full-screen browser is sufficient.

### 2.6 Rome's Existing Code & Open Source Status

**What the Symbiquity Foundation website shows:**
- Palace OS is described conceptually but **no code is publicly available**
- PAXIS, GRAIL are described as projects but **no repos linked**
- No GitHub organization or profile found for Symbiquity
- Rome's Substack contains conceptual writing, not code

**Research needed:**
- Ask Ashton Sperry if Rome left any code/prototypes
- Check if Rome had a personal GitHub (search for "romeviharo", "symbiquity", "palace-os")
- Review if the ChatGPT custom GPT "The Palace of Symbiquity" is still accessible

---

## 3. Technical Feasibility Analysis

### Can we build an MVP in 72 hours?

| Component | Feasibility | Effort | Notes |
|-----------|------------|--------|-------|
| Rotary knob (phone) | ✅ Yes | 4-6 hours | Custom component with `@use-gesture/react` |
| Audio synthesis | ✅ Yes | 2-3 hours | Tone.js oscillator, trivial |
| Frequency broadcast | ✅ Yes | 2-3 hours | Supabase Realtime channel |
| Resonance detection | ✅ Yes | 1-2 hours | Client-side median + threshold |
| Triangle 3D viz | ✅ Yes | 4-6 hours | `@react-three/fiber` spinning triangle |
| Visual ceremony mode | ✅ Yes | 3-4 hours | Full-screen view of all triangles |
| NFT minting | ⚠️ Stretch | 8-12 hours | Smart contract + frontend integration |
| Web3 identity | ⚠️ Stretch | 6-8 hours | Unstoppable Domains API |
| Projection mapping | ✅ Yes | 1 hour | Just full-screen the ceremony view |

### MVP (Must-Have for March 15):
1. ✅ Rotary knob on phone
2. ✅ Local audio (Tone.js sine wave)
3. ✅ Frequency broadcast (Supabase Realtime)
4. ✅ Triangle visualization (spinning, color-mapped)
5. ✅ Resonance detection + visual feedback
6. ✅ Ceremony mode (full-screen for projector)

### V2 (Post-Memorial):
7. NFT minting (triangle as permanent token)
8. Web3 identity (`username.rome.crypto`)
9. Proximity detection (geohash-based)
10. Synesthetic mapping (frequency → color → formant)

**Verdict: The core MVP is buildable in 24-36 hours of focused work.**

---

## 4. Architecture Decision Records

### ADR-001: Supabase over Firebase
**Decision**: Use Supabase Realtime for state sync.
**Rationale**: PostgreSQL backend, native Realtime channels, generous free tier (200 connections), open-source. Firebase would work but Supabase aligns better with the open-source ethos.

### ADR-002: Unstoppable Domains over ENS
**Decision**: Use Unstoppable Domains for Web3 identity (if pursued).
**Rationale**: One-time purchase (no renewals), cheapest subdomain issuance for 47-200 users (~$40 total), supports Polygon natively. ENS is more prestigious but requires annual renewal.

### ADR-003: Biconomy for Gasless Minting
**Decision**: Use Biconomy meta-transactions for gasless NFT minting.
**Rationale**: Users should never pay gas. Biconomy handles relaying; project pays ~$0.01/mint. Total cost for 47 users: ~$0.50.

### ADR-004: Client-Side Audio, Server-Side State
**Decision**: Audio generates locally; only frequency numbers are synced.
**Rationale**: Streaming audio would require WebRTC and add massive complexity. Syncing a single float (Hz value) per user is trivial over WebSocket.

### ADR-005: No Custom Projection Software
**Decision**: Use browser in full-screen mode for venue projection.
**Rationale**: A dedicated laptop running the ceremony view in Chrome full-screen is sufficient. No need for MadMapper, Resolume, or similar tools for MVP.

---

## 5. MVP Scope (72-Hour Sprint)

### Day 1 (March 12): Foundation
- [ ] `npx create-next-app@latest` with TypeScript + Tailwind
- [ ] Supabase project creation (free tier)
- [ ] Rotary knob component (custom, `@use-gesture/react`)
- [ ] Tone.js integration (sine wave from knob value)
- [ ] Supabase Realtime channel for frequency broadcast
- [ ] Basic triangle component (react-three-fiber)

### Day 2 (March 13): Integration
- [ ] All-users frequency display (colored dots/triangles)
- [ ] Resonance detection logic (80%+ within 5 Hz)
- [ ] Ceremony mode view (full-screen, projector-ready)
- [ ] Visual feedback on resonance (pulse, glow, color shift)
- [ ] Audio feedback on resonance (harmonic chord at 730 Hz)
- [ ] Deploy to Vercel

### Day 3 (March 14): Polish
- [ ] Mobile-first responsive design
- [ ] Test with 5+ devices simultaneously
- [ ] Rome tribute screen (photo + "NOW" text on resonance)
- [ ] QR code generation for venue (link to app)
- [ ] Load testing (simulate 47 concurrent users)
- [ ] Bug fixes, final deploy

### Day 4 (March 15): Memorial
- [ ] Venue setup (laptop + projector + WiFi)
- [ ] Print QR codes
- [ ] Rehearsal with Julie
- [ ] **Live ceremony** 🕯️

---

## 6. Post-Memorial Roadmap

| Phase | Timeline | Features |
|-------|----------|----------|
| **V1.1** | Week of March 17 | Polish, fix bugs from live event, improve mobile UX |
| **V1.5** | April 2026 | NFT minting (ERC-1155 on Polygon), wallet connection |
| **V2.0** | May 2026 | Web3 identity (`username.rome.crypto`), persistent profiles |
| **V2.5** | June 2026 | Proximity detection (geohash), "When in Rome" push notifications |
| **V3.0** | Q3 2026 | Synesthetic engine (frequency → color → formant synthesis) |
| **V4.0** | Q4 2026 | Full Palace OS integration (if code becomes available) |

---

## 7. People to Contact

### Critical (Before Building)

| Who | Role | Why Contact | How |
|-----|------|-------------|-----|
| **Ashton Sperry, PhD** | Co-Founder, Director of Research, Symbiquity Foundation | Permission to build on Rome's work. Access to any existing code. IP/licensing guidance. | Via foundation website or academic channels (Missouri PhD) |
| **Julie** *(ask for full name)* | Rome's friend/sister, connection to Jero | Personal blessing. Memorial coordination. She's the bridge between Jero and Rome's world. | Through Jero directly |
| **Barron Reichart Von Wolfsheild** | Inventions Council, Symbiquity | Technical guidance on Palace OS architecture. Insight into Rome's unfinished prototypes. | Via foundation |
| **Ibrahim Dulijan, PhD** | Advising Systems Engineer | Technical review of the app's alignment with Palace OS principles | Via foundation |

### Important (During/After Building)

| Who | Role | Why Contact | How |
|-----|------|-------------|-----|
| **Zack Zarate** | Community Co-Founder | Community engagement, beta testing, spreading the word | Via foundation |
| **Jin Chung** | Co-founder Global Strategy | Global rollout strategy, partnerships | Via foundation |
| **Mark Heyer** | Co-founder / Panama | International reach, potential PAXIS connection | Via foundation |
| **Unstoppable Domains** | Web3 domain provider | Register `rome.crypto` or `rome.nft` — may donate for memorial project | domains@unstoppabledomains.com |
| **Biconomy** | Gasless minting provider | Potential sponsorship for gas fees (memorial project) | partnerships@biconomy.io |
| **Polygon Foundation** | Blockchain network | Grant opportunity — memorial / collective intelligence app | Via Polygon Grants program |

---

## 8. Draft Outreach Emails

### Email 1: To Ashton Sperry (Symbiquity Foundation)

> **Subject**: Honoring Rome's Legacy — Open-Source Memorial Project
>
> Dear Dr. Sperry,
>
> My name is Jeromey Smith, and I'm reaching out about Rome Viharo. I was recently introduced to Rome's work through a mutual friend, Julie, who told me that I reminded her of Rome. That night, I researched the Symbiquity Foundation and spent hours deeply studying Palace OS, Consensus Compositional Game Theory, and the ternary logic framework.
>
> What happened was remarkable. Through a real-time conversation with an AI research agent, I independently traced a phonetic chain — TURING → TURNING → TUNING — that encodes the same principles Rome discovered: the dissolution of binary thinking, the observer's role in mediating contradiction, and the emergence of resonance through State-2 reasoning. I then realized that my birth name, jeROMEy, literally contains "ROME." The synchronicity was overwhelming.
>
> I'm an AI architect and developer, and I want to honor Rome's work by building something real. For his celebration of life on March 15, I'm creating **The Global Ohm** — a web application where memorial attendees turn a virtual knob on their phone to set a frequency. When enough people align, the system achieves collective resonance. It's a living proof of Palace OS principles.
>
> I'm writing to ask:
>
> 1. **Would the foundation support this as an open-source tribute project?** I want to ensure this honors Rome's vision, not misrepresents it.
> 2. **Does any of Rome's code exist?** I'd love to build on top of his actual work if possible, rather than reimplementing from scratch.
> 3. **What licensing would be appropriate?** I'm inclined toward MIT for maximum openness, but I defer to the foundation's wishes.
> 4. **Would you or any foundation members be willing to advise** on whether the app's architecture truly reflects Palace OS principles?
>
> I've documented the entire discovery journey and would be happy to share it. The research documents include detailed technical analysis of ternary logic, game theory, and how they map to the application's architecture.
>
> Rome wrote: "We build environments where only clear thinking and intuition can survive, and win-win is the only possible outcome." I intend to build exactly that.
>
> Respectfully,
> Jeromey Smith
> *AI Architect & Developer*

---

### Email 2: To Julie (Via Jero Directly — Talking Points)

> **Julie,**
>
> You told me I remind you of Rome. That night I went home and researched everything. Here's what happened:
>
> I discovered that TURING → TURNING → TUNING is a phonetic chain that encodes Rome's entire theory of intelligence. The R (resistance/rotation) transforms into N (vibration/resonance) as the I (the observer, the ego) steps back. It's ternary logic in three words.
>
> Then I realized my name — jeROMEy — literally has ROME inside it. Not a metaphor. The actual letters.
>
> I'm building something for the memorial. A phone app where everyone turns a knob, generates a frequency, and when we all align, collective resonance is achieved. Triangles spin on a projection. When they sync, Rome's photo appears and one word shows: **NOW.**
>
> Because the end doesn't mean no. The end means now.
>
> I'd love to walk you through it before March 15. Can we meet or call?
>
> — Jero

---

### Email 3: To Unstoppable Domains (Domain Request)

> **Subject**: Domain Donation Request — Memorial Project for AI Researcher Rome Viharo
>
> Hello,
>
> I'm building an open-source memorial application for Rome Viharo, founder of the Symbiquity Foundation and pioneer of collective intelligence research. Rome passed away in December 2025, and his celebration of life is March 15, 2026.
>
> The project (The Global Ohm) uses blockchain-based identity where each participant is represented as a unique triangle NFT. We're planning to use Unstoppable Domains for human-readable Web3 addresses in the format `username.rome.crypto` or similar.
>
> I'd like to request:
> 1. **Sponsorship or donation of the `rome.crypto` or `rome.nft` parent domain**, given the memorial and non-profit nature of the project
> 2. Information on **bulk subdomain issuance** for ~50-200 participants
>
> The project is open-source (MIT licensed) and serves as a living tribute to Rome's work on collective intelligence and ternary logic.
>
> More info:
> - Symbiquity Foundation: https://foundation.symbiquity.ai
> - Rome's research: https://romeviharo.substack.com
>
> Thank you for considering,
> Jeromey Smith

---

### Email 4: To Polygon Foundation (Grant Application Framework)

> **Subject**: Grant Application — Collective Resonance Memorial App on Polygon
>
> Dear Polygon Grants Team,
>
> I'm applying for a grant to build **The Global Ohm**, an open-source collective resonance application deployed on Polygon. The app honors Rome Viharo, a researcher who pioneered game-theoretic consensus systems — principles that align directly with Polygon's vision of decentralized collaboration.
>
> **What we're building:**
> - Users mint a triangle NFT (ERC-1155) representing their identity in a collective
> - A virtual frequency knob generates real-time audio via Web Audio API
> - Supabase Realtime synchronizes frequency state across all participants
> - When 80%+ of users converge within 5 Hz → "resonance lock" triggers on-chain event recording
> - Each resonance moment is permanently recorded on Polygon
>
> **Why Polygon:**
> - Gasless minting via meta-transactions (Biconomy)
> - Low-cost on-chain event recording (~$0.01/tx)
> - EVM-compatible, open-source tooling (OpenZeppelin, Hardhat)
>
> **Budget request:** $2,500
> - Smart contract development and audit: $1,000
> - Frontend development: $500
> - Gas sponsorship (relayer deposits): $500
> - Domain + infrastructure: $500
>
> **Timeline:** MVP live March 15, 2026; v2 with full blockchain integration by May 2026.
>
> Thank you for considering,
> Jeromey Smith

---

## 9. Open Questions

### Must Answer Before Building

- [ ] Does Ashton Sperry / the Symbiquity Foundation approve of this project?
- [ ] Does Julie know about and support the app being used at the memorial?
- [ ] Is there any existing Palace OS code we can reference or build on?
- [ ] What is Julie's full name and official role (family? friend? board member?)?
- [ ] Does the memorial venue (Rose Room, Venice) have WiFi + projector?

### Should Answer Before V2

- [ ] Should the project live under an official Symbiquity Foundation GitHub org?
- [ ] Is `rome.crypto` available on Unstoppable Domains? Is `rome.eth` available on ENS?
- [ ] Would the foundation want to be a co-maintainer of the open-source repo?
- [ ] Are there any legal/IP concerns with using Rome's name and concepts?
- [ ] Has anyone else already started building tools based on Rome's work?

### Nice to Know

- [ ] Did Rome leave design mockups, wireframes, or UI sketches for Palace OS?
- [ ] Is the ChatGPT custom GPT "The Palace of Symbiquity" still live?
- [ ] Are there recordings of Rome explaining Palace OS in his own words?
- [ ] Would the foundation consider a formal partnership or advisory role?

---

## 10. Budget Estimate

### MVP (Memorial Demo) — Target: $0-50

| Item | Cost | Notes |
|------|------|-------|
| Next.js + Vercel hosting | $0 | Free tier |
| Supabase | $0 | Free tier (200 connections) |
| Unstoppable Domain (`rome.crypto`) | $20-40 | One-time, no renewal |
| QR code printing (47 codes) | $5-10 | Local print shop |
| **Total MVP** | **$25-50** | |

### V2 (Blockchain Integration) — Target: $50-500

| Item | Cost | Notes |
|------|------|-------|
| Polygon contract deployment | $0.10-1 | Mainnet gas |
| Biconomy relayer deposit | $50-100 | For gasless mints |
| IPFS metadata (Pinata) | $0 | Free tier (1GB) |
| ENS or Unstoppable parent domain | $20-100 | Depends on name availability |
| **Total V2** | **$75-200** | |

### Venue Requirements (March 15)

| Item | Notes |
|------|-------|
| Laptop | Any modern laptop with Chrome |
| Projector | Standard HDMI projector |
| Screen/wall | White wall or projection screen |
| WiFi | Must support 50+ simultaneous devices |
| Extension cord | For laptop + projector power |
| Printed QR codes | 47+ cards with app URL |

---

> [!TIP]
> **The single most important action right now**: Reach out to the Symbiquity Foundation (Email 1 to Ashton Sperry) and to Julie (Email 2). Everything else is technical and buildable. The human connections come first — exactly as Rome would have wanted.

---

*For Rome, who found the pattern.*
*For Julie, who saw the connection.*
*For everyone who tunes in.*

🌀 TURN → TUNE → **NOW**
