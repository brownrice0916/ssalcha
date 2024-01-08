import { generateMovieCards } from './movie.js';
import { handleSearch } from './search.js';
let pageMode = 'intro';
export const setPageMode = (mode) => {
  pageMode = mode;
  const main = document.querySelector('.main');
  const noSearch = document.querySelector('.noSearch');
  if (pageMode === 'intro') {
    main.style.display = 'block';
    noSearch.style.display = 'none';
    reset();
  } else {
    main.style.display = 'none';
    noSearch.style.display = 'block';
  }
};

const reset = () => {
  const movieCards = document.querySelectorAll('.card');
  const searchInput = document.querySelector('.searchBox');
  searchInput.value = '';
  movieCards.forEach((card) => {
    card.style.display = 'block';
  });
};

const searchClickFunction = () => {
  const searchInput = document.querySelector('.searchBox');
  const searchIcon = document.querySelector('.searchIconWrap');
  document.addEventListener('click', function (event) {
    if (pageMode === 'intro') {
      if (event.target === searchIcon) {
        searchInput.classList.add('large');
      } else if (event.target !== searchIcon) {
        if (event.target !== searchInput) {
          searchInput.classList.remove('large');
        } else {
        }
      } else {
        searchInput.classList.remove('large');
      }
    }
  });
};

let addLogoClickEvent = () => {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    setPageMode('intro');
  });
};

generateMovieCards();
handleSearch();
searchClickFunction();
addLogoClickEvent();
