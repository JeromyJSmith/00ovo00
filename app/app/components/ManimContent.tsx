"use client";

import { useCallback } from "react";
import {
  ManimScene,
  // Directions (Vector3Tuple constants)
  UP,
  DOWN,
  LEFT,
  RIGHT,
  // Mobjects
  Text,
  Circle,
  Dot,
  Axes,
  // Animations
  FadeIn,
  FadeOut,
  Transform,
  Create,
  Write,
  AnimationGroup,
} from "manim-web/react";
import type { Scene } from "manim-web/react";

// ── Animation: Phonetic Chain ─────────────────────────────────────
// TURING → TURNING → TUNING
// Shows R transforming to N as I steps back
async function phoneticChain(scene: Scene) {
  const turing = new Text({ text: "TURING", fontSize: 64, color: "#00F5FF" });
  const turning = new Text({ text: "TURNING", fontSize: 64, color: "#FFD700" });
  const tuning = new Text({ text: "TUNING", fontSize: 64, color: "#FF6B35" });

  // Subtitle annotations
  const sub1 = new Text({
    text: "resistance + observer",
    fontSize: 24,
    color: "#666666",
  });
  sub1.nextTo(turing, DOWN, 0.5);

  const sub2 = new Text({
    text: "rotation begins",
    fontSize: 24,
    color: "#666666",
  });
  sub2.nextTo(turning, DOWN, 0.5);

  const sub3 = new Text({
    text: "two vibrations, I facilitates",
    fontSize: 24,
    color: "#666666",
  });
  sub3.nextTo(tuning, DOWN, 0.5);

  await scene.play(new FadeIn(turing));
  await scene.play(new FadeIn(sub1));
  await scene.wait(2);

  await scene.play(
    new AnimationGroup([
      new Transform(turing, turning),
      new Transform(sub1, sub2),
    ]),
  );
  await scene.wait(2);

  await scene.play(
    new AnimationGroup([
      new Transform(turning, tuning),
      new Transform(sub2, sub3),
    ]),
  );
  await scene.wait(3);
  await scene.play(new FadeOut(tuning), new FadeOut(sub3));
}

// ── Animation: Transfer Function Φ(t) ────────────────────────────
// The universal envelope: ADSR = Breath = Switch = NOW
async function transferFunction(scene: Scene) {
  const axes = new Axes({
    xRange: [0, 1.5, 0.3],
    yRange: [0, 800, 200],
    xLength: 10,
    yLength: 5,
    axisConfig: { color: "#444444" },
  });

  const xLabel = new Text({ text: "t (seconds)", fontSize: 20, color: "#666" });
  xLabel.nextTo(axes, DOWN, 0.3);

  const yLabel = new Text({ text: "f (Hz)", fontSize: 20, color: "#666" });
  yLabel.nextTo(axes, LEFT, 0.3);

  // Φ(t): quadratic rise → sustain → linear fall
  const phiGraph = axes.plot(
    (t: number) => {
      if (t < 0.3) return 220 + 510 * (t / 0.3) ** 2; // Quadratic rise N→O
      if (t < 0.8) return 730; // Sustain at O
      if (t < 1.5) return 730 - 430 * ((t - 0.8) / 0.7); // Linear fall O→W
      return 300;
    },
    { color: "#00F5FF", strokeWidth: 3 },
  );

  // Key frequency markers
  const nDot = new Dot({ point: axes.c2p(0, 220), color: "#9B59B6", radius: 0.08 });
  const oDot = new Dot({
    point: axes.c2p(0.3, 730),
    color: "#FFD700",
    radius: 0.08,
  });
  const wDot = new Dot({
    point: axes.c2p(1.5, 300),
    color: "#3498DB",
    radius: 0.08,
  });

  const nLabel = new Text({ text: "N (220 Hz)", fontSize: 18, color: "#9B59B6" });
  nLabel.nextTo(nDot, LEFT, 0.2);

  const oLabel = new Text({ text: "O (730 Hz)", fontSize: 18, color: "#FFD700" });
  oLabel.nextTo(oDot, UP, 0.2);

  const wLabel = new Text({ text: "W (300 Hz)", fontSize: 18, color: "#3498DB" });
  wLabel.nextTo(wDot, RIGHT, 0.2);

  // Title
  const title = new Text({
    text: "Φ(t) — Universal Transfer Function",
    fontSize: 28,
    color: "#FFFFFF",
  });
  title.toEdge(UP, 0.3);

  await scene.play(new Write(title));
  await scene.play(new Create(axes));
  await scene.play(new FadeIn(xLabel), new FadeIn(yLabel));
  await scene.play(new Create(phiGraph, { duration: 3 }));
  await scene.play(new FadeIn(nDot), new FadeIn(nLabel));
  await scene.play(new FadeIn(oDot), new FadeIn(oLabel));
  await scene.play(new FadeIn(wDot), new FadeIn(wLabel));
}

