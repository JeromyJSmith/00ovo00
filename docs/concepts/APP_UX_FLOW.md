# Global Ohm — App UX Flow & Technical Spec

> The complete user journey from walking into the memorial to collective resonance.

---

## The Experience in 60 Seconds

1. You walk into the Rose Room. A **projection** on the wall shows an empty dark canvas.
2. A table by the door has printed **QR codes** on little cards.
3. You scan the QR code on your phone. A web app opens — no app store, no download.
4. A **glowing triangle** appears on your phone screen with a **knob** underneath it.
5. You turn the knob. Your triangle changes color. You hear a tone from your phone.
6. On the projection wall, **your triangle appears** — one of many, slowly populating the screen.
7. Everyone in the room is turning their knobs. Triangles are spinning at different speeds, different colors.
8. As people start aligning their frequencies, the triangles start moving **closer together**.
9. The room fills with overlapping tones. It starts to harmonize.
10. 80% of the room hits the same zone — **RESONANCE LOCK**. Every triangle snaps into alignment. A deep chord rings out. Rome's photo fades in. One word: **NOW**.

---

## Part 1: User Flow (Phone)

### Step 1: Arrive & Scan QR Code

```
[Physical QR card on table]
     ↓ phone camera
[Browser opens: globalohm.app (or your Web3 domain)]
     ↓
[Landing page: "Welcome to The Global Ohm" + Enter button]
     ↓ tap
[Audio permission prompt: "Allow audio?" → Yes]
     ↓
[User gets assigned a unique ID (UUID) + random triangle variant]
     ↓
[Main app screen loads]
```

**Tech**: No login. No wallet. No account. Just scan and go. The UUID is generated client-side and stored in `localStorage` so if they refresh, they keep their triangle.

### Step 2: The App Screen

```
┌─────────────────────────────────┐
│                                 │
│         ◁  YOUR TRIANGLE  ▷    │
│         (glowing, spinning)     │
│                                 │
│     Color shifts with your      │
│     frequency. Spin speed       │
│     reflects how far from       │
│     the group center you are.   │
│                                 │
│─────────────────────────────────│
│                                 │
│      ╔═══════════════════╗      │
│      ║   ◄── KNOB ──►   ║      │
│      ║    (drag left/    ║      │
│      ║     right to      ║      │
│      ║     tune)         ║      │
│      ╚═══════════════════╝      │
│                                 │
│     ♫ 432 Hz                    │
│     4 / 47 aligned              │
│                                 │
└─────────────────────────────────┘
```

**What the user sees:**
- A **glowing triangle** unique to them (random gradient/pattern, assigned on first load)
- A **rotary knob** they can drag left/right with their thumb
- Current frequency number (200-800 Hz range)
- A small counter: "X / Y aligned" showing how many people are near their frequency

**What happens when they turn the knob:**
- Their triangle changes color (frequency → HSL hue mapping)
- Their phone plays a sine tone at that frequency (Tone.js)
- Their triangle spins faster/slower based on deviation from the group's median
- The projection wall updates to show their triangle at its new color/position

### Step 3: The Skin (Triangle Variants)

Each user gets a **randomly assigned triangle variant** — same basic equilateral triangle shape, but with a unique visual flavor:

| Variant | Visual | How Chosen |
|---------|--------|------------|
| Gradient | Soft gradient fill (2 colors) | Random at session start |
| Wireframe | Glowing outline only, no fill | Random at session start |
| Pulsing | Opacity breathes in/out (ADSR rhythm) | Random at session start |
| Crystalline | Faceted, gem-like appearance | Random at session start |
| Nebula | Swirling particle cloud in triangle shape | Random at session start |

All variants share the same behavior:
- **Color** shifts based on frequency (consistent HSL mapping)
- **Spin direction**: < 430 Hz = counter-clockwise, > 430 Hz = clockwise, ~430 Hz = pause
- **Glow intensity** increases as you approach resonance with the group

### Step 4: Resonance Detection

The app continuously checks:

```javascript
const detectResonance = (frequencies) => {
  if (frequencies.length < 2) return { locked: false, percent: 0 };
  
  const sorted = [...frequencies].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  
  const aligned = frequencies.filter(f => Math.abs(f - median) <= 5);
  const percent = aligned.length / frequencies.length;
  
  return {
    locked: percent >= 0.8,
    percent: Math.round(percent * 100),
    centerFrequency: median,
    alignedCount: aligned.length,
    totalCount: frequencies.length
  };
};
```

**When resonance hits 80%:**
- Phone: Triangle pulses gold, haptic buzz (Android), triumphant chord
- Projection: All triangles snap together, Rome's photo fades in, text "NOW" appears

---

## Part 2: Projection View (Ceremony Mode)

The **projection** runs on a laptop connected to a projector via HDMI. It's the same web app, but in a special "ceremony" URL: `globalohm.app/ceremony`

### What the Projection Shows

