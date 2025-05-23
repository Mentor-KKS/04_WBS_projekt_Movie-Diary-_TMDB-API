// ==================== Local Storage Utilities ====================

/**
 * Save a user note for a specific movie.
 * @param {number} movieId
 * @param {string} note
 */
export function saveNoteForMovie(movieId, note) {
  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  notes[movieId] = note;
  localStorage.setItem("movieNotes", JSON.stringify(notes));
}

/**
 * Get the saved note for a movie by its ID.
 * @param {number} movieId
 * @returns {string|null}
 */
export function getNoteForMovie(movieId) {
  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  return notes[movieId] || "";
}

/**
 * Add a movie to the user's local Watchlist.
 * @param {object} movie
 */
export function saveToWatchlist(movie) {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (list.some((item) => item.id === movie.id)) {
    alert(`${movie.title} is already in your Watchlist.`);
    return;
  }

  list.push({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    release_date: movie.release_date,
  });

  localStorage.setItem("watchlist", JSON.stringify(list));
  alert(`${movie.title} was added to your Watchlist!`);
}
