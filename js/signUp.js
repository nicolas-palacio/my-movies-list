/*import data from '../countries.json' assert {type:'json'};
*/

const form=document.getElementById("form-sign-up");
const username=document.getElementById("username");
const userEmail=document.getElementById("user-email");
const userCountry=document.getElementById("user-country");
const userPassword=document.getElementById("user-password");
const userPasswordRep=document.getElementById("user-password-rep");
let firstOptionRemoved=false;



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    validateInputs();
    signUp();
})

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

userCountry.addEventListener('click',(e)=>{
    if(userCountry.value!='Your country' && !firstOptionRemoved){
        userCountry.remove(0);
        firstOptionRemoved=true;
    }
})

async function signUp() {
    if(userCountry.value=='Your country'){
        userCountry.value='';
    }
   
    let res = await axios.post("http://localhost:8888/api/v1/auth/register",{
        username: `${username.value}`,
        email: `${userEmail.value}`,
        country:`${userCountry.value}`,
        password: `${userPassword.value}`,
        passwordConfirm: `${userPasswordRep.value}`
    }).then((response)=>{
        let data = response.data;       
        console.log(response.status);
        window.location.href='http://localhost:5500/confirmation-page.html' 
 
    }).catch((error)=>{
        console.log(error.response.data.message.substring(28));
        showInvalidInputMessage(error.response.data.message.substring(28));
    });
}

const validateInputs=()=>{
    if(username.value==''){
        username.classList.add('is-invalid');
    }

    if(userEmail.value==''){
        userEmail.classList.add('is-invalid');
    }

    if(userCountry.value=='Your country'){
        userCountry.classList.add('is-invalid');
    }

    if(userPassword.value==''){
        userPassword.classList.add('is-invalid');
    }

    if(userPasswordRep.value==''){
        userPasswordRep.classList.add('is-invalid');
    }


}

const showInvalidInputMessage=(message)=>{
    if(message.includes("Username") ||message.includes("username")){
        username.classList.add('is-invalid');
        const usernameInvalidMessage=document.getElementById('invalid-username');
        usernameInvalidMessage.innerHTML=`${message}`;
    }
}

loadCountryList();