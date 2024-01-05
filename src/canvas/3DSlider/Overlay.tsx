import { useSnapshot } from "valtio";
import { storeState } from "../../stores";

export const Overlay = () => {
    const { current_slide } = useSnapshot(storeState);
    
    return (
        <div>
            <button onClick={() => storeState.current_slide = current_slide === 0 ? 2 : current_slide - 1}>&lt;</button>
            <button onClick={() => storeState.current_slide = current_slide === 2 ? 0 : current_slide + 1}>&gt;</button>
        </div>
    );
};