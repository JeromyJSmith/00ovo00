/**
 * json-render Component Catalog
 *
 * Defines the component registry that AI (or ceremony state machine)
 * can use to generate UI specs. Each component has Zod-validated props.
 *
 * This is the "guardrail" layer — AI can only produce UI from these
 * components, nothing else.
 */

import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

export const catalog = defineCatalog(schema, {
  components: {
    // ── Core Interactive ────────────────────────────────────────
    FrequencyKnob: {
      props: z.object({
        frequency: z.number().min(200).max(800),
        disabled: z.boolean().nullable(),
      }),
      description:
        "Rotary knob for selecting frequency (200-800 Hz). Primary user interaction.",
    },

    Triangle: {
      props: z.object({
        frequency: z.number(),
        isResonance: z.boolean(),
        size: z.enum(["small", "medium", "large"]).nullable(),
      }),
      description:
        "3D triangle with Bloom glow. Spins based on frequency, pulses at resonance.",
    },

    CeremonyTriangles: {
      props: z.object({
        isResonance: z.boolean(),
      }),
      description:
        "Multi-triangle view showing all participants arranged in a circle.",
    },

    // ── Visualizations ─────────────────────────────────────────
    FrequencySpectrum: {
      props: z.object({
        myFrequency: z.number(),
        resonancePercentage: z.number().min(0).max(1),
        isResonance: z.boolean(),
      }),
      description:
        "Frequency spectrum bar showing all participants, with N/W/O markers.",
    },

    ResonanceOverlay: {
      props: z.object({
        isResonance: z.boolean(),
        modalFrequency: z.number(),
      }),
      description:
        "Full-screen overlay that appears when resonance is achieved.",
    },

    RomeScore: {
      props: z.object({
        score: z.number().min(0).max(1000),
      }),
      description: "Gradient progress bar showing the Rome Score (0-1000).",
    },

    // ── Ceremony UI ────────────────────────────────────────────
    PhaseIndicator: {
      props: z.object({
        phase: z.enum([
          "gathering",
          "individual",
          "convergence",
          "breath",
          "tribute",
        ]),
        label: z.string(),
        description: z.string(),
        color: z.string(),
      }),
      description:
        "Shows current ceremony phase with label, description, and phase-colored accent.",
    },

    StatusBar: {
      props: z.object({
        participantCount: z.number(),
        romeScore: z.number(),
        ceremonyName: z.string(),
        isResonance: z.boolean(),
      }),
      description:
        "Top status bar with ceremony name, participant count, and Rome Score.",
    },

    // ── Math Content (Manim-Web) ───────────────────────────────
    ManimScene: {
      props: z.object({
        animation: z.enum([
          "phonetic-chain",
          "transfer-function",
          "ternary-logic",
          "now-sweep",
          "adsr-envelope",
        ]),
        autoplay: z.boolean().nullable(),
        width: z.number().nullable(),
        height: z.number().nullable(),
      }),
      description:
        "Mathematical animation scene powered by Manim-Web. Renders 3Blue1Brown-style visualizations of Rome's concepts.",
    },

    // ── Layout ─────────────────────────────────────────────────
    CeremonyLayout: {
      props: z.object({
        phase: z.enum([
          "gathering",
          "individual",
          "convergence",
          "breath",
          "tribute",
        ]),
      }),
      description:
        "Full-screen ceremony layout that adjusts based on current phase.",
    },

    MessageCard: {
      props: z.object({
        title: z.string(),
        body: z.string(),
        variant: z.enum(["default", "tribute", "quote"]).nullable(),
      }),
      description:
        "Text card for ceremony messages, quotes, and tribute text.",
    },
  },

  actions: {
    tuneIn: { description: "Start audio and join the ceremony" },
    setFrequency: { description: "Change the user's broadcast frequency" },
    advancePhase: { description: "Host manually advances ceremony phase" },
    triggerNOWSweep: { description: "Play the collective N-O-W formant sweep" },
    resetCeremony: { description: "Reset ceremony to gathering phase" },
  },
});
