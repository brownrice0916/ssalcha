export const generateMovieCards = async () => {
  const fetchMovieData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmFhNmQ3OGMyZTE3YTI2YjYwZDcwOTkzMGViNDNjMiIsInN1YiI6IjY1OTNiM2NmMWNhYzhjNjQ0MTBjNWI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JIOacGXuT6LSQZhWNAMCDWkXHNu0nTlGotza_BqOk8M',
      },
    };
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options
    );
    const data = await response.json();

    return data.results;
  };

  const movies = await fetchMovieData();

  const cardList = document.querySelector('.rankedList');

  cardList.innerHTML = movies
    .map(
      (movie) =>
        `<li class="card" id=${movie.id}>
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              class="card-img"
              alt="..."
            />
            <div class="card-img-overlay">
              <h5 class="card-title">${movie.title}</h5>
              <div class="cardTextWrap">
                <p class="card-text overview">
                 ${movie.overview}
                </p>
                <div class="rateWrap">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                      />
                    </svg>
                    :&nbsp;
                  </span>
                  <p class="card-text rate">${movie.vote_average}</p>
                </div>
              </div>
            </div>
          </li>`
    )
    .join('');

  const handleClickCard = ({ target }) => {
    if (target === cardList) return;

    if (target.matches('.card')) {
      alert(`영화 id : ${target.id}`);
    } else {
      alert(`영화 id:${target.parentNode.id}`);
    }
  };

  cardList.addEventListener('click', handleClickCard);
};
