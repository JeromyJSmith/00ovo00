# Files

## File: app/api/graph/route.ts
```typescript
// Neo4j Knowledge Graph API
// GET /api/graph?pattern=NOW — Query pattern graph
// POST /api/graph — Record resonance event or user action

import { NextRequest, NextResponse } from "next/server";
import {
  initGraph,
  getPatternGraph,
  getResonanceHistory,
  createUser,
  recordFrequency,
  recordResonance,
} from "@/lib/neo4j";

let graphInitialized = false;

async function ensureInit() {
  if (!graphInitialized) {
    await initGraph();
    graphInitialized = true;
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureInit();

    const { searchParams } = new URL(request.url);
    const pattern = searchParams.get("pattern");

    if (pattern) {
      const graph = await getPatternGraph(pattern);
      return NextResponse.json({ pattern, graph });
    }

    // Default: return resonance history
    const history = await getResonanceHistory();
    return NextResponse.json({ history });
  } catch (error) {
    console.error("Neo4j query error:", error);
    return NextResponse.json(
      { error: "Knowledge graph unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureInit();

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "createUser": {
        const { userId, displayName } = body;
        await createUser(userId, displayName);
        return NextResponse.json({ ok: true });
      }

      case "recordFrequency": {
        const { userId, frequency } = body;
        await recordFrequency(userId, frequency);
        return NextResponse.json({ ok: true });
      }

      case "recordResonance": {
        const { eventId, frequency, userIds } = body;
        await recordResonance(eventId, frequency, userIds);
        return NextResponse.json({ ok: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Neo4j write error:", error);
    return NextResponse.json(
      { error: "Knowledge graph write failed" },
      { status: 503 }
    );
  }
}
```

## File: app/ceremony/page.tsx
```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  createResonanceEngine,
  type ResonanceEngine,
  type ResonanceState,
} from "@/lib/resonance";
import { subscribeToFrequencies, unsubscribe } from "@/lib/supabase";
import { FREQ_TARGET } from "@/lib/constants";
import { playResonanceTone, initAudio } from "@/lib/audio";

// Lazy-load ceremony triangles (no SSR)
const CeremonyTriangles = dynamic(
  () => import("../components/Triangle3D").then((m) => m.CeremonyTriangles),
  { ssr: false }
);

// Projection mapping display for the memorial venue
// Shows all participants' triangles and resonance state
// Open on the venue's projector machine

export default function CeremonyPage() {
  const [resonanceState, setResonanceState] = useState<ResonanceState>({
    participants: new Map(),
    isResonance: false,
    resonancePercentage: 0,
    modalFrequency: 730,
    alignedCount: 0,
    totalCount: 0,
  });
  const [hasAchieved, setHasAchieved] = useState(false);
  const engineRef = useRef<ResonanceEngine | null>(null);

  useEffect(() => {
    const engine = createResonanceEngine();
    engineRef.current = engine;

    const ceremonyId = "memorial-2026-03-15";
    subscribeToFrequencies(ceremonyId, (data) => {
      engine.handleFrequencyUpdate(data);
    });

    initAudio();

    const tick = setInterval(() => {
      const state = engine.getState();
      setResonanceState(state);

      if (state.isResonance && !hasAchieved) {
        setHasAchieved(true);
        playResonanceTone();
      }
    }, 100);

    return () => {
      clearInterval(tick);
      unsubscribe();
    };
  }, [hasAchieved]);

  const participants = Array.from(resonanceState.participants.values());

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* All triangles */}
      <CeremonyTriangles
        participants={participants}
        isResonance={resonanceState.isResonance}
        className="h-full w-full"
      />

      {/* Stats overlay */}
      <div className="absolute bottom-8 left-8 text-white/60">
        <p className="text-sm">
          Participants:{" "}
          <strong className="text-white">{resonanceState.totalCount}</strong>
        </p>
        <p className="text-sm">
          Aligned:{" "}
          <strong className="text-white">{resonanceState.alignedCount}</strong>{" "}
          ({Math.round(resonanceState.resonancePercentage * 100)}%)
        </p>
        <p className="text-sm">
          Target: <strong className="text-amber-400">{FREQ_TARGET} Hz</strong>
        </p>
      </div>

      {/* Resonance achievement */}
      {resonanceState.isResonance && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-2xl tracking-widest text-amber-400/80 uppercase animate-pulse">
              Resonance Achieved
            </p>
            <p className="mt-4 text-8xl font-bold text-white">
              {Math.round(resonanceState.modalFrequency)} Hz
            </p>
            <p className="mt-8 text-xl text-white/50">For Rome.</p>
            <p className="mt-4 text-5xl font-bold tracking-[0.5em] text-amber-400">
              NOW
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: app/components/FrequencyViz.tsx
```typescript
"use client";

import { Participant } from "@/lib/resonance";
import { FREQ_MIN, FREQ_MAX, FREQ_TARGET, FREQ_NEUTRAL } from "@/lib/constants";

interface FrequencyVizProps {
  participants: Map<string, Participant>;
  myFrequency: number;
  resonancePercentage: number;
  isResonance: boolean;
}

