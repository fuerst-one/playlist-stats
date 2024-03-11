import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@/lib/QueryClientProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playlist-Stats - fuerst.one x Spotify",
  description: "Find out more about your Spotify Playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
