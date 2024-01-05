import { GLTFExporter } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export const match_lips = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

export const josh_purchase_audio = new Audio("/audio/Josh_purchase.wav");
export const josh_greet_audio = new Audio("/audio/Josh_greet.wav");
export const josh_showcase_audio = new Audio("/audio/Josh_showcase.wav");

export const george_purchase_audio = new Audio("/audio/George_purchase.wav");
export const george_greet_audio = new Audio("/audio/George_greet.wav");
export const george_showcase_audio = new Audio("/audio/George_showcase.wav");

export const lily_purchase_audio = new Audio("/audio/Lily_purchase.wav");
export const lily_greet_audio = new Audio("/audio/Lily_greet.wav");
export const lily_showcase_audio = new Audio("/audio/Lily_showcase.wav");

export const downloadScene = (file: Blob, name: string) => {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = URL.createObjectURL(file);
    link.download = name;
    link.click();
    document.body.removeChild(link);
}

export const exportScene = (scene: any) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2);
        alert("export")
        downloadScene(new Blob([output], { type: "text/plain" }), "scene.gltf");
      },
      (err) => {
        console.log("Something went wrong: ", err.error);
      },
      {
        binary: false,
        trs: false,
        onlyVisible: true,
      }
    );
}

export const changeUVWrapping = (maps: THREE.Texture[], wrappingOption: THREE.Wrapping) => {
  for (const map of maps) {
    map.wrapS = map.wrapT = wrappingOption;
    map.needsUpdate = true;
  }
}