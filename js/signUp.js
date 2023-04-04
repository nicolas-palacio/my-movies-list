const form=document.getElementById("form-sign-up");
const userName=document.getElementById("user-name");
const userEmail=document.getElementById("user-email");
const userPassword=document.getElementById("user-password");
const userPasswordRep=document.getElementById("user-password-rep");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    signUp();
})


async function signUp() {

    //let payload = { name: 'John Doe', occupation: 'gardener' };
    
    let res = await axios.post("http://localhost:8080/api/v1/registration",{
        firstName: `${userName.value}`,
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