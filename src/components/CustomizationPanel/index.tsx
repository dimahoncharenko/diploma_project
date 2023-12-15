import { useState, SyntheticEvent, CSSProperties } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "@mui/material/Slider";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import LinkIcon from "@mui/icons-material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDown";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import { useSnapshot } from "valtio";

import { AccordionDetailsWrap } from "./styled";
import { decals } from "../../utils/decals";
import { AccordionCard } from "../AccordionCard";
import { store15Pro, storeState } from "../../stores";

type Props = {
  style?: CSSProperties;
  visible?: boolean;
};

export const CustimizationPanel = ({ visible = false, style = {} }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isScaleLock, setIsScaleLock] = useState(true);
  const { params } = useSnapshot(store15Pro);
  const { isCustomColor } = useSnapshot(storeState);

  const handleChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (!visible) return null;

  return (
    <div style={style} id="customization-panel">
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Adjust position, rotation and scale of a decal
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: "flex", flexWrap: "wrap", padding: "10px 8vw" }}
        >
          {/* @ts-ignore */}
          <Box flex="50%">
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "1em",
                textAlign: "center",
              }}
            >
              Positioning
            </Typography>
            {params.texturePosition && (
              <>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <ArrowLeftIcon fontSize="large" />
                  <Slider
                    name="decalXOffset"
                    getAriaLabel={() => "Volume"}
                    value={params.texturePosition[0]}
                    min={-1}
                    max={1}
                    step={0.01}
                    onChange={(e) => {
                      if (e.target && e.target.value)
                        store15Pro.params.texturePosition[0] = Number(
                          e.target.value
                        );
                    }}
                  />
                  <ArrowRightIcon fontSize="large" />
                </Stack>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <ArrowUpIcon fontSize="large" />
                  <Slider
                    name="decalYOffset"
                    getAriaLabel={() => "Volume"}
                    value={params.texturePosition[1]}
                    min={-0.3}
                    max={0.3}
                    step={0.01}
                    onChange={(e) => {
                      store15Pro.params.texturePosition[1] = Number(
                        e.target!.value
                      );
                    }}
                  />
                  <ArrowDownIcon fontSize="large" />
                </Stack>
              </>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="50%"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "1em",
              }}
            >
              Scaling
            </Typography>
            <Stack
              spacing={2}
              width={"90%"}
              direction="row"
              alignItems="center"
            >
              <ZoomOutIcon />
              <Slider
                name="decalXScale"
                getAriaLabel={() => "Volume"}
                value={params.textureScaling[0]}
                onChange={(e) => {
                  const value = e.target?.value;
                  if (value) {
                    store15Pro.params.textureScaling[0] = value;
                    isScaleLock &&
                      (store15Pro.params.textureScaling[1] = value);
                  }
                }}
                min={0.6}
                max={1.4}
                step={0.01}
              />
              <ZoomInIcon />
            </Stack>
            <Button
              onClick={() => {
                setIsScaleLock(!isScaleLock);
              }}
            >
              {isScaleLock ? <LinkOffIcon /> : <LinkIcon />}
            </Button>
            <Stack
              spacing={2}
              width={"90%"}
              direction="row"
              alignItems="center"
            >
              <ZoomOutIcon />
              <Slider
                name="decalYScale"
                getAriaLabel={() => "Volume"}
                value={
                  isScaleLock
                    ? params.textureScaling[0]
                    : params.textureScaling[1]
                }
                onChange={(e) => {
                  const value = e.target?.value;
                  if (value) {
                    store15Pro.params.textureScaling[1] = value;
                  }
                }}
                min={0.6}
                max={1.4}
                step={0.01}
                disabled={isScaleLock}
              />
              <ZoomInIcon />
            </Stack>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="50%"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "1em",
              }}
            >
              Rotating
            </Typography>
            <Stack
              spacing={2}
              width={"90%"}
              direction="row"
              alignItems="center"
            >
              <UndoIcon />
              <Slider
                name="decalZRotate"
                getAriaLabel={() => "Volume"}
                value={params.textureRotation}
                onChange={(e) => {
                  if (e.target?.value) {
                    store15Pro.params.textureRotation = e.target?.value;
                  }
                }}
                min={-(Math.PI / 2)}
                max={Math.PI / 2}
                step={0.01}
              />
              <RedoIcon />
            </Stack>
            <Button
              type="button"
              size="small"
              onClick={() => {
                store15Pro.params.textureRotation = 0;
              }}
            >
              reset
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="50%"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "1em",
              }}
            >
              Additions
            </Typography>
            <FormGroup>
              <FormControlLabel
                label="Decal is repetitive?"
                control={<Checkbox onChange={() => {}} />}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                label="Camera gap is filled?"
                control={<Checkbox onChange={() => {}} />}
              />
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Color case
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Choose the secondary color to your case
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              label="Change the color?"
              control={
                <Checkbox
                  value={isCustomColor}
                  onChange={() => {
                    storeState.isCustomColor = !isCustomColor;
                  }}
                />
              }
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Decals</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Choose some glorious texture
          </Typography>
        </AccordionSummary>
        <AccordionDetailsWrap
          style={{
            overflowY: "auto",
            minHeight: "max-content",
          }}
        >
          {decals.map((d, index) => (
            <AccordionCard
              key={index}
              image={d.image}
              desc=""
              title={`Material ${++index}`}
              onApply={() => {
                store15Pro.decal = d;
              }}
            />
          ))}
        </AccordionDetailsWrap>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Materials
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Apply a suitable material for your needs
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};
