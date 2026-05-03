const { bot } = require('../lib')

// ── Local string table (mirrors lang.plugins pattern without touching lang files) ──
const s = {
  roast: {
    desc: 'Get roasted. Reply to a message to roast that person.',
    result: '🔥 *ROASTED* 🔥\n\n{0}',
    targeted: '@{0}: {1}',
  },
  compliment: {
    desc: 'Get a wholesome compliment. Reply to give one to someone else.',
    result: '💛 *COMPLIMENT* 💛\n\n{0}',
    targeted: '@{0}: {1}',
  },
  eightball: {
    desc: 'Ask the Magic 8-Ball a yes/no question.',
    result: '🔮 *Magic 8-Ball*\n\n❓ {0}\n\n{1}',
    no_question: '🔮 *Magic 8-Ball*\nAsk me something!\nExample: `.8ball Will I be rich?`',
  },
  wyr: {
    desc: 'Post a random "Would You Rather" question for the group.',
    result: '🤔 *WOULD YOU RATHER...* 🤔\n\n{0}\n\n_Reply with your answer!_',
  },
  dare: {
    desc: 'Get a random dare challenge.',
    result: '🎯 *YOUR DARE* 🎯\n\n{0}\n\n_Do you accept? 😏_',
  },
  rizz: {
    desc: 'Generate a smooth rizz line.',
    result: '😏 *RIZZ ACTIVATED* 😏\n\n{0}',
  },
  horoscope: {
    desc: 'Get your (absurd) daily horoscope. Usage: .horoscope scorpio',
    result: '🌟 *YOUR DAILY HOROSCOPE* 🌟\n\n{0}\n\n_The stars have spoken. Good luck._',
    no_sign: '🌟 Provide your star sign!\nExample: `.horoscope scorpio`\n\n_Signs: {0}_',
    bad_sign: '❓ Sign not recognised! Try one of:\n{0}',
  },
  rps: {
    desc: 'Play Rock Paper Scissors vs the bot. Usage: .rps rock',
    usage: '🪨📄✂️ *Rock Paper Scissors*\n\nUsage: `.rps rock` | `.rps paper` | `.rps scissors`',
    result: '🪨📄✂️ *Rock Paper Scissors*\n\nYou: {0} *{1}*\nBot: {2} *{3}*\n\n{4}',
    win: '🎉 *YOU WIN!* The bot weeps.',
    lose: '😈 *BOT WINS!* Try again.',
    draw: '🤝 *DRAW!* The universe is balanced.',
  },
  funpack: {
    desc: 'Show all FunPack plugin commands.',
    menu:
      '🎉 *FUNPACK COMMANDS* 🎉\n\n' +
      '🔥 `.roast` — Get roasted (reply to roast someone)\n' +
      '💛 `.compliment` — Wholesome compliment\n' +
      '🔮 `.8ball <question>` — Magic 8-Ball\n' +
      '🤔 `.wyr` — Would You Rather?\n' +
      '🎯 `.dare` — Random dare\n' +
      '😏 `.rizz` — Smooth rizz line\n' +
      '🌟 `.horoscope <sign>` — Absurd horoscope\n' +
      '🪨 `.rps <rock|paper|scissors>` — vs Bot\n\n' +
      '_Powered by FunPack v1.0 🚀_',
  },
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ROASTS = [
  "You're the human equivalent of a participation trophy. 🏆",
  "I'd explain it to you but I left my crayons at home. 🖍️",
  "You have the charisma of a wet sock in a hurricane. 🧦",
  "Your Wi-Fi personality keeps dropping at the worst times. 📶",
  "You're like a software update — everyone ignores you and hopes you go away. 💻",
  "If laziness were a superpower, you'd still find a way to half-use it. 🦸",
  "You have the energy of a phone at 2% battery — barely functional, always dying. 🔋",
  "I've seen deeper thoughts in a fortune cookie. 🥠",
  "You're proof that even evolution takes a day off sometimes. 🐒",
  "Your cooking is the reason delivery apps exist. 🚗",
  "You're the human version of a T&Cs page — nobody reads you. 📜",
  "Your vibe is like a buffering video — everyone's waiting, nothing's loading. ⏳",
  "Even your shadow tries to keep its distance sometimes. 👤",
  "You're like a Monday — nobody asked for you but here you are. 📅",
  "You're not the dumbest person I've met, but let's hope they never leave town. 🌆",
]

const COMPLIMENTS = [
  "You make others feel like sunshine on a cloudy day. ☀️",
  "You have a genuinely beautiful mind — it really shows. 🌟",
  "You bring energy to a room that can't be faked. Keep doing that. ✨",
  "The world is measurably better with you in it. That's just a fact. 💫",
  "You're someone people feel lucky to know, even if they don't say it enough. 💛",
  "Your resilience is quietly inspiring. Seriously. 🌿",
  "You make hard things look easy and that takes real strength. 💪",
  "There's a warmth to you that people remember long after the conversation. 🔥",
  "Your sense of humour is genuinely hilarious. 😂",
  "You have the rare gift of making people feel heard. Don't underestimate that. 👂",
  "You're the main character and it's a good story. 📖",
  "Honestly? You're doing better than you think. A lot better. 🎯",
  "Your taste is immaculate and your standards are correct. Stand firm. 👑",
  "You're one of the good ones. The world needs more of you. 🌍",
]

const EIGHT_BALL = [
  '✅ It is certain.',
  '✅ It is decidedly so.',
  '✅ Without a doubt.',
  '✅ Yes, definitely.',
  '✅ You may rely on it.',
  '✅ As I see it, yes.',
  '✅ Most likely.',
  '✅ Outlook good.',
  '✅ Yes.',
  '✅ Signs point to yes.',
  '🔮 Reply hazy, try again.',
  '🔮 Ask again later.',
  '🔮 Better not tell you now.',
  '🔮 Cannot predict now.',
  '🔮 Concentrate and ask again.',
  "❌ Don't count on it.",
  '❌ My reply is no.',
  '❌ My sources say no.',
  '❌ Outlook not so good.',
  '❌ Very doubtful.',
]

const WOULD_YOU_RATHER = [
  'Fight 100 duck-sized horses 🐴 OR one horse-sized duck? 🦆',
  'Only be able to whisper 🤫 OR only be able to shout 📣 for the rest of your life?',
  'Have fingers as long as your legs 🖐️ OR legs as short as your fingers? 🦵',
  'Live in a world without music 🎵 OR without movies 🎬?',
  'Be able to speak every language 🗣️ OR play every instrument 🎸?',
  "Always have to say what you're thinking 💭 OR never be able to speak again?",
  'Be 10 minutes late to everything 🕐 OR 2 hours early to everything?',
  'Have unlimited battery on all devices 🔋 OR free Wi-Fi everywhere 📶?',
  'Have no eyebrows 😐 OR only one eyebrow? 🤨',
  'Be able to fly ✈️ but only at walking speed OR teleport 🌀 but only to new places?',
  'Lose all your photos 📸 OR all your contacts? 📱',
  'Be famous but broke 🌟 OR rich but completely anonymous 💰?',
  'Have your Google search history made public 😱 OR your text messages? 💬',
  'Only eat food from one country forever 🍜 OR never eat the same meal twice? 🔄',
  'Know the date of your death 💀 OR know the cause but not when?',
]

const DARES = [
  'Send a voice note doing your best robot impression. 🤖',
  'Text the 5th contact in your phone "I need to tell you something important" and share their reply. 📱',
  'Send a selfie making the most ridiculous face you can. 🤪',
  'Type your next 5 messages using only emojis. 🎭',
  'Change your WhatsApp status to "I eat cereal with orange juice" for 1 hour. 🥣',
  'Reply to the last person who texted you with just "noted" and nothing else. 📝',
  'Send a 10-second voice note singing Happy Birthday to no one in particular. 🎂',
  'Write a haiku about your current mood and share it here. 📜',
  'Send a voice note explaining why your favourite food is actually overrated. 🍕',
  'Text "you up?" to a family member and share their reaction. 👨‍👩‍👧',
  'For the next 10 minutes end every message with "as the prophecy foretold". 🔮',
  'Send a 5-second video dramatically pointing at something random. 👉',
  'Type song lyrics using only the first letter of each word and let others guess. 🎵',
  'Set an alarm for a random time tonight and message here when it goes off. ⏰',
  'Send your most used emoji 20 times in a row. Right now. ✉️',
]

const RIZZ_LINES = [
  "Are you a charger? Because I've been looking for you all day. 🔌",
  'Do you believe in love at first scroll, or should I post again? 📱',
  'Are you a parking ticket? Because you\'ve got "fine" written all over you. 🎫',
  "I must be a snowflake, because I've fallen for you. ❄️",
  'Are you a bank loan? Because you have my interest. 💰',
  "Are you Wi-Fi? Because I'm feeling a strong connection. 📶",
  "I'm not a photographer, but I can picture us together. 📸",
  "Are you Google? Because you have everything I've been searching for. 🔍",
  'Do you have a name, or can I call you mine? 😏',
  "Are you a keyboard? Because you're exactly my type. ⌨️",
  'I was going to say something clever but then I saw you and forgot everything. 🤯',
  "Is your name Google Maps? Because I just found my destination. 📍",
  "Are you made of copper and tellurium? Because you're CuTe. 🧪",
  'I\'d say "God bless you" but it looks like He already did. 😇',
  "Are you a campfire? Because you're hot and I want s'more. 🔥",
]

const HOROSCOPES = {
  aries:
    '♈ *ARIES:* Mercury is in retrograde *specifically to annoy you*. A pigeon will stare at you judgmentally today. Lucky number: potato.',
  taurus:
    "♉ *TAURUS:* The stars say you will open the fridge 6 times today looking for motivation. It won't be there. Buy snacks anyway.",
  gemini:
    '♊ *GEMINI:* You will start 4 projects today and finish 0. The stars are not surprised. Your lucky colour is "unread notification".',
  cancer:
    "♋ *CANCER:* Someone will use your charger without asking. The universe has logged this complaint. Response time: 7–10 business years.",
  leo:
    '♌ *LEO:* You will dramatically misread a situation today and replay it at 3am for the next 6 years. Sleep well.',
  virgo:
    "♍ *VIRGO:* You will reorganise something that didn't need reorganising and feel great about it. This is your entire personality.",
  libra:
    "♎ *LIBRA:* You will spend 45 minutes choosing what to watch and then rewatch something you've already seen. The stars expected nothing less.",
  scorpio:
    '♏ *SCORPIO:* Someone will ask "are you okay?" today. You will say "yeah, fine." This is false. Venus has filed a report.',
  sagittarius:
    "♐ *SAGITTARIUS:* You will make a plan, change the plan, then wonder why nothing goes to plan. Jupiter is tired.",
  capricorn:
    '♑ *CAPRICORN:* You will work hard today and check your phone as a treat every 4 minutes. Productive. Mostly.',
  aquarius:
    '♒ *AQUARIUS:* You will have a deeply profound thought in the shower and forget it completely by the time you get out. The cosmos shrugs.',
  pisces:
    '♓ *PISCES:* You will daydream so hard someone will wave at you twice before you notice. A fish is involved somehow.',
}

const RPS_EMOJI = { rock: '🪨', paper: '📄', scissors: '✂️' }
const RPS_RESULT = {
  rock:     { rock: 'draw', paper: 'lose', scissors: 'win' },
  paper:    { rock: 'win',  paper: 'draw', scissors: 'lose' },
  scissors: { rock: 'lose', paper: 'win',  scissors: 'draw' },
}

// ── Helper ────────────────────────────────────────────────────────────────────

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

// ── Commands ──────────────────────────────────────────────────────────────────

bot(
  {
    pattern: 'roast',
    fromMe: false,
    desc: s.roast.desc,
    type: 'fun',
  },
  async (message) => {
    const line = pick(ROASTS)
    const sender = message.reply_message?.sender?.split('@')[0]
    const body = sender
      ? s.roast.targeted.replace('{0}', sender).replace('{1}', line)
      : line
    await message.send(s.roast.result.replace('{0}', body), { quoted: message.quoted })
  }
)

bot(
  {
    pattern: 'compliment',
    fromMe: false,
    desc: s.compliment.desc,
    type: 'fun',
  },
  async (message) => {
    const line = pick(COMPLIMENTS)
    const sender = message.reply_message?.sender?.split('@')[0]
    const body = sender
      ? s.compliment.targeted.replace('{0}', sender).replace('{1}', line)
      : line
    await message.send(s.compliment.result.replace('{0}', body), { quoted: message.quoted })
  }
)

bot(
  {
    pattern: '8ball ?(.*)',
    fromMe: false,
    desc: s.eightball.desc,
    type: 'fun',
  },
  async (message, match) => {
    const question = match.trim()
    if (!question || question.length < 3) {
      return message.send(s.eightball.no_question, { quoted: message.quoted })
    }
    await message.send(
      s.eightball.result.replace('{0}', question).replace('{1}', pick(EIGHT_BALL)),
      { quoted: message.quoted }
    )
  }
)

bot(
  {
    pattern: 'wyr',
    fromMe: false,
    desc: s.wyr.desc,
    type: 'fun',
  },
  async (message) => {
    await message.send(s.wyr.result.replace('{0}', pick(WOULD_YOU_RATHER)), { quoted: message.quoted })
  }
)

bot(
  {
    pattern: 'dare',
    fromMe: false,
    desc: s.dare.desc,
    type: 'fun',
  },
  async (message) => {
    await message.send(s.dare.result.replace('{0}', pick(DARES)), { quoted: message.quoted })
  }
)

bot(
  {
    pattern: 'rizz',
    fromMe: false,
    desc: s.rizz.desc,
    type: 'fun',
  },
  async (message) => {
    await message.send(s.rizz.result.replace('{0}', pick(RIZZ_LINES)), { quoted: message.quoted })
  }
)

bot(
  {
    pattern: 'horoscope ?(.*)',
    fromMe: false,
    desc: s.horoscope.desc,
    type: 'fun',
  },
  async (message, match) => {
    const signs = Object.keys(HOROSCOPES)
    const sign = match.trim().toLowerCase()

    if (!sign) {
      return message.send(
        s.horoscope.no_sign.replace('{0}', signs.join(' | ')),
        { quoted: message.quoted }
      )
    }
    if (!HOROSCOPES[sign]) {
      return message.send(
        s.horoscope.bad_sign.replace('{0}', signs.join(', ')),
        { quoted: message.quoted }
      )
    }
    await message.send(
      s.horoscope.result.replace('{0}', HOROSCOPES[sign]),
      { quoted: message.quoted }
    )
  }
)

bot(
  {
    pattern: 'rps ?(.*)',
    fromMe: false,
    desc: s.rps.desc,
    type: 'fun',
  },
  async (message, match) => {
    const choices = ['rock', 'paper', 'scissors']
    const playerChoice = match.trim().toLowerCase()

    if (!playerChoice || !choices.includes(playerChoice)) {
      return message.send(s.rps.usage, { quoted: message.quoted })
    }

    const botChoice = pick(choices)
    const outcome = RPS_RESULT[playerChoice][botChoice]

    await message.send(
      s.rps.result
        .replace('{0}', RPS_EMOJI[playerChoice])
        .replace('{1}', playerChoice)
        .replace('{2}', RPS_EMOJI[botChoice])
        .replace('{3}', botChoice)
        .replace('{4}', s.rps[outcome]),
      { quoted: message.quoted }
    )
  }
)

bot(
  {
    pattern: 'funpack',
    fromMe: false,
    desc: s.funpack.desc,
    type: 'fun',
  },
  async (message) => {
    await message.send(s.funpack.menu, { quoted: message.quoted })
  }
)
