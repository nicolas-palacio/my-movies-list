const dropdownUserMenu=document.getElementById("dropdown-user-menu");
const dropdownUser=document.getElementById("dropdown-user");
const btnSignUp=document.getElementById("btn-sign-up");
const btnSignIn=document.getElementById("btn-sign-in");
const btnProfile=document.getElementById("btn-profile");
const btnSettings=document.getElementById("btn-settings");
const btnSingOut=document.getElementById("btn-signout");

const searchBar=document.getElementById("search-bar");
let fragment=document.createDocumentFragment();
const searchResultsCard=document.getElementById("results-card");


searchBar.addEventListener("input",(e)=>{
    const url=`https://api.themoviedb.org/3/search/movie?query=${searchBar.value}&api_key=${APIKEY}`;
    searchMovie(url);   
});

const searchMovie=async(url)=>{
    searchResultsCard.innerHTML='';

    let response= await fetch(url)
    let data= await response.json();
    let movies=data.results;
    showResultsMovies(movies);
    console.log(movies); 
}

const showResultsMovies=(movies)=>{
    searchResultsCard.style="display:flex;width:225px"
    
    movies.slice(0,5).forEach(movie => {
        console.log(movie.original_title); 
        const newDiv=document.createElement("div");
        newDiv.classList.add("list", "border-bottom");
        newDiv.style='cursor:pointer;display: flex;'
        newDiv.innerHTML=`<i class="fa fa-weibo"></i>
                          <div class="d-flex flex-column ml-3"> <span>${movie.original_title}</span>
                            <img  alt="..." src="${imgURL}${movie.poster_path}" id="img-search-bar">
                            <small>${movie.release_date.substring(0,4)}</small>
                           </div>`
        addDivEvent(newDiv,movie.id);                   
        fragment.appendChild(newDiv);
    });

    searchResultsCard.appendChild(fragment);
}

const addDivEvent=(newDiv,movieID)=>{
    newDiv.addEventListener("click",(e)=>{
        sessionStorage.setItem("movieSelectedID",movieID);
        window.location.href="http://localhost:5500/movie-page.html";
    });
}

btnProfile.addEventListener("click",(e)=>{
    window.location.href="http://localhost:5500/profile-page.html";
    }
)


const isUserLogged=()=>{
    if(sessionStorage.getItem("tokenAccess")==null){
        dropdownUserMenu.classList.add("hide");  
    }else{
         
        btnSignUp.classList.add("hide");
        btnSignIn.classList.add("hide");
        getUserData(sessionStorage.getItem("tokenAccess"));
    }
}

const getUserData=async(token)=>{
    let data='';
    await axios.get('http://localhost:8888/api/v1/users/info',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res)=>{
        data=res.data;       
        loadUsersData(data);
    }).catch((error=>{
        return error;
    }))    
}

const loadUsersData= (data)=>{ 
    dropdownUser.innerHTML=data.name;
}

const test1=async()=>{
    let data='';
    await axios.get('http://localhost:8888/api/v1/user').then((res)=>{
        data=res.data;  
        console.log(data)         
    }).catch((error=>{
        return error;
    }))    
}


//isUserLogged();
test1();