const movieDBURL="https://api.themoviedb.org/3";

const popularMovies=`/movie/popular?api_key=${APIKEY}&language=en-US&page=1`;
const firstSlide=document.getElementById("firstSlide");
const secondSlide=document.getElementById("secondSlide");
const thirdSlide=document.getElementById("thirdSlide");
const fourthSlide=document.getElementById("fourthSlide");
const sliders=document.querySelector(".carousel-box");
var scrollPerClick;
var ImagePadding=20;
let scrollAmount=0;


//sessionStorage.setItem("test","H3ll0 Fr13nd");
const getMovies= async() =>{   
    let response= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`)
    let data= await response.json()
    let popularMovies=data.results;

    firstSlide.setAttribute('src',`${imgURL}${popularMovies[0].backdrop_path}`);
    secondSlide.setAttribute('src',`${imgURL}${popularMovies[1].backdrop_path}`);
    thirdSlide.setAttribute('src',`${imgURL}${popularMovies[2].backdrop_path}`);
    fourthSlide.setAttribute('src',`${imgURL}${popularMovies[3].backdrop_path}`);

}



const getCarouselRowMovies=async()=>{
    let response= await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&language=en-US&page=1`)
    let data= await response.json()
    let trendingMovies=data.results;

    trendingMovies.map(function (cur,index){
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index} slider-img" src="${imgURL}${cur.poster_path}"/>` 
        )

    });

    scrollPerClick= document.querySelector(".img-1").clientWidth + ImagePadding;
}






getMovies();
getCarouselRowMovies();




const sliderScrollLeft=()=>{
    sliders.scrollTo({
        top:5,
        left:(scrollAmount-=scrollPerClick),
        behavior:"smooth"
    });

    if(scrollAmount<0){
        scrollAmount=0;
    }
}

const sliderScrollRight=()=>{    
    if(scrollAmount<=sliders.scrollWidth - sliders.clientWidth){
        sliders.scrollTo({
            top:5,
            left:(scrollAmount+=scrollPerClick),
            behavior:"smooth"
        });
    }
}




