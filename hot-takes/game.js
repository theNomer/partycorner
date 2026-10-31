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

// Filled in when the game starts, using the chosen prompt types
let drawPrompt;

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
  const prompts = chosenCategories().flatMap((key) => CATEGORIES[key].prompts);
  // Vibes without prompts yet show a placeholder instead of a blank screen
  drawPrompt = makeDeck(prompts.length > 0 ? prompts : ["Questions coming soon."]);
  showPrompt();
});

// --- Game ---

function showPrompt() {
  document.getElementById("prompt-text").textContent = drawPrompt();
  show(play);
}

document.getElementById("next").addEventListener("click", showPrompt);

document.getElementById("change-vibe").addEventListener("click", () => {
  show(setup);
});
