import {useState} from 'react';

const useForm = () =>{
    const [credential,setCredential] = useState("");

    const handleCredential = e=>{
        setCredential(e.target.value);
    }
    return [credential,handleCredential];
} 
export default useForm;