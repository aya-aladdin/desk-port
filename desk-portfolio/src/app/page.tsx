"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
    camera.position.set(0, 2.2, 6);

    const basePitch = -0.35;
    const maxPitch = Math.PI / 6;
    const maxYaw = Math.PI / 4;

    camera.rotation.x = basePitch + pointer.y * maxPitch;
    camera.rotation.y = -pointer.x * maxYaw;
  });

  return null;
}

function Flashlight() {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);
  const raycaster = useRef(new THREE.Raycaster());

  useFrame(({ pointer, camera, scene }) => {
    if (!lightRef.current || !targetRef.current) return;

    lightRef.current.position.copy(camera.position);

    raycaster.current.setFromCamera(pointer, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      targetRef.current.position.copy(intersects[0].point);
    } else {
      const fallbackPos = new THREE.Vector3();
      raycaster.current.ray.at(5, fallbackPos);
      targetRef.current.position.copy(fallbackPos);
    }

    lightRef.current.target = targetRef.current;
  });

  return (
    <>
      <object3D ref={targetRef} />
      <spotLight
        ref={lightRef}
        intensity={300}
        angle={Math.PI / 14}
        penumbra={0.15}
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
          position: [0, 2.2, 3.5],
          fov: 50,
        }}
      >
        <fog attach="fog" args={["#000000", 4, 12]} />
        <CameraRig />
        <ambientLight intensity={0.15} color="#2b3958" />
        <directionalLight
          position={[-2, 6, 5]}
          intensity={0.3}
          color="#5c7aaa"
        />
        <Flashlight />
        <React.Suspense fallback={null}>
          <RoomModel />
        </React.Suspense>
      </Canvas>

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-48 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.8) 65%, rgba(0, 0, 0, 0.98) 100%)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          maskImage:
            "radial-gradient(ellipse at center, transparent 25%, black 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 25%, black 80%)",
        }}
      />

      <div className="absolute bottom-6 left-6 text-white/50 text-xs tracking-widest pointer-events-none uppercase z-20">
        Move mouse to inspect desk
      </div>
    </main>
  );
}

useGLTF.preload("/room.glb");
