# Global Rome: Design System & Visual Language

## Design Philosophy

### Minimalist Brutalism + Soft Glassmorphism

Global Rome's visual identity combines two seemingly opposite aesthetics:

**Minimalist Brutalism**
- Raw, unadorned functionality
- Geometric precision
- Honest materials and structure
- No decoration for decoration's sake
- Clear information hierarchy
- Stark contrast and negative space

**Soft Glassmorphism**
- Frosted glass surfaces (not solid)
- Translucency and depth layering
- Soft shadows and blur
- Frosted white (#FFFFFF @ 85% opacity) as primary overlay
- Gentle, approachable warmth beneath austere geometry
- Accessibility through softness, not cuteness

**Synthesis**: The interface feels *honest* (brutalism) but *welcoming* (glassmorphism). You're looking through frost at the system beneath. The knob is mechanical (honest), but the resonance effect is immersive (soft).

## Color System: Synesthetic Frequency-to-Color Mapping

### Core Principle

Every frequency has a color. As the user tunes the knob (200-800 Hz), the interface responds with a synesthetic color shift. This is not metaphor; it's perceptual mapping based on human auditory-visual cross-stimulation.

### Frequency Ranges & Color Mappings

| Frequency Range | Color Range | Perceptual Profile | Ternary State | Emotion |
|-----------------|-------------|------------------|---------------|---------|
| **200-350 Hz** | Deep Red → Warm Orange | Low, grounded, embodied | State-0 (No) | Presence, earth |
| **350-500 Hz** | Warm Orange → Yellow | Mid-range, balanced, seeking | State-2 (Maybe) | Curiosity, warmth |
| **500-650 Hz** | Yellow → Cyan | Ascending, opening, activating | State-1 (Yes) | Hope, clarity |
| **650-800 Hz** | Cyan → Violet | High, dispersed, ethereal | State-1+ (Deep Yes) | Transcendence, edge |
| **730 Hz (Harmonic Lock)** | Brilliant White with Violet Aura | Harmonic resonance, all states unified | State-2* (Productive Unity) | Revelation, achievement |

### Color Implementation in Code

**HSL Mapping Formula** (approximate):

```
H (Hue) = linear_interpolation(freq_hz, 200, 800, 0, 300)  // Red to Violet
S (Saturation) = 70 + 20 * sin(freq_hz / 100)               // Oscillates 50-90%
L (Lightness) = 40 + 15 * (freq_hz - 200) / 600             // Darkens at low freq, lightens at high
A (Alpha) = 0.9 + 0.1 * harmonic_lock                       // Slightly more opaque at resonance
```

**Example Hex Values**:
- 200 Hz: #8B3A0A (deep red-brown)
- 400 Hz: #D4A637 (warm orange-yellow)
- 600 Hz: #3DD9E8 (cyan)
- 730 Hz (lock): #F5ECFA with glowing violet shadow
- 800 Hz: #8B00FF (deep violet)

### Synesthetic Reasoning

Color is not arbitrary:

- **Low frequencies (200-350 Hz)** → Warm colors (red, orange) → Dense, close, embodied energy
- **Mid frequencies (400-600 Hz)** → Neutral colors (yellow, green) → Balanced, seeking state
- **High frequencies (650-800 Hz)** → Cool colors (cyan, violet) → Dispersed, ethereal, edge of perception

This mirrors:
- Audio perception: low freq = felt in body, high freq = felt in head
- Psychological warmth: warm colors = intimacy, cool colors = transcendence
- Ternary states: warm (State-0: grounded), neutral (State-2: exploring), cool (State-1: executing)

## Typography System

### Font Family: Inter

**Why Inter?**
- Designed for screens; excellent readability at all sizes
- Geometric yet warm; bridges brutalism and softness
- Variable weight support (100-900); responsive scaling
- Multilingual support; DIN-compliant metrics
- Open-source; aligns with DTRN philosophy

### Font Weights & Sizes

| Element | Weight | Size (Mobile) | Size (Desktop) | Usage |
|---------|--------|---------------|----------------|-------|
| **H1 (Screen title)** | 700 (Bold) | 24px | 32px | Page header; ceremony name |
| **H2 (Section)** | 700 (Bold) | 20px | 28px | Major sections |
| **H3 (Subsection)** | 600 (Semibold) | 16px | 20px | Minor sections |
| **Body (Normal)** | 400 (Regular) | 14px | 16px | Paragraphs, descriptions |
| **Small (UI text)** | 400 (Regular) | 12px | 14px | Labels, hints, micro-interactions |
| **Rome Score (Large)** | 700 (Bold) | 18px | 24px | Numerical display |
| **Frequency Display** | 600 (Semibold) | 16px | 20px | Live frequency readout |

### Line Height & Spacing

- **Body text**: 1.6 line-height (breathing room)
- **Headings**: 1.2 line-height (compact, impactful)
- **UI labels**: 1.4 line-height (clarity)
- **Paragraph gap**: 16px (mobile), 24px (desktop)

## Component Library

### 1. Knob (Rotary Dial)

**Function**: Primary interface for frequency selection (200-800 Hz)

**Visual Design**:
- Circular dial, 200px diameter (mobile), 300px (desktop)
- Outer ring: frosted glass (#FFFFFF @ 85%), subtle depth shadow
- Inner mechanism: visible mechanical grid, dark gray (#1a1a1a)
- Pointer: thin radial line, color-mapped to current frequency (per synesthetic mapping)
- Center icon: frequency-specific emoji (🔴 low, 🌕 mid, 💫 high, ✨ lock)

**Interaction**:
- Touch drag (mobile): swipe up/down to change frequency
- Mouse drag (desktop): click-drag around dial
- Keyboard input: arrow keys ±5 Hz; Page Up/Down ±25 Hz
- Haptic feedback (mobile): subtle vibration at frequency changes, strong at lock

**Animation**:
- Smooth easing (ease-in-out-cubic) between frequency values
- Pointer rotates continuously; color updates in real-time
- Ring glow intensifies at harmonic lock (730 Hz)

**States**:
- **Inactive**: Gray knob, low opacity
- **Seeking**: Color-mapped knob, medium opacity
- **Resonant**: Glowing ring, high opacity, aurora effect

### 2. Triangle3D (3D Visualization)

**Function**: Shows harmonic state; spins to indicate frequency vs. 430 Hz baseline

**Visual Design**:
- Equilateral triangle, Three.js rendered
- Rotation axis: perpendicular to screen (counter-clockwise vs. clockwise)
- Spin direction rule:
  - freq < 430 Hz → counter-clockwise (CCW)
  - freq > 430 Hz → clockwise (CW)
  - freq = 430 Hz → stationary
- Color fill: synesthetic mapping (same as knob)
- Vertex labels: "Node 1", "Node 2", "Node 3" (or user names at 100+ participants)

**Interaction**:
- Rotates continuously based on frequency
- Tappable to expand or minimize
- Multi-triangle view: all triangles visible when 3+ participants
- Hierarchy: self triangle center, others arranged radially

**Animation**:
- Spin velocity proportional to |freq - 430|
- At harmonic lock (730 Hz), all triangles reverse spin simultaneously (visual sync moment)
- Transition time: 500ms ease-in-out-quad

**States**:
- **Lone**: Single centered triangle, slow rotation
- **Seeking**: Multiple triangles orbiting, varied colors
- **Resonant**: Triangles converge to center, synchronized spin reversal, aura glow

### 3. FrequencyViz (Spectrum Analyzer)

**Function**: Real-time visualization of all participants' frequencies

**Visual Design**:
- Horizontal spectrum bar, 200-800 Hz axis
- Each participant = small circle at their frequency
- Circle color = their synesthetic color
- Circle size = their Rome Score (larger = more reputation)
- Density map: heat map of frequency clustering

**Interaction**:
- Swipe/scroll left-right to pan frequency range
- Pinch to zoom into frequency range
- Tap a circle to see participant info (name, frequency, score)

**Animation**:
- Circles smoothly drift to new frequencies (150ms interpolation)
- Harmonic lock: all circles converge to 730 Hz line with glowing aura
- Pulse effect: circle intensity pulses with harmonic oscillation

**States**:
- **Scattered**: Circles spread across spectrum (seeking state)
- **Clustering**: Circles group near harmonic frequencies (resonance emerging)
- **Locked**: All circles tight around 730 Hz line (harmonic lock achieved)

### 4. ResonanceOverlay (Achievement State)

**Function**: Full-screen visual/audio reward when harmonic lock achieved

**Visual Design**:
- Full-screen modal (semi-transparent dark background, 80% opacity)
- Center: Brilliant white circle (730 Hz color) with violet aura
- Text overlay:
  - "HARMONIC RESONANCE ACHIEVED" (H1, centered)
  - "730 Hz • N participants in lock" (body text)
  - "Rome Score: +{score_earned}" (H2, animated counter)
- Particle effects: frosted white particles drift upward
- Confetti (subtle, not aggressive): frequency-colored confetti

**Interaction**:
- Tap anywhere to dismiss (mobile)
- Close button (X) visible in corner
- Auto-dismiss after 3 seconds

**Animation**:
- Fade in: 300ms ease-out
- Aura pulse: 1.2s infinite sine wave oscillation
- Particles: drift upward over 2s, fade out
- Confetti: arc trajectory, rotate slowly, 2-3s duration
- Text animation: counter ticks from 0 to final Rome Score over 2s

**Audio**:
- Harmonic tone (E4 + G#4 + B4, 3-note major chord) plays for 2s at 730 Hz resonance
- Tone.js synthesis with ADSR envelope (Attack 100ms, Decay 300ms, Sustain, Release 500ms)

### 5. StatusBar (Header)

**Function**: Displays session metadata and real-time network stats

**Visual Design**:
- Top-fixed header bar, 56px height (mobile), 64px (desktop)
- Background: frosted white (#FFFFFF @ 85%)
- Left side: Ceremony name, event title
- Center: Participant count, frequency readout
- Right side: Rome Score (yours), connection status (✓ or ⚠)
- Subtle drop shadow below

**Content Layout**:
```
[Rome Logo] Ceremony Name | 47/100 Participants | Freq: 347 Hz | Rome Score: 450 | ✓ Connected
```

**Animation**:
- Participant count updates real-time with fade-in for new participants
- Frequency readout updates smoothly (no jumping)
- Connection status: green dot pulses when connected, red when offline
- Rome Score: increments with +points animation on achievement

**States**:
- **Normal**: White background, normal opacity
- **Locked**: Background glow (violet aura), slightly increased opacity
- **Disconnected**: Warning color (red tint), connection icon shows caution

### 6. RomeScore (Reputation Component)

**Function**: Tracks and displays reputation points

**Visual Design**:
- Score number: large, bold (H2 weight, synesthetic color)
- Score bar: horizontal fill bar, 0-1000 points
- Bar color: synesthetic gradient (red at 0, violet at 1000)
- Milestones marked at 250, 500, 750, 1000
- Breakdown (tap to expand):
  - "Harmonic Locks: +X"
  - "Contribution to Graph: +Y"
  - "Mirror Recognition: +Z"

**Interaction**:
- Tap to expand/collapse breakdown
- Long-press to see achievement history

**Animation**:
- Score increments with counter animation when earned
- Bar fill animates smoothly from old value to new value (500ms ease-out-quad)
- Milestone achievements: subtle glow/pulse at threshold

## Responsive Design: Mobile-First

### Breakpoints

| Device | Width | Design Focus |
|--------|-------|--------------|
| **Mobile (primary)** | < 768px | Single-column, large touch targets, full-screen components |
| **Tablet** | 768–1024px | Two-column layouts, knob centered, frequency viz below |
| **Desktop** | > 1024px | Three-column (knob, triangles, spectrum), side panels |

### Mobile-Specific Optimizations

- **Touch targets**: Minimum 44px × 44px
- **Knob diameter**: 200px (thumb easily reachable)
- **StatusBar**: Compact, bottom-aligned (easier thumb reach than traditional header)
- **Spectrum**: Full-width, scrollable horizontally
- **Overlays**: Full-screen, large tap areas

### Desktop-Specific Features

- **Knob size**: 300px (more precise mouse control)
- **Multi-window**: Ceremony display on projection (ceremony/page.tsx)
- **Keyboard shortcuts**: Arrow keys, number pad for frequency input
- **Multi-touch**: Supports simultaneous participants on single screen (testing)

## Accessibility Considerations

### Audio-Visual Experiences

Global Rome is fundamentally audio-visual. Accessibility must address:

**For Deaf/Hard of Hearing Users**:
- Visual frequency indicators (color, knob position) sufficient for interaction
- Haptic feedback (vibration) as haptic-only alternative to audio cue
- Captions for all audio announcements
- Optional text-to-speech for frequency and score updates

**For Blind/Low-Vision Users**:
- Screen reader support: all components have clear labels
- Knob input: keyboard arrow keys + numerical input as alternative to touch drag
- Audio cues: frequency tone changes are the primary feedback (already auditory)
- High contrast mode: frosted white → solid white; dark gray → black

**For Motor Impairments**:
- Touch drag not required: keyboard input (arrows, numbers) fully supported
- Large touch targets (44px minimum)
- Haptic feedback can be disabled
- One-handed operation possible

**For Cognitive Accessibility**:
- Clear information architecture: knob → resonance → score
- Consistent interaction patterns
- Glossary for technical terms (frequency, resonance, ternary, Rome Score)
- Simple language in UI labels

### WCAG 2.1 Compliance Target

- **Level AA**: Minimum standard for all components
- **Color contrast**: 4.5:1 for text on backgrounds (including synesthetic color overlays)
- **Keyboard navigation**: All interactive elements reachable via Tab key
- **Focus indicators**: Visible focus rings on knob, buttons, interactive elements
- **Animations**: Respect `prefers-reduced-motion` system setting; disable effects for users who opt out

## Dark Mode

### Default: Dark Mode (#0a0a0a)

Global Rome defaults to dark mode:

- **Background**: Nearly black (#0a0a0a)
- **Overlays**: Frosted white (#FFFFFF @ 85%) on dark background creates contrast
- **Text**: Off-white (#e8e8e8) for readability
- **Accents**: Synesthetic colors are more vibrant against dark background

### Light Mode (Optional)

Light mode available for accessibility/preference:

- **Background**: Off-white (#f5f5f5)
- **Overlays**: Frosted gray (#f5f5f5 @ 90%) on light background
- **Text**: Dark gray (#1a1a1a)
- **Accents**: Synesthetic colors more muted to avoid oversaturation

**Toggle**: System preference (matchMedia prefers-color-scheme) or manual toggle in settings

## Animation Principles

### Easing Functions Used

- **UI transitions (knob, spectrum)**: ease-in-out-cubic (responsive feel)
- **Overlay entrance**: ease-out-quad (smooth, not bouncy)
- **Particle effects**: ease-in-quad (gravity-like falloff)
- **Score increments**: ease-out-elastic (satisfying reward)
- **Harmonic lock**: ease-out-sine (graceful sync moment)

### Performance Constraints

- All animations use GPU-accelerated properties (transform, opacity)
- Avoid animating width/height (triggers layout thrashing)
- Max 60fps on mobile; degrade gracefully on low-end devices
- Animations disabled on low-power mode (battery saver)

## Ceremony Mode: Projection Mapping Display

For the memorial on March 15, 2026, the app supports a **Ceremony View** (`/ceremony/page.tsx`):

### Full-Screen Projection Display

- **Screen**: Projection-mapped onto venue wall (Rose Room, Venice, LA)
- **Resolution**: 4K (3840×2160) recommended
- **Refresh**: 60Hz minimum
- **Color accuracy**: Wide gamut for synesthetic colors

### Ceremony Components

1. **Giant Triangle Array**: Multiple participant triangles scaled 10×, spinning in sync
2. **Frequency Spectrum**: Wall-spanning frequency visualization
3. **Rome Score Leaderboard**: Top 10 scores, live-updating
4. **Harmonic Lock Timer**: Countdown/elapsed time to lock
5. **Memorial Text Overlay**: "In Memory of Rome Viharo (1967–2025)" — appears at lock

### Ceremony Interaction

- **VR/AR Sensors** (optional): Track room-wide frequency distributions
- **Audio System**: Harmonic tones projected to full room
- **Lighting Rig** (optional): Venue lights synced to harmonic lock colors
- **Live Stream** (optional): Broadcasting resonance event to remote participants

## Design File Structure

```
15_ui_ux_design/
  design_system.md                    — This file (design guidelines & specs)
  components/
    Knob.design.md                   — Knob component specs & animation keyframes
    Triangle3D.design.md             — Triangle rotation, color mapping details
    FrequencyViz.design.md           — Spectrum visualization algorithm
    ResonanceOverlay.design.md       — Overlay animation choreography
    StatusBar.design.md              — Header layout & responsive behavior
    RomeScore.design.md              — Scoring UI & progression mechanics
  color_palette/
    synesthetic_mapping.json         — Frequency → HSL conversion table
    palette_swatches.svg             — Color swatches for design tools
  typography/
    Inter_font_subset.woff2          — Inter variable font (optimized)
    font_metrics.md                  — Line heights, letter spacing, sizing
  mockups/
    mobile_home_screen.png           — Knob + spectrum (mobile layout)
    desktop_layout.png               — Three-column layout (desktop)
    ceremony_projection.png          — Full-screen projection mockup
  figma_link/
    GLOBAL_ROME_UI_KIT.url           — Link to Figma collaborative design file
```

## Implementation Notes

### CSS-in-JS / Tailwind Classes

- **Primary approach**: Tailwind CSS for responsive design
- **Custom variables**: CSS custom properties for synesthetic colors (`--freq-hue`, `--freq-saturation`)
- **Animation**: Framer Motion for complex choreography (overlay, particles)
- **Three.js**: Custom shaders for triangle mesh, particle system

### Color Application in Code

Example: Real-time knob color update

```javascript
// Frequency to HSL mapping
function frequencyToColor(freqHz) {
  const hue = linear_interpolate(freqHz, 200, 800, 0, 300);
  const saturation = 70 + 20 * Math.sin(freqHz / 100);
  const lightness = 40 + 15 * (freqHz - 200) / 600;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Apply to knob element
const knobElement = document.querySelector('.knob');
knobElement.style.setProperty('--freq-color', frequencyToColor(currentFreq));
```

## Accessibility Checklist

- [ ] All interactive elements keyboard-accessible
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Focus indicators visible on all focusable elements
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Animations respect prefers-reduced-motion
- [ ] Audio cues have visual equivalents
- [ ] Touch targets minimum 44×44px
- [ ] Text resizable to 200% without loss of functionality
- [ ] No keyboard traps; Tab order logical

---

**Last updated**: 2026-03-12  
**Design philosophy**: Honest (brutalism) + Welcoming (glassmorphism)  
**Primary device**: Mobile phones (every knob is an edge node)  
**Memorial deployment**: March 15, 2026, Rose Room, Venice, LA
