import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, Play, Plus, Check, ChevronDown, Info, Film, Heart, Compass,
  Sparkles, Menu, X, ArrowRight, Clapperboard, Github, ExternalLink, Tv, RefreshCw, Radio, Youtube, TrendingUp, CalendarDays, BadgeCheck
} from 'lucide-react';
import './styles.css';

const demoMovie = {
  id: 'bbb', title: 'Big Buck Bunny', year: 2008, rating: 'G', duration: '10 min', genre: 'Animation',
  description: 'A giant rabbit with a big heart gets pushed too far by a trio of mischievous rodents. A beloved open movie created by the Blender Foundation.',
  poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=85',
  backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90',
  video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  playable: true, tag: 'OPEN MOVIE',
};

const titles = [
  demoMovie,
  { id: 'interstellar', title: 'Interstellar', year: 2014, rating: 'PG-13', duration: '2h 49m', genre: 'Sci-Fi', description: 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop: 'https://image.tmdb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', trailer: 'https://www.youtube.com/results?search_query=Interstellar+official+trailer', tag: 'TIMELESS CLASSIC' },
  { id: 'dune2', title: 'Dune: Part Two', year: 2024, rating: 'PG-13', duration: '2h 46m', genre: 'Sci-Fi', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', backdrop: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg', trailer: 'https://www.youtube.com/results?search_query=Dune+Part+Two+official+trailer', tag: 'EDITOR’S PICK' },
  { id: 'spiderverse', title: 'Across the Spider-Verse', year: 2023, rating: 'PG', duration: '2h 20m', genre: 'Animation', description: 'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People protecting its existence.', poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj705m8.jpg', backdrop: 'https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg', trailer: 'https://www.youtube.com/results?search_query=Across+the+Spider-Verse+official+trailer', tag: 'VISUAL MASTERPIECE' },
  { id: 'batman', title: 'The Batman', year: 2022, rating: 'PG-13', duration: '2h 56m', genre: 'Crime', description: 'Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of cryptic clues.', poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', backdrop: 'https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg', trailer: 'https://www.youtube.com/results?search_query=The+Batman+official+trailer', tag: 'DARK & GRITTY' },
  { id: 'oppenheimer', title: 'Oppenheimer', year: 2023, rating: 'R', duration: '3h', genre: 'Drama', description: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.', poster: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg', backdrop: 'https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', trailer: 'https://www.youtube.com/results?search_query=Oppenheimer+official+trailer', tag: 'AWARD WINNER' },
  { id: 'puss', title: 'Puss in Boots: The Last Wish', year: 2022, rating: 'PG', duration: '1h 42m', genre: 'Animation', description: 'Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives.', poster: 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg', backdrop: 'https://image.tmdb.org/t/p/w1280/aTovUMXk7XnW8SlEvO7o5B8k3e1.jpg', trailer: 'https://www.youtube.com/results?search_query=Puss+in+Boots+The+Last+Wish+official+trailer', tag: 'FAMILY NIGHT' },
  { id: 'arrival', title: 'Arrival', year: 2016, rating: 'PG-13', duration: '1h 56m', genre: 'Sci-Fi', description: 'A linguist works with the military to communicate with alien lifeforms after mysterious spacecraft appear around the world.', poster: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg', backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=85', trailer: 'https://www.youtube.com/results?search_query=Arrival+official+trailer', tag: 'THINKING PERSON’S SCI-FI' },
  { id: 'whiplash', title: 'Whiplash', year: 2014, rating: 'R', duration: '1h 47m', genre: 'Drama', description: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams are mentored by an instructor who will stop at nothing.', poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg', backdrop: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=85', trailer: 'https://www.youtube.com/results?search_query=Whiplash+official+trailer', tag: 'INTENSE DRAMA' },
  { id: 'coco', title: 'Coco', year: 2017, rating: 'PG', duration: '1h 45m', genre: 'Animation', description: 'A young musician enters the Land of the Dead to discover his family history and the meaning of music.', poster: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg', backdrop: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85', trailer: 'https://www.youtube.com/results?search_query=Coco+official+trailer', tag: 'HEARTWARMING' },
  { id: 'johnwick', title: 'John Wick', year: 2014, rating: 'R', duration: '1h 41m', genre: 'Action', description: 'An ex-hitman comes out of retirement to track down the gangsters who took everything from him.', poster: 'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg', backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85', trailer: 'https://www.youtube.com/results?search_query=John+Wick+official+trailer', tag: 'ACTION PICK' },
];

const genres = ['All', 'Sci-Fi', 'Animation', 'Action', 'Drama', 'Crime'];
const PLAYLIST_SOURCES = [
  { label: 'India', url: 'https://iptv-org.github.io/iptv/countries/in.m3u' },
  { label: 'Hindi-language', url: 'https://iptv-org.github.io/iptv/languages/hin.m3u' },
];

// Openly licensed sample films for a ready-to-use catalogue; no user URL required.
const OPEN_MOVIES = [
  { id: 'open-bunny', title: 'Big Buck Bunny', year: 2008, duration: '10 min', genre: 'Animation', license: 'CC BY 3.0', description: 'A cheerful open animated short from the Blender Institute.', video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=85', tag: 'OPEN FILM' },
  { id: 'open-elephants', title: 'Elephants Dream', year: 2006, duration: '11 min', genre: 'Sci-Fi', license: 'Creative Commons', description: 'An experimental animated film from the Orange open movie project.', video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=85', tag: 'OPEN FILM' },
  { id: 'open-sintel', title: 'Sintel', year: 2010, duration: '15 min', genre: 'Fantasy', license: 'CC BY 3.0', description: 'A fantasy short film produced as an open movie by the Blender Institute.', video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85', tag: 'OPEN FILM' },
  { id: 'open-tears', title: 'Tears of Steel', year: 2012, duration: '12 min', genre: 'Sci-Fi', license: 'CC BY 3.0', description: 'A science-fiction short created by the Blender Institute open movie team.', video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85', tag: 'OPEN FILM' },
];

// Editorial starter data for the Upcoming Movies hub. Dates/budgets/rumours are labelled
// by confidence so speculation is never presented as confirmed fact.
const UPCOMING_MOVIES = [
  { id: 'up-ramayana', title: 'Ramayana: Rise of a Legend', release: '5 November 2026', region: 'India / Worldwide', director: 'Nitesh Tiwari', cast: 'Ranbir Kapoor, Sai Pallavi, Yash, Sunny Deol, Ravi Dubey', genre: 'Mythological epic · Action · Drama', budget: 'Reported as an exceptionally large two-part production; exact audited figure not officially confirmed.', clash: 'Arrives in the crowded Diwali frame; competing titles and screen allocation may affect opening-week collections.', hype: 'Very high — iconic source material, major pan-Indian cast, global VFX ambitions.', trailerStatus: 'Official trailer available', videoId: '1zip1rNaNYs', poster: 'https://img.youtube.com/vi/1zip1rNaNYs/maxresdefault.jpg', description: 'A large-scale retelling of the Ramayana, following Rama, Sita and Ravana.', facts: 'Music is credited to A. R. Rahman and Hans Zimmer; VFX work is associated with DNEG.', rumour: 'Fan theories about story emphasis and character screen time are unconfirmed; rely on official footage for confirmed details.', expectedRating: 'Early expectation: 7.5–8.5/10 (editorial estimate, not an audience score)', trailerInfo: 'The official trailer gives a first look at the mythology, production scale and principal cast.' },
  { id: 'up-avengers-doomsday', title: 'Avengers: Doomsday', release: '18 December 2026 (official Disney listing)', region: 'Worldwide', director: 'Anthony Russo & Joe Russo', cast: 'Robert Downey Jr., Chris Evans, Chris Hemsworth, Pedro Pascal, Florence Pugh and ensemble', genre: 'Superhero · Action · Science fiction', budget: 'Not officially confirmed by the studio.', clash: 'A major holiday release competing for premium large-format screens and seasonal audience attention.', hype: 'Very high — a major Marvel crossover with characters from multiple corners of the franchise.', trailerStatus: 'Official trailer available', videoId: 'fxNh27fRdYA', poster: 'https://img.youtube.com/vi/fxNh27fRdYA/maxresdefault.jpg', description: 'Heroes from multiple universes face an existential threat.', facts: 'Stephen McFeely is credited as writer; Kevin Feige is among the producers.', rumour: 'Unconfirmed cameo and plot-leak claims circulate online. They are not treated as facts here.', expectedRating: 'Early expectation: 7.0–8.5/10 (editorial estimate, not an audience score)', trailerInfo: 'The official trailer is available from Marvel/Disney and plays here via YouTube’s embedded player.' },
  { id: 'up-king', title: 'King', release: '24 December 2026 (announced)', region: 'India', director: 'Siddharth Anand', cast: 'Shah Rukh Khan, Suhana Khan, Deepika Padukone, Abhishek Bachchan, Rani Mukerji', genre: 'Action · Thriller (reported)', budget: 'No confirmed official budget published.', clash: 'Christmas-week release; likely competition for screens from other holiday titles.', hype: 'Very high — Shah Rukh Khan leads a film featuring his daughter Suhana; directed by Siddharth Anand.', trailerStatus: 'Full trailer not confirmed in this catalogue', videoId: null, poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85', description: 'A high-profile action project with a star-studded cast.', facts: 'The film is scheduled for a Christmas Eve theatrical release according to recent reporting.', rumour: 'Story details and character relationships reported by fan pages remain unverified unless confirmed by the makers.', expectedRating: 'Too early to estimate responsibly; no score assigned.', trailerInfo: 'A playable official trailer ID has not been verified yet. This card will not embed unofficial uploads.' },
  { id: 'up-yeh-prem', title: 'Yeh Prem Mol Liya', release: '27 November 2026 (YRF listing)', region: 'India', director: 'Sooraj R. Barjatya', cast: 'Ayushmann Khurrana, Sharvari, Anupam Kher, Seema Pahwa', genre: 'Romance · Family drama', budget: 'Not officially disclosed.', clash: 'Late-November release; competition depends on final regional releases and screen availability.', hype: 'Moderate to high among fans of family romances and the director’s style.', trailerStatus: 'Trailer not verified in this catalogue', videoId: null, poster: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=85', description: 'A family romance from Rajshri Productions and Mahaveer Jain Films.', facts: 'Music is credited to Himesh Reshammiya; release date and credits are listed by Yash Raj Films.', rumour: 'Online casting or plot claims beyond the published credits are unverified.', expectedRating: 'Too early to estimate responsibly; no score assigned.', trailerInfo: 'No verified official trailer ID has been added yet; the trailer button is disabled until confirmed.' }
];

const CHANNEL_CACHE_KEY = 'cinewave-india-verified-channels-v3';
const CHANNEL_CACHE_TTL = 60 * 60 * 1000;
const CHANNEL_PROBE_TIMEOUT_MS = 1800;
const CHANNEL_PROBE_CONCURRENCY = 16;

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP = 'https://image.tmdb.org/t/p/w1280';
const MOVIE_REGIONS = ['IN', 'US', 'GB', 'KR', 'JP'];
const MOVIE_CACHE_TTL = 6 * 60 * 60 * 1000;
const dateISO = (date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const addMonths = (date, amount) => { const copy = new Date(date); copy.setMonth(copy.getMonth()+amount); return copy; };
function tmdbMovieUrl(path, params = {}) {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  Object.entries(params).forEach(([k,v]) => v !== undefined && v !== null && url.searchParams.set(k, String(v)));
  return url.href;
}
async function tmdbGet(path, params = {}) {
  if (!TMDB_API_KEY) throw new Error('Add VITE_TMDB_API_KEY to .env.local to enable automatic movie updates.');
  const response = await fetch(tmdbMovieUrl(path, params));
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  return response.json();
}
async function discoverMovieWindow(from, to, perRegionPages = 3) {
  const batches = await Promise.all(MOVIE_REGIONS.flatMap(region => Array.from({length:perRegionPages}, (_,i) =>
    tmdbGet('/discover/movie', {region, include_adult:false, include_video:false, language:'en-US', sort_by:'popularity.desc', 'primary_release_date.gte':from, 'primary_release_date.lte':to, page:i+1})
      .catch(() => ({results:[]}))
  )));
  const byId = new Map();
  batches.flatMap(b => b.results || []).forEach(movie => { if (movie.release_date && movie.poster_path) byId.set(movie.id, movie); });
  return [...byId.values()].sort((a,b) => (a.release_date || '').localeCompare(b.release_date || '') || (b.popularity||0)-(a.popularity||0));
}
async function getMovieDetails(movie) {
  const detail = await tmdbGet(`/movie/${movie.id}`, {language:'en-US', append_to_response:'credits,videos'});
  const crew = detail.credits?.crew || [];
  const cast = detail.credits?.cast || [];
  const director = crew.find(person => person.job === 'Director')?.name || 'Not listed';
  const revenue = Number(detail.revenue || 0), budget = Number(detail.budget || 0);
  const officialTrailer = (detail.videos?.results || []).find(video => video.site === 'YouTube' && video.type === 'Trailer' && video.official && video.key) || (detail.videos?.results || []).find(video => video.site === 'YouTube' && video.type === 'Trailer' && video.key); 
  let verdict = 'Too early / insufficient data';
  let verdictReason = 'Revenue or budget data is missing, or the film has not completed its theatrical run. Streaming, marketing, exhibitor shares and regional splits are not included.';
  if (revenue > 0 && budget > 0) {
    const multiple = revenue / budget;
    if (multiple >= 3) { verdict = 'Strong gross-to-budget ratio'; verdictReason = `Reported worldwide gross is about ${multiple.toFixed(1)}× the listed production budget. This is a positive signal, not a profit calculation.`; }
    else if (multiple >= 1.8) { verdict = 'Potentially healthy theatrical run'; verdictReason = `Reported worldwide gross is about ${multiple.toFixed(1)}× the listed budget. Final profitability depends on marketing costs and revenue shares.`; }
    else if (multiple >= 1) { verdict = 'Break-even uncertain'; verdictReason = `Reported worldwide gross is about ${multiple.toFixed(1)}× the listed budget; marketing and distribution costs may keep it from breaking even.`; }
    else { verdict = 'Under-budget gross so far'; verdictReason = `Reported worldwide gross is about ${multiple.toFixed(1)}× the listed budget at the time of data retrieval. This can change as releases continue.`; }
  }
  return {
    id: `tmdb-${detail.id}`, tmdbId:detail.id, title:detail.title || movie.title, release:detail.release_date || movie.release_date,
    poster:detail.poster_path ? `${TMDB_IMAGE}${detail.poster_path}` : '', backdrop:detail.backdrop_path ? `${TMDB_BACKDROP}${detail.backdrop_path}` : '',
    description:detail.overview || 'No synopsis supplied by the movie database.', genre:(detail.genres||[]).map(g=>g.name).join(' · ') || 'Film',
    director, cast:cast.slice(0,6).map(person=>person.name).join(', ') || 'Cast details unavailable',
    budget, revenue, budgetText:budget ? `Listed production budget: ${money(budget)}` : 'Production budget not listed',
    revenueText:revenue ? `Worldwide gross listed: ${money(revenue)}` : 'Worldwide gross not listed',
    rating:detail.vote_count > 0 ? `${Number(detail.vote_average||0).toFixed(1)}/10 (${detail.vote_count.toLocaleString()} TMDB votes)` : 'Not enough votes',
    voteAverage:Number(detail.vote_average||0), voteCount:Number(detail.vote_count||0), verdict, verdictReason,
    popularity:Number(detail.popularity||movie.popularity||0), status:detail.status || 'Unknown',
    trailerSearch:`https://www.youtube.com/results?search_query=${encodeURIComponent(`${detail.title} official trailer`)}`,
    posterFallback: !detail.poster_path
  };
}
function money(value) { return new Intl.NumberFormat('en-IN',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value); }
async function mapConcurrent(items, limit, mapper) {
  const out = new Array(items.length); let next = 0;
  const worker = async () => { while (next < items.length) { const index = next++; try { out[index] = await mapper(items[index], index); } catch { out[index] = null; } } };
  await Promise.all(Array.from({length:Math.min(limit,items.length)}, worker)); return out;
}
function readMovieCache(key) { try { const data=JSON.parse(localStorage.getItem(key)||'null'); return data && Date.now()-data.savedAt<MOVIE_CACHE_TTL ? data.items : null; } catch { return null; } }
function writeMovieCache(key, items) { try { localStorage.setItem(key,JSON.stringify({savedAt:Date.now(),items})); } catch {} }

// Curated open films published by Blender Foundation/Blender. The official YouTube
// player is embedded in CineWave; the app never downloads or rehosts YouTube media.
const YOUTUBE_CATALOGUE = [
  { id: 'yt-big-buck-bunny', videoId: 'aqz-KE-bpKQ', title: 'Big Buck Bunny', year: 2008, duration: '10 min', genre: 'Animation', tag: 'OPEN MOVIE', license: 'CC BY 3.0', poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=85', description: 'A cheerful animated short from the Blender Institute. Published as open content under Creative Commons Attribution 3.0.' },
  { id: 'yt-sintel', videoId: 'eRsGyueVLvQ', title: 'Sintel', year: 2010, duration: '15 min', genre: 'Fantasy', tag: 'OPEN MOVIE', license: 'CC BY 3.0', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85', description: 'An open fantasy short film from the Blender Foundation, available through the official Blender YouTube upload.' },
  { id: 'yt-tears-of-steel', videoId: 'R6MlUcmOul8', title: 'Tears of Steel', year: 2012, duration: '12 min', genre: 'Sci-Fi', tag: 'OPEN MOVIE', license: 'CC BY 3.0', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85', description: 'A science-fiction open movie by the Blender Foundation, released under Creative Commons Attribution.' },
  { id: 'yt-elephants-dream', videoId: 'TLkA0RELQ1g', title: "Elephants Dream", year: 2006, duration: '11 min', genre: 'Sci-Fi', tag: 'OPEN MOVIE', license: 'CC BY 2.5', poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=85', description: 'The first open movie created by the Blender Foundation, released under a Creative Commons license.' },
  { id: 'yt-cosmos-laundromat', videoId: 'Y-rmzh0PI3c', title: 'Cosmos Laundromat: First Cycle', year: 2015, duration: '12 min', genre: 'Fantasy', tag: 'OPEN MOVIE', license: 'CC BY-SA 3.0', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85', description: 'The pilot of an open animated film project from the Blender Foundation.' },
  { id: 'yt-spring', videoId: 'WhWc3b3KhnY', title: 'Spring', year: 2019, duration: '8 min', genre: 'Fantasy', tag: 'OPEN MOVIE', license: 'CC BY 4.0', poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=85', description: 'A poetic animated short from Blender Animation Studio, released as an open movie under Creative Commons Attribution.' },
];

function parseM3U(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
  const channels = [];
  let meta = '';
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('#EXTINF')) { meta = line; continue; }
    if (line.startsWith('#') || !/^https?:\/\//i.test(line) || !meta) continue;
    const title = meta.split(',').slice(1).join(',').trim() || 'Unnamed channel';
    const attr = (name) => {
      const m = meta.match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"', 'i'));
      return m ? m[1] : '';
    };
    const id = attr('tvg-id') || title;
    channels.push({
      id: `${id}-${channels.length}`,
      title, url: line, logo: attr('tvg-logo'),
      group: attr('group-title') || 'Other',
      language: attr('tvg-language') || '',
    });
    meta = '';
  }
  return channels;
}

async function verifyManifestInBrowser(channel) {
  // Probe the manifest and its first media segment. This is a quick browser-reachability
  // check only: live feeds can fail later, and it does not establish content rights.
  if (!/^https:\/\//i.test(channel.url) || !/\.m3u8?(?:$|[?#])/i.test(channel.url)) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHANNEL_PROBE_TIMEOUT_MS);
  const fetchText = async (url) => {
    const response = await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store', signal: controller.signal, headers: { Range: 'bytes=0-8191' } });
    if (!response.ok) throw new Error('manifest not reachable');
    const text = (await response.text()).slice(0, 16000);
    if (!text.includes('#EXTM3U') || /access denied|subscription required|geo.?blocked|forbidden/i.test(text.slice(0, 1200))) throw new Error('invalid or restricted manifest');
    return text;
  };
  try {
    let manifestUrl = channel.url;
    let text = await fetchText(manifestUrl);
    // Resolve a master playlist to its first advertised variant.
    for (let depth = 0; depth < 2 && text.includes('#EXT-X-STREAM-INF'); depth += 1) {
      const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
      const variantIndex = lines.findIndex(line => line.startsWith('#EXT-X-STREAM-INF'));
      const variant = lines.slice(variantIndex + 1).find(line => !line.startsWith('#'));
      if (!variant) return null;
      manifestUrl = new URL(variant, manifestUrl).href;
      text = await fetchText(manifestUrl);
    }
    const segment = text.split(/\r?\n/).map(line => line.trim()).find(line => line && !line.startsWith('#'));
    if (!segment) return null;
    const segmentUrl = new URL(segment, manifestUrl).href;
    const segmentResponse = await fetch(segmentUrl, { method: 'GET', mode: 'cors', cache: 'no-store', signal: controller.signal, headers: { Range: 'bytes=0-1023' } });
    if (!segmentResponse.ok) return null;
    if (!segmentResponse.body) return null;
    const reader = segmentResponse.body.getReader();
    const firstChunk = await reader.read();
    await reader.cancel().catch(() => {});
    if (!firstChunk.value?.byteLength) return null;
    return { ...channel, verification: 'manifest-and-segment-reachable', checkedAt: Date.now() };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function verifyChannels(channels, onProgress = () => {}) {
  const candidates = channels.filter(channel => /^https:\/\//i.test(channel.url) && /\.m3u8?(?:$|[?#])/i.test(channel.url));
  const verified = [];
  let cursor = 0;
  let completed = 0;
  const worker = async () => {
    while (cursor < candidates.length) {
      const current = cursor++;
      const result = await verifyManifestInBrowser(candidates[current]);
      if (result) verified.push(result);
      completed += 1;
      onProgress(completed, candidates.length);
    }
  };
  await Promise.all(Array.from({ length: Math.min(CHANNEL_PROBE_CONCURRENCY, candidates.length) }, worker));
  return verified.sort((a, b) => a.title.localeCompare(b.title));
}

function getCachedChannels() {
  try {
    const cached = JSON.parse(localStorage.getItem(CHANNEL_CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.savedAt < CHANNEL_CACHE_TTL && Array.isArray(cached.channels)) return cached.channels;
  } catch {}
  return null;
}

function readWatchlist() {
  try { return JSON.parse(localStorage.getItem('cinewave-watchlist') || '[]'); }
  catch { return []; }
}

function readYouTubeMovies() {
  try {
    const items = JSON.parse(localStorage.getItem('cinewave-youtube-movies') || '[]');
    return Array.isArray(items) ? items : [];
  } catch { return []; }
}

function getYouTubeId(input) {
  try {
    const url = new URL(input.trim());
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || null;
    if (!['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) return null;
    if (url.pathname === '/watch') return url.searchParams.get('v');
    const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
    return match?.[1] || null;
  } catch { return null; }
}

function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [watchlist, setWatchlist] = useState(readWatchlist);
  const [activeTab, setActiveTab] = useState('Upcoming Movies');
  const [selected, setSelected] = useState(null);
  const [player, setPlayer] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [channels, setChannels] = useState(() => getCachedChannels() || []);
  const [channelsLoading, setChannelsLoading] = useState(() => !getCachedChannels());
  const [channelsError, setChannelsError] = useState('');
  const [channelsVerifying, setChannelsVerifying] = useState(false);
  const [channelVerifyProgress, setChannelVerifyProgress] = useState({ done: 0, total: 0 });
  const [channelQuery, setChannelQuery] = useState('');
  const [channelGroup, setChannelGroup] = useState('All');
  const [activeChannel, setActiveChannel] = useState(null);
  const [youtubeMovies, setYoutubeMovies] = useState(readYouTubeMovies);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [youtubeError, setYoutubeError] = useState('');
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [dynamicUpcoming, setDynamicUpcoming] = useState(() => readMovieCache('cinewave-upcoming-tmdb-v1') || []);
  const [upcomingLoading, setUpcomingLoading] = useState(false);
  const [upcomingError, setUpcomingError] = useState('');
  const [dynamicVerdicts, setDynamicVerdicts] = useState(() => readMovieCache('cinewave-verdicts-tmdb-v1') || []);
  const [verdictsLoading, setVerdictsLoading] = useState(false);
  const [verdictsError, setVerdictsError] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('All');

  const loadChannels = async ({ force = false } = {}) => {
    if (!force) {
      const cached = getCachedChannels();
      if (cached) { setChannels(cached); setChannelsLoading(false); return; }
    }
    setChannelsLoading(true);
    setChannelsVerifying(false);
    setChannelVerifyProgress({ done: 0, total: 0 });
    setChannelsError('');
    try {
      // Fetch catalogues in parallel. The public playlist is only a discovery index;
      // the page then retains only HTTPS HLS manifests reachable from this browser.
      const results = await Promise.allSettled(PLAYLIST_SOURCES.map(async source => {
        const response = await fetch(source.url, { cache: force ? 'reload' : 'default' });
        if (!response.ok) throw new Error(`${source.label} playlist failed (${response.status})`);
        return parseM3U(await response.text());
      }));
      const merged = results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
      const seen = new Set();
      const parsed = merged.filter(channel => {
        const key = `${channel.title.toLowerCase()}|${channel.url}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).map((channel, index) => ({ ...channel, id: `${channel.id}-${index}` }));
      if (!parsed.length) throw new Error('No readable channels returned by the configured sources.');
      const candidates = parsed.filter(channel => /^https:\/\//i.test(channel.url) && /\.m3u8?(?:$|[?#])/i.test(channel.url));
      setChannelsVerifying(true);
      setChannelVerifyProgress({ done: 0, total: candidates.length });
      const verified = await verifyChannels(parsed, (done, total) => setChannelVerifyProgress({ done, total }));
      if (!verified.length) {
        throw new Error('No stream manifests passed the browser reachability check. Some providers block cross-origin playback; try again later or use an authorized provider stream.');
      }
      setChannels(verified);
      try { localStorage.setItem(CHANNEL_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), channels: verified })); } catch {}
    } catch (error) {
      setChannelsError(error?.message || 'Could not load and verify channel streams. Check your connection and try again.');
    } finally {
      setChannelsLoading(false);
      setChannelsVerifying(false);
    }
  };

  useEffect(() => { loadChannels(); }, []);

  const channelGroups = useMemo(() => ['All', ...new Set(channels.map(c => c.group).filter(Boolean).sort((a,b) => a.localeCompare(b)))], [channels]);
  const visibleChannels = useMemo(() => channels.filter(c =>
    (channelGroup === 'All' || c.group === channelGroup) &&
    (!channelQuery.trim() || `${c.title} ${c.group} ${c.language}`.toLowerCase().includes(channelQuery.toLowerCase()))
  ), [channels, channelGroup, channelQuery]);

  const toggleWatchlist = (movie) => {
    setWatchlist(current => {
      const next = current.includes(movie.id) ? current.filter(id => id !== movie.id) : [...current, movie.id];
      localStorage.setItem('cinewave-watchlist', JSON.stringify(next));
      return next;
    });
  };

  const visibleTitles = useMemo(() => {
    let list = activeTab === 'My List' ? titles.filter(m => watchlist.includes(m.id)) : titles;
    if (genre !== 'All') list = list.filter(m => m.genre === genre);
    if (query.trim()) list = list.filter(m => `${m.title} ${m.genre} ${m.year} ${m.description}`.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [query, genre, activeTab, watchlist]);

  const addYouTubeMovie = (event) => {
    event.preventDefault();
    setYoutubeError('');
    const videoId = getYouTubeId(youtubeUrl);
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      setYoutubeError('Enter a valid YouTube video URL (standard, youtu.be, Shorts, or live link).');
      return;
    }
    if (youtubeMovies.some(item => item.videoId === videoId)) {
      setYoutubeError('That video is already in your collection.');
      return;
    }
    const item = { id: `youtube-${videoId}`, videoId, title: youtubeTitle.trim() || `YouTube film ${youtubeMovies.length + 1}`, addedAt: Date.now() };
    const next = [item, ...youtubeMovies];
    setYoutubeMovies(next);
    try { localStorage.setItem('cinewave-youtube-movies', JSON.stringify(next)); } catch {}
    setYoutubeTitle('');
    setYoutubeUrl('');
  };
  const removeYouTubeMovie = (videoId) => {
    const next = youtubeMovies.filter(item => item.videoId !== videoId);
    setYoutubeMovies(next);
    try { localStorage.setItem('cinewave-youtube-movies', JSON.stringify(next)); } catch {}
  };

  const refreshUpcoming = async () => {
    setUpcomingLoading(true); setUpcomingError('');
    try {
      const now = new Date();
      const raw = await discoverMovieWindow(dateISO(now), dateISO(addMonths(now,4)), 4);
      const details = await mapConcurrent(raw, 5, movie => getMovieDetails(movie));
      const items = details.filter(Boolean).map(movie => ({
        ...movie, release:movie.release, region:'Multi-region release database',
        budget:movie.budget ? `Listed production budget: ${money(movie.budget)}` : 'Not disclosed / not listed in TMDB',
        clash:'Compare this release date with other titles opening the same weekend; local screen allocation and distributor plans may change.',
        hype:`TMDB popularity ${Math.round(movie.popularity||0)} · database signal, not a social-media measurement`,
        facts:'Credits, genres and rating are from the movie database; production facts should be confirmed against studio sources.',
        rumour:'No unsourced rumours are repeated. Treat online leaks and fan theories as unverified.',
        expectedRating:movie.voteCount ? `Current TMDB rating ${movie.voteAverage.toFixed(1)}/10 from ${movie.voteCount.toLocaleString()} votes. This is a current score, not a rating prediction.` : 'Too early to estimate responsibly.',
        trailerInfo:movie.trailerStatus || 'No trailer listed in TMDB. Search for an official upload before trusting trailer claims.'
      }));
      setDynamicUpcoming(items); writeMovieCache('cinewave-upcoming-tmdb-v1',items);
    } catch (error) { setUpcomingError(error.message || 'Could not refresh upcoming releases.'); }
    finally { setUpcomingLoading(false); }
  };
  const refreshVerdicts = async () => {
    setVerdictsLoading(true); setVerdictsError('');
    try {
      const now = new Date(), from = new Date(now); from.setMonth(from.getMonth()-8);
      const raw = await discoverMovieWindow(dateISO(from), dateISO(now), 3);
      const selected = [...raw].sort((a,b)=>(b.popularity||0)-(a.popularity||0)).slice(0,55);
      const details = await mapConcurrent(selected, 5, movie => getMovieDetails(movie));
      const items = details.filter(Boolean).sort((a,b)=>(b.release||'').localeCompare(a.release||''));
      setDynamicVerdicts(items); writeMovieCache('cinewave-verdicts-tmdb-v1',items);
    } catch (error) { setVerdictsError(error.message || 'Could not refresh recent box-office data.'); }
    finally { setVerdictsLoading(false); }
  };
  useEffect(() => {
    if (activeTab === 'Upcoming Movies' && !dynamicUpcoming.length) refreshUpcoming();
    if (activeTab === 'Box Office Verdicts' && !dynamicVerdicts.length) refreshVerdicts();
  }, [activeTab]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        if (activeTab === 'Upcoming Movies') refreshUpcoming();
        if (activeTab === 'Box Office Verdicts') refreshVerdicts();
      }
    }, 6 * 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const openMovie = (movie) => setSelected(movie);
  const playMovie = (movie) => {
    if (movie.playable && movie.video) setPlayer(movie);
    else if (movie.trailer) window.open(movie.trailer, '_blank', 'noopener,noreferrer');
    else setSelected(movie);
  };

  const cardRow = (heading, list) => list.length > 0 && (
    <section className="shelf" key={heading}>
      <div className="shelf-heading"><h2>{heading}</h2><span>{list.length} titles</span></div>
      <div className="movie-grid">
        {list.map(movie => <MovieCard key={movie.id} movie={movie} saved={watchlist.includes(movie.id)} onOpen={() => openMovie(movie)} onSave={() => toggleWatchlist(movie)} onPlay={() => playMovie(movie)} />)}
      </div>
    </section>
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#upcoming-movies" onClick={() => { setActiveTab('Upcoming Movies'); setGenre('All'); }} aria-label="CineWave">
          <span className="brand-mark"><Clapperboard size={21} strokeWidth={2.4} /></span><span>CINE<span className="brand-light">WAVE</span></span>
        </a>
        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`}>
          <button className={activeTab === 'Live TV' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab('Live TV'); setMobileMenu(false); }}> <Tv size={14} /> Live TV</button>
          <button className={activeTab === 'Free Movies' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab('Free Movies'); setMobileMenu(false); }}> <Youtube size={14} /> Free Movies</button>
          <button className={activeTab === 'Upcoming Movies' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab('Upcoming Movies'); setMobileMenu(false); }}> <Sparkles size={14} /> Upcoming</button>
          <button className={activeTab === 'Box Office Verdicts' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab('Box Office Verdicts'); setMobileMenu(false); }}> <TrendingUp size={14} /> Box Office</button>
          <button className={activeTab === 'My List' ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab('My List'); setMobileMenu(false); }}>My List <span className="list-count">{watchlist.length}</span></button>
        </nav>
        <div className="top-actions">
          <label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Titles, genres..." aria-label="Search titles" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}</label>
          <a className="github-link" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
          <button className="menu-toggle" onClick={() => setMobileMenu(v => !v)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      {activeTab === 'Upcoming Movies' ? (
        <main className="content-wrap upcoming-page" id="upcoming-movies">
          <div className="upcoming-hero"><div className="eyebrow small"><span className="eyebrow-line" /> RELEASE RADAR · NEXT 4 MONTHS</div><h2>Every release we can find. Updated automatically.</h2><p>Upcoming movies from India, the US, UK, Korea and Japan with release dates from today through four months ahead. Poster, synopsis, cast and director data refresh from TMDB. This is broad database coverage, not a guarantee that every independent/local release worldwide is indexed.</p><div className="upcoming-toolbar"><span><CalendarDays size={15}/> {dynamicUpcoming.length || UPCOMING_MOVIES.length} titles in the current catalogue</span><button className="btn btn-glass" onClick={refreshUpcoming} disabled={upcomingLoading}><RefreshCw size={14} className={upcomingLoading?'spin':''}/> {upcomingLoading?'Refreshing…':'Refresh now'}</button></div><div className="upcoming-legend"><span>Release dates are database listings</span><span>Hype is not a verified metric</span><span>Rumours are not invented</span></div></div>
          {!TMDB_API_KEY && <div className="movie-api-notice"><Info size={17}/><p><strong>Automatic updates need a TMDB API key.</strong> Copy <code>.env.example</code> to <code>.env.local</code>, add <code>VITE_TMDB_API_KEY=your_key</code>, then restart Vite. Without it, CineWave displays the small curated fallback list, not the full rolling catalogue.</p></div>}
          {upcomingError && <div className="movie-api-notice error"><Info size={17}/><p>{upcomingError} Showing cached/fallback data where available.</p></div>}
          {upcomingLoading && <div className="channel-status"><span className="loading-spinner"/> Refreshing upcoming releases across multiple regions…</div>}
          <div className="upcoming-grid">{(dynamicUpcoming.length ? dynamicUpcoming : UPCOMING_MOVIES).map((movie, index) => <article className="upcoming-card" key={movie.id} style={{'--card-index': index}}><div className="upcoming-poster"><img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85'; }}/><span className="upcoming-release">{movie.release}</span><span className="upcoming-hype">{movie.hype ? `HYPE · ${movie.hype.split(' — ')[0]}` : `TMDB · ${Number(movie.voteAverage||0).toFixed(1)}/10`}</span></div><div className="upcoming-card-body"><div className="upcoming-title-row"><div><h3>{movie.title}</h3><p>{movie.genre || 'Film'}</p></div><span className="upcoming-region">{movie.region || 'Global'}</span></div><p className="upcoming-synopsis">{movie.description || 'Synopsis not available.'}</p><div className="upcoming-detail"><strong>Director</strong><span>{movie.director || 'Not confirmed in the current listing'}</span></div><div className="upcoming-detail"><strong>Cast</strong><span>{movie.cast || 'Cast details not available yet'}</span></div><div className="upcoming-detail"><strong>Budget</strong><span>{movie.budget || 'Not officially confirmed / not available in release index'}</span></div><div className="upcoming-detail"><strong>Release clash</strong><span>{movie.clash || 'Compare this date with other titles listed for the same week; final clash depends on local distribution.'}</span></div><div className="upcoming-detail"><strong>Hype / interest</strong><span>{movie.hype || `TMDB popularity: ${Math.round(movie.popularity||0)}. This is a database signal, not a social-media measurement.`}</span></div><div className="upcoming-detail"><strong>Interesting fact</strong><span>{movie.facts || 'Additional production facts are shown only when supplied by the data provider or confirmed source.'}</span></div><div className="upcoming-detail"><strong>Trailer info</strong><span>{movie.trailerInfo || 'Official trailer is not yet verified by CineWave.'}</span></div><div className="upcoming-detail"><strong>Rumours</strong><span>{movie.rumour || 'No rumours are presented as facts. Add only attributed reporting; fan speculation is not verified.'}</span></div><div className="upcoming-rating"><strong>{movie.expectedRating ? 'Rating / expectation' : 'Current early rating'}</strong><span>{movie.expectedRating || (movie.voteCount ? `${Number(movie.voteAverage||0).toFixed(1)}/10 from ${movie.voteCount.toLocaleString()} TMDB votes. This is a current vote average, not a prediction.` : 'Too early / not enough votes.')}</span></div><div className="upcoming-card-actions">{movie.videoId ? <button className="btn btn-primary" onClick={() => setYoutubePlayer({...movie,title:`${movie.title} — Trailer`,duration:'Trailer',license:'YouTube official embed'})}><Play size={15} fill="currentColor"/> Play trailer here</button> : <a className="btn btn-glass" href={movie.trailerSearch || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} official trailer`)}`} target="_blank" rel="noreferrer"><Youtube size={15}/> Find trailer</a>}<span>{movie.tmdbId ? 'Auto-updated database listing' : 'Curated fallback · verify dates'}</span></div></div></article>)}</div>
          <div className="upcoming-disclaimer"><Info size={17}/><p><strong>Accuracy note:</strong> release schedules can change. The movie database provides discoverable listings, not every film worldwide. Budget, box office, casting, official trailer availability and rumours require separate confirmation. CineWave does not fabricate official trailer IDs or present rumours as facts. To embed trailers directly, an official YouTube video ID must be verified for each title.</p></div>
        </main>
      ) : activeTab === 'Box Office Verdicts' ? (
        <main className="content-wrap verdict-page" id="box-office-verdicts">
          <div className="upcoming-hero verdict-hero"><div className="eyebrow small"><span className="eyebrow-line"/> BOX OFFICE · LAST 8 MONTHS</div><h2>What worked, what missed, and why.</h2><p>Recent releases are refreshed from TMDB over a rolling eight-month window. The panel shows reported production budget, reported worldwide gross, current user rating and a transparent gross-to-budget signal. It is not an official trade verdict and cannot determine profit without marketing costs, exhibitor shares and distribution terms.</p><div className="upcoming-toolbar"><span><TrendingUp size={15}/> {dynamicVerdicts.length} recent titles loaded</span><button className="btn btn-glass" onClick={refreshVerdicts} disabled={verdictsLoading}><RefreshCw size={14} className={verdictsLoading?'spin':''}/> {verdictsLoading?'Refreshing…':'Refresh now'}</button></div></div>
          {!TMDB_API_KEY && <div className="movie-api-notice"><Info size={17}/><p><strong>Automatic verdict updates need a TMDB API key.</strong> Configure <code>VITE_TMDB_API_KEY</code> in <code>.env.local</code> and restart Vite. No key means the live eight-month database cannot be loaded.</p></div>}
          {verdictsError && <div className="movie-api-notice error"><Info size={17}/><p>{verdictsError}</p></div>}
          {verdictsLoading && <div className="channel-status"><span className="loading-spinner"/> Collecting recent releases, ratings, budgets and gross data…</div>}
          <div className="verdict-filter-row">{['All','Strong gross-to-budget ratio','Potentially healthy theatrical run','Break-even uncertain','Under-budget gross so far','Too early / insufficient data'].map(label=><button key={label} className={`genre-chip ${verdictFilter===label?'selected':''}`} onClick={()=>setVerdictFilter(label)}>{label}</button>)}</div>
          {dynamicVerdicts.length ? <div className="verdict-grid">{dynamicVerdicts.filter(movie=>verdictFilter==='All'||movie.verdict===verdictFilter).map((movie,index)=><article className="verdict-card" key={movie.id} style={{'--card-index':index}}><div className="verdict-poster"><img src={movie.poster||'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80'} alt={`${movie.title} poster`} loading="lazy"/><span>{movie.release||'Release date unavailable'}</span></div><div className="verdict-body"><div className="verdict-title-line"><h3>{movie.title}</h3><span className="verdict-rating">★ {movie.rating}</span></div><div className="verdict-label">{movie.verdict}</div><p>{movie.description}</p><div className="verdict-metrics"><div><small>Budget (listed)</small><strong>{movie.budget?money(movie.budget):'Not listed'}</strong></div><div><small>Worldwide gross (listed)</small><strong>{movie.revenue?money(movie.revenue):'Not listed'}</strong></div></div><div className="upcoming-detail"><strong>Director</strong><span>{movie.director}</span></div><div className="upcoming-detail"><strong>Cast</strong><span>{movie.cast}</span></div><div className="upcoming-detail"><strong>Verdict logic</strong><span>{movie.verdictReason}</span></div><div className="upcoming-detail"><strong>Hit / flop factors</strong><span>{movie.voteCount>=1000?`Audience signal: ${movie.voteAverage.toFixed(1)}/10 from ${movie.voteCount.toLocaleString()} votes. Use reviews and word-of-mouth as context; this alone does not prove the cause of box-office performance.`:'Insufficient vote volume for a strong audience signal. Marketing, reviews, competition, word-of-mouth and release scale need independent evidence.'}</span></div><div className="verdict-actions"><a className="btn btn-glass" href={movie.trailerSearch} target="_blank" rel="noreferrer"><Youtube size={14}/> Trailer</a><span>Data from TMDB · refreshable</span></div></div></article>)}</div> : !verdictsLoading && <div className="empty-state"><div className="empty-icon"><TrendingUp size={27}/></div><h3>No live verdict data loaded</h3><p>Configure the TMDB API key and refresh to populate recent films across the rolling eight-month window.</p></div>}
          <div className="upcoming-disclaimer"><Info size={17}/><p><strong>How to read this:</strong> a film’s worldwide gross is not studio profit. A commonly cited theatrical break-even heuristic is roughly 2–2.5× production budget, but it varies by deal, territory, marketing spend and format. CineWave uses transparent bands only as rough signals; it never labels a movie an official “hit” or “flop” from gross/budget alone. Box-office values can be incomplete or revised.</p></div>
        </main>
      ) : activeTab === 'Free Movies' ? (
        <main className="content-wrap live-tv-page free-movies-page" id="free-movies">
          <div className="open-movies-hero">
            <div className="open-movies-copy"><div className="eyebrow small"><span className="eyebrow-line" /> READY TO WATCH · OPEN CONTENT</div><h2>Free movies. No link hunting.</h2><p>Browse a curated collection of open films published by Blender. Choose a title and play it right here in CineWave through the official YouTube embed—no URL pasting and no redirect.</p><div className="open-movie-pills"><span>✓ Direct playback</span><span>✓ No account required</span><span>✓ Openly licensed films</span></div></div>
            <div className="open-movie-orbit"><span className="orbit-ring orbit-ring-one"/><span className="orbit-ring orbit-ring-two"/><span className="orbit-play"><Play size={30} fill="currentColor"/></span></div>
          </div>
          <div className="shelf-heading open-movie-heading"><h2>Watch on CineWave</h2><span>{YOUTUBE_CATALOGUE.length} curated open films · official YouTube player embedded</span></div>
          <div className="open-movie-grid">{YOUTUBE_CATALOGUE.map((movie, index) => <article className="open-movie-card" key={movie.id} style={{'--card-index': index}}><button className="open-movie-poster" onClick={() => setYoutubePlayer(movie)} aria-label={`Play ${movie.title}`}><img src={movie.poster} alt="" loading="lazy"/><span className="open-poster-gradient"/><span className="open-play-button"><Play size={20} fill="currentColor"/></span><span className="open-license-tag">{movie.tag}</span><span className="open-runtime">{movie.duration}</span></button><div className="open-movie-details"><div><h3>{movie.title}</h3><p>{movie.year} <span>•</span> {movie.genre}</p></div><button className="open-watch-button" onClick={() => setYoutubePlayer(movie)}><Play size={14} fill="currentColor"/> Watch here</button></div><p className="open-movie-description">{movie.description}</p><div className="open-license-line">License: {movie.license} · Original YouTube embed</div></article>)}</div>
          <div className="open-catalog-note"><Sparkles size={17}/><p><strong>Why this catalogue?</strong> These are curated open films, not random uploads. Playback uses YouTube's official embedded player inside CineWave—no link pasting and no redirect required. The player keeps YouTube controls/branding and may show ads; videos that disable embedding cannot be forced to play. CineWave cannot legally make every popular copyrighted movie free.</p></div>
        </main>
      ) : activeTab === 'Live TV' ? (
        <main className="content-wrap live-tv-page" id="live-tv">
          <div className="section-intro live-tv-intro">
            <div><div className="eyebrow small"><span className="eyebrow-line" /> LIVE FROM PUBLIC PLAYLISTS</div><h2>Indian Live TV</h2><p className="live-subtitle">India + Hindi playlists are checked in your browser. Only HTTPS HLS streams whose manifest and first segment pass the browser check are listed; playback can still fail if a provider changes access or later segments fail.</p></div>
            <button className="sort-button" onClick={() => loadChannels({ force: true })}><RefreshCw size={15} /> Refresh channels</button>
          </div>
          <div className="live-toolbar">
            <label className="live-search"><Search size={16} /><input value={channelQuery} onChange={e => setChannelQuery(e.target.value)} placeholder="Search channel or category..." aria-label="Search TV channels" /></label>
            <select value={channelGroup} onChange={e => setChannelGroup(e.target.value)} aria-label="Filter channel category">{channelGroups.map(g => <option key={g} value={g}>{g === 'All' ? 'All categories' : g}</option>)}</select>
            <span className="channel-count">{channels.length ? `${visibleChannels.length} of ${channels.length} channels` : 'Loading channel list'}</span>
          </div>
          {channelsLoading && <div className="channel-status"><span className="loading-spinner" /> {channelsVerifying ? `Checking browser-playable streams: ${channelVerifyProgress.done}/${channelVerifyProgress.total}` : 'Loading channel lists…'} Only streams whose HTTPS HLS manifest and first segment are reachable from this browser will be listed.</div>}
          {!channelsLoading && channelsError && <div className="channel-status error"><p>{channelsError}</p><button className="btn btn-primary" onClick={() => loadChannels({ force: true })}>Try again</button></div>}
          {!channelsLoading && !channelsError && channels.length > 0 && visibleChannels.length === 0 && <div className="empty-state"><div className="empty-icon"><Tv size={27} /></div><h3>No channels found</h3><p>Try a different search or category.</p></div>}
          <div className="channel-grid">
            {visibleChannels.map(channel => <button className="channel-card" key={channel.id} onClick={() => setActiveChannel(channel)}>
              <span className="channel-logo">{channel.logo ? <img src={channel.logo} loading="lazy" alt="" onError={e => { e.currentTarget.style.display = 'none'; }} /> : <Tv size={24} />}</span>
              <span className="channel-card-copy"><strong>{channel.title}</strong><small>{channel.group}</small></span><span className="channel-verified" title="HLS manifest and first segment passed browser reachability check">CHECKED</span><span className="channel-play"><Play size={15} fill="currentColor" /></span>
            </button>)}
          </div>
          <p className="playlist-note">Sources: IPTV-org India and Hindi playlists. The browser check tests the manifest and first segment with CORS; it does not guarantee a live stream will remain available or prove redistribution rights. CineWave does not host these streams. Only publish channels whose providers authorize access and embedding.</p>
        </main>
      ) : (
      <main className="content-wrap" id="my-list">
        <div className="section-intro">
          <div><div className="eyebrow small"><span className="eyebrow-line" /> YOUR SAVED TITLES</div><h2>Your watchlist</h2></div>
          <button className="sort-button" onClick={() => { setGenre('All'); setQuery(''); }}><Compass size={16} /> Clear filters <ArrowRight size={15} /></button>
        </div>
        <div className="genre-row" aria-label="Filter by genre">
          {genres.map(g => <button key={g} className={`genre-chip ${genre === g ? 'selected' : ''}`} onClick={() => setGenre(g)}>{g}</button>)}
        </div>
        {visibleTitles.length ? cardRow(activeTab === 'My List' ? 'Saved for later' : query ? 'Matching titles' : genre === 'All' ? 'Popular picks' : `${genre} picks`, visibleTitles) : (
          <div className="empty-state"><div className="empty-icon"><Film size={27} /></div><h3>{activeTab === 'My List' ? 'Your list is waiting' : 'No titles found'}</h3><p>{activeTab === 'My List' ? 'Save films with the + button and they will appear here.' : 'Try another title or choose a different genre.'}</p><button className="btn btn-primary" onClick={() => { setActiveTab('Upcoming Movies'); setGenre('All'); setQuery(''); }}>Browse upcoming movies</button></div>
        )}
        <section className="callout"><div className="callout-icon"><Sparkles size={22} /></div><div><span className="eyebrow small">BUILT FOR MOVIE LOVERS</span><h3>Your watchlist. Your taste. Your space.</h3><p>Save films from the movie catalogue and find them here later.</p></div><button className="callout-btn" onClick={() => setActiveTab('Upcoming Movies')}>Upcoming movies <ArrowRight size={16} /></button></section>
      </main>
      )}

      <footer className="footer"><a className="brand footer-brand" href="#upcoming-movies" onClick={() => setActiveTab('Upcoming Movies')}><span className="brand-mark"><Clapperboard size={17} /></span><span>CINE<span className="brand-light">WAVE</span></span></a><span>Made for the love of stories.</span><span className="footer-legal">This product uses the TMDB API but is not endorsed or certified by TMDB. · Use media you have rights to stream</span></footer>

      {selected && <DetailModal movie={selected} saved={watchlist.includes(selected.id)} onClose={() => setSelected(null)} onSave={() => toggleWatchlist(selected)} onPlay={() => { setSelected(null); playMovie(selected); }} />}
      {player && <PlayerModal movie={player} onClose={() => setPlayer(null)} />}
      {youtubePlayer && <YouTubeMovieModal movie={youtubePlayer} onClose={() => setYoutubePlayer(null)} />}
      {activeChannel && <ChannelPlayer channel={activeChannel} onClose={() => setActiveChannel(null)} />}
    </div>
  );
}

function MovieCard({ movie, saved, onOpen, onSave, onPlay }) {
  return <article className="movie-card">
    <button className="poster-button" onClick={onOpen} aria-label={`Details for ${movie.title}`}>
      <img className="poster" src={movie.poster} alt={`${movie.title} poster`} loading="lazy" onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'; }} />
      <span className="poster-shade" />
      <span className="card-hover-play"><Play size={20} fill="currentColor" /></span>
      {movie.tag && <span className="card-tag">{movie.tag}</span>}
    </button>
    <div className="card-info"><button className="card-title" onClick={onOpen}>{movie.title}</button><button className={`save-button ${saved ? 'saved' : ''}`} onClick={onSave} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}>{saved ? <Check size={16} /> : <Plus size={16} />}</button></div>
    <div className="card-meta"><span>{movie.year}</span><span className="meta-dot">•</span><span>{movie.genre}</span><span className="meta-spacer" /><span className="rating-mini">{movie.rating}</span></div>
    <button className="quick-watch" onClick={onPlay}><Play size={13} fill="currentColor" /> {movie.playable ? 'Watch demo' : 'Find trailer'} <ExternalLink size={12} /></button>
  </article>;
}

function DetailModal({ movie, saved, onClose, onSave, onPlay }) {
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section className="detail-modal" role="dialog" aria-modal="true" aria-label={`${movie.title} details`}>
    <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
    <div className="detail-backdrop" style={{ backgroundImage: `linear-gradient(0deg, #101117 0%, rgba(16,17,23,.2) 100%), url(${movie.backdrop || movie.poster})` }} />
    <div className="detail-body"><span className="eyebrow small"><span className="eyebrow-line" /> {movie.tag || 'FEATURED TITLE'}</span><h2>{movie.title}</h2><div className="detail-meta"><span>{movie.year}</span><span>{movie.rating}</span><span>{movie.duration}</span><span>{movie.genre}</span></div><p>{movie.description}</p><div className="detail-actions"><button className="btn btn-primary" onClick={onPlay}><Play size={17} fill="currentColor" /> {movie.playable ? 'Watch demo' : 'Find trailer'}</button><button className="btn btn-glass" onClick={onSave}>{saved ? <Check size={17} /> : <Plus size={17} />}{saved ? 'In my list' : 'My list'}</button></div>{!movie.playable && <p className="modal-note">Full playback is not included for this title. Use the trailer link or connect a licensed provider.</p>}</div>
  </section></div>;
}

function YouTubeMovieModal({ movie, onClose }) {
  // Use YouTube's standard embed host and explicitly pass the current origin.
  // Some browsers/extensions reject youtube-nocookie embeds or return player error 153
  // when the embed has no usable origin/referrer context.
  const origin = typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
  const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(movie.videoId)}?autoplay=1&playsinline=1&rel=0&enablejsapi=1${origin}`;
  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(movie.videoId)}`;
  return <div className="modal-backdrop player-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section className="player-modal youtube-player-modal" role="dialog" aria-modal="true" aria-label={`YouTube player: ${movie.title}`}><div className="player-top"><div><span className="live-dot" /> PLAYING IN CINEWAVE <strong>{movie.title}</strong></div><button className="modal-close player-close" onClick={onClose} aria-label="Close player"><X size={20} /></button></div><iframe className="youtube-embed" src={embedUrl} title={movie.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="eager" /><div className="player-caption"><div><h3>{movie.title}</h3><p>This uses YouTube's official embedded player inside CineWave. If the player says the video is unavailable, the uploader may have restricted embedding or YouTube may block playback in your browser. In that case, use the official source link below.</p><a className="btn btn-glass" href={watchUrl} target="_blank" rel="noreferrer"><Youtube size={15}/> Open official source</a></div><span className="license-label">OFFICIAL EMBED · PLAYS HERE WHEN ENABLED</span></div></section></div>;
}

function PlayerModal({ movie, onClose }) {
  return <div className="modal-backdrop player-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section className="player-modal" role="dialog" aria-modal="true" aria-label={`Player: ${movie.title}`}><div className="player-top"><div><span className="live-dot" /> NOW PLAYING <strong>{movie.title}</strong></div><button className="modal-close player-close" onClick={onClose} aria-label="Close player"><X size={20} /></button></div><video controls autoPlay playsInline src={movie.video} poster={movie.backdrop || movie.poster}>Your browser does not support video playback.</video><div className="player-caption"><div><h3>{movie.title}</h3><p>{movie.description}</p></div><span className="license-label">OPEN SAMPLE MEDIA</span></div></section></div>;
}

function ChannelPlayer({ channel, onClose }) {
  const videoRef = React.useRef(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Connecting to stream…');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let hls;
    let cancelled = false;
    let nativeFallbackTried = false;
    const video = videoRef.current;
    if (!video) return;
    setError('');
    setStatus('Connecting to stream…');

    const markUnavailable = (message) => {
      if (cancelled) return;
      setError(message);
      setStatus('Stream unavailable');
    };

    const start = async () => {
      const url = channel.url;
      const looksLikeHls = /\.m3u8?(?:$|[?#])/i.test(url) || /\.m3u8?\//i.test(url);
      const nativeHls = video.canPlayType('application/vnd.apple.mpegurl');

      // Prefer native HLS where the browser supports it (notably Safari).
      if (looksLikeHls && nativeHls) {
        video.src = url;
      } else if (looksLikeHls) {
        try {
          const Hls = (await import('hls.js')).default;
          if (cancelled) return;
          if (Hls.isSupported()) {
            hls = new Hls({
              enableWorker: true,
              lowLatencyMode: false,
              backBufferLength: 30,
              manifestLoadingTimeOut: 15000,
              levelLoadingTimeOut: 15000,
              fragLoadingTimeOut: 20000,
              manifestLoadingMaxRetry: 2,
              levelLoadingMaxRetry: 2,
              fragLoadingMaxRetry: 2,
            });
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (!cancelled) setStatus('Stream ready — press play if playback does not start automatically');
              video.play().catch(() => {});
            });
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (cancelled || !data.fatal) return;
              if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                setStatus('Network error — checking stream…');
                try { hls.startLoad(); } catch {}
              } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                setStatus('Recovering media playback…');
                try { hls.recoverMediaError(); } catch { markUnavailable('This stream has a media error and could not be recovered.'); }
              } else {
                markUnavailable('The stream could not be loaded. It may be offline, require authorization, or block browser playback (CORS).');
              }
            });
          } else {
            video.src = url;
          }
        } catch {
          if (!cancelled) markUnavailable('Could not initialize HLS playback. Run npm install and restart the app.');
        }
      } else {
        // Some playlist entries are direct MP4/TS links or extensionless redirects.
        // Try the direct source; the error UI offers a source-page fallback.
        video.src = url;
      }

      video.addEventListener('loadedmetadata', () => {
        if (!cancelled) setStatus('Stream ready');
      }, { once: true });
      video.addEventListener('playing', () => {
        if (!cancelled) { setStatus('Playing live'); setError(''); }
      });
      video.addEventListener('waiting', () => {
        if (!cancelled) setStatus('Buffering stream…');
      });
      video.addEventListener('error', () => {
        if (cancelled) return;
        if (!nativeFallbackTried && looksLikeHls && nativeHls) {
          nativeFallbackTried = true;
          setStatus('Native playback failed; trying compatible playback…');
        }
        markUnavailable('Playback failed. This playlist includes third-party streams that may be offline, geo-restricted, require authorization, or block browser playback. CineWave cannot make an unavailable source work.');
      }, { once: true });
    };

    start();
    return () => {
      cancelled = true;
      if (hls) hls.destroy();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [channel, attempt]);

  return <div className="modal-backdrop player-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="player-modal channel-player-modal" role="dialog" aria-modal="true" aria-label={`Live TV: ${channel.title}`}>
      <div className="player-top"><div><span className="live-dot" /> LIVE TV <strong>{channel.title}</strong></div><button className="modal-close player-close" onClick={onClose} aria-label="Close player"><X size={20} /></button></div>
      <video ref={videoRef} controls autoPlay playsInline />
      {error && <div className="stream-error"><Radio size={18} /><span>{error}</span></div>}
      <div className="player-caption"><div><h3>{channel.title}</h3><p>{channel.group} · {status}</p></div><div className="player-actions"><button className="license-label player-action-button" onClick={() => { setAttempt(v => v + 1); }}>RETRY STREAM</button><a className="license-label player-action-button" href={channel.url} target="_blank" rel="noreferrer">OPEN SOURCE ↗</a></div></div>
    </section>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
