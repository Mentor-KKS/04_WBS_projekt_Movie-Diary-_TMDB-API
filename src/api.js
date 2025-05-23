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
  "movie": `https://api.themoviedb.org/3/movie/`,
};

// Api call----- Functions-----------------------------------------------------

/**
 * Fetches movie data from the given API endpoint using the provided options.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<Array>} Resolves to an array of movie results from the API.
 */
function fetchAPI(url) {
  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((error) => console.error(error));
}

/**
 * Retrieves movie data for a given keyword from sessionStorage, or fetches and caches it from the API if not present.
 * Optionally, a movieID can be provided to fetch data for a specific movie.
 *
 * @param {'authentication' | 'discoverMovies' | 'trendingMovieDay' | 'trendingMovieWeek' | 'upcoming' | 'movie'} keyword
 *        The type of movie data to retrieve.
 * @param {string|null} [movieID=null] - Optional TMDB movie ID for fetching a specific movie. Only Works with the movie keyword
 * @returns {Promise<Array>} Resolves to an array of cleaned movie objects.
 */
async function getData(keyword, movieID = null) {
  if (!sessionStorage.getItem(keyword)) {
    const endpoint = movieID == null ? url[keyword] : url[keyword] + movieID;
    const rawMovieData = await fetchAPI(endpoint);
    const cleanMovieData = cleanData(rawMovieData);
    sessionStorage.setItem(keyword, JSON.stringify(cleanMovieData));
  }

  return JSON.parse(sessionStorage.getItem(keyword));
}

/**
 * Transforms raw movie data from the API into a simplified format.
 * @param {Array} rawData - The raw movie data array from the API.
 * @returns {Array} An array of cleaned movie objects with selected fields.
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

export { getData};

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
 * 1. Call getData() with one of the following keywords:
 *    - "discoverMovies"
 *    - "trendingMovieDay"
 *    - "trendingMovieWeek"
 *    - "upcoming"
 *    - "movie" (requires a movie ID as the second argument)
 *
 * 2. To fetch a list of movies (e.g., trending this week):
 *    getData("trendingMovieWeek")
 *      .then(movies => {
 *        movies.forEach(movie => {
 *          console.log("Title:", movie.title);
 *          console.log("Overview:", movie.overview);
 *          console.log("Poster URL:", movie.poster);
 *          console.log("Backdrop URL:", movie.backcover);
 *        });
 *      })
 *      .catch(error => {
 *        console.error("Failed to load movie data:", error);
 *      });
 *
 * 3. To fetch details for a specific movie by TMDB ID:
 *    getData("movie", "12345")
 *      .then(movieArr => {
 *        const movie = movieArr[0];
 *        console.log("Title:", movie.title);
 *        console.log("Overview:", movie.overview);
 *        console.log("Poster URL:", movie.poster);
 *        console.log("Backdrop URL:", movie.backcover);
 *      })
 *      .catch(error => {
 *        console.error("Failed to load movie details:", error);
 *      });
 *
 * Notes:
 * - Data is cached in sessionStorage to minimize API calls.
 * - Each movie object has the following structure:
 *   {
 *     id: Number,
 *     title: String,
 *     overview: String,
 *     poster: String (image URL),
 *     backcover: String (image URL)
 *   }
 */
// Api call----- END-----------------------------------------------------------
