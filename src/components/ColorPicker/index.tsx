import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRoute } from "wouter";
import { useSnapshot } from "valtio";

import { storeState, store15Pro } from "../../stores";

export const ColorPicker = () => {
  const [, params] = useRoute("/item/:id");
  const [color, setColor] = useState("white");
  const { isCustomColor } = useSnapshot(storeState);

  return (
    <HexColorPicker
      style={{
        display: !!params?.id && isCustomColor ? "flex" : "none",
      }}
      color={color}
      onChange={(color) => {
        setColor(color);
        store15Pro.params.textureColor = color;
      }}
    />
  );
};
