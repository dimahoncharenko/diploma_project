import { useSnapshot } from "valtio";
import { DisabledByDefaultRounded } from "@mui/icons-material";

import { storeShoe } from "../../stores";
import { ShoeCustomizer, Texture, TextureContainer } from "./styled";
import { shoe_textures } from "../../utils/decals";

export const Customizer = () => {
  const { texture } = useSnapshot(storeShoe);

  return (
    <ShoeCustomizer>
      {texture && <p>{texture.name}</p>}

      <TextureContainer>
        <Texture>
          <DisabledByDefaultRounded
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              storeShoe.texture = null;
            }}
          />
        </Texture>
        {shoe_textures.map((texture, index) => (
          <Texture key={index}>
            <img
              src={texture.url_files.map}
              onClick={() => {
                storeShoe.texture = texture;
              }}
            />
          </Texture>
        ))}
      </TextureContainer>
    </ShoeCustomizer>
  );
};
