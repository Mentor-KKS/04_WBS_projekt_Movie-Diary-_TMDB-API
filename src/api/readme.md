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
```

---

## File Overview

- **endpoints.js**  
  Contains all TMDB API endpoint URLs and the `options` object for fetch requests.

- **fetch.js**  
  Contains `fetchAPI(url)` for making API requests.

- **genres.js**  
  Contains the genre mapping and `findGenre(movieObject)` to resolve genre names.

- **cleanData.js**  
  Contains `cleanData(rawData)` to transform raw API data into a simplified format.

- **getData.js**  
  Main entry point. Exports `getData(keyword)` which handles caching and returns cleaned movie data.

---

## How to Use

### 1. Import the Main Function

In your code, import `getData`:

```javascript
import { getData } from './api/getData.js';
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

### 4. Data Caching

- Results are cached in `sessionStorage` to minimize API calls.

---

## Movie Object Structure

Each movie object returned by `getData` has the following structure:

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

## Notes

- You need a valid TMDB API Bearer token in `endpoints.js` for requests to work.
- For browser usage, the native `sessionStorage` is used.

---

## License

This code is for educational/demo purposes only. See TMDB's API terms of use for restrictions.