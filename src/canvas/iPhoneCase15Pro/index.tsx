/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ./scene.gltf --transform --types 
Files: ./scene.gltf [6.78KB] > scene-transformed.glb [46.13KB] (-580%)
Author: nurbs (https://sketchfab.com/mertapaydin)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/phone-case-8bb19b238bb9459788ecc6acc0c25425
Title: phone case
*/

import * as THREE from "three";
import { useSnapshot } from "valtio";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import { store15Pro } from "../../stores";

type GLTFResult = GLTF & {
  nodes: {
    Plane_PBR_0: THREE.Mesh;
    Plane_1_Mat_0: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshPhysicalMaterial;
    material_1: THREE.MeshStandardMaterial;
  };
};

function Model(props: JSX.IntrinsicElements["group"]) {
  const { decal, params } = useSnapshot(store15Pro);
  const { nodes, materials } = useGLTF(
    "/models/iPhone15Pro_case/scene-transformed.glb"
  ) as GLTFResult;

    console.log("I rendered");

  return (
    <group {...props} dispose={null}>
      <ambientLight intensity={1} />
      <mesh geometry={nodes.Plane_PBR_0.geometry} position={[0, 0, 0.004]}>
        {decal?.component({
          scale: new THREE.Vector3(
            1250 * params.textureScaling[0],
            1250 * params.textureScaling[1],
            100
          ),
          textureOffset: [...params.texturePosition!],
          rotateZ: params.textureRotation,
        })}
      </mesh>
      <mesh
        geometry={nodes.Plane_1_Mat_0.geometry}
        material={materials.material_1}
        position={[0, 0, 0.004]}
      >
        <meshBasicMaterial color={params.textureColor} side={THREE.DoubleSide}/>
      </mesh>
    </group>
  );
}

export default Model;

useGLTF.preload("/models/iPhone15Pro_case/scene-transformed.glb");
