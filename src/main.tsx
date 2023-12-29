import { createRoot } from "react-dom/client";
import { useLocation, useRoute } from "wouter";
import { useSnapshot } from "valtio";
import { useProgress } from "@react-three/drei";

import "./index.css";
import { App } from "./App";
import { CustomizationPanel } from "./components/CustomizationPanel";
import { CaseOverlay, ShoeOverlay, ShirtOverlay } from "./components/Overlay";
import { Picker } from "./canvas/Shoe/Picker";
import { storeShoe, storeState } from "./stores";
import { Customizer as ShirtCustomizer } from "./canvas/Shirt/Customizer";
import { Customizer as ShoeCustomizer } from "./canvas/Shoe/Customizer";

const advices = [
  "Підійдіть до агента для взаємодії",
  "Ви можете блукати по сцені скільки Вам завгодно",
  "Наявні 3 магазину: магазин кейсів, одягу та взуття",
  "Ви можете створити продукт за Вашим побажанням",
  "Наведіть курсор миші на агента, щоб відкрити діалогове вікно",
];

function Overlay() {
  const { ready } = useSnapshot(storeState);
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  const { progress, total, item, loaded, active } = useProgress();
  
  return (
    <>
      <App />
      <Picker />
      <div className="dot" style={{ display: params?.id ? "none" : "block" }} />
      <div
        className={`fullscreen bg ${ready ? "ready" : "notready"} ${
          ready && "clicked"
        }`}
      >
        <div className="stack">
          <button
            disabled={
              !(Math.round(progress) === 100 && loaded === total && !active)
            }
            onClick={() => (storeState.ready = true)}
          >
            Start
          </button>
          {active && <p>{item}</p>}
        </div>
      </div>
      <a
        style={{
          position: "absolute",
          top: 40,
          left: "85%",
          fontSize: "13px",
          textDecoration: "none",
          color: "whitesmoke",
        }}
        href="#"
        onClick={() => {
          document.body.style.cursor = "default";
          storeShoe.current = null;
          setLocation("/");
        }}
      >
        {params
          ? "< Back"
          : advices[Math.floor(Math.random() * advices.length)]}
      </a>
      <CustomizationPanel
        visible={!!params?.id && params?.id === "01"}
        style={{ zIndex: 10000 }}
      />
      <div id="hud">
        <CaseOverlay />
        <ShoeOverlay />
        <ShirtOverlay />
        <ShirtCustomizer />
        <ShoeCustomizer />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Overlay />);
