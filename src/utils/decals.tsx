import * as THREE from "three";
import { useEffect } from "react";
import { Decal, useTexture, DecalProps } from "@react-three/drei";

export const decalUrls = [
  "bestia_1",
  "bestia_2",
  "bubbles",
  "desert_1",
  "doggy_1",
  "doggy_2",
  "doggy_3",
  "doggy_4",
  "impressionism_1",
  "jupiter",
  "leopard_1",
  "leopard_2",
  "leopard_3",
  "mosaic.jpg",
  "moscow_burn",
  "mysterious_1",
  "mysterious_2",
  "mysterious_3",
  "okapi_2",
  "origami_1",
  "pop_1",
  "pop_2",
  "wolf_1",
  "wolf_2",
  "wolf_3",
  "wolf_4"
];

type ComponentProps = {
  textureRotation?: [number, number, number];
  textureOffset?: [number, number];
  textureRepeat?: [number, number];
  rotateZ?: number;
} & Omit<DecalProps, "rotateZ">;

export type Decal = {
  image: string;
  component: (props: ComponentProps) => JSX.Element;
};

const createTexture = (path: string) => {
  return ({
    textureRotation = [0, 0, 0],
    textureOffset = [0, 0],
    textureRepeat = [1, 1],
    rotateZ = 0,
    ...props
  }: ComponentProps) => {
    const texture = useTexture({
      map: path,
    });

    useEffect(() => {
      texture.map.wrapS = THREE.MirroredRepeatWrapping;
      texture.map.wrapT = THREE.MirroredRepeatWrapping;
      texture.map.rotation = rotateZ;
      texture.map.repeat.set(...textureRepeat);
      texture.map.offset.set(...textureOffset);
      texture.map.needsUpdate = true;
    }, [textureOffset, textureRepeat, rotateZ]);

    return (
      <Decal rotation={textureRotation} map={texture.map} {...props}></Decal>
    );
  };
};

export const createDecals = async (src: string[]) => {
  let res: Decal[] = [];

  for (let image of src) {
    /* @vite-ignore */
    const { default: img } = await import("../assets/" + image + ".jpg");

    res.push({
      image: img,
      component: createTexture(img),
    });
  }

  return res;
};

export const decals = await createDecals(decalUrls);
