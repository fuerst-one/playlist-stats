import { Button } from "@/components/ui/button";
import { getSpotifyAccessToken } from "@/server/getSpotifyAccessToken";
import Image from "next/image";
import Link from "next/link";
import { AccessLink } from "@/components/AccessLink";
import { LogoutButton } from "@/components/LogoutButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LegalLinks } from "@/components/LegalLinks";

export default function HomePage() {
  const spotifyAccessToken = getSpotifyAccessToken();

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
        <CardHeader>
          <h1 className="text-center text-xl font-bold text-secondary-light lg:text-4xl">
            Playlist-Canvas
          </h1>
          <p>Create Album Art Collages with your Spotify Playlists</p>
        </CardHeader>
        <CardContent>
          {spotifyAccessToken ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <Link href="/playlists">
                <Button variant="primary" size="lg" className="shadow-lg">
                  Start Creating
                </Button>
              </Link>
              <LogoutButton size="lg" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <Link href="/login">
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
          <LegalLinks className="-mb-3 mt-3 flex" />
        </CardContent>
      </Card>
    </main>
  );
}
