const wordBlank = document.querySelector('.word-blanks');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
const timerElement = document.querySelector('.timer-count');
const startButton = document.querySelector('.start-button');
const pokeListItems = document.querySelectorAll('.list-item');
const pokemonPic = document.querySelector('.pokemonPic');

let chosenWord = '';
let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;

// Arrays used to create blanks and letters on screen
let lettersInChosenWord = [];
let blanksLetters = [];

// Array of words the user will guess
const pokemonList = [];

// fetching 3rd party API
const fetchPokeList = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.pokemon_species.length; i++) {
        // let pokemonName = data.pokemon_species[i].name;
        let myPokemon = {
          name: data.pokemon_species[i].name,
          url: data.pokemon_species[i].url,
        };
        pokemonList.push(myPokemon);
      }
    });
};

//fetch URL
fetchPokeList('https://pokeapi.co/api/v2/generation/1');

// The init function is called when the page loads
function init() {
  getWins();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 30;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderBlanks();
  startTimer();
  pokemonPic.innerHTML = '';
}

// function to post caughtPokemon to DB
const updatePokemon = async (pokemon_name) => {
  if (pokemon_name) {
    console.log(pokemon_name);
    const response = await fetch('/api/pokedex/', {
      method: 'POST',
      body: JSON.stringify({ pokemon_name }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return;
    } else {
      alert('Failed to post pokemon.');
    }
  }
};

// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = 'YOU CAUGHT THE POKEMON';
  winCounter++;
  startButton.disabled = false;
  setWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = 'THE POKEMON GOT AWAY --- GAME OVER';
  startButton.disabled = false;
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Creates blanks on screen
function renderBlanks() {
  // Randomly picks word from words array
  chooseRandom = pokemonList[Math.floor(Math.random() * pokemonList.length)];
  console.log(chooseRandom);
  chosenWord = chooseRandom.name;
  const fetchPic = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${chosenWord}`)
      .then((res) => res.json())
      .then((data) => {
        const pic = document.createElement('img');
        pic.setAttribute('src', data.sprites.front_default);
        pokemonPic.appendChild(pic);
      });
  };
  lettersInChosenWord = chosenWord.split('');
  numBlanks = lettersInChosenWord.length;
  blanksLetters = [];
  // Uses loop to push blanks to blankLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push('_');
  }
  // Converts blankLetters array into a string and renders it on the screen
  wordBlank.textContent = blanksLetters.join(' ');
  fetchPic();
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem('winCount', winCounter);
  updatePokemon(chosenWord);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem('winCount');
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join('')) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(' ');
  }
}

// Attach event listener to document to listen for key event
document.addEventListener('keydown', function (event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789- '.split(
    ''
  );
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener('click', startGame);

// Calls init() so that it fires when page opened
init();
