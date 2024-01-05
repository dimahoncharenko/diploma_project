import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
// @ts-ignore
import Stats from "three/examples/jsm/libs/stats.module";
// import { useSnapshot } from "valtio";
// import { storeState } from "../../stores";

// const dollyDistance = 10;
// const slideDistance = 2;

export const Rig = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const root = useRef<HTMLElement>(document.getElementById("root"));
  const stats = useRef(new Stats());
  const [, params] = useRoute("/item/:id");
  // const viewport = useThree((context) => context.viewport);
  // const cameraRef = useRef<CameraControls>(null);
  // const { current_slide } = useSnapshot(storeState);
  // const lastSlide = useRef(0);

  useEffect(() => {
    if (root.current) {
      root.current.appendChild(stats.current.domElement);
    }
  }, [root.current]);

  useFrame(() => {
    if (!root.current) return;
    stats.current.update();
  });
  
  useEffect(() => {
    const active = scene.getObjectByName(`${params?.id}`);

    if (active && active.parent) {
      active.parent.localToWorld(position.set(0, 0.5, 5));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    // @ts-ignore
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });

  // const moveToSlide = async () => {
  //   if (!cameraRef.current) return;

  //   await cameraRef.current.setLookAt(
  //     lastSlide.current * (viewport.width + slideDistance),
  //     3,
  //     dollyDistance,
  //     lastSlide.current * (viewport.width + slideDistance),
  //     0,
  //     0,
  //     true
  //   );

  //   await cameraRef.current.setLookAt(
  //     (current_slide + 1) * (viewport.width + slideDistance),
  //     1,
  //     dollyDistance,
  //     current_slide * (viewport.width + slideDistance),
  //     0,
  //     0,
  //     true
  //   );

  //   await cameraRef.current.setLookAt(
  //     current_slide * (viewport.width + slideDistance),
  //     0,
  //     5,
  //     current_slide * (viewport.width + slideDistance),
  //     0,
  //     0,
  //     true
  //   );
  // };

  // useEffect(() => {
  //   if (!cameraRef.current) return;
  //   const resetTimeout = setTimeout(() => {
  //     cameraRef.current!.setLookAt(
  //       current_slide * (viewport.width + slideDistance),
  //       0,
  //       5,
  //       current_slide * (viewport.width + slideDistance),
  //       0,
  //       0,
  //       false
  //     );
  //   }, 200);

  //   return () => {
  //     clearTimeout(resetTimeout);
  //   };
  // }, [viewport]);

  // useEffect(() => {
  //   if (lastSlide.current === current_slide) return;
  //   moveToSlide();
  //   lastSlide.current = current_slide;
  // }, [current_slide]);

  return (
    <>
      <CameraControls
        // ref={cameraRef}
        enabled={!!params?.id}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        maxDistance={2}
        minDistance={.5}
        // touches={{
        //   one: 0,
        //   two: 0,
        //   three: 0,
        // }}
        // mouseButtons={{
        //   left: 0,
        //   middle: 0,
        //   right: 0,
        //   wheel: 0,
        // }}
      />
    </>
  );
};
