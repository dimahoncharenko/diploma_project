import styled from "styled-components";

export const Icons = styled.div`
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

export const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
`;