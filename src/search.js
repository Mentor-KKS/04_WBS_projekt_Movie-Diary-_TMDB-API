import { searchData } from "./api/getData.js";
import { showMovieCard } from "./ui.js";
import { isInWatchlist, toggleWatchlist } from "./storage.js";

function createSearchPopup(results) {
  let popup = document.getElementById("searchPopup");
  if (popup) popup.remove();

  popup = document.createElement("div");
  popup.id = "searchPopup";
  popup.className = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-start justify-center p-4
  `;
  popup.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto relative p-6">
      <button id="closePopup" class="absolute top-4 right-8 text-gray-500 hover:text-black text-xl font-bold">
        &times;
      </button>
      <h2 class="text-lg font-semibold mb-4">Search Results</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2" id="searchResults">
        ${
          results.length === 0
            ? `<p class="col-span-full text-gray-500">No results found.</p>`
            : results
                .map((movie, i) => {
                  const saved = isInWatchlist(movie.id);
                  return `
          <div class="search-card group relative bg-white rounded shadow overflow-hidden border cursor-pointer">
            <img src="${movie.poster}" alt="${
                    movie.title
                  }" class="w-full h-60 object-cover" />
            <button 
              class="watchlistBtn absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-white transition"
              style="background-color: ${saved ? "#90cea1" : "#1f2937"}"
              aria-label="Toggle Watchlist"
            >
              ${saved ? "✓" : "+"}
            </button>
            <div class="p-3">
              <h3 class="font-semibold text-sm line-clamp-2">${movie.title}</h3>
              <div class="text-xs text-gray-400 mt-1">${
                movie.release || "Unknown"
              }</div>
              <div class="text-xs text-yellow-500 mt-1">★ ${
                movie.vote?.toFixed(1) || "N/A"
              }</div>
            </div>
          </div>
          `;
                })
                .join("")
        }
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Close popup
  popup
    .querySelector("#closePopup")
    .addEventListener("click", () => popup.remove());
  popup.addEventListener("click", (e) => {
    if (e.target.id === "searchPopup") popup.remove();
  });

  // Handle clicks on cards and buttons
  popup.querySelectorAll(".search-card").forEach((card, index) => {
    const movie = results[index];
    const iconBtn = card.querySelector(".watchlistBtn");

    card.addEventListener("click", (e) => {
      if (!iconBtn.contains(e.target)) {
        popup.remove();
        showMovieCard(movie);
      }
    });

    iconBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWatchlist(movie, iconBtn, "icon"); // 👈 ganz wichtig!
    });
  });
}

async function handleSearch(query) {
  try {
    const results = await searchData(query);
    createSearchPopup(results);
  } catch (err) {
    console.error("Search failed:", err);
  }
}

export { handleSearch };
