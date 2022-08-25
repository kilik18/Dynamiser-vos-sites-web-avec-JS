const newGame = document.getElementById("newGame");
const roll = document.getElementById("rollDice");
const hold = document.getElementById("hold");

const player1Dot = document.getElementById("reDot1");
const player2Dot = document.getElementById("redDot2");

let rollNumber;

const displayGlobalScore1 = document.getElementById("globalScore1");
const displayGlobalScore2 = document.getElementById("globalScore2");

const displayCurrentScore1 = document.getElementById("currentScore1");
const displayCurrentScore2 = document.getElementById("currentScore2");

let globalScore1 = 0;
let globalScore2 = 0;
let currentScore1 = 0;
let currentScore2 = 0;

displayGlobalScore1.textContent = 0;
displayGlobalScore2.textContent = 0;
displayCurrentScore1.textContent = 0;
displayCurrentScore2.textContent = 0;

let currentPlayer = 1;

function getNumber() {
  rollNumber = Math.floor(Math.random() * 6 + 1);
  console.log("Résultat du lancé : " + rollNumber);
  return rollNumber;
}

function diceFace() {
  let dice = document.getElementById("dice");
  dice.src = "./images/dice" + rollNumber + ".png";
}

function getCurrentScore1() {
  currentScore1 += rollNumber;
  displayCurrentScore1.textContent = currentScore1;
  console.log("Player 1 totalise sur ce round : " + currentScore1 + " points");
}

function getCurrentScore2() {
  currentScore2 += rollNumber;
  displayCurrentScore2.textContent = currentScore2;
  console.log("Player 2 totalise sur ce round : " + currentScore2 + " points");
}

function getGlobalScore1() {
  globalScore1 += currentScore1;
  displayGlobalScore1.textContent = globalScore1;
  currentScore1 = 0;
  displayCurrentScore1.textContent = currentScore1;
  redDot1.style.display = "none";
  redDot2.style.display = "block";
  currentPlayer = 2;
  if (globalScore1 >= 100) {
    currentPlayer = 1;
    congratulations1.textContent = "Good game!!!";
    displayCurrentScore1.textContent = 0;
    displayCurrentScore2.textContent = 0;
  }
}

function getGlobalScore2() {
  globalScore2 += currentScore2;
  displayGlobalScore2.textContent = globalScore2;
  currentScore2 = 0;
  displayCurrentScore2.textContent = currentScore2;
  redDot1.style.display = "block";
  redDot2.style.display = "none";
  currentPlayer = 1;
  if (globalScore2 >= 100) {
    currentPlayer = 2;
    congratulations2.textContent = "Good game!!!";
    displayCurrentScore1.textContent = 0;
    displayCurrentScore2.textContent = 0;
  }
}

newGame.addEventListener("click", function newGame() {
  displayGlobalScore1.textContent = 0;
  displayGlobalScore2.textContent = 0;
  displayCurrentScore1.textContent = 0;
  displayCurrentScore2.textContent = 0;
  congratulations1.textContent = "";
  congratulations2.textContent = "";
  globalScore1 = 0;
  globalScore2 = 0;
  currentScore1 = 0;
  currentScore2 = 0;
  currentPlayer = 1;
  dice.src = "./images/dice0.png";
  console.log("Nouvelle partie");
  redDot1.style.display = "block";
  redDot2.style.display = "none";
});

roll.addEventListener("click", () => {
  getNumber();
  diceFace();
  if (globalScore1 >= 100 || globalScore2 >= 100) {
    endGame();
  }
  if (rollNumber === 1) {
    if (currentPlayer === 1) {
      currentScore1 = 0;
      displayCurrentScore1.textContent = 0;
      redDot1.style.display = "none";
      redDot2.style.display = "block";
      currentPlayer = 2;
      console.log("C'est au tour du joueur 2 de jouer");
    } else if (currentPlayer === 2) {
      currentScore2 = 0;
      displayCurrentScore2.textContent = 0;
      redDot1.style.display = "block";
      redDot2.style.display = "none";
      currentPlayer = 1;
      console.log("C'est au tour du joueur 1 de jouer");
    }
  } else {
    if (currentPlayer === 1 && globalScore1 < 100 && globalScore2 < 100) {
      getCurrentScore1();
    } else if (
      currentPlayer === 2 &&
      globalScore1 < 100 &&
      globalScore2 < 100
    ) {
      getCurrentScore2();
    }
  }
});

hold.addEventListener("click", () => {
  if (globalScore1 >= 100 || globalScore2 >= 100) {
    endGame();
  }
  if (currentPlayer === 1 && globalScore1 < 100 && globalScore2 < 100) {
    getGlobalScore1();
    console.log(
      "Le joueur 1 décide de conserver son score. Au tour du joueur 2."
    );
  } else if (currentPlayer === 2 && globalScore1 < 100 && globalScore2 < 100) {
    getGlobalScore2();
    console.log(
      "Le joueur 2 décide de conserver son score. Au tour du joueur 1."
    );
  }
});
