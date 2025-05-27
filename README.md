# Movie-Diary-_TMDB-API
# 🎬 Movie Diary (TMDB API)

Welcome to Movie Diary, a collaborative web project that leverages the [TMDB API](https://www.themoviedb.org/documentation/api) to help users discover and journal their favorite movies. This app demonstrates practical usage of core Web APIs, including DOM manipulation, Web Storage, and the Fetch API, while maintaining a sleek interface with TailwindCSS.

---

## 👥 Team Collaboration

This is a group project. All members are equally responsible for completing features, following group best practices, and maintaining clean, version-controlled code.

---

## 🛠️ Technologies Used

- **HTML5 & JavaScript (ES6+)**
- **TMDB API**
- **TailwindCSS**
- **DOM Manipulation**
- **Web Storage (localStorage & sessionStorage)**
- **Fetch API**

---

## 📁 Project Structure

```
/Movie-Diary-_TMDB-API
├── index.html
├── about.html
├── journal.html
├── .gitignore
style-about.css
style.css
├── /src
│   ├── /api
│   │   ├── cleanData.js
│   │   ├── endpoints.js
│   │   ├── fetchApi.js
│   │   ├── genres.js
│   │   ├── getData.js
│   │   ├── readme.md
│   │   ├── sessionStoragePolyfill.js (optional)
│   │   └── testing.js (optional)
│   ├── footer.js
│   ├── header.js
│   ├── journal-ui.js
│   ├── journal.js
│   ├── main.js
│   ├── search.js
│   ├── storage.js
│   └── ui.js
│   
│   
└── /pic
```

---

## 🚀 Key Features

- **Discover trending, upcoming, and popular movies**
- **Search for movies by title or keywords**
- **View detailed movie information**
- **Journal and save your favorite movies**
- **Responsive UI with TailwindCSS**
- **Efficient data caching using sessionStorage**

---

## 🔑 API Usage

The app uses a modular API layer in `/src/api/` for all TMDB interactions.  
Key functions include:

- `getData(keyword)`: Fetches and caches movie lists or single movie details.
- `searchData(searchString)`: Searches TMDB for movies matching a query.
- `getEndpoint(keyword, query)`: Builds the correct TMDB API endpoint URL.

See [`/src/api/readme.md`](./src/api/readme.md) for detailed API documentation and usage examples.

---

## 📝 How to Run

1. **Clone the repository**
2. **Install dependencies** (if any)
3. **Add your TMDB API Bearer token** in `/src/api/endpoints.js`
4. **Open `index.html` in your browser** or use a local server

---

## 🧪 Testing

- Use `/src/api/testing.js` to test API calls in Node.js.
- For browser testing, use the app UI and check the console for errors.

---

## 📚 License & Credits

- This project is for educational/demo purposes only.
- See TMDB's API terms of use for restrictions.
- Movie data & images provided by [TMDB](https://www.themoviedb.org/).

---