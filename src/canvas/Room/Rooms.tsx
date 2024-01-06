import { Suspense, lazy } from "react";
import { Environment } from "@react-three/drei";
import { useRoute } from "wouter";

import { Room } from ".";
// import { Pants } from "../Shirt/Pants";
// import Shirt from "../Shirt";
// import Nike from "../Shoe/Nike_pegasus";
import { Display } from "../../components/Display";

// import { Shoe } from "../Shoe";
import { useSnapshot } from "valtio";
import { storeState } from "../../stores";
// import { ThreeDSlider } from "../3DSlider";

const DynamicIPhoneComponent = lazy(
  () => import("../../canvas/iPhoneCase15Pro")
);
const DynamicShirtComponent = lazy(() => import("../Shirt"));
const DynamicNikeComponent = lazy(() => import("../Shoe/Nike_pegasus"));

export const Rooms = () => {
  const { activeStore } = useSnapshot(storeState);
  const [, params] = useRoute("/item/:id");

  return (
    <Suspense fallback={null}>
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
          <DynamicShirtComponent position={[0, 0, -2]} scale={1} />
        </Room>
      </Display>

      <Display criteria={activeStore === "shoes" && params?.id === "03"}>
        <Room id="03" position={[-2000, 1000, -2000]}>
          <DynamicNikeComponent position={[0, 0, -2]} scale={0.5} />
        </Room>
      </Display>
    </Suspense>
  );
};
