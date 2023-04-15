const formUpdate=document.getElementById("form-update");
const btnUpdateUsername=document.getElementById("btn-update-username");
const btnUpdateEmail=document.getElementById("btn-update-email");
const btnUpdatePassword=document.getElementById("btn-update-password");
const btnUpdateCountry=document.getElementById("btn-update-country");

const updatedUsername=document.getElementById("updated-username");

formUpdate.addEventListener("click",(e)=>{
    //e.preventDefault();
});

const getUserDataForm=async(token)=>{
    let data='';
    await axios.get('http://localhost:8888/api/v1/user/info',{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((res)=>{
        data=res.data;   
        console.log(data);
        loadUsersDataForm(data);
    }).catch((error=>{
        console.log(error.response.status)
        if(error.response.status==403){                    
            refreshTokens();
        }
        return error;
    }))    
}

const loadUsersDataForm=(data)=>{
    const actualUsername=document.getElementById("actual-username");
    actualUsername.innerHTML="Username <i>("+"Currently: "+data.username+")</i>";

    const actualEmail=document.getElementById("actual-email");
    actualEmail.innerHTML="Email <i>("+"Currently: "+data.email+")</i>";

    const actualCountry=document.getElementById("actual-country");
    actualCountry.innerHTML="Country <i>("+"Currently: "+data.country+")</i>";

}

getUserDataForm(sessionStorage.getItem("tokenAccess"));


btnUpdateUsername.addEventListener("click",async(e)=>{
    const tokenAccess=sessionStorage.getItem("tokenAccess");
    await axios.put('http://localhost:8888/api/v1/user',{
        username:`${updatedUsername.value}`
    },{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;   
        console.log(data);
       
    }).catch((error=>{
        console.log(error.response.status)
        if(error.response.status==403){                    
            
        }
        return error;
    })) 
});
