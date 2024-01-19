import { useState, SyntheticEvent, CSSProperties, useEffect } from "react";

import { Decal, createDecals } from "../../utils/decals";

// Utility components
import {
  MaterialAccordion,
  TransformationAccordion,
  ColorAccordion,
  DecalAccordion,
} from "./Accordions";

type DecalArray = Decal[] | null;
type State = {
  expanded: string | false;
  isScaleLock: boolean;
  requested: boolean;
};

type Props = {
  style?: CSSProperties;
};

export const CustomizationPanel = ({ style = {} }: Props) => {
  const [expanded, setExpanded] = useState<State["expanded"]>(false);
  const [isScaleLock, setIsScaleLock] = useState<State["isScaleLock"]>(true);
  const [requested, setRequested] = useState<State["requested"]>(false);
  const [decals, setDecals] = useState<DecalArray>(null);

  useEffect(() => {
    if (!requested || decals?.length) return;

    const fetchDecals = () => {
      const decs = createDecals();
      setDecals(decs);
    };

    fetchDecals();
  }, [requested]);

  const handleChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div style={style} id="customization-panel">
      <TransformationAccordion
        standard={{
          expanded: expanded === "panel1",
          onChange: handleChange("panel1"),
        }}
        auxiliary={{
          "aria-controls": "panel1bh-content",
          id: "panel1bh-header",
        }}
        custom={{
          isScaleLock: isScaleLock,
          setScaleLock: () => setIsScaleLock(!isScaleLock)
        }}
      />

      <ColorAccordion
        standard={{
          expanded: expanded === "panel2",
          onChange: handleChange("panel2"),
        }}
        auxiliary={{
          "aria-controls": "panel2bh-content",
          id: "panel2bh-header",
        }}
      />

      <DecalAccordion
        standard={{
          expanded: expanded === "panel3",
          onChange: handleChange("panel3")
        }}
        auxiliary={{
          "aria-controls": "panel3bh-content",
          id: "panel3bh-header"
        }}
        custom={{
          decals,
          onClick: () => setRequested(true)
        }}
      />

      <MaterialAccordion
        standard={{
          expanded: expanded == "panel4",
          onChange: handleChange("panel4"),
        }}
        auxiliary={{
          "aria-controls": "panel4bh-content",
          id: "panel4bh-header",
        }}
      />
    </div>
  );
};
