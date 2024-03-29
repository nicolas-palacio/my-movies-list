const dropdownUserMenu=document.getElementById("dropdown-user-menu");
const dropdownUser=document.getElementById("dropdown-user");
const btnSignUp=document.getElementById("btn-sign-up");
const btnSignIn=document.getElementById("btn-sign-in");
const btnProfile=document.getElementById("btn-profile");
const btnSettings=document.getElementById("btn-settings");
const btnSignOut=document.getElementById("btn-signout");
const btnSearch=document.getElementById("btn-search");

const searchBar=document.getElementById("search-bar");
const searchMenu=document.getElementById("search-menu");
const userProfilePic=document.getElementById("user-profile-pic-nav");
let fragment=document.createDocumentFragment();
const searchResultsCard=document.getElementById("results-card");

API_BACKEND_LINK='https://my-movies-list.herokuapp.com';

/*btnSearch.addEventListener('click',async(e)=>{
    if(searchBar.value!='' && searchBar.value.charAt(0)=='@'){
        let data='';
    await axios.get(API_BACKEND_LINK+'/api/v1/user/info',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res)=>{
        data=res.data; 
        
    }).catch((error=>{
        return error;
    })) 
    }
})*/


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
    await axios.get(`${API_BACKEND_LINK}/api/v1/auth/logout`,{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;
        sessionStorage.setItem("tokenAccess",null);
        isUserLogged();
        window.location.href="index.html";     
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
        window.location.href="movie-page.html";
    });
}

btnProfile.addEventListener("click",(e)=>{
    window.location.href="profile-page.html";
    }
)


const isUserLogged=()=>{

    if(sessionStorage.getItem("tokenAccess")==null ||sessionStorage.getItem("tokenAccess")=='null'){
        dropdownUserMenu.classList.add("d-none");
        userProfilePic.classList.add("d-none");

    }else{         
        btnSignUp.classList.add("d-none");
        btnSignIn.classList.add("d-none");
        userProfilePic.classList.remove("d-none");
        getUserData(sessionStorage.getItem("tokenAccess"));
    }
}

const getUserData=async(token)=>{
    let data='';
    await axios.get(API_BACKEND_LINK+'/api/v1/user/info',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res)=>{
        data=res.data; 
        if(data.imageFilename==null){
            userProfilePic.src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
        }else{
            userProfilePic.src=`${API_BACKEND_LINK}/api/v1/user/image?filename=${data.imageFilename}`  
        }
        loadUsersData(data);
    }).catch((error=>{
        return error;
    }))    
}

const loadUsersData= (data)=>{ 
    sessionStorage.setItem("actual-username",data.username)
    dropdownUser.innerHTML=data.username;

}


isUserLogged();