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
let maxPage = 1;
let page = 1;
const searchQuery = "";

let nextUrl = null;
let prevUrl = null;
//fetch

async function fetchCharacters(page) {
  const url = "https://rickandmortyapi.com/api/character?page=" + page;
  // const url = url;
  if (!page) {
    page = 1;
  }
  const response = await fetch(url);
  const data = await response.json();
  maxPage = data.info.pages;

  nextUrl = data.info.next;
  prevUrl = data.info.prev;

  // console.log(nextUrl)
  // console.log(data)
  pagination.textContent = page + " / " + maxPage;
  await data.results.forEach((character) => {
    CharacterCard(character);
  });
  return data.results;
}
fetchCharacters();

nextButton.addEventListener("click", () => {
  if (nextUrl) {
    page++;
    cardContainer.innerHTML = "";
    fetchCharacters(page);
  }
});
prevButton.addEventListener("click", () => {
  if (prevUrl) {
    page--;
    cardContainer.innerHTML = "";
    fetchCharacters(page);
  }
});

//searchBar

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchQuery = event.target.query.value;
  const dataCharacters = await fetchCharacters();
  hasCharacters(searchQuery, dataCharacters);
});

function hasCharacters(searchCharacter, dataCharacters) {
  const searchCharacterLow = searchCharacter.toLowerCase();
  console.log(searchCharacterLow);
  console.log(dataCharacters.name);
  const foundDataCharacter = dataCharacters.find(
    (dataCharacter) => dataCharacter.name.toLowerCase() === searchCharacterLow
  );
  console.log(foundDataCharacter);
  return foundDataCharacter;
}
