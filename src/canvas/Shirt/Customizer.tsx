import { useSnapshot } from "valtio";
import { AiFillCamera } from 'react-icons/ai'
import { useRoute } from "wouter";
import Slider from "@mui/material/Slider";

import { storeShirt } from "../../stores";

export function Customizer() {
    const snap = useSnapshot(storeShirt);
    const [, params] = useRoute("/item/:id");

    if (params?.id !== "02") return null;

    return (
      <div className="customizer" style={{ display: "block", position: "fixed", bottom: "-3em", height: "max-content" }}>
        <div className="color-options">
          {snap.colors.map((color) => (
            <div key={color} className={`circle`} style={{ background: color }} onClick={() => (storeShirt.current_color = color || "white")}></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((decal) => (
              <div key={decal} className={`decal`} onClick={() => (storeShirt.current_decal = decal)}>
                <img src={`/models/shirt/${decal}_thumb.png`} alt="brand" />
              </div>
            ))}
          </div>
        </div>
        <Slider value={snap.decalSize} step={.1} min={0} max={2} onChange={(e) => e.target && "value" in e.target && (storeShirt.decalSize = Number(e.target.value || 0))} style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", top: "5%", maxWidth: "30vw" }}/>
        <button
          className="share"
          style={{ background: snap.current_color }}
          onClick={() => {
            const canvasEl = document.querySelector<HTMLCanvasElement>('canvas');
            if (!canvasEl) return;
            const link = document.createElement('a')
            link.setAttribute('download', 'canvas.png')
            link.setAttribute('href', canvasEl.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click();
          }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
      </div>
    )
  }