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
