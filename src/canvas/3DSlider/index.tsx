import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { CameraControls, RenderTexture } from "@react-three/drei";

import { storeState } from "../../stores";
import { Scene } from "./scene";
import { useRoute } from "wouter";

export const scenes = [
  {
    path: "/models/pants/pants2.glb",
    mainColor: "#f9c0ff",
    name: "Cybertruck",
    description:
      "Better utility than a truck with more performance than a sports car",
    price: 72000,
    range: 660,
  },
  {
    path: "/models/iPhone15Pro_case/scene-transformed.glb",
    mainColor: "#c0ffe1",
    name: "Model 3",
    description: "The car of the future",
    price: 29740,
    range: 576,
  },
  {
    path: "/models/shirt/shirt.glb",
    mainColor: "#ffdec0",
    name: "Semi",
    description: "The Future of Trucking",
    price: 150000,
    range: 800,
  },
];

type CameraRigProps = {
  slideDistance: number;
};
const CameraRig = ({ slideDistance }: CameraRigProps) => {
  const viewport = useThree((context) => context.viewport);
  const cameraRef = useRef<CameraControls>(null);
  const { current_slide } = useSnapshot(storeState);
  const lastSlide = useRef(0);
  const [, params] = useRoute("/item/:id");

  const dollyDistance = 10;

  const moveToSlide = async () => {
    if (!cameraRef.current) return;

    await cameraRef.current.setLookAt(
      lastSlide.current * (viewport.width + slideDistance),
      3,
      dollyDistance,
      lastSlide.current * (viewport.width + slideDistance),
      0,
      0,
      true
    );

    await cameraRef.current.setLookAt(
      (current_slide + 1) * (viewport.width + slideDistance),
      1,
      dollyDistance,
      current_slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );

    await cameraRef.current.setLookAt(
      current_slide * (viewport.width + slideDistance),
      0,
      5,
      current_slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );
  };

  useEffect(() => {
    if (!cameraRef.current) return;
    const resetTimeout = setTimeout(() => {
      cameraRef.current!.setLookAt(
        current_slide * (viewport.width + slideDistance),
        0,
        5,
        current_slide * (viewport.width + slideDistance),
        0,
        0,
        false
      );
    }, 200);

    return () => {
      clearTimeout(resetTimeout);
    };
  }, [viewport]);

  useEffect(() => {
    if (lastSlide.current === current_slide) return;
    moveToSlide();
    lastSlide.current = current_slide;
  }, [current_slide]);

  return (
    <CameraControls
    enabled={!!params?.id && params?.id === "01"}
    makeDefault
      ref={cameraRef}
      touches={{
        one: 0,
        two: 0,
        three: 0,
      }}
      mouseButtons={{
        left: 0,
        middle: 0,
        right: 0,
        wheel: 0,
      }}
    />
  );
};

type ThreeDSliderProps = {
  slideDistance: number;
};
export const ThreeDSlider = ({ slideDistance }: ThreeDSliderProps) => {
  const viewport = useThree((context) => context.viewport);

  return (
    <>
      <CameraRig slideDistance={slideDistance} />
      {scenes.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Scene mainColor={scene.mainColor} path={scene.path} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
};