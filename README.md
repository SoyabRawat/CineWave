# CineWave 🎬

**A polished, responsive streaming-discovery UI starter built with React + Vite.** CineWave includes search, genre filters, a persistent watchlist, title details, trailer discovery, and a working player for an openly available sample movie.

> **Legal by design:** CineWave does not provide pirated movies or bypass paid streaming services. The demo player uses a sample video endpoint. For a real deployment, connect media you own or are authorized to stream and follow each metadata, artwork, and playback provider's terms.

## Features

- Live TV catalogue loaded asynchronously from the public IPTV-org India playlist
- Playlist parsing, local cache (6-hour TTL), channel search and category filters
- HLS playback in compatible browsers via hls.js; native HLS where supported
- Channel streams are loaded only when the user selects a channel, reducing startup network work

- Responsive dark streaming-style interface
- Search titles, descriptions, genres, and years
- Genre filtering
- Watchlist saved in `localStorage`
- Movie detail modal
- Working HTML5 player for the Big Buck Bunny sample
- Trailer discovery for other demo titles
- Accessible button labels and keyboard focus styles
- No backend or paid API key required for the demo UI

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
cinewave/
├── public/
├── src/
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Roadmap

- [ ] Add a proper movie metadata provider adapter (API key kept server-side where required)
- [ ] Add a backend for user accounts and synchronized watchlists
- [ ] Add a media-library connector for user-owned media
- [ ] Add provider availability links by region
- [ ] Add unit and component tests
- [ ] Add Docker deployment
- [ ] Add CI with lint, tests, and build checks
- [ ] Add accessibility and performance audits

## Live TV source, performance, and permissions

CineWave fetches `https://iptv-org.github.io/iptv/countries/in.m3u` in the browser, parses the channel list, and caches it in `localStorage` for up to six hours. The channel catalogue is fetched in the background on startup; the app does not open every stream or download channel video until a user selects a channel. This keeps initial loading lighter. If the playlist host blocks CORS or is unavailable, use Refresh channels or configure a server-side catalogue endpoint.

A public playlist entry is not proof of broadcasting rights. Before deploying CineWave publicly, review the source and permissions for every stream you expose. Keep only channels whose providers authorize the intended access and embedding. CineWave does not host or proxy the stream URLs. Individual streams may be offline, geo-restricted, or incompatible with browser playback. Never use this feature to bypass subscriptions or access controls.

## Important content and trademark notes

This repository is an independent UI starter and is not affiliated with Netflix, Prime Video, Disney+, or any other streaming service. Do not bundle or redistribute copyrighted movies, TV episodes, artwork, or subtitles without permission. Replace demo artwork and metadata with content supplied under appropriate licenses or through authorized APIs.

## Contributing

Issues and pull requests are welcome. Before submitting a pull request, describe the problem, explain the change, and include screenshots for UI changes where helpful.

## License

MIT — see [LICENSE](LICENSE).

## YouTube / free-movie shelf (added in this update)

CineWave now includes a **Free Movies** tab where users can add a YouTube video URL and play it inside the CineWave interface using YouTube's official embedded player. The list is stored in the current browser's localStorage; it is not synced between users or devices.

- Supports standard YouTube watch URLs, `youtu.be` links, Shorts, and live-video URLs.
- Uses YouTube's privacy-enhanced `youtube-nocookie.com` embed host.
- Users can name entries, play them in an in-page modal, and remove them from their local list.
- Embedding can fail if the uploader disables embedding, the video is restricted, or YouTube requires an account/age/location check.
- **A video being on YouTube does not mean it is copyright-free.** Only add videos you own, have permission to use, or have verified are public domain / appropriately licensed. This feature embeds the original YouTube player; it does not download or rehost videos.

The existing IPTV catalogue remains a public third-party playlist and individual stream availability, browser compatibility, and redistribution permissions are not guaranteed.


## CineWave 0.3 updates

