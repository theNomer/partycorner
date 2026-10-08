// Add, remove or edit questions here. Each line is one question.
// To add a new type, copy one of the blocks below and give it a new key and name.
// It will show up as an option on the setup screen automatically.

const CATEGORIES = {
  light: {
    name: "Light",
    truths: [
      "Who was your first crush?",
      "What's the weirdest thing you've ever eaten?",
      "What's your biggest fear?",
      "What's the most childish thing you still do?",
      "Have you ever pretended to be sick to skip something?",
      "What's the last thing you searched on your phone?",
      "Which person here would you swap lives with for a day?",
      "What's a song you secretly love but would never admit to?",
    ],
    dares: [
      "Do your best impression of someone in the room.",
      "Do 10 push-ups.",
      "Sing the chorus of the last song you listened to.",
      "Dance with no music for 30 seconds.",
      "Speak only in questions until your next turn.",
      "Let the person to your left style your hair.",
      "Tell a joke. If nobody laughs, do another one.",
      "Do your best runway walk across the room.",
    ],
  },

  crazy: {
    name: "Crazy",
    truths: [
      "What's the most embarrassing thing you've ever done?",
      "What's the worst lie you've ever told?",
      "What's the dumbest way you've ever hurt yourself?",
      "What's the craziest thing you've done on a night out?",
      "What's the strangest dream you've ever had?",
      "Have you ever been kicked out of somewhere? Why?",
      "What's the weirdest thing you've done when you were home alone?",
      "What's something illegal you've done (that you'll admit to)?",
    ],
    dares: [
      "Talk in an accent until your next turn.",
      "Quack like a duck after everything you say for one round.",
      "Let the group pick an emoji for you to text a friend.",
      "Show the last photo in your camera roll.",
      "Call a friend and sing them happy birthday, even if it's not their birthday.",
      "Let someone draw on your face with a pen.",
      "Post a story with a picture the group chooses.",
      "Eat a spoonful of a condiment the group picks.",
    ],
  },

  spicy: {
    name: "Spicy",
    truths: [
      "What's a secret you've never told anyone here?",
      "Who in this room would you most want to kiss?",
      "What's your biggest turn-on?",
      "What's the most daring place you've ever kissed someone?",
      "Have you ever had a crush on a friend's partner?",
      "What's the boldest pickup line you've ever used?",
      "What's your most embarrassing date story?",
      "Have you ever sent a text to the wrong person? What did it say?",
    ],
    dares: [
      "Give someone in the room a 30-second shoulder massage.",
      "Read the last message you sent out loud.",
      "Let the person to your right send one text from your phone.",
      "Whisper something flirty in the ear of the person to your left.",
      "Do your most seductive dance for 20 seconds.",
      "Swap a piece of clothing with someone in the room.",
      "Let the group read your last 5 search results.",
      "Give a compliment to every person in the room, the flirtier the better.",
    ],
  },
};
