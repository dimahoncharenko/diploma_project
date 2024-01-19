import {
  Accordion,
  AccordionSummary,
  AccordionSummaryProps,
  Typography,
  AccordionProps,
  AccordionDetails,
  Stack,
  Slider,
  Box,
  Button,
} from "@mui/material";

import {
  ExpandMore,
  ArrowLeft,
  ArrowRight,
  ArrowDropUp,
  ArrowDropDown,
  ZoomOut,
  ZoomIn,
  Undo,
  Redo,
  Link,
  LinkOff,
} from "@mui/icons-material";

import { AccordionDetailsWrap } from "./styled";
import { AccordionCard } from "../AccordionCard";
import { store15Pro } from "../../stores";
import { Decal, materials } from "../../utils/decals";
import { Display } from "../Display";
import { useSnapshot } from "valtio";
import { ColorPicker } from "../ColorPicker";

type StandardProps = Pick<AccordionProps, "expanded" | "onChange">;
type AuxiliaryProps = Pick<AccordionSummaryProps, "id" | "aria-controls">;

type CustomizableAccordionProps = {
  standard: StandardProps;
  auxiliary: AuxiliaryProps;
};

export const MaterialAccordion = ({
  standard,
  auxiliary,
}: CustomizableAccordionProps) => {
  return (
    <Accordion {...standard}>
      <AccordionSummary expandIcon={<ExpandMore />} {...auxiliary}>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>Матеріали</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Застосуйте матеріал до кейсу
        </Typography>
      </AccordionSummary>
      <AccordionDetailsWrap
        style={{
          overflowY: "auto",
          minHeight: "max-content",
        }}
      >
        {materials.map((m, index) => (
          <AccordionCard
            image={m.thumb}
            key={index}
            desc={m.title}
            title={`Material ${++index}`}
            onApply={() => {
              store15Pro.material = m.name;
            }}
          />
        ))}
      </AccordionDetailsWrap>
    </Accordion>
  );
};

type TransformationAccordionProps = CustomizableAccordionProps & {
    custom: {
        isScaleLock: boolean;
        setScaleLock: () => void;
    }
};

export const TransformationAccordion = ({
  custom,
  standard,
  auxiliary,
}: TransformationAccordionProps) => {
  const { params } = useSnapshot(store15Pro);

  return (
    <Accordion {...standard}>
      <AccordionSummary expandIcon={<ExpandMore />} {...auxiliary}>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Властивості
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Зміна позиції, повороту та масштабу наклейки
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
            Позиціонування
          </Typography>

          <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ArrowLeft fontSize="large" />
            <Slider
              name="decalXOffset"
              getAriaLabel={() => "Volume"}
              value={params.texturePosition[0]}
              min={-1}
              max={1}
              step={0.01}
              onChange={(e) => {
                if (e.target && "value" in e.target)
                  store15Pro.params.texturePosition[0] = Number(e.target.value);
              }}
            />
            <ArrowRight fontSize="large" />
          </Stack>
          <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
            <ArrowDropUp fontSize="large" />
            <Slider
              name="decalYOffset"
              getAriaLabel={() => "Volume"}
              value={params.texturePosition[1]}
              min={-0.3}
              max={0.3}
              step={0.01}
              onChange={(e) => {
                if (e.target && "value" in e.target) {
                  store15Pro.params.texturePosition[1] = Number(
                    e.target!.value
                  );
                }
              }}
            />
            <ArrowDropDown fontSize="large" />
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
            Масштаб
          </Typography>
          <Stack spacing={2} width={"90%"} direction="row" alignItems="center">
            <ZoomOut />
            <Slider
              name="decalXScale"
              getAriaLabel={() => "Volume"}
              value={params.textureScaling[0]}
              onChange={(e) => {
                if (e.target && "value" in e.target) {
                  store15Pro.params.textureScaling[0] = Number(e.target.value);

                  custom.isScaleLock &&
                    (store15Pro.params.textureScaling[1] = Number(
                      e.target.value
                    ));
                }
              }}
              min={0.6}
              max={1.4}
              step={0.01}
            />
            <ZoomIn />
          </Stack>
          <Button
            onClick={custom.setScaleLock}
          >
            <Display criteria={custom.isScaleLock} fallback={<Link />}>
              <LinkOff />
            </Display>
          </Button>
          <Stack spacing={2} width={"90%"} direction="row" alignItems="center">
            <ZoomOut />
            <Slider
              name="decalYScale"
              getAriaLabel={() => "Volume"}
              value={
                custom.isScaleLock
                  ? params.textureScaling[0]
                  : params.textureScaling[1]
              }
              onChange={(e) => {
                if (e.target && "value" in e.target) {
                  store15Pro.params.textureScaling[1] = Number(e.target.value);
                }
              }}
              min={0.6}
              max={1.4}
              step={0.01}
              disabled={custom.isScaleLock}
            />
            <ZoomIn />
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
            Поворот
          </Typography>
          <Stack spacing={2} width={"90%"} direction="row" alignItems="center">
            <Undo />
            <Slider
              name="decalZRotate"
              getAriaLabel={() => "Volume"}
              value={params.textureRotation}
              onChange={(e) => {
                if (e.target && "value" in e.target) {
                  store15Pro.params.textureRotation = Number(e.target.value);
                }
              }}
              min={-(Math.PI / 2)}
              max={Math.PI / 2}
              step={0.01}
            />
            <Redo />
          </Stack>
          <Button
            type="button"
            size="small"
            onClick={() => {
              store15Pro.params.textureRotation = 0;
            }}
          >
            скасувати
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export const ColorAccordion = ({
  standard,
  auxiliary,
}: CustomizableAccordionProps) => {
  return (
    <Accordion {...standard}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        {...auxiliary}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Колір кейсу
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Виберіть другорядний колір до Вашого кейсу
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ColorPicker />
      </AccordionDetails>
    </Accordion>
  );
};

type DecalAccordionProps = CustomizableAccordionProps & {
  custom: {
    decals: Decal[] | null;
    onClick: () => void;
  };
};

export const DecalAccordion = ({
  standard,
  auxiliary,
  custom,
}: DecalAccordionProps) => {
  return (
    <Accordion {...standard}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        {...auxiliary}
        onClick={custom.onClick}
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>Наклейки</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Виберіть круту наклейку
        </Typography>
      </AccordionSummary>
      <AccordionDetailsWrap
        style={{
          overflowY: "auto",
          minHeight: "max-content",
        }}
      >
        {custom.decals &&
          !!custom.decals.length &&
          custom.decals.map((d, index) => (
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
  );
};
