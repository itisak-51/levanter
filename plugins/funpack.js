// ╔══════════════════════════════════════════╗
// ║         FUNPACK PLUGIN for Levanter      ║
// ║  Drop this file in your /plugins folder  ║
// ╚══════════════════════════════════════════╝
//
// Commands (use your bot prefix, default is "."):
//   .roast       — Get roasted (or roast a quoted person)
//   .compliment  — Wholesome pick-me-up
//   .8ball <q>   — Ask the Magic 8-Ball anything
//   .wyr         — Would You Rather? (group icebreaker)
//   .dare        — Random dare challenge
//   .rizz        — Generate a smooth rizz line
//   .horoscope <sign> — Absurd daily horoscope
//   .rps <rock|paper|scissors> — Play Rock Paper Scissors vs the bot

'use strict';

const { bot } = require('../lib');

// ─── Data ────────────────────────────────────────────────────────────────────

const ROASTS = [
  "You're the human equivalent of a participation trophy. 🏆",
  "I'd explain it to you, but I left my crayons at home. 🖍️",
  "You have the charisma of a wet sock in a hurricane. 🧦",
  "Your Wi-Fi personality keeps dropping out at the worst times. 📶",
  "You're like a software update — everyone ignores you and hopes you go away. 💻",
  "If laziness were a superpower, you'd still find a way to half-use it. 🦸",
  "You have the energy of a phone at 2% battery — barely functional and always dying. 🔋",
  "I've seen deeper thoughts in a fortune cookie. 🥠",
  "You're proof that even evolution takes a day off sometimes. 🐒",
  "Your cooking is the reason delivery apps exist. 🚗",
  "You're the human version of a 'terms and conditions' page — nobody reads you. 📜",
  "If overthinking were an Olympic sport, you'd still somehow overthink the registration. 🏅",
  "You're like a Monday — nobody asked for you but here you are. 📅",
  "Your vibe is like a buffering video — everyone's waiting but nothing's loading. ⏳",
  "Even your shadow tries to keep its distance sometimes. 👤",
];

const COMPLIMENTS = [
  "You are the kind of person who makes others feel like sunshine on a cloudy day. ☀️",
  "You have a genuinely beautiful mind — not everyone notices, but it shows. 🌟",
  "You bring a kind of energy to a room that can't be faked. Keep doing that. ✨",
  "The world is measurably better with you in it. That's just a fact. 💫",
  "You're someone people feel lucky to know, even if they don't say it enough. 💛",
  "Your resilience is quietly inspiring. Seriously. 🌿",
  "You make hard things look easy, and that takes real strength. 💪",
  "There's a warmth to you that people remember long after the conversation ends. 🔥",
  "Your sense of humor is *chef's kiss* — genuinely hilarious. 😂",
  "You have the rare gift of making people feel heard. Don't underestimate that. 👂",
  "You're the main character of your story and it's a good one. 📖",
  "Honestly? You're doing better than you think. A lot better. 🎯",
  "Your taste is immaculate and your standards are correct. Stand firm. 👑",
  "You're one of the good ones. The world needs more of you. 🌍",
];

const EIGHT_BALL = [
  // Positive
  "✅ It is certain.",
  "✅ It is decidedly so.",
  "✅ Without a doubt.",
  "✅ Yes, definitely.",
  "✅ You may rely on it.",
  "✅ As I see it, yes.",
  "✅ Most likely.",
  "✅ Outlook good.",
  "✅ Yes.",
  "✅ Signs point to yes.",
  // Neutral
  "🔮 Reply hazy, try again.",
  "🔮 Ask again later.",
  "🔮 Better not tell you now.",
  "🔮 Cannot predict now.",
  "🔮 Concentrate and ask again.",
  // Negative
  "❌ Don't count on it.",
  "❌ My reply is no.",
  "❌ My sources say no.",
  "❌ Outlook not so good.",
  "❌ Very doubtful.",
];

