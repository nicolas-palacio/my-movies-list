const confirmMail=async()=>{
    let data='';
    const queryString=window.location.search;
    const urlTokenParam=new URLSearchParams(queryString);
    const token=urlTokenParam.get('token');
    
    await axios.get('http://localhost:8888/api/v1/auth/register/confirm?token='+token).then((res)=>{
        data=res.data;       
        console.log(data);
    }).catch((error=>{
        return error;
    }))    
}

confirmMail();