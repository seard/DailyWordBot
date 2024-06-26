console.log("Running SamanuelDailyWordBot ...");

const TelegramBot = require('node-telegram-bot-api');
const { readTodaysPostFromJson } = require('./utility/fileReader');
const { buildTodaysVerse } = require('./utility/messageBuilder');

const options = {
  token: '7239427960:AAFVOZ92G8SB7TRaPTM5Shs-Gy0lEOQoW7c',
  channel: '@biblestudyexample',
  verseDataFilePath: 'scripts/e2j/verse-data.json',
};

async function SendTodaysPost() {
  const bot = new TelegramBot(options.token, { polling: true });

  console.log("Parsing verses...");
  const todaysPostData = await readTodaysPostFromJson(options.verseDataFilePath);
  console.log("Done parsing!", todaysPostData);

  console.log("Posting...");
  console.log(todaysPostData);
  var response = buildTodaysVerse(todaysPostData);
  bot.sendMessage(options.channel, response, {
    parse_mode : "HTML",
    disable_web_page_preview: true
  });
  console.log("Done posting!");
}

SendTodaysPost();