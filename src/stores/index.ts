import { proxy } from "valtio";
import { CSSProperties } from "react";

import { decals, Decal } from "../Decals";

type AvailableParams = {
  texturePosition: [number, number];
  textureScaling: [number, number];
  textureRotation: number;
  textureColor?: CSSProperties["color"]
};

type ShoeParts = "laces" | "mesh" | "caps" | "inner" | "sole" | "stripes" | "band" | "patch";

const defaultParams: AvailableParams = {
  texturePosition: [0, 0],
  textureRotation: 0,
  textureScaling: [1, 1],
  textureColor: "yellow"
};

type ProductState = {
  id: "p_state";
  material: string | null;
  decal: Decal | null;
  params: AvailableParams;
};

type ShoeState = {
  id: "shoe_state";
  current: ShoeParts | null;
  items: {
    [P in ShoeParts]: string;
  }
}

type StoreState = {
  id: "s_state";
  open: boolean;
  ready: boolean;
  locked: boolean;
  isCustomColor: boolean;
  requestedDialog: boolean;
}

type Store = {
  [P in string]: ProductState | StoreState | ShoeState;
}

const store = proxy<Store>({
  store15Pro: {
    id: "p_state",
    material: null,
    decal: decals[0],
    params: {...defaultParams},
  },
  storeState: {
    id: "s_state",
    open: false,
    locked: true,
    ready: false,
    isCustomColor: false,
    requestedDialog: false
  },
  shoeState: {
    id: "shoe_state",
    current: null,
    items: {
      band: "#ffffff",
      caps: "#ffffff",
      inner: "#ffffff",
      laces:"#ffffff",
      mesh: "#ffffff",
      patch: "#ffffff",
      sole: "#ffffff",
      stripes: "#ffffff"
    }
  }
});

const store15Pro = store["store15Pro"] as ProductState;
const storeState = store["storeState"] as StoreState;
const storeShoe = store["shoeState"] as ShoeState;

export { store15Pro, storeState, storeShoe };