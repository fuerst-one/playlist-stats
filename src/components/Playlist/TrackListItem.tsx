import { SpotifyPlaylistItem } from "@/types/Spotify";
import { CheckIcon } from "@radix-ui/react-icons";

const truncate = (text: string, length: number) =>
  text.length > length ? text.slice(0, length) + "..." : text;

export function TrackListItem({
  track,
  isSelected,
  onClick,
}: {
  track: SpotifyPlaylistItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const image = track.track.album.images[1];

  return (
    <div
      className="relative w-full cursor-pointer rounded p-1.5 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      onClick={onClick}
    >
      <div className="flex w-full items-center gap-2 rounded p-2 md:flex-col md:justify-center">
        <div className="relative h-16 w-16 flex-shrink-0 md:h-24 md:w-24 xl:h-32 xl:w-32">
          <div className="overflow-hidden border md:mx-auto">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-full w-full object-cover"
                src={image.url || "/placeholder-user.jpg"}
                width={image.width ?? 64}
                height={image.height ?? 64}
                alt="Album Art"
              />
            ) : (
              <div className="h-full w-full bg-gray-900" />
            )}
          </div>
          <div
            className={`absolute -right-2 -top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border text-xs font-semibold md:-right-2.5 md:-top-2 md:h-6 md:w-6 ${
              isSelected
                ? "border-primary-dark bg-primary text-black"
                : "bg-gray-100 text-black"
            }`}
          >
            <CheckIcon />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-0.5 leading-tight md:justify-center">
          <p className="w-full font-semibold text-white md:text-center">
            {truncate(track.track.name, 30)}
          </p>
          <p className="w-full text-xs text-gray-500 md:text-center">
            {truncate(
              track.track.artists.map((artist) => artist.name).join(", "),
              30,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