```
Phase 1: GATHERING (people arriving, scanning QR codes)
┌──────────────────────────────────────────────────────┐
│                                                      │
│        △         ▲                                   │
│                          △                           │
│    ▲                              △                  │
│              △        ▲                              │
│                                       ▲              │
│        (triangles scattered, each a different color)  │
│                                                      │
│   "7 / 47 connected"                                 │
└──────────────────────────────────────────────────────┘

Phase 2: CONVERGING (people are starting to align)
┌──────────────────────────────────────────────────────┐
│                                                      │
│              △   ▲                                   │
│                △   △                                 │
│             ▲    ▲    △                              │
│              △   ▲                                   │
│                                                      │
│        (triangles drifting toward center)             │
│                                                      │
│   "34 / 47 connected  •  62% aligned"                │
└──────────────────────────────────────────────────────┘

Phase 3: RESONANCE LOCK (80%+ aligned)
┌──────────────────────────────────────────────────────┐
│                                                      │
│                    ╔══════╗                           │
│                    ║ ▲▲▲▲ ║                           │
│                    ║▲▲▲▲▲▲║                           │
│                    ║ ▲▲▲▲ ║                           │
│                    ╚══════╝                           │
│                                                      │
│              [Rome's photo fades in]                  │
│                                                      │
│                     N O W                             │
│                                                      │
│   "47 / 47 connected  •  RESONANCE ACHIEVED"        │
└──────────────────────────────────────────────────────┘
```

### Audio on Projection

The ceremony laptop plays a **collective tone** — a mix of ALL connected users' frequencies:

```javascript
// Play a soft average of all connected frequencies
// NOT all tones simultaneously (that'd be noise)
// Instead: the median frequency of all users, with harmonics

const ceremonyTone = new Tone.PolySynth().toDestination();
const median = getMedianFrequency(allUsers);

// Soft drone at the collective center
ceremonyTone.triggerAttack(median, Tone.now(), 0.3); // quiet

// On resonance lock: FULL volume chord
if (resonanceLocked) {
  ceremonyTone.triggerAttack([median, median * 2, median * 3], Tone.now(), 0.8);
}
```

---

## Part 3: System Architecture

### Data Flow

```
[Phone A] ─── frequency: 432 ──→ ┌──────────────────┐
[Phone B] ─── frequency: 438 ──→ │ Supabase Realtime │ ──→ [Ceremony Laptop]
[Phone C] ─── frequency: 420 ──→ │  (Presence API)   │ ──→ [All other phones]
[Phone D] ─── frequency: 435 ──→ └──────────────────┘
```

Each phone:
1. Generates audio **locally** (Tone.js — no streaming)
2. Publishes its frequency **number** to Supabase Presence channel
3. Receives ALL other users' frequencies from Supabase
4. Calculates resonance **locally** (no server-side computation)

The Ceremony Laptop:
1. Subscribes to the same Supabase channel
2. Renders all triangles (Three.js, `@react-three/fiber`)
3. Runs resonance detection
4. Displays ceremony visuals on projector

### Supabase Presence Implementation

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Each phone joins with its unique ID
const channel = supabase.channel('global-ohm', {
  config: { presence: { key: userId } }
});

// Subscribe to presence events
channel
  .on('presence', { event: 'sync' }, () => {
    // Get ALL users' current state
    const state = channel.presenceState();
    const allFrequencies = Object.values(state)
      .map(p => p[0]?.frequency)
      .filter(Boolean);
    
    // Update local state + check resonance
    setConnectedUsers(state);
    const resonance = detectResonance(allFrequencies);
    setResonanceState(resonance);
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log(`${key} joined with frequency: ${newPresences[0]?.frequency}`);
  })
  .on('presence', { event: 'leave' }, ({ key }) => {
    console.log(`${key} left`);
  })
  .subscribe();

// Publish YOUR frequency (called when knob changes)
async function publishFrequency(freq, triangleVariant, color) {
  await channel.track({
    frequency: freq,
    variant: triangleVariant,  // 'gradient', 'wireframe', etc.
    color: frequencyToColor(freq),
    joinedAt: Date.now()
  });
}
```

### No Blockchain for MVP

**The blockchain layer is NOT needed for the memorial demo.** Here's why:

| Feature | Memorial MVP | V2 (Post-Memorial) |
|---------|-------------|---------------------|
| User identity | UUID in `localStorage` | NFT-based (ERC-1155 on Polygon) |
| Triangle ownership | Session-only, temporary | Permanent, on-chain |
| State recording | Supabase DB (free) | On-chain event log |
| Authentication | None (scan QR, you're in) | Wallet connection (optional) |
| Cost | $0 | ~$50 for contract + gas |

**For March 15: Skip blockchain entirely. Ship the experience first.**

Blockchain comes in V2 when people can:
- Permanently own their triangle as an NFT
- Get a Web3 subdomain (`username.yourdomain`)
- Have their resonance moments permanently recorded on Polygon

---

## Part 4: Projector Setup

### What to Rent

**Best option**: Elite Buyer (serves Venice, LA)
- **Model**: 1080p DLP, 3000-4000 lumens
- **Cost**: $40-80/day rental
- **Phone**: (562) 366-4177
- **Includes**: HDMI cable, power cable

**Screen option**: 
- 8ft tripod screen rental (~$40 extra) OR
- Use a plain white wall if the venue has one

**Alternative**: Life of the Party (LA)
- Bundle deal: projector + 8ft screen + speakers + delivery/setup/pickup
- Under $500 total

### Setup Checklist

```
Venue Requirements:
├── [ ] Power outlet near projection area (2 plugs: laptop + projector)
├── [ ] White wall or screen (at least 6ft wide)
├── [ ] Dim lighting in projection area (can the lights be dimmed?)
├── [ ] WiFi network that supports 50+ devices simultaneously
│       └── [ ] Ask Rose Room about their WiFi capacity
│       └── [ ] Backup: bring a mobile hotspot (T-Mobile 5G, etc.)
├── [ ] Table for laptop near projection area
└── [ ] Extension cord (just in case)

