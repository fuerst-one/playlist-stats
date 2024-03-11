import { TrackStatistic } from "@/lib/fetchPlaylistStats";

const truncate = (text: string, length: number) =>
  text.length > length ? text.slice(0, length) + "..." : text;

export function TrackListItem({ track }: { track: TrackStatistic }) {
  const image = track.imageUrl;

  return (
    <div className="relative w-full cursor-pointer rounded p-1.5 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="flex w-full items-center gap-2 rounded p-2 md:flex-col md:justify-center">
        <div className="relative h-16 w-16 flex-shrink-0 md:h-24 md:w-24 xl:h-32 xl:w-32">
          <div className="overflow-hidden border md:mx-auto">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-full w-full object-cover"
                src={image || "/placeholder-user.jpg"}
                width={320}
                height={320}
                alt="Album Art"
              />
            ) : (
              <div className="h-full w-full bg-gray-900" />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-0.5 leading-tight md:justify-center">
          <p className="w-full font-semibold text-white md:text-center">
            {truncate(track.name, 30)}
          </p>
          <p className="w-full text-xs text-gray-500 md:text-center">
            {truncate(
              track.artists.map((artist) => artist.name).join(", "),
              30,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
