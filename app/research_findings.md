# Global Ohm -- Research Findings

**Date**: 2026-03-11
**Scope**: Technology research for the Global Rome memorial app
**Researcher**: Research Scout Agent (Claude Opus 4.6)

---

## Table of Contents

1. [MathBox for Frequency Visualization](#1-mathbox-for-frequency-visualization)
2. [GSAP + Three.js Integration](#2-gsap--threejs-integration)
3. [WebAudio Formant Synthesis](#3-webaudio-formant-synthesis)
4. [React Rotary Knob Components](#4-react-rotary-knob-components)
5. [Rome Viharo Open Source](#5-rome-viharo-open-source)
6. [Supabase Realtime Best Practices](#6-supabase-realtime-best-practices)
7. [Three.js Triangle/Pyramid Effects](#7-threejs-trianglepyramid-effects)

---

## 1. MathBox for Frequency Visualization

### What Was Found

**MathBox** is a library for rendering presentation-quality math diagrams in the browser using WebGL, built on top of Three.js and ShaderGraph. It provides a declarative API to visualize mathematical relationships and animate them.

- **Repository**: https://github.com/unconed/mathbox
- **npm**: `mathbox` -- latest version **2.3.2-rc1** (published ~3 years ago)
- **React wrapper**: `mathbox-react` (v0.0.10, published ~7 months ago) -- https://www.npmjs.com/package/mathbox-react
- **Author**: Steven Wittens (unconed) -- https://acko.net/blog/mathbox2/
- **Examples**: https://stemkoski.github.io/MathBox/index.html

**Key capabilities:**
- 3D function graphs with adjustable parameters, color schemes, wireframe, shading
- Curves and surfaces in 3D space
- Polar coordinate interpolation (spiraling motions)
- Feed a voxel to a vector for 3D vector fields
- Declarative animation system

**Maintenance status**: The original `MathBox.js` repository is discontinued. The successor `mathbox` (v2) has 2 maintainers but release cadence has slowed significantly. The `mathbox-react` wrapper by Chris Chudzicki exists but is at v0.0.10, suggesting early-stage maturity.

### Can It Integrate with React Three Fiber?

**Not directly.** MathBox manages its own Three.js scene internally, which conflicts with R3F's scene ownership model. The `mathbox-react` wrapper provides React bindings but operates as a standalone canvas, not as R3F children. Running MathBox inside an R3F `<Canvas>` would require substantial hacking of internals.

### Relevance to Global Ohm

MathBox excels at mathematical visualization but is **overweight** for the frequency-to-geometry needs of Global Ohm. The library was designed for math presentations, not real-time interactive audio-visual experiences.

### Recommended Approach

**Skip MathBox. Build directly with React Three Fiber + custom shaders.**

For frequency visualization, the stack should be:

1. **`@react-three/fiber`** -- scene management
2. **Custom shader materials** (`ShaderMaterial` / `RawShaderMaterial`) -- map frequency data to geometry deformations, colors, particle positions
3. **`@react-three/drei`** utilities -- `useTexture`, `shaderMaterial`, `Float`, `MeshDistortMaterial`
4. **GLSL uniforms** -- pass frequency values as uniforms, animate in GPU

This gives full control over the frequency-to-visual pipeline without MathBox's abstraction overhead, and integrates natively with the existing R3F stack.

**Pattern worth adopting** -- frequency-driven vertex displacement:

```glsl
// vertex shader
uniform float uFrequency;
uniform float uTime;

void main() {
  vec3 pos = position;
  float displacement = sin(pos.x * uFrequency * 0.01 + uTime) * 0.3;
  pos += normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

---

## 2. GSAP + Three.js Integration

### What Was Found

GSAP integrates well with Three.js for timeline-based, scroll-driven, and procedural animations. Key resources:

- **Three.js forum thread**: https://discourse.threejs.org/t/how-to-animate-a-threejs-object-using-gsap/36225
- **GSAP community**: https://gsap.com/community/forums/topic/29721-threejs-and-gsap/
- **Codrops tutorial** (3D cardboard box): https://tympanus.net/codrops/2022/12/13/how-to-code-an-on-scroll-folding-3d-cardboard-box-animation-with-three-js-and-gsap/
- **Scroll animations guide** (Wawa Sensei): https://wawasensei.hashnode.dev/scroll-animations-with-react-three-fiber-and-gsap
- **CodeSandbox**: https://codesandbox.io/s/react-three-fiber-w-gsap-scrolltrigger-c7lpp
- **Atomic Object guide**: https://spin.atomicobject.com/animations-threejs-gsap/

### Best Patterns

**1. Proxy Object Pattern (critical for ScrollTrigger)**

Never animate Three.js properties directly with ScrollTrigger. Use a proxy object and sync in `useFrame`:

```typescript
const params = useRef({ angle: 0, scale: 1, colorMix: 0 });

useEffect(() => {
  gsap.to(params.current, {
    angle: Math.PI * 2,
    scale: 1.5,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
  });
}, []);

useFrame(() => {
  meshRef.current.rotation.y = params.current.angle;
  meshRef.current.scale.setScalar(params.current.scale);
});
```

**2. Render-on-demand (performance)**

If the scene is static except during GSAP animation, skip `requestAnimationFrame` loops. Render only on GSAP `onUpdate`:

```typescript
gsap.to(object.rotation, {
  x: Math.PI * 2,
  duration: 2,
  onUpdate: () => renderer.render(scene, camera),
});
```

**3. Easing for natural motion**

Use GSAP's physics-based easing: `power2.inOut`, `elastic.out(1, 0.3)`, `back.out(1.7)`.

### Performance Considerations

- **Known issue**: GSAP + R3F + ScrollTrigger can lag on mobile. The GSAP forum has documented performance complaints -- https://gsap.com/community/forums/topic/43299-performance-issues-on-desktop-and-mobile-devices-using-gsap-with-react-three-fiber/
- **Mitigation**: Use `useFrame` for render-loop animations, reserve GSAP for timeline/scroll-driven transitions only.
- **R3F alternative**: `@react-three/drei`'s `ScrollControls` + `useScroll` may outperform GSAP ScrollTrigger for pure 3D scroll animations, as it avoids DOM scroll event overhead.

### Relevance to Global Ohm

GSAP is useful for:
- Ceremony page entrance animations (fade in, scale up)
- Scroll-driven storytelling sections
- Timeline-based resonance achievement sequences

It is **not** the right tool for:
- Continuous frequency-driven animation (use `useFrame` + uniforms)
- Real-time audio-reactive visuals (use Web Audio API analyzer + shaders)

### Recommended Approach

Use GSAP for **discrete transitions** (entrance animations, scroll interactions, resonance lock celebration sequence). Use `useFrame` for **continuous real-time** frequency-driven visuals. Do not mix both on the same objects.

---

## 3. WebAudio Formant Synthesis

### What Was Found

**Formant synthesis** models the human vocal tract by routing a harmonically rich oscillator signal through parallel bandpass filters tuned to formant frequencies. Three formants (F1, F2, F3) are sufficient for recognizable vowels.

Key resources:
- **ZPeech** (formant analysis with Web Audio): https://github.com/gre/zpeech
- **vowel-sound-generator** (Tone.js + RiTa.js phonemes): https://github.com/benfordslaw/vowel-sound-generator
- **Tone.js formant filters CodePen**: https://codepen.io/brokyo/pen/XQmvvN
- **"Creating digital choirs in Tone.js"**: https://medium.com/@brokyo/in-excelsis-i-o-creating-digital-choirs-in-tone-js-f14d84982409
- **MDN Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Synthesizer with Web Audio** (filters): https://dobrian.github.io/cmp/topics/building-a-synthesizer-with-web-audio-api/3.filters.html
- **AudioWorklet for low-latency**: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet

### Formant Frequency Table (Male Voice, Approximate)

| Vowel | F1 (Hz) | F2 (Hz) | F3 (Hz) |
|-------|---------|---------|---------|
| /a/ (father) | 730 | 1090 | 2440 |
| /e/ (bed) | 530 | 1840 | 2480 |
| /i/ (see) | 270 | 2290 | 3010 |
| /o/ (go) | 570 | 840 | 2410 |
| /u/ (boot) | 300 | 870 | 2240 |

Source: Peterson & Barney (1952), referenced at https://sail.usc.edu/~lgoldste/General_Phonetics/Source_Filter/SFc.html and https://en.wikipedia.org/wiki/Formant

**Critical observation**: The F1 of /a/ is 730 Hz -- this is the target resonance frequency in Global Ohm. The vowel "ah" (the open vowel) has F1 = 730 Hz. This is not coincidence.

### Tone.js Approach

Tone.js provides `Tone.Filter` (BiquadFilterNode wrapper) with type `'bandpass'`. The pattern from the "digital choirs" article:

```typescript
import * as Tone from 'tone';

// Formant data: [frequency, bandwidth, amplitude_dB]
const formants = {
  a: [[730, 110, 0], [1090, 100, -6], [2440, 120, -12]],
  e: [[530, 60, 0], [1840, 100, -4], [2480, 120, -14]],
  i: [[270, 60, 0], [2290, 100, -6], [3010, 100, -16]],
  o: [[570, 80, 0], [840, 70, -6], [2410, 120, -22]],
  u: [[300, 50, 0], [870, 80, -10], [2240, 120, -26]],
};

function createFormantVoice(vowel: keyof typeof formants) {
  const source = new Tone.Noise('pink');
  const filters = formants[vowel].map(([freq, bw, amp]) => {
    const filter = new Tone.Filter({
      type: 'bandpass',
      frequency: freq,
      Q: freq / bw,
    });
    const gain = new Tone.Gain(Tone.dbToGain(amp));
    return { filter, gain };
  });

  // Parallel filter bank
  filters.forEach(({ filter, gain }) => {
    source.connect(filter);
    filter.connect(gain);
    gain.toDestination();
  });

  return source;
}
```

### Raw Web Audio API Approach

For maximum control over the N-O-W sweep interpolation, raw Web Audio API avoids Tone.js scheduling overhead:

```typescript
function createFormantSynth(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';  // Rich harmonics

  const filters = [0, 1, 2].map(() => {
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const gain = ctx.createGain();
    filter.connect(gain);
    gain.connect(ctx.destination);
    return { filter, gain };
  });

  osc.connect(filters[0].filter);
  osc.connect(filters[1].filter);
  osc.connect(filters[2].filter);

  function setVowel(f1: number, f2: number, f3: number) {
    const now = ctx.currentTime;
    filters[0].filter.frequency.linearRampToValueAtTime(f1, now + 0.05);
    filters[1].filter.frequency.linearRampToValueAtTime(f2, now + 0.05);
    filters[2].filter.frequency.linearRampToValueAtTime(f3, now + 0.05);
  }

  return { osc, setVowel };
}
```

### N-O-W Sweep Implementation

For the phonetic chain N (220 Hz) -> O (730 Hz) -> W (300 Hz):

```typescript
// Interpolate between vowel formants over time
function sweepNOW(synth: ReturnType<typeof createFormantSynth>, duration: number) {
  const steps = 60;
  const interval = duration / steps;
  let step = 0;

  const nFormants = [270, 2290, 3010];  // /i/-like (nasal, closed)
  const oFormants = [730, 1090, 2440];  // /a/ (open)
  const wFormants = [300, 870, 2240];   // /u/-like (rounded)

  const timer = setInterval(() => {
    const t = step / steps;
    let f1, f2, f3;

    if (t < 0.5) {
      // N -> O phase
      const p = t * 2;
      f1 = lerp(nFormants[0], oFormants[0], p);
      f2 = lerp(nFormants[1], oFormants[1], p);
      f3 = lerp(nFormants[2], oFormants[2], p);
    } else {
      // O -> W phase
      const p = (t - 0.5) * 2;
      f1 = lerp(oFormants[0], wFormants[0], p);
      f2 = lerp(oFormants[1], wFormants[1], p);
      f3 = lerp(oFormants[2], wFormants[2], p);
    }

    synth.setVowel(f1, f2, f3);
    step++;
    if (step > steps) clearInterval(timer);
  }, interval);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
```

### Tone.js vs Raw Web Audio

| Factor | Tone.js | Raw Web Audio API |
|--------|---------|-------------------|
| **Ease of use** | Higher -- built-in scheduling, Transport | Lower -- manual AudioContext management |
| **Formant quality** | Good -- `Tone.Filter` wraps BiquadFilter | Same underlying engine |
| **Real-time interpolation** | Possible but scheduling adds overhead | Direct `linearRampToValueAtTime` -- lowest latency |
| **Bundle size** | ~170 KB minified | 0 KB (browser native) |
| **ADSR envelopes** | Built-in `Tone.AmplitudeEnvelope` | Manual implementation |
| **AudioWorklet** | Partial support | Full control |

### Recommended Approach

**Use Tone.js for the primary audio engine** (oscillators, ADSR, transport scheduling) but drop to **raw Web Audio `BiquadFilterNode`** for the formant filter bank. This gives Tone.js convenience for synthesis + scheduling while maintaining low-latency formant interpolation.

For the N-O-W sweep specifically, use `AudioParam.linearRampToValueAtTime()` on the raw `BiquadFilterNode.frequency` param for the smoothest interpolation without stepping artifacts.

---

## 4. React Rotary Knob Components

### What Was Found

| Library | npm | Stars | Last Update | Touch | Accessible | Headless |
|---------|-----|-------|-------------|-------|------------|----------|
| **react-knob-headless** | [npm](https://www.npmjs.com/package/react-knob-headless) | ~200 | Jun 2025 (v0.4.0) | Yes (@use-gesture) | Yes (ARIA Slider) | Yes |
| **react-rotary-knob** | [npm](https://www.npmjs.com/package/react-rotary-knob) | ~160 | 3 years ago (v3.0.3) | Partial | No | No (skinnable) |
| **react-dial-knob** | [npm](https://www.npmjs.com/package/react-dial-knob) | ~50 | 3+ years ago | Partial | No | No |
| **PrimeReact Knob** | Part of primereact | High | Active | Yes | Yes | No |
| **rc-knob** | [site](https://eskimoblood.github.io/rc-knob/) | ~30 | Stale | No | No | No |

### Deep Dive: react-knob-headless

- **Repository**: https://github.com/satelllte/react-knob-headless
- **Docs**: https://react-knob-headless.pages.dev/
- **Version**: v0.4.0 (June 2025)
- **Size**: Tiny -- unstyled primitive
- **Gesture library**: `@use-gesture` (same as R3F/drei uses)

Key strengths:
- Unstyled = no CSS conflicts with our Tailwind setup
- ARIA Slider pattern = keyboard accessible
- @use-gesture = same gesture library R3F ecosystem uses (consistent behavior)
- TypeScript native
- Works with any styling: CSS, Tailwind, Emotion

### Touch-Friendly UX Patterns

Best practices for mobile frequency selection:
1. **Large touch target** -- minimum 80px diameter knob on mobile
2. **Vertical drag = value change** -- more intuitive than circular gestures on small screens
3. **Haptic feedback** -- `navigator.vibrate(10)` on value thresholds
4. **Visual feedback** -- frequency value displayed numerically near knob
5. **Snap points** -- optional detents at key frequencies (220, 432, 500, 730 Hz)
6. **Debounced broadcast** -- throttle Supabase updates to 10/sec max

### Recommended Approach

**Use `react-knob-headless`** as the base primitive. It is the most actively maintained, properly accessible, touch-friendly, and unstyled (works with Tailwind). Build the visual skin using SVG or CSS on top.

**Implementation pattern:**

```tsx
import { KnobHeadless } from 'react-knob-headless';

function FrequencyKnob({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <KnobHeadless
      valueMin={200}
      valueMax={800}
      valueRaw={value}
      dragSensitivity={0.006}
      onValueRawChange={onChange}
      aria-label="Frequency"
    >
      {({ valueAngle }) => (
        <svg viewBox="0 0 100 100" className="w-32 h-32 touch-none">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="2" />
          <line
            x1="50" y1="50"
            x2={50 + 35 * Math.cos(valueAngle)} y2={50 + 35 * Math.sin(valueAngle)}
            stroke="#00F5FF" strokeWidth="3" strokeLinecap="round"
          />
          <text x="50" y="55" textAnchor="middle" fill="white" fontSize="12">
            {Math.round(value)} Hz
          </text>
        </svg>
      )}
    </KnobHeadless>
  );
}
```

---

## 5. Rome Viharo Open Source

### What Was Found

**No open-source repositories for Palace OS, PAXIS, or GRAIL were found on GitHub.**

Searches performed:
- "Rome Viharo" on GitHub -- no personal profile found
- "Palace OS" on GitHub -- returns unrelated projects (The Palace Project by Lyrasis, Microsoft Project Rome)
- "Symbiquity" on GitHub -- no repositories found
- "PAXIS" on GitHub -- unrelated results
- "GRAIL" on GitHub -- unrelated results (Google GRAIL, etc.)

### What Exists Publicly

| Resource | URL | Content |
|----------|-----|---------|
| **Symbiquity Foundation** | https://foundation.symbiquity.ai/ | Research lab description, CGT theory, project overviews |
| **Symbiquity AI** | https://symbiquity.ai/ | Collective Intelligence Engine product page, web9 concept |
| **Foundation Projects** | https://foundation.symbiquity.ai/in-development | Palace OS, PAXIS, GRAIL descriptions (no code) |
| **Rome Viharo Medium** | https://rome-viharo.medium.com/ | Articles on CGT, wiki wars, game theory |
| **Rome Viharo Substack** | https://romeviharo.substack.com/ | General intro to CGT |
| **Rome Viharo LinkedIn** | https://www.linkedin.com/in/romeviharo/ | Professional profile, Symbiquity founder |
| **Rome Viharo X/Twitter** | https://x.com/rome_viharo | Social media presence |
| **Academia.edu** | https://independent.academia.edu/RomeViharo | Academic papers |

### Key Concept Summaries

**Conversational Game Theory (CGT)**: A method for building continually resolving consensus between ideological divides. CGT defines equilibrium as a state where no participant can unilaterally improve their conversational utility -- balancing contradiction resolution, logical coherence, and emotional satisfaction. Discovered "accidentally" in 2002, refined 2008-2020 with Professor Jim Fallon at UC Irvine.

**Palace OS**: A multi-agent AI framework designed to simulate how conflict and consensus forms and resolves through game-theoretic collective intelligence. Described as the "first simulation of General Intelligence for AI you can try for free" but no public source code has been located.

**PAXIS**: A trusted broadcast resource for journalists, filtering misinformation/disinformation while clarifying context. Provides pathways for nonviolent community-based engagement.

**GRAIL** (Global Resolution, Alignment and Inquiry Library): A living semantics engine built and shaped by interactions of everyone using it, with no central governance. Permissions to make changes are awarded based on collaboration between conflicting perspectives.

### Recommended Approach

1. **Contact Symbiquity Foundation directly** (via foundation.symbiquity.ai) to ask about source code availability and API access
2. **Study the public articles** on CGT to inform the resonance detection algorithm (the game-theoretic equilibrium concept maps directly to harmonic lock detection)
3. **Reference CGT principles** in the app's "about" section and ceremony narrative
4. **Build the resonance model independently** based on published CGT theory, since no implementation code is available

---

## 6. Supabase Realtime Best Practices

### What Was Found

**Documentation sources:**
- **Broadcast docs**: https://supabase.com/docs/guides/realtime/broadcast
- **Presence docs**: https://supabase.com/docs/guides/realtime/presence
- **Benchmarks**: https://supabase.com/docs/guides/realtime/benchmarks
- **Limits**: https://supabase.com/docs/guides/realtime/limits
- **Client-side throttling**: https://supabase.com/docs/guides/realtime/guides/client-side-throttling
- **Architecture**: https://supabase.com/docs/guides/realtime/architecture
- **GitHub**: https://github.com/supabase/realtime

### Broadcast vs Presence for Frequency Sync

| Feature | Broadcast | Presence |
|---------|-----------|----------|
| **Purpose** | Send low-latency messages between clients | Track and sync shared state |
| **State persistence** | No (fire-and-forget) | Yes (new joiners get current state) |
| **Latency** | Lowest (WebSocket direct) | Slightly higher (state merge overhead) |
| **Message format** | Arbitrary payload | Key-value state objects |
| **Events** | Custom event names | `sync`, `join`, `leave` |
| **Best for** | Rapid frequency updates | User roster, current state snapshot |
| **Rate** | Default 10 msg/sec client throttle | Configurable `eventsPerSecond` |

### Recommended Architecture for Global Ohm

**Use BOTH Broadcast AND Presence together on the same channel.**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

// One channel, two features
const channel = supabase.channel('ceremony:main', {
  config: {
    broadcast: { self: true },   // hear own frequency changes
    presence: { key: uniqueUserId },
  },
});

// PRESENCE: Track user state (join/leave, current frequency snapshot)
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState();
  // state = { [key]: [{ frequency, color, spin, ... }] }
  updateParticipantList(state);
});

// BROADCAST: High-frequency updates (frequency changes as user drags knob)
channel.on('broadcast', { event: 'freq_update' }, ({ payload }) => {
  // payload = { userId, frequency, timestamp }
  updateFrequencyViz(payload);
  checkResonance(payload);
});

channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    // Track presence (stable state)
    await channel.track({
      frequency: 432,
      color: '#00F5FF',
      spin: 'ccw',
      joinedAt: Date.now(),
    });
  }
});

// On knob change (throttled to 10/sec)
function onFrequencyChange(newFreq: number) {
  channel.send({
    type: 'broadcast',
    event: 'freq_update',
    payload: { userId, frequency: newFreq, timestamp: Date.now() },
  });

  // Also update presence (less frequently, debounced to 1/sec)
  debouncedPresenceUpdate({ frequency: newFreq });
}
```

### Handling 100+ Concurrent Users

**Default throttle**: Supabase clients throttle to 10 messages/sec (1 per 100ms). This means 100 users each sending 10 updates/sec = **1,000 messages/sec total throughput**.

**Optimization strategies:**

1. **Client-side throttle tuning**: Keep the default 10/sec for broadcast. Users dragging a knob generate far more events -- throttle at the source.

```typescript
import throttle from 'lodash.throttle';

const throttledBroadcast = throttle((freq: number) => {
  channel.send({
    type: 'broadcast',
    event: 'freq_update',
    payload: { userId, frequency: freq },
  });
}, 100); // 10 per second max
```

2. **Presence debounce**: Update presence state at most once per second. Presence is for "current state snapshot," not real-time streaming.

3. **Payload minimization**: Send only `{ id: string, f: number }` (user ID + frequency). Every byte counts at scale. Avoid sending color, spin, position -- compute those client-side from frequency.

4. **Client-side resonance detection**: Do NOT send resonance checks to the server. Each client receives all frequency broadcasts and computes resonance locally. This keeps server load at O(n) messages, not O(n^2) comparisons.

5. **Channel sharding**: For 500+ users, split into geo-based or ceremony-based channels to reduce per-channel message volume.

### Latency Expectations

- **Broadcast (WebSocket)**: ~50-150ms typical, depending on region
- **Presence sync**: ~200-500ms for state merge
- **Acceptable for Global Ohm**: Users drag knobs slowly (human motor speed ~3-5 Hz). 100ms latency is imperceptible for this interaction pattern.

### Plan Limits to Watch

- Free tier: 200 concurrent connections, 2M realtime messages/month
- Pro tier: 500 concurrent connections, 5M messages/month
- For the March 15 ceremony: estimate 100 users x 10 msg/sec x 3600 sec = 3.6M messages in 1 hour. **Pro tier required.**

---

## 7. Three.js Triangle/Pyramid Effects

### What Was Found

**Key resources:**
- **R3F Bloom examples**: https://onion2k.github.io/r3f-by-example/examples/effects/emissive-bloom/
- **React Postprocessing (Bloom)**: https://react-postprocessing.docs.pmnd.rs/effects/bloom
- **SelectiveBloom docs**: https://docs.pmnd.rs/react-postprocessing/effects/selective-bloom
- **@react-three/postprocessing GitHub**: https://github.com/pmndrs/react-postprocessing
- **Particle systems article** (Maxime Heckel): https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/
- **Three particle approaches** (Varun Vachhar): https://varun.ca/three-js-particles/
- **wawa-vfx**: https://github.com/wass08/wawa-vfx (npm: `wawa-vfx`)
- **GPGPU particles workshop**: https://threejs-workshops.com/workshop/dynamic-gpgpu

### Spinning Triangle with Emissive Glow

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

function GlowingTriangle({ frequency, spin }: { frequency: number; spin: 'cw' | 'ccw' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const spinDir = spin === 'cw' ? 1 : -1;
  // Map frequency to color: low = blue, mid = green, high = red/gold
  const hue = ((frequency - 200) / 600) * 0.33; // 0 (red) to 0.33 (green)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * spinDir * 0.5;
      // Pulse emissive intensity with frequency
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(Date.now() * 0.003 * (frequency / 432)) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[1, 1.73, 3]} /> {/* 3 sides = triangle/pyramid */}
      <meshStandardMaterial
        color={new THREE.Color().setHSL(hue, 0.8, 0.5)}
        emissive={new THREE.Color().setHSL(hue, 1.0, 0.4)}
        emissiveIntensity={2}
        toneMapped={false}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}
```

### Bloom Post-Processing in R3F

```tsx
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} />
      <GlowingTriangle frequency={432} spin="ccw" />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
```

**Key rule for bloom control**: Set `toneMapped={false}` on materials and push `emissiveIntensity` above 1.0. Set `luminanceThreshold` to 1.0 by default, then only materials with color values exceeding 1.0 will glow. This gives selective bloom without the `SelectiveBloom` component.

### GPU Particle Effects for Resonance Events

**Option A: wawa-vfx (easiest, R3F-native)**

```bash
npm i wawa-vfx
```

```tsx
import { VFXParticles, VFXEmitter } from 'wawa-vfx';

function ResonanceExplosion({ trigger }: { trigger: boolean }) {
  return (
    <>
      <VFXParticles
        name="resonance"
        settings={{
          nbParticles: 500,
          renderMode: 'billboard',
          intensity: 2,
          fadeIn: 0.1,
          fadeOut: 0.5,
        }}
      />
      {trigger && (
        <VFXEmitter
          particles="resonance"
          settings={{
            duration: 0.5,
            nbParticles: 500,
            startPositionMin: [-0.1, -0.1, -0.1],
            startPositionMax: [0.1, 0.1, 0.1],
            startVelocityMin: [-3, -3, -3],
            startVelocityMax: [3, 3, 3],
            startColor: [1, 0.9, 0.3],  // Gold
            endColor: [0, 0.96, 1],     // Cyan
            startSize: [0.05, 0.15],
            endSize: [0, 0.02],
            lifetime: [0.5, 1.5],
          }}
        />
      )}
    </>
  );
}
```

**Option B: Custom instanced particles (maximum control)**

For frequency-reactive particle fields, use `InstancedMesh` with per-instance attributes driven by a vertex shader:

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FrequencyParticles({ count = 1000, frequency = 432 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
      ),
      speed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const freqNorm = frequency / 730; // normalize to target

    particles.forEach((p, i) => {
      const radius = 2 + Math.sin(t * p.speed + p.offset) * freqNorm;
      dummy.position.set(
        Math.cos(t * p.speed + p.offset) * radius,
        Math.sin(t * p.speed * 0.7 + p.offset) * radius * 0.5,
        Math.sin(t * p.speed + p.offset) * radius,
      );
      dummy.scale.setScalar(0.02 + freqNorm * 0.03);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00F5FF" toneMapped={false} />
    </instancedMesh>
  );
}
```

**Option C: GPGPU (highest performance, 10k+ particles)**

For massive particle counts during resonance events, use Frame Buffer Objects (FBO) to compute particle positions on the GPU. Reference: https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/

This approach stores particle state (position, velocity) in textures, computes updates in a fragment shader, and reads results back for rendering. Performance scales to 100k+ particles at 60fps.

### Recommended Approach

1. **Triangle**: `coneGeometry` with 3 segments + `meshStandardMaterial` with emissive properties
2. **Glow**: `@react-three/postprocessing` Bloom with `toneMapped={false}` material trick
3. **Particles (ambient)**: `InstancedMesh` for frequency-reactive particle fields (1-2k particles)
4. **Particles (resonance burst)**: `wawa-vfx` for one-shot celebration effects -- easiest to configure and R3F-native
5. **Particles (massive)**: GPGPU/FBO approach only if 10k+ particles needed for ceremony projection

---

## Summary: Recommended Stack Additions

| Need | Solution | npm Package | Priority |
|------|----------|-------------|----------|
| Rotary knob | react-knob-headless | `react-knob-headless` | P0 -- core interaction |
| Bloom/glow | React Postprocessing | `@react-three/postprocessing` | P0 -- core visual |
| Particle effects | wawa-vfx | `wawa-vfx` | P1 -- resonance events |
| Formant synthesis | Tone.js + raw BiquadFilter | `tone` (already planned) | P1 -- audio |
| Scroll animations | GSAP (discrete only) | `gsap` | P2 -- ceremony page |
| Math viz | Skip MathBox, use custom shaders | N/A | -- |

### Install Command

```bash
npm install react-knob-headless @react-three/postprocessing wawa-vfx
```

GSAP is already part of the planned stack. Tone.js is already in the project plan.

---

*Research complete. All findings current as of March 2026.*
*No open-source Rome Viharo code was found -- recommend direct outreach to Symbiquity Foundation.*
