console.log("Running SamanuelDailyWordBot ...");

const TelegramBot = require('node-telegram-bot-api');

const token = '7239427960:AAFVOZ92G8SB7TRaPTM5Shs-Gy0lEOQoW7c';
const bot = new TelegramBot(token, { polling: true });
const channelName = "@biblestudyexample";
let todaysPost;

const fs = require('fs');

console.log("Parsing verses...");

await fs.readFileSync('verse-data.json', 'utf8', (err, data) => {
  if (err) {
    console.error("An error occurred while reading the file:", err);
    return;
  }

  function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  const postList = JSON.parse(data);
  postList.forEach(post => {
    if (sameDay(new Date(post.date), new Date())) {
      todaysPost = post;
      return;
    }
  });
});

console.log("Done parsing!");

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    bot.sendMessage(chatId, '<b>Welcome to the bot!</b>', { parse_mode : "HTML" });
  }

  if (messageText === '/todayspost') {
    PostTodaysVerses(chatId);
  }
});

PostTodaysVerses(channelName);

function PostTodaysVerses(channel) {
  var response =
`<b>${new Date().toDateString()}</b>

<b>Today's verses:</b>
${todaysPost.verses.map(verse => `${verse}`).join('\n')}

<b>Accompanying Lectures:</b>
${todaysPost.references.map(reference => `<a href="${reference}">Lecture</a>`).join('\n')}

<b>FAQ:</b>
<a href="https://t.me/the_dailyword/2">Start</a>  <a href="https://t.me/the_dailyword/3">Bible Resources</a>
<a href="https://t.me/the_dailyword/20">Schedule</a>  <a href="https://t.me/the_dailyword/10">Navigation</a>

${todaysPost.postNumber}/365`;

  bot.sendMessage(channel, response, {
    parse_mode : "HTML",
    disable_web_page_preview: true
  });
}
