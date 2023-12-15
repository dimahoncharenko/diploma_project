import { GroupProps, useFrame } from "@react-three/fiber";
import { useRef, ReactNode } from "react";
import { easing } from "maath";
import { Center } from "@react-three/drei";

type Props = {
  children: ReactNode;
} & GroupProps;
export function CameraRig({ children, ...groupProps }: Props) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return (
    <group name="2D-camera" ref={group} {...groupProps}>
      <Center>{children}</Center>
    </group>
  );
}
