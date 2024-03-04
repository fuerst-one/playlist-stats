import React, { ReactNode } from "react";
import Image from "next/image";
import { LegalLinks } from "./LegalLinks";
import { Card } from "./ui/card";

export const IntroLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-800 p-4">
      <Image
        src="/preview.png"
        alt="Playlist Collage Preview"
        width={800}
        height={600}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
      />
      <Card className="z-10 shadow-xl">
        {children}
        <LegalLinks className="mb-2 flex px-2" />
      </Card>
    </main>
  );
};
