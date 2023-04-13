const profileName=document.getElementById("profile-name");
const hoursViewed=document.getElementById("hours-viewed");
const profileCountry=document.getElementById("profile-location");
const profileMoviePoster=document.getElementById("profile-movie-1");


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
        return error;
    })) 
    
}

const loadProfile=(data)=>{
    profileName.innerHTML=data.username;
    hoursViewed.innerHTML=data.hoursViewed;
    profileCountry.innerHTML=data.country;
    for(let i=1;i<=4;i++){
        
    }

}

showProfile();
