// Add, remove or edit questions here. Each line is one question with an A and a B option.
// Leave out "Would you rather", the game adds it on top.
// To add a new type, copy one of the blocks below and give it a new key and name.
// It will show up as an option on the setup screen automatically.

const CATEGORIES = {
  light: {
    name: "Coming soon",
    prompts: [
      { a: "be able to fly", b: "be invisible" },
      { a: "read minds", b: "see the future" },
    ],
  },

  crazy: {
    name: "Coming soon",
    prompts: [
      { a: "always be 10 minutes late", b: "always be 20 minutes early" },
      { a: "never drink coffee again", b: "never drink alcohol again" },
    ],
  },

  spicy: {
    name: "Coming soon",
    prompts: [
      { a: "have your search history made public", b: "have your texts made public" },
    ],
  },
};
