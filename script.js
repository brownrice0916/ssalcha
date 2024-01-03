//돋보기버튼에 클릭 이벤트 추가
let searchIcon = document.querySelector('.searchIconWrap')
let searchInput = document.querySelector('.searchBox')

let searchClickFunction = (searchIcon, searchInput) => {
  document.addEventListener('click', function (event) {
    if (event.target === searchIcon) {
      searchInput.classList.add('large')
    } else if (event.target !== searchIcon) {
      if (event.target !== searchInput) {
        searchInput.classList.remove('large')
      } else {
      }
    } else {
      searchInput.classList.remove('large')
    }
  })
}

let searchEnterFunction = (searchInput) => {
  searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      console.log('엔터쳤을 때도 되게 하려고')
    }
  })
}

//영화 리스트 리턴할 함수

let movieList

let getMovieList = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmFhNmQ3OGMyZTE3YTI2YjYwZDcwOTkzMGViNDNjMiIsInN1YiI6IjY1OTNiM2NmMWNhYzhjNjQ0MTBjNWI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JIOacGXuT6LSQZhWNAMCDWkXHNu0nTlGotza_BqOk8M',
    },
  }

  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .then((response) => {
      ///받아온 결과를 저장
      movieList = response.results
      let rankedList = document.querySelector('.rankedList')
      makeMovieList(rankedList, movieList)
    })
    .catch((err) => console.error(err))
}

//영화 리스트 만들기
let makeMovieList = (moviesWrap, movies, search) => {
  //dom에서 복제할 카드를 선택
  let originalCard = document.querySelector('.cardWrap')
  //forEach문으로 동적 카드 생성
  movies.forEach((element) => {
    let copiedDiv = originalCard.cloneNode(true)
    copiedDiv.addEventListener('click', () => {
      alert('영화 ID' + element.id)
    })
    let movieImg = 'https://image.tmdb.org/t/p/w500' + element.poster_path
    let cardTitle = copiedDiv.querySelector('.card-title')
    let cardImage = copiedDiv.querySelector('.card-img')
    let cardOverView = copiedDiv.querySelector('.overview')
    let cardRate = copiedDiv.querySelector('.rate')
    cardTitle.innerHTML = element.title
    cardImage.src = movieImg
    cardOverView.innerHTML = element.overview
    cardRate.innerHTML = element.vote_average
    moviesWrap.appendChild(copiedDiv)
  })
  if (search !== true) {
    //검색 결과에서 재사용하기 위해 조건을 추가했다.
    originalCard.parentNode.removeChild(originalCard)
  }
}

let addInputFunction = () => {
  searchInput.addEventListener('input', function (event) {
    let inputValue = event.target.value
    let searchList = document.querySelector('.searchList')
    searchList.innerHTML = ''
    let intro = document.querySelector('.introPage')
    let searchPage = document.querySelector('.searchPage')
    let noSearch = document.querySelector('.noSearch')

    //검색창에 무언가 입력했을 때
    if (inputValue !== '') {
      searchPage.style.display = 'block' //검색페이지 보여주고
      intro.style.display = 'none' //인트로는 닫는다
      //새로운 영화 배열을 만들기 위해 기존의 것을 복사함
      let newMovieResult = movieList.map((map) => map)

      //필터함수를 사용해 검색한 문자가 영화 제목에 포함되어 있는 배열만 뽑아낸다.
      let results = newMovieResult.filter((movie) =>
        movie.title.toUpperCase().includes(inputValue.toUpperCase())
      )
      //배열이 0보다 크면 영화를 만들어서 보여주고
      if (results.length > 0) {
        makeMovieList(searchList, results, true)
        noSearch.style.display = 'none'
        //아닐 경우 결과없음을 나타낸다.
      } else {
        searchList.innerHTML = ''
        noSearch.style.display = 'block'
      }
      //검색창에 아무것도 입력하지 않았을 때
    } else {
      intro.style.display = 'block'
      searchPage.style.display = 'none'
    }
  })
}

getMovieList()
searchClickFunction(searchIcon, searchInput)
addInputFunction()
