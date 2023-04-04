const movieDBURL="https://api.themoviedb.org/3";

const popularMovies=`/movie/popular?api_key=${APIKEY}&language=en-US&page=1`;
const firstSlide=document.getElementById("firstSlide");
const secondSlide=document.getElementById("secondSlide");
const thirdSlide=document.getElementById("thirdSlide");
const fourthSlide=document.getElementById("fourthSlide");


//sessionStorage.setItem("test","H3ll0 Fr13nd");
const getMovies= async() =>{   
    let response= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7aa8b83794a6309507a808a916506d1b&language=en-US&page=1`)
    let data= await response.json()
    let popularMovies=data.results;

    firstSlide.setAttribute('src',`${imgURL}${popularMovies[0].backdrop_path}`);
    secondSlide.setAttribute('src',`${imgURL}${popularMovies[1].backdrop_path}`);
    thirdSlide.setAttribute('src',`${imgURL}${popularMovies[2].backdrop_path}`);
    fourthSlide.setAttribute('src',`${imgURL}${popularMovies[3].backdrop_path}`);

}

getMovies();








