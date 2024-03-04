import { ReactNode } from "react";
import { SpotifyAccessTokenGuard } from "@/lib/SpotifyAccessTokenGuard";

const LoggedInLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SpotifyAccessTokenGuard />
      {children}
    </>
  );
};

export default LoggedInLayout;
