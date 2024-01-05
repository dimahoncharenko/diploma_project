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
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  waterNormals.generateMipMaps = false;
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xfdd61d,
      waterColor: 0x10218b,
      distortionScale: 3.7,
      fog: true,
      alpha: .95,
      side: THREE.FrontSide,
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
    // @ts-ignore
    <water
      ref={ref}
      args={[geom, config]}
      {...props}
    />
  );
}
