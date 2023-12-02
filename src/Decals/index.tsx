import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Decal, useTexture, DecalProps } from "@react-three/drei";

import bestia_1 from "../assets/bestia_1.jpg";
import bestia_2 from "../assets/bestia_2.jpg";
import bubbles from "../assets/bubbles.jpg";
import desert_1 from "../assets/desert_1.jpg";
import doggy_1 from "../assets/doggy_1.png";
import doggy_2 from "../assets/doggy_2.png";
import doggy_3 from "../assets/doggy_3.jpg";
import doggy_4 from "../assets/doggy_4.jpg";
import impressionism_1 from "../assets/impressionism_1.jpg";
import jupiter from "../assets/jupiter.jpg";
import leopard_1 from "../assets/leopard_1.jpg";
import leopard_2 from "../assets/leopard_2.jpg";
import leopard_3 from "../assets/leopard_3.jpg";
import mosaic from "../assets/mosaic.jpg";
import moscow_burn from "../assets/moscow_burn.jpg";
import mysterious_1 from "../assets/mysterious_1.jpg";
import mysterious_2 from "../assets/mysterious_2.jpg";
import mysterious_3 from "../assets/mysterious_3.jpg";
import okapi_2 from "../assets/okapi_2.jpg";
import origami_1 from "../assets/origami_1.jpg";
import pop_1 from "../assets/pop_1.jpg";
import pop_2 from "../assets/pop_2.jpg";
import wolf_1 from "../assets/wolf_1.jpg";
import wolf_2 from "../assets/wolf_2.jpg";
import wolf_3 from "../assets/wolf_3.jpg";
import wolf_4 from "../assets/wolf_4.jpg";

export const decalUrls = [
  bestia_1,
  bestia_2,
  bubbles,
  desert_1,
  doggy_1,
  doggy_2,
  doggy_3,
  doggy_4,
  impressionism_1,
  jupiter,
  leopard_1,
  leopard_2,
  leopard_3,
  mosaic,
  moscow_burn,
  mysterious_1,
  mysterious_2,
  mysterious_3,
  okapi_2,
  origami_1,
  pop_1,
  pop_2,
  wolf_1,
  wolf_2,
  wolf_3,
  wolf_4,
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
      <Decal
        rotation={textureRotation}
        map={texture.map}
        {...props}
      ></Decal>
    );
  };
};

export const createDecals = (src: string[]) => {
  let res: Decal[] = [];

  for (let image of src) {
    res.push({
      image,
      component: createTexture(image),
    });
  }

  return res;
};

export const decals = createDecals(decalUrls);
