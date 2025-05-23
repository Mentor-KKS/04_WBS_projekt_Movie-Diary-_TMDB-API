// ONLY FOR TESTING !!! BEFORE PRODUCTION DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM
// Polyfill for sessionStorage in Node.js (for testing only)
/* global.sessionStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
}; */
// ONLY FOR TESTING !!! BEFORE PRODUCTION DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP

// Api call----- START---------------------------------------------------------
// Api call----- Variables-----------------------------------------------------

// header option and authorization for api call
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGQwOWVkMzEwYzNjMjAzZWVhOWFhNjczMjdkMWViYiIsIm5iZiI6MTc0NzgzMDQ2MS4xNzEsInN1YiI6IjY4MmRjNmJkMjk2MTAwZmZkZTY0OTljYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8yMUWU1Rez1HJKSDuzss3DI_lGdb8RLzYKheepku7Og",
  },
};

// different url's for api call (keywords for getData function)
const url = {
  // authentication test
  authentication: "https://api.themoviedb.org/3/authentication",
  // discover movies
  discoverMovies:
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-GB&page=1&sort_by=popularity.desc",
  // trending movies of the day
  trendingMovieDay:
    "https://api.themoviedb.org/3/trending/movie/day?language=en-GB",
  // trending movies of the week
  trendingMovieWeek:
    "https://api.themoviedb.org/3/trending/movie/week?language=en-GB",
  // upcoming movies
  upcoming: "https://api.themoviedb.org/3/movie/upcoming?language=en-GB&page=1",
  // specific movie called by movie tmdb id (noch nicht fertig)
  //"movie": "https://api.themoviedb.org/3/movie/398818",
};

// Api call----- Functions-----------------------------------------------------

/**
 * Fetches data from the given API URL using provided options.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<Array>} - A promise that resolves to an array of movie results.
 */

async function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch movie details:", err);
    return null;
  }
}

function fetchAPI(url) {
  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((error) => console.error(error));
}

/**
 * Retrieves movie data for a given keyword from sessionStorage or fetches it from the API if not cached.
 *
 * @param {'authentication' | 'discoverMovies' | 'trendingMovieDay' | 'trendingMovieWeek' | 'upcoming'} keyword
 *        The key representing the type of movie data to retrieve. Must be one of:
 *        - "discoverMovies"
 *        - "trendingMovieDay"
 *        - "trendingMovieWeek"
 *        - "upcoming"
 *
 * @returns {Promise<Array>} A promise that resolves to an array of cleaned movie data.
 */
async function getData(keyword) {
  if (!sessionStorage.getItem(keyword)) {
    const rawMovieData = await fetchAPI(url[keyword]);
    const cleanMovieData = cleanData(rawMovieData);
    sessionStorage.setItem(keyword, JSON.stringify(cleanMovieData));
  }

  const data = JSON.parse(sessionStorage.getItem(keyword));

  return data;
}

/**
 * Cleans raw movie data by extracting and formatting relevant fields.
 * @param {Array} rawData - The raw movie data array from the API.
 * @returns {Array} - An array of cleaned movie objects.
 */
function cleanData(rawData) {
  return rawData.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    backcover: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
  }));
}

export { getData, getMovieDetails };

// ONLY FOR TESTING !!! BEFORE PRODUCTION DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM

// Test function, to console log output from getData func
/* async function testLog() {
  const data = await getData("trendingMovieWeek");
  console.log(data);
}

testLog(); */
// ONLY FOR TESTING !!! BEFORE PRODUCTION DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP DELETE TOP

/**
 * _   _                 _                              _          _
 *| | | | _____      __ | |_ ___    _   _ ___  ___     / \   _ __ (_)
 *| |_| |/ _ \ \ /\ / / | __/ _ \  | | | / __|/ _ \   / _ \ | '_ \| |
 *|  _  | (_) \ V  V /  | || (_) | | |_| \__ \  __/  / ___ \| |_) | |
 *|_| |_|\___/ \_/\_/    \__\___/   \__,_|___/\___| /_/   \_\ .__/|_|
 *
 * HOW TO USE getData():
 *
 * Step 1: Call getData() with one of the following keywords:
 *         - "discoverMovies"
 *         - "trendingMovieDay"
 *         - "trendingMovieWeek"
 *         - "upcoming"
 *
 * Example:
 *
 * getData("trendingMovieDay")
 *   .then(movies => {
 *     // Step 2: Work with the returned movie data (already cleaned)
 *     movies.forEach(movie => {
 *       console.log("Title:", movie.title);
 *       console.log("Overview:", movie.overview);
 *       console.log("Poster URL:", movie.poster);
 *       console.log("Backdrop URL:", movie.backcover);
 *     });
 *   })
 *   .catch(error => {
 *     console.error("Failed to load movie data:", error);
 *   });
 *
 * Notes:
 * - Data is automatically cached in sessionStorage to prevent repeated API calls.
 * - Data is cleaned into a simplified format with the following fields:
 *    {
 *      id: Number,
 *      title: String,
 *      overview: String,
 *      poster: String (image URL),
 *      backcover: String (image URL)
 *    }
 *
 */
// Api call----- END-----------------------------------------------------------
