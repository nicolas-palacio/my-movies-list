const profilePicture=document.getElementById("profile-picture");
const profileName=document.getElementById("profile-name");
const hoursViewed=document.getElementById("hours-viewed");
const profileCountry=document.getElementById("profile-location");
const profileMoviePoster=document.getElementById("profile-movie-1");
const btnEditProfile=document.getElementById("btn-edit-profile");
const userMoviesImgs=document.getElementById("user-movies-imgs");
let userMoviesDetails=[];



const showProfile=async ()=>{
    let data='';
    const tokenAccess=sessionStorage.getItem("tokenAccess");
    await axios.get('http://localhost:8888/api/v1/user/info',{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;
        console.log(data)      
        loadProfile(data);    
    }).catch((error=>{
        refreshToken()
        //return error;
    })) 
    
}

const getMoviePoster=async(movies)=>{
    
    for (let i = 0; i < movies.length; i++) {
        let response= await fetch(`https://api.themoviedb.org/3/movie/${movies[i].id}?api_key=${APIKEY}`)
        let data= await response.json();      
        userMoviesDetails.push(data)

    }
    loadPosters();
}


btnEditProfile.addEventListener("click",(e)=>{
    window.location.href="edit-profile-page.html";
});

const loadProfile=async(data)=>{
    profileName.innerHTML=data.username;
    hoursViewed.innerHTML=(data.hoursViewed/60).toFixed(1);
    profileCountry.innerHTML=data.country;

    const tokenAccess=sessionStorage.getItem("tokenAccess");
    
    await axios.get(`${API_DB_LINK}/api/v1/user/image?filename=${data.imageFilename}`,{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{       
        profilePicture.src=`${API_DB_LINK}/api/v1/user/image?filename=${data.imageFilename}`   
        
    }).catch((error=>{
        return error;
    })) 


    
}

showProfile();


const loadUserMovies=async()=>{
    const tokenAccess=sessionStorage.getItem("tokenAccess");
    
    await axios.get('http://localhost:8888/api/v1/user/list',{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        movies=res.data;
        getMoviePoster(movies);              
        
    }).catch((error=>{
        return error;
    })) 
}

const createRow=(cant)=>{
    
    for(let i=0;i<cant;i++){
        userMoviesImgs.insertAdjacentHTML(
            "beforeend",
            `<div class="row g-2" id="row-${i}">                             
            </div>`           
        )
    }
}

const addImgEvent=(img,movieID)=>{
    const imgDOM=document.getElementById(`movie-${img}`);

    imgDOM.addEventListener("click",(e)=>{
        sessionStorage.setItem("movieSelectedID",movieID);
        window.location.href="movie-page.html";
    });
}

loadUserMovies();

function loadPosters() {
    let rowID = 0;

    createRow(movies.length);
    let elementsInRow = 1;
    let index = 0;

    userMoviesDetails.map(movie => {
        const rowMovie = document.getElementById(`row-${rowID}`);
        if (elementsInRow <= 3) {
            rowMovie.insertAdjacentHTML(
                "beforeend",
                `
                            <div class="col">
                            <img src="https://image.tmdb.org/t/p/original${userMoviesDetails[index].poster_path}"
                            alt="image 1" class="w-100 rounded-3"id="movie-${movie.id}" style="cursor:pointer;">
                            </div>                 
                        `
            );
            elementsInRow++;
        } else {
            rowID++;
            elementsInRow = 1;
            if(index==userMoviesDetails.length){
                rowMovie.insertAdjacentHTML(
                    "beforeend",
                    `
                                <div class="col">
                                <img src="https://image.tmdb.org/t/p/original${userMoviesDetails[index].poster_path}"
                                alt="image 1" class="w-25 rounded-3"id="movie-${movie.id}" style="cursor:pointer;">
                                </div>                 
                            `
                );
            }else{
                rowMovie.insertAdjacentHTML(
                    "beforeend",
                    `
                                <div class="col">
                                <img src="https://image.tmdb.org/t/p/original${userMoviesDetails[index].poster_path}"
                                alt="image 1" class="w-100 rounded-3"id="movie-${movie.id}" style="cursor:pointer;">
                                </div>                 
                            `
                );
            }
            
        }
        index++;
        addImgEvent(movie.id,movie.id);
    }
    );
}
