import { useSnapshot } from "valtio";
import { storeShoe } from "../../stores";
import { useRoute } from "wouter";

export const Customizer = () => {
    const { shoe_name } = useSnapshot(storeShoe);
    const [_, params ] = useRoute("/item/:id");
    
    if (params?.id !== "03") return; 

    return <div style={{ position: "fixed", bottom: "0", left: "1em" }}>
        <p>{shoe_name}</p>
        <button onClick={() => {
            storeShoe.shoe_name = shoe_name === "Nike" ? "Shoe" : "Nike";
        }}>Далі</button>
    </div>;
};
