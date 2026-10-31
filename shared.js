// Opened straight from disk (file://) the browser won't turn "truth-or-dare/" into
// "truth-or-dare/index.html" like GitHub Pages does, so add it to folder links there.
// Online the links stay short.
if (location.protocol === "file:") {
  for (const link of document.querySelectorAll('a[href$="/"]')) {
    const href = link.getAttribute("href");
    if (!href.includes("://")) {
      link.setAttribute("href", href + "index.html");
    }
  }
}

// --- Prompt decks shared by all games ---

// Fisher-Yates shuffle: every order is equally likely
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Hands out prompts in random order. Nothing repeats until every prompt has been used,
// then it reshuffles, making sure the first prompt of the new round isn't the one just shown.
function makeDeck(list) {
  let deck = [];
  let last;
  return function draw() {
    if (deck.length === 0) {
      deck = shuffle(list);
      // The next prompt comes off the end, so swap it away if it's the one just shown
      if (deck.length > 1 && deck[deck.length - 1] === last) {
        [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
      }
    }
    last = deck.pop();
    return last;
  };
}
