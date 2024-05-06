// add a feature that after all the main body parts are drawn, ask if you want to draw the eyes, nose, ears, mouth
// guess word button
'use strict';

let animals = ['fish', 'dog', 'cat', 'bird', 'horse', 'tiger', 'wolf', 'bear', 'snake', 'turtle', 'giraffe', 'elephant',
                    'koala', 'sheep', 'deer', 'axolotl', 'capybara', 'frog', 'cheetah', 'panda', 'red panda', 'shark', 
                    'raccoon', 'sloth', 'gorilla', 'goat', 'leopard', 'narwhal', 'otter', 'hippo', 'ferret', 'donkey', 
                    'squirrel', 'hamster', 'platypus', 'hyena', 'octopus', 'rhinoceros', 'bat', 'camel', 'spider', 
                    'firefly', 'ant', 'anteater', 'centipede', 'labybug', 'worm', 'beetle', 'bee', 'mosquito'];
let objects = ['scissors', 'pencil', 'pen', 'bottle', 'book', 'spatula', 'pan', 'toy', 'phone', 'backpack', 'backet', 
                  'keys', 'flashlight', 'blanket', 'calendar', 'clock', 'hat', 'rock', 'paper', 'chair', 'tree'];
let school = ['desks', 'math', 'history', 'english', 'science', 'biology', 'chemistry', 'physics', 'lockers', 'bathroom', 
                'basketball', 'soccer', 'baseball', 'sports', 'kickball', 'book', 'paper', 'pencil', 'tests', 'quizzes']

const NUM_WRONG_GUESSES_ALLOWED = 11;
let gameActive = false;
let numWrongGuesses = 0;
let word = '';
let hiddenWordArray = [];
let guessedLetters = [];


window.addEventListener('load', init);

function init() {
  showModalStart();
  document.getElementById('animal-btn').addEventListener('click', initializeGame);
  document.getElementById('object-btn').addEventListener('click', initializeGame);
  document.getElementById('school-btn').addEventListener('click', initializeGame);
  document.getElementById('guess-btn').addEventListener('click', guessLetter);
  document.getElementById('guess-input').addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
      guessLetter();
    }
  });
  document.getElementById('play-again').addEventListener('click', showModalStart);
}

function initializeGame(event) {
  document.getElementById('start-modal').style.display = 'none';
  cleanUpBoard();
  gameActive = true;
  let list = getList(event.target.value);
  word = generateWord(list);
  hiddenWordArray = makeHiddenWordArray(word);
  updateGameStatus();

  function getList(str) {
    if (str === 'animals') {
      return animals;
    } else if (str === 'objects') {
      return objects;
    } else {
      return school;
    }
  }
}

function makeHiddenWordArray(word) {
  let wordArray = word.split('');
  let hiddenWordArray = [];
  for (let i = 0; i < wordArray.length; i++) {
    if (isLetter(wordArray[i])) {
      hiddenWordArray[i] = '_';
    } else {
      hiddenWordArray[i] = wordArray[i];
    }
  }
  return hiddenWordArray;
}

function cleanUpBoard() {
  gameActive = false;
  numWrongGuesses = 0;
  word = '';
  hiddenWordArray = [];
  guessedLetters = [];
  document.getElementById('wrong-guessed-letters').textContent = '';
  document.getElementById('output-text').textContent = '';
}

function generateWord(list) {
  let len = list.length;
  return list[Math.floor(Math.random() * len)];
}

function guessLetter() {
  const output = document.getElementById('output-text');
  if (!gameActive) { // checks to see if game is over
    output.textContent = 'Game is over. Choose another category to play again.';
    clearInput();
    return;
  }

  const guess = document.getElementById('guess-input').value;
  if (!isValidGuess(guess)) { // checks to see if guess is a valid guess
    output.textContent = 'Invalid guess. Choose a different letter.';
    clearInput();
    return;
  }

  guessedLetters.push(guess);

  if (!isLetterInWord(guess)) { // checks to see if guessed letter is in word
    updateWrongGuessesBox(guess);
    output.textContent = `Sorry, there is no ${guess}'s in the word.`;
    numWrongGuesses++;
    updateGameStatus();
    return;
  }

  // finally letter is in word
  updateHiddenWord(guess);
  const numGuessApperances = hiddenWordArray.filter(letter => (letter === guess)).length;
  output.textContent = `There's ${numGuessApperances} ${guess}'s in the word.`;
  updateGameStatus();
}

function clearInput() {
  document.getElementById('guess-input').value = '';
}

function isValidGuess(guess) {
// invalid guess if it is not a letter or if it is already guessed
  if (!isLetter(guess)) {
    return false;
  }
  guess = guess.toLowerCase();
  if (isGuessAlreadyGuessed(guess)) {
    return false;
  }
  return true;
}

function isLetter(guess) {
  return (guess.length === 1) && (guess.toLowerCase() != guess.toUpperCase());
}

function isGuessAlreadyGuessed(guess) {
  return guessedLetters.includes(guess);
}

function updateHiddenWord(guess) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      hiddenWordArray[i] = guess;
    }
  }
}

function isLetterInWord(guess) {
  return word.includes(guess);
}

function updateGameStatus() {
  updateHangmanImg();
  displayHiddenWord();
  outputGameResult();
  clearInput();
}

function updateHangmanImg() {
  let hangmanImg = document.getElementById('hangman-img');
  hangmanImg.src = `img/hangman-${numWrongGuesses}.png`;
  hangmanImg.alt = `hangman with ${numWrongGuesses} wrong guess`;
}

function displayHiddenWord() {
  let hiddenWordString = hiddenWordArray.join(' ');
  document.getElementById('hidden-word').textContent = hiddenWordString;
}

function outputGameResult() {
  if (numWrongGuesses == NUM_WRONG_GUESSES_ALLOWED) {
    gameActive = false;
    document.getElementById('result-text').textContent = 'You lose!';
    document.getElementById('output-text').textContent = `The word was ${word}.`;
    document.getElementsByClassName('modal-img')[0].src = 'img/thumb_down.jpeg';
    document.getElementsByClassName('modal-img')[0].alt = 'Vault boy giving the thumbs down from the game fall out';
    displayModal();
    return;
  }

  let hiddenWordString = hiddenWordArray.join('');
  if (hiddenWordString === word) {
    gameActive = false;
    document.getElementById('result-text').textContent = 'You win!';
    document.getElementById('output-text').textContent = `The word was ${word}.`;
    document.getElementsByClassName('modal-img')[0].src = 'img/thumb_up.jpg';
    document.getElementsByClassName('modal-img')[0].alt = 'Vault boy giving the thumbs up from the game fall out';
    displayModal();
    return;
  }
}

function updateWrongGuessesBox(guess) {
  document.getElementById('wrong-guessed-letters').textContent += `${guess} `;
}

// these functions taken from open source game, they display a window when game is finished
function showModalStart() {
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
