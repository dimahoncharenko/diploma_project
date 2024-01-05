import { useSnapshot } from "valtio";

import { Office } from ".";
import { Display } from "../../components/Display";
import { Selector } from "../Selector";
import { Trader as CaseTrader } from "../Trader";
import { Trader as ShoeTrader } from "../Shoe/Trader";
import { Trader as ShirtTrader } from "../Shirt/Trader";
import { storeState } from "../../stores";

export const Offices = () => {
  const { activeStore } = useSnapshot(storeState);

  return (
    <>
      <Display criteria={activeStore === "cases"}>
        <Office
          sceneType="Cases"
          scale={1}
          position={[6, 8.63, 1]}
          rotation={[0.05, -0.3, -0.01]}
        >
          <Selector>
            <CaseTrader
              position={[3.5, 0.27, -1.4]}
              rotation={[-1.55, 0, -1.5]}
              scale={1.7}
            />
          </Selector>
        </Office>
      </Display>

      <Display criteria={activeStore === "shoes"}>
        <Office
          scale={1}
          position={[6, 8.63, 1]}
          rotation={[0.05, -0.3, -0.01]}
        >
          <Selector>
            <ShoeTrader
              rotation={[-1.5, 0, -Math.PI / 2]}
              scale={[1.8, 1.8, 1.8]}
              position={[3.5, 0.4, -1.3]}
            />
          </Selector>
        </Office>
      </Display>

      <Display criteria={activeStore === "shirts"}>
        <Office
          sceneType="Shirt"
          scale={1}
          position={[6, 8.63, 1]}
          rotation={[0.05, -0.3, -0.01]}
        >
          <Selector>
            <ShirtTrader
              rotation={[-1.55, 0, -1.5]}
              scale={[1.7, 1.7, 1.7]}
              position={[3.5, 0.4, -1.3]}
            />
          </Selector>
        </Office>
      </Display>
    </>
  );
};
