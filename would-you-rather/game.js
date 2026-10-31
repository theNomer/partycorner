const setup = document.getElementById("setup");
const play = document.getElementById("play");

const startButton = document.getElementById("start");
const categoryBox = document.getElementById("categories");
const allCategories = document.getElementById("all-categories");
const vibeInfo = document.getElementById("vibe-info");

// Show one section and hide the other
function show(section) {
  for (const s of [setup, play]) {
    s.hidden = s !== section;
  }
}

// Filled in when the game starts: one deck of options per chosen vibe
let vibeDecks = [];

// --- Setup: picking prompt types ---

// Add a chip for each type in prompts.js, before the "Give Me Crazy" chip.
// Each chip gets a chip-<key> class so it lights up in its vibe's colors when picked.
for (const [key, category] of Object.entries(CATEGORIES)) {
  const label = document.createElement("label");
  label.className = `chip chip-${key}`;
  label.innerHTML = `<input type="checkbox" value="${key}"><span>${category.name} ${category.emoji}</span>`;
  categoryBox.insertBefore(label, allCategories.parentElement);

  // Faded description of the vibe under the picker
  const info = document.createElement("p");
  info.textContent = `${category.emoji} ${category.name}: ${category.description}`;
  vibeInfo.append(info);
}

const categoryInputs = [...categoryBox.querySelectorAll("input[value]")];

function chosenCategories() {
  return categoryInputs.filter((input) => input.checked).map((input) => input.value);
}

// Need at least 1 prompt type to start
function updateStartButton() {
  startButton.disabled = chosenCategories().length === 0;
}

// "Give Me Crazy" turns every type on or off
allCategories.addEventListener("change", () => {
  for (const input of categoryInputs) {
    input.checked = allCategories.checked;
  }
  updateStartButton();
});

// Picking types one by one keeps "Give Me Crazy" in sync
for (const input of categoryInputs) {
  input.addEventListener("change", () => {
    allCategories.checked = categoryInputs.every((i) => i.checked);
    updateStartButton();
  });
}

startButton.addEventListener("click", () => {
  // A and B always come from the same vibe, so each vibe gets its own deck
  vibeDecks = chosenCategories()
    .map((key) => CATEGORIES[key].options)
    .filter((options) => options.length >= 2)
    .map((options) => ({ size: options.length, draw: makeDeck(options) }));
  showPrompt();
});

// --- Game ---

// Pick a vibe (bigger vibes come up more often), then two options from it.
// The deck never hands out the same option twice in a row, so A and B always differ.
function drawPair() {
  if (vibeDecks.length === 0) {
    return { a: "Questions coming soon.", b: "Questions coming soon." };
  }
  const total = vibeDecks.reduce((sum, deck) => sum + deck.size, 0);
  let roll = Math.random() * total;
  const deck = vibeDecks.find((d) => (roll -= d.size) < 0) || vibeDecks[vibeDecks.length - 1];
  return { a: deck.draw(), b: deck.draw() };
}

function showPrompt() {
  const pair = drawPair();
  document.getElementById("option-a").textContent = pair.a;
  document.getElementById("option-b").textContent = pair.b;
  show(play);
}

document.getElementById("next").addEventListener("click", showPrompt);

document.getElementById("change-vibe").addEventListener("click", () => {
  show(setup);
});