const WOULD_YOU_RATHER = [
  "Fight 100 duck-sized horses 🐴 OR one horse-sized duck? 🦆",
  "Only be able to whisper 🤫 OR only be able to shout 📣 for the rest of your life?",
  "Have fingers as long as your legs 🖐️ OR legs as short as your fingers? 🦵",
  "Know the date of your death 💀 OR know the cause but not when?",
  "Live in a world without music 🎵 OR without movies 🎬?",
  "Be able to speak every language 🗣️ OR play every instrument 🎸?",
  "Always have to say what you're thinking 💭 OR never be able to speak again?",
  "Be 10 minutes late to everything 🕐 OR 2 hours early to everything?",
  "Have unlimited battery life on all devices 🔋 OR free Wi-Fi everywhere 📶?",
  "Only eat your least favourite food forever 😬 OR never eat your favourite food again? 😭",
  "Have no eyebrows 😐 OR only one eyebrow? 🤨",
  "Be able to fly ✈️ but only at walking speed OR teleport 🌀 but only to places you've never been?",
  "Always be 10 years behind on trends 📉 OR always trend-set things that turn out embarrassing? 😳",
  "Have a photographic memory 🧠 OR be able to sleep only 2 hours but feel fully rested? 😴",
  "Lose all your photos 📸 OR all your contacts? 📱",
  "Be famous but broke 🌟 OR rich but completely anonymous 💰?",
  "Only be able to eat food from one country forever 🍜 OR never eat the same meal twice? 🔄",
  "Have your Google search history made public 😱 OR your text messages? 💬",
];

const DARES = [
  "Send a voice note doing your best impression of a robot. 🤖",
  "Text the 5th contact in your phone 'I need to tell you something important' and screenshot their reply. 📱",
  "Send a selfie making the most ridiculous face you can. 🤪",
  "Type your next 5 messages using only emojis. 🎭",
  "Change your WhatsApp status to 'I eat cereal with orange juice' for 1 hour. 🥣",
  "Reply to the last person who texted you with just 'noted' and nothing else. 📝",
  "Send a 10-second voice note singing 'Happy Birthday' to no one in particular. 🎂",
  "Set an alarm for a random time tonight and when it goes off, send a message here. ⏰",
  "Send your most used emoji 20 times in a row. Right now. ✉️",
  "Write a haiku about your current mood and share it. 📜",
  "Send a voice note explaining why your favourite food is overrated. 🍕",
  "Text 'you up?' to a family member and screenshot their reaction. 👨‍👩‍👧",
  "For the next 10 minutes, end every message with 'as the prophecy foretold'. 🔮",
  "Send a 5-second video of you dramatically pointing at something random. 👉",
  "Type out the lyrics to a song using only the first letter of each word and let others guess it. 🎵",
];

const RIZZ_LINES = [
  "Are you a charger? Because I've been looking for you all day. 🔌",
  "Do you believe in love at first scroll, or should I post again? 📱",
  "Are you a parking ticket? Because you've got 'fine' written all over you. 🎫",
  "I must be a snowflake, because I've fallen for you. ❄️",
  "Are you a bank loan? Because you have my interest. 💰",
  "Do you have a map? I keep getting lost in your contact list. 🗺️",
  "Are you a WiFi signal? Because I'm feeling a strong connection. 📶",
  "I'm not a photographer, but I can picture us together. 📸",
  "Are you Google? Because you have everything I've been searching for. 🔍",
  "Do you have a name, or can I call you mine? 😏",
  "Are you a keyboard? Because you're exactly my type. ⌨️",
  "I was going to say something clever, but then I saw you and forgot everything. 🤯",
  "Is your name Google Maps? Because I just found my destination. 📍",
  "Are you made of copper and tellurium? Because you're CuTe. 🧪",
  "I'd say 'God bless you' but it looks like He already did. 😇",
];

