// ==================== Imports ====================
import {
  activateButton,
  renderMainMovie,
  renderSideMovies,
  renderTrendingCards,
  loadUpcoming,
  setupUpcomingFilters,
} from "./ui.js";
import { getData } from "./api/getData.js"; // your modular API functions

// ==================== Hero Section ====================
async function loadHeroSection() {
  try {
    const movies = await getData("discoverMovies");
    const top = movies.slice(0, 4);
    renderMainMovie(top[0]);
    renderSideMovies(top);
  } catch (error) {
    console.error("Error loading hero section:", error);
  }
}

// ==================== Trending Section ====================
async function loadTrending(period = "day") {
  const key = period === "day" ? "trendingMovieDay" : "trendingMovieWeek";
  try {
    const movies = await getData(key);
    renderTrendingCards(movies);
  } catch (err) {
    console.error("Failed to load trending:", err);
  }
}

function setupTrendingButtons() {
  document.querySelector("#btnToday").addEventListener("click", () => {
    activateButton("day");
    loadTrending("day");
  });

  document.querySelector("#btnWeek").addEventListener("click", () => {
    activateButton("week");
    loadTrending("week");
  });
}

// ==================== Init ====================
loadHeroSection();
activateButton("day");
loadTrending("day");
loadUpcoming("all");
setupTrendingButtons();
setupUpcomingFilters();
