"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import MacBookModel from "@/components/MacBookModel";
import InteractiveLaptopUI from "@/components/LaptopUI/InteractiveLaptopUI";

function RoomModel() {
  const { scene } = useGLTF("/room.glb");
  return (
    <primitive object={scene} rotation={[0, 0, 0]} position={[0, -2, 0]} />
  );
}

function TableTorch({
  isPickedUp,
  onPickup,
}: {
  isPickedUp: boolean;
  onPickup: () => void;
}) {
  const { scene } = useGLTF("/FlashLight.glb");
  const glowRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (glowRef.current && !isPickedUp) {
      glowRef.current.intensity = 15 + Math.sin(clock.getElapsedTime() * 4) * 6;
    }
  });

  if (isPickedUp) return null;

  return (
    <group
      position={[-0.4, -0.65, 2]}
      rotation={[0, Math.PI / 4, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onPickup();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "crosshair")}
    >
      <primitive object={scene.clone()} scale={0.15} />

      <mesh visible={false}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <pointLight ref={glowRef} distance={2.0} color="#ffe8a3" intensity={15} />
    </group>
  );
}

function CameraRig({ isLaptopZoomed }: { isLaptopZoomed: boolean }) {
  useFrame(({ pointer, camera }) => {
    if (isLaptopZoomed) {
      const targetPos = new THREE.Vector3(0, -0.2, 3.4);
      camera.position.lerp(targetPos, 0.08);

      const targetLookAt = new THREE.Vector3(0, -0.2, 1.8);
      camera.lookAt(targetLookAt);
    } else {
      const targetPos = new THREE.Vector3(0, 2.2, 6);
      camera.position.lerp(targetPos, 0.08);

      const basePitch = -0.35;
      const maxPitch = Math.PI / 6;
      const maxYaw = Math.PI / 4;

      camera.rotation.x = basePitch + pointer.y * maxPitch;
      camera.rotation.y = -pointer.x * maxYaw;
    }
  });

  return null;
}

function Flashlight({ active }: { active: boolean }) {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);
  const raycaster = useRef(new THREE.Raycaster());

  useFrame(({ pointer, camera, scene }) => {
    if (!lightRef.current || !targetRef.current) return;

    if (!active) {
      lightRef.current.intensity = 0;
      return;
    }

    lightRef.current.intensity = 350;
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
        intensity={0}
        angle={Math.PI / 8}
        penumbra={1.0}
        color="#ffe8a3"
        castShadow
      />
    </>
  );
}

function Headphones() {
  const { scene } = useGLTF("/headphones.glb");
  return (
    <primitive
      object={scene.clone()}
      position={[-0.1, -0.65, 3.4]}
      rotation={[0, -Math.PI / 4, 0]}
      scale={0.3}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "crosshair")}
    />
  );
}

export default function Home() {
  const [hasTorch, setHasTorch] = useState(false);
  const [isLaptopZoomed, setIsLaptopZoomed] = useState(false);

  return (
    <main className="w-screen h-screen bg-black overflow-hidden relative cursor-crosshair">
      <Canvas
        shadows
        camera={{
          position: [0, 2.2, 3.5],
          fov: 50,
        }}
      >
        <fog attach="fog" args={["#0a0d14", 6, 18]} />
        <CameraRig isLaptopZoomed={isLaptopZoomed} />
        <ambientLight intensity={0.35} color="#4a5878" />
        <directionalLight
          position={[-2, 6, 5]}
          intensity={0.55}
          color="#7a97c2"
        />

        <TableTorch isPickedUp={hasTorch} onPickup={() => setHasTorch(true)} />

        <React.Suspense fallback={null}>
          <MacBookModel
            isZoomed={isLaptopZoomed}
            onZoomIn={() => !isLaptopZoomed && setIsLaptopZoomed(true)}
          />
          <Headphones />
          <RoomModel />
        </React.Suspense>

        <Flashlight active={hasTorch} />
      </Canvas>

      {isLaptopZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setIsLaptopZoomed(false)}
            className="absolute top-6 right-6 z-50 px-4 py-2 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700/80 rounded-lg text-xs font-mono tracking-wider transition uppercase shadow-xl cursor-pointer"
          >
            ESC / Close Screen
          </button>

          <div className="w-full max-w-5xl h-[80vh] shadow-2xl rounded-xl overflow-hidden border border-neutral-700/50">
            <InteractiveLaptopUI />
          </div>
        </div>
      )}

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-48 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10, 13, 20, 0.85) 0%, rgba(10, 13, 20, 0.4) 50%, transparent 100%)",
        }}
      />

      <div className="absolute bottom-6 left-6 text-white/50 text-xs tracking-widest pointer-events-none uppercase z-20">
        {!isLaptopZoomed
          ? !hasTorch
            ? "Click the torch on the desk or inspect the items"
            : "Move mouse to inspect desk or click items"
          : "Viewing Laptop Display"}
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <div
          className={`px-4 py-2 rounded-lg border backdrop-blur-md transition-all duration-300 flex items-center gap-2 ${
            hasTorch
              ? "bg-white/10 border-yellow-500/50 text-yellow-200 shadow-[0_0_15px_rgba(255,232,163,0.2)]"
              : "bg-black/40 border-white/10 text-white/30"
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              hasTorch ? "bg-yellow-400 animate-pulse" : "bg-white/20"
            }`}
          />
          <span className="text-xs uppercase tracking-wider font-mono">
            {hasTorch ? "Flashlight Equipped" : "Slot Empty"}
          </span>
        </div>
      </div>
    </main>
  );
}

useGLTF.preload("/room.glb");
useGLTF.preload("/FlashLight.glb");
useGLTF.preload("/headphones.glb");
useGLTF.preload("/models/MacBook.glb");
