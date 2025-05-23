import { findGenre } from './genres.js';

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

export { cleanData };
