import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { useFrame } from "@react-three/fiber";
import {
  PointerLockControls,
  PointerLockControlsProps,
  useKeyboardControls,
} from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useSnapshot } from "valtio";

import { storeState } from "../../stores";

const SPEED = 7;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = () => {
  const ref = useRef<RAPIER.RigidBody>(null);
  const colliderRef = useRef<any>(null);
  const pointerRef = useRef<PointerLockControlsProps>(null);
  const [, get] = useKeyboardControls();
  const [, params] = useRoute("/item/:id");
  const { isCrossedBorders } = useSnapshot(storeState);

  // When the user choose a showroom it unlocks the pointer (show the cursor of mouse),
  // otherwise it's hidden
  useEffect(() => {
    if (pointerRef.current) {
      if (!params?.id) {
        pointerRef.current.lock && pointerRef.current.lock();
      } else {
        pointerRef.current.unlock && pointerRef.current.unlock();
      }
    }
  }, [params?.id]);

  useFrame((state: any) => {
    if (!ref.current || !colliderRef.current) return;
    // Keyboard checkers
    const { forward, backward, left, right } = get();

    if (forward && backward) return;

    // Convert to integers 
    let moveForward = +forward;
    let moveBackward = +backward;
    let moveLeft = +left;
    let moveRight = +right;

    // Velocity of the player
    let velocity = ref.current.linvel();

    // If the player touched water
    if (isCrossedBorders) {
      moveForward && ((moveForward = 0), (moveBackward = -1));
      moveBackward && ((moveBackward = 0), (moveForward = -1));
      moveLeft && ((moveLeft = 0), (moveRight = -1));
      moveRight && ((moveRight = 0), (moveLeft = -1));
    }

    // update camera
    const { x, y, z } = ref.current.translation();
    state.camera.position.set(x, y + 1.5, z);
    // movement
    frontVector.set(0, 0, moveBackward - moveForward);
    sideVector.set(moveLeft - moveRight, 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);

    // Change the player's velocity 
    ref.current.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    );
  });
  return (
    <>
      <PointerLockControls
        // @ts-ignore
        ref={pointerRef}
        pointerSpeed={1}
      />
      <RigidBody
        name="player"
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[1, 30, 21]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider ref={colliderRef} args={[0.45, 0.45]} />
      </RigidBody>
    </>
  );
};
