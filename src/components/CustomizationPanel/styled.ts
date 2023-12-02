import styled from "styled-components";
import AccordionDetails from "@mui/material/AccordionDetails";

export const AccordionDetailsWrap = styled(AccordionDetails)`
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    max-width: 100%;
    position: relative;
    z-index: 10000;
`;
