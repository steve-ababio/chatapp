import {useState} from 'react';
import useFetch from '../hooks/usefetch';

const header = {"Content-Type":"application/json","Accept":"application/json"};
const useAuthentication = (url,body)=>{    
    const Fetch = useFetch(url,"POST",body,header);
    const [isloginprocessing,setloginprocessing] = useState(false);
    const [response,setResponse] = useState({}); 
    
    const submitCredentials = async()=>{
        setloginprocessing(true);
        const res = await Fetch();
        console.log(res)
        setResponse(res);
        setloginprocessing(false);
    }
    return[submitCredentials,isloginprocessing,response]
}   
export default useAuthentication;