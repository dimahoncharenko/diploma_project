import { lazy } from "react";
import { Environment, useGLTF } from "@react-three/drei";
import { useRoute } from "wouter";

import { Room } from ".";
import { Display } from "../../components/Display";

import { useSnapshot } from "valtio";
import { storeShirt, storeState } from "../../stores";

const DynamicIPhoneComponent = lazy(
  () => import("../../canvas/iPhoneCase15Pro")
);
const DynamicShirtComponent = lazy(() => import("../Shirt"));
const DynamicPantsComponent = lazy(() => import("../Shirt/Pants"));
const DynamicNikeComponent = lazy(() => import("../Shoe/Nike_pegasus"));

export const Rooms = () => {
  const { activeStore } = useSnapshot(storeState);
  const { cloth_type } = useSnapshot(storeShirt);
  const [, params] = useRoute("/item/:id");

  return (
    <>
      <Display criteria={activeStore === "cases" && params?.id === "01"}>
        <Room id="01" position={[-2000, 1000, -2000]}>
          <DynamicIPhoneComponent position={[0, 0.2, -2]} scale={0.0008} />
        </Room>
      </Display>
      <Display criteria={activeStore === "shirts" && params?.id === "02"}>
        <Room id="02" position={[-2000, 1000, -2000]} bg="#bcb5dd">
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
          <ambientLight color="white" intensity={1} />
          <pointLight color="white" intensity={1.5} position={[0, 0, -3]} />
          <Display criteria={cloth_type === "shirt"}>
            <DynamicShirtComponent position={[0, 0, -2]} scale={1} />
          </Display>
          <Display criteria={cloth_type === "pants"}>
            <DynamicPantsComponent position={[0, -1, -2]} scale={0.5} />
          </Display>
        </Room>
      </Display>
      <Display criteria={activeStore === "shoes" && params?.id === "03"}>
        <Room id="03" position={[0, 0, 0]}>
          <DynamicNikeComponent position={[0, 0, -2]} scale={0.5} />
        </Room>
      </Display>
    </>
  );
};

useGLTF.preload("/models/shoe/nike_pegasus.glb");
useGLTF.preload("/models/shirt/shirt.glb");
useGLTF.preload("/models/iPhone15Pro_case/scene-transformed.glb");
useGLTF.preload("/models/pants/pants2.glb");
