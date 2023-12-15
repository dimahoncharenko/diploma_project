import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

import { storeState } from "../../stores";
import { useSnapshot } from "valtio";

const SPEED = 7;
let direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = () => {
  const ref = useRef<RAPIER.RigidBody>(null);
  const colliderRef = useRef<any>(null);
  // const { isCrossedBorders } = useSnapshot(storeState);
  const [, get] = useKeyboardControls();

  useFrame((state: any) => {
    if (!ref.current || !colliderRef.current) return;
    const { forward, backward, left, right } = get();

    let velocity = ref.current.linvel();
    // update camera
    const { x, y, z } = ref.current.translation();
    state.camera.position.set(x, y + 1.5, z);
    // movement
    frontVector.set(0, 0, +backward - +forward);
    sideVector.set(+left - +right, 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);

    // if (isCrossedBorders) {
    //   const { x, y, z } = direction;
    //   // The biggest number
    //   velocity.y = -1;
    // }
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
        position={[1, 20, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider ref={colliderRef} args={[0.45, 0.45]} />
      </RigidBody>
    </group>
  );
};
