"use client";

import { AccessLink } from "@/components/AccessLink";
import { IntroLayout } from "@/components/IntroLayout";
import { LogoutButton } from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import { getSpotifyAccessToken } from "@/lib/spotifyTokens";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const spotifyAccessToken = getSpotifyAccessToken();

  return (
    <IntroLayout>
      <CardHeader>
        <h1 className="text-center text-xl font-bold text-secondary-light lg:text-4xl">
          Playlist-Stats
        </h1>
        <p className="text-center text-gray-300">
          Find out more about your Spotify Playlists
        </p>
      </CardHeader>
      <CardContent>
        {spotifyAccessToken ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <Link href="/playlists">
              <Button variant="primary" size="lg" className="shadow-lg">
                Start Digging
              </Button>
            </Link>
            <LogoutButton size="lg" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <Link href="/api/auth/login">
              <Button variant="primary" size="lg" className="shadow-lg">
                Login to{" "}
                <Image
                  src="/spotify/logo_black.png"
                  alt="Spotify Logo"
                  height={30}
                  width={80}
                  className="ml-1"
                />
              </Button>
            </Link>
            <AccessLink />
          </div>
        )}
      </CardContent>
    </IntroLayout>
  );
};

export default Home;
