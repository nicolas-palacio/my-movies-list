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

    //let payload = { name: 'John Doe', occupation: 'gardener' };
    
    let res = await axios.post("http://localhost:8080/api/v1/registration",{
        firstName: `${username.value}`,
        email: `${userEmail.value}`,
        password: `${userPassword.value}`,
        passwordConfirmation: `${userPasswordRep.value}`
    }).then((response)=>{
        let data = response.data;
        console.log(data);
 
    }).catch((error)=>{
        console.log(error);
    });
}

loadCountryList();