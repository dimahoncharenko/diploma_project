import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

type Props = {
  mainColor: string;
  path: string;
} & GroupProps;
export const Scene = ({ mainColor, path, ...props }: Props) => {
  const { scene } = useGLTF(path);
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <group {...props} dispose={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls
          autoRotate
          enablePan={false}
          autoRotateSpeed={0.5}
        />
        <primitive object={scene} />
      </group>
    </>
  );
};

useGLTF.preload("/models/pants/pants2.glb");
useGLTF.preload("/models/iPhone15Pro_case/scene-transformed.glb");
useGLTF.preload("/models/shirt/shirt.glb");
