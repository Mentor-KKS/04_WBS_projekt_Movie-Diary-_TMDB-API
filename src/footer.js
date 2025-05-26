export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "bg-gray-800 text-white text-center p-6 mt-10";

  footer.innerHTML = `
      <div class="flex flex-col items-center space-y-2">
        <p class="text-sm text-gray-400">This product uses the TMDB API but is not endorsed or certified by TMDB</p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" class="block w-32">
          <img src="./pic/TMDB_Logo.svg" alt="TMDB Logo" class="w-1/2 h-auto">
        </a>
        <p class="text-xs text-gray-500 mt-2">&copy; 2023 Movie Diary. All rights reserved.</p>
      </div>
    `;

  document.body.appendChild(footer);
}
