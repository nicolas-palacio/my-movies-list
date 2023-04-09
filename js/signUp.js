/*import data from '../countries.json' assert {type:'json'};
*/

const form=document.getElementById("form-sign-up");
const username=document.getElementById("username");
const userEmail=document.getElementById("user-email");
const userCountry=document.getElementById("user-country");
const userPassword=document.getElementById("user-password");
const userPasswordRep=document.getElementById("user-password-rep");



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    signUp();
})

const loadCountryList=async ()=>{
    const response = await fetch("../countries.json");
    const countries = await response.json();
    console.log(countries[0].name);

    /*langArray.map( (lang, i) => {
        let opt = document.createElement("option");
        opt.value = i; // the index
        opt.innerHTML = lang;
        userCountry.append(opt);
    });*/

}

/*categories.forEach(category=>{
    const option = document.createElement("option");
    option.innerHTML=` <option value="empty" selected>${category}</option>`
    categoryBoxForm.appendChild(option);
});*/


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