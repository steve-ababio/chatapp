export const GET_REQ = async(url,headers={})=>
{
    const serializedres = await fetch(url,{method:"GET",headers:headers});
    return await serializedres.json();
}
export const POST_REQ = async(url,body,headers)=>{
    const serializedres = await fetch(url,{method:"POST",body:JSON.stringify(body),headers:headers});
    return await serializedres.json();
} 
