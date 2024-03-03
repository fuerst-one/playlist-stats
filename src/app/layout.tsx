import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@/lib/QueryClientProvider";
import { SpotifyAccessTokenProvider } from "@/lib/SpotifyAccessTokenProvider";

import "./globals.css";
import "react-resizable/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playlist-Canvas - by fuerst.one",
  description: "Create Album Art Collages with your Spotify Playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <SpotifyAccessTokenProvider />
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
