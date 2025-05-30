// ==================== Local Storage Utilities ====================

function saveNoteForMovie(movieId, note) {
  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  notes[movieId] = note;
  localStorage.setItem("movieNotes", JSON.stringify(notes));
}

function getNoteForMovie(movieId) {
  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  return notes[movieId] || "";
}

function isInWatchlist(id) {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];
  return list.some((movie) => movie.id === id);
}

/**
 * Add/remove movie from watchlist and update button UI
 * @param {Object} movie - Movie object
 * @param {HTMLElement} button - Button element to update
 * @param {"text" | "icon"} type - Button style type
 */
function toggleWatchlist(movie, button, type = "text") {
  const list = JSON.parse(localStorage.getItem("watchlist")) || [];
  const index = list.findIndex((item) => item.id === movie.id);

  if (index !== -1) {
    list.splice(index, 1);
  } else {
    list.push({
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      backcover: movie.backcover,
      overview: movie.overview,
      release: movie.release,
      vote: movie.vote,
      genre: movie.genre,
      status: "to-watch",
    });
  }

  localStorage.setItem("watchlist", JSON.stringify(list));
  updateWatchlistButton(movie.id, button, type);
}

/**
 * Update the appearance of a watchlist button
 * @param {number} id - Movie ID
 * @param {HTMLElement} button - Button element
 * @param {"text" | "icon"} type - Button style
 */
function updateWatchlistButton(id, button, type = "text") {
  const saved = isInWatchlist(id);

  if (type === "icon") {
    // Small round icon button
    button.textContent = saved ? "✓" : "+";
    button.style.backgroundColor = saved ? "#90cea1" : "#01b4e4";
    button.classList.remove("hover:bg-[#01b4e4]");
    if (!saved) {
      button.classList.add("hover:bg-[#01b4e4]");
    }
  } else {
    // Full-width button with text
    button.textContent = saved ? "✓ Added to Watchlist" : "+ Add to Watchlist";
    button.className = saved
      ? "bg-[#90cea1] text-white px-4 py-2 rounded"
      : "bg-[#01b4e4] hover:bg-[#0199c5] text-white px-4 py-2 rounded";
  }
}

// ==================== Export ====================

export {
  saveNoteForMovie,
  getNoteForMovie,
  isInWatchlist,
  toggleWatchlist,
  updateWatchlistButton,
};
