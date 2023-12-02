import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

const SPEED = 7;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = () => {
  const ref = useRef<RAPIER.RigidBody>(null);
  const [, get] = useKeyboardControls();

  useFrame((state: any) => {
    if (!ref.current) return;
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    const { x, y, z } = ref.current.translation();
    state.camera.position.set(x, y + .4, z);
    // movement
    frontVector.set(0, 0, +backward - +forward);
    sideVector.set(+left - +right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    );
  });
  return (
    <group>
      <RigidBody
        name="player"
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[1, 2, 3]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[.45, .45]} />
      </RigidBody>
    </group>
  );
};
