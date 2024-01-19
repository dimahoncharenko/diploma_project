import styled from "styled-components";

export const ShoeCustomizer = styled.div`
    position: fixed; 
    bottom: 0; 
    left: 0;
    padding: 1em;
`;

export const TextureContainer = styled.div`
    --texture-max-width: 2.5em;
    
    display: flex;
    max-width: 40vw;
    width: calc(var(--texture-max-width) + .25em);
    overflow: hidden;
    gap: .5em;
    padding: .5em;
    transition: width .2s ease-out;

    &:hover {
        width: 100%;
    }
`;

export const Texture = styled.div`
    max-width: var(--texture-max-width);
    min-width: 2em;

    & > img {
    max-width: 100%;
    filter: saturate(0) invert(1) brightness(1);
    transition: all 0.2s ease-in-out;
    background-color: rgb(40, 40, 40);
    border-radius: 5%;
    padding: 0.3em;
  }

  & > img:hover,
  & > img.active {
    filter: none;
    transform: scale(1.2);
    cursor: pointer;
  }
`;