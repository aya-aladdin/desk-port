"use client";

import { useGLTF } from "@react-three/drei";

interface MacBookModelProps {
  isZoomed: boolean;
  onZoomIn: () => void;
}

export default function MacBookModel({
  isZoomed,
  onZoomIn,
}: MacBookModelProps) {
  const { scene } = useGLTF("/models/MacBook.glb");

  return (
    <group
      position={[-6, -0.7, 2.5]}
      rotation={[0, -200, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (!isZoomed) {
          onZoomIn();
        }
      }}
      onPointerOver={() => {
        if (!isZoomed) document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <primitive object={scene} scale={12} />
    </group>
  );
}

useGLTF.preload("/models/MacBook.glb");
