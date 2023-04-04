const movieSelected=sessionStorage.getItem("movieSelectedID");
const cardTitle=document.getElementById("card-movie-title");
const cardImg=document.getElementById("card-movie-img");
const cardDescription=document.getElementById("card-movie-description");
const cardDuration=document.getElementById("card-movie-duration");
const btnAddToList=document.getElementById("btn-add-movie");

const fillCard=(data)=>{  
    cardTitle.innerText=data.original_title;
    cardImg.setAttribute('src',`${imgURL}${data.backdrop_path}`);
    cardDescription.innerText=data.overview;
    cardDuration.innerText="Duration: "+data.runtime+" min.";
    //TO-DO Check if user got the movie; 
};


const getMovieData1=async(movieID)=>{
    let data='';
    sessionStorage.setItem("moviePageData",null);

    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKEY}`)
    .then((response)=>{
        data=response.data;
        sessionStorage.setItem("moviePageData",JSON.stringify(data));
        console.log(JSON.parse(sessionStorage.getItem("moviePageData")));
        fillCard(data);        
    }).catch((error)=>{
        return error;
    })
}

getMovieData1(movieSelected);

btnAddToList.addEventListener("click",(e)=>{
    addMovieToList(sessionStorage.getItem("tokenAccess"));
});

const addMovieToList=async(token)=>{
    const movieData=JSON.parse(sessionStorage.getItem("moviePageData"));

    if(token==null){
        window.location.href="http://localhost:5500/signIn.html";
    }else{

        axios.post('http://localhost:8080/api/user/addMovie',
        {        
                "id":`${movieData.id}`,
                "name":`${movieData.original_title}`,
                "duration": `${movieData.runtime}`     
        },
        {
            headers:{
                'Authorization':`Bearer ${token}`
            },
    
        });
    }

  

}