import React, { useMemo } from "react";
import { ResizableBox } from "react-resizable";
import { Stage, Layer, Rect } from "react-konva";
import { CollageCanvasImage } from "./CollageCanvasImage";
import { useCollageCreatorContext } from "./CollageCreatorContext";
import { CollageCanvasContainer } from "./CollageCanvasContainer";
import {
  CANVAS_MAX_HEIGHT,
  CANVAS_MAX_WIDTH,
  CANVAS_MIN_HEIGHT,
  CANVAS_MIN_WIDTH,
} from "./constants";

export const CollageCanvas = () => {
  const {
    canvasRef,
    isLoading,
    canvasImages,
    canvasWidth,
    canvasHeight,
    backgroundColor,
    setCanvasWidth,
    setCanvasHeight,
  } = useCollageCreatorContext();

  const setDimensions = (size: { width: number; height: number }) => {
    setCanvasWidth(size.width);
    setCanvasHeight(size.height);
  };

  const canvasImagesSorted = useMemo(() => {
    return [...canvasImages]
      .sort((a, b) => a.zIndex - b.zIndex)
      .filter((image) => image.y < canvasHeight);
  }, [canvasImages, canvasHeight]);

  if (isLoading) {
    return (
      <CollageCanvasContainer>
        <div className="text-lg font-semibold text-white">Loading...</div>
      </CollageCanvasContainer>
    );
  }

  return (
    <CollageCanvasContainer>
      <ResizableBox
        width={canvasWidth + 32}
        height={canvasHeight + 32}
        minConstraints={[CANVAS_MIN_WIDTH, CANVAS_MIN_HEIGHT]}
        maxConstraints={[CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT]}
        onResize={(_, { size }) => setDimensions(size)}
        className="bg-gray-800 p-4"
      >
        <Stage ref={canvasRef} width={canvasWidth} height={canvasHeight}>
          <Layer>
            <Rect
              width={canvasWidth}
              height={canvasHeight}
              fill={backgroundColor}
            />
          </Layer>
          <Layer>
            {canvasImagesSorted.map((image) => (
              <CollageCanvasImage key={image.id} image={image} />
            ))}
          </Layer>
        </Stage>
      </ResizableBox>
    </CollageCanvasContainer>
  );
};
