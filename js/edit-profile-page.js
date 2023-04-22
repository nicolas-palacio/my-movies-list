const formUpdate=document.getElementById("form-update");
const btnUpdateUsername=document.getElementById("btn-update-username");
const btnUpdateEmail=document.getElementById("btn-update-email");
const btnUpdatePassword=document.getElementById("btn-update-password");
const btnUpdateCountry=document.getElementById("btn-update-country");

const actualCountry=document.getElementById("actual-country");
const actualUsername=document.getElementById("actual-username");
const actualEmail=document.getElementById("actual-email");
const userCountry=document.getElementById("user-country");

const updatedUsername=document.getElementById("updated-username");
const currentUserPassword=document.getElementById("user-current-password");
const updatedPassword=document.getElementById("user-password");
const updatedPasswordRep=document.getElementById("user-password-rep");

formUpdate.addEventListener("click",(e)=>{
    e.preventDefault();
});

const loadCountryList=async ()=>{
    const response = await fetch("../countries.json");
    const countries = await response.json();

    let opt = document.createElement("option");
    opt.value = 'Your country'; 
    opt.innerHTML = 'Your country';
    userCountry.append(opt);

    countries.map( (country, i) => {
        let opt = document.createElement("option");       
        opt.value = country.name; 
        opt.innerHTML = country.name;
        userCountry.append(opt);
    });

}

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
        return error;
    }))    
}

const loadUsersDataForm=(data)=>{
    sessionStorage.setItem("actualEmail",data.email);
    actualCountry.innerHTML="Country <i>("+"Current: "+data.country+")</i>";    
    actualUsername.innerHTML="Username <i>("+"Current: "+data.username+")</i>";
    actualEmail.innerHTML="Email <i>("+"Current: "+data.email+")</i>";    
}

getUserDataForm(sessionStorage.getItem("tokenAccess"));


btnUpdateUsername.addEventListener("click",async(e)=>{
    validateUsernameInput();
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
        location.reload()
    }).catch((error=>{
        console.log(error)  
        console.log("HELLO")                        
        updatedUsername.classList.add("is-invalid");    
        return error;
    })) 
});

const validateUsernameInput=()=>{
    if(updatedUsername.value==''){       
        updatedUsername.classList.add("is-invalid");
        const invalidUsername=document.getElementById("invalid-username");
        invalidUsername.innerHTML='Username should not be empty.'
    }
}

btnUpdatePassword.addEventListener("click",async(e)=>{
    const tokenAccess=sessionStorage.getItem("tokenAccess");

    await axios.put('http://localhost:8888/api/v1/user',{
        currentPassword:`${currentUserPassword.value}`,
        password:`${updatedPassword.value}`,
        passwordConfirm:`${updatedPasswordRep.value}`
    },{
        headers:{
            'Authorization':`Bearer ${tokenAccess}`
        }
    }).then((res)=>{
        data=res.data;   
        console.log(data);
        reAuthenticate();
        location.reload();
    }).catch((error=>{
        console.log(error.response.data.message.substring(28))                               
        currentUserPassword.classList.add("is-invalid");
        updatedPassword.classList.add("is-invalid");
        updatedPasswordRep.classList.add("is-invalid");
        showInputError(error.response.data.message.substring(28));
        return error;
    })) 
})

const showInputError=(message)=>{
    if(message.includes("current")){
        document.getElementById("invalid-current-password").innerHTML=`${message}`;
    }

    if(message.includes("length")){
        document.getElementById("invalid-password").innerHTML=`${message}`;
    }
}


const reAuthenticate=async()=>{

    axios.post("http://localhost:8888/api/v1/auth/authenticate",{
        email:`${sessionStorage.getItem("actualEmail")}`,
        password:`${updatedPassword.value}`
    }).then((response)=>{
        const tokenAccess = response.data.token;       
        sessionStorage.setItem("tokenAccess",tokenAccess);
        //window.location.href="http://localhost:5500/index.html";    
    }).catch((error)=>{
        sessionStorage.setItem("emailNotConfirmed",emailInput.value);
        showInvalidInputMessage(error.response.data.message);
        emailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        
    });
}

loadCountryList();

btnUpdateCountry.addEventListener("click",async(e)=>{
    const tokenAccess=sessionStorage.getItem("tokenAccess");
    if(userCountry.value!='Your country'){

        await axios.put('http://localhost:8888/api/v1/user',{
            country:`${userCountry.value}`
        },{
            headers:{
                'Authorization':`Bearer ${tokenAccess}`
            }
        }).then((res)=>{
            data=res.data;   
            console.log(data);
            location.reload()
        }).catch((error=>{
            console.log(error)  
            console.log("HELLO")                        
            updatedUsername.classList.add("is-invalid");    
            return error;
        })) 
    }else{
        userCountry.classList.add("is-invalid");
    }

});