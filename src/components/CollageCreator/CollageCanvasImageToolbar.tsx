import React from "react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { CanvasImage, useCollageCreatorContext } from "./CollageCreatorContext";
import { Cross1Icon, ExternalLinkIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const inputSize = "sm";

export const CollageCanvasImageToolbar = () => {
  const { canvasImages, selectedImage, setCanvasImages, setSelectedImage } =
    useCollageCreatorContext();

  if (!selectedImage) {
    return (
      <div className="flex items-center justify-start space-x-3">
        <Button size={inputSize} variant="outline" disabled>
          No Image Selected
        </Button>
      </div>
    );
  }

  const { zIndex } = selectedImage;

  const onChange = (newProps: Partial<CanvasImage>) => {
    setCanvasImages((canvasImages) =>
      canvasImages.map((canvasImage) =>
        canvasImage.id === selectedImage.id
          ? { ...canvasImage, ...newProps }
          : canvasImage,
      ),
    );
  };

  const onRemove = () => {
    setCanvasImages((canvasImages) =>
      canvasImages.filter((canvasImage) => canvasImage.id !== selectedImage.id),
    );
    setSelectedImage(null);
  };

  const reorderImage = (zIndex: number) => {
    onChange({
      zIndex,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-3">
      {selectedImage.meta && (
        <ButtonGroup>
          <Button
            size={inputSize}
            variant="outline"
            disabled={!selectedImage.meta.link}
          >
            {selectedImage.meta.name}
            {selectedImage.meta.link && (
              <Link
                href={selectedImage.meta!.link!}
                target="_blank"
                rel="noopener noreferer"
                className="ml-1"
              >
                <ExternalLinkIcon />
              </Link>
            )}
          </Button>
          <Button size={inputSize} variant="outline" onClick={onRemove}>
            <TrashIcon />
          </Button>
          <Button
            size={inputSize}
            variant="outline"
            onClick={() => setSelectedImage(null)}
          >
            <Cross1Icon />
          </Button>
        </ButtonGroup>
      )}
      <ButtonGroup>
        <Button size={inputSize} variant="outline" disabled>
          Move Image:
        </Button>
        <Button
          size={inputSize}
          onClick={() => reorderImage(0)}
          disabled={zIndex === 0}
        >
          Back
        </Button>
        <Button
          size={inputSize}
          variant="outline"
          onClick={() => reorderImage(zIndex - 1)}
          disabled={zIndex === 0}
        >
          -
        </Button>
        <Button
          size={inputSize}
          variant="outline"
          onClick={() => reorderImage(zIndex + 1)}
          disabled={zIndex === canvasImages.length - 1}
        >
          +
        </Button>
        <Button
          size={inputSize}
          onClick={() => reorderImage(canvasImages.length - 1)}
          disabled={zIndex === canvasImages.length - 1}
        >
          Front
        </Button>
      </ButtonGroup>
    </div>
  );
};
