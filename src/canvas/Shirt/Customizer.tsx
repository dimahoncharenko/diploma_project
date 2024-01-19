import { useSnapshot } from "valtio";
// import { AiFillCamera } from "react-icons/ai";
import Slider from "@mui/material/Slider";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { storeShirt } from "../../stores";
import { shirt_textures } from "../../utils/decals";

import {
  CustomizerWrapper,
  ColorOptions,
  Circle,
  Decals,
  DecalsContainer
} from "./styled.ts";

export function Customizer() {
  const snap = useSnapshot(storeShirt);

  return (
    <CustomizerWrapper>
      <ColorOptions>
        {snap.colors.map((color) => (
          <Circle
            key={color}
            style={{ background: color }}
            onClick={() => (storeShirt.current_color = color || "white")}
          />
        ))}
      </ColorOptions>

      <Decals
        style={{
          bottom: "110px",
          width: "100%",
        }}
      >
        <SimpleBar>
          <DecalsContainer>
            {snap.decals.map((decal) => (
              <div
                key={decal}
                onClick={() => (storeShirt.current_decal = decal)}
              >
                <img
                  className={decal === snap.current_decal ? "active" : ""}
                  src={`/models/shirt/${decal}_thumb.png`}
                  alt="Decal"
                />
              </div>
            ))}
          </DecalsContainer>
        </SimpleBar>
      </Decals>
      <Decals>
        <SimpleBar style={{ maxWidth: "calc(100vw - (100px + .6em))" }}>
          <DecalsContainer>
            {shirt_textures.map((texture) => (
              <div
                key={texture.name}
                onClick={() => (storeShirt.texture = texture)}
              >
                <img
                  className={texture.name === snap.texture.name ? "active" : ""}
                  src={texture.url}
                  alt="Texture"
                />
              </div>
            ))}
          </DecalsContainer>
        </SimpleBar>
      </Decals>
      <Slider
        value={snap.decalSize}
        step={0.1}
        min={0}
        max={2}
        onChange={(e) =>
          e.target &&
          "value" in e.target &&
          (storeShirt.decalSize = Number(e.target.value || 0))
        }
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          top: "5%",
          maxWidth: "30vw",
        }}
      />
      {/* <button
        className="share"
        style={{ background: snap.current_color }}
        onClick={() => {
          const canvasEl = document.querySelector<HTMLCanvasElement>("canvas");
          if (!canvasEl) return;
          const link = document.createElement("a");
          link.setAttribute("download", "canvas.png");
          link.setAttribute(
            "href",
            canvasEl
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream")
          );
          link.click();
        }}
      >
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button> */}
      {/* <button
        onClick={() =>
          (storeShirt.cloth_type =
            snap.cloth_type === "shirt" ? "pants" : "shirt")
        }
      >
        Swap
      </button> */}
    </CustomizerWrapper>
  );
}
