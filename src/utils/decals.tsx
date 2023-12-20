import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Decal, useTexture, DecalProps } from "@react-three/drei";
import { useSnapshot } from "valtio";

import bestia_1 from "/decals/bestia_1.jpg";
import bestia_2 from "/decals/bestia_2.jpg";
import bubbles from "/decals/bubbles.jpg";
import desert_1 from "/decals/desert_1.jpg";
import doggy_3 from "/decals/doggy_3.jpg";
import doggy_4 from "/decals/doggy_4.jpg";
import impressionism from "/decals/impressionism_1.jpg";
import jupiter from "/decals/jupiter.jpg";
import leopard_1 from "/decals/leopard_1.jpg";
import leopard_2 from "/decals/leopard_2.jpg";
import leopard_3 from "/decals/leopard_3.jpg";
import mosaic from "/decals/mosaic.jpg";
import moscow_burn from "/decals/moscow_burn.jpg";
import mysterious_1 from "/decals/mysterious_1.jpg";
import mysterious_2 from "/decals/mysterious_2.jpg";
import mysterious_3 from "/decals/mysterious_3.jpg";
import okapi_2 from "/decals/okapi_2.jpg";
import origami_1 from "/decals/origami_1.jpg";
import pop_1 from "/decals/pop_1.jpg";
import pop_2 from "/decals/pop_2.jpg";
import wolf_1 from "/decals/wolf_1.jpg";
import wolf_2 from "/decals/wolf_2.jpg";
import wolf_3 from "/decals/wolf_3.jpg";
import wolf_4 from "/decals/wolf_4.jpg";

import { store15Pro } from "../stores";

export const decals = [
  bestia_1,
  bestia_2,
  bubbles,
  desert_1,
  doggy_3,
  doggy_4,
  impressionism,
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
  wolf_4
];

export const materials = [
  {
    title: "Plastic Standard",
    thumb: "/textures/case_materials/Plastic_1/Plastic_1_h.png",
    name: "Plastic_1",
  },
  {
    title: "Abstract",
    thumb: "/textures/case_materials/Abstract_1/Abstract_1_h.png",
    name: "Abstract_1",
  },
  {
    title: "Sci-Fi",
    thumb: "/textures/case_materials/Sci-Fi_1/Sci-Fi_1_h.png",
    name: "Sci-Fi_1",
  },
  {
    title: "Sci-Fi V2",
    thumb: "/textures/case_materials/Sci-Fi_2/Sci-Fi_2_h.png",
    name: "Sci-Fi_2",
  },
];

type ComponentProps = {
  textureRotation?: [number, number, number];
  textureOffset?: [number, number];
  textureRepeat?: [number, number];
  rotateZ?: number;
} & Omit<DecalProps, "rotateZ">;

export type Decal = {
  image: string;
  component: (props: ComponentProps) => JSX.Element | null;
};

export const createTexture = (path: string) => {
  return ({
    textureRotation = [0, 0, 0],
    textureOffset = [0, 0],
    textureRepeat = [1, 1],
    rotateZ = 0,
    ...props
  }: ComponentProps) => {
    const decalRef = useRef<THREE.Mesh>(null);

    const { material } = useSnapshot(store15Pro);
    const texture = useTexture({
      map: path,
    });

    const [aoMap, hMap, mMap, rMap, nMap] = useTexture([
      `/textures/case_materials/${material}/${material}_ao.jpg`,
      `/textures/case_materials/${material}/${material}_h.png`,
      `/textures/case_materials/${material}/${material}_m.jpg`,
      `/textures/case_materials/${material}/${material}_r.jpg`,
      `/textures/case_materials/${material}/${material}_n.jpg`,
    ]);

    useEffect(() => {
      if (!decalRef.current) return;

      const decal_material = new THREE.MeshStandardMaterial({
        aoMap,
        map: texture.map,
        normalMap: nMap,
        roughnessMap: rMap,
        metalnessMap: mMap,
        displacementMap: hMap,
        side: THREE.DoubleSide,
      });

      if (decal_material.map) {
        decal_material.map.wrapS = THREE.MirroredRepeatWrapping;
        decal_material.map.wrapT = THREE.MirroredRepeatWrapping;
        decal_material.map.rotation = rotateZ;
        decal_material.map.repeat.set(...textureRepeat);
        decal_material.map.offset.set(...textureOffset);
        decal_material.map.needsUpdate = true;
        decalRef.current.material = decal_material;
      }
    }, [decalRef, material, texture]);

    return <Decal ref={decalRef} rotation={textureRotation} {...props}></Decal>;
  };
};

export const createDecals = () => {
  let res: Decal[] = [];

  // const modules = import.meta.glob("/decals/*.jpg") as any;
  // for (const module in modules) {
  //   if (Object.prototype.hasOwnProperty.call(modules, module)) {
  //     res.push({
  //       image: module,
  //       component: createTexture(module),
  //     });
  //   }
  // }
  
  for (const decal of decals) {
    let img = decal;
    res.push({
      image: img,
      component: createTexture(img),
    });
  }

  return res;
};

export const loadDecals = () => {
  const [decals, setDecals] = useState<Decal[] | null>(null);

  useEffect(() => {
    const fetchDecals = async () => {
      const decs = await createDecals();
      setDecals(decs);
    };

    fetchDecals();
  }, []);

  return decals;
};
