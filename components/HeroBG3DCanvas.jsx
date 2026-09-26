"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Shared mouse ref — no re-renders ────────────────────────────────────────
const mouse = { x: 0, y: 0, ease: { x: 0, y: 0 } };

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
}

// ── Particle field ────────────────────────────────────────────────────────────
function ParticleField({ count = 2800 }) {
  const ref = useRef();
  const clock = useRef(0);

  // Generate sphere + scattered positions
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#6366f1"), // indigo
      new THREE.Color("#8b5cf6"), // violet
      new THREE.Color("#a855f7"), // purple
      new THREE.Color("#c084fc"), // light violet
      new THREE.Color("#e879f9"), // fuchsia
      new THREE.Color("#38bdf8"), // sky accent
    ];
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      if (i < count * 0.6) {
        // Sphere shell
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const r = 4.5 + (Math.random() - 0.5) * 2;
        pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);
      } else {
        // Scattered particles
        pos[i3]     = (Math.random() - 0.5) * 22;
        pos[i3 + 1] = (Math.random() - 0.5) * 22;
        pos[i3 + 2] = (Math.random() - 0.5) * 22;
      }
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    clock.current += delta;
    const t = clock.current;

    // Smooth mouse ease
    mouse.ease.x += (mouse.x - mouse.ease.x) * 0.06;
    mouse.ease.y += (mouse.y - mouse.ease.y) * 0.06;

    // Rotate entire field — mouse steers direction
    ref.current.rotation.y = t * 0.045 + mouse.ease.x * 0.35;
    ref.current.rotation.x = t * 0.025 + mouse.ease.y * 0.2;
    ref.current.rotation.z = t * 0.015;

    // Pulsing scale
    const pulse = 1 + Math.sin(t * 0.7) * 0.025;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        vertexColors
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </Points>
  );
}

// ── Floating orbs ─────────────────────────────────────────────────────────────
function FloatingOrbs() {
  const orbs = useRef([]);
  const data = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 2
      ),
      speed: 0.3 + Math.random() * 0.4,
      offset: i * 1.3,
      color: ["#6366f1","#8b5cf6","#a855f7","#c084fc","#e879f9"][i],
      scale: 0.12 + Math.random() * 0.25,
    })), []
  );

  useFrame(({ clock: c }) => {
    orbs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      mesh.position.x = d.pos.x + Math.sin(c.getElapsedTime() * d.speed + d.offset) * 1.5;
      mesh.position.y = d.pos.y + Math.cos(c.getElapsedTime() * d.speed * 0.8 + d.offset) * 1.2;
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.008;
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => orbs.current[i] = el} position={d.pos} scale={d.scale}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.7}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </>
  );
}

// ── Main scene ────────────────────────────────────────────────────────────────
function Scene() {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, mouse.ease.x * 0.4, 0.04
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, mouse.ease.y * 0.3, 0.04
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]}  intensity={2}   color="#818cf8" />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#c084fc" />
      <pointLight position={[0, 0, -5]} intensity={1}   color="#38bdf8" />
      <ParticleField />
      <FloatingOrbs />
    </group>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function HeroBG3DCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
