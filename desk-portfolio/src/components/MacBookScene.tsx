"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import MacBookModel from "./MacBookModel";

function CameraRig({
  isZoomed,
  controlsRef,
}: {
  isZoomed: boolean;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  useFrame(({ camera }) => {
    const targetPos = isZoomed
      ? new THREE.Vector3(0, 0.45, 2.0)
      : new THREE.Vector3(0, 2.0, 4.0);

    const targetLookAt = isZoomed
      ? new THREE.Vector3(0, 0.45, 0)
      : new THREE.Vector3(0, 0, 0);

    camera.position.lerp(targetPos, 0.06);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt, 0.06);
      controlsRef.current.update();
    } else {
      camera.lookAt(targetLookAt);
    }
  });

  return null;
}

export default function MacBookScene() {
  const [isZoomed, setIsZoomed] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="w-full h-full relative">
      {isZoomed && (
        <button
          onClick={() => setIsZoomed(false)}
          className="absolute top-6 right-6 z-50 px-4 py-2 bg-neutral-800/90 text-white rounded-lg text-sm font-medium border border-neutral-700 hover:bg-neutral-700 transition cursor-pointer"
        >
          ESC / Back to Room
        </button>
      )}

      <Canvas camera={{ position: [0, 2.0, 4.0], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="city" />

        <CameraRig isZoomed={isZoomed} controlsRef={controlsRef} />

        <MacBookModel isZoomed={isZoomed} onZoomIn={() => setIsZoomed(true)} />

        <OrbitControls
          ref={controlsRef}
          enabled={!isZoomed}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={6}
        />
      </Canvas>
    </div>
  );
}
