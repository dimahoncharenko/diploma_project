import { createRoot } from "react-dom/client";
import { useLocation, useRoute } from "wouter";
import { useSnapshot } from "valtio";

import "./index.css";
import { App } from "./App";
import { Decals } from "./components/CustomizationPanel";
import { Overlay as OverlayGlass } from "./components/Overlay";
import { Picker } from "./canvas/Shoe/Picker";
import { storeState } from "./stores";

const advices = [
  'Get close to the bell and "touch" it to communicate with trader',
  "Double click to enter portal"
];

function Overlay() {
  const { ready } = useSnapshot(storeState);
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  return (
    <>
      <App />
      <Picker/>
      <div className="dot" style={{ display: params?.id ? "none" : "block" }} />
      {/* <div
        className={`fullscreen bg ${ready ? "ready" : "notready"} ${
          ready && "clicked"
        }`}
      >
        <div className="stack">
          <button onClick={() => storeState.ready = true}>Start</button>
        </div>
      </div> */}
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
          setLocation("/");
        }}
      >
        {params ? "< Back" : advices[Math.floor(Math.random() * advices.length)]}
      </a>
      <Decals visible={!!params?.id} style={{ zIndex: 10000 }}/>
      <div id="overlay">
        <OverlayGlass />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Overlay />);
