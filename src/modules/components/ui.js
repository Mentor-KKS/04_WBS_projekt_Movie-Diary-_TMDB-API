// ==================== Imports ====================
import {
  toggleWatchlist,
  updateWatchlistButton,
  isInWatchlist,
  getNoteForMovie,
  saveNoteForMovie,
} from "../utils/storage.js";
import { getData } from "../api/getData.js";

// ==================== Variables ====================
let currentlyShownMovieId = null;

// ==================== Functions ====================

/**
 * Renders the main movie in the hero section.
 *
 * Responsibilities:
 * - Updates the background image, title, and overview of the main movie.
 * - Handles the "Add to Watchlist" button functionality.
 *
 * @param {Object} movie - The movie object to render.
 */

function renderMainMovie(movie) {
  const mainMovie = document.querySelector("#mainMovie");
  const titleEl = document.querySelector("#mainTitle");
  const overviewEl = document.querySelector("#mainOverview");
  const addBtn = document.querySelector("#addToWatchlistBtn");

  // Update the hero section with the movie's details.
  mainMovie.style.backgroundImage = `url(${movie.backcover})`;
  titleEl.textContent = movie.title;
  overviewEl.textContent = movie.overview;

  // Replace the "Add to Watchlist" button to reset event listeners.
  const newBtn = addBtn.cloneNode(true);
  addBtn.parentNode.replaceChild(newBtn, addBtn);

  // Update the button state and add event listener for toggling the watchlist.
  updateWatchlistButton(movie.id, newBtn);
  newBtn.addEventListener("click", () => toggleWatchlist(movie, newBtn));
}

/**
 * Renders the side movies in the hero section.
 *
 * Responsibilities:
 * - Displays a list of clickable movie thumbnails.
 * - Updates the main movie when a thumbnail is clicked.
 *
 * @param {Array} movies - Array of movie objects to render.
 */
function renderSideMovies(movies) {
  const sideContainer = document.querySelector("#sideMovies");
  sideContainer.innerHTML = "";

  // Create and append thumbnails for each movie.
  movies.forEach((movie) => {
    const thumb = document.createElement("div");
    thumb.className =
      "aspect-[2/3] w-full overflow-hidden shadow-lg cursor-pointer bg-cover bg-center";
    thumb.style.backgroundImage = `url(${movie.poster})`;
    thumb.title = movie.title;

    // Update the main movie when a thumbnail is clicked.
    thumb.addEventListener("click", () => renderMainMovie(movie));
    sideContainer.appendChild(thumb);
  });
}

/**
 * Activates the trending filter button (e.g., "Today" or "This Week").
 *
 * Responsibilities:
 * - Updates the styling of the active button.
 *
 * @param {string} period - The selected period ("day" or "week").
 */
function activateButton(period) {
  const btnToday = document.querySelector("#btnToday");
  const btnWeek = document.querySelector("#btnWeek");

  if (period === "day") {
    btnToday.classList.add("bg-[#01b4e4]", "text-white");
    btnToday.classList.remove("bg-white", "text-[#01b4e4]");
    btnWeek.classList.add("bg-white", "text-[#01b4e4]");
    btnWeek.classList.remove("bg-[#01b4e4]", "text-white");
  } else {
    btnWeek.classList.add("bg-[#01b4e4]", "text-white");
    btnWeek.classList.remove("bg-white", "text-[#01b4e4]");
    btnToday.classList.add("bg-white", "text-[#01b4e4]");
    btnToday.classList.remove("bg-[#01b4e4]", "text-white");
  }
}

/**
 * Renders trending movie cards in the trending section.
 *
 * Responsibilities:
 * - Dynamically creates and appends movie cards to the trending container.
 * - Handles click events to display detailed movie information.
 *
 * @param {Array} movies - Array of movie objects to render.
 */
