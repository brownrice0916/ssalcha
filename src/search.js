import { setPageMode } from './main.js';
export const handleSearch = () => {
  const searchInput = document.querySelector('.searchBox');
  searchInput.addEventListener('input', function (event) {
    let noSearch = document.querySelector('.noSearch');
    const movieCards = document.querySelectorAll('.card');
    let cardNum = 0;
    movieCards.forEach((card) => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const searchedValue = event.target.value.toLowerCase();
      if (title.includes(searchedValue)) {
        card.style.display = 'block';
        cardNum++;
      } else {
        card.style.display = 'none';
      }
    });
    if (searchInput.value) {
      setPageMode('search');
    } else {
      setPageMode('intro');
    }
    if (cardNum === 0) {
      noSearch.style.display = 'block';
    } else {
      noSearch.style.display = 'none';
    }
  });
};
