const setup = document.getElementById("setup");
const play = document.getElementById("play");

const startButton = document.getElementById("start");
const categoryBox = document.getElementById("categories");
const allCategories = document.getElementById("all-categories");

// Show one section and hide the other
function show(section) {
  for (const s of [setup, play]) {
    s.hidden = s !== section;
  }
}

// Shuffled deck so prompts don't repeat until all have been used
function makeDeck(list) {
  let deck = [];
  return function draw() {
    if (deck.length === 0) {
      deck = [...list].sort(() => Math.random() - 0.5);
    }
    return deck.pop();
  };
}

// Filled in when the game starts, using the chosen prompt types
let drawPrompt;

// --- Setup: picking prompt types ---

// Add a chip for each type in prompts.js, before the "Give Me Crazy" chip.
// The types are "coming soon" for now, so they're disabled and only "Give Me Crazy" can be picked.
for (const [key, category] of Object.entries(CATEGORIES)) {
  const label = document.createElement("label");
  label.className = "chip";
  label.innerHTML = `<input type="checkbox" value="${key}" disabled><span>${category.name}</span>`;
  categoryBox.insertBefore(label, allCategories.parentElement);
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
  // Remember each prompt's type so it can be shown above the prompt
  const prompts = chosenCategories().flatMap((key) =>
    CATEGORIES[key].prompts.map((text) => ({ type: CATEGORIES[key].name, text }))
  );
  drawPrompt = makeDeck(prompts);
  showPrompt();
});

// --- Game ---

function showPrompt() {
  const prompt = drawPrompt();
  document.getElementById("prompt-type").textContent = prompt.type;
  document.getElementById("prompt-text").textContent = prompt.text;
  show(play);
}

document.getElementById("next").addEventListener("click", showPrompt);

document.getElementById("change-vibe").addEventListener("click", () => {
  show(setup);
});