function renderTrendingCards(movies) {
  const trendingContainer = document.querySelector("#trendingMovies");
  trendingContainer.innerHTML = "";

  // Create and append cards for each trending movie.
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className =
      "movie-card relative min-w-[192px] max-w-[192px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}"
        class="h-[276px] w-full object-cover rounded shadow cursor-pointer" />
      <h3 class="mt-2 text-xs pl-2 font-semibold">${movie.title}</h3>
      <p class="text-xs pl-2 text-gray-300">${movie.release}</p>
    `;

    const poster = card.querySelector("img");
    poster.addEventListener("click", () => showMovieCard(movie));

    trendingContainer.appendChild(card);
  });
}

/**
 * Toggles the watchlist icon state for a movie.
 *
 * Responsibilities:
 * - Updates the icon to indicate whether the movie is in the watchlist.
 *
 * @param {HTMLElement} button - The button element to update.
 * @param {Object} movie - The movie object.
 */
function toggleWatchIcon(button, movie) {
  const isSaved = isInWatchlist(movie.id);
  button.innerHTML = isSaved ? "✓" : "+";
  button.classList.remove("bg-[#01b4e4]", "bg-[#90cea1]");
  button.classList.add(isSaved ? "bg-[#90cea1]" : "bg-[#01b4e4]");
}

/**
 * Displays detailed information about a selected movie.
 *
 * Responsibilities:
 * - Fetches additional movie details from the API.
 * - Dynamically creates and displays a detailed movie card.
 * - Handles user interactions such as closing the card or adding notes.
 *
 * @param {Object} movie - The movie object to display.
 */
async function showMovieCard(movie) {
  const container = document.querySelector("#movieCardView");

  if (currentlyShownMovieId === movie.id) {
    container.classList.remove("max-h-[1000px]", "opacity-100");
    container.classList.add("max-h-0", "opacity-0");
    setTimeout(() => {
      container.innerHTML = "";
      currentlyShownMovieId = null;
    }, 400);
    return;
  }

  currentlyShownMovieId = movie.id;

  try {
    const [details] = await getData(movie.id);
    if (!details) return;

    const genres = details.genre?.join(", ") || "Unknown";
    const release = details.release || "Unknown";
    const rating = details.vote?.toFixed(1) || "N/A";

    container.innerHTML = `
      <div class="bg-cover bg-center rounded-lg shadow-lg overflow-hidden relative text-white p-8 transition-all duration-500 ease-in-out"
           style="background-image: url('${movie.backcover}')">
        <div class="bg-black/60 p-6 rounded-lg flex flex-col md:flex-row gap-8 items-start">
          <img src="${movie.poster}" alt="${
      movie.title
    }" class="w-[180px] rounded shadow-lg">
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-start">
              <h2 class="text-3xl font-bold">${movie.title}</h2>
              <button class="text-3xl leading-none hover:text-white" id="closeDetails">&times;</button>
            </div>
            <p class="text-sm text-gray-300">
              Genres: <span class="text-white">${genres}</span> • 
              Release: <span class="text-white">${release}</span> • 
              Rating: <span class="text-white">${rating}</span>
            </p>
            <p class="text-sm italic text-gray-300 pt-2">Overview</p>
            <p class="text-sm text-white">${
              movie.overview || "No overview available."
            }</p>

            <div class="mt-4">
              <label class="block text-sm font-medium text-white">Note:</label>
              <textarea class="note-input w-full p-2 border rounded resize-none text-black bg-white/80"
                        rows="4" placeholder="Write a note...">${
                          getNoteForMovie(movie.id) || ""
                        }</textarea>
            </div>

            <button class="add-to-watchlist bg-[#01b4e4] text-white px-4 py-2 rounded hover:bg-[#0199c5] mt-4">
              + Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    `;

    container.classList.remove("max-h-0", "opacity-0");
    container.classList.add("max-h-[1000px]", "opacity-100");
    container.scrollIntoView({ behavior: "smooth" });

    container.querySelector(".note-input").addEventListener("input", (e) => {
      saveNoteForMovie(movie.id, e.target.value);
    });

    const btn = container.querySelector(".add-to-watchlist");
    updateWatchlistButton(movie.id, btn);
    btn.addEventListener("click", () => toggleWatchlist(movie, btn));

    container.querySelector("#closeDetails").addEventListener("click", () => {
      container.classList.remove("max-h-[1000px]", "opacity-100");
      container.classList.add("max-h-0", "opacity-0");
      setTimeout(() => {
        container.innerHTML = "";
        currentlyShownMovieId = null;
      }, 400);
    });
  } catch (err) {
    console.error("Failed to load movie details:", err);
  }
}

/**
 * Loads and renders upcoming movies based on a filter.
 *
 * Responsibilities:
 * - Fetches upcoming movies from the API.
 * - Filters movies by release date (e.g., "this-month", "next-month").
 * - Dynamically creates and appends movie cards to the upcoming section.
 *
 * @param {string} filter - The filter to apply ("all", "this-month", "next-month").
 */
async function loadUpcoming(filter = "all") {
  const container = document.querySelector("#upcomingMovies");
  container.innerHTML = "";

  const allMovies = await getData("upcoming");

  const now = new Date();
  const thisMonth = now.getMonth();
  const nextMonth = (thisMonth + 1) % 12;

  let filteredMovies = allMovies;

  if (filter === "this-month") {
    filteredMovies = allMovies.filter((movie) => {
      const date = new Date(movie.release);
      return date.getMonth() === thisMonth;
    });
  } else if (filter === "next-month") {
    filteredMovies = allMovies.filter((movie) => {
      const date = new Date(movie.release);
      return date.getMonth() === nextMonth;
    });
  }

  filteredMovies.slice(0, 20).forEach((movie) => {
    const card = document.createElement("div");
    card.className =
      "relative min-w-[192px] max-w-[192px] flex-shrink-0 cursor-pointer pb-6";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}"
        class="h-[276px] w-full object-cover rounded shadow" />

      <button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg bg-gray-800 hover:bg-[#01b4e4] transition">
        ${isInWatchlist(movie.id) ? "✓" : "+"}
      </button>

      <h3 class="mt-2 text-xs font-semibold pl-2">${movie.title}</h3>
      <p class="text-xs text-gray-400 pl-2">${movie.release || "Unknown"}</p>
    `;

    // open details
    card.querySelector("img").addEventListener("click", () => {
      showMovieCard(movie);
    });

    // handle icon toggle
    const btn = card.querySelector("button");
    updateWatchlistButton(movie.id, btn, "icon");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWatchlist(movie, btn, "icon");
    });

    container.appendChild(card);
  });
}

/**
 * Sets up filter buttons for the upcoming movies section.
 *
 * Responsibilities:
 * - Adds event listeners to filter buttons.
 * - Updates the active filter button's styling and reloads the movies.
 */
function setupUpcomingFilters() {
  document.querySelectorAll(".filter-upcoming").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      document.querySelectorAll(".filter-upcoming").forEach((b) => {
        b.classList.remove("bg-[#01b4e4]", "text-white");
        b.classList.add("bg-white", "text-[#01b4e4]");
      });

      btn.classList.add("bg-[#01b4e4]", "text-white");
      btn.classList.remove("bg-white", "text-[#01b4e4]");

      loadUpcoming(filter);
    });
  });
}

// ==================== Export ====================
export {
  renderMainMovie,
  renderSideMovies,
  activateButton,
  renderTrendingCards,
  showMovieCard,
  loadUpcoming,
  setupUpcomingFilters,
  toggleWatchIcon,
};
