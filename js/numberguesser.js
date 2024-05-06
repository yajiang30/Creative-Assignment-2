'use strict'

let gameActive = true;
let rangeMin = 0;
let rangeMax = 10;
let randomNum = randNum(rangeMin, rangeMax);
let numTries = 3;

window.addEventListener('load', init);

function init() {
  document.getElementById('guess-btn').addEventListener('click', guessNum);
  document.getElementById('user-input').addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
      guessNum();
    }
  });
  document.getElementById('restart-btn').addEventListener('click', restartGame);
}

function guessNum() {
  const outputText = document.getElementById('output-text');
  const num = Number(document.getElementById('user-input').value);
  document.getElementById('user-input').value = '';
  if (!gameActive) {
    outputText.textContent = 'Game is over! Click restart to play again.'
    return;
  }
  if (isNaN(num)) {
    outputText.textContent = `Invalid Guess. Enter a number between ${rangeMin}-${rangeMax}.`
    return;
  }
  numTries--;
  outputResult();

  function outputResult() {
    if (num === randomNum) {
      outputText.textContent = `You win! The number was ${randomNum}.`;
      gameActive = false;
    } else if (numTries <= 0) {
      outputText.textContent = `You lose! You ran out of guesses. The number was ${randomNum}`;
      gameActive = false;
    } else if (num >= randomNum) {
      outputText.textContent = `The number is lower than ${num}. ${numTries} guess remaining`;
    } else {
      outputText.textContent = `The number is higher than ${num}. ${numTries} guess remaining`;
    }
  }
}

function randNum(min, max) {
  const range = max - min;
  // returns a random integer between min and max (inclusive)
  return Math.floor(Math.random() * range) + min;
}

function restartGame() {
  gameActive = true;
  randomNum = randNum(0, 10);
  numTries = 3;
  document.getElementById('output-text').textContent = '';
  document.getElementById('user-input').value = '';
}