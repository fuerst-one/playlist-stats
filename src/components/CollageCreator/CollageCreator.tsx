"use client";

import { CollageCreatorToolbar } from "./CollageCreatorToolbar";
import { CollageCreatorProvider, InputImage } from "./CollageCreatorContext";
import { CollageCanvasImageToolbar } from "./CollageCanvasImageToolbar";
import { CollageCanvas } from "./CollageCanvas";
import { DownloadButton } from "./DownloadButton";

export const CollageCreator = ({
  id,
  images,
  isInitialLoading,
}: {
  id: string;
  images: InputImage[];
  isInitialLoading: boolean;
}) => {
  return (
    <CollageCreatorProvider
      id={id}
      images={images}
      isInitialLoading={isInitialLoading}
    >
      <div className="space-y-3">
        <CollageCreatorToolbar />
        <CollageCanvasImageToolbar />
      </div>
      <CollageCanvas />
      <DownloadButton className="w-full" />
    </CollageCreatorProvider>
  );
};
