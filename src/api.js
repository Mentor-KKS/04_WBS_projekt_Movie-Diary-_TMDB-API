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
  //authentication: "https://api.themoviedb.org/3/authentication",
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
  // specific movie called by movie tmdb id
  "movie": `https://api.themoviedb.org/3/movie/`,
};


const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

// Api call----- Functions-----------------------------------------------------

/**
 * Fetches movie data from the given API endpoint using the provided options.
 * Handles both array (list) and single object (movie) responses.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {Promise<Array>} Resolves to an array of movie result objects.
 *          If the API returns a single movie object, it is wrapped in an array.
 */
function fetchAPI(url) {
  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      // If the response has a 'results' array, return it; else, wrap the object in an array
      if (Array.isArray(res.results)) {
        return res.results;
      } else {
        return [res];
      }
    })
    .catch((error) => console.error(error));
}

/**
 * Retrieves movie data for a given keyword (list) or TMDB movie ID (single movie).
 * Checks sessionStorage for cached data; if not present, fetches from the API and caches it.
 *
 * @param {'discoverMovies' | 'trendingMovieDay' | 'trendingMovieWeek' | 'upcoming' | string | number} keyword
 *        Use a string keyword for lists (e.g., "discoverMovies"), or a TMDB movie ID (string or number) for a single movie.
 * @returns {Promise<Array>} Resolves to an array of cleaned movie objects.
 *          For single movie fetches, the array contains one object.
 */
async function getData(keyword) {
  if (!sessionStorage.getItem(keyword)) {
    const isKnownKeyword = keyword in url;
    const endpoint = isKnownKeyword ? url[keyword] : url["movie"] + keyword;

    const rawMovieData = await fetchAPI(endpoint);
    const cleanMovieData = cleanData(rawMovieData);

    sessionStorage.setItem(keyword, JSON.stringify(cleanMovieData));
  }

  return JSON.parse(sessionStorage.getItem(keyword));
}

/**
 * Transforms raw movie data from the API into a simplified format.
 * @param {Array} rawData - The raw movie data array from the API.
 * @returns {Array} An array of cleaned movie objects with selected fields:
 *   - id: Number
 *   - title: String
 *   - overview: String
 *   - release: String (release date)
 *   - vote: Number (average vote)
 *   - genre: Array<string> (array of genre names)
 *   - poster: String (image URL)
 *   - backcover: String (image URL)
 */
function cleanData(rawData) {
  return rawData.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release: movie.release_date,
    vote: movie.vote_average,
    genre: findGenre(movie),
    poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    backcover: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
  }));
}

/**
 * Returns an array of genre names for a given movie object.
 *
 * Handles both TMDB API response formats:
 * - If the movie object has a 'genre_ids' array (array of genre IDs), it maps them to genre names using the 'genres' lookup object.
 * - If the movie object has a 'genres' array (array of objects with a 'name' property), it extracts the genre names directly.
 * - If neither is present, returns an empty array.
 *
 * @param {Object} movieObject - The movie object from the TMDB API.
 * @returns {Array<string>} Array of genre names.
 */
function findGenre(movieObject) {
  if (Array.isArray(movieObject.genre_ids)) {
    return movieObject.genre_ids.map(ID => genres[ID]).filter(Boolean);
  }
 
  if (Array.isArray(movieObject.genres)) {
    return movieObject.genres.map(genre => genre.name);
  }
 
  return [];
}


export { getData };


// ONLY FOR TESTING !!! BEFORE PRODUCTION DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM DELETE BOTTOM

// Test function, to console log output from getData func
/* async function testLog() {
  const data = await getData("upcoming");
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
 *    - a TMDB movie ID as a string or number (for a single movie)
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
 *    getData("12345") // or getData(12345)
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
 *     release: String,        // Release date (YYYY-MM-DD)
 *     vote: Number,           // Average vote
 *     genre: Array<string>,   // Array of genre names
 *     poster: String,         // Image URL
 *     backcover: String       // Image URL
 *   }
 */
// Api call----- END-----------------------------------------------------------
