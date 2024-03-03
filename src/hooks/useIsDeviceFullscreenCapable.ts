export const useIsDeviceFullscreenCapable = () => {
  return typeof window !== "undefined" && "fullscreenEnabled" in document;
};