- The Free Movies page now includes a ready-to-play starter catalogue of open-film sample streams. Users no longer need to paste a YouTube URL to try the section.
- Movie cards play through the built-in HTML video player. Verify each film's current license and attribution terms before production deployment.
- Live TV catalogues are fetched in parallel from the IPTV-org India and Hindi-language playlists, deduplicated, and cached for six hours.
- The UI includes animated open-movie cards, an animated hero/orbit treatment, responsive layouts, and reduced-motion support.

### Live TV caveat

M3U playlist entries can be offline, geo-restricted, require authorization, or block browser playback through CORS. Playlist inclusion is not a guarantee of playback or redistribution rights. CineWave does not bypass provider restrictions; use only streams whose providers authorize the intended playback.

## Verified Live TV and embedded open films

The Live TV catalogue now fetches the IPTV-org India and Hindi-language M3U playlists in parallel, deduplicates entries, and performs a browser-side reachability probe before displaying channels. A channel is shown only when its HTTPS HLS manifest and first media segment can be fetched with CORS from the current browser. The result is cached locally for one hour to make later visits faster. This is a best-effort technical check, not a guarantee that the live stream will keep working; providers can change access or fail on later segments. Streams that do not support browser CORS may be excluded even if a native TV/VLC player could open them.

CineWave's Free Movies shelf contains curated Blender open movies embedded through YouTube's official IFrame player. CineWave does not download, strip, or rehost YouTube video. YouTube branding/controls and any ads remain; a video owner can disable embedding. Do not claim that all popular commercial movies are free or authorized to embed. Check each title's current license and attribution requirements before production deployment.

The playlist is a discovery source, not proof of rights. Only publish channels when the provider authorizes the intended access and embedding. The application does not proxy streams or bypass geo-blocks, authentication, subscriptions, or DRM.

## Upcoming Movies hub

The Upcoming tab adds a release-radar catalogue with release date/region, director, cast, genre, budget context, release-window competition, hype notes, interesting facts, trailer status, rumours, and rating expectations. Trailer playback uses YouTube's official embedded player for titles with verified trailer IDs. Films without a verified official trailer intentionally have a disabled trailer button rather than embedding unverified fan uploads.

Editorial labels matter: hype and expected ratings are estimates, not audience scores; rumours are labelled unverified; budgets are marked undisclosed or reported when an official figure is not available. Release dates may change. Before production use, refresh these records against official studio/distributor sources and consider adding a backend data feed so dates, posters, trailer IDs and source timestamps can be updated without editing the frontend.

## Rolling Upcoming Movies and Box Office Verdicts

CineWave now includes:

- **Upcoming Movies**: a rolling four-month release window, queried across India, US, UK, South Korea and Japan release regions.
- **Box Office Verdicts**: recent movies from a rolling eight-month window, with listed production budget, worldwide gross, TMDB rating/vote count, cast/director and a transparent gross-to-budget indicator.
- Refresh buttons and a six-hour refresh interval while the relevant section is open; results are cached in local storage for six hours.
- TMDB-powered posters and movie details. Trailer buttons search for the title's official trailer; CineWave does not claim an unverified video is official or embed random uploads.

### Enable automatic data refresh

1. Create a TMDB account and request an API key at https://www.themoviedb.org/settings/api.
2. Copy `.env.example` to `.env.local` in the project root.
3. Set `VITE_TMDB_API_KEY=your_actual_key` in `.env.local`.
4. Restart the development server (`npm run dev`).

**Important:** a Vite environment variable is bundled into browser JavaScript and is not secret. For a publicly deployed site, route TMDB requests through a server-side proxy and apply rate limiting. TMDB catalog coverage and financial figures can be incomplete, especially for local/independent releases. “All movies” cannot be guaranteed by any one database. The verdict bands are rough indicators, not official trade verdicts or profit calculations: marketing, distribution costs, exhibitor shares, streaming deals and territory-specific revenue are not included. Ratings are current TMDB vote averages, not predicted ratings.
