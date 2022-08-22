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
