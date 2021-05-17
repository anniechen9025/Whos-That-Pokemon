// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const rightScreen = document.querySelector('.right-container__screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const resetButton = document.querySelector('.reset-button');

// constants and variables
const TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];
let prevUrl = null;
let nextUrl = null;

// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

// function to get caughtPokemon from DB
const getPokemon = async () => {
  const response = await fetch('/api/pokedex/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    const listItem = document.createElement('div');
    listItem.innerText = data[i].pokemon_name;
    listItem.classList.add('list-item');
    rightScreen.appendChild(listItem);
    if (listItem) {
      listItem.addEventListener('click', handleListItemClick);
    }
  }
};

getPokemon();

const fetchPokeData = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      resetScreen();

      const dataTypes = data['types'];
      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
      if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide');
        pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
      } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
      }
      mainScreen.classList.add(dataFirstType['type']['name']);

      pokeName.textContent = capitalize(data['name']);
      pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
      pokeWeight.textContent = data['weight'];
      pokeHeight.textContent = data['height'];
      pokeFrontImage.src = data['sprites']['front_default'] || '';
      pokeBackImage.src = data['sprites']['back_default'] || '';
    });
};

const handleListItemClick = (e) => {
  if (!e.target) return;

  const listItem = e.target;
  if (!listItem.textContent) return;

  const id = listItem.textContent.split('.')[0];
  fetchPokeData(id);
};

const deleteFormHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/pokedex/delete', {
    method: 'DELETE',
  });

  if (response.ok) {
    alert(
      'You have successfully reset your pokedex. Refresh to see current PokeList'
    );
  } else {
    alert('Failed to reset');
  }
};

resetButton.addEventListener('click', (e) => {
  e.preventDefault();
  deleteFormHandler(e);
});
