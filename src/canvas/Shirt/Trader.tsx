/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./trader_lipsync.glb --transorm --types 
*/

import * as THREE from "three";
import { useAnimations, useFBX, useGLTF, useKeyboardControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { storeState } from "../../stores";
import {
  george_greet_audio,
  george_purchase_audio,
  george_showcase_audio,
  match_lips,
} from "../../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useLocation } from "wouter";
import { useSnapshot } from "valtio";

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Hair: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
  };
};

export function Trader(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/shirt_trader/trader_lipsync.glb"
  ) as GLTFResult;

  const [sub] = useKeyboardControls();
  const character = useRef<THREE.Group>(null);
  const [, setLocation] = useLocation();

  const [soundType, setSoundType] = useState<"purchase" | "greet" | "showcase">(
    "greet"
  );
  const jsonFile = useMemo(
    () => useLoader(THREE.FileLoader, `/audio/george_${soundType}.json`),
    [soundType]
  );
  const lipSync = JSON.parse(jsonFile);

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

  const [_, setText] = useState<string | null>(null);
  const { shirt_menu } = useSnapshot(storeState);

  useEffect(() => {
    return sub(
      (state) => state["purchase"],
      (pressed) => {
        if (shirt_menu && pressed) {
          storeState.shirt_menu = false;
          george_purchase_audio.play();
          setSoundType("purchase");
          setText("Terrific choice!!!");
          setCurrentAnim("Purchase");
        }
      }
    );
  }, [shirt_menu]);

  useEffect(() => {
    return sub(
      (state) => state["greetings"],
      (pressed) => {
        if (shirt_menu && pressed) {
          storeState.shirt_menu = false;
          setSoundType("greet");
          george_greet_audio.play();
          setCurrentAnim("Sit To Stand");
        }
      }
    );
  }, [shirt_menu]);

  useEffect(() => {
    return sub(
      (state) => state["show_shirt"],
      (pressed) => {
        if (shirt_menu && pressed) {
          storeState.shirt_menu = false;
          setSoundType("showcase");
          george_showcase_audio.play();
          setLocation("/item/02");
        }
      }
    );
  }, [shirt_menu]);

  useFrame(() => {
    if (
      !nodes.Wolf3D_Head.morphTargetInfluences ||
      !nodes.Wolf3D_Head.morphTargetDictionary ||
      !nodes.Wolf3D_Teeth.morphTargetInfluences ||
      !nodes.Wolf3D_Teeth.morphTargetDictionary
    )
      return;
    const currentAudio =
      soundType === "greet"
        ? george_greet_audio
        : soundType === "purchase"
        ? george_purchase_audio
        : george_showcase_audio;

    const currentAudioTime = currentAudio.currentTime;

    Object.values(match_lips).forEach((char) => {
      nodes.Wolf3D_Head.morphTargetInfluences![
        nodes.Wolf3D_Head.morphTargetDictionary![char]
      ] = 0;

      nodes.Wolf3D_Teeth.morphTargetInfluences![
        nodes.Wolf3D_Teeth.morphTargetDictionary![char]
      ] = 0;
    });

    for (let i = 0; i < lipSync.mouthCues.length; i++) {
      const mouthCue = lipSync.mouthCues[i];
      if (
        currentAudioTime >= mouthCue.start &&
        currentAudioTime <= mouthCue.end
      ) {
        const val: keyof typeof match_lips = mouthCue.value;
        if (val === "X") return;

        nodes.Wolf3D_Head.morphTargetInfluences![
          nodes.Wolf3D_Head.morphTargetDictionary![match_lips[val]]
        ] = 1;

        nodes.Wolf3D_Teeth.morphTargetInfluences![
          nodes.Wolf3D_Teeth.morphTargetDictionary![match_lips[val]]
        ] = 1;

        break;
      }
    }
  });

  function handler() {
    if (currentAnim === "Sit To Stand") {
      character.current?.translateY(-0.8);
      setCurrentAnim("Official Bow");
    } else if (currentAnim === "Official Bow") {
      character.current?.translateY(-0.1);
      setCurrentAnim("Stand To Sit");
    } else {
      if (currentAnim !== "Purchase") character.current?.translateY(0.9);
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
    <group {...props} dispose={null} ref={character}>
      <primitive object={nodes.Hips} />
      <mesh
        position={[0, 0, 1.2]}
        scale={0.3}
        onPointerEnter={(e) => {
          if (currentAnim !== "Sitting Idle" || e.distance > 4) return;
          storeState.shirt_menu = true;
        }}
        onPointerLeave={(e) => {
          if (currentAnim !== "Sitting Idle" || e.distance > 4) return;
          storeState.shirt_menu = false;
        }}
      >
        <sphereGeometry args={[1, 1, 2]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Hair.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Hair.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/shirt_trader/trader_lipsync.glb");
