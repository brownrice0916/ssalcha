console.log("hi");

let searchIcon = document.querySelector(".searchIconWrap");
let searchBox = document.querySelector(".searchBox");

function closeSearchBox() {
  searchBox.style.display = "none";
}

document.addEventListener("click", function (event) {
  if (event.target === searchIcon) {
    searchBox.classList.add("large");
  } else if (event.target !== searchIcon) {
    if (event.target !== searchBox) {
      searchBox.classList.remove("large");
    } else {
    }
  } else {
    searchBox.classList.remove("large");
  }
});

searchBox.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    console.log("엔터침");
  }
});

let movieList;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmFhNmQ3OGMyZTE3YTI2YjYwZDcwOTkzMGViNDNjMiIsInN1YiI6IjY1OTNiM2NmMWNhYzhjNjQ0MTBjNWI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JIOacGXuT6LSQZhWNAMCDWkXHNu0nTlGotza_BqOk8M",
  },
};

let makeMovieList = (moviesWrap,movies) => {


  let originalCard = document.querySelector(".originalCard");
  movies.forEach((element) => {
    let copiedDiv = originalCard.cloneNode(true);
    console.log(element);
    copiedDiv.addEventListener("click",()=>{
      alert("영화 ID"+element.id);
    })
    let movieImg = "https://image.tmdb.org/t/p/w500" + element.poster_path;
    let cardTitle = copiedDiv.querySelector(".card-title");
    let cardImage = copiedDiv.querySelector(".card-img");
    let cardOverView = copiedDiv.querySelector(".overview");
    let cardRate = copiedDiv.querySelector(".rate");
    cardTitle.innerHTML = element.title;
    cardImage.src = movieImg;
    cardOverView.innerHTML = element.overview;
    cardRate.innerHTML = element.vote_average;

    moviesWrap.appendChild(copiedDiv);
  });
  originalCard.parentNode.removeChild(originalCard);
};





fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movieList = response.results;
    let rankedList = document.querySelector(".rankedList");
    makeMovieList(rankedList,movieList);
  })
  .catch((err) => console.error(err));


searchBox.addEventListener("input", function (event) {
  let inputValue = event.target.value;
  console.log("입력값", inputValue);
  let searchList = document.querySelector(".searchList");
searchList.innerHTML="";
  let intro = document.querySelector(".introPage");
  let section2 = document.querySelector(".section2")
  if (inputValue !== "") {
    //searchList.style.display = "flex";
    section2.style.display="block"
    intro.style.display = "none";
    let results = movieList.filter((movie)=>(movie.title.includes(inputValue)))
    console.log(results);
    if(results.length>0){
      let searchList = document.querySelector('.searchList')
      makeMovieList(searchList,results);
      noSearch.style.display="none";
    }else{
      searchList.innerHTML=""
      let noSearch = document.querySelector('.noSearch');
      noSearch.style.display="block";
    }
  }else{
    intro.style.display = "block";
    section2.style.display="none";
  }
});

