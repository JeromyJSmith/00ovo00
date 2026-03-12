/**
 * json-render Component Registry
 *
 * Maps catalog entries to actual React component implementations.
 * This is where the abstract schema meets the real UI.
 */

"use client";

import { defineRegistry } from "@json-render/react";
import { catalog } from "./catalog";
import dynamic from "next/dynamic";
import { PHASE_META, type CeremonyPhase } from "./ceremony";

// Lazy-load heavy components (Three.js, Manim)
const Triangle3D = dynamic(
  () => import("@/app/components/Triangle3D"),
  { ssr: false },
);
const CeremonyTrianglesComponent = dynamic(
  () =>
    import("@/app/components/Triangle3D").then((m) => ({
      default: m.CeremonyTriangles,
    })),
  { ssr: false },
);
const ManimContent = dynamic(
  () => import("@/app/components/ManimContent"),
  { ssr: false },
);

// Static imports for lightweight components
import Knob from "@/app/components/Knob";
import FrequencyViz from "@/app/components/FrequencyViz";
import ResonanceOverlay from "@/app/components/ResonanceOverlay";
import RomeScoreComponent from "@/app/components/RomeScore";
import StatusBar from "@/app/components/StatusBar";

export const { registry } = defineRegistry(catalog, {
  components: {
    FrequencyKnob: ({ props, emit }) => (
      <Knob
        frequency={props.frequency}
        onChange={(hz: number) => emit("setFrequency")}
        disabled={props.disabled ?? false}
      />
    ),

    Triangle: ({ props }) => (
      <Triangle3D
        frequency={props.frequency}
        isResonance={props.isResonance}
        className={
          props.size === "large"
            ? "h-96 w-full"
            : props.size === "small"
              ? "h-32 w-full"
              : "h-64 w-full"
        }
      />
    ),

    CeremonyTriangles: ({ props }) => (
      <CeremonyTrianglesComponent
        participants={[]} // Populated via state binding
        isResonance={props.isResonance}
        className="h-full w-full"
      />
    ),

    FrequencySpectrum: ({ props }) => (
      <FrequencyViz
        participants={new Map()}
        myFrequency={props.myFrequency}
        resonancePercentage={props.resonancePercentage}
        isResonance={props.isResonance}
      />
    ),

    ResonanceOverlay: ({ props }) => (
      <ResonanceOverlay
        isResonance={props.isResonance}
        modalFrequency={props.modalFrequency}
      />
    ),

    RomeScore: ({ props }) => <RomeScoreComponent score={props.score} />,

    PhaseIndicator: ({ props }) => (
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className="h-1 w-16 rounded-full"
          style={{ backgroundColor: props.color }}
        />
        <h2 className="text-2xl font-bold" style={{ color: props.color }}>
          {props.label}
        </h2>
        <p className="text-sm text-white/50">{props.description}</p>
      </div>
    ),

    StatusBar: ({ props }) => (
      <StatusBar
        participantCount={props.participantCount}
        romeScore={props.romeScore}
        ceremonyName={props.ceremonyName}
        isResonance={props.isResonance}
      />
    ),

    ManimScene: ({ props }) => (
      <ManimContent
        animation={props.animation}
        autoplay={props.autoplay ?? true}
        width={props.width ?? 800}
        height={props.height ?? 450}
        className="mx-auto"
      />
    ),

    CeremonyLayout: ({ props, children }) => {
      const meta = PHASE_META[props.phase as CeremonyPhase];
      return (
        <div
          className="relative flex min-h-dvh flex-col items-center justify-between gap-4 px-4 py-6 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${meta.color}15, transparent 70%)`,
          }}
        >
          {children}
        </div>
      );
    },

    MessageCard: ({ props }) => (
      <div
        className={`max-w-md rounded-2xl border px-8 py-6 text-center backdrop-blur-xl ${
          props.variant === "tribute"
            ? "border-white/30 bg-white/10"
            : props.variant === "quote"
              ? "border-yellow-500/20 bg-yellow-500/5 italic"
              : "border-white/10 bg-white/5"
        }`}
      >
        <h3 className="mb-2 text-lg font-semibold text-white">
          {props.title}
        </h3>
        <p className="text-sm text-white/60">{props.body}</p>
      </div>
    ),
  },

  actions: {
    tuneIn: async () => {
      console.log("[ceremony] tuneIn action dispatched");
    },
    setFrequency: async () => {
      console.log("[ceremony] setFrequency action dispatched");
    },
    advancePhase: async () => {
      console.log("[ceremony] advancePhase action dispatched");
    },
    triggerNOWSweep: async () => {
      console.log("[ceremony] triggerNOWSweep action dispatched");
    },
    resetCeremony: async () => {
      console.log("[ceremony] resetCeremony action dispatched");
    },
  },
});
