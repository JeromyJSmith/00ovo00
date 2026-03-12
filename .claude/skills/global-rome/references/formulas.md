# Global Rome — Mathematical Formulas & Thresholds

## Triangle Spin Mechanics

```
Speed (RPM) = (|f - 500| / 300) * 120
```
- 500 Hz = neutral (no spin)
- Max: 120 RPM (2 rotations/sec)
- < 500 Hz: counter-clockwise
- > 500 Hz: clockwise
- Radians/sec = RPM * 2π / 60

## Synesthetic Color Mapping

Hue (240° CCW shift, purple → orange):
```
Hue = 270 - ((f - 200) / 600) * 180
```

Saturation:
```
Saturation = 80 + ((f - 200) / 600) * 20
```

Lightness (bell curve):
```
Lightness = 30 + 50 * sin(((f - 200) / 600) * π)
```

## Visual Luminosity (gamma 1.8)

```
L(f) = 0.05 + 0.95 * ((f - 200) / 600)^1.8
```
L_min = 0.05 (never fully black)

## Resonance Quality (Q Factor)

```
Q = 2 + 13 * e^(-minDistance / 100)
```
Spikes at vowel frequencies (270, 530, 730 Hz), drops at consonants.

## Proximity Harmonic

```
Harmonic = sqrt(Freq_A * Freq_B)
```

## Universal Transfer Function (ADSR)

```
Φ(t) = Φ₀ · H(t) · (1 - e^(-t/τ)) + Φ_sus · H(t - t_s) · e^(-(t-t_r)/τ_r)
```

## Formant Cutoff f_c(t) — NOW Sweep

- N→O (Rise): `220 + 510 * (t/T₁)²`
- O (Hold): `730`
- O→W (Fall): `730 - 430 * ((t - T₂)/T₃)`

## Resonance Lock

- Trigger: ≥80% users within ±5 Hz of modal cluster
- Effect: All triangles flip direction, 730 Hz tone plays

## Bad-Faith Detection

- Flag: >10 frequency changes per minute
- Penalty: Rome Score slashed 90%

## Rome Score (1000 pts max)

| Component | Points | Condition |
|-----------|--------|-----------|
| Alignment | 400 | Proximity to 730 Hz target |
| Sustained | 300 | Time spent in resonance (max 60s) |
| Crossing | 200 | Has crossed 500 Hz neutral |
| Early | 100 | Joined within first 60 seconds |
