const APIKEY="7aa8b83794a6309507a808a916506d1b";
const imgURL='https://image.tmdb.org/t/p/original/';
const API_DB_LINK='https://my-movies-list.herokuapp.com'

const logout=()=>{
    sessionStorage.setItem("tokenAccess",null);
    sessionStorage.setItem("tokenRefresh",null);
}

const refreshToken=async()=>{
    const tokenAccess=sessionStorage.getItem("tokenAccess");
    await axios.get('https://my-movies-list.herokuapp.com/api/v1/auth/token/refresh',{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;
        console.log("TOKEN REFRESHED");
        sessionStorage.setItem("tokenAccess",data);
         
    }).catch((error=>{
        console.log("ERROR")
        return error;
    })) 
}


const getMovieData=async(movieID)=>{
    /*let response= await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKEY}`)
    let data= await response.json();*/
    let data='';

     axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${APIKEY}`)
    .then((response)=>{
        data=response.data;
        console.log(data);

        return data;
    }).catch((error)=>{
        return error;
    })
}




    