const HOROSCOPES = {
  aries:       "♈ ARIES: Mercury is in retrograde *specifically to annoy you*. A pigeon will stare at you judgmentally today. Lucky number: potato.",
  taurus:      "♉ TAURUS: The stars say you will open the fridge 6 times today looking for motivation. It won't be there. Buy snacks anyway.",
  gemini:      "♊ GEMINI: You will start 4 projects today and finish 0. The stars are not surprised. Your lucky colour is 'unread notification'.",
  cancer:      "♋ CANCER: Someone will use your charger without asking. The universe has logged this complaint. Response time: 7–10 business years.",
  leo:         "♌ LEO: You will dramatically misread a situation today and then replay it at 3am for the next 6 years. Sleep well.",
  virgo:       "♍ VIRGO: You will reorganise something that didn't need reorganising and feel great about it. This is your entire personality. Embrace it.",
  libra:       "♎ LIBRA: You will spend 45 minutes choosing what to watch and then rewatch something you've already seen. The stars expected nothing less.",
  scorpio:     "♏ SCORPIO: Someone will ask 'are you okay?' today. You will say 'yeah, fine.' This is false. Venus has filed a report.",
  sagittarius: "♐ SAGITTARIUS: You will make a plan, change the plan, and then wonder why nothing goes to plan. Jupiter is tired.",
  capricorn:   "♑ CAPRICORN: You will work hard today and then check your phone as a treat every 4 minutes. Productive. Mostly.",
  aquarius:    "♒ AQUARIUS: You will have a deeply profound thought in the shower and completely forget it by the time you get out. The cosmos shrugs.",
  pisces:      "♓ PISCES: You will daydream so hard today that someone will wave at you twice before you notice. A fish is involved somehow.",
};

