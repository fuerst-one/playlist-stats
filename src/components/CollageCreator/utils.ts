import { SpotifyImage } from "@/types/Spotify";
import { useCallback } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export enum CollageMode {
  Grid = "grid",
  Random = "random",
}

export const loadImages = async (images: SpotifyImage[]) => {
  const imagePromises = images
    .filter((image) => !!image.url)
    .map((image) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new window.Image();
        img.src = image.url!;
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
      });
    });
  return await Promise.all(imagePromises);
};

export const useGetImageProps = ({
  images,
  collageMode,
  canvasWidth,
  canvasHeight,
  imageSizeFactor,
  imageGap,
}: {
  images: SpotifyImage[];
  collageMode: CollageMode;
  canvasWidth: number;
  canvasHeight: number;
  imageSizeFactor: number;
  imageGap: number;
}) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const canvasWidthThrottled = useDebounce(canvasWidth, 250) / devicePixelRatio;
  const canvasHeightThrottled =
    useDebounce(canvasHeight, 250) / devicePixelRatio;

  return useCallback(
    (
      index: number,
    ): {
      width: number;
      height: number;
      x: number;
      y: number;
      zIndex: number;
    } => {
      const computedSize =
        ((images[index]?.width ?? 64) * imageSizeFactor) / devicePixelRatio;

      if (collageMode === "random") {
        return {
          width: computedSize,
          height: computedSize,
          x: Math.random() * canvasWidthThrottled - computedSize / 2,
          y: Math.random() * canvasHeightThrottled - computedSize / 2,
          zIndex: index,
        };
      }

      const computedImageGap = imageGap / devicePixelRatio;
      const sizeWithGap = computedSize + computedImageGap;

      const gridColumns = Math.ceil(canvasWidthThrottled / sizeWithGap);
      const gridRows = Math.ceil(canvasHeightThrottled / sizeWithGap);

      const hasMoreImagesThanColumns = images.length >= gridColumns;
      const hasMoreImagesThanRows =
        images.length >= gridColumns * (gridRows - 1) + 1;

      const finalWidth = sizeWithGap * gridColumns;
      const finalHeight = sizeWithGap * gridRows;
      const xOffset = hasMoreImagesThanColumns
        ? computedImageGap / 2 + (canvasWidthThrottled - finalWidth) / 2
        : computedImageGap / 2;
      const yOffset = hasMoreImagesThanRows
        ? computedImageGap / 2 + (canvasHeightThrottled - finalHeight) / 2
        : computedImageGap / 2;

      return {
        width: computedSize,
        height: computedSize,
        x: (index % gridColumns) * sizeWithGap + xOffset,
        y: Math.floor(index / gridColumns) * sizeWithGap + yOffset,
        zIndex: index,
      };
    },
    [
      images,
      collageMode,
      canvasWidthThrottled,
      canvasHeightThrottled,
      imageSizeFactor,
      imageGap,
      devicePixelRatio,
    ],
  );
};
