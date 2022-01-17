const useFetch = (url,method,body='',headers='')=>{
    const makeRequest = async()=>{
        try{
            const serializedRes = await fetch(url,{method:method,body:JSON.stringify(body),headers:headers});
            const res = await serializedRes.json();
            return res;
        }catch(error){
            console.log(error)
        }
    }
    return makeRequest;
}

export default useFetch;