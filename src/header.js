import { handleSearch } from "./search.js";

export function renderHeader() {
  const header = document.getElementById("headerContainer");
  if (!header) return;
  header.className = "max-w-6xl pt-4 mt-4 mx-auto";
  header.innerHTML = `
    <nav class="bg-white p-4 flex justify-between items-center shadow-md z-[999]">
      <div class="max-w-md">
        <a href="index.html">
          <img src="/Movie-Diary-_TMDB-API/pic/logo_b.png" alt="Movie Diary Logo" class="h-10 cursor-pointer" />
        </a>
      </div>
      <div class="flex items-center w-full max-w-md mx-6">
        <form id="searchForm" class="flex w-full max-w-md mx-6 border border-[#01b4e4]">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for movie, tv show, person..."
            class="w-full px-4 py-2 text-gray-400 font-light bg-white"
          />
          <button
            type="submit"
            class="bg-[#01b4e4] text-white px-4 py-2 hover:bg-[#029ac6] transition"
          >
            <span class="hidden md:inline">Search</span>
          </button>
        </form>
      </div>
      <div class="relative flex items-center space-x-6 pr-5">
        <div class="text-sm font-medium text-gray-700 hover:text-gray-900">EN</div>
        <a href="journal.html" class="text-sm text-gray-800">My Watchlist</a>
        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          class="h-8 w-8 rounded-full object-cover border-2 border-gray-300"
        />
        <div class="relative">
          <button id="burgerMenuBtn" class="text-gray-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div id="dropdownMenu" class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 hidden z-10">
            <a href="index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home</a>
            <a href="journal.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Watchlist</a>
            <a href="about.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</a>
          </div>
        </div>
      </div>
    </nav>
  `;
  document.body.prepend(header);

  // Dropdown toggle
  document.getElementById("burgerMenuBtn").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.classList.toggle("hidden");
  });

  // Search functionality
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    if (query) handleSearch(query); // 🔹 Direkter Funktionsaufruf
  });
}
