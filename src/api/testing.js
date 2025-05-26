import { getData } from './getData.js'
import { searchData } from './getData.js'

// Test function, to console log output from getData func
async function testLogGet(keyword) {
  const data = await getData(keyword);
  console.log(data);
}

// testLogGet("discoverMovies");
// testLogGet("trendingMovieDay");
// testLogGet("trendingMovieWeek");
// testLogGet("upcoming");



// Test function, to console log output from searchData func
async function testLogSearch(keyword) {
  const data = await searchData(keyword);
  console.log(data);
}


const searchString = "rdrdrdrdrdrdfgdhgufzcrzvdttubui"

// testLogSearch(searchString);