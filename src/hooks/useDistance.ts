import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const useDistance = (mesh: THREE.Object3D | null) => {
    const [distance, setDistance] = useState(Infinity);
    const { raycaster } = useThree();

    useFrame(() => {
        if (!mesh) return; 
        const match = raycaster.intersectObject(mesh);
        if (match && match[0]) {
            setDistance(match[0].distance);
        }
    });

    return distance;
};