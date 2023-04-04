const confirmMail=async()=>{
    let data='';
    const queryString=window.location.search;
    const urlTokenParam=new URLSearchParams(queryString);
    const token=urlTokenParam.get('token');

    console.log(token);

    await axios.get('http://localhost:8888/api/v1/auth/register/confirm?token='+token).then((res)=>{
        data=res.data;       
        console.log(data);
    }).catch((error=>{
        return error;
    }))    
}

const test1=async()=>{
    let data='';
    await axios.get('http://localhost:8888/api/v1/user').then((res)=>{
        data=res.data;  
        console.log("asdasd"+data)         
    }).catch((error=>{
        return error;
    }))    
}



confirmMail();