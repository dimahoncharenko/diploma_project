import { Suspense, useEffect, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import {
  Sky,
  PointerLockControls,
  KeyboardControls,
  useProgress,
  Html,
  AdaptiveDpr,
  Preload,
  Bvh,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { geometry } from "maath";
import { useRoute } from "wouter";
import { useSnapshot } from "valtio";
import * as THREE from "three";

import { Ground } from "./canvas/Ground";
import { Player } from "./canvas/Player";
import { Rig } from "./canvas/Rig";
import { Model as IPhone } from "./canvas/iPhoneCase15Pro";

import { storeState } from "./stores";
import { Frame } from "./canvas/Frame";
// import { Shoe } from "./canvas/Shoe";
import { Selector } from "./canvas/Selector";
import { Trader } from "./canvas/Trader";
import { Model as Shore } from "./canvas/Office";

extend(geometry);

export const App = () => {
  const [, params] = useRoute("/item/:id");
  const pointerRef = useRef(null);
  const { progress } = useProgress();
  const { open } = useSnapshot(storeState);

  useEffect(() => {
    if (!pointerRef.current) return;

    const everyInterval = () => {
      pointerRef.current.unlock();
    };
    let interval: number;
    if (params?.id) {
      pointerRef.current.unlock();
      interval = setInterval(everyInterval, 100);
    } else {
      pointerRef.current.lock();
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [params?.id]);

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "greetings", keys: ["1"] },
        { name: "purchase", keys: ["2"] },
        { name: "show", keys: ["3"] },
      ]}
    >
      <Canvas
        shadows={false}
        camera={{ fov: 45 }}
        frameloop={!!params?.id ? "always" : "demand"}
        performance={{
          current: 1,
          min: 0.1,
          max: 1,
          debounce: 200,
        }}
      >
        <Suspense fallback={<Html>{progress}</Html>}>
          <AdaptiveDpr />
          <fog attach="fog" color="#342e30" near={0} far={150} />
          <Sky inclination={0} distance={100} />
          <ambientLight intensity={0.6} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />

          <Physics gravity={[0, -30, 0]}>
            <Ground />
            {params?.id ? null : <Player />}
            <Shore
              scale={0.6}
              position={[0, 0, 20]}
              rotation={[0, Math.PI, 0]}
            >
              <Bvh firstHitOnly>
                <Frame
                  id="01"
                  name="iPhone"
                  author="Unknown"
                  position={[2, 2, -4]}
                  bg="#e4cdac"
                >
                  <IPhone
                    position={[0, 0.2, -2]}
                    scale={0.0008}
                    visible={!!params?.id}
                  />
                </Frame>
              </Bvh>
              <Selector>
                <Trader
                  position={[-.6, 0.27, -2.8]}
                  rotation={[0, 0, 0]}
                  scale={new THREE.Vector3(1.5, 1.5, 1.5)}
                />
              </Selector>
            </Shore>
            {/* <Shore scale={0.6}> */}
            {/* <Frame
                id="02"
                name="Shoe"
                author="Unknown"
                position={[2, 2, -4]}
                scale={1}
              >
                <Shoe position={[0, 0, -2]} scale={0.5} />
              </Frame> */}
            {/* </Shore> */}
          </Physics>
          <PointerLockControls
            ref={pointerRef}
            enabled={!params?.id}
            pointerSpeed={1}
            isLocked={params?.id ? false : true}
          />
          <Rig />
        </Suspense>
        <Preload all />
      </Canvas>
    </KeyboardControls>
  );
};
