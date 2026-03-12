"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { VFXParticles, VFXEmitter } from "wawa-vfx";
import type { VFXEmitterSettings } from "wawa-vfx";
import * as THREE from "three";
import { calcSpinSpeed, calcSpinDirection, rpmToRadPerSec } from "@/lib/triangle";
import { frequencyToRGB, frequencyToLuminosity } from "@/lib/synesthesia";
import { FREQ_NEUTRAL } from "@/lib/constants";

// ── Resonance particle burst settings ────────────────────────────────
const RESONANCE_BURST: VFXEmitterSettings = {
  duration: 0.8,
  nbParticles: 120,
  spawnMode: "burst",
  loop: false,
  colorStart: ["#FFD700", "#FF6B35", "#FFFFFF"],
  colorEnd: ["#FFD70033", "#FF6B3533", "#FFFFFF33"],
  particlesLifetime: [0.6, 1.8],
  speed: [3, 8],
  size: [0.08, 0.25],
  startPositionMin: [-0.5, -0.5, -0.5],
  startPositionMax: [0.5, 0.5, 0.5],
  directionMin: [-1, -1, -1],
  directionMax: [1, 1, 1],
  rotationSpeedMin: [-2, -2, -2],
  rotationSpeedMax: [2, 2, 2],
};

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
        emissive={new THREE.Color(r, g, b)}
        emissiveIntensity={isResonance ? 3.0 : 1.5 + luminosity}
        metalness={0.3}
        roughness={0.4}
        toneMapped={false}
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
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />

        <TriangleMesh frequency={frequency} isResonance={isResonance} />

        <EffectComposer>
          <Bloom
            intensity={isResonance ? 2.5 : 1.2}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>

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
  const burstRef = useRef<React.ComponentRef<typeof VFXEmitter>>(null);
  const prevResonance = useRef(false);

  // Fire particle burst when resonance achieved
  useEffect(() => {
    if (isResonance && !prevResonance.current) {
      burstRef.current?.startEmitting(true);
    }
    prevResonance.current = isResonance;
  }, [isResonance]);

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
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 10]} intensity={1.0} />

        {participants.map((p, i) => (
          <TriangleMesh
            key={p.userId}
            frequency={p.frequency}
            isResonance={isResonance}
            scale={0.5}
            position={positions[i]}
          />
        ))}

        {/* EffectComposer requires at least one renderable object */}
        {participants.length > 0 && (
          <EffectComposer>
            <Bloom
              intensity={isResonance ? 3.0 : 1.5}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        )}

        {/* Resonance celebration particle system */}
        <VFXParticles name="resonance-burst" settings={{ nbParticles: 200 }} />
        <VFXEmitter
          ref={burstRef}
          emitter="resonance-burst"
          settings={RESONANCE_BURST}
          autoStart={false}
        />

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
