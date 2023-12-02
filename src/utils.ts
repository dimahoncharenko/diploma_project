import { GLTFExporter } from "three/examples/jsm/Addons.js";

export const downloadScene = (file: Blob, name: string) => {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = URL.createObjectURL(file);
    link.download = name;
    link.click();
    document.body.removeChild(link);
}

export const exportScene = (scene: THREE.Group) => {
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