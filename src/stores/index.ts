import { proxy } from "valtio";
import { CSSProperties } from "react";

import { Decal, createTexture, ShirtTexture, ShoeTexture } from "../utils/decals";
import defaultDecal from "/decals/bestia_1.jpg";

// Case's context
type CaseParams = {
  texturePosition: [number, number];
  textureScaling: [number, number];
  textureRotation: number;
  textureColor?: CSSProperties["color"];
};

type CaseStore = {
  id: "case_state";
  material: string | null;
  decal: Decal | null;
  params: CaseParams;
};

const defaultCaseParams: CaseParams = {
  texturePosition: [0, 0],
  textureRotation: 0,
  textureScaling: [1, 1],
  textureColor: "black",
};

// Shoe's context
type ShoeParts =
  | "Laces"
  | "Body"
  | "Heel"
  | "Interior"
  | "Sole"
  | "Stripes"
  | "Eyelets"
  | "Lace Cage"
  | "Logo"
  | "Circles";
type ShoeStore = {
  id: "shoe_state";
  current: ShoeParts | null;
  texture: null | ShoeTexture;
  shoe_name: string;
  items: {
    [P in ShoeParts]: string;
  };
};

// Shirt's context
type ShirtStore = {
  id: "shirt_state";
  colors: CSSProperties["color"][];
  texture: ShirtTexture;
  cloth_type: string;
  decals: string[];
  decalSize: number;
  current_color: string;
  current_decal: string;
};

// Global context
type GeneralState = {
  id: "general_state";
  shoe_menu: boolean;
  case_menu: boolean;
  shirt_menu: boolean;
  ready: boolean;
  locked: boolean;
  activeStore: string;
  isCrossedBorders: boolean;
  current_slide: number;
};

type Store = {
  [P in string]: CaseStore | GeneralState | ShoeStore | ShirtStore;
};

const store = proxy<Store>({
  store15Pro: {
    id: "case_state",
    material: "Plastic_1",
    decal: {
      image: defaultDecal,
      component: createTexture(defaultDecal),
    },
    params: { ...defaultCaseParams },
  },
  storeState: {
    id: "general_state",
    shoe_menu: false,
    case_menu: false,
    shirt_menu: false,
    locked: true,
    ready: false,
    activeStore: "cases",
    isCrossedBorders: false,
    current_slide: 0,
  },
  shoeState: {
    id: "shoe_state",
    current: null,
    shoe_name: "Nike",
    texture: null,
    items: {
      Eyelets: "#ffffff",
      Heel: "#ffffff",
      Interior: "#ffffff",
      Laces: "#ffffff",
      Body: "#ffffff",
      "Lace Cage": "#ffffff",
      Sole: "#ffffff",
      Stripes: "#ffffff",
      Logo: "#000000",
      Circles: "#ffffff"
    },
  },
  shirtStore: {
    id: "shirt_state",
    cloth_type: "shirt",
    texture: {
      name: "Silk",
      url: "/textures/shirt_textures/Silk_bc.jpg",
    },
    colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
    decals: ["react", "three2", "pmndrs", "nau", "grumpy", "JS_1", "JS_2", "tag"],
    decalSize: 1,
    current_color: "#EFBD4E",
    current_decal: "three2",
  },
});

const store15Pro = store["store15Pro"] as CaseStore;
const storeState = store["storeState"] as GeneralState;
const storeShoe = store["shoeState"] as ShoeStore;
const storeShirt = store["shirtStore"] as ShirtStore;

export { store15Pro, storeState, storeShoe, storeShirt };
