import { getData } from './getData.js'

// Test function, to console log output from getData func
async function testLog() {
  const data = await getData("upcoming");
  console.log(data);
}

testLog();