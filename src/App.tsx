import { Suspense, useEffect, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import {
  PointerLockControls,
  KeyboardControls,
  AdaptiveDpr,
  Preload,
  Bvh,
  Environment,
  Html,
  Sky
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { geometry } from "maath";
import { useRoute } from "wouter";
import { useSnapshot } from "valtio";

import { Island } from "./canvas/Island";
import { Player } from "./canvas/Player";
import { Rig } from "./canvas/Rig";
import { Model as IPhone } from "./canvas/iPhoneCase15Pro";

import { Room } from "./canvas/Room";
import { Shoe } from "./canvas/Shoe";
import { Selector } from "./canvas/Selector";
import { Trader } from "./canvas/Trader";
import { Office } from "./canvas/Office";
import { Model as ShoeTrader } from "./canvas/Shoe/Trader";
import { Trader as ShirtTrader } from "./canvas/Shirt/Trader";
import { Shirt } from "./canvas/Shirt";
import { StoreSelector } from "./components/StoreSelector";

import { storeState } from "./stores";

extend(geometry);

export const App = () => {
  const [, params] = useRoute("/item/:id");
  const pointerRef = useRef(null);
  const { activeStore } = useSnapshot(storeState);

  useEffect(() => {
    if (!pointerRef.current) return;

    const everyInterval = () => {
      // @ts-ignore
      pointerRef.current!.unlock();
    };
    let interval: number;
    if (params?.id) {
      interval = setInterval(everyInterval, 100);
    } else {
      // @ts-ignore
      pointerRef.current.lock();
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [params?.id]);

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
        { name: "show_shoe", keys: ["6"] },
        { name: "show_shirt", keys: ["9"] },
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
        <Suspense fallback={null}>
          <Sky  turbidity={1} sunPosition={[0,0.03, 2]} rayleigh={3}/>
          <AdaptiveDpr /> 
          <fog attach="fog" color="#342e30" near={0} far={100} />
          <ambientLight intensity={0.2} />
          <Bvh>
            {activeStore === "cases" && (
              <Room id="01" position={[-2000, 1000, -4]} bg="#e4cdac">
                <IPhone position={[0, 0.2, -2]} scale={0.0008} />
              </Room>
            )}

            {activeStore === "shoes" && (
              <Room id="02" position={[20, 1000, -4]} scale={1}>
                <Shoe position={[0, 0, -2]} scale={0.5} />
              </Room>
            )}

            {activeStore === "shirts" && (
              <Room id="03">
                <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
                <ambientLight color="white" intensity={1} />
                <pointLight
                  color="white"
                  intensity={1.5}
                  position={[0, 0, -3]}
                />
                <Shirt position={[0, 0, -2]} />
              </Room>
            )}
          </Bvh>
          <Html
            position={[1.9, 14, 1.5]}
            dispose={null}
            transform
            rotation={[0, -0.3, -0.02]}
          >
            <StoreSelector />
          </Html>
          <Physics gravity={[0, -30, 0]}>
            <Island scale={25} />
            {params?.id ? null : <Player />}
            {activeStore === "cases" && (
              <Office
                sceneType="Cases"
                scale={1}
                position={[6, 8.63, 1]}
                rotation={[0.05, -0.3, -0.01]}
              >
                <Selector>
                  <Trader
                    position={[3.5, 0.27, -1.4]}
                    rotation={[-1.55, 0, -1.5]}
                    scale={1.7}
                  />
                </Selector>
              </Office>
            )}

            {activeStore === "shoes" && (
              <Office
                scale={1}
                position={[6, 8.63, 1]}
                rotation={[0.05, -0.3, -0.01]}
              >
                <Selector>
                  <ShoeTrader
                    rotation={[-1.5, 0, -Math.PI / 2]}
                    scale={[1.7, 1.7, 1.7]}
                    position={[3.5, 0.4, -1.3]}
                  />
                </Selector>
              </Office>
            )}
            {activeStore === "shirts" && (
              <Office
                sceneType="Shirt"
                scale={1}
                position={[6, 8.63, 1]}
                rotation={[0.05, -0.3, -0.01]}
              >
                <Selector>
                  <ShirtTrader
                    rotation={[-1.55, 0, -1.5]}
                    scale={[1.7, 1.7, 1.7]}
                    position={[3.5, 0.4, -1.3]}
                  />
                </Selector>
              </Office>
            )}
          </Physics>
          <PointerLockControls
            ref={pointerRef}
            enabled={!params?.id}
            pointerSpeed={1}
          />
          <Rig />
        </Suspense>
        <Preload all />
      </Canvas>
    </KeyboardControls>
  );
};
