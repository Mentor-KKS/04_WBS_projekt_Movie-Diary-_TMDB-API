// ==================== Imports ====================
// Import the `handleSearch` function to handle search functionality.
import { handleSearch } from "./search.js";

// ==================== Functions ====================

/**
 * Renders the header section of the application.
 *
 * Responsibilities:
 * - Dynamically creates and appends the header to the document.
 * - Provides navigation links, a search bar, and a language selection dropdown.
 * - Handles user interactions such as language changes, dropdown toggles, and search submissions.
 *
 * This module ensures that the header is consistently displayed across all pages
 * and provides essential navigation and search functionality.
 */
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

                <div class="relative">
        <button id="languageCode" class="text-sm font-medium text-gray-700 hover:text-gray-900">Language</button>
          <div id="dropdownMenuLanguageCode" class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 hidden z-10 cursor-pointer">
            <a id="english" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</a>
            <a id="german" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">German</a>
            <a id="spanish" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Spanish</a>
            <a id="ukrainian" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ukrainian</a>
          </div>
        </div>

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

  // ==================== Event Listeners ====================

  // Toggle the language dropdown menu.
  document.getElementById("languageCode").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdownMenuLanguageCode");
    dropdown.classList.toggle("hidden");
  });

  // Language selection event listeners.
  document
    .getElementById("english")
    .addEventListener("click", () => changeLanguage("en-GB"));
  document
    .getElementById("german")
    .addEventListener("click", () => changeLanguage("de-DE"));
  document
    .getElementById("spanish")
    .addEventListener("click", () => changeLanguage("es-ES"));
  document
    .getElementById("ukrainian")
    .addEventListener("click", () => changeLanguage("uk-UA"));

  // Toggle the burger menu dropdown.
  document.getElementById("burgerMenuBtn").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.classList.toggle("hidden");
  });

  // Handle search form submission.
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    if (query) handleSearch(query); // 🔹 Direkter Funktionsaufruf
  });
}

/**
 * Changes the language of the application.
 *
 * @param {string} languageCode - The language code to set (e.g., "en-GB", "de-DE").
 */
export function changeLanguage(languageCode) {
  // Store the selected language code in localStorage.
  localStorage.setItem("languageCode", languageCode);

  // Clear session storage to reset cached data.
  sessionStorage.clear();

  // Reload the page to apply the language change.
  location.reload();
}
