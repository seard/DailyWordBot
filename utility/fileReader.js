const fs = require('fs').promises;

async function readTodaysPostFromJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    function sameDay(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    }

    const postList = JSON.parse(data);

    return postList.find(post => sameDay(new Date(post.date), new Date()));
  } catch (err) {
    console.error("An error occurred while reading the file:", err);
    return null;
  }
}

module.exports = { readTodaysPostFromJson };