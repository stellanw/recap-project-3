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

const startUrl = "https://rickandmortyapi.com/api/character/?";

async function fetchCharacters(url) {
  if (!url) {
   url = startUrl;
  } 
  const response = await fetch(url);
  const data = await response.json();
  maxPage = data.info.pages;
  nextUrl = data.info.next;
  prevUrl = data.info.prev;
  pagination.textContent = `${page}/${maxPage}`;
  await data.results.forEach((character) => {
    CharacterCard(character);
  });
  return data.results;
}
fetchCharacters();

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    cardContainer.innerHTML = "";
    page++;
    fetchCharacters(nextUrl);
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    cardContainer.innerHTML = "";
    page--;
    fetchCharacters(prevUrl);
  }
});

//searchBar

// searchBar.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const searchQuery = event.target.query.value;
//   const dataCharacters = await fetchCharacters();
//   hasCharacters(searchQuery, dataCharacters);
// });

// function hasCharacters(searchCharacter, dataCharacters) {
//   const searchCharacterLow = searchCharacter.toLowerCase();
//   const nameDataCharacter = dataCharacters.map((dataCharacter) => dataCharacter.name.toLowerCase())
//   const foundDataCharacter = nameDataCharacter.some(
//     (dataCharacter) => dataCharacter.includes(searchCharacterLow)
//   );
//   return foundDataCharacter;
// }

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchQuery = event.target.query.value.toLowerCase();
  cardContainer.innerHTML="";
  const searchURl =
    `${startUrl}name=${encodeURIComponent(searchQuery)}`;
    fetchCharacters(searchURl);
    return page = 1;
})