# 🎬 CineWave

**Stories worth your time.**

CineWave is a modern movie discovery platform designed to bring movie information, upcoming releases, box-office insights, live television, and YouTube video discovery into one interface.

## Features

* **Upcoming Movies:** Explore upcoming releases and available movie details.
* **Box Office:** Review available production budgets, reported collections, ratings, and estimated performance indicators.
* **YouTube Movie Search:** Search for movie videos and play eligible, embeddable results directly inside CineWave.
* **Live TV:** Browse television channels that pass the application's stream checks.
* **My List:** Keep track of selected titles.
* **Dark Interface:** Enjoy a cinematic interface with a modern design.

## Technology

* React
* Vite
* JavaScript
* TMDB API for movie metadata
* YouTube Data API for video search
* YouTube embedded player for in-site playback

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the required API credentials in `.env.local`.
4. Start the development server using `npm run dev`.

## API Configuration

Configure the following environment variables as required by the application:

* `VITE_TMDB_API_KEY`
* `VITE_TMDB_READ_ACCESS_TOKEN`
* `VITE_YOUTUBE_API_KEY`

Never commit real API credentials to a public repository.

## Important Notes

Movie listings, ratings, release dates, budgets, and box-office figures depend on the availability and accuracy of external data sources. YouTube playback depends on video availability, embedding permissions, and regional restrictions.

CineWave does not guarantee that every movie on YouTube is available for free or authorized for redistribution.

## License

Add a license after deciding how you want others to use, modify, and distribute your project.
