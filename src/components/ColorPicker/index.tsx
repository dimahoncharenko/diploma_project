import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRoute } from "wouter";

import { store15Pro } from "../../stores";
import { Display } from "../Display";

export const ColorPicker = () => {
  const [, params] = useRoute("/item/:id");
  const [color, setColor] = useState(store15Pro.params.textureColor);

  return (
    <Display criteria={!!params?.id && params.id === "01"}>
      <HexColorPicker
        style={{
          display: "flex",
          width: "100%"
        }}
        color={color}
        onChange={(color) => {
          setColor(color);
          store15Pro.params.textureColor = color;
        }}
      />
    </Display>
  );
};
