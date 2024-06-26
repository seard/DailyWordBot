const fs = require('fs');

function buildTodaysVerse(todaysPostData) {
  console.log(todaysPostData.verses);
  return `<b>${new Date().toDateString()}</b>

<b>Today's verses:</b>
${todaysPostData.verses.map(verse => `${verse}`).join('\n')}

<b>Accompanying Lectures:</b>
${todaysPostData.references.map(reference => `<a href="${reference}">Lecture</a>`).join('\n')}

<b>FAQ:</b>
<a href="https://t.me/the_dailyword/2">Start</a>  <a href="https://t.me/the_dailyword/3">Bible Resources</a>
<a href="https://t.me/the_dailyword/20">Schedule</a>  <a href="https://t.me/the_dailyword/10">Navigation</a>

${todaysPostData.postNumber}/365`;
}

module.exports = { buildTodaysVerse };
