// object with all genre ids
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

export { findGenre };