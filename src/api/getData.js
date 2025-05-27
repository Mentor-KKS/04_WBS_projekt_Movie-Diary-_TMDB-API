import { getEndpoint } from "./endpoints.js";
import { fetchAPI } from "./fetchApi.js";
import { cleanData } from "./cleanData.js";
// for testing only
// import { sessionStorage } from "./sessionStoragePolyfill.js";

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
        const endpointURL = getEndpoint(keyword)

        const rawMovieData = await fetchAPI(endpointURL);
        const cleanMovieData = cleanData(rawMovieData);

        sessionStorage.setItem(keyword, JSON.stringify(cleanMovieData));
    }

    return JSON.parse(sessionStorage.getItem(keyword));
}

/**
 * Searches for movies using a search string.
 * Fetches results from the TMDB search endpoint and returns cleaned movie data.
 *
 * @param {string} searchString - The search query (e.g., movie title or keywords).
 * @returns {Promise<Array>} Resolves to an array of cleaned movie objects matching the search.
 */
async function searchData(searchString) {
    const endpointURL =
        endpoint["search"] + searchString.trim().replace(/ /g, "+");

    const rawMovieData = await fetchAPI(endpointURL);
    const cleanMovieData = cleanData(rawMovieData);

    return cleanMovieData
}

export { getData, searchData };
