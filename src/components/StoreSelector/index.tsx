import { storeState } from "../../stores";

const stores = ["cases", "shirts", "shoes"];

export const StoreSelector = () => {
    return (
        <div className="decals">
        <div className="decals--container">
          {stores.map((decal) => (
            <div key={decal} className="decal" onClick={() => (storeState.activeStore = decal)}>
              <img className={decal === storeState.activeStore ? 'active' : ""} style={{ minWidth: "3em" }} src={`/${decal}.png`} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    )
}