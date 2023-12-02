import { useEffect, useRef, useState } from "react";
import {
  useGLTF,
  useFBX,
  useAnimations,
  Text,
  useKeyboardControls,
} from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { useSnapshot } from "valtio";

import { storeState } from "../../stores";

import posterFont from "/fonts/SansPosterBold3D.ttf";
import { useLocation } from "wouter";

type AvatarProps = GroupProps;

export const Trader = ({ ...props }: AvatarProps) => {
  const [sub] = useKeyboardControls();
  const { scene } = useGLTF("/models/trader/trader.glb");
  const character = useRef<THREE.Group>(null);
  const [, setLocation] = useLocation();

  const animations = {
    "Sitting Idle": useFBX("/anims/defaultSitting.fbx").animations[0],
    Purchase: useFBX("/anims/purchaseSucceed.fbx").animations[0],
    "Sit To Stand": useFBX("/anims/sit_stand.fbx").animations[0],
    "Stand To Sit": useFBX("/anims/stand_sit.fbx").animations[0],
    "Official Bow": useFBX("/anims/bow.fbx").animations[0],
  };

  animations["Official Bow"].name = "Official Bow";
  animations["Purchase"].name = "Purchase";
  animations["Sit To Stand"].name = "Sit To Stand";
  animations["Sitting Idle"].name = "Sitting Idle";
  animations["Stand To Sit"].name = "Stand To Sit";

  const { actions, mixer } = useAnimations(
    Object.values(animations),
    character
  );

  const [currentAnim, setCurrentAnim] =
    useState<keyof typeof animations>("Sitting Idle");

  const [text, setText] = useState<string | null>(null);
  const { open } = useSnapshot(storeState);

  useEffect(() => {
    return sub(
      (state) => state["purchase"],
      (pressed) => {
        if (open && pressed) {
          storeState.open = false;
          setText("Terrific choice!!!");
          setCurrentAnim("Purchase");
        }
      }
    );
  }, [open]);

  useEffect(() => {
    return sub(
      (state) => state["greetings"],
      (pressed) => {
        if (open && pressed) {
          storeState.open = false;
          setCurrentAnim("Sit To Stand");
        }
      }
    );
  }, [open]);

  useEffect(() => {
    return sub(
      (state) => state["show"],
      (pressed) => {
        if (open && pressed) {
          storeState.open = false;
          setLocation("/item/01");
        }
      }
    );
  }, [open]);

  function handler() {
    if (currentAnim === "Sit To Stand") {
      character.current?.translateZ(0.8);
      setCurrentAnim("Official Bow");
    } else if (currentAnim === "Official Bow") {
      character.current?.translateZ(0.1);
      setCurrentAnim("Stand To Sit");
    } else {
      if (currentAnim !== "Purchase") character.current?.translateZ(-0.9);
      setCurrentAnim("Sitting Idle");
      setText(null);
    }
  }

  useEffect(() => {
    mixer.addEventListener("finished", handler);
    return () => {
      mixer.removeEventListener("finished", handler);
    };
  }, [currentAnim]);

  useEffect(() => {
    if (currentAnim && actions && actions[currentAnim]) {
      if (currentAnim !== "Sitting Idle") {
        actions[currentAnim]!.repetitions = 1;
        actions[currentAnim]!.clampWhenFinished = true;
      }

      actions[currentAnim]!.reset().play();
    }

    return () => {
      actions[currentAnim]?.stop();
    };
  }, [currentAnim, actions]);

  return (
    <group {...props} ref={character}>
      <mesh>
        <primitive object={scene} />
        <mesh
          position={[0, 1.2, 0.2]}
          scale={0.3}
          onPointerEnter={(e) => {
            if (currentAnim !== "Sitting Idle" || e.distance > 2) return;
            storeState.open = true;
          }}
          onPointerLeave={(e) => {
            if (currentAnim !== "Sitting Idle" || e.distance > 2) return;
            storeState.open = false;
          }}
        >
          <sphereGeometry args={[1, 1, 2]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </mesh>
      <mesh>
        <Text font={posterFont} position={[0.05, 1.6, 0.52]} fontSize={0.08}>
          {text}
        </Text>
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/trader/trader.glb");
