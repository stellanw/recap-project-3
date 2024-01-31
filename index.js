import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

//fetch

const url = "https://rickandmortyapi.com/api/character";

async function fetchCharacters() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.results[0].name);
  data.results.forEach((character) => {
    CharacterCard(character);
  });
}

console.log(fetchCharacters());
