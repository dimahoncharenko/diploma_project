/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ./shoe-draco.glb --types 
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    shoe: THREE.Mesh
    shoe_1: THREE.Mesh
    shoe_2: THREE.Mesh
    shoe_3: THREE.Mesh
    shoe_4: THREE.Mesh
    shoe_5: THREE.Mesh
    shoe_6: THREE.Mesh
    shoe_7: THREE.Mesh
  }
  materials: {
    laces: THREE.MeshStandardMaterial
    mesh: THREE.MeshStandardMaterial
    caps: THREE.MeshStandardMaterial
    inner: THREE.MeshStandardMaterial
    sole: THREE.MeshStandardMaterial
    stripes: THREE.MeshStandardMaterial
    band: THREE.MeshStandardMaterial
    patch: THREE.MeshStandardMaterial
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/shoe-draco.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  )
}

useGLTF.preload('/shoe-draco.glb')
