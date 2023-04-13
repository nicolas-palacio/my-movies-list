const dropdownUserMenu=document.getElementById("dropdown-user-menu");
const dropdownUser=document.getElementById("dropdown-user");
const btnSignUp=document.getElementById("btn-sign-up");
const btnSignIn=document.getElementById("btn-sign-in");
const btnProfile=document.getElementById("btn-profile");
const btnSettings=document.getElementById("btn-settings");
const btnSignOut=document.getElementById("btn-signout");

const searchBar=document.getElementById("search-bar");
const searchMenu=document.getElementById("search-menu");
let fragment=document.createDocumentFragment();
const searchResultsCard=document.getElementById("results-card");


searchBar.addEventListener("input",(e)=>{
    if(searchBar.value==''){
        searchResultsCard.innerHTML='';
        searchMenu.classList.add("d-none");
    }
    const url=`https://api.themoviedb.org/3/search/movie?query=${searchBar.value}&api_key=${APIKEY}`;
    searchMovie(url);   
});

btnSignOut.addEventListener("click",async (e)=>{

    const tokenAccess=sessionStorage.getItem("tokenAccess");
    await axios.get('http://localhost:8888/api/v1/auth/logout',{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;
        console.log("HEY "+data)
        sessionStorage.setItem("tokenAccess",null);
        isUserLogged();
        window.location.href="http://localhost:5500/index.html";     
    }).catch((error=>{
        return error;
    }))
    
});

const searchMovie=async(url)=>{
    searchMenu.classList.remove("d-none");
    searchResultsCard.innerHTML='';
    
    let response= await fetch(url)
    let data= await response.json();
    let movies=data.results;
    showResultsMovies(movies);
    console.log(movies); 
}

const showResultsMovies=(movies)=>{
    searchResultsCard.style="display:flex;width:225px"
    
    movies.slice(0,3).forEach(movie => {       
        const newDiv=document.createElement("div");
        newDiv.classList.add("list", "border-bottom");
        newDiv.style='cursor:pointer;display: flex;'
        newDiv.innerHTML=`<i class="fa fa-weibo"></i>
                          <div class="d-flex flex-column ml-3"> <span>${movie.original_title}</span>
                            <small>${movie.release_date.substring(0,4)}</small>
                                <img  alt="..." src="${imgURL}${movie.poster_path}" id="img-search-bar">                          
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

    if(sessionStorage.getItem("tokenAccess")==null ||sessionStorage.getItem("tokenAccess")=='null'){
        dropdownUserMenu.classList.add("d-none");        
    }else{         
        btnSignUp.classList.add("d-none");
        btnSignIn.classList.add("d-none");
        getUserData(sessionStorage.getItem("tokenAccess"));
    }
}

const getUserData=async(token)=>{
    let data='';
    await axios.get('http://localhost:8888/api/v1/user/info',{
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
    dropdownUser.innerHTML=data.username;
}


isUserLogged();