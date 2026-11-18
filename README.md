# Playlist Stats

Explore the music inside a Spotify playlist through interactive charts: which artists appear most often, when the tracks were released, how long they run, and how their Spotify popularity values are distributed.

[Open the application](https://playlist-stats.vercel.app) · [Author and other projects](https://fuerst.one)

## What it shows

- Artist appearances across the playlist's tracks, including credited collaborators.
- Album release-date distributions with selectable time granularity.
- Track-duration distributions and average duration.
- Spotify popularity-value distributions and averages.
- The proportion of tracks marked explicit.

These charts describe the selected playlist's metadata. Artist counts are playlist appearances; popularity is Spotify's supplied track field. The application does not collect your playback history or calculate personal listening counts.

## Architecture

Built with Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI, TanStack Query, and Apache ECharts through `echarts-for-react`.

```text
Spotify login -> server-side token exchange -> browser token storage
Spotify playlist pages -> normalized TrackStatistic[] -> chart-specific aggregation -> ECharts
```

- The login route and callback implement Spotify's authorization-code flow; server functions handle code exchange and token refresh.
- Access and refresh tokens are stored in browser localStorage. The browser fetches Spotify data through a shared request wrapper.
- `fetchPlaylistStats` loads playlist pages and normalizes the fields required by the charts. Additional pages are fetched in batches of up to six concurrent requests.
- Statistic components aggregate the normalized data into chart series. There is no application database or historical analytics store.

The project shares playlist-browsing and authentication patterns with [Playlist Canvas](https://github.com/fuerst-one/playlist-canvas), which uses the album artwork for an editable collage.

## Run locally

Requirements: Node.js, Yarn (the repository includes `yarn.lock`), and a Spotify developer application with Web API access.

Create `.env.local` in the repository root:

```dotenv
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_URL=http://127.0.0.1:6860
```

`NEXTAUTH_URL` is used as the application origin for the repository's own authentication routes. The Spotify client secret is read only by server functions; keep `.env.local` out of version control.

Register this exact redirect URI in your Spotify application:

```text
http://127.0.0.1:6860/api/auth/callback
```

Use the explicit loopback address for local OAuth. Spotify requires HTTPS outside loopback development and does not accept `localhost` as a redirect host. See [Spotify redirect URI requirements](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri).

```sh
yarn install --frozen-lockfile
yarn dev
```

Open [127.0.0.1:6860](http://127.0.0.1:6860). Canvas and Stats use the same default development port, so run them separately or override the port and update the registered callback accordingly.

## Spotify access

The hosted application includes a **Request Access** link. Development-mode Spotify applications require an allowlisted account, and endpoint/field availability depends on Spotify's current policy. Missing or restricted API data can affect individual charts. See [Spotify quota modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).

## Source map

| Path                            | Responsibility                          |
| ------------------------------- | --------------------------------------- |
| `src/app/api/auth`              | Login route and callback page           |
| `src/server`                    | Spotify token exchange and refresh      |
| `src/lib/fetchPlaylistStats.ts` | Pagination and track-data normalization |
| `src/components/Playlist`       | Playlist navigation and track list      |
| `src/components/PlaylistStats`  | Chart cards and aggregation helpers     |

## Build and checks

```sh
yarn lint
yarn build
yarn start
```

The production server uses Next.js's default port unless `PORT` is set; keep the configured application origin and Spotify callback consistent. The repository does not currently define an automated test script.

Created by [Alexander Fürst](https://fuerst.one) as a personal API-integration and data-visualization project.
