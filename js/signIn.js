const emailInput= document.getElementById("email-input");
const passwordInput= document.getElementById("password-input");
const loginBtn=document.getElementById("login-btn");
const emailNotConfirm = document.getElementById('invalid-credentials');

loginBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    signIn();
   
});

async function signIn() {    
   
    axios.post("http://localhost:8888/api/v1/auth/authenticate",{
        email:`${emailInput.value}`,
        password:`${passwordInput.value}`
    }).then((response)=>{
        const tokenAccess = response.data.token;       
        sessionStorage.setItem("tokenAccess",tokenAccess);
        window.location.href="http://localhost:5500/index.html";    
    }).catch((error)=>{
        sessionStorage.setItem("emailNotConfirmed",emailInput.value);
        showInvalidInputMessage(error.response.data.message);
        emailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        
    });
}

const showInvalidInputMessage=(message)=>{
    if(message.includes("403")){       
        emailNotConfirm.innerHTML = `${message.substring(16)}.<div></div> <a href="signUp.html" class="">Re-send email.</a>`;
       
    }else{
        emailNotConfirm.innerHTML = `Incorrect username or password.`;
    }
}

const reSendEmail=async()=>{
    const email=sessionStorage.getItem("emailNotConfirmed",emailInput.value);


}