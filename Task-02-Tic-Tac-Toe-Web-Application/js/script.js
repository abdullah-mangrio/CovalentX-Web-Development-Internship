const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");

const modeButtons = document.querySelectorAll(".mode-btn");
const oLabel = document.getElementById("oLabel");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let gameMode = "pvp";

let xScore = 0;
let oScore = 0;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

modeButtons.forEach(button => {
  button.addEventListener("click", () => {

    modeButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    gameMode = button.dataset.mode;

    oLabel.textContent =
      gameMode === "ai" ? "AI Opponent" : "Player O";

    resetBoard();
  });
});

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {

  const cell = e.target;
  const index = cell.dataset.index;

  if(board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if(checkWinner()) return;

  if(checkDraw()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  if(gameMode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index, player) {

  board[index] = player;

  cells[index].textContent = player;

  cells[index].classList.add(
    player.toLowerCase()
  );
}

function aiMove() {

  if(!gameActive) return;

  const available = board
    .map((value, index) => value === "" ? index : null)
    .filter(v => v !== null);

  if(available.length === 0) return;

  const randomIndex =
    available[Math.floor(Math.random() * available.length)];

  makeMove(randomIndex, "O");

  if(checkWinner()) return;

  if(checkDraw()) return;

  currentPlayer = "X";

  statusText.textContent = "Player X's Turn";
}

function checkWinner() {

  for(const combo of winningCombinations) {

    const [a,b,c] = combo;

    if(
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      gameActive = false;

      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      if(board[a] === "X") {
        xScore++;
        xScoreEl.textContent = xScore;
      } else {
        oScore++;
        oScoreEl.textContent = oScore;
      }

      statusText.textContent =
        `${board[a]} Wins! 🎉`;

      return true;
    }
  }

  return false;
}

function checkDraw() {

  if(!board.includes("")) {

    gameActive = false;

    statusText.textContent =
      "It's a Draw 🤝";

    return true;
  }

  return false;
}

function resetBoard() {

  board = ["","","","","","","","",""];

  currentPlayer = "X";

  gameActive = true;

  statusText.textContent =
    "Player X's Turn";

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove(
      "x",
      "o",
      "win"
    );
  });
}

resetBtn.addEventListener("click", resetBoard);

newGameBtn.addEventListener("click", () => {

  xScore = 0;
  oScore = 0;

  xScoreEl.textContent = 0;
  oScoreEl.textContent = 0;

  resetBoard();
});
