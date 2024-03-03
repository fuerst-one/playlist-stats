import {
  PlusIcon,
  MinusIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
} from "@radix-ui/react-icons";
import { ReactNode, createRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useCollageCreatorContext } from "./CollageCreatorContext";

export const CanvasContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = createRef<HTMLDivElement>();
  const innerContainerRef = createRef<HTMLDivElement>();

  const {
    canvasWidth,
    canvasHeight,
    isFullscreen,
    toggleFullscreen,
    randomizeOrder,
  } = useCollageCreatorContext();
  const [zoom, setZoom] = useState(1);

  // Scroll to center on mount and when canvas size changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.scrollTo({
      top: (container.scrollHeight - container.clientHeight) / 2,
      left: (container.scrollWidth - container.clientWidth) / 2,
      behavior: "auto",
    });
  }, [containerRef, canvasWidth, canvasHeight]);

  // Zoom on ctrl + scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        setZoom((prevZoom) => Math.max(prevZoom - event.deltaY * 0.01, 0.1));
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [containerRef]);

  return (
    <div className="relative mb-2 mt-4 overflow-hidden rounded border border-gray-700 bg-gray-950">
      <div className="absolute right-6 top-2 z-10 flex items-center justify-end gap-1">
        <Button
          size="xs"
          variant="outline"
          onClick={randomizeOrder}
          className="text-xs"
        >
          Randomize Order
        </Button>
        <ButtonGroup>
          <Button size="xs" onClick={() => setZoom(zoom / 1.25)}>
            <MinusIcon />
          </Button>
          <Button size="xs" onClick={() => setZoom(1)} className="text-xs">
            {zoom !== 1 ? `${Math.round(zoom * 100)}%` : "100%"}
          </Button>
          <Button size="xs" onClick={() => setZoom(zoom * 1.25)}>
            <PlusIcon />
          </Button>
          <Button size="xs" onClick={toggleFullscreen}>
            {isFullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
          </Button>
        </ButtonGroup>
      </div>
      <div
        ref={containerRef}
        className="flex w-full overflow-auto scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-600"
        style={{
          height: isFullscreen ? "calc(100vh - 200px)" : "calc(100vh - 420px)",
        }}
      >
        <div
          ref={innerContainerRef}
          className="flex h-[2160px] w-[3840px] items-center justify-center"
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