export default function FrequencyViz({
  participants,
  myFrequency,
  resonancePercentage,
  isResonance,
}: FrequencyVizProps) {
  const allParticipants = Array.from(participants.values());
  const freqRange = FREQ_MAX - FREQ_MIN;

  // Position on the bar (0-100%)
  const freqToPercent = (hz: number) =>
    ((hz - FREQ_MIN) / freqRange) * 100;

  return (
    <div className="w-full max-w-md">
      {/* Resonance bar */}
      <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
        {/* Resonance fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
          style={{
            width: `${resonancePercentage * 100}%`,
            background: isResonance
              ? "linear-gradient(90deg, #a855f7, #f97316)"
              : "linear-gradient(90deg, rgba(168,85,247,0.5), rgba(249,115,22,0.5))",
          }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-1 flex justify-between text-xs text-white/40">
        <span>{allParticipants.length} tuned in</span>
        <span className={isResonance ? "text-amber-400 font-bold" : ""}>
          {Math.round(resonancePercentage * 100)}% aligned
        </span>
      </div>

      {/* Frequency spectrum */}
      <div className="relative mt-4 h-16 w-full rounded-lg bg-white/5 overflow-hidden">
        {/* Target zone (730 Hz ± 5) */}
        <div
          className="absolute inset-y-0 border border-amber-500/30 bg-amber-500/10"
          style={{
            left: `${freqToPercent(FREQ_TARGET - 5)}%`,
            width: `${((10 / freqRange) * 100)}%`,
          }}
        />

        {/* Neutral line (500 Hz) */}
        <div
          className="absolute inset-y-0 w-px bg-white/20"
          style={{ left: `${freqToPercent(FREQ_NEUTRAL)}%` }}
        />

        {/* Other participants */}
        {allParticipants.map((p) => (
          <div
            key={p.userId}
            className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full opacity-60 transition-all duration-200"
            style={{
              left: `${freqToPercent(p.frequency)}%`,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}

        {/* My frequency (larger, brighter) */}
        <div
          className="absolute top-1/2 h-8 w-2 -translate-y-1/2 rounded-full transition-all duration-100"
          style={{
            left: `${freqToPercent(myFrequency)}%`,
            backgroundColor: "white",
            boxShadow: "0 0 12px rgba(255,255,255,0.8)",
          }}
        />
      </div>

      {/* Spectrum labels */}
      <div className="mt-1 flex justify-between text-[10px] text-white/30">
        <span>N 220</span>
        <span>W 300</span>
        <span>432</span>
        <span>500</span>
        <span>O 730</span>
      </div>
    </div>
  );
}
```

## File: app/components/Knob.tsx
```typescript
"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { FREQ_MIN, FREQ_MAX, FREQ_DEFAULT } from "@/lib/constants";
import { frequencyToHSL } from "@/lib/synesthesia";

interface KnobProps {
  frequency: number;
  onChange: (hz: number) => void;
  disabled?: boolean;
}

export default function Knob({ frequency, onChange, disabled }: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);

  // Map frequency to rotation angle (0-270 degrees)
  const freqToAngle = (hz: number) =>
    ((hz - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)) * 270;
  const angleToFreq = (deg: number) =>
    FREQ_MIN + (deg / 270) * (FREQ_MAX - FREQ_MIN);

  const rotation = freqToAngle(frequency);
  const color = frequencyToHSL(frequency);

  const getAngleFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      if (!knobRef.current) return 0;
      const rect = knobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let angle =
        Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      return Math.max(0, Math.min(270, angle));
    },
    []
  );

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled) return;
      isDragging.current = true;
      const angle = getAngleFromEvent(clientX, clientY);
      lastAngle.current = angle;
      onChange(angleToFreq(angle));
    },
    [disabled, getAngleFromEvent, onChange]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging.current || disabled) return;
      const angle = getAngleFromEvent(clientX, clientY);
      lastAngle.current = angle;
      onChange(angleToFreq(angle));
    },
    [disabled, getAngleFromEvent, onChange]
  );

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const onUp = () => handleEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleMove, handleEnd]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Frequency display */}
      <div className="text-center">
        <span
          className="text-4xl font-bold tabular-nums"
          style={{ color }}
        >
          {Math.round(frequency)}
        </span>
        <span className="ml-1 text-lg text-white/60">Hz</span>
      </div>

      {/* Knob */}
      <div
        ref={knobRef}
        className="relative h-48 w-48 cursor-grab select-none active:cursor-grabbing"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleStart(touch.clientX, touch.clientY);
        }}
        role="slider"
        aria-label="Frequency knob"
        aria-valuemin={FREQ_MIN}
        aria-valuemax={FREQ_MAX}
        aria-valuenow={Math.round(frequency)}
      >
        {/* Track ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-white/10"
          style={{
            background: `conic-gradient(from 135deg, ${color} ${
              (rotation / 270) * 100
            }%, transparent ${(rotation / 270) * 100}%)`,
            opacity: 0.3,
          }}
        />

        {/* Knob body */}
        <div
          className="absolute inset-4 rounded-full border-2 border-white/20 shadow-2xl"
          style={{
            background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.15), rgba(0,0,0,0.5))`,
            transform: `rotate(${rotation - 135}deg)`,
            transition: isDragging.current ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Indicator dot */}
          <div
            className="absolute top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
          />
        </div>

        {/* Center glow */}
        <div
          className="absolute inset-16 rounded-full"
          style={{
            background: color,
            opacity: 0.15,
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex w-48 justify-between text-xs text-white/40">
        <span>{FREQ_MIN}</span>
        <span>432</span>
        <span>{FREQ_MAX}</span>
      </div>

      {/* Label */}
      <p className="text-sm text-white/50">Turn to tune in</p>
    </div>
  );
}
```