// ── Animation: Ternary Logic ──────────────────────────────────────
// State 0 / State 1 / State 2 — contradiction as feature
async function ternaryLogic(scene: Scene) {
  const s0 = new Circle({ radius: 0.8, color: "#FF4444", fillOpacity: 0.3 });
  s0.shift([-3, 0, 0]);
  const s1 = new Circle({ radius: 0.8, color: "#44FF44", fillOpacity: 0.3 });
  // s1 stays at origin
  const s2 = new Circle({ radius: 0.8, color: "#FFD700", fillOpacity: 0.3 });
  s2.shift([3, 0, 0]);

  const l0 = new Text({
    text: "State 0\nFALSE",
    fontSize: 20,
    color: "#FF4444",
  });
  l0.moveTo(s0.getCenter());

  const l1 = new Text({ text: "State 1\nTRUE", fontSize: 20, color: "#44FF44" });
  l1.moveTo(s1.getCenter());

  const l2 = new Text({ text: "State 2\nNOW", fontSize: 20, color: "#FFD700" });
  l2.moveTo(s2.getCenter());

  const sub0 = new Text({ text: "Blocked / NO", fontSize: 14, color: "#888888" });
  sub0.nextTo(s0, DOWN, 0.3);

  const sub1 = new Text({
    text: "Executable / YES",
    fontSize: 14,
    color: "#888888",
  });
  sub1.nextTo(s1, DOWN, 0.3);

  const sub2 = new Text({
    text: "Both / Contradiction",
    fontSize: 14,
    color: "#888888",
  });
  sub2.nextTo(s2, DOWN, 0.3);

  const title = new Text({
    text: "Ternary Logic — The Key Innovation",
    fontSize: 28,
    color: "#FFFFFF",
  });
  title.toEdge(UP, 0.5);

  const insight = new Text({
    text: "Contradiction is a feature, not a bug.",
    fontSize: 22,
    color: "#FFD700",
  });
  insight.toEdge(DOWN, 0.8);

  await scene.play(new FadeIn(title));
  await scene.play(
    new AnimationGroup([new Create(s0), new Create(s1), new Create(s2)]),
  );
  await scene.play(
    new AnimationGroup([
      new FadeIn(l0),
      new FadeIn(l1),
      new FadeIn(l2),
    ]),
  );
  await scene.play(
    new AnimationGroup([
      new FadeIn(sub0),
      new FadeIn(sub1),
      new FadeIn(sub2),
    ]),
  );
  await scene.wait(1);
  await scene.play(new FadeIn(insight));
}

// ── Animation Map ─────────────────────────────────────────────────
const ANIMATIONS: Record<string, (scene: Scene) => Promise<void>> = {
  "phonetic-chain": phoneticChain,
  "transfer-function": transferFunction,
  "ternary-logic": ternaryLogic,
  // NOW sweep and ADSR envelope use the same Φ(t) with different framing
  "now-sweep": transferFunction,
  "adsr-envelope": transferFunction,
};

// ── Component ─────────────────────────────────────────────────────
interface ManimContentProps {
  animation: keyof typeof ANIMATIONS;
  autoplay?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export default function ManimContent({
  animation,
  autoplay = true,
  width = 800,
  height = 450,
  className,
}: ManimContentProps) {
  const handleSceneReady = useCallback(
    async (scene: Scene) => {
      if (!autoplay) return;
      const fn = ANIMATIONS[animation];
      if (fn) await fn(scene);
    },
    [animation, autoplay],
  );

  return (
    <div className={className}>
      <ManimScene
        onSceneReady={handleSceneReady}
        width={width}
        height={height}
        backgroundColor="#0a0a0a"
      />
    </div>
  );
}
