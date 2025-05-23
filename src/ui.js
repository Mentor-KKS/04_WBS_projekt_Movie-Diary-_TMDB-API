// ==================== Imports ====================
import {
  getNoteForMovie,
  saveNoteForMovie,
  saveToWatchlist,
} from "./storage.js";
import { API_KEY, IMAGE_BASE } from "./config.js"; // Maybe in the main file

let currentlyShownMovieId = null;

// ==================== UI Elements ====================

export function renderMainMovie(movie) {
  const mainMovie = document.querySelector("#mainMovie");
  const titleEl = document.querySelector("#mainTitle");
  const overviewEl = document.querySelector("#mainOverview");
  const addBtn = document.querySelector("#addToWatchlistBtn");

  mainMovie.style.backgroundImage = `url(${IMAGE_BASE}${movie.backdrop_path})`;
  titleEl.textContent = movie.title;
  overviewEl.textContent = movie.overview;

  const newBtn = addBtn.cloneNode(true);
  addBtn.parentNode.replaceChild(newBtn, addBtn);
  newBtn.addEventListener("click", () => saveToWatchlist(movie));
}

export function renderSideMovies(movies) {
  const sideContainer = document.querySelector("#sideMovies");
  sideContainer.innerHTML = "";

  movies.forEach((movie) => {
    const thumb = document.createElement("div");
    thumb.className =
      "aspect-[2/3] w-full overflow-hidden shadow-lg cursor-pointer bg-cover bg-center";
    thumb.style.backgroundImage = `url(${IMAGE_BASE}${movie.poster_path})`;
    thumb.title = movie.title;

    thumb.addEventListener("click", () => renderMainMovie(movie));
    sideContainer.appendChild(thumb);
  });
}

export function activateButton(period) {
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

export function renderTrendingCards(movies) {
  const trendingContainer = document.querySelector("#trendingMovies");
  trendingContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className =
      "movie-card relative min-w-[192px] max-w-[192px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]";

    card.innerHTML = `
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}"
        class="h-[276px] w-full object-cover rounded shadow cursor-pointer" />
      <h3 class="mt-2 text-xs pl-2 font-semibold">${movie.title}</h3>
      <p class="text-xs pl-2 text-gray-300">${
        movie.release_date || "Unknown"
      }</p>
    `;

    const poster = card.querySelector("img");
    poster.addEventListener("click", () => {
      showMovieCard(movie);
    });

    trendingContainer.appendChild(card);
  });
}

export async function showMovieCard(movie) {
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
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
    ); // Linus this must be changed to the correct API endpoint
    const details = await res.json();

    const genres = details.genres?.map((g) => g.name).join(", ") || "Unknown";
    const runtime = details.runtime ? `${details.runtime} min` : "Unknown";
    const rating = details.vote_average?.toFixed(1) || "N/A";

    container.innerHTML = `
      <div class="bg-cover bg-center rounded-lg shadow-lg overflow-hidden relative text-white p-8 transition-all duration-500 ease-in-out" style="background-image: url('${
        IMAGE_BASE + movie.backdrop_path
      }')">
        <div class="bg-black/60 p-6 rounded-lg flex flex-col md:flex-row gap-8 items-start">
          <img src="${IMAGE_BASE + movie.poster_path}" alt="${
      movie.title
    }" class="w-[180px] rounded shadow-lg">
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-start">
              <h2 class="text-3xl font-bold">${
                movie.title
              } <span class="text-gray-300">(${
      movie.release_date?.split("-")[0]
    })</span></h2>
              <button class="text-3xl leading-none hover:text-white" id="closeDetails">&times;</button>
            </div>
            <p class="text-sm text-gray-300">Genres: <span class="text-white">${genres}</span> • Runtime: <span class="text-white">${runtime}</span> • Rating: <span class="text-white">${rating}</span></p>
            <p class="text-sm italic text-gray-300 pt-2">Overview</p>
            <p class="text-sm text-white">${
              movie.overview || "No overview available."
            }</p>
            <div class="mt-4">
              <label class="block text-sm font-medium text-white">Note:</label>
              <textarea class="note-input w-full p-2 border rounded resize-none text-black bg-white/80" rows="4" placeholder="Write a note...">${
                getNoteForMovie(movie.id) || ""
              }</textarea>
            </div>
            <button class="add-to-watchlist bg-[#01b4e4] text-white px-4 py-2 rounded hover:bg-[#0199c5] mt-4">+ Add to Watchlist</button>
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

    container
      .querySelector(".add-to-watchlist")
      .addEventListener("click", () => {
        saveToWatchlist(movie);
      });

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

export async function loadUpcoming(filter = "all") {
  const container = document.querySelector("#upcomingMovies");
  container.innerHTML = "";

  const storageKey = "upcoming_all";
  let movies;

  const cached = sessionStorage.getItem(storageKey);
  if (cached) {
    movies = JSON.parse(cached);
  } else {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1` // Linus this must be changed to the correct API endpoint too
      );
      const data = await res.json();
      movies = data.results;
      sessionStorage.setItem(storageKey, JSON.stringify(movies));
    } catch (err) {
      console.error("Error loading upcoming movies:", err);
      return;
    }
  }

  const now = new Date();
  const thisMonth = now.getMonth();
  const nextMonth = (thisMonth + 1) % 12;

  let filteredMovies = movies;

  if (filter === "this-month") {
    filteredMovies = movies.filter((movie) => {
      const date = new Date(movie.release_date);
      return date.getMonth() === thisMonth;
    });
  } else if (filter === "next-month") {
    filteredMovies = movies.filter((movie) => {
      const date = new Date(movie.release_date);
      return date.getMonth() === nextMonth;
    });
  }

  filteredMovies.slice(0, 20).forEach((movie) => {
    const card = document.createElement("div");
    card.className = "min-w-[192px] max-w-[192px] flex-shrink-0";

    card.innerHTML = `
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}"
        class="h-[276px] w-full object-cover rounded shadow" />
      <h3 class="mt-2 text-xs font-semibold pl-2">${movie.title}</h3>
      <p class="text-xs text-gray-400 pl-2">${
        movie.release_date || "Unknown"
      }</p>
      <button class="add-to-watchlist bg-[#01b4e4] text-white text-xs px-3 py-1 mt-2 ml-2 rounded hover:bg-[#0199c5]">
        + Add to Watchlist
      </button>
    `;

    card.querySelector(".add-to-watchlist").addEventListener("click", () => {
      saveToWatchlist(movie);
    });

    container.appendChild(card);
  });
}

export function setupUpcomingFilters() {
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
