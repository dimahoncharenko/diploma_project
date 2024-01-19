import * as THREE from "three";
import { useRef, useMemo } from "react";
import { extend, useLoader, useFrame, MeshProps } from "@react-three/fiber";
import { Water, WaterOptions } from "three-stdlib";

extend({ Water });

type Props = {
  geom: THREE.BufferGeometry;
} & MeshProps;
export function WaterShader({ geom, ...props }: Props) {
  const ref = useRef<THREE.Mesh>(null);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals2.jpg");

  waterNormals.wrapS = waterNormals.wrapT = THREE.MirroredRepeatWrapping;
  waterNormals.generateMipMaps = false;

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(3,2,1),
      sunColor: 0xacc7ff,
      waterColor: 0xadae9f,
      distortionScale: 3,
      fog: true,
      alpha: .95,
    } as WaterOptions),
    [waterNormals]
  );
  useFrame(
    (_, delta) => {
      if (ref.current &&
        ref.current.material) {
          // @ts-ignore
          ref.current.material.uniforms && (ref.current.material.uniforms.time.value += delta / 4)
      }
    });
  return (
    <>
    {/* @ts-ignore */}
    <water
      ref={ref}
      args={[geom, config]}
      {...props}
    />
    </>
  );
}
