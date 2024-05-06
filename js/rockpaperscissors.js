'use strict'

const WINNING_COUNT = 3;
let gameActive = true;
let playerWins = 0;
let computerWins = 0;
let difficulty;

window.addEventListener('load', init);

function init() {
  showModalStart();
  document.getElementById('normal-btn').addEventListener('click', setDifficulty);
  document.getElementById('impossible-btn').addEventListener('click', setDifficulty);
  document.getElementById('rock').addEventListener('click', playMove);
  document.getElementById('paper').addEventListener('click', playMove);
  document.getElementById('scissors').addEventListener('click', playMove);
  document.getElementById('play-again').addEventListener('click', showModalStart);
  document.getElementById('rematch-btn').addEventListener('click', showModalStart);
}

function restartGame() {
  gameActive = true;
  playerWins = 0;
  computerWins = 0;
  document.getElementById('player-win-count').textContent = playerWins;
  document.getElementById('computer-win-count').textContent = computerWins;
  document.getElementById('output-text').textContent = '';
}

function playMove(event) {
  const results = document.getElementById('results');
  if (!gameActive) {
    results.textContent = 'Game has ended! Press rematch to play again!';
    return;
  }
  const playerMove = event.target.id;
  const computerMove = getComputerMove(playerMove);
  if (playerMove === computerMove) {
    results.textContent = `Draw! Computer also played ${computerMove}.`;
  } else if (isPlayerVictorious(playerMove, computerMove)) {
    updateCount('player');
    document.getElementById('results').textContent = `Computer played ${computerMove}. Player wins this round.`;
  } else {
    updateCount('computer');
    document.getElementById('results').textContent = `Computer played ${computerMove}. Computer wins this round.`;
  }
  updateGameStatus();
}

function getComputerMove(playerMove) {
  if (difficulty === 'normal') {
    return randomComputerMove();
  } else {
    return cheatingComputerMove(playerMove);
  }
}

function isPlayerVictorious(playerMove, computerMove) {
  // all ways that player wins
  return (playerMove === 'rock' && computerMove === 'scissors') || 
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper');
}

function updateCount(user) {
  if (user === 'player') {
    playerWins++;
    document.getElementById('player-win-count').textContent = playerWins;
  } else {
    computerWins++;
    document.getElementById('computer-win-count').textContent = computerWins;
  }
}

function updateGameStatus() {
  if ((playerWins === WINNING_COUNT)) {
    gameActive = false;
    document.getElementById('result-text').textContent = 'You win!';
    document.getElementById('output-text').textContent = 'Player won the best of 5!';
    document.getElementsByClassName('modal-img')[0].src = 'img/thumb_up.jpg';
    document.getElementsByClassName('modal-img')[0].alt = 'Vault boy giving the thumbs up from the game fall out';
    displayModal();
  } else if (computerWins === WINNING_COUNT) {
    gameActive = false;
    document.getElementById('result-text').textContent = 'You lose!';
    document.getElementById('output-text').textContent = 'Computer won the best of 5!';
    document.getElementsByClassName('modal-img')[0].src = 'img/thumb_down.jpeg';
    document.getElementsByClassName('modal-img')[0].alt = 'Vault boy giving the thumbs down from the game fall out';
    displayModal();
  } // else, no one won yet
}

function randomComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
}

function cheatingComputerMove(playerMove) {
  if (playerMove === 'rock') {
    return 'paper';
  } else if (playerMove === 'paper') {
    return 'scissors';
  } else {
    return 'rock';
  }
}

// these functions taken from open source game, they display a window when game is finished
function showModalStart() {
  restartGame();
  document.getElementById('modal').style.display = 'none';
  document.getElementById('start-modal').style.display = 'block';
}

function displayModal() {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';
  modalClose.onclick = function () {
    modal.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function setDifficulty(event) {
  difficulty = event.target.value;
  document.getElementById('start-modal').style.display = 'none';
}