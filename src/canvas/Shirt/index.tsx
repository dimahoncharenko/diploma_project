/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ./shirt_baked_collapsed.glb --types 
*/

import * as THREE from "three";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { easing } from "maath";
import { GLTF } from "three-stdlib";
import { useSnapshot } from "valtio";

import { storeShirt } from "../../stores";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

export function Shirt(props: JSX.IntrinsicElements["mesh"]) {
  const snap = useSnapshot(storeShirt);
  const texture = useTexture(`/models/shirt/${snap.current_decal}.png`);
  const { nodes, materials } = useGLTF(
    "/models/shirt/shirt_baked_collapsed-transformed.glb"
  ) as GLTFResult;
  useFrame((_, delta) => {
    easing.dampC(materials.lambert1.color, snap.current_color, 0.25, delta);
  });
  return (
    <mesh
      {...props}
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      dispose={null}
    >
      <Decal
        depthTest
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15 * snap.decalSize}
        map={texture}
      />
    </mesh>
  );
}

useGLTF.preload("/models/shirt/shirt_baked_collapsed-transformed.glb");