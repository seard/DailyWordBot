const TelegramBot = require('node-telegram-bot-api');
const { buildTodaysVerse } = require('../../utility/messageBuilder');
const fs = require('fs').promises;

const options = {
  token: '7239427960:AAFVOZ92G8SB7TRaPTM5Shs-Gy0lEOQoW7c',
  channel: '@biblestudyexample', // DEV
  verseDataFilePath: 'scripts/e2j/verse-data.json',
};

async function readAllDayPostsFromJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    function sameDay(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    }

    const postList = JSON.parse(data);

    return postList;
  } catch (err) {
    console.error("An error occurred while reading the file:", err);
    return null;
  }
}

async function TestAllDays() {
  const bot = new TelegramBot(options.token, { polling: true });

  const allDayPosts = await readAllDayPostsFromJson(options.verseDataFilePath);

  allDayPosts.forEach(dayPost => {
    var response = buildTodaysVerse(dayPost);
    console.log(response);
  });

  process.exit(0);
}

TestAllDays();

