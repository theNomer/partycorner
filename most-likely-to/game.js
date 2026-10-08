const setup = document.getElementById("setup");
const play = document.getElementById("play");

const startButton = document.getElementById("start");
const categoryBox = document.getElementById("categories");
const allCategories = document.getElementById("all-categories");

const countdown = document.getElementById("countdown");
const countButton = document.getElementById("count");
const nextButton = document.getElementById("next");
const changeVibeButton = document.getElementById("change-vibe");

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
  const prompts = chosenCategories().flatMap((key) => CATEGORIES[key].prompts);
  drawPrompt = makeDeck(prompts);
  showPrompt();
});

// --- Game ---

let countdownTimer;

function showPrompt() {
  clearTimeout(countdownTimer);
  countdown.hidden = true;
  countButton.disabled = false;
  nextButton.disabled = false;
  changeVibeButton.disabled = false;
  document.getElementById("prompt-text").textContent = drawPrompt();
  show(play);
}

// Show one step of the countdown and replay its pop animation
function showCount(text, isPoint) {
  countdown.textContent = text;
  countdown.classList.toggle("point", isPoint);
  countdown.classList.remove("pop");
  void countdown.offsetWidth; // restart the animation
  countdown.classList.add("pop");
}

// 3, 2, 1, POINT! one second apart; buttons are locked until it's done
function runCountdown() {
  const steps = ["3", "2", "1", "POINT!"];
  countdown.hidden = false;
  countButton.disabled = true;
  nextButton.disabled = true;
  changeVibeButton.disabled = true;

  let i = 0;
  function step() {
    const isPoint = i === steps.length - 1;
    showCount(steps[i], isPoint);
    if (isPoint) {
      nextButton.disabled = false;
      changeVibeButton.disabled = false;
      countButton.disabled = false;
      return;
    }
    i++;
    countdownTimer = setTimeout(step, 1000);
  }
  step();
}

countButton.addEventListener("click", runCountdown);
nextButton.addEventListener("click", showPrompt);

changeVibeButton.addEventListener("click", () => {
  clearTimeout(countdownTimer);
  show(setup);
});
