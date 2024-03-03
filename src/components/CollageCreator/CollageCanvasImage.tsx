import { TODO } from "@/types/TODO";
import React, { useEffect, useRef, useState } from "react";
import { Group, Image, Rect, Text, Transformer } from "react-konva";
import { CanvasImage, useCollageCreatorContext } from "./CollageCreatorContext";

const MIN_SIZE = 50;

export const CollageCanvasImage = ({ image }: { image: CanvasImage }) => {
  // Konva ref types are not properly exported from the library
  const imageRef = useRef<TODO>(null);
  const transformerRef = useRef<TODO>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { selectedImage, setSelectedImage, setCanvasImages } =
    useCollageCreatorContext();

  const isSelected = selectedImage?.id === image.id;
  const otherImageSelected = !!selectedImage && !isSelected;

  useEffect(() => {
    if (isSelected) {
      transformerRef.current?.nodes([imageRef.current]);
      transformerRef.current.zIndex(99999);
      transformerRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  const selectImage = () => {
    setSelectedImage(isSelected ? null : image);
  };
  const onChangeImage = (newProps: CanvasImage) => {
    setCanvasImages((canvasImages) =>
      canvasImages.map((img) => (img.id === newProps.id ? newProps : img)),
    );
  };
  const swapImages = () => {
    if (!selectedImage) {
      return;
    }
    setCanvasImages((canvasImages) =>
      canvasImages.map((canvasImage) => {
        if (canvasImage.id === selectedImage.id) {
          const { x, y, zIndex, rotation } = image;
          return { ...canvasImage, x, y, zIndex, rotation };
        }
        if (canvasImage.id === image.id) {
          const { x, y, zIndex, rotation } = selectedImage;
          return { ...canvasImage, x, y, zIndex, rotation };
        }
        return canvasImage;
      }),
    );
  };

  const imageProps = { ...image, zIndex: undefined };
  const maxWidth = Math.min(100, image.width - 10);

  return (
    <>
      <Group
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          draggable
          ref={imageRef}
          {...imageProps}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.3}
          shadowOffsetY={5}
          onClick={selectImage}
          onTap={selectImage}
          onDragEnd={(e) => {
            onChangeImage({
              ...image,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={() => {
            const node = imageRef.current;
            onChangeImage({
              ...image,
              x: node.x(),
              y: node.y(),
              width: Math.max(MIN_SIZE, node.width()),
              height: Math.max(MIN_SIZE, node.height()),
            });
          }}
        />
        {otherImageSelected && isHovered && (
          <Group onClick={swapImages}>
            <Rect
              x={image.x + image.width / 2 - maxWidth / 2}
              y={image.y + image.height / 2 - 15}
              width={maxWidth}
              height={30}
              fill="rgba(255,255,255,0.8)"
              shadowBlur={10}
              shadowOpacity={0.3}
              shadowOffsetY={5}
              cornerRadius={5}
            />
            <Text
              text="swap"
              x={image.x + image.width / 2 - maxWidth / 2}
              y={image.y + image.height / 2 - 15}
              width={maxWidth}
              height={30}
              align="center"
              verticalAlign="middle"
              fontSize={20}
            />
          </Group>
        )}
      </Group>
      {isSelected && (
        <Transformer
          ref={transformerRef}
          flipEnabled={false}
          keepRatio={true}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          rotationSnaps={[0, 90, 180, 270]}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit the minimum size of the image
            if (
              Math.abs(newBox.width) < MIN_SIZE ||
              Math.abs(newBox.height) < MIN_SIZE
            ) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
