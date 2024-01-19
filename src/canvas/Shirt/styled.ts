import styled from "styled-components";

export const CustomizerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;
  margin-bottom: 25px;

  position: fixed;
  bottom: -3em;
  height: max-content;
`;

export const ColorOptions = styled.div`
  position: fixed;
  left: 1em;
  bottom: 50%;
  transform: translateY(50%);
  padding: 0.5em;
`;

export const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  transition: transform 0.3s cubic-bezier(0.85, 0, 0.15, 1);

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export const Decals = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 50px;
  bottom: 40px;

  & img {
    width: 3em;
    filter: saturate(0) invert(1) brightness(1);
    transition: all 0.2s ease-in-out;
    background-color: rgb(40, 40, 40);
    border-radius: 5%;
    padding: 0.5em;
  }

  & img:hover,
  & img.active {
    filter: none;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export const DecalsContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: calc(100vw - (100px + .6em));
  padding: .3em;
`;