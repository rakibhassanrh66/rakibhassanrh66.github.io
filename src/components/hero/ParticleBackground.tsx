import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import * as THREE from 'three';

function ParticleField({ count = 500, isLowPower = false }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const actualCount = isLowPower ? Math.floor(count / 3) : count;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const col = new Float32Array(actualCount * 3);
    for (let i = 0; i < actualCount; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Cyan to purple gradient
      const t = Math.random();
      col[i * 3] = 0.0 + t * 0.66;
      col[i * 3 + 1] = 0.94 - t * 0.61;
      col[i * 3 + 2] = 1.0;
    }
    return { positions: pos, colors: col };
  }, [actualCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[20, 20, 40, 40]} />
      <meshBasicMaterial
        color="#00f0ff"
        wireframe
        transparent
        opacity={0.04}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  const { isLowPower, deviceType } = useDeviceDetect();
  if (deviceType === 'mobile' && isLowPower) {
    return null; // Skip 3D on low-power mobile
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={isLowPower ? 1 : [1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ antialias: !isLowPower, alpha: true }}
      >
        <ParticleField isLowPower={isLowPower} />
        <GridPlane />
      </Canvas>
    </div>
  );
}
