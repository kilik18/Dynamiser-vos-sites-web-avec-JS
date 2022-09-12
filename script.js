//All necessary buttons selection in dom
const newGame = document.getElementById("newGame");
const roll = document.getElementById("rollDice");
const hold = document.getElementById("hold");

//Congratulations
const congratulations1 = document.getElementById("congratulations1");
const congratulations2 = document.getElementById("congratulations2");

//Player selection
const player1Dot = document.getElementById("redDot1");
const player2Dot = document.getElementById("redDot2");

//RedDot initialization
redDot1.style.display = "block";
redDot2.style.display = "none";

//Roll score
let rollNumber;

//Select global score in dom
const displayGlobalScore1 = document.getElementById("globalScore1");
const displayGlobalScore2 = document.getElementById("globalScore2");

//Select current score in dom
const displayCurrentScore1 = document.getElementById("currentScore1");
const displayCurrentScore2 = document.getElementById("currentScore2");

//Variables initialization
let globalScore1 = 0;
let globalScore2 = 0;
let currentScore1 = 0;
let currentScore2 = 0;

//Score display initialization
displayGlobalScore1.textContent = 0;
displayGlobalScore2.textContent = 0;
displayCurrentScore1.textContent = 0;
displayCurrentScore2.textContent = 0;

//Variable for selecting players
let currentPlayer = 1;

//Function that return integer between 1 and 6
function getNumber() {
  rollNumber = Math.floor(Math.random() * 6 + 1);
  console.log("Résultat du lancé : " + rollNumber);
  return rollNumber;
}

//Function that display dice face according to rollnumber
function diceFace() {
  let dice = document.getElementById("dice");
  dice.src = "./images/dice" + rollNumber + ".png";
}

//Function add roll score to current for player1
function getCurrentScore1() {
  currentScore1 += rollNumber;
  displayCurrentScore1.textContent = currentScore1;
  console.log("Player 1 totalise sur ce round : " + currentScore1 + " points");
}

//Function add roll score to current for player2
function getCurrentScore2() {
  currentScore2 += rollNumber;
  displayCurrentScore2.textContent = currentScore2;
  console.log("Player 2 totalise sur ce round : " + currentScore2 + " points");
}

//Function add current to global score for player1
function getGlobalScore1() {
  globalScore1 += currentScore1;
  displayGlobalScore1.textContent = globalScore1;
  currentScore1 = 0;
  displayCurrentScore1.textContent = currentScore1;
  redDot1.style.display = "none";
  redDot2.style.display = "block";
  currentPlayer = 2;
  if (globalScore1 >= 100) {
    startAnimation();
    winSound();
    currentPlayer = 1;
    congratulations1.textContent = "Good game!!!";
    displayCurrentScore1.textContent = 0;
    displayCurrentScore2.textContent = 0;
  }
}

//Function add current to global score for player2
function getGlobalScore2() {
  globalScore2 += currentScore2;
  displayGlobalScore2.textContent = globalScore2;
  currentScore2 = 0;
  displayCurrentScore2.textContent = currentScore2;
  redDot1.style.display = "block";
  redDot2.style.display = "none";
  currentPlayer = 1;
  if (globalScore2 >= 100) {
    startAnimation();
    winSound();
    currentPlayer = 2;
    congratulations2.textContent = "Good game!!!";
    displayCurrentScore1.textContent = 0;
    displayCurrentScore2.textContent = 0;
  }
}

//ADD EVENT LISTENER
//Reset game when click on newGame button
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

//Send the dice when click on roll button
roll.addEventListener("click", () => {
  getNumber();
  diceFace();
  if (globalScore1 >= 100 || globalScore2 >= 100) {
    endGame();
  }
  if (rollNumber === 1) {
    resetCurrentScoreSound();
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
      rollDiceSound();
      getCurrentScore1();
    } else if (
      currentPlayer === 2 &&
      globalScore1 < 100 &&
      globalScore2 < 100
    ) {
      rollDiceSound();
      getCurrentScore2();
    }
  }
});

//keep score when click on hold button
hold.addEventListener("click", () => {
  if (globalScore1 >= 100 || globalScore2 >= 100) {
    endGame();
  }
  if (currentPlayer === 1 && globalScore1 < 100 && globalScore2 < 100) {
    holdCurrentScoreSound();
    getGlobalScore1();
    console.log(
      "Le joueur 1 décide de conserver son score. Au tour du joueur 2."
    );
  } else if (currentPlayer === 2 && globalScore1 < 100 && globalScore2 < 100) {
    holdCurrentScoreSound();
    getGlobalScore2();
    console.log(
      "Le joueur 2 décide de conserver son score. Au tour du joueur 1."
    );
  }
});

//End game function
function endGame() {
  displayCurrentScore1.textContent = 0;
  displayCurrentScore2.textContent = 0;
  rollNumber = 0;
  dice.src = "./images/dice0.png";
  alert("The game is over. Click on 'NEW GAME' to start a new one.");
  console.log("Appuyez sur le bouton NEW GAME pour recommencer une partie");
  startAnimation();
}

//Endgame animation function
function startAnimation() {
  newGame.animate(
    [
      {
        transform: "translateY(0px)",
      },
      {
        transform: "translateY(40px)",
      },
      {
        transform: "translateY(0px)",
      },
    ],
    {
      delay: 1000,
      duration: 3000,
      iterations: 1,
      easing: "cubic-bezier(0.2, 1.5, 0.58, 1)",
    }
  );
}

//Noises functions
function startNewGameSound() {
  var noise = new Audio();
  noise.src = "./audio/new-game.mp3";
  noise.play();
}

function rollDiceSound() {
  var noise = new Audio();
  noise.src = "./audio/roll-dice.mp3";
  noise.play();
}

function holdCurrentScoreSound() {
  var noise = new Audio();
  noise.src = "./audio/hold.mp3";
  noise.play();
}

function resetCurrentScoreSound() {
  var noise = new Audio();
  noise.src = "./audio/reset-current-score.mp3";
  noise.play();
}

function winSound() {
  var noise = new Audio();
  noise.src = "./audio/win.mp3";
  noise.play();
}
