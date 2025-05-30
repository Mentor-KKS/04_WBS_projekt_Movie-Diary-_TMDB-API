// only for testing
// import { localStorage } from "./sessionStoragePolyfill.js";

// Api key token
const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGQwOWVkMzEwYzNjMjAzZWVhOWFhNjczMjdkMWViYiIsIm5iZiI6MTc0NzgzMDQ2MS4xNzEsInN1YiI6IjY4MmRjNmJkMjk2MTAwZmZkZTY0OTljYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8yMUWU1Rez1HJKSDuzss3DI_lGdb8RLzYKheepku7Og";

// header option and authorization for api call
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

// different url's for api call (keywords for getData function)
const endpoint = {
    // authentication test
    //authentication: "https://api.themoviedb.org/3/authentication",
    // discover movies
    discoverMovies: (languageCode) =>
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${languageCode}&page=1&sort_by=popularity.desc`,
    // trending movies of the day
    trendingMovieDay: (languageCode) =>
        `https://api.themoviedb.org/3/trending/movie/day?language=${languageCode}`,
    // trending movies of the week
    trendingMovieWeek: (languageCode) =>
        `https://api.themoviedb.org/3/trending/movie/week?language=${languageCode}`,
    // upcoming movies
    upcoming: (languageCode) =>
        `https://api.themoviedb.org/3/movie/upcoming?language=${languageCode}&page=1`,
    // specific movie called by movie tmdb id
    movie: (movieID, languageCode) =>
        `https://api.themoviedb.org/3/movie/${movieID}?language=${languageCode}`,
    // search tmdb for a movie with keyword string
    search: (query, languageCode) =>
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=${languageCode}`,
};

/**
 * Returns the appropriate TMDB API endpoint URL based on the provided keyword and optional query.
 * For known keywords, constructs the corresponding endpoint URL using the current language code.
 * For "search", uses the provided query string to build the search endpoint.
 * For unknown keywords, treats the keyword as a TMDB movie ID and returns the single movie endpoint.
 *
 * @param {string} keyword - The type of data to fetch (e.g., "discoverMovies", "trendingMovieDay", "search", or a movie ID).
 * @param {string} [query=""] - The search query string (used only for the "search" keyword).
 * @returns {string} The constructed TMDB API endpoint URL.
 */
function getEndpoint(keyword, query = "") {
    const languageCode = localStorage.getItem("languageCode") || "en-GB";
    if (keyword === "search") {
        return endpoint.search(query, languageCode);
    }
    const isKnownKeyword = keyword in endpoint;
    const endpointURL = isKnownKeyword
        ? endpoint[keyword](languageCode)
        : endpoint["movie"](keyword, languageCode);

    return endpointURL;
}

export { getEndpoint, options };