## File: app/components/ResonanceOverlay.tsx
```typescript
"use client";

import { useEffect, useState } from "react";

interface ResonanceOverlayProps {
  isResonance: boolean;
  modalFrequency: number;
}

export default function ResonanceOverlay({
  isResonance,
  modalFrequency,
}: ResonanceOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isResonance) {
      setVisible(true);
      const timer = setTimeout(() => setShowText(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setShowText(false);
    }
  }, [isResonance]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-amber-400/30 animate-ping"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Central text */}
      <div
        className={`text-center transition-all duration-1000 ${
          showText ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <p className="text-lg tracking-widest text-amber-400/80 uppercase">
          Resonance Achieved
        </p>
        <p className="mt-2 text-6xl font-bold text-white">
          {Math.round(modalFrequency)} Hz
        </p>
        <p className="mt-6 text-sm text-white/50">For Rome.</p>
        <p className="mt-2 text-3xl font-bold tracking-[0.5em] text-amber-400 animate-pulse">
          NOW
        </p>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
```

## File: app/components/RomeScore.tsx
```typescript
"use client";

import { SCORE_MAX } from "@/lib/constants";

interface RomeScoreProps {
  score: number;
}

export default function RomeScore({ score }: RomeScoreProps) {
  const percentage = score / SCORE_MAX;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${percentage * 100}%`,
            background: `linear-gradient(90deg,
              hsl(270, 80%, 50%) 0%,
              hsl(45, 90%, 60%) 100%)`,
          }}
        />
      </div>
      <span className="text-xs tabular-nums text-white/60">
        {score}
      </span>
    </div>
  );
}
```

## File: app/components/StatusBar.tsx
```typescript
"use client";

import RomeScore from "./RomeScore";

interface StatusBarProps {
  participantCount: number;
  romeScore: number;
  ceremonyName: string;
  isResonance: boolean;
}

export default function StatusBar({
  participantCount,
  romeScore,
  ceremonyName,
  isResonance,
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-md px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            isResonance ? "bg-amber-400 animate-pulse" : "bg-green-400"
          }`}
        />
        <span className="text-xs text-white/60">{ceremonyName}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-white/40">
          {participantCount} tuned in
        </span>
        <RomeScore score={romeScore} />
      </div>
    </div>
  );
}
```

## File: app/components/Triangle3D.tsx
```typescript
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { calcSpinSpeed, calcSpinDirection, rpmToRadPerSec } from "@/lib/triangle";
import { frequencyToRGB, frequencyToLuminosity } from "@/lib/synesthesia";
import { FREQ_NEUTRAL } from "@/lib/constants";

interface TriangleMeshProps {
  frequency: number;
  isResonance: boolean;
  scale?: number;
  position?: [number, number, number];
}

