import * as THREE from "three";
import { ReactNode, useRef } from "react";
import { MeshPortalMaterial, Circle } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useLocation, useRoute } from "wouter";

type FrameProps = {
  id: string;
  name: string;
  author: string;
  bg?: string;
  width?: number;
  height?: number;
  children: ReactNode;
} & Omit<GroupProps, "id">;

export const Frame = ({
  id,
  name,
  author,
  bg = "#ffffff",
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}: FrameProps) => {
  const portal = useRef(null);
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");

  useFrame((_, dt) => {
    if (!portal.current || !params?.id || portal.current.blend === 1) return;
    easing.damp(portal.current, "blend", 1, 0.2, dt);
  }, -2);

  useFrame((_, dt) => {
    if (!portal.current || params?.id || portal.current.blend === 0) return;
    easing.damp(portal.current, "blend", 0, 0.2, dt);
  }, -1);

  return (
    <group {...props} frustumCulled>
      <mesh
        name={id}
        onDoubleClick={(e) => (e.stopPropagation(), setLocation("/item/" + id))}
      >
        {/*@ts-ignore*/}
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
          precision={"lowp"}
          depthTest
          toneMapped
          visible={false}
        >
          <color attach="background" args={[bg]} />
          {children}
          <Circle
            visible={!!params?.id}
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
