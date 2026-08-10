"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RoomModel() {
  const { scene } = useGLTF("/room.glb");
  return (
    <primitive
      object={scene}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    />
  );
}

function Flashlight() {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;

    targetRef.current.position.set(x, y, 1.0);

    if (lightRef.current) {
      lightRef.current.target = targetRef.current;
    }
  });

  return (
    <>
      <object3D ref={targetRef} />

      <spotLight
        ref={lightRef}
        position={[0, -2, 3]}
        intensity={100}
        angle={Math.PI / 5}
        penumbra={0.4}
        color="#ffe8a3"
        castShadow
      />
    </>
  );
}

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black overflow-hidden relative cursor-crosshair">
      <Canvas
        shadows
        camera={{
          position: [0, -3.8, 2.8],
          fov: 50,
        }}
      >
        <ambientLight intensity={0.15} color="#2a4b7c" />

        <directionalLight
          position={[-0.4, 3.0, 3.2]}
          intensity={0.4}
          color="#3a5a8c"
        />

        <Flashlight />

        <React.Suspense fallback={null}>
          <RoomModel />
        </React.Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-6 text-white/50 text-xs tracking-widest pointer-events-none uppercase">
        Move mouse to inspect desk
      </div>
    </main>
  );
}

useGLTF.preload("/room.glb");
