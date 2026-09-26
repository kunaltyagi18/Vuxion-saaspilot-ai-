"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const scrollData = { progress: 0 };

// ── Anime Magic Circle Rings ─────────────────────────────────────────────────
function MagicCircle() {
  const groupRef = useRef();
  const rings = useRef([]);

  const ringData = useMemo(() => [
    { r: 2.2,  tube: 0.018, color: "#e879f9", speed: 0.6,  tilt: [0, 0, 0] },
    { r: 2.8,  tube: 0.012, color: "#a855f7", speed: -0.4, tilt: [0.4, 0, 0.3] },
    { r: 3.4,  tube: 0.010, color: "#6366f1", speed: 0.3,  tilt: [0.8, 0.2, 0] },
    { r: 3.9,  tube: 0.008, color: "#00d4ff", speed: -0.5, tilt: [1.1, 0, 0.5] },
    { r: 4.4,  tube: 0.006, color: "#818cf8", speed: 0.2,  tilt: [0.3, 0.5, 1.2] },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollData.progress;

    rings.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = ringData[i];
      mesh.rotation.z = t * d.speed;
      mesh.rotation.x = d.tilt[0] + Math.sin(t * 0.3 + i) * 0.1 + p * 0.5;
      mesh.rotation.y = d.tilt[2] + Math.cos(t * 0.2 + i) * 0.1;
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + p * Math.PI * 0.5;
      groupRef.current.scale.setScalar(1 + p * 0.3);
    }
  });

  return (
    <group ref={groupRef}>
      {ringData.map((d, i) => (
        <mesh
          key={i}
          ref={el => rings.current[i] = el}
          rotation={d.tilt}
        >
          <torusGeometry args={[d.r, d.tube, 6, 128]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

// ── Central morphing orb ─────────────────────────────────────────────────────
function CoreOrb() {
  const meshRef = useRef();
  const matRef  = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollData.progress;

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15 + p * Math.PI;
      meshRef.current.rotation.y = t * 0.22;
    }
    if (matRef.current) {
      matRef.current.distort = 0.25 + p * 0.6 + Math.sin(t) * 0.05;
      matRef.current.speed   = 2 + p * 4;
      // Anime color shift: violet → fuchsia → cyan
      const hue = 0.72 - p * 0.25 + Math.sin(t * 0.5) * 0.05;
      matRef.current.color.setHSL(hue, 0.9, 0.55);
      matRef.current.emissive.setHSL(hue, 0.9, 0.25);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 6]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#a855f7"
        emissive="#6336f1"
        emissiveIntensity={0.5}
        distort={0.3}
        speed={2}
        roughness={0.05}
        metalness={0.6}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

// ── Neon energy particles orbiting the orb ───────────────────────────────────
function OrbitalParticles({ count = 300 }) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#e879f9"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#6366f1"),
      new THREE.Color("#00d4ff"),
      new THREE.Color("#f0abfc"),
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a band around the central orb
      const phi   = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const r     = 2 + Math.random() * 2.5;
      positions[i * 3]     = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const p = scrollData.progress;
    ref.current.rotation.y = t * 0.12 + p * 1.5;
    ref.current.rotation.x = t * 0.07 + p * 0.8;
    const pulse = 1 + Math.sin(t * 1.5) * 0.06 + p * 0.4;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

// ── Anime rune symbols (flat circle meshes) ──────────────────────────────────
function RuneDiscs() {
  const discs = useRef([]);
  const data = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      x: Math.cos(angle) * 3.8,
      y: Math.sin(angle) * 3.8,
      color: ["#e879f9","#a855f7","#6366f1","#00d4ff"][i % 4],
    };
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    discs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z = t * (0.3 + i * 0.05) * (i % 2 ? 1 : -1);
      m.position.x = data[i].x + Math.sin(t * 0.4 + i) * 0.3;
      m.position.y = data[i].y + Math.cos(t * 0.35 + i) * 0.3;
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => discs.current[i] = el} position={[d.x, d.y, 0]}>
          <ringGeometry args={[0.12, 0.18, 6]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

// ── Main scene ────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]}  intensity={3}   color="#e879f9" />
      <pointLight position={[-4, 3, -2]} intensity={2}   color="#6366f1" />
      <pointLight position={[4, -3, -2]} intensity={1.5} color="#00d4ff" />

      <CoreOrb />
      <MagicCircle />
      <OrbitalParticles />
      <RuneDiscs />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
import { useEffect } from "react";

export default function ScrollScene3DCanvas({ sectionRef }) {
  useEffect(() => {
    if (!sectionRef?.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => { scrollData.progress = self.progress; },
    });
    return () => trigger.kill();
  }, [sectionRef]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
