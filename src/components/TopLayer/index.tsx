import { useLocation, useRoute } from "wouter";
import { useSnapshot } from "valtio";
import { useProgress } from "@react-three/drei";

import { storeShoe, storeState } from "../../stores";
import { Customizer as ShirtCustomizer } from "../../canvas/Shirt/Customizer";
import { Customizer as ShoeCustomizer } from "../../canvas/Shoe/Customizer";
import { Display } from "../../components/Display";
import {
  CaseOverlay,
  ShoeOverlay,
  ShirtOverlay,
} from "../../components/Overlay";
import { CustomizationPanel } from "../../components/CustomizationPanel";

const advices = [
  "Підійдіть до агента для взаємодії",
  "Ви можете блукати по сцені скільки Вам завгодно",
  "Наявні 3 магазину: магазин кейсів, одягу та взуття",
  "Ви можете створити продукт за Вашим побажанням",
  "Наведіть курсор миші на агента, щоб відкрити діалогове вікно",
];

export const TopLayer = () => {
  const { ready } = useSnapshot(storeState);
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  const { progress, total, item, loaded, active } = useProgress();

  return (
    <>
      <Display criteria={!params?.id}>
        <div className="dot" />
        <CaseOverlay />
        <ShoeOverlay />
        <ShirtOverlay />
      </Display>
      <div
        className={`fullscreen bg ${ready ? "ready" : "notready"} ${
          ready && "clicked"
        }`}
      >
        <div className="stack">
          <button
            className="start-button"
            disabled={
              !(Math.round(progress) === 100 && loaded === total && !active)
            }
            onClick={() => (storeState.ready = true)}
          >
            Start
          </button>
          <Display criteria={active}>
            <p>{item}</p>
          </Display>
        </div>
      </div>
      <a
        className="top-link"
        href="#"
        onClick={() => {
          document.body.style.cursor = "default";
          storeShoe.current = null;
          setLocation("/");
        }}
      >
        <Display
          criteria={!!params?.id}
          fallback={advices[Math.floor(Math.random() * advices.length)]}
        >
          {"< Back"}
        </Display>
      </a>
      <Display criteria={!!params?.id && params?.id === "01" && ready}>
        <CustomizationPanel style={{ zIndex: 10000 }} />
      </Display>

      <Display criteria={params?.id === "02"}>
        <ShirtCustomizer />
      </Display>

      <Display criteria={params?.id === "03"}>
        <ShoeCustomizer />
      </Display>
    </>
  );
};