const RPS_EMOJIS = { rock: '🪨', paper: '📄', scissors: '✂️' };
const RPS_OUTCOMES = {
  rock:     { rock: 'draw', paper: 'lose', scissors: 'win' },
  paper:    { rock: 'win',  paper: 'draw', scissors: 'lose' },
  scissors: { rock: 'lose', paper: 'win',  scissors: 'draw' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// ─── Commands ─────────────────────────────────────────────────────────────────

// 🔥 ROAST
bot(
  {
    pattern: 'roast',
    fromMe: false,
    desc: 'Get roasted! Reply to someone\'s message to roast them.',
    type: 'fun',
  },
  async (message) => {
    const roast = pick(ROASTS);
    const target = message.reply_message
      ? `@${message.reply_message.sender?.split('@')[0] || 'you'}: `
      : '';
    await message.send(
      `🔥 *ROASTED* 🔥\n\n${target}${roast}`,
      { quoted: message.quoted }
    );
  }
);

// 💛 COMPLIMENT
bot(
  {
    pattern: 'compliment',
    fromMe: false,
    desc: 'Get a wholesome compliment (or give one to a quoted person).',
    type: 'fun',
  },
  async (message) => {
    const compliment = pick(COMPLIMENTS);
    const target = message.reply_message
      ? `@${message.reply_message.sender?.split('@')[0] || 'you'}: `
      : '';
    await message.send(
      `💛 *COMPLIMENT* 💛\n\n${target}${compliment}`,
      { quoted: message.quoted }
    );
  }
);

// 🔮 MAGIC 8-BALL
bot(
  {
    pattern: '8ball ?(.*)',
    fromMe: false,
    desc: 'Ask the Magic 8-Ball a yes/no question.',
    type: 'fun',
  },
  async (message, match) => {
    if (!match || match.trim().length < 3) {
      return await message.send(
        '🔮 *Magic 8-Ball*\n\nAsk me a question!\nExample: `.8ball Will I be rich?`',
        { quoted: message.quoted }
      );
    }
    const answer = pick(EIGHT_BALL);
    await message.send(
      `🔮 *Magic 8-Ball*\n\n❓ ${match.trim()}\n\n${answer}`,
      { quoted: message.quoted }
    );
  }
);

// 🤔 WOULD YOU RATHER
bot(
  {
    pattern: 'wyr',
    fromMe: false,
    desc: 'Get a random "Would You Rather" question for the group.',
    type: 'fun',
  },
  async (message) => {
    const question = pick(WOULD_YOU_RATHER);
    await message.send(
      `🤔 *WOULD YOU RATHER...* 🤔\n\n${question}\n\n_Reply with your answer!_`,
      { quoted: message.quoted }
    );
  }
);

// 🎯 DARE
bot(
  {
    pattern: 'dare',
    fromMe: false,
    desc: 'Get a random dare challenge.',
    type: 'fun',
  },
  async (message) => {
    const dare = pick(DARES);
    await message.send(
      `🎯 *YOUR DARE* 🎯\n\n${dare}\n\n_Do you accept? 😏_`,
      { quoted: message.quoted }
    );
  }
);

// 😏 RIZZ
bot(
  {
    pattern: 'rizz',
    fromMe: false,
    desc: 'Generate a smooth rizz line.',
    type: 'fun',
  },
  async (message) => {
    const line = pick(RIZZ_LINES);
    await message.send(
      `😏 *RIZZ ACTIVATED* 😏\n\n${line}`,
      { quoted: message.quoted }
    );
  }
);

// 🌟 HOROSCOPE
bot(
  {
    pattern: 'horoscope ?(.*)',
    fromMe: false,
    desc: 'Get your (absurd) daily horoscope. Usage: .horoscope scorpio',
    type: 'fun',
  },
  async (message, match) => {
    if (!match || !match.trim()) {
      const signs = Object.keys(HOROSCOPES).join(' | ');
      return await message.send(
        `🌟 *HOROSCOPE*\n\nProvide your star sign!\nExample: \`.horoscope scorpio\`\n\n_Signs: ${signs}_`,
        { quoted: message.quoted }
      );
    }
    const sign = match.trim().toLowerCase();
    const reading = HOROSCOPES[sign];
    if (!reading) {
      return await message.send(
        `❓ Sign not found! Try one of:\n${Object.keys(HOROSCOPES).join(', ')}`,
        { quoted: message.quoted }
      );
    }
    await message.send(
      `🌟 *YOUR DAILY HOROSCOPE* 🌟\n\n${reading}\n\n_The stars have spoken. Good luck._`,
      { quoted: message.quoted }
    );
  }
);

// 🪨📄✂️ ROCK PAPER SCISSORS
bot(
  {
    pattern: 'rps ?(.*)',
    fromMe: false,
    desc: 'Play Rock Paper Scissors vs the bot. Usage: .rps rock',
    type: 'fun',
  },
  async (message, match) => {
    const choices = ['rock', 'paper', 'scissors'];
    const playerChoice = match?.trim().toLowerCase();

    if (!playerChoice || !choices.includes(playerChoice)) {
      return await message.send(
        `🪨📄✂️ *Rock Paper Scissors*\n\nUsage: \`.rps rock\` | \`.rps paper\` | \`.rps scissors\``,
        { quoted: message.quoted }
      );
    }

    const botChoice = pick(choices);
    const result = RPS_OUTCOMES[playerChoice][botChoice];

    const resultText = {
      win:  '🎉 *YOU WIN!* The bot weeps.',
      lose: '😈 *BOT WINS!* Try again loser.',
      draw: '🤝 *IT\'S A DRAW!* The universe is balanced.',
    }[result];

    await message.send(
      `🪨📄✂️ *Rock Paper Scissors*\n\n` +
      `You chose: ${RPS_EMOJIS[playerChoice]} *${playerChoice}*\n` +
      `Bot chose: ${RPS_EMOJIS[botChoice]} *${botChoice}*\n\n` +
      `${resultText}`,
      { quoted: message.quoted }
    );
  }
);

// 📋 FUNPACK HELP
bot(
  {
    pattern: 'funpack',
    fromMe: false,
    desc: 'Show all FunPack commands.',
    type: 'fun',
  },
  async (message) => {
    await message.send(
      `🎉 *FUNPACK COMMANDS* 🎉\n\n` +
      `🔥 \`.roast\` — Get roasted (reply to roast someone)\n` +
      `💛 \`.compliment\` — Wholesome pick-me-up\n` +
      `🔮 \`.8ball <question>\` — Magic 8-Ball\n` +
      `🤔 \`.wyr\` — Would You Rather?\n` +
      `🎯 \`.dare\` — Random dare\n` +
      `😏 \`.rizz\` — Smooth rizz line\n` +
      `🌟 \`.horoscope <sign>\` — Absurd horoscope\n` +
      `🪨 \`.rps <rock|paper|scissors>\` — vs Bot\n\n` +
      `_Powered by FunPack v1.0 🚀_`,
      { quoted: message.quoted }
    );
  }
);
