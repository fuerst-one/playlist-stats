import { downloadURI } from "@/utils/downloadURI";
import React from "react";
import { useCollageCreatorContext } from "./CollageCreatorContext";
import { Button } from "../ui/button";

export const DownloadButton = ({ className }: { className?: string }) => {
  const { canvasRef, isLoading } = useCollageCreatorContext();

  const downloadCanvas = () => {
    downloadURI(canvasRef.current?.toDataURL(), "collage.png");
  };

  return (
    <Button
      variant="primary"
      className={className}
      onClick={downloadCanvas}
      disabled={isLoading}
    >
      Download Collage
    </Button>
  );
};
