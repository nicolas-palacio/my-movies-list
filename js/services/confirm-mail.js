const checkLogo=document.getElementById("check-logo");
const cardMessage=document.getElementById("message");

const confirmMail=async()=>{
    let data='';
    const queryString=window.location.search;
    const urlTokenParam=new URLSearchParams(queryString);
    const token=urlTokenParam.get('token');
    
    await axios.get('http://localhost:8888/api/v1/auth/register/confirm?token='+token).then((res)=>{
        data=res.data; 
        checkLogo.classList.remove("d-none");      
        
    }).catch((error=>{
        checkLogo.classList.add("d-none");
        console.log(error);
        cardMessage.innerHTML=`${error.response.data.exception}` +` ${error.response.data.message}`

        return error;
    }))    
}

confirmMail();