Hardware to Bring:
├── [ ] Laptop (any modern laptop with Chrome/Edge/Safari)
├── [ ] HDMI cable (backup: USB-C to HDMI adapter)
├── [ ] Power brick / charger for laptop
├── [ ] Printed QR code cards (47-60 cards)
│       └── [ ] QR links to: globalohm.app (or your domain)
└── [ ] Bluetooth speaker (backup audio if laptop speakers are weak)

Software Prep (Day Before):
├── [ ] Deploy app to Vercel (or your domain)
├── [ ] Test ceremony mode full-screen on laptop
├── [ ] Test QR code → phone → app flow on 2+ phones
├── [ ] Verify WiFi at venue (go there day before)
├── [ ] Load test: open app on 5+ devices simultaneously
├── [ ] Prepare Rome's photo for tribute screen (high-res, centered)
└── [ ] Set up Supabase project (free tier)
```

---

## Part 5: Your Web3 Domain

You mentioned you have a Web3 domain you could dedicate to this. **That's perfect.** Here's how it could work:

### Option A: Use Your Web3 Domain as the Brand (V2)
- Your Web3 domain becomes the identity namespace
- Users in V2 get subdomains: `username.yourdomain`
- The memorial MVP still uses a regular domain (Vercel free: `globalohm.vercel.app`)

### Option B: Point Your Web3 Domain to the App
- Some Web3 domains (Unstoppable Domains) can resolve to IPFS or redirect to a URL
- You could make `yourdomain` point to the deployed Vercel app
- This gives it the Web3 aesthetic from day one

### What Domain Do You Have?
Tell me the domain and I can figure out:
1. Can it resolve to a regular website?
2. Can it issue subdomains for users?
3. What registrar is it on? (Unstoppable? ENS? Handshake?)

---

## Part 6: Implementation Priority

### What to Build (In Order)

```
WEEK 1: MVP (March 12-15)
─────────────────────────
1. [2h] Next.js scaffold + deploy to Vercel
2. [4h] Rotary knob component (touch-drag, @use-gesture/react)
3. [2h] Tone.js sine wave (knob → frequency → sound)  
4. [2h] Supabase Realtime presence (broadcast frequency)
5. [3h] Triangle component (Three.js, color from frequency)
6. [3h] Ceremony mode (/ceremony route, all triangles, full-screen)
7. [2h] Resonance detection (80%+ within 5Hz → visual/audio trigger)
8. [1h] Tribute screen (Rome's photo + "NOW" on resonance lock)
9. [1h] QR code generator (link to app)

Total: ~20 hours of dev time

MONTH 1: V2 (April 2026)
─────────────────────────
10. Smart contract (ERC-1155 on Polygon)
11. Wallet connection (wagmi + viem)
12. NFT minting flow
13. Web3 subdomain assignment
14. Persistent user profiles

MONTH 2: V3 (May 2026)
─────────────────────────
15. Proximity detection (geohash)
16. Synesthetic engine (freq → color → formant)
17. "When in Rome" notifications
18. Multiple ceremony rooms
```

---

## Frequency → Color Mapping

```javascript
// HSL color wheel mapped to 200-800 Hz range
function frequencyToColor(freq) {
  // Normalize to 0-1
  const t = (freq - 200) / (800 - 200);
  
  // Map to hue (0° red → 120° green → 240° blue → 360° red)
  const hue = t * 300; // 0° to 300° (red to violet)
  
  return `hsl(${hue}, 85%, 60%)`;
}

// Special frequencies:
// 220 Hz (N) → ~10° → Deep Violet
// 430 Hz (mid) → ~115° → Green (pause point)
// 540 Hz → ~170° → Cyan  
// 730 Hz (O, Rome's freq) → ~265° → Gold/Warm
```

---

> **Bottom Line**: The whole thing is a web app. No app store. No blockchain (for MVP). No complex backend. Just a Next.js page, a WebSocket channel, and a projector. If we start building tomorrow, we can have it working by March 14.

---

*What frequency will they find when they tune together? That's the whole point. They have to discover it themselves.* 🔺
