import React, { ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";
import Image from "next/image";
import Link from "next/link";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative lg:h-screen lg:w-screen">
      <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-3 bg-gray-800 px-4 py-2 shadow-header lg:static lg:h-16">
        <div className="flex flex-wrap items-center justify-start lg:flex-nowrap">
          <h1 className="w-full text-xl font-semibold text-white md:w-auto lg:text-3xl">
            Playlist-Canvas
          </h1>
          <span className="flex items-center gap-1 text-xs font-medium text-white md:mb-4 md:ml-2">
            <Link href="https://fuerst.one" className="hover:underline">
              fuerst.one
            </Link>{" "}
            x{" "}
            <Link href="https://spotify.com">
              <Image
                src="/spotify/logo_white.png"
                alt="Spotify Logo"
                width={50}
                height={20}
              />
            </Link>
          </span>
        </div>
        <LogoutButton />
      </div>
      <div className="mt-16 w-full pt-2 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:w-screen lg:overflow-hidden lg:pt-0">
        {children}
      </div>
    </div>
  );
};
