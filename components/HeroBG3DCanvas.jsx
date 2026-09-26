"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Shared mouse ref ─────────────────────────────────────────────────────────
const mouse = { x: 0, y: 0, ease: { x: 0, y: 0 } };
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
}

// ── Wave grid of tech nodes ──────────────────────────────────────────────────
const COLS = 28;
const ROWS = 18;
const SPACING = 0.9;
const TOTAL = COLS * ROWS;

function WaveGrid() {
  const pointsRef = useRef();
  const linesRef  = useRef();

  const { positions, linePositions, colors } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const colors    = new Float32Array(TOTAL * 3);

    // Build grid nodes
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = (r * COLS + c) * 3;
        positions[i]     = (c - COLS / 2) * SPACING;
        positions[i + 1] = 0;
        positions[i + 2] = (r - ROWS / 2) * SPACING;
        colors[i] = 0.35; colors[i + 1] = 0.6; colors[i + 2] = 1.0; // cyan-blue
      }
    }

    // Build connection lines (right + down neighbors)
    const lineSegs = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * SPACING;
        const z = (r - ROWS / 2) * SPACING;
        if (c < COLS - 1) {
          lineSegs.push(x, 0, z, x + SPACING, 0, z);
        }
        if (r < ROWS - 1) {
          lineSegs.push(x, 0, z, x, 0, z + SPACING);
        }
      }
    }
    const linePositions = new Float32Array(lineSegs);
    return { positions, linePositions, colors };
  }, []);

  // Live position buffer (mutated every frame)
  const posBuffer = useMemo(() => positions.slice(), [positions]);
  const colBuffer = useMemo(() => colors.slice(), [colors]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Smooth mouse ease
    mouse.ease.x += (mouse.x - mouse.ease.x) * 0.05;
    mouse.ease.y += (mouse.y - mouse.ease.y) * 0.05;

    // Update node Y positions — wave + mouse ripple
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        const i3 = i * 3;
        const nx = (c - COLS / 2) * SPACING;
        const nz = (r - ROWS / 2) * SPACING;

        // Base sine wave
        const wave = Math.sin(t * 1.1 + nx * 0.5) * 0.4
                   + Math.cos(t * 0.7 + nz * 0.45) * 0.3;

        // Mouse proximity ripple
        const mx = mouse.ease.x * 7;
        const my = -mouse.ease.y * 5;
        const dist = Math.sqrt((nx - mx) ** 2 + (nz - my) ** 2);
        const ripple = Math.sin(dist * 1.2 - t * 3.5) * Math.exp(-dist * 0.18) * 1.2;

        posBuffer[i3 + 1] = wave + ripple;

        // Color: height-driven — low=indigo, high=cyan
        const h = (posBuffer[i3 + 1] + 1.2) / 2.4;
        colBuffer[i3]     = 0.3  + h * 0.15;  // R
        colBuffer[i3 + 1] = 0.45 + h * 0.55;  // G  (cyan push)
        colBuffer[i3 + 2] = 0.95 + h * 0.05;  // B
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.array.set(posBuffer);
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.array.set(colBuffer);
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // Tilt the whole grid slightly with mouse
    if (pointsRef.current) {
      pointsRef.current.rotation.x = -0.42 + mouse.ease.y * 0.08;
      pointsRef.current.rotation.y =  mouse.ease.x * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = -0.42 + mouse.ease.y * 0.08;
      linesRef.current.rotation.y =  mouse.ease.x * 0.1;
    }
  });

  return (
    <>
      {/* Grid connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b4fd4" transparent opacity={0.18} />
      </lineSegments>

      {/* Node dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={posBuffer}
            count={TOTAL}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colBuffer}
            count={TOTAL}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// ── Floating holographic rings ────────────────────────────────────────────────
function HoloRings() {
  const group = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.z = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={group} position={[3, 1.5, -3]}>
      {[1.2, 1.7, 2.2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, 0, i * 0.8]}>
          <torusGeometry args={[r, 0.012, 8, 80]} />
          <meshBasicMaterial
            color={["#00d4ff", "#6366f1", "#a855f7"][i]}
            transparent
            opacity={0.5 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Floating tech particles ───────────────────────────────────────────────────
function TechParticles({ count = 120 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 0]} intensity={2} color="#00d4ff" />
      <pointLight position={[-8, 2, -4]} intensity={1.5} color="#6366f1" />
      <pointLight position={[8, 2, -4]} intensity={1} color="#a855f7" />
      <WaveGrid />
      <HoloRings />
      <TechParticles />
    </>
  );
}

export default function HeroBG3DCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 4, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
