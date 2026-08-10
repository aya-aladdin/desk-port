"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RoomModel() {
  const { scene } = useGLTF("/room.glb");
  return (
    <primitive object={scene} rotation={[0, 0, 0]} position={[0, -1.5, 0]} />
  );
}

function CameraRig() {
  useFrame(({ pointer, camera }) => {
    const targetX = pointer.x * 1.5;
    const targetY = pointer.y * 0.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);

    camera.lookAt(targetX, targetY, 0);
  });

  return null;
}

function Flashlight() {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);
  const { viewport } = useThree();

  useFrame(({ pointer, camera }) => {
    const x = camera.position.x + (pointer.x * viewport.width) / 2;
    const y = camera.position.y + (pointer.y * viewport.height) / 2;

    targetRef.current.position.set(x, y, 0);

    if (lightRef.current) {
      lightRef.current.position.set(camera.position.x, camera.position.y, 5);
      lightRef.current.target = targetRef.current;
    }
  });

  return (
    <>
      <object3D ref={targetRef} />
      <spotLight
        ref={lightRef}
        intensity={120}
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
          position: [0, 0, 5],
          fov: 50,
        }}
      >
        <CameraRig />
        <ambientLight intensity={0.25} color="#3b5998" />
        <directionalLight
          position={[-2, 4, 5]}
          intensity={0.5}
          color="#5c7aaa"
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
