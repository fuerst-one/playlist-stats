import React from "react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { CollageMode } from "./utils";
import { useCollageCreatorContext } from "./CollageCreatorContext";
import clamp from "lodash/clamp";
import { CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT } from "./constants";

const inputSize = "sm";

const resolutionOptions = [
  {
    label: "Phone",
    width: 750,
    height: 1334,
  },
  {
    label: "Desktop",
    width: 1920,
    height: 1080,
  },
];

export const CollageCreatorToolbar = () => {
  const {
    canvasWidth,
    canvasHeight,
    collageMode,
    imageSizeFactor,
    imageGap,
    backgroundColor,
    setCanvasWidth,
    setCanvasHeight,
    setCollageMode,
    setImageSizeFactor,
    setImageGap,
    setBackgroundColor,
  } = useCollageCreatorContext();

  const isCustomResolution = resolutionOptions.every(
    (option) => option.width !== canvasWidth || option.height !== canvasHeight,
  );

  return (
    <div className="flex flex-wrap items-center justify-start gap-3">
      <ButtonGroup>
        {resolutionOptions.map((option) => (
          <Button
            size={inputSize}
            key={option.label}
            variant={
              option.width === canvasWidth && option.height === canvasHeight
                ? "default"
                : "outline"
            }
            onClick={() => {
              setCanvasWidth(option.width);
              setCanvasHeight(option.height);
            }}
          >
            {option.label}
          </Button>
        ))}
        <Button
          size={inputSize}
          variant={isCustomResolution ? "default" : "outline"}
          onClick={() => {
            setCanvasWidth(640);
            setCanvasHeight(640);
          }}
        >
          Custom
        </Button>
      </ButtonGroup>
      {isCustomResolution && (
        <ButtonGroup className="-ml-2">
          <Input
            $size={inputSize}
            type="number"
            value={Math.round(canvasWidth)}
            onChange={(e) => {
              setCanvasWidth(
                clamp(parseInt(e.currentTarget.value), CANVAS_MAX_WIDTH),
              );
            }}
            className="w-[80px]"
          />
          <Button size={inputSize} variant="outline" disabled>
            x
          </Button>
          <Input
            $size={inputSize}
            type="number"
            value={Math.round(canvasHeight)}
            onChange={(e) => {
              setCanvasHeight(
                clamp(parseInt(e.currentTarget.value), CANVAS_MAX_HEIGHT),
              );
            }}
            className="w-[80px]"
          />
        </ButtonGroup>
      )}
      <ButtonGroup>
        <Button
          size={inputSize}
          variant={collageMode === "grid" ? "default" : "outline"}
          onClick={() => setCollageMode(CollageMode.Grid)}
        >
          Grid
        </Button>
        <Button
          size={inputSize}
          variant={collageMode === "random" ? "default" : "outline"}
          onClick={() => {
            // Retrigger the positioning useEffect
            setCollageMode(CollageMode.Grid);
            setTimeout(() => setCollageMode(CollageMode.Random), 0);
          }}
        >
          Random
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size={inputSize} variant="outline" disabled>
          Artwork size:
        </Button>
        <Button
          size={inputSize}
          onClick={() => setImageSizeFactor(imageSizeFactor - 0.1)}
          disabled={imageSizeFactor <= 0.11}
        >
          -
        </Button>
        <Input
          $size={inputSize}
          type="number"
          min={0.1}
          step={0.1}
          value={Math.round(imageSizeFactor * 10) / 10}
          onChange={(e) =>
            setImageSizeFactor(
              clamp(parseFloat(e.currentTarget.value), 0.1, 10),
            )
          }
          className="w-[68px] font-medium"
        />
        <Button
          size={inputSize}
          onClick={() => setImageSizeFactor(imageSizeFactor + 0.1)}
          disabled={imageSizeFactor >= 10}
        >
          +
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size={inputSize} variant="outline" disabled>
          Gap:
        </Button>
        <Button
          size={inputSize}
          onClick={() => setImageGap(imageGap - 5)}
          disabled={imageGap <= 0}
        >
          -
        </Button>
        <Input
          $size={inputSize}
          type="number"
          value={imageGap}
          onChange={(e) =>
            setImageGap(clamp(parseInt(e.currentTarget.value), 0, 100))
          }
          className="w-[68px] font-medium"
        />
        <Button
          size={inputSize}
          onClick={() => setImageGap(imageGap + 5)}
          disabled={imageGap >= 100}
        >
          +
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size={inputSize} variant="outline" disabled>
          Background color:
        </Button>
        <Input
          $size={inputSize}
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-[30px] p-0"
        />
      </ButtonGroup>
    </div>
  );
};