function TriangleMesh({
  frequency,
  isResonance,
  scale = 1,
  position = [0, 0, 0],
}: TriangleMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const spinSpeed = calcSpinSpeed(frequency);
  const spinDir = calcSpinDirection(frequency);
  const radPerSec = rpmToRadPerSec(spinSpeed);
  const [r, g, b] = frequencyToRGB(frequency);
  const luminosity = frequencyToLuminosity(frequency);

  // Triangle geometry (equilateral)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const s = 1.5 * scale;
    // Equilateral triangle centered at origin
    shape.moveTo(0, s);
    shape.lineTo(-s * 0.866, -s * 0.5);
    shape.lineTo(s * 0.866, -s * 0.5);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.15 * scale,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
    geo.center();
    return geo;
  }, [scale]);

  // Animate spin
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dir = spinDir === "cw" ? 1 : -1;
    meshRef.current.rotation.z += dir * radPerSec * delta;

    // Pulse at resonance
    if (isResonance) {
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    } else {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <meshStandardMaterial
        ref={materialRef}
        color={new THREE.Color(r, g, b)}
        emissive={new THREE.Color(r * 0.3, g * 0.3, b * 0.3)}
        emissiveIntensity={luminosity}
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

interface Triangle3DProps {
  frequency: number;
  isResonance: boolean;
  className?: string;
}

export default function Triangle3D({
  frequency,
  isResonance,
  className,
}: Triangle3DProps) {
  return (
    <div className={`${className || ""}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <TriangleMesh frequency={frequency} isResonance={isResonance} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

// Multi-triangle view for ceremony mode
interface CeremonyTrianglesProps {
  participants: { userId: string; frequency: number }[];
  isResonance: boolean;
  className?: string;
}

export function CeremonyTriangles({
  participants,
  isResonance,
  className,
}: CeremonyTrianglesProps) {
  // Arrange triangles in a circular pattern
  const positions = useMemo(() => {
    const count = participants.length;
    if (count === 0) return [];
    if (count === 1) return [[0, 0, 0] as [number, number, number]];

    const radius = Math.min(8, 2 + count * 0.3);
    return participants.map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0,
      ] as [number, number, number];
    });
  }, [participants]);

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 10]} intensity={1.5} />

        {participants.map((p, i) => (
          <TriangleMesh
            key={p.userId}
            frequency={p.frequency}
            isResonance={isResonance}
            scale={0.5}
            position={positions[i]}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isResonance ? 2 : 0.5}
        />
      </Canvas>
    </div>
  );
}
```

## File: lib/audio.ts
```typescript
// Audio Engine — Tone.js formant synthesis
// NOW = N(220Hz) → O(730Hz) → W(300Hz) vocal filter sweep

"use client";

import type * as ToneType from "tone";

let Tone: typeof ToneType | null = null;
let oscillator: ToneType.Oscillator | null = null;
let filter: ToneType.Filter | null = null;
let gain: ToneType.Gain | null = null;
let resonanceSynth: ToneType.Synth | null = null;
let initialized = false;

// Lazy-load Tone.js (browser only)
async function ensureTone(): Promise<typeof ToneType> {
  if (!Tone) {
    Tone = await import("tone");
  }
  return Tone;
}

export async function initAudio(): Promise<void> {
  if (initialized) return;

  const T = await ensureTone();
  await T.start();

  // Main oscillator — user's frequency
  oscillator = new T.Oscillator({
    frequency: 432,
    type: "sine",
    volume: -20,
  });

  // Formant filter — shapes the vowel sound
  filter = new T.Filter({
    frequency: 432,
    type: "bandpass",
    Q: 8,
  });

  // Master gain
  gain = new T.Gain(0.3);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.toDestination();

  // Resonance achievement synth — 730 Hz sine burst
  resonanceSynth = new T.Synth({
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.5,
      decay: 0.3,
      sustain: 0.8,
      release: 2.0,
    },
    volume: -10,
  }).toDestination();

  initialized = true;
}

export function startOscillator(): void {
  oscillator?.start();
}

export function stopOscillator(): void {
  oscillator?.stop();
}

// Update frequency — smoothly ramp
export function setFrequency(hz: number): void {
  if (!oscillator || !filter || !Tone) return;

  const now = Tone.now();
  oscillator.frequency.rampTo(hz, 0.05, now);
  filter.frequency.rampTo(hz, 0.05, now);

  // Q factor spikes at vowel frequencies
  const vowels = [270, 530, 730];
  const minDist = Math.min(...vowels.map((v) => Math.abs(hz - v)));
  const q = 2 + 13 * Math.exp(-minDist / 100);
  filter.Q.rampTo(q, 0.05, now);
}

// Set volume (0-1)
export function setVolume(vol: number): void {
  if (!gain) return;
  gain.gain.value = Math.max(0, Math.min(1, vol));
}

// Trigger resonance achievement tone — 730 Hz
export function playResonanceTone(): void {
  resonanceSynth?.triggerAttackRelease(730, "4n");
}

// NOW filter sweep: N(220) → O(730) → W(300)
// Duration in seconds
export async function playNOWSweep(duration: number = 3): Promise<void> {
  if (!oscillator || !filter || !Tone) return;

  const T1 = duration * 0.33; // N phase
  const T2 = duration * 0.33; // O phase
  const T3 = duration * 0.34; // W phase
  const now = Tone.now();

  // N phase: 220 Hz, nasal, closed
  oscillator.frequency.setValueAtTime(220, now);
  filter.frequency.setValueAtTime(220, now);

  // Rise to O: 730 Hz, open
  oscillator.frequency.rampTo(730, T1, now);
  filter.frequency.rampTo(730, T1, now);

  // Hold O: 730 Hz peak
  oscillator.frequency.setValueAtTime(730, now + T1);
  filter.frequency.setValueAtTime(730, now + T1);

  // Fall to W: 300 Hz, decay
  oscillator.frequency.rampTo(300, T3, now + T1 + T2);
  filter.frequency.rampTo(300, T3, now + T1 + T2);
}

export function dispose(): void {
  oscillator?.dispose();
  filter?.dispose();
  gain?.dispose();
  resonanceSynth?.dispose();
  oscillator = null;
  filter = null;
  gain = null;
  resonanceSynth = null;
  initialized = false;
}
```

## File: lib/constants.ts
```typescript
// Global Ohm — Core Constants
// All mathematical formulas from Rome's pattern analysis

// Frequency bounds
export const FREQ_MIN = 200;
export const FREQ_MAX = 800;
export const FREQ_DEFAULT = 432; // Rome's frequency
export const FREQ_NEUTRAL = 500; // Spin reversal point (no spin)
export const FREQ_TARGET = 730; // Resonance lock target (O vowel peak)

// NOW phoneme frequencies
export const FREQ_N = 220; // Nasal hum, closed
export const FREQ_O = 730; // Open vowel, peak resonance
export const FREQ_W = 300; // Rounded lips, decay

// Resonance
export const RESONANCE_THRESHOLD = 0.8; // 80% of users must align
export const RESONANCE_TOLERANCE = 5; // Within ±5 Hz

// Triangle spin
export const SPIN_MAX_RPM = 120; // 2 rotations/sec max
export const SPIN_NEUTRAL = FREQ_NEUTRAL; // 500 Hz = no spin

// Rome Score
export const SCORE_MAX = 1000;
export const SCORE_ALIGNMENT = 400;
export const SCORE_SUSTAINED = 300;
export const SCORE_CROSSING = 200; // Crossing 500 Hz neutral
export const SCORE_EARLY = 100;

// Bad-faith detection
export const BAD_FAITH_CHANGES_PER_MIN = 10;
export const BAD_FAITH_PENALTY = 0.9; // 90% slash

// Visual
export const LUMINOSITY_MIN = 0.05; // Never fully black
export const LUMINOSITY_GAMMA = 1.8;

// Design
export const GLASS_OPACITY = 0.85; // Frosted white (#FFFFFF @ 85%)
```

## File: lib/neo4j.ts
```typescript
// Neo4j Knowledge Graph — Ternary relationships and pattern connections
// Graph structure: Concepts, Patterns, Users, Resonance Events

import neo4j, { Driver, Session } from "neo4j-driver";

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (!driver) {
    const uri = process.env.NEO4J_URI || "bolt://localhost:7687";
    const user = process.env.NEO4J_USER || "neo4j";
    const password = process.env.NEO4J_PASSWORD || "";
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }
  return driver;
}

export function getSession(): Session {
  return getDriver().session();
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}

// --- Schema Initialization ---

export async function initGraph(): Promise<void> {
  const session = getSession();
  try {
    // Create constraints
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (c:Concept) REQUIRE c.name IS UNIQUE"
    );
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (p:Pattern) REQUIRE p.name IS UNIQUE"
    );
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE"
    );
    await session.run(
      "CREATE CONSTRAINT IF NOT EXISTS FOR (e:ResonanceEvent) REQUIRE e.id IS UNIQUE"
    );

    // Seed core concepts — Rome's ternary logic
    await session.run(`
      MERGE (s0:Concept:State {name: 'State-0', description: 'False / Blocked / Alone / NO'})
      MERGE (s1:Concept:State {name: 'State-1', description: 'True / Executable / Aligned / YES'})
      MERGE (s2:Concept:State {name: 'State-2', description: 'Unknown / Both / Contradictory / NOW'})
      MERGE (s0)-[:TRANSFORMS_TO {via: 'observation'}]->(s2)
      MERGE (s2)-[:RESOLVES_TO {via: 'resonance'}]->(s1)
      MERGE (s1)-[:DECAYS_TO {via: 'entropy'}]->(s0)
    `);

    // Seed phonetic chain
    await session.run(`
      MERGE (turing:Pattern {name: 'TURING', description: 'R and N separated by I (ego)'})
      MERGE (turning:Pattern {name: 'TURNING', description: 'R and N touch, I steps back'})
      MERGE (tuning:Pattern {name: 'TUNING', description: 'R disappears, I facilitates between two Ns'})
      MERGE (turing)-[:EVOLVES_TO {mechanism: 'ego_observes'}]->(turning)
      MERGE (turning)-[:EVOLVES_TO {mechanism: 'ego_facilitates'}]->(tuning)
    `);

    // Seed NOW decomposition
    await session.run(`
      MERGE (n:Concept:Phoneme {name: 'N', frequency: 220, description: 'Vibration, nasal hum, closed'})
      MERGE (o:Concept:Phoneme {name: 'O', frequency: 730, description: 'Open, peak resonance'})
      MERGE (w:Concept:Phoneme {name: 'W', frequency: 300, description: 'Waves, filter sweep decay'})
      MERGE (now:Pattern {name: 'NOW', description: 'Vocal filter sweep N→O→W'})
      MERGE (n)-[:COMPOSES]->(now)
      MERGE (o)-[:COMPOSES]->(now)
      MERGE (w)-[:COMPOSES]->(now)
      MERGE (n)-[:SWEEPS_TO]->(o)
      MERGE (o)-[:SWEEPS_TO]->(w)
    `);

    // ADSR universal pattern
    await session.run(`
      MERGE (adsr:Pattern {name: 'ADSR', description: 'Attack-Decay-Sustain-Release universal envelope'})
      MERGE (attack:Concept {name: 'Attack', description: 'Initial rise, inhale, closed'})
      MERGE (decay:Concept {name: 'Decay', description: 'Transition, hold, bridge state'})
      MERGE (sustain:Concept {name: 'Sustain', description: 'Peak, open, State-2 held'})
      MERGE (release:Concept {name: 'Release', description: 'Decay, exhale, return'})
      MERGE (attack)-[:PHASE_OF]->(adsr)
      MERGE (decay)-[:PHASE_OF]->(adsr)
      MERGE (sustain)-[:PHASE_OF]->(adsr)
      MERGE (release)-[:PHASE_OF]->(adsr)
    `);
  } finally {
    await session.close();
  }
}

// --- User Operations ---

export async function createUser(
  userId: string,
  displayName: string
): Promise<void> {
  const session = getSession();
  try {
    await session.run(
      `MERGE (u:User {id: $userId})
       SET u.displayName = $displayName, u.joinedAt = datetime()`,
      { userId, displayName }
    );
  } finally {
    await session.close();
  }
}

// Record frequency observation (sparse — not every tick)
export async function recordFrequency(
  userId: string,
  frequency: number
): Promise<void> {
  const session = getSession();
  try {
    await session.run(
      `MATCH (u:User {id: $userId})
       CREATE (f:FrequencyPoint {hz: $frequency, at: datetime()})
       CREATE (u)-[:TUNED_TO]->(f)`,
      { userId, frequency }
    );
  } finally {
    await session.close();
  }
}

// Record resonance event
export async function recordResonance(
  eventId: string,
  frequency: number,
  userIds: string[]
): Promise<void> {
  const session = getSession();
  try {
    await session.run(
      `CREATE (e:ResonanceEvent {id: $eventId, frequency: $frequency, at: datetime(), participants: $count})
       WITH e
       UNWIND $userIds AS uid
       MATCH (u:User {id: uid})
       CREATE (u)-[:PARTICIPATED_IN]->(e)`,
      { eventId, frequency, userIds, count: userIds.length }
    );
  } finally {
    await session.close();
  }
}

// Query: Get all concepts connected to a pattern
export async function getPatternGraph(
  patternName: string
): Promise<Record<string, unknown>[]> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (p:Pattern {name: $patternName})-[r]-(connected)
       RETURN p, type(r) AS relationship, connected`,
      { patternName }
    );
    return result.records.map((r) => ({
      pattern: r.get("p").properties,
      relationship: r.get("relationship"),
      connected: r.get("connected").properties,
    }));
  } finally {
    await session.close();
  }
}

// Query: Get resonance history
export async function getResonanceHistory(): Promise<
  Record<string, unknown>[]
> {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (e:ResonanceEvent)
       RETURN e ORDER BY e.at DESC LIMIT 50`
    );
    return result.records.map((r) => r.get("e").properties);
  } finally {
    await session.close();
  }
}
```

## File: lib/resonance.ts
```typescript
// Resonance Engine — Client-side frequency aggregation and detection
"use client";

import { FrequencyBroadcast } from "./supabase";
import { checkResonance, calcSpinSpeed, calcSpinDirection } from "./triangle";
import { frequencyToHSL } from "./synesthesia";
import { FREQ_DEFAULT } from "./constants";

export interface Participant {
  userId: string;
  frequency: number;
  color: string;
  spinSpeed: number;
  spinDirection: "cw" | "ccw";
  lastUpdate: number;
}

export interface ResonanceState {
  participants: Map<string, Participant>;
  isResonance: boolean;
  resonancePercentage: number;
  modalFrequency: number;
  alignedCount: number;
  totalCount: number;
}

const STALE_TIMEOUT = 10_000; // Remove users who haven't updated in 10s

export function createResonanceEngine() {
  const participants = new Map<string, Participant>();

  function handleFrequencyUpdate(data: FrequencyBroadcast): void {
    const { userId, frequency, timestamp } = data;
    participants.set(userId, {
      userId,
      frequency,
      color: frequencyToHSL(frequency),
      spinSpeed: calcSpinSpeed(frequency),
      spinDirection: calcSpinDirection(frequency),
      lastUpdate: timestamp,
    });
  }

  function pruneStale(): void {
    const now = Date.now();
    for (const [id, p] of participants) {
      if (now - p.lastUpdate > STALE_TIMEOUT) {
        participants.delete(id);
      }
    }
  }

  function getState(): ResonanceState {
    pruneStale();

    const frequencies = Array.from(participants.values()).map(
      (p) => p.frequency
    );
    const result = checkResonance(frequencies);

    return {
      participants,
      isResonance: result.achieved,
      resonancePercentage: result.percentage,
      modalFrequency: result.modalFrequency,
      alignedCount: result.alignedCount,
      totalCount: result.totalCount,
    };
  }

  function reset(): void {
    participants.clear();
  }

  return {
    handleFrequencyUpdate,
    getState,
    reset,
    participants,
  };
}

export type ResonanceEngine = ReturnType<typeof createResonanceEngine>;
```

## File: lib/supabase.ts
```typescript
// Supabase client — Global Rome Realtime frequency broadcast
"use client";

import { createClient, SupabaseClient, RealtimeChannel } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (!url) {
      // Return a noop client during build/SSR when env vars aren't available
      console.warn("Supabase URL not configured — running in offline mode");
      return createClient("https://placeholder.supabase.co", "placeholder");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export interface TriangleRow {
  id: string;
  owl_address: string | null;
  frequency: number;
  spin_direction: "cw" | "ccw";
  geohash: string | null;
  color: string | null;
  nft_token_id: string | null;
  created_at: string;
  last_update: string;
}

export interface CeremonyRow {
  id: string;
  name: string;
  target_frequency: number;
  resonance_threshold: number;
  started_at: string | null;
  resonance_achieved_at: string | null;
}

// Broadcast channel for realtime frequency sharing
// Uses Supabase Realtime Broadcast (no database writes for high-frequency updates)
let channel: RealtimeChannel | null = null;

export interface FrequencyBroadcast {
  userId: string;
  frequency: number;
  timestamp: number;
}

export function subscribeToFrequencies(
  ceremonyId: string,
  onUpdate: (data: FrequencyBroadcast) => void
): RealtimeChannel {
  channel = getSupabase().channel(`ceremony:${ceremonyId}`, {
    config: { broadcast: { self: true } },
  });

  channel
    .on("broadcast", { event: "frequency" }, (payload) => {
      onUpdate(payload.payload as FrequencyBroadcast);
    })
    .subscribe();

  return channel;
}

export function broadcastFrequency(
  userId: string,
  frequency: number
): void {
  if (!channel) return;

  channel.send({
    type: "broadcast",
    event: "frequency",
    payload: {
      userId,
      frequency,
      timestamp: Date.now(),
    } satisfies FrequencyBroadcast,
  });
}

export function unsubscribe(): void {
  if (channel) {
    getSupabase().removeChannel(channel);
    channel = null;
  }
}

// Database operations for persistent state
export async function upsertTriangle(
  userId: string,
  frequency: number,
  color: string,
  spinDirection: "cw" | "ccw"
) {
  return getSupabase().from("triangles").upsert(
    {
      owl_address: userId,
      frequency,
      color,
      spin_direction: spinDirection,
      last_update: new Date().toISOString(),
    },
    { onConflict: "owl_address" }
  );
}

export async function getActiveCeremony(): Promise<CeremonyRow | null> {
  const { data } = await getSupabase()
    .from("ceremonies")
    .select("*")
    .is("resonance_achieved_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function markResonanceAchieved(ceremonyId: string) {
  return getSupabase()
    .from("ceremonies")
    .update({ resonance_achieved_at: new Date().toISOString() })
    .eq("id", ceremonyId);
}
```

## File: lib/synesthesia.ts
```typescript
// Synesthetic mapping: Frequency → Color → Luminosity
// From Rome's pattern: 240° counter-clockwise hue shift (purple → orange)

import {
  FREQ_MIN,
  FREQ_MAX,
  LUMINOSITY_MIN,
  LUMINOSITY_GAMMA,
} from "./constants";

// Normalized position in frequency range [0, 1]
function normalize(freq: number): number {
  return Math.max(0, Math.min(1, (freq - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)));
}

// Hue: 240° counter-clockwise shift (purple at low → orange at high)
// 270° (purple) → 90° (orange) as frequency increases
export function frequencyToHue(freq: number): number {
  const t = normalize(freq);
  return 270 - t * 180; // 270° → 90°
}

// Saturation: 80% → 100% as frequency increases
export function frequencyToSaturation(freq: number): number {
  const t = normalize(freq);
  return 80 + t * 20;
}

// Lightness: Bell curve peaking mid-range
// Lightness = 30 + 50 * sin(((f - 200) / 600) * π)
export function frequencyToLightness(freq: number): number {
  const t = normalize(freq);
  return 30 + 50 * Math.sin(t * Math.PI);
}

// Visual luminosity with gamma correction
// L(f) = L_min + (L_max - L_min) * ((f - 200) / 600)^1.8
export function frequencyToLuminosity(freq: number): number {
  const t = normalize(freq);
  return LUMINOSITY_MIN + (1 - LUMINOSITY_MIN) * Math.pow(t, LUMINOSITY_GAMMA);
}

// Complete HSL color from frequency
export function frequencyToHSL(freq: number): string {
  const h = frequencyToHue(freq);
  const s = frequencyToSaturation(freq);
  const l = frequencyToLightness(freq);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Hex conversion for contexts that need it
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function frequencyToHex(freq: number): string {
  const h = frequencyToHue(freq);
  const s = frequencyToSaturation(freq);
  const l = frequencyToLightness(freq);
  return hslToHex(h, s, l);
}

// RGB for Three.js (0-1 range)
export function frequencyToRGB(freq: number): [number, number, number] {
  const hex = frequencyToHex(freq);
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}
```

## File: lib/triangle.ts
```typescript
// Triangle System — Spin mechanics and resonance detection
// Speed = (|f - 500| / 300) * 120 RPM

import {
  SPIN_MAX_RPM,
  SPIN_NEUTRAL,
  RESONANCE_THRESHOLD,
  RESONANCE_TOLERANCE,
  BAD_FAITH_CHANGES_PER_MIN,
  BAD_FAITH_PENALTY,
  SCORE_MAX,
  SCORE_ALIGNMENT,
  SCORE_SUSTAINED,
  SCORE_CROSSING,
  SCORE_EARLY,
  FREQ_TARGET,
} from "./constants";

export type SpinDirection = "cw" | "ccw";

export interface Triangle {
  userId: string;
  frequency: number;
  spinDirection: SpinDirection;
  spinSpeed: number; // RPM
  color: string;
  romeScore: number;
  joinedAt: number;
  hasCrossedNeutral: boolean;
  resonanceTime: number; // ms spent in resonance
  changeTimestamps: number[]; // for bad-faith detection
}

// Spin speed from frequency
// Speed = (|f - 500| / 300) * 120 RPM
export function calcSpinSpeed(freq: number): number {
  return (Math.abs(freq - SPIN_NEUTRAL) / 300) * SPIN_MAX_RPM;
}

// Spin direction from frequency
export function calcSpinDirection(freq: number): SpinDirection {
  return freq < SPIN_NEUTRAL ? "ccw" : "cw";
}

// Convert RPM to radians per second for Three.js animation
export function rpmToRadPerSec(rpm: number): number {
  return (rpm * 2 * Math.PI) / 60;
}

// Bad-faith detection: >10 frequency changes per minute
export function isBadFaith(changeTimestamps: number[]): boolean {
  const now = Date.now();
  const oneMinuteAgo = now - 60_000;
  const recentChanges = changeTimestamps.filter((t) => t > oneMinuteAgo);
  return recentChanges.length > BAD_FAITH_CHANGES_PER_MIN;
}

// Resonance check: ≥80% of users within ±5 Hz of modal cluster
export function checkResonance(frequencies: number[]): {
  achieved: boolean;
  alignedCount: number;
  totalCount: number;
  modalFrequency: number;
  percentage: number;
} {
  if (frequencies.length === 0) {
    return {
      achieved: false,
      alignedCount: 0,
      totalCount: 0,
      modalFrequency: FREQ_TARGET,
      percentage: 0,
    };
  }

  // Find modal cluster by binning frequencies
  const bins = new Map<number, number>();
  for (const f of frequencies) {
    const bin = Math.round(f);
    bins.set(bin, (bins.get(bin) || 0) + 1);
  }

  // Find the bin with most entries (considering ±5 Hz window)
  let bestCenter = FREQ_TARGET;
  let bestCount = 0;

  for (const [center] of bins) {
    const count = frequencies.filter(
      (f) => Math.abs(f - center) <= RESONANCE_TOLERANCE
    ).length;
    if (count > bestCount) {
      bestCount = count;
      bestCenter = center;
    }
  }

  const percentage = bestCount / frequencies.length;

  return {
    achieved: percentage >= RESONANCE_THRESHOLD,
    alignedCount: bestCount,
    totalCount: frequencies.length,
    modalFrequency: bestCenter,
    percentage,
  };
}

// Proximity harmonic between two users
// Harmonic = sqrt(Freq_A * Freq_B)
export function proximityHarmonic(freqA: number, freqB: number): number {
  return Math.sqrt(freqA * freqB);
}

// Resonance Quality Factor
// Q = 2 + 13 * e^(-minDistance / 100)
export function qualityFactor(
  freq: number,
  vowelFrequencies: number[] = [270, 530, 730]
): number {
  const minDist = Math.min(...vowelFrequencies.map((v) => Math.abs(freq - v)));
  return 2 + 13 * Math.exp(-minDist / 100);
}

// Rome Score calculation (1000 pts max)
export function calcRomeScore(triangle: Triangle, isInResonance: boolean): number {
  let score = 0;

  // 400 pts: frequency alignment to target
  const freqDiff = Math.abs(triangle.frequency - FREQ_TARGET);
  score += SCORE_ALIGNMENT * Math.max(0, 1 - freqDiff / 300);

  // 300 pts: time sustained in resonance (max at 60 seconds)
  score += SCORE_SUSTAINED * Math.min(1, triangle.resonanceTime / 60_000);

  // 200 pts: has crossed 500 Hz neutral (showing openness)
  if (triangle.hasCrossedNeutral) {
    score += SCORE_CROSSING;
  }

  // 100 pts: early joining (within first 60 seconds)
  const timeSinceJoin = Date.now() - triangle.joinedAt;
  score += SCORE_EARLY * Math.max(0, 1 - timeSinceJoin / 60_000);

  // Bad-faith penalty
  if (isBadFaith(triangle.changeTimestamps)) {
    score *= 1 - BAD_FAITH_PENALTY;
  }

  return Math.min(SCORE_MAX, Math.round(score));
}
```

## File: app/globals.css
```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --glass: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: "Inter", system-ui, sans-serif;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Glassmorphism card */
.glass {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
}

/* Pulse animation for resonance */
@keyframes resonance-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.resonance-pulse {
  animation: resonance-pulse 2s ease-in-out infinite;
}

/* Glow effect */
@keyframes glow {
  0%,
  100% {
    filter: drop-shadow(0 0 10px currentColor);
  }
  50% {
    filter: drop-shadow(0 0 30px currentColor);
  }
}

.glow {
  animation: glow 3s ease-in-out infinite;
}
```

## File: app/layout.tsx
```typescript
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Global Rome",
  description:
    "A collective resonance experience. Turn your knob. Tune in. For Rome Viharo (1967-2025).",
  openGraph: {
    title: "Global Rome",
    description: "Turn. Tune. NOW.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

## File: app/page.tsx
```typescript
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Knob from "./components/Knob";
import FrequencyViz from "./components/FrequencyViz";
import ResonanceOverlay from "./components/ResonanceOverlay";
import StatusBar from "./components/StatusBar";
import { FREQ_DEFAULT } from "@/lib/constants";
import { frequencyToHSL } from "@/lib/synesthesia";
import { calcRomeScore, type Triangle as TriangleData } from "@/lib/triangle";
import {
  createResonanceEngine,
  type ResonanceEngine,
  type ResonanceState,
} from "@/lib/resonance";
import {
  subscribeToFrequencies,
  broadcastFrequency,
  unsubscribe,
} from "@/lib/supabase";
import {
  initAudio,
  setFrequency as setAudioFreq,
  startOscillator,
  stopOscillator,
  playResonanceTone,
  dispose as disposeAudio,
} from "@/lib/audio";

// Lazy-load Three.js component (no SSR)
const Triangle3D = dynamic(() => import("./components/Triangle3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
    </div>
  ),
});

function generateUserId(): string {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem("global-rome-user-id");
  if (!id) {
    id = `user-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem("global-rome-user-id", id);
  }
  return id;
}

export default function Home() {
  const [frequency, setFrequency] = useState(FREQ_DEFAULT);
  const [audioStarted, setAudioStarted] = useState(false);
  const [resonanceState, setResonanceState] = useState<ResonanceState>({
    participants: new Map(),
    isResonance: false,
    resonancePercentage: 0,
    modalFrequency: 730,
    alignedCount: 0,
    totalCount: 0,
  });
  const [romeScore, setRomeScore] = useState(0);
  const [wasResonance, setWasResonance] = useState(false);

  const engineRef = useRef<ResonanceEngine | null>(null);
  const userIdRef = useRef<string>("anon");
  const triangleRef = useRef<TriangleData>({
    userId: "anon",
    frequency: FREQ_DEFAULT,
    spinDirection: "ccw",
    spinSpeed: 0,
    color: frequencyToHSL(FREQ_DEFAULT),
    romeScore: 0,
    joinedAt: Date.now(),
    hasCrossedNeutral: false,
    resonanceTime: 0,
    changeTimestamps: [],
  });
  const tickRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Initialize
  useEffect(() => {
    userIdRef.current = generateUserId();
    triangleRef.current.userId = userIdRef.current;

    const engine = createResonanceEngine();
    engineRef.current = engine;

    // Subscribe to ceremony channel
    const ceremonyId = "memorial-2026-03-15";
    subscribeToFrequencies(ceremonyId, (data) => {
      engine.handleFrequencyUpdate(data);
    });

    // Tick: update state every 100ms
    tickRef.current = setInterval(() => {
      const state = engine.getState();
      setResonanceState(state);

      // Update Rome Score
      const t = triangleRef.current;
      if (state.isResonance) {
        t.resonanceTime += 100;
      }
      const score = calcRomeScore(t, state.isResonance);
      setRomeScore(score);
    }, 100);

    return () => {
      clearInterval(tickRef.current);
      unsubscribe();
      disposeAudio();
    };
  }, []);

  // Resonance achievement
  useEffect(() => {
    if (resonanceState.isResonance && !wasResonance) {
      playResonanceTone();
      setWasResonance(true);
    }
    if (!resonanceState.isResonance && wasResonance) {
      setWasResonance(false);
    }
  }, [resonanceState.isResonance, wasResonance]);

  const handleFrequencyChange = useCallback((hz: number) => {
    setFrequency(hz);
    setAudioFreq(hz);
    broadcastFrequency(userIdRef.current, hz);

    // Track for bad-faith detection
    const t = triangleRef.current;
    t.frequency = hz;
    t.changeTimestamps.push(Date.now());
    // Keep only last 60s
    const cutoff = Date.now() - 60_000;
    t.changeTimestamps = t.changeTimestamps.filter((ts) => ts > cutoff);

    // Track neutral crossing
    if (!t.hasCrossedNeutral && hz > 500 !== t.frequency > 500) {
      t.hasCrossedNeutral = true;
    }
  }, []);

  const handleStart = useCallback(async () => {
    await initAudio();
    startOscillator();
    setAudioStarted(true);
    broadcastFrequency(userIdRef.current, frequency);
  }, [frequency]);

  const color = frequencyToHSL(frequency);

  // Landing state — tap to begin
  if (!audioStarted) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6">
        {/* Background glow */}
        <div
          className="fixed inset-0 -z-10 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
          }}
        />

        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Global Rome
          </h1>
          <p className="mt-3 text-lg text-white/50">
            For Rome Viharo (1967–2025)
          </p>
        </div>

        <p className="max-w-xs text-center text-sm text-white/40">
          Turn your knob. Tune your frequency. When enough of us align, we
          resonate together.
        </p>

        <button
          onClick={handleStart}
          className="mt-4 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-lg font-medium backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
        >
          Tune In
        </button>

        <p className="text-xs text-white/20">
          TURN &rarr; TUNE &rarr; NOW
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-between gap-4 px-4 py-6">
      {/* Background frequency glow */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${color}22, transparent 60%)`,
        }}
      />

      {/* Status bar */}
      <StatusBar
        participantCount={resonanceState.totalCount}
        romeScore={romeScore}
        ceremonyName="Rome Memorial"
        isResonance={resonanceState.isResonance}
      />

      {/* Triangle visualization */}
      <Triangle3D
        frequency={frequency}
        isResonance={resonanceState.isResonance}
        className="h-64 w-full flex-1"
      />

      {/* Frequency spectrum */}
      <FrequencyViz
        participants={resonanceState.participants}
        myFrequency={frequency}
        resonancePercentage={resonanceState.resonancePercentage}
        isResonance={resonanceState.isResonance}
      />

      {/* Knob */}
      <Knob frequency={frequency} onChange={handleFrequencyChange} />

      {/* Resonance overlay */}
      <ResonanceOverlay
        isResonance={resonanceState.isResonance}
        modalFrequency={resonanceState.modalFrequency}
      />
    </div>
  );
}
```

## File: eslint.config.mjs
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

## File: next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js packages for proper ESM handling
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Neo4j driver uses Node.js APIs — server-only
  serverExternalPackages: ["neo4j-driver"],
};

export default nextConfig;
```

## File: package.json
```json
{
  "name": "global-ohm",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.5.0",
    "@supabase/supabase-js": "^2.99.0",
    "@types/three": "^0.183.1",
    "neo4j-driver": "^6.0.1",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "three": "^0.183.2",
    "tone": "^15.1.22",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## File: postcss.config.mjs
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```