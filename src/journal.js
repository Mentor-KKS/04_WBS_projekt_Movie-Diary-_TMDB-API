import { getNoteForMovie, saveNoteForMovie } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  showLatestMovieDetail();
  renderWatchlist();
  setupFilterButtons();
});

let currentFilter = "all";

function showLatestMovieDetail() {
  const stored = localStorage.getItem("watchlist");
  const movies = stored ? JSON.parse(stored) : [];
  if (movies.length === 0) return;

  const lastMovie = movies[movies.length - 1];
  renderMovieCard(lastMovie, "journalMovieCardView");
}

function renderWatchlist() {
  const container = document.getElementById("watchlistContainer");
  container.innerHTML = "";

  const stored = localStorage.getItem("watchlist");
  let movies = stored ? JSON.parse(stored) : [];

  if (currentFilter !== "all") {
    movies = movies.filter((m) => m.status === currentFilter);
  }

  if (movies.length === 0) {
    container.innerHTML = `<p class="text-gray-500 col-span-full text-center">Your Watchlist is empty.</p>`;
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className =
      "movie-card relative min-w-[192px] max-w-[192px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] cursor-pointer";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${
      movie.title
    }" class="w-full h-60 object-cover rounded">
      <div class="p-2">
        <h3 class="text-sm font-semibold">${movie.title}</h3>
        <p class="text-xs text-gray-500">${movie.release || "Unknown"}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      renderMovieCard(movie, "journalMovieCardView");
    });

    container.appendChild(card);
  });
}

function toggleMovieStatus(id) {
  const stored = localStorage.getItem("watchlist");
  let list = stored ? JSON.parse(stored) : [];
  const index = list.findIndex((m) => m.id === id);
  if (index >= 0) {
    list[index].status =
      list[index].status === "watched" ? "to-watch" : "watched";
    localStorage.setItem("watchlist", JSON.stringify(list));
    renderWatchlist();
  }
}

function removeFromWatchlist(id) {
  const stored = localStorage.getItem("watchlist");
  let list = stored ? JSON.parse(stored) : [];
  list = list.filter((movie) => movie.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(list));
  renderWatchlist();
}

function setupFilterButtons() {
  const btnToWatch = document.getElementById("btnToWatch");
  const btnWatched = document.getElementById("btnWatched");

  btnToWatch.addEventListener("click", () => {
    currentFilter = "to-watch";
    setActiveFilter("to-watch");
    renderWatchlist();
  });

  btnWatched.addEventListener("click", () => {
    currentFilter = "watched";
    setActiveFilter("watched");
    renderWatchlist();
  });

  setActiveFilter("to-watch");
}

function setActiveFilter(status) {
  const btnToWatch = document.getElementById("btnToWatch");
  const btnWatched = document.getElementById("btnWatched");

  if (status === "to-watch") {
    btnToWatch.classList.add("bg-[#01b4e4]", "text-white");
    btnToWatch.classList.remove("bg-white", "text-[#01b4e4]");
    btnWatched.classList.add("bg-white", "text-[#01b4e4]");
    btnWatched.classList.remove("bg-[#01b4e4]", "text-white");
  } else {
    btnWatched.classList.add("bg-[#01b4e4]", "text-white");
    btnWatched.classList.remove("bg-white", "text-[#01b4e4]");
    btnToWatch.classList.add("bg-white", "text-[#01b4e4]");
    btnToWatch.classList.remove("bg-[#01b4e4]", "text-white");
  }
}

function renderMovieCard(movie, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const genres = movie.genre?.join(", ") || "Unknown";
  const rating = movie.vote?.toFixed(1) || "N/A";

  container.innerHTML = `
      <div class="bg-cover bg-center rounded-lg shadow-lg overflow-hidden relative text-white p-8 transition-all duration-500 ease-in-out"
           style="background-image: url('${movie.backcover}')">
        <div class="bg-black/60 p-6 rounded-lg flex flex-col md:flex-row gap-8 items-start">
            <div>  
                <img src="${movie.poster}" alt="${
    movie.title
  }" class="w-[180px] rounded shadow-lg">
                <div class="flex gap-2 pt-4">
                    <button id="toggleStatusBtn"
                    class="rounded-full px-4 py-1 text-sm text-white bg-green-600 hover:bg-green-700 transition">
                    ${movie.status === "watched" ? "To-Watch" : "Watched"}
                    </button>
                    <button id="removeBtn"
                    class="rounded-full px-3 py-3 text-sm text-white border hover:bg-red-700 transition fill-white"">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                    </button>
                </div>
            </div>
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-start">
              <h2 class="text-3xl font-bold">${movie.title}</h2>
              <button class="text-3xl leading-none hover:text-white" id="closeDetails">&times;</button>
            </div>
            <p class="text-sm text-gray-300">
              Genres: <span class="text-white">${genres}</span> • 
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
  
            
          </div>
        </div>
      </div>
    `;

  container.classList.remove("max-h-0", "opacity-0");
  container.classList.add("max-h-[1000px]", "opacity-100");

  container.scrollIntoView({ behavior: "smooth" });

  container.querySelector("#closeDetails").addEventListener("click", () => {
    container.classList.remove("max-h-[1000px]", "opacity-100");
    container.classList.add("max-h-0", "opacity-0");
    setTimeout(() => {
      container.innerHTML = "";
    }, 400);
  });

  // Bind buttons
  container.querySelector("#toggleStatusBtn").addEventListener("click", () => {
    toggleMovieStatus(movie.id);
    renderMovieCard(movie, containerId); // Refresh card content
  });

  container.querySelector("#removeBtn").addEventListener("click", () => {
    removeFromWatchlist(movie.id);
    container.innerHTML = "";
  });

  // Save note
  container.querySelector(".note-input").addEventListener("input", (e) => {
    saveNoteForMovie(movie.id, e.target.value);
  });
}
