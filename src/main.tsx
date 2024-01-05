import { createRoot } from "react-dom/client";

import "./index.css";

import { App } from "./App";
import { Picker } from "./canvas/Shoe/Picker";
import { TopLayer } from "./components/TopLayer";

function Overlay() {
  return (
    <>
      <App />
      <Picker />
      <TopLayer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Overlay />);
