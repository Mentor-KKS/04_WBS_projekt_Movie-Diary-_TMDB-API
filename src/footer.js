export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "bg-gray-800 text-white text-center p-6 mt-10";

  footer.innerHTML = `
      <div class="flex flex-col items-center space-y-2">
        <p class="text-sm text-gray-400">This product uses the TMDB API but is not endorsed or certified by TMDB</p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" class="block w-32">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="TMDB Logo" class="w-full h-auto">
        </a>
        <p class="text-xs text-gray-500 mt-2">&copy; 2025 Movie Diary. All rights reserved.</p>
      </div>
    `;

  document.body.appendChild(footer);
}
