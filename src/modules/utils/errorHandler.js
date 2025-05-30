// src/modules/utils/errorHandler.js

/**
 * Displays a user-friendly error message in the UI.
 * @param {string} message - Error message to display.
 */
export function displayError(message) {
  const errorContainer = document.createElement("div");
  errorContainer.className =
    "fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow";
  errorContainer.textContent = message;

  document.body.appendChild(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}
