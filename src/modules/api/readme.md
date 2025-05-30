# API Module for Movie Diary (TMDB API)

This folder contains all logic for interacting with [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api). It provides functions to fetch, clean, and cache movie data for use in your Movie Diary app.

---

## Folder Structure

```
/src/api/
  ├── cleanData.js
  ├── endpoints.js
  ├── fetch.js
  ├── genres.js
  ├── getData.js
  ├── sessionStoragePolyfill.js (optional, for Node/testing)
  └── testing.js
```

---

## File Overview

- **endpoints.js**  
  Contains all TMDB API endpoint URLs, the `options` object for fetch requests, and the `getEndpoint(keyword, query)` function for building endpoint URLs.

- **fetch.js**  
  Contains `fetchAPI(url)` for making API requests.

- **genres.js**  
  Contains the genre mapping and `findGenre(movieObject)` to resolve genre names.

- **cleanData.js**  
  Contains `cleanData(rawData)` to transform raw API data into a simplified format.

- **getData.js**  
  Main entry point. Exports `getData(keyword)` which handles caching and returns cleaned movie data, and `searchData(searchString)` for searching movies by title or keywords.

- **sessionStoragePolyfill.js**  
  (Optional) Provides a sessionStorage polyfill for Node.js/testing environments.

- **testing.js**  
  Example usage and test script for development.

---

## API Functions

### `getEndpoint(keyword, query = "")`

Returns the appropriate TMDB API endpoint URL based on the provided keyword and optional query.

- For known keywords, constructs the corresponding endpoint URL using the current language code.
- For `"search"`, uses the provided query string to build the search endpoint.
- For unknown keywords, treats the keyword as a TMDB movie ID and returns the single movie endpoint.

**Parameters:**
- `keyword` (`string`): The type of data to fetch (e.g., `"discoverMovies"`, `"trendingMovieDay"`, `"search"`, or a movie ID).
- `query` (`string`, optional): The search query string (used only for the `"search"` keyword).

**Returns:**  
- `string`: The constructed TMDB API endpoint URL.

---

### `searchData(searchString)`

Fetches and returns cleaned movie data from TMDB based on a search query.  
Uses the TMDB search endpoint to find movies matching the provided search string.

**Parameters:**
- `searchString` (`string`): The search query (e.g., movie title or keywords).

**Returns:**  
- `Promise<Array>`: Resolves to an array of cleaned movie objects that match the search query.

---

## How to Use

### 1. Import the Main Functions

In your code, import `getData` and/or `searchData`:

```javascript
import { getData, searchData } from './api/getData.js';
```

### 2. Fetch a List of Movies

```javascript
getData("trendingMovieWeek")
  .then(movies => {
    movies.forEach(movie => {
      console.log("Title:", movie.title);
      // ...other fields
    });
  })
  .catch(error => {
    console.error("Failed to load movie data:", error);
  });
```

### 3. Fetch a Single Movie by TMDB ID

```javascript
getData("12345") // or getData(12345)
  .then(movieArr => {
    const movie = movieArr[0];
    console.log("Title:", movie.title);
    // ...other fields
  })
  .catch(error => {
    console.error("Failed to load movie details:", error);
  });
```

### 4. Search for Movies by Title or Keywords

```javascript
searchData("Inception")
  .then(movies => {
    movies.forEach(movie => {
      console.log("Found:", movie.title);
    });
  })
  .catch(error => {
    console.error("Search failed:", error);
  });
```

### 5. Data Caching

- Results are cached in `sessionStorage` to minimize API calls.
- If you use Node.js, make sure to import and use `sessionStoragePolyfill.js`.

---

## Movie Object Structure

Each movie object returned by `getData` or `searchData` has the following structure:

```js
{
  id: Number,
  title: String,
  overview: String,
  release: String,        // Release date (YYYY-MM-DD)
  vote: Number,           // Average vote
  genre: Array<string>,   // Array of genre names
  poster: String,         // Poster image URL
  backcover: String       // Backdrop image URL
}
```

---

## Testing

Use `testing.js` to quickly test API calls:

```bash
node src/api/testing.js
```

---

## Notes

- You need a valid TMDB API Bearer token in `endpoints.js` for requests to work.
- For browser usage, the native `sessionStorage` is used.
- For Node.js/testing, use the provided polyfill.

---

## License

This code is for educational/demo purposes only. See TMDB's API terms of use for restrictions.