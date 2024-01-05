import { Environment } from "@react-three/drei";

import { Room } from ".";
import { Pants } from "../Shirt/Pants";
import { Nike } from "../Shoe/Nike_pegasus";
import { Display } from "../../components/Display";

import { Model as IPhone } from "../../canvas/iPhoneCase15Pro";
// import { Shoe } from "../Shoe";
import { useSnapshot } from "valtio";
import { storeState } from "../../stores";
// import { ThreeDSlider } from "../3DSlider";

export const Rooms = () => {
  const { activeStore } = useSnapshot(storeState);

  return (
    <>
      <Display criteria={activeStore === "cases"}>
        <Room id="01" position={[-2000, 1000, -4]}>
          <IPhone position={[0, 0.2, -2]} scale={0.0008} />
        </Room>
      </Display>

      <Display criteria={activeStore === "shirts"}>
        <Room id="02" position={[-2000, 1000, -4]} bg="#bcb5dd">
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
          <ambientLight color="white" intensity={1} />
          <pointLight color="white" intensity={1.5} position={[0, 0, -3]} />
          <Pants position={[0, -0.5, -1.95]} scale={0.2} />
        </Room>
      </Display>

      <Display criteria={activeStore === "shoes"}>
        <Room id="03" position={[-2000, 1000, -4]}>
          <Nike position={[0, 0, -2]} scale={0.5} />
        </Room>
      </Display>
    </>
  );
};
