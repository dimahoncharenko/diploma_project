import { proxy } from "valtio";
import { CSSProperties } from "react";

import { Decal, createTexture } from "../utils/decals";
import defaultDecal from "/decals/bestia_1.jpg";

type AvailableParams = {
  texturePosition: [number, number];
  textureScaling: [number, number];
  textureRotation: number;
  textureColor?: CSSProperties["color"]
};

type ShoeParts = "Laces" | "Body" | "Heel" | "Interior" | "Sole" | "stripes" | "Eyelets" | "Lace Cage";

const defaultParams: AvailableParams = {
  texturePosition: [0, 0],
  textureRotation: 0,
  textureScaling: [1, 1],
  textureColor: "black"
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
  shoe_name: string;
  items: {
    [P in ShoeParts]: string;
  }
}

type ShirtStore = {
  id: "shirt_state",
  colors: CSSProperties["color"][],
  decals: string[],
  decalSize: number;
  current_color: string;
  current_decal: string;
}

type StoreState = {
  id: "s_state";
  shoe_menu: boolean;
  case_menu: boolean;
  shirt_menu: boolean;
  ready: boolean;
  locked: boolean;
  requestedDialog: boolean;
  activeStore: string;
  isCrossedBorders: boolean;
}

type Store = {
  [P in string]: ProductState | StoreState | ShoeState | ShirtStore;
}

const store = proxy<Store>({
  store15Pro: {
    id: "p_state",
    material: "Plastic_1",
    decal: {
      image: defaultDecal,
      component: createTexture(defaultDecal)
    },
    params: {...defaultParams},
  },
  storeState: {
    id: "s_state",
    shoe_menu: false,
    case_menu: false,
    shirt_menu: false,
    locked: true,
    ready: false,
    requestedDialog: false,
    activeStore: "cases",
    isCrossedBorders: false
  },
  shoeState: {
    id: "shoe_state",
    current: null,
    shoe_name: "Nike",
    items: {
      Eyelets: "#ffffff",
      Heel: "#ffffff",
      Interior: "#ffffff",
      Laces:"#ffffff",
      Body: "#ffffff",
      "Lace Cage": "#ffffff",
      Sole: "#ffffff",
      stripes: "#ffffff"
    }
  },
  shirtStore: {
    id: "shirt_state",
    colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    decals: ['react', 'three2', 'pmndrs', 'nau'],
    decalSize: 1,
    current_color: '#EFBD4E',
    current_decal: 'three2'
  }
});

const store15Pro = store["store15Pro"] as ProductState;
const storeState = store["storeState"] as StoreState;
const storeShoe = store["shoeState"] as ShoeState;
const storeShirt = store["shirtStore"] as ShirtStore;

export { store15Pro, storeState, storeShoe, storeShirt };