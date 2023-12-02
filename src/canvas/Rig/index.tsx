import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
// @ts-ignore
import Stats from "three/examples/jsm/libs/stats.module";

export const Rig = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const root = useRef<HTMLElement>(document.getElementById("root"));
  const stats = useRef(new Stats());

  useEffect(() => {
    if (root.current) {
      root.current.appendChild(stats.current.domElement);
    }
  }, [root.current]);

  useFrame(() => {
    if (!root.current) return;
    stats.current.update();
  });

  const [, params] = useRoute("/item/:id");
  useEffect(() => {
    const active = scene.getObjectByName(`${params?.id}`);
    if (active && active.parent) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }

    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  
  return (
    <>
      <CameraControls
        enabled={!!params?.id}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        maxDistance={2}
        minDistance={.5}
      />
    </>
  );
};
