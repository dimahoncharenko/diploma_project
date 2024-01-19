import { storeState } from "../../stores";
import { Icons, IconsContainer } from "./styled";

const stores = ["cases", "shirts", "shoes"];

export const StoreSelector = () => {
  return (
    <Icons>
      <IconsContainer>
        {stores.map((icon) => (
          <div
            key={icon}
            onClick={() => (storeState.activeStore = icon)}
          >
            <img
              className={icon === storeState.activeStore ? "active" : ""}
              style={{ minWidth: "3em" }}
              src={`/${icon}.png`}
              alt={storeState.activeStore}
            />
          </div>
        ))}
      </IconsContainer>
    </Icons>
  );
};
