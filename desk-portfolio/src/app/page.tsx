"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RoomModel() {
  const { scene } = useGLTF("/room.glb");
  return (
    <primitive object={scene} rotation={[0, 0, 0]} position={[0, -2, 0]} />
  );
}

function CameraRig() {
  useFrame(({ pointer, camera }) => {
    camera.position.set(0, 1.6, 10.5);
    const maxPitch = Math.PI / 4;
    const maxYaw = Math.PI / 3;

    camera.rotation.y = -pointer.x * maxYaw;
    camera.rotation.x = pointer.y * maxPitch;
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
      lightRef.current.position.copy(camera.position);
      lightRef.current.target = targetRef.current;
    }
  });

  return (
    <>
      <object3D ref={targetRef} />
      <spotLight
        ref={lightRef}
        intensity={180}
        angle={Math.PI / 4.5}
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
          position: [0, 1.6, 10.5],
          fov: 50,
        }}
      >
        <CameraRig />
        <ambientLight intensity={0.25} color="#3b5998" />
        <directionalLight
          position={[-2, 6, 5]}
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
