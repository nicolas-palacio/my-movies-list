const emailInput= document.getElementById("email-input");
const passwordInput= document.getElementById("password-input");
const loginBtn=document.getElementById("login-btn");


loginBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    signIn();
   
});

async function signIn() {    
   
    const user="nico@gmail.com"
    const pass="a12345678" 
    const form={
        username:user,
        password:pass
    }

    const params= new URLSearchParams();
    params.append('username','nico@gmail.com');
    params.append('password','a12345678');

    axios.post("http://localhost:8080/api/login",params).then((response)=>{
        const tokenAccess = response.data.access_token;
        sessionStorage.setItem("tokenAccess",tokenAccess);
        const tokenRefresh=response.data.refresh_token;
        sessionStorage.setItem("tokenRefresh",tokenRefresh);
        window.location.href="http://localhost:5500/index.html";    
    })
}