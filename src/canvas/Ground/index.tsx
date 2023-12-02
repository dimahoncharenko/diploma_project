import { CuboidCollider, RigidBody, RigidBodyProps } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useLayoutEffect } from "react";
import * as THREE from "three";

type Props = RigidBodyProps;
export const Ground = (props: Props) => {
  const { aoMap, baseMap, heightMap, normalMap, roughnessMap } = useTexture({
    baseMap: "/textures/ground/basecolor.jpg",
    aoMap: "/textures/ground/ambientOcclusion.jpg",
    heightMap: "/textures/ground/height.png",
    normalMap: "/textures/ground/normal.jpg",
    roughnessMap: "/textures/ground/roughness.jpg",
  });

  useLayoutEffect(() => {
    aoMap.wrapS =
      aoMap.wrapT =
      baseMap.wrapS =
      baseMap.wrapT =
      heightMap.wrapS =
      heightMap.wrapT =
      normalMap.wrapS =
      normalMap.wrapT =
      roughnessMap.wrapS =
      roughnessMap.wrapT =
        THREE.RepeatWrapping;

        aoMap.repeat =
        baseMap.repeat =
        heightMap.repeat =
        normalMap.repeat =
        roughnessMap.repeat = new THREE.Vector2(300, 300)
  }, []);

  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[500, 500, 300, 300]} />
        <meshStandardMaterial
          map={baseMap}
          aoMap={aoMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          displacementMap={heightMap}
        />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
};
