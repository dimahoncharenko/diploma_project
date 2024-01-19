import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import {
  KeyboardControls,
  AdaptiveDpr,
  Preload,
  Html,
  Sky,
  Bvh
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { geometry } from "maath";
import { useRoute } from "wouter";
import { useSnapshot } from "valtio";

import { Island } from "./canvas/Island/Last_island2";
import { Player } from "./canvas/Player";

import { StoreSelector } from "./components/StoreSelector";

import { Rooms } from "./canvas/Room/Rooms";
import { Offices } from "./canvas/Office/Offices";
import { Display } from "./components/Display";

import { storeState } from "./stores";
import { keyboardMap } from "./utils";
import { Rig } from "./canvas/Rig";

extend(geometry);

export const App = () => {
  const [, params] = useRoute("/item/:id");
  const { ready } = useSnapshot(storeState);

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        camera={{ fov: 45 }}
        shadows={true}
        frameloop={!!params?.id ? "always" : "demand"}
        performance={{
          current: 1,
          min: 0.1,
          max: 1,
          debounce: 200,
        }}
      >
        <Suspense fallback={null}>
          <fogExp2 attach="fog" color="#7b645f" density={0.011} />
          <AdaptiveDpr />
          <Sky
            turbidity={1}
            sunPosition={[0, 0.05, 2]}
            rayleigh={3}
            distance={10000}
          />
          <ambientLight intensity={0.2} />
          <Bvh firstHitOnly>
            <Rooms />
          </Bvh>
          <Display criteria={ready}>
            <Html
              position={[1.9, 15, 1.5]}
              transform
              rotation={[0, -0.3, -0.02]}
            >
              <StoreSelector />
            </Html>
          </Display>
          <Physics gravity={[0, -30, 0]}>
            <Island scale={25} rotation={[0, 0, 0]} />
            <Display criteria={!params?.id}>
              <Player />
            </Display>
            <Offices />
          </Physics>
        </Suspense>
        <Rig />
        <Preload all />
      </Canvas>
    </KeyboardControls>
  );
};
