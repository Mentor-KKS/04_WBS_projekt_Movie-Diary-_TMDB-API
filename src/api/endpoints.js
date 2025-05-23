// Api key token
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGQwOWVkMzEwYzNjMjAzZWVhOWFhNjczMjdkMWViYiIsIm5iZiI6MTc0NzgzMDQ2MS4xNzEsInN1YiI6IjY4MmRjNmJkMjk2MTAwZmZkZTY0OTljYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8yMUWU1Rez1HJKSDuzss3DI_lGdb8RLzYKheepku7Og'

// header option and authorization for api call
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${API_KEY}`,
  },
};

// different url's for api call (keywords for getData function)
const endpoint = {
  // authentication test
  //authentication: "https://api.themoviedb.org/3/authentication",
  // discover movies
  discoverMovies:
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-GB&page=1&sort_by=popularity.desc",
  // trending movies of the day
  trendingMovieDay:
    "https://api.themoviedb.org/3/trending/movie/day?language=en-GB",
  // trending movies of the week
  trendingMovieWeek:
    "https://api.themoviedb.org/3/trending/movie/week?language=en-GB",
  // upcoming movies
  upcoming: "https://api.themoviedb.org/3/movie/upcoming?language=en-GB&page=1",
  // specific movie called by movie tmdb id
  "movie": `https://api.themoviedb.org/3/movie/`,
};

export { endpoint,options };