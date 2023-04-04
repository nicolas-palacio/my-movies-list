const profileName=document.getElementById("profile-name");
const hoursViewed=document.getElementById("hours-viewed");
const profileMoviePoster=document.getElementById("profile-movie-1");


const showProfile=async ()=>{
    let data='';
    const tokenAccess=sessionStorage.getItem("tokenAccess");
    await axios.get('http://localhost:8080/api/user/info',{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;
        loadProfile(data);    
    }).catch((error=>{
        return error;
    })) 
    
}

const loadProfile=(data)=>{
    profileName.innerHTML=data.name;
    hoursViewed.innerHTML=data.hoursViewed;
    for(let i=1;i<=4;i++){
        
    }

}

showProfile();
