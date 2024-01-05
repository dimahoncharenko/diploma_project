import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import {
  KeyboardControls,
  AdaptiveDpr,
  Preload,
  Html,
  Sky,
  Bvh,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { geometry } from "maath";
import { useRoute } from "wouter";
import { useSnapshot } from "valtio";

import { Island } from "./canvas/Island";
import { Player } from "./canvas/Player";
import { Rig } from "./canvas/Rig";

import { StoreSelector } from "./components/StoreSelector";

import { Rooms } from "./canvas/Room/Rooms";
import { Offices } from "./canvas/Office/Offices";

import { storeState } from "./stores";
import { Display } from "./components/Display";

extend(geometry);

export const App = () => {
  const [, params] = useRoute("/item/:id");
  const { ready } = useSnapshot(storeState);

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W", "ц", "Ц"] },
        { name: "backward", keys: ["ArrowDown", "s", "S", "і", "І"] },
        { name: "left", keys: ["ArrowLeft", "a", "A", "ф", "Ф"] },
        { name: "right", keys: ["ArrowRight", "d", "D", "в", "В"] },
        { name: "greetings", keys: ["1"] },
        { name: "purchase", keys: ["2"] },
        { name: "show_case", keys: ["3"] },
        { name: "show_shirt", keys: ["4"] },
        { name: "show_shoe", keys: ["5"] },
      ]}
    >
      <Canvas
        shadows={true}
        camera={{ fov: 45, position: [0, 0, 5] }}
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
          <Bvh firstHitOnly>
            <Sky turbidity={1} sunPosition={[0, 0.03, 2]} rayleigh={3} />
            <AdaptiveDpr />
            <ambientLight intensity={0.2} />
            <Rooms />
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
            <Rig />
          </Bvh>
        </Suspense>
        <Preload all />
      </Canvas>
    </KeyboardControls>
  );
};
