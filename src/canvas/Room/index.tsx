import * as THREE from "three";
import { ReactNode, useRef } from "react";
import { Circle, MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRoute } from "wouter";

type RoomProps = {
  id: string;
  bg?: string;
  children: ReactNode;
} & Omit<GroupProps, "id">;

export const Room = ({ id, bg = "#ffffff", children, ...props }: RoomProps) => {
  const portal = useRef<PortalMaterialType>(null);
  const [, params] = useRoute("/item/:id");

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
          // events={false}
          side={THREE.DoubleSide}
          visible={false}
        >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
};
