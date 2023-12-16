import * as THREE from "three";
import { ReactNode, useLayoutEffect, useRef } from "react";
import { MeshPortalMaterial, Circle } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRoute } from "wouter";

type RoomProps = {
  id: string;
  bg?: string;
  children: ReactNode;
} & Omit<GroupProps, "id">;

export const Room = ({ id, bg = "#ffffff", children, ...props }: RoomProps) => {
  const portal = useRef(null);
  const [, params] = useRoute("/item/:id");

  useLayoutEffect(() => {
    if (!params?.id && portal.current) {
      // @ts-ignore
      portal.current.blend = 0;
    }
  }, [params?.id]);

  useFrame((_, dt) => {
    if (!portal.current || !params?.id) return;
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt);
  });

  return (
    <group {...props} frustumCulled>
      <mesh name={id}>
        <sphereGeometry args={[1, 1, 1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
          visible={false}
        >
          <color attach="background" args={[bg]} />
          {children}
          <Circle
            scale={[1, 0.7, 1]}
            args={[0.6, 80]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.33, -2]}
          />
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
};
