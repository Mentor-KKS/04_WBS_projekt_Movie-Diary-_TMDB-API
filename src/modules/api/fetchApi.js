import { options } from './endpoints.js'

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

export { fetchAPI };