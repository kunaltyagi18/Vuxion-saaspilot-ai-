"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Stars, Float } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// ── Register GSAP plugin ─────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Shared scroll progress ref (updated by GSAP, read by useFrame) ───────────
const scrollData = { progress: 0 };

// ── Morphing Sphere ──────────────────────────────────────────────────────────
function MorphSphere() {
  const meshRef   = useRef();
  const matRef    = useRef();
  const groupRef  = useRef();

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollData.progress;

    // Idle rotation
    meshRef.current.rotation.x = t * 0.12 + p * Math.PI * 1.2;
    meshRef.current.rotation.y = t * 0.18 + p * Math.PI * 0.8;

    // Scroll-driven scale pulse
    const targetScale = 1 + p * 0.6 + Math.sin(t * 0.8) * 0.04;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05)
    );

    // Distort intensity increases with scroll
    if (matRef.current) {
      matRef.current.distort = THREE.MathUtils.lerp(
        matRef.current.distort,
        0.3 + p * 0.55,
        0.04
      );
      matRef.current.speed = 1.5 + p * 3;
      // Color shift: indigo → violet → fuchsia
      matRef.current.color.setHSL(0.66 - p * 0.15, 0.85, 0.55);
    }

    // Float group drift
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    groupRef.current.position.x = Math.cos(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.8, 8]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#6366f1"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.4}
          wireframe={false}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.8, 4]} />
        <meshBasicMaterial
          color="#a5b4fc"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 8, 120]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.4, 0]}>
        <torusGeometry args={[2.7, 0.01, 8, 120]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ── Particle cloud ────────────────────────────────────────────────────────────
function Particles({ count = 180 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollData.progress;
    ref.current.rotation.y = t * 0.04 + p * 0.8;
    ref.current.rotation.x = t * 0.02 + p * 0.4;
  });

  const positions = new Float32Array(
    Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 14,
    ]).flat()
  );

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c4b5fd"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main scene ────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#818cf8" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#c084fc" />
      <pointLight position={[0, -6, 3]} intensity={1} color="#38bdf8" />

      <Stars
        radius={40}
        depth={50}
        count={1200}
        factor={3}
        saturation={0.5}
        fade
        speed={0.4}
      />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <MorphSphere />
      </Float>

      <Particles />
    </>
  );
}

// ── The exported client component ─────────────────────────────────────────────
export default function ScrollScene3DCanvas({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        scrollData.progress = self.progress;
      },
    });

    return () => trigger.kill();
  }, [sectionRef]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
