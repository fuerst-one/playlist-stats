import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CollageMode, useGetImageProps, loadImages } from "./utils";
import { useQuery } from "@tanstack/react-query";
import { TODO } from "@/types/TODO";

export type InputImage = {
  url?: string;
  width: number | null;
  height: number | null;
  meta?: {
    name: string;
    link?: string;
  };
};

export type CanvasImage = {
  id: string;
  url: string;
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  rotation?: number;
  meta: InputImage["meta"];
};

export type CollageCreatorContextType = {
  canvasRef: MutableRefObject<TODO>;
  isLoading: boolean;
  canvasImages: CanvasImage[];
  selectedImage: CanvasImage | null;
  canvasWidth: number;
  canvasHeight: number;
  collageMode: CollageMode;
  imageSizeFactor: number;
  imageGap: number;
  backgroundColor: string;
  isFullscreen: boolean;
  setCanvasImages: (
    canvasImages:
      | CanvasImage[]
      | ((canvasImages: CanvasImage[]) => CanvasImage[]),
  ) => void;
  setSelectedImage: (image: CanvasImage | null) => void;
  setCanvasWidth: (canvasWidth: number) => void;
  setCanvasHeight: (canvasHeight: number) => void;
  setCollageMode: (mode: CollageMode) => void;
  setImageSizeFactor: (imageSizeFactor: number) => void;
  setImageGap: (imageGap: number) => void;
  setBackgroundColor: (color: string) => void;
  toggleFullscreen: () => void;
  randomizeOrder: () => void;
};

export const CollageCreatorContext = createContext<CollageCreatorContextType>({
  canvasRef: { current: null },
  isLoading: true,
  canvasImages: [],
  selectedImage: null,
  canvasWidth: 800,
  canvasHeight: 600,
  collageMode: CollageMode.Grid,
  imageSizeFactor: 1,
  imageGap: 0,
  backgroundColor: "#00000000",
  isFullscreen: false,
  setCanvasImages: () => {},
  setSelectedImage: () => {},
  setCanvasWidth: () => {},
  setCanvasHeight: () => {},
  setCollageMode: () => {},
  setImageSizeFactor: () => {},
  setImageGap: () => {},
  setBackgroundColor: () => {},
  toggleFullscreen: () => {},
  randomizeOrder: () => {},
});

export const CollageCreatorProvider = <Image extends InputImage>({
  images,
  isInitialLoading,
  children,
}: {
  images: Image[];
  isInitialLoading: boolean;
  children: ReactNode;
}) => {
  type ResultImage = CanvasImage & { meta: Image["meta"] };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<TODO>(null);

  // State for the collage creator
  const [canvasImages, setCanvasImages] = useState<ResultImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const selectedImage =
    canvasImages.find((canvasImage) => canvasImage.id === selectedImageId) ??
    null;
  const setSelectedImage = (image: CanvasImage | null) => {
    setSelectedImageId(image?.id ?? null);
  };

  // State for the canvas dimensions
  const [canvasWidth, setCanvasWidth] = useState(750);
  const [canvasHeight, setCanvasHeight] = useState(1334);

  // State for the collage creator options
  const [collageMode, setCollageMode] = useState<CollageMode>(CollageMode.Grid);
  const [imageSizeFactor, setImageSizeFactor] = useState(1);
  const [imageGap, setImageGap] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#00000000");

  // Load the images using react-query
  const { data: loadedImages, isLoading: imagesLoading } = useQuery({
    queryKey: ["collage-images", images.map((image) => image.url)],
    queryFn: () => loadImages(images),
  });

  // Create the callback to calculate image props
  const getImageProps = useGetImageProps({
    images,
    collageMode,
    canvasWidth,
    canvasHeight,
    imageSizeFactor,
    imageGap,
  });

  // Set canvasImages when the images are loaded
  useEffect(() => {
    if (loadedImages) {
      setCanvasImages(
        loadedImages.map((loadedImage, index) => ({
          id: index.toString(),
          url: images[index].url!,
          image: loadedImage,
          meta: images[index].meta,
          ...getImageProps(index),
        })),
      );
    }
    // Deliberately not including getImageProps in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, loadedImages]);

  // Update canvasImages when options change
  useEffect(() => {
    setCanvasImages((canvasImages) =>
      canvasImages.map((canvasImage, index) => ({
        ...canvasImage,
        ...getImageProps(index),
      })),
    );
  }, [getImageProps]);

  const randomizeOrder = () => {
    setCanvasImages((canvasImages) =>
      [...canvasImages]
        .map((image) => ({
          ...image,
          zIndex: Math.round(Math.random() * canvasImages.length),
        }))
        .sort((a, b) => b.zIndex - a.zIndex)
        .map((image, index) => ({
          ...image,
          ...getImageProps(index),
        })),
    );
  };

  const isLoading =
    isInitialLoading ||
    imagesLoading ||
    (!!images.length && !canvasImages.length);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Watch for fullscreenchange
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <CollageCreatorContext.Provider
      value={{
        canvasRef,
        isLoading,
        canvasImages,
        selectedImage,
        canvasWidth,
        canvasHeight,
        collageMode,
        imageSizeFactor,
        imageGap,
        backgroundColor,
        isFullscreen,
        setCanvasImages,
        setSelectedImage,
        setCanvasWidth,
        setCanvasHeight,
        setCollageMode,
        setImageSizeFactor,
        setImageGap,
        setBackgroundColor,
        toggleFullscreen,
        randomizeOrder,
      }}
    >
      <div ref={containerRef} className={isFullscreen ? "bg-gray-900 p-4" : ""}>
        {children}
      </div>
    </CollageCreatorContext.Provider>
  );
};

export const useCollageCreatorContext = () => useContext(CollageCreatorContext);
