import React from "react";
import { useCollageCreatorContext } from "./CollageCreatorContext";
import { Button } from "../ui/button";

export const DownloadButton = ({ className }: { className?: string }) => {
  const { downloadCanvas, isLoading } = useCollageCreatorContext();

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
