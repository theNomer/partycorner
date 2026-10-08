const players = [];
let turn = 0;

const setup = document.getElementById("setup");
const choose = document.getElementById("choose");
const question = document.getElementById("question");

const nameInput = document.getElementById("player-name");
const playerList = document.getElementById("player-list");
const startButton = document.getElementById("start");
const categoryBox = document.getElementById("categories");
const allCategories = document.getElementById("all-categories");

// Show one section and hide the others
function show(section) {
  for (const s of [setup, choose, question]) {
    s.hidden = s !== section;
  }
}

// Shuffled decks so questions don't repeat until all have been used
function makeDeck(list) {
  let deck = [];
  return function draw() {
    if (deck.length === 0) {
      deck = [...list].sort(() => Math.random() - 0.5);
    }
    return deck.pop();
  };
}

// Filled in when the game starts, using the chosen question types
let drawTruth;
let drawDare;

// --- Setup: adding and removing players ---

function renderPlayers() {
  playerList.innerHTML = "";
  players.forEach((name, i) => {
    const li = document.createElement("li");
    li.textContent = name;

    const remove = document.createElement("button");
    remove.textContent = "✕";
    remove.className = "remove";
    remove.addEventListener("click", () => {
      players.splice(i, 1);
      renderPlayers();
    });

    li.append(remove);
    playerList.append(li);
  });
  updateStartButton();
}

// Need at least 2 players and 1 question type to start
function updateStartButton() {
  startButton.disabled = players.length < 2 || chosenCategories().length === 0;
}

document.getElementById("add-player").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name) {
    players.push(name);
    renderPlayers();
  }
  nameInput.value = "";
  nameInput.focus();
});

// --- Setup: picking question types ---

// Add a chip for each type in questions.js, before the "Give Me Crazy" chip.
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
  const chosen = chosenCategories().map((key) => CATEGORIES[key]);
  drawTruth = makeDeck(chosen.flatMap((c) => c.truths));
  drawDare = makeDeck(chosen.flatMap((c) => c.dares));
  turn = 0;
  showTurn();
});

// --- Game ---

function showTurn() {
  document.getElementById("current-player").textContent = players[turn];
  show(choose);
}

function showQuestion(type, text) {
  document.getElementById("question-type").textContent = `${players[turn]} — ${type}`;
  document.getElementById("question-text").textContent = text;
  show(question);
}

document.getElementById("truth").addEventListener("click", () => {
  showQuestion("Truth", drawTruth());
});

document.getElementById("dare").addEventListener("click", () => {
  showQuestion("Dare", drawDare());
});

document.getElementById("next").addEventListener("click", () => {
  turn = (turn + 1) % players.length;
  showTurn();
});
