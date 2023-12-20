import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRoute } from "wouter";

import { store15Pro } from "../../stores";

export const ColorPicker = () => {
  const [, params] = useRoute("/item/:id");
  const [color, setColor] = useState(store15Pro.params.textureColor);

  return (
    <HexColorPicker
      style={{
        display: !!params?.id && params.id === "01" ? "flex" : "none",
        width: "100%"
      }}
      color={color}
      onChange={(color) => {
        setColor(color);
        store15Pro.params.textureColor = color;
      }}
    />
  );
};
