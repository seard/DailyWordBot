const fs = require('fs');

function buildTodaysVerse(todaysPostData) {
  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'});

  return `<b>${dateTimeFormatter.format(new Date())}</b>

<b>Today's verses:</b>
<i>${todaysPostData.verses.map(verse => `${verse}`).join('\n')}</i>

<b>Accompanying Lectures:</b>
${todaysPostData.references.map(reference => `<a href="${reference.link}">${reference.title}</a>`).join('\n')}

<b>FAQ:</b>
<a href="https://t.me/the_dailyword/2">Start</a>  <a href="https://t.me/the_dailyword/3">Bible Resources</a>
<a href="https://t.me/the_dailyword/20">Schedule</a>  <a href="https://t.me/the_dailyword/10">Navigation</a>

${todaysPostData.postNumber}/365`;
}

module.exports = { buildTodaysVerse };
