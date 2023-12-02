import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";
import { storeShoe } from "../../stores";

export const Picker = () => {
  const snap = useSnapshot(storeShoe);
  
  return (
    <div style={{ display: snap.current ? "block" : "none", position: "absolute", top: ".5em", right: ".5em" }}>
      <HexColorPicker
        className="picker"
        style={{ maxHeight: "30vh", aspectRatio: "1/2"  }}
        color={snap.current ? snap.items[snap.current] : "white"}
        onChange={(color) => {
            snap.current && (storeShoe.items[snap.current] = color)
        }}
      />
      <h1>{snap.current}</h1>
    </div>
  );
